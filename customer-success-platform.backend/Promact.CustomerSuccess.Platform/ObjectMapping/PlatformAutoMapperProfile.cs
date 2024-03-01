﻿using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;

namespace Promact.CustomerSuccess.Platform.ObjectMapping;

public class PlatformAutoMapperProfile : Profile
{
    public PlatformAutoMapperProfile()
    {
        /* Create your AutoMapper object mappings here */
        CreateMap<CreateProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
        CreateMap<Project, ProjectDto>().ReverseMap();

        /* Create your AutoMapper object mappings here  for ClientFeedback*/
        CreateMap<CreateClientFeedbackDto, Project>();
        CreateMap<UpdateClientFeedbackDto, Project>();
        CreateMap<ClientFeedbackDto, ProjectDto>().ReverseMap();
    }
}
