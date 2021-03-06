
let AppSettings = {};

let profileType = "";

// let hostname = window.location.hostname;
let API_URL = "";
let baseURL = "/";
let siteName = "";
let appName = "";
let metaDescription = "";
let defaultPageComponent = "";
let routerBaseName = "";
let appOffline = false;
let electronicOnly = false;
let electronicOnlyMessage = "You are viewing only electronic editions.";
let physicalOnly = false;
let physicalOnlyMessage = "You are viewing only physical editions.";
let appAllowUserInteractions = true;
let requireUserLogin = true;

let tagManagerArgs = {
  gtmId: ""
};

let menuSettings = {
  "showAllMenuItems": false,

  "showNew": true,
  "showAbout": true,
  "showHomeopape": false,
  "showDickian": false,

  "showCategoryList": false,
  "showMediaList": false,
  "showTitleList": false,
  "showEditionList": false,

  "showAllCategories": false,
  "showAllMedia": false,
  "showAllTitles": false,
  "showAllEditions": false
};

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    profileType = "localhost";
    break;
  case "pkd-and-me-server":
    profileType = "heroku";
    break;
  case "pkd-and-me-client":
    profileType = "heroku";
    break;
  case "pkd-and-me":
    profileType = "heroku";
    break;
  case "pkd-and-me.herokuapp.com":
    profileType = "heroku";
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
    API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
    // API_URL = "https://pkd-and-me-server.herokuapp.com";
    siteName = "localhost";
    appName = "PKD and Me";
    metaDescription = "";
    defaultPageComponent = "Home";
    routerBaseName = "";
    appOffline = false;
    electronicOnly = false;
    physicalOnly = false;
    appAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "";
    break;
  case "heroku":
    API_URL = "https://pkd-and-me-server.herokuapp.com";
    siteName = "PKD and Me";
    appName = "Philip K. Dick Bibliography";
    metaDescription = "Purchase versions of the novels, short stories, and non-fiction of Philip K. Dick or other works related to Philip K. Dick.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    appOffline = false;
    electronicOnly = false;
    physicalOnly = false;
    appAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "";
    break;
  case "philipdick":
    API_URL = "https://pkd-and-me-server.herokuapp.com";
    siteName = "Philip K. Dick";
    appName = "PKD and Me";
    metaDescription = "An online community for followers of Philip K. Dick, old and new, along with the promotion of his work and the sharing of information, text, audio or visual that pertains to his life, his work and his legacy. Includes news, articles, criticism, interviews, biography, synopses of major works, reviews, links, and much more.";
    defaultPageComponent = "Home";
    routerBaseName = "/pkd-and-me";
    appOffline = true;
    electronicOnly = false;
    physicalOnly = false;
    appAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "GTM-NW2GPF2";
    break;
  case "homeopape":
    API_URL = "https://pkd-and-me-server.herokuapp.com";
    siteName = "Homeopape";
    appName = "Philip K. Dick Bibliography";
    metaDescription = "Purchase digital (i.e. not analog) versions of the novels, short stories, and non-fiction of Philip K. Dick or other works related to Philip K. Dick.";
    defaultPageComponent = "Homeopape";
    routerBaseName = "";
    appOffline = true;
    electronicOnly = true;
    physicalOnly = false;
    appAllowUserInteractions = false;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "GTM-NXQJTGL";
    break;
  default:
    // API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
    API_URL = "https://pkd-and-me-server.herokuapp.com";
    siteName = "PKD and Me";
    appName = "Philip K. Dick Bibliography";
    metaDescription = "An online community for followers of Philip K. Dick, old and new, along with the promotion of his work and the sharing of information, text, audio or visual that pertains to his life, his work and his legacy. Includes news, articles, criticism, interviews, biography, synopses of major works, reviews, links, and much more.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    appOffline = false;
    electronicOnly = false;
    physicalOnly = false;
    appAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "";
};

// * Override the appOffline setting
// appOffline = true;
// appOffline = false;

// * Override the electronicOnly setting
// electronicOnly = true;
// electronicOnly = false;

// * Override the physicalOnly setting
// physicalOnly = true;
// physicalOnly = false;

// * Override the profileType setting to test the appSetting files
// profileType = "localhost";
// profileType = "heroku";
// profileType = "philipdick";
// profileType = "homeopape";
// profileType = "";

// * Override the appAllowUserInteractions setting
// appAllowUserInteractions = true;
// appAllowUserInteractions = false;

// * In case accidentally set both to true, then electronicOnly overides.
if (physicalOnly && electronicOnly) {
  electronicOnly = true;
  physicalOnly = false;
};

Object.assign(AppSettings, { hostname: window.location.hostname });
Object.assign(AppSettings, { profileType: profileType });
Object.assign(AppSettings, { API_URL: API_URL });
Object.assign(AppSettings, { baseURL: API_URL + baseURL });
Object.assign(AppSettings, { siteName: siteName });
Object.assign(AppSettings, { appName: appName });
Object.assign(AppSettings, { metaDescription: metaDescription });
Object.assign(AppSettings, { defaultPageComponent: defaultPageComponent });
Object.assign(AppSettings, { routerBaseName: routerBaseName });
Object.assign(AppSettings, { appOffline: appOffline });
Object.assign(AppSettings, { electronicOnly: electronicOnly });
Object.assign(AppSettings, { electronicOnlyMessage: electronicOnlyMessage });
Object.assign(AppSettings, { physicalOnly: physicalOnly });
Object.assign(AppSettings, { physicalOnlyMessage: physicalOnlyMessage });
Object.assign(AppSettings, { appAllowUserInteractions: appAllowUserInteractions });
Object.assign(AppSettings, { requireUserLogin: requireUserLogin });
Object.assign(AppSettings, { tagManagerArgs: tagManagerArgs });
Object.assign(AppSettings, { menuSettings: menuSettings });

export default AppSettings;