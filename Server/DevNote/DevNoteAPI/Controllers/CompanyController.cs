using AutoMapper;
using DevNote.Core.Models;
using DevNote.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DevNote.API.Controllers
{
    public class CompanyController : ControllerBase
    {

        private readonly ICompanyService _companyService;
        private readonly IMapper _mapper;
        public CompanyController(ICompanyService context, IMapper mapper)
        {
            _companyService = context;
            _mapper = mapper;
        }
        //// GET: api/<Company>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<Company>/5
        [HttpGet("getCompanyByID")]
        public Company Get(int id)
        {
            return _companyService.Get(id);
        }

        [HttpGet("GetByName")]
        public Company GetByName(string name)
        {
            return _companyService.GetByName(name);
        }

        //// POST api/<Company>
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/<Company>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<Company>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
