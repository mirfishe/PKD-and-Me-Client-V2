import AppSettings from "../app/environment";
import { IsEmpty, GetDateTime, FormatLowerCase, FormatUpperCase } from "./SharedFunctions";

const componentName = "AppFunctions.js";

export const encodeURL = (titleName) => {
  // console.log(componentName, GetDateTime(), "encodeURL titleName", titleName);

  let newTitleName = titleName;

  if (IsEmpty(titleName) === false) {

    // Changes the - to | -- 02/20/2021 MF
    newTitleName = newTitleName.replaceAll("-", "|");
    // Changes the spaces to - -- 02/20/2021 MF
    newTitleName = newTitleName.replaceAll(" ", "-");
    // Changes the rest to be a safe URL -- 02/20/2021 MF
    newTitleName = encodeURIComponent(newTitleName);

  };

  // console.log(componentName, GetDateTime(), "encodeURL newTitleName", newTitleName);

  return newTitleName;

};


export const decodeURL = (titleName) => {
  // console.log(componentName, GetDateTime(), "decodeURL titleName", titleName);

  let newTitleName = titleName;

  if (IsEmpty(titleName) === false) {

    // Changes it back from a safe URL -- 02/20/2021 MF
    newTitleName = decodeURIComponent(newTitleName);
    // Changes the - to space -- 02/20/2021 MF
    newTitleName = newTitleName.replaceAll("-", " ");
    // Changes the | to - -- 02/20/2021 MF
    newTitleName = newTitleName.replaceAll("|", "-");

  };

  // console.log(componentName, GetDateTime(), "decodeURL newTitleName", newTitleName);

  return newTitleName;

};


export const removeOnePixelImage = (text, ASIN) => {
  // console.log(componentName, GetDateTime(), "removeOnePixelImage text", text);
  // console.log(componentName, GetDateTime(), "removeOnePixelImage ASIN", ASIN);

  // * SELECT * FROM `editions` WHERE imageLinkSmall like '%ir-na.amazon-adsystem.com%' OR imageLinkMedium like '%ir-na.amazon-adsystem.com%' OR imageLinkLarge like '%ir-na.amazon-adsystem.com%'

  let newText = text;

  if (IsEmpty(newText) === false) {

    // * Removes the <img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=B008ETL5R6 width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; /> -- 03/06/2021 MF
    // * This is not working. -- 03/06/2021 MF
    // newText = newText.replaceAll("<img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&", "");
    // newText = newText.replaceAll(" width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");
    // newText = newText.replaceAll("a=" + ASIN, "");

    // * Removes the <img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=B008ETL5R6 width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; /> -- 03/06/2021 MF
    // newText = newText.replaceAll("<img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=" + ASIN + " width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");

    // * The difference between the next ones is the l=li1, l=li2, l=li3 -- 03/06/2021 MF
    // * Removes the <img src="https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li1&o=1&a=0997135603" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
    newText = newText.replaceAll("<img src=\"https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li1&o=1&a=" + ASIN + "\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />", "");
    // * Removes the <img src="https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li2&o=1&a=0997135603" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
    newText = newText.replaceAll("<img src=\"https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li2&o=1&a=" + ASIN + "\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />", "");
    // * Removes the <img src="https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=0812699637" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
    newText = newText.replaceAll("<img src=\"https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=" + ASIN + "\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />", "");

    // * The difference between the next ones is the l=li1, l=li2, l=li3 -- 06/20/2021 MF
    // * Removes the <img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li1&o=1&a=B083G6CVZB width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
    newText = newText.replaceAll("<img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li1&o=1&a=" + ASIN + " width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");
    // * Removes the <img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li2&o=1&a=B083G6CVZB width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
    newText = newText.replaceAll("<img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li2&o=1&a=" + ASIN + " width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");
    // * Removes the <img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=B083G6CVZB width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
    newText = newText.replaceAll("<img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=" + ASIN + " width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");

    // * The difference between the next ones is the l=li1, l=li2, l=li3 -- 06/20/2021 MF
    // * Removes the <img src=//ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li1&o=1&a=B083G6CVZB width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
    newText = newText.replaceAll("<img src=//ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li1&o=1&a=" + ASIN + " width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");
    // * Removes the <img src=//ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li2&o=1&a=B083G6CVZB width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
    newText = newText.replaceAll("<img src=//ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li2&o=1&a=" + ASIN + " width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");
    // * Removes the <img src=//ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li3&o=1&a=B083G6CVZB width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
    newText = newText.replaceAll("<img src=//ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li3&o=1&a=" + ASIN + " width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");

    // * The difference between the next ones is the l=li1, l=li2, l=li3 -- 06/20/2021 MF
    // * Removes the <img src="https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li1&o=1&a=B086VXYZNH" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
    newText = newText.replaceAll("<img src=\"https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li1&o=1&a=" + ASIN + "\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />", "");
    // * Removes the <img src="https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li2&o=1&a=B083G6CVZB" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
    newText = newText.replaceAll("<img src=\"https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li2&o=1&a=" + ASIN + "\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />", "");
    // * Removes the <img src="https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li3&o=1&a=B083G6CVZB" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
    newText = newText.replaceAll("<img src=\"https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&l=li3&o=1&a=" + ASIN + "\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />", "");


    if (newText.includes("https://ir-na.amazon-adsystem.com")) {

      console.log(componentName, GetDateTime(), "removeOnePixelImage ASIN", ASIN);
      console.log(componentName, GetDateTime(), "removeOnePixelImage newText", newText);

    };

  };

  // console.log(componentName, GetDateTime(), "removeOnePixelImage newText", newText);

  return newText;

};


export const setLocalImagePath = (text) => {
  // console.log(componentName, GetDateTime(), "setLocalImagePath text", text);
  // console.log(componentName, GetDateTime(), "setLocalImagePath AppSettings.profileType", AppSettings.profileType);

  let newText = text;

  if (IsEmpty(newText) === false) {

    // * So that it doesn't remove the URL when the application is running locally or on a site without the images -- 03/06/2021 MF
    if (AppSettings.profileType === "philipdick" || AppSettings.profileType === "homeopape") {

      // * Removes the "https://philipdick.com" -- 03/06/2021 MF
      newText = newText.replaceAll("https://philipdick.com", "");

    };

  };

  // console.log(componentName, GetDateTime(), "setLocalPath newText", newText);

  return newText;

};


export const setLocalPath = (text) => {
  // console.log(componentName, GetDateTime(), "setLocalPath text", text);
  // console.log(componentName, GetDateTime(), "setLocalPath AppSettings.profileType", AppSettings.profileType);

  let newText = text;

  if (IsEmpty(newText) === false) {

    // * So that it doesn't remove the URL when the application is running locally or on a site without the images -- 03/06/2021 MF
    if (AppSettings.profileType === "philipdick") {

      // * Removes the "https://philipdick.com" -- 03/06/2021 MF
      newText = newText.replaceAll("https://philipdick.com", "");

    };

  };

  // console.log(componentName, GetDateTime(), "setLocalPath newText", newText);

  return newText;

};


export const createImageName = (titleName) => {
  // console.log(componentName, GetDateTime(), "createImageName titleName", titleName);

  let newImageName = "";

  if (IsEmpty(titleName) === false) {

    // * Capitalize the first letter of every word -- 03/06/2021 MF
    newImageName = titleName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    // * I'm sure there's a more elegant way to do this -- 03/06/2021 MF
    // newImageName = newImageName.replaceAll(".", "");
    // newImageName = newImageName.replaceAll("?", "");
    // newImageName = newImageName.replaceAll(",", "");
    // newImageName = newImageName.replaceAll(":", "");
    // newImageName = newImageName.replaceAll("-", "");
    //newImageName = newImageName.replace(/[.,\/#\'\?!$%\^&\*;:{}=\-_`~()]/g,"");
    //newImageName = newImageName.replaceAll(" ", "");
    // * Remove all spaces - Doesn't work -- 03/06/2021 MF
    // newImageName = newImageName.replace(/\s{2,}/g," ");

    // * https://www.codefari.com/2019/11/removereplace-special-characters-from.html -- 03/06/2021 MF
    // SELECT regexp_replace('Remove!@#$ Special &*&characters', '[^\w]+','','g');
    // regexp_replace("titleName", '[^\w]+')
    // newImageName = titleName.replace(regExpr, "");

    // select "titleName"
    // --, replace("titleName", '-', '|')
    // , regexp_replace("titleName", '[^\w]+','','g')
    // , regexp_replace("titleName", '[^\w]+',' ','g')
    // , replace(regexp_replace("titleName", '[^\w]+',' ','g'), ' ', '-')
    // from titles

    // * https://stackoverflow.com/questions/9705194/replace-special-characters-in-a-string-with-underscore/9705227
    newImageName = newImageName.replace(/[^a-zA-Z0-9]/g, "");


    newImageName = "https://philipdick.com/images/covers/" + newImageName + ".jpg";

  };

  // console.log(componentName, GetDateTime(), "createImageName newImageName", newImageName);

  return newImageName;

};


export const createTitleURL = (titleName) => {
  // console.log(componentName, GetDateTime(), "createImageName titleName", titleName);

  let newTitleURL = "";

  if (IsEmpty(titleName) === false) {

    // * Capitalize the first letter of every word -- 03/06/2021 MF
    newTitleURL = titleName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    // * I'm sure there's a more elegant way to do this -- 03/06/2021 MF
    // newTitleURL = newTitleURL.replaceAll(".", "");
    // newTitleURL = newTitleURL.replaceAll("?", "");
    // newTitleURL = newTitleURL.replaceAll(",", "");
    // newTitleURL = newTitleURL.replaceAll(":", "");
    // newTitleURL = newTitleURL.replaceAll("-", "");
    // newTitleURL = newTitleURL.replace(/[.,\/#\'\?!$%\^&\*;:{}=\-_`~()]/g,"");
    // newTitleURL = newTitleURL.replaceAll(" ", "");
    // * Remove all spaces - Doesn't work -- 03/06/2021 MF
    // newTitleURL = newTitleURL.replace(/\s{2,}/g," ");

    // * https://www.codefari.com/2019/11/removereplace-special-characters-from.html -- 03/06/2021 MF
    // SELECT regexp_replace('Remove!@#$ Special &*&characters', '[^\w]+','','g');
    // regexp_replace("titleName", '[^\w]+')
    // newTitleURL = titleName.replace(regExpr, "");

    // select "titleName"
    // --, replace("titleName", '-', '|')
    // , regexp_replace("titleName", '[^\w]+','','g')
    // , regexp_replace("titleName", '[^\w]+',' ','g')
    // * Use this regular expression to create the titleURL -- 03/06/2021 MF
    // * Execpt that letters after ' are captitalized also
    // , replace(regexp_replace(initcap("titleName"), '[^\w]+',' ','g'), ' ', '-')
    // from titles

    // * https://stackoverflow.com/questions/9705194/replace-special-characters-in-a-string-with-underscore/9705227 -- 03/06/2021 MF
    newTitleURL = newTitleURL.replace(/[^a-zA-Z0-9]/g, "-");
    // ? I'm sure there's a more elegant way to do this -- 03/06/2021 MF
    newTitleURL = newTitleURL.replaceAll("---", "-");
    newTitleURL = newTitleURL.replaceAll("--", "-");


    // newTitleURL = "https://philipdick.com/images/covers/" + newTitleURL + ".jpg";

  };

  // console.log(componentName, GetDateTime(), "createImageName newTitleURL", newTitleURL);

  return newTitleURL;

};


export const getASIN = (textLinkFull) => {
  // console.log(componentName, GetDateTime(), "getASIN textLinkFull", textLinkFull);

  let txtASIN = "";

  // select substring("textLinkFull" from position('/dp/' in "textLinkFull") + 4 for 10) from editions

  if (IsEmpty(textLinkFull) === false) {

    // console.log(componentName, GetDateTime(), "getASIN textLinkFull.indexOf(\"/dp/\")" , textLinkFull.indexOf("/dp/"));
    // console.log(componentName, GetDateTime(), "getASIN textLinkFull.indexOf(\"/product/\")" , textLinkFull.indexOf("/product/"));

    if (textLinkFull.indexOf("/dp/") !== -1) {

      // console.log(componentName, GetDateTime(), "getASIN textLinkFull.substring(textLinkFull.indexOf(\"/dp/\") + 4, textLinkFull.indexOf(\"/ref=\"))", textLinkFull.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("/ref=")));
      // txtASIN = textLinkFull.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("/ref="));

      // txtASIN = txtASIN.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("?&linkCode="));

      // txtASIN = txtASIN.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("?coliid="));

      // txtASIN = txtASIN.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("?_encoding="));

      if (textLinkFull.indexOf("/ref=") !== -1) {

        txtASIN = textLinkFull.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("/ref="));

      } else if (textLinkFull.indexOf("?&linkCode=") !== -1) {

        txtASIN = txtASIN.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("?&linkCode="));

      } else if (textLinkFull.indexOf("?coliid=") !== -1) {

        txtASIN = txtASIN.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("?coliid="));

      } else if (textLinkFull.indexOf("?_encoding=") !== -1) {

        txtASIN = txtASIN.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("?_encoding="));

      };

    } else if (textLinkFull.indexOf("/product/") !== -1) {

      // console.log(componentName, GetDateTime(), "getASIN textLinkFull.substring(textLinkFull.indexOf(\"/dp/\") + 4, textLinkFull.indexOf(\"/ref=\"))", textLinkFull.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("/ref=")));
      // txtASIN = textLinkFull.substring(textLinkFull.indexOf("/product/") + 9, textLinkFull.indexOf("/ref="));

      // txtASIN = txtASIN.substring(textLinkFull.indexOf("/product/") + 9, textLinkFull.indexOf("?&linkCode="));

      if (textLinkFull.indexOf("/ref=") !== -1) {

        txtASIN = textLinkFull.substring(textLinkFull.indexOf("/product/") + 9, textLinkFull.indexOf("/ref="));

      } else if (textLinkFull.indexOf("?&linkCode=") !== -1) {

        txtASIN = txtASIN.substring(textLinkFull.indexOf("/product/") + 9, textLinkFull.indexOf("?&linkCode="));

      } else if (textLinkFull.indexOf("?coliid=") !== -1) {

        txtASIN = txtASIN.substring(textLinkFull.indexOf("/product/") + 4, textLinkFull.indexOf("?coliid="));

      } else if (textLinkFull.indexOf("?_encoding=") !== -1) {

        txtASIN = txtASIN.substring(textLinkFull.indexOf("/product/") + 4, textLinkFull.indexOf("?_encoding="));

      };

    };

  } else {
    // return false;
    // return null;
    // return "";
  };

  return txtASIN;

};


export const ToTitleCase = (title) => {
  // console.log(componentName, GetDateTime(), "ToTitleCase title", title);

  // * Doesn't handle acronyms execpt for the few listed in the code below. -- 06/26/2021 MF

  // * https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript -- 06/26/2021 MF
  let i, j, str, lowers, uppers;

  str = title.replaceAll("&#39;", "'").replaceAll("&Amp;", "&").replaceAll("&amp;", "&").replaceAll("&Quot;", "\"").replaceAll("&quot;", "\"");

  str = str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {

    return FormatUpperCase(txt.charAt(0)) + FormatLowerCase(txt.substr(1));

  });

  // * Certain minor words should be left lowercase unless they are the first or last words in the string. -- 06/26/2021 MF
  lowers = ["A", "An", "The", "And", "But", "Or", "For", "Nor", "As", "At",
    "By", "For", "From", "In", "Into", "Near", "Of", "On", "Onto", "To", "With"];

  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp("\\s" + lowers[i] + "\\s", "g"),
      function (txt) {

        return FormatLowerCase(txt);

      });

  // * Certain words such as initialisms or acronyms should be left uppercase. -- 06/26/2021 MF
  uppers = ["Id", "Tv", "Pkd"];

  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(new RegExp("\\b" + uppers[i] + "\\b", "g"),
      FormatUpperCase(uppers[i]));

  return str;

};


export const Log = (baseURL, logObject) => {
  // console.log(componentName, GetDateTime(), "Log logObject", logObject);

  // const dispatch = useDispatch();

  let logResult;

  let operationValue = "Log";

  let url = `${baseURL}logs/`;
  let response = "";
  let data = "";

  fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ recordObject: logObject })
  })
    .then(response => {
      // console.log(componentName, GetDateTime(), "Log response", response);

      if (!response.ok) {

        throw Error(`${response.status} ${response.statusText} ${response.url}`);

      } else {

        return response.json();

      };

    })
    .then(results => {
      // console.log(componentName, GetDateTime(), "Log results", results);

      data = results;

    })
    .catch((error) => {
      // console.error(componentName, GetDateTime(), "Log error", error);
      // console.error(componentName, GetDateTime(), "Log error.name", error.name);
      // console.error(componentName, GetDateTime(), "Log error.message", error.message);
      // console.error(componentName, GetDateTime(), "Log error.stack", error.stack);
      // dispatch(addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`));

      let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, logObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

    });

  return logResult;

};


export const LogError = (baseURL, operation, componentName, dataObject, errorObject) => {
  // console.log(componentName, GetDateTime(), "LogError errorObject", errorObject);

  // const dispatch = useDispatch();

  let logErrorResult;

  let recordObject = {
    operation: operation,
    componentName: componentName,
    dataObject: dataObject,
    errorObject: errorObject
  };

  let url = `${baseURL}errorLogs/`;

  fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ recordObject: recordObject })
  })
    .then(response => {
      // console.log(componentName, GetDateTime(), "LogError response", response);

      if (!response.ok) {

        throw Error(`${response.status} ${response.statusText} ${response.url}`);

      } else {

        if (response.status === 200) {

          return response.json();

        } else {

          return response.status;

        };

      };

    })
    .then(results => {
      // console.log(componentName, GetDateTime(), "LogError results", results);

    })
    .catch((error) => {
      // console.error(componentName, GetDateTime(), "LogError error", error);
      // console.error(componentName, GetDateTime(), "LogError error.name", error.name);
      // console.error(componentName, GetDateTime(), "LogError error.message", error.message);
      // dispatch(addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`));
    });

  return logErrorResult;

};
