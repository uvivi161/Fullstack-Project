using DevNote.Core.Repositories;
using DevNote.Core.Services;
using DevNote.Data.Repositories;
using DevNote.Service;
using DevNote.Data;
using System;
using DevNote.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Amazon.S3;
using Amazon;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using DotNetEnv;
using DevNote.Core.Models;
DotNetEnv.Env.Load();
var builder = WebApplication.CreateBuilder(args);


var awsRegion = Environment.GetEnvironmentVariable("AWS__REGION");

var credentials = new BasicAWSCredentials(
builder.Configuration["AWS:AccessKey"],
builder.Configuration["AWS:SecretKey"]
);
builder.Services.AddControllers();

var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]);
//var region = Amazon.RegionEndpoint.GetBySystemName(awsRegion);

var s3Client = new AmazonS3Client(credentials, region);

builder.Services.AddSingleton<IAmazonS3>(s3Client);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});
builder.Services.AddHttpClient();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserStatisticsRepository, UserStatisticsRepository>();
builder.Services.AddScoped<IUserStatisticsService, UserStatisticsService>();
builder.Services.AddScoped<IFileUploadRepository, FileUploadRepository>();
builder.Services.AddScoped<IFileUploadService, FileUploadService>();
builder.Services.AddScoped<IMeetingRepository, MeetingRepository>();
builder.Services.AddScoped<IMeetingService, MeetingService>();
builder.Services.AddScoped<ITranscriptionRepository, TranscriptionRepository>();
builder.Services.AddScoped<ITranscriptionService, TranscriptionService>();
builder.Services.AddScoped<IPasswordGenerator, PasswordGenerator>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddHttpClient<ITextFormatterService, TextFormatterService>();

builder.Services.AddDbContext<DataContext>();
builder.Services.AddAutoMapper(typeof(MappingProfile));


//הוספת מייל
builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));

builder.Services.AddScoped<IEmailService, EmailService>();

// הוספת JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("Jwt__Key")))
    };
});

// הוספת הרשאות מבוססות-תפקידים
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("admin"));
    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("editor", "admin"));
    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("viewer"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Configuration.AddEnvironmentVariables();
var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("AllowAll"); 

app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}
app.MapControllers();

app.MapGet("/", () => "server is running");

app.Run();


