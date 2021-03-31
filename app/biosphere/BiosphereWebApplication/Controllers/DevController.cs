using Microsoft.AspNetCore.Mvc;

namespace BiosphereWebApplication.Controllers
{
    public class DevController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult SimpleMapTest()
        {
            return View();
        }

        public IActionResult SheepAnimation()
        {
            return View();
        }
    }
}
