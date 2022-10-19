
let applicationSettings = {};

let profileType = "";

// let hostname = window.location.hostname;
let API_URL = "";
let baseURL = "/";
let siteName = "";
let applicationName = "";
let metaDescription = "";
let defaultPageComponent = "";
let routerBaseName = "";
// let applicationOffline = false;
let electronicOnly = false;
let electronicOnlyMessage = "You are viewing only electronic editions.";
let physicalOnly = false;
let physicalOnlyMessage = "You are viewing only physical editions.";
let applicationAllowUserInteractions = true;
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

  "showAllCategories": false,
  "showAllMedia": false,
  "showAllTitles": false,
  "showAllEditions": false
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
    // API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
    API_URL = "https://api.philipdick.com";
    siteName = "localhost";
    applicationName = "PKD and Me";
    metaDescription = "";
    defaultPageComponent = "Home";
    routerBaseName = "";
    // applicationOffline = false;
    electronicOnly = false;
    physicalOnly = false;
    applicationAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "";
    break;
  case "philipdick":
    API_URL = "https://api.philipdick.com";
    siteName = "Philip K. Dick";
    applicationName = "PKD and Me";
    metaDescription = "An online community for followers of Philip K. Dick, old and new, along with the promotion of his work and the sharing of information, text, audio or visual that pertains to his life, his work and his legacy. Includes news, articles, criticism, interviews, biography, synopses of major works, reviews, links, and much more.";
    defaultPageComponent = "Home";
    routerBaseName = "/pkd-and-me";
    // applicationOffline = true;
    electronicOnly = false;
    physicalOnly = false;
    applicationAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "GTM-NW2GPF2";
    break;
  case "pkd-and-me":
    API_URL = "https://api.philipdick.com";
    siteName = "Philip K. Dick";
    applicationName = "PKD and Me";
    metaDescription = "An online community for followers of Philip K. Dick, old and new, along with the promotion of his work and the sharing of information, text, audio or visual that pertains to his life, his work and his legacy. Includes news, articles, criticism, interviews, biography, synopses of major works, reviews, links, and much more.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    // applicationOffline = false;
    electronicOnly = false;
    physicalOnly = false;
    applicationAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "GTM-NW2GPF2";
    break;
  case "homeopape":
    API_URL = "https://api.philipdick.com";
    siteName = "Homeopape";
    applicationName = "Philip K. Dick Bibliography";
    metaDescription = "Purchase digital (i.e. not analog) versions of the novels, short stories, and non-fiction of Philip K. Dick or other works related to Philip K. Dick.";
    defaultPageComponent = "Homeopape";
    routerBaseName = "";
    // applicationOffline = true;
    electronicOnly = true;
    physicalOnly = false;
    applicationAllowUserInteractions = false;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "GTM-NXQJTGL";
    break;
  default:
    // API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
    API_URL = "https://api.philipdick.com";
    siteName = "PKD and Me";
    applicationName = "Philip K. Dick Bibliography";
    metaDescription = "An online community for followers of Philip K. Dick, old and new, along with the promotion of his work and the sharing of information, text, audio or visual that pertains to his life, his work and his legacy. Includes news, articles, criticism, interviews, biography, synopses of major works, reviews, links, and much more.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    // applicationOffline = false;
    electronicOnly = false;
    physicalOnly = false;
    applicationAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "";
};

// * Override the applicationOffline setting
// applicationOffline = true;
// applicationOffline = false;

// * Override the electronicOnly setting
// electronicOnly = true;
// electronicOnly = false;

// * Override the physicalOnly setting
// physicalOnly = true;
// physicalOnly = false;

// * Override the profileType setting to test the applicationSetting files
// profileType = "localhost";
// profileType = "philipdick";
// profileType = "homeopape";
// profileType = "";

// * Override the applicationAllowUserInteractions setting
// applicationAllowUserInteractions = true;
// applicationAllowUserInteractions = false;

// * In case accidentally set both to true, then electronicOnly overides.
if (physicalOnly && electronicOnly) {

  electronicOnly = true;
  physicalOnly = false;

};

Object.assign(applicationSettings, { hostname: window.location.hostname });
Object.assign(applicationSettings, { profileType: profileType });
Object.assign(applicationSettings, { API_URL: API_URL });
Object.assign(applicationSettings, { baseURL: API_URL + baseURL });
Object.assign(applicationSettings, { siteName: siteName });
Object.assign(applicationSettings, { applicationName: applicationName });
Object.assign(applicationSettings, { metaDescription: metaDescription });
Object.assign(applicationSettings, { defaultPageComponent: defaultPageComponent });
Object.assign(applicationSettings, { routerBaseName: routerBaseName });
// Object.assign(applicationSettings, { applicationOffline: applicationOffline });
Object.assign(applicationSettings, { electronicOnly: electronicOnly });
Object.assign(applicationSettings, { electronicOnlyMessage: electronicOnlyMessage });
Object.assign(applicationSettings, { physicalOnly: physicalOnly });
Object.assign(applicationSettings, { physicalOnlyMessage: physicalOnlyMessage });
Object.assign(applicationSettings, { applicationAllowUserInteractions: applicationAllowUserInteractions });
Object.assign(applicationSettings, { requireUserLogin: requireUserLogin });
Object.assign(applicationSettings, { tagManagerArgs: tagManagerArgs });
Object.assign(applicationSettings, { menuSettings: menuSettings });

export default applicationSettings;