using DevNote.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DevNote.Service
{
    public class TextFormatterService : ITextFormatterService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey = "YOUR_OPENAI_API_KEY"; // עדיף לטעון מה־appsettings

        public TextFormatterService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> FormatTranscriptAsync(string rawText)
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _apiKey);

            var requestBody = new
            {
                model = "gpt-4",
                messages = new[]
                {
                new { role = "system", content = "You are an assistant that improves text formatting." },
                new
                {
                    role = "user",
                    content = $"Please format the following transcript text to be clean and readable, with line breaks after sentences, and clear structure:\n\n{rawText}"
                }
            },
                temperature = 0.2,
                max_tokens = 1500
            };

            var content = new StringContent(
                JsonSerializer.Serialize(requestBody),
                Encoding.UTF8,
                "application/json");

            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
            var responseText = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(responseText);
            return doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();
        }
    }
}
