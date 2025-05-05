
using AutoMapper;
using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using DevNote.Core.Models.files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Meeting, MeetingDto>().ReverseMap();

        }
    }
}
