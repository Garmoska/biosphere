﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiosphereWebApplication.Controllers
{
    public class TechDemoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
