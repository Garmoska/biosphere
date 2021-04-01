using Microsoft.AspNetCore.Mvc;

namespace BiosphereWebApplication.Controllers
{
    public class DevController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult SimpleMap()
        {
            return View();
        }

        public IActionResult AnimalAnimation()
        {
            return View();
        }

        public IActionResult GUITest()
        {
            return View();
        }

        public IActionResult BushGrowing()
        {
            return View();
        }
    }
}
