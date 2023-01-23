
let applicationSettings = {};

let profileType = "";
let metaDescription = "";
let defaultPageComponent = "";
let routerBaseName = "";

let tagManagerArgs = {
  gtmId: ""
};

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    profileType = "localhost";
    break;
  case "pkd-and-me":
    profileType = "pkd-and-me";
    break;
  case "pkd-and-me.philipdick.com":
    profileType = "pkd-and-me";
    break;
  case "philipdick.com":
    profileType = "philipdick";
    break;
  case "www.philipdick.com":
    profileType = "philipdick";
    break;
  case "homeopape.com":
    profileType = "homeopape";
    break;
  case "www.homeopape.com":
    profileType = "homeopape";
    break;
  default:
    profileType = "";
};

switch (profileType) {
  case "localhost":
    metaDescription = "";
    defaultPageComponent = "Home";
    routerBaseName = "";
    tagManagerArgs.gtmId = "";
    break;
  case "philipdick":
    metaDescription = "An online community for followers of Philip K. Dick, old and new, along with the promotion of his work and the sharing of information, text, audio or visual that pertains to his life, his work and his legacy. Includes news, articles, criticism, interviews, biography, synopses of major works, reviews, links, and much more.";
    defaultPageComponent = "Home";
    routerBaseName = "/pkd-and-me";
    tagManagerArgs.gtmId = "GTM-NW2GPF2";
    break;
  case "pkd-and-me":
    metaDescription = "An online community for followers of Philip K. Dick, old and new, along with the promotion of his work and the sharing of information, text, audio or visual that pertains to his life, his work and his legacy. Includes news, articles, criticism, interviews, biography, synopses of major works, reviews, links, and much more.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    tagManagerArgs.gtmId = "GTM-NW2GPF2";
    break;
  case "homeopape":
    metaDescription = "Purchase digital (i.e. not analog) versions of the novels, short stories, and non-fiction of Philip K. Dick or other works related to Philip K. Dick.";
    defaultPageComponent = "Homeopape";
    routerBaseName = "";
    tagManagerArgs.gtmId = "GTM-NXQJTGL";
    break;
  default:
    metaDescription = "An online community for followers of Philip K. Dick, old and new, along with the promotion of his work and the sharing of information, text, audio or visual that pertains to his life, his work and his legacy. Includes news, articles, criticism, interviews, biography, synopses of major works, reviews, links, and much more.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    tagManagerArgs.gtmId = "";
};

// * Override the profileType setting to test the applicationSetting files -- 03/06/2021 MF
// profileType = "localhost";
// profileType = "philipdick";
// profileType = "pkd-and-me";
// profileType = "homeopape";
// profileType = "";

Object.assign(applicationSettings, { hostname: window.location.hostname });
Object.assign(applicationSettings, { profileType: profileType });
Object.assign(applicationSettings, { metaDescription: metaDescription });
Object.assign(applicationSettings, { defaultPageComponent: defaultPageComponent });
Object.assign(applicationSettings, { routerBaseName: routerBaseName });
Object.assign(applicationSettings, { tagManagerArgs: tagManagerArgs });

export default applicationSettings;