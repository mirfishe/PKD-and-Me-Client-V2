import AppSettings from "./environment";

const componentName = "sharedFunctions.js";

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


export const IsEmpty = (value) => {
  // console.log(componentName, GetDateTime(), "IsEmpty value", value);

  // * https://stackoverflow.com/questions/4597900/checking-something-isempty-in-javascript -- 03/06/2021 MF
  // * https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in -- 03/06/2021 MF

  // const isEmpty = (object) => {

  //   for (var key in object) {

  //     if (object.hasOwnProperty(key)) {

  //         return false;

  //     };

  //   };

  //   return true;

  // };

  // return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.toString().trim().length === 0);
  return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);

  // * Returns true -- 03/06/2021 MF
  // console.log(componentName, GetDateTime(), "IsEmpty(\"\")", IsEmpty(""));
  // console.log(componentName, GetDateTime(), "IsEmpty(null)", IsEmpty(null));
  // console.log(componentName, GetDateTime(), "IsEmpty(undefined)", IsEmpty(undefined));
  // console.log(componentName, GetDateTime(), "IsEmpty([])", IsEmpty([]));
  // console.log(componentName, GetDateTime(), "IsEmpty({})", IsEmpty({}));

  // * Returns false -- 03/06/2021 MF
  // console.log(componentName, GetDateTime(), "IsEmpty(\"test\")", IsEmpty("test"));
  // console.log(componentName, GetDateTime(), "IsEmpty(5)", IsEmpty(5));
  // console.log(componentName, GetDateTime(), "IsEmpty(true)", IsEmpty(true));
  // console.log(componentName, GetDateTime(), "IsEmpty([\"test\"])", IsEmpty(["test"]));
  // console.log(componentName, GetDateTime(), "IsEmpty({test: \"test\"})", IsEmpty({ test: "test" }));

};


export const DisplayValue = (variableValue) => {
  // console.log(componentName, GetDateTime(), "DisplayValue variableValue", variableValue);

  let displayValue = "";

  if (IsEmpty(variableValue) === false) {

    if (variableValue === true) {

      displayValue = "True";

    } else if (variableValue === false) {

      displayValue = "False";

    } else if (variableValue instanceof Date) {

      displayValue = variableValue.toLocaleString();

    } else {

      displayValue = variableValue;

    };

  } else {

    displayValue = "Value is undefined or null.";

  };

  return displayValue;

};


export const DisplaySpaceAfterComma = (text) => {
  // console.log(componentName, GetDateTime(), "DisplaySpaceAfterComma text", text);

  let displayText = text;

  if (IsEmpty(text) === false) {

    displayText = text.replaceAll(",", ", ");

  };

  // console.log(componentName, GetDateTime(), "DisplaySpaceAfterComma displayText", displayText);

  return displayText;

};


export const RemoveForwardSlashes = (text) => {
  // console.log(componentName, GetDateTime(), "RemoveForwardSlashes text", text);

  let displayText = text;

  if (IsEmpty(text) === false) {

    displayText = text.toString().replace(/\//g, "");

  };

  // console.log(componentName, GetDateTime(), "RemoveForwardSlashes displayText", displayText);

  return displayText;

};


export const TryParseJSON = (jsonString) => {
  // console.log(componentName, GetDateTime(), "TryParseJSON jsonString", jsonString);

  // * https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try -- 03/06/2021 MF
  try {

    let jsonData = JSON.parse(jsonString);

    // * Handle non-exception-throwing cases: -- 03/05/2021
    // * Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking, -- 03/05/2021
    // * but... JSON.parse(null) returns null, and typeof null === "object",  -- 03/05/2021
    // * so we must check for that, too. Thankfully, null is falsey, so this suffices: -- 03/05/2021
    if (jsonData && typeof jsonData === "object") {

      return jsonData;

    };
  }
  catch (error) {
    // ! Don't display this error in the console. This function is already returning false is the JSON file is not in the correct format. -- 03/06/2021 MF
    // console.log(componentName, GetDateTime(), "TryParseJSON error", error);
  };

  return false;

};


export const DisplayObjectData = (ObjectData) => {
  // console.log(componentName, GetDateTime(), "DisplayObjectData ObjectData", ObjectData);

  let objectDataString = JSON.stringify(ObjectData);

  if (IsEmpty(objectDataString) === false) {

    objectDataString = objectDataString.replaceAll("\\", "");

    objectDataString = objectDataString.replaceAll("[{\"", "<p><strong>");
    objectDataString = objectDataString.replaceAll("\"},{\"", "</p><p><strong>");
    objectDataString = objectDataString.replaceAll("\"}]", "</p>");

    objectDataString = objectDataString.replaceAll("{\"", "<p><strong>");
    objectDataString = objectDataString.replaceAll("\"}", "</p>");

    objectDataString = objectDataString.replaceAll("\":\"", "</strong> = ");
    objectDataString = objectDataString.replaceAll("\":", "</strong> = ");

    objectDataString = objectDataString.replaceAll("\",\"", "</p><p><strong>");
    objectDataString = objectDataString.replaceAll(",\"", "</p><p><strong>");

    objectDataString = objectDataString.replaceAll("},", "");

    objectDataString = objectDataString.replaceAll("[]", "");

    objectDataString = objectDataString.replaceAll("[\"", "");
    objectDataString = objectDataString.replaceAll("\"]", "");

    objectDataString = objectDataString.replaceAll("[", "");
    objectDataString = objectDataString.replaceAll("]", "");
    objectDataString = objectDataString.replaceAll("{", "");
    objectDataString = objectDataString.replaceAll("}", "");

    objectDataString = objectDataString.replace(/<strong>(.*?)<\/strong>/g, (match) => { return FormatTitle(match); });

  };

  return (objectDataString);

};


export const DisplayObjectDataTable = (ObjectData) => {
  // console.log(componentName, GetDateTime(), "DisplayObjectDataTable ObjectData", ObjectData);

  let objectDataString = JSON.stringify(ObjectData);

  // console.log(componentName, GetDateTime(), "DisplayObjectDataTable objectDataString", objectDataString);

  if (IsEmpty(objectDataString) === false) {

    // console.log(componentName, GetDateTime(), "DisplayObjectDataTable objectDataString", objectDataString);

    objectDataString = objectDataString.replaceAll("\\", "");

    objectDataString = objectDataString.replaceAll("[{\"", "<tr><th>");
    objectDataString = objectDataString.replaceAll("\"},{\"", "</td><tr><th>");
    objectDataString = objectDataString.replaceAll("\"}]", "</td></tr>");
    // objectDataString = objectDataString.replaceAll("[{\\\"", "<tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\"},{\\\"", "</td><tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\"}]", "</td></tr>");

    objectDataString = objectDataString.replaceAll("{\"", "<tr><th>");
    objectDataString = objectDataString.replaceAll("\"}", "</td></tr>");
    // objectDataString = objectDataString.replaceAll("{\\\"", "<tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\"}", "</td></tr>");

    objectDataString = objectDataString.replaceAll("\":\"", "</th><td>");
    objectDataString = objectDataString.replaceAll("\":", "</th><td>");
    // objectDataString = objectDataString.replaceAll("\\\":\\\"", "</th><td>");
    // objectDataString = objectDataString.replaceAll("\\\":", "</th><td>");

    objectDataString = objectDataString.replaceAll("\",\"", "</td><tr><th>");
    objectDataString = objectDataString.replaceAll(",\"", "</td><tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\",\\\"", "</td><tr><th>");
    // objectDataString = objectDataString.replaceAll(",\\\"", "</td><tr><th>");

    objectDataString = objectDataString.replaceAll("},", "");

    objectDataString = objectDataString.replaceAll("[]", "");

    objectDataString = objectDataString.replaceAll("[\"", "");
    objectDataString = objectDataString.replaceAll("\"]", "");
    // objectDataString = objectDataString.replaceAll("[\\\"", "");
    // objectDataString = objectDataString.replaceAll("\\\"]", "");

    objectDataString = objectDataString.replaceAll("[", "");
    objectDataString = objectDataString.replaceAll("]", "");
    objectDataString = objectDataString.replaceAll("{", "");
    objectDataString = objectDataString.replaceAll("}", "");


    objectDataString = objectDataString.replace(/<th>(.*?)<\/th>/g, (match) => { return FormatTitle(match); });

  };

  return (objectDataString);

};


export const DisplayObjectDataXML = (ObjectData) => {
  // console.log(componentName, GetDateTime(), "DisplayObjectDataXML ObjectData", ObjectData);

  let objectDataString = JSON.stringify(ObjectData);

  if (IsEmpty(objectDataString) === false) {

    objectDataString = objectDataString.replaceAll("\\", "");

    objectDataString = objectDataString.replaceAll("[{\"", "<category>");
    objectDataString = objectDataString.replaceAll("\"},{\"", "</data><category>");
    objectDataString = objectDataString.replaceAll("\"}]", "<data>");

    objectDataString = objectDataString.replaceAll("{\"", "<category>");
    objectDataString = objectDataString.replaceAll("\"}", "<data>");

    objectDataString = objectDataString.replaceAll("\":\"", "</category><data>");
    objectDataString = objectDataString.replaceAll("\":", "</category><data>");

    objectDataString = objectDataString.replaceAll("\",\"", "</data><category>");
    objectDataString = objectDataString.replaceAll(",\"", "</data><category>");

    objectDataString = objectDataString.replaceAll("},", "");

    objectDataString = objectDataString.replaceAll("[]", "");

    objectDataString = objectDataString.replaceAll("[\"", "");
    objectDataString = objectDataString.replaceAll("\"]", "");

    objectDataString = objectDataString.replaceAll("[", "");
    objectDataString = objectDataString.replaceAll("]", "");
    objectDataString = objectDataString.replaceAll("{", "");
    objectDataString = objectDataString.replaceAll("}", "");

  };

  return (objectDataString);

};


export const GetDateTime = () => {
  // console.log("GetDateTime");
  // console.log("GetDateTime new Date().toISOString().slice(0, 19).replace(\"T\", \" \")", new Date().toISOString().slice(0, 19).replace("T", " "));
  // console.log("GetDateTime new Date().toISOString().slice(0, 19).replace(\"T\", \"\")", new Date().toISOString().slice(0, 19).replace("T", ""));
  // console.log("GetDateTime new Date().toLocaleString().slice(0, 19).replace(\"T\", \" \")", new Date().toLocaleString().slice(0, 19).replace("T", " "));
  // console.log("GetDateTime new Date().toLocaleString().slice(0, 19).replace(\"T\", \"\")", new Date().toLocaleString().slice(0, 19).replace("T", ""));

  // * Time returned does not consider the time zone without adjustments. -- 08/09/2021 MF
  // * https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes -- 08/09/2021 MF

  // * https://stackoverflow.com/questions/12413243/javascript-date-format-like-iso-but-local -- 08/09/2021 MF
  let timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  // return new Date().toLocaleString();
  // return new Date().toLocaleString().slice(0, 19).replace("T", " ");
  // return new Date().toISOString().slice(0, 19).replace("T", " ");
  return new Date(new Date() - timezoneOffset).toISOString().slice(0, 19).replace("T", " ");

};


export const GetCurrentDay = () => {

  return new Date().getDate();

};


export const GetCurrentMonth = () => {

  return new Date().getMonth() + 1;

};


export const GetCurrentYear = () => {

  return new Date().getFullYear();

};


export const DisplayDate = (dateToDisplay, removeLeadingZeroes) => {
  // console.log(componentName, GetDateTime(), "DisplayDate dateToDisplay", dateToDisplay);
  // console.log(componentName, GetDateTime(), "DisplayDate removeLeadingZeroes", removeLeadingZeroes);

  let newDisplayDate = "";

  if (IsEmpty(dateToDisplay) === false) {

    // * Year
    let yyyy = dateToDisplay.toString().substring(0, 4);
    // * Month
    let mm = dateToDisplay.toString().substring(5, 7);
    // * Day
    let dd = dateToDisplay.toString().substring(8, 10);

    newDisplayDate = mm + "/" + dd + "/" + yyyy;

    if (IsEmpty(newDisplayDate) === false && removeLeadingZeroes === true) {

      newDisplayDate = newDisplayDate.replace(/\b0/g, "");

    };

  };

  // console.log(componentName, GetDateTime(), "DisplayDate dateToDisplay", dateToDisplay);

  return newDisplayDate;

};


export const DisplayDateAndTime = (dateToDisplay, removeLeadingZeroes) => {
  // console.log(componentName, GetDateTime(), "DisplayDateAndTime dateToDisplay", dateToDisplay);
  // console.log(componentName, GetDateTime(), "DisplayDateAndTime removeLeadingZeroes", removeLeadingZeroes);

  let newDisplayDateAndTime = "";

  if (IsEmpty(dateToDisplay) === false) {

    // * Year
    let yyyy = dateToDisplay.toString().substring(0, 4);
    // * Month
    let mm = dateToDisplay.toString().substring(5, 7);
    // * Day
    let dd = dateToDisplay.toString().substring(8, 10);

    // // * Hour
    // let hour = dateToDisplay.toString().substring(11, 12);
    // // * Minute
    // let minute = dateToDisplay.toString().substring(15, 16);

    // * Time
    let time = dateToDisplay.toString().substring(11, 16);

    newDisplayDateAndTime = mm + "/" + dd + "/" + yyyy + " " + time;

    if (IsEmpty(newDisplayDateAndTime) === false && removeLeadingZeroes === true) {

      newDisplayDateAndTime = newDisplayDateAndTime.replace(/\b0/g, "");

    };

  };

  // console.log(componentName, GetDateTime(), "DisplayDateAndTime newDisplayDateAndTime", newDisplayDateAndTime);

  return newDisplayDateAndTime;

};


export const DisplayYear = (dateToDisplay) => {
  // console.log(componentName, GetDateTime(), "DisplayYear dateToDisplay", dateToDisplay);

  let newDisplayDate = "";

  if (IsEmpty(dateToDisplay) === false) {

    // * Year
    let yyyy = dateToDisplay.toString().substring(0, 4);
    // * Month
    // let mm = dateToDisplay.toString().substring(5, 7);
    // * Day
    // let dd = dateToDisplay.toString().substring(8, 10);

    // newDisplayDate = mm + "/" + dd + "/" + yyyy;

    newDisplayDate = yyyy;

  };

  // console.log(componentName, GetDateTime(), "DisplayYear dateToDisplay", dateToDisplay);

  return newDisplayDate;

};


export const DaysSince = (dateToCompare) => {
  // console.log(componentName, GetDateTime(), "DaysSince dateToCompare", dateToCompare);

  // * https://stackoverflow.com/questions/12986068/how-to-calculate-number-of-days-between-today-and-given-date-and-code-for-gettim -- 10/18/2021 MF

  let newDaysSince = 0;

  if (IsEmpty(dateToCompare) === false) {

    let today = new Date();
    let compareDate = new Date(dateToCompare);
    let timeInMilliseconds = compareDate.getTime() - today.getTime();

    newDaysSince = Math.abs(Math.ceil(timeInMilliseconds / (1000 * 60 * 60 * 24)));

  };

  // console.log(componentName, GetDateTime(), "DaysSince newDaysSince", newDaysSince);

  return newDaysSince;

};


// export const displayParagraphs = (text) => {
//     // * Not needed; Use the .displayParagraphs css style

//     // console.log(componentName, GetDateTime(), "displayParagraphs text", text);

//     let newText = text;

//     if (IsEmpty(newText) === false) {

//         // newText = "<p>" + newText;

//         // * Changes the \n to </p><p>
//         newText = newText.replaceAll("\n", "</p><p>");

//         // newText = newText + "</p>";

//     };

//     // console.log(componentName, GetDateTime(), "displayParagraphs newText", newText);

//     return newText;

// };


export const HasNonEmptyProperty = (objectItem, propertyName) => {
  // console.log(componentName, GetDateTime(), "HasFalseProperty property", property);

  let nonEmptyProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && IsEmpty(objectItem[propertyName]) === false) {

      nonEmptyProperty = true;

    };

  };

  return nonEmptyProperty;

};


export const HasEqualsProperty = (objectItem, propertyName, value) => {
  // console.log(componentName, GetDateTime(), "HasEqualsProperty propertyName", propertyName);

  let equalsProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && IsEmpty(objectItem[propertyName]) === false && objectItem[propertyName] === value) {

      equalsProperty = true;

    };

  };

  return equalsProperty;

};


export const HasTrueProperty = (objectItem, propertyName) => {
  // console.log(componentName, GetDateTime(), "HasTrueProperty property", property);

  let trueProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && objectItem[propertyName] === true) {

      trueProperty = true;

    };

  };

  return trueProperty;

};


export const HasFalseProperty = (objectItem, propertyName) => {
  // console.log(componentName, GetDateTime(), "HasFalseProperty property", property);

  let falseProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && objectItem[propertyName] === false) {

      falseProperty = true;

    };

  };

  return falseProperty;

};


export const TruncateText = (text, limit) => {
  // console.log(componentName, GetDateTime(), "TruncateText text", text);

  // * https://stackoverflow.com/questions/4700226/i-want-to-truncate-a-text-or-line-with-ellipsis-using-javascript -- 03/06/2021 MF

  // let newText = text;

  if (IsEmpty(text) === false && text.length > limit) {

    for (let i = limit; i > 0; i--) {

      if (text.charAt(i) === " " && (text.charAt(i - 1) !== "," || text.charAt(i - 1) !== "." || text.charAt(i - 1) !== ";")) {

        return text.substring(0, i) + "...";

      };

    };

    return text.substring(0, limit) + "...";

  } else {

    return text;

  };

  // console.log(componentName, GetDateTime(), "TruncateText newText", newText);

  // return newText;

};


export const ValidateMilitaryTime = (timeEntered) => {
  // console.log(componentName, GetDateTime(), "ValidateMilitaryTime timeEntered", timeEntered);

  // * Time in 24 clock, no colon -- 03/05/2021 MF

  // * all digits-- 03/05/2021 MF
  // * length is 4
  // * first digit is either a 0 or 1 or 2
  // * second digit is either a 0 or 1 or 2 or 3 or 4 or 5 
  // * third digit is either a 0 or 1 or 2 or 3 or 4 or 5 

  // * Make sure that it is a string-- 03/05/2021 MF
  // console.log(componentName, GetDateTime(), "typeof \"8\"", typeof "8");

  let validTimeFormat = true;

  let timeEnteredString = "";

  if (typeof timeEntered.toString() === "string") {

    timeEnteredString = timeEntered.toString();

    timeEnteredString = timeEnteredString.trim();

    if (timeEnteredString.length !== 4) {

      validTimeFormat = false;

    } else {

      if (isNaN(parseInt(timeEnteredString.charAt(0))) === true || isNaN(parseInt(timeEnteredString.charAt(1))) === true || isNaN(parseInt(timeEnteredString.charAt(2))) === true || isNaN(parseInt(timeEnteredString.charAt(3))) === true) {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(0) !== "0" && timeEnteredString.charAt(0) !== "1" && timeEnteredString.charAt(0) !== "2") {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(0) === "2" && timeEnteredString.charAt(1) !== "0" && timeEnteredString.charAt(1) !== "1" && timeEnteredString.charAt(1) !== "2" && timeEnteredString.charAt(1) !== "3" && timeEnteredString.charAt(1) !== "4") {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(0) === "2" && timeEnteredString.charAt(1) !== "4" && timeEnteredString.charAt(2) !== "0" && timeEnteredString.charAt(3) !== "0") {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(2) !== "0" && timeEnteredString.charAt(2) !== "1" && timeEnteredString.charAt(2) !== "2" && timeEnteredString.charAt(2) !== "3" && timeEnteredString.charAt(2) !== "4" && timeEnteredString.charAt(2) !== "5") {

        validTimeFormat = false;

      };


      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"8\")", ValidateMilitaryTime("8"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"18\")", ValidateMilitaryTime("10"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"800\")", ValidateMilitaryTime("800"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"0800\")", ValidateMilitaryTime("0800"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"0880\")", ValidateMilitaryTime("0880"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"1600\")", ValidateMilitaryTime("1600"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"1645\")", ValidateMilitaryTime("1645"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"1650\")", ValidateMilitaryTime("1650"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"1680\")", ValidateMilitaryTime("1680"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"2150\")", ValidateMilitaryTime("2150"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"2160\")", ValidateMilitaryTime("2160"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"2300\")", ValidateMilitaryTime("2300"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"2500\")", ValidateMilitaryTime("2500"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(\"3000\")", ValidateMilitaryTime("3000"));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(8)", ValidateMilitaryTime(8));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(18)", ValidateMilitaryTime(10));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(800)", ValidateMilitaryTime(800));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(1600)", ValidateMilitaryTime(1600));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(1680)", ValidateMilitaryTime(1680));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(2500)", ValidateMilitaryTime(2500));
      // console.log(componentName, GetDateTime(), "ValidateMilitaryTime(3000)", ValidateMilitaryTime(3000));



      // let timeArray = timeEnteredString.split("");

      // // console.log(componentName, GetDateTime(), "ValidateMilitaryTime timeArray", timeArray);

      // for (let i = 0; i < timeArray.length; i++) {

      //   // console.log(componentName, GetDateTime(), "ValidateMilitaryTime parseInt(timeArray[i])", parseInt(timeArray[i]));
      //   // console.log(componentName, GetDateTime(), "ValidateMilitaryTime isNaN(parseInt(timeArray[i]))", isNaN(parseInt(timeArray[i])));

      //   if (isNaN(parseInt(timeArray[i])) === false) {

      //     if (i === 0) {

      //       if (timeArray[i] !== "0" && timeArray[i] !== "1" && timeArray[i] !== "2") {

      //         validTimeFormat = false;

      //       };

      //     } else if (i === 1) {

      //       // if timeArray[1] =2 then 
      //       if (timeArray[i] !== "0" && timeArray[i] !== "1" && timeArray[i] !== "2" && timeArray[i] !== "3" && timeArray[i] !== "4" && timeArray[i] !== "5") {

      //         validTimeFormat = false;

      //       };

      //     } else if (i === 2) {

      //       if (timeArray[i] !== "0" && timeArray[i] !== "1" && timeArray[i] !== "2" && timeArray[i] !== "3" && timeArray[i] !== "4" && timeArray[i] !== "5") {

      //         validTimeFormat = false;

      //       };

      //     };

      //   } else {

      //     validTimeFormat = false;

      //   };

      // };



    };

  } else {

    validTimeFormat = false;

  };

  return validTimeFormat;

};


export const ConvertTemperature = (temperatureScale, temperature) => {
  // console.log(componentName, GetDateTime(), "ConvertTemperature temperatureScale", temperatureScale);
  // console.log(componentName, GetDateTime(), "ConvertTemperature temperature", temperature);

  // let temperatureFloat = parseFloat(temperature.toString().trim());
  let temperatureFloat = parseFloat(temperature);
  let temperatureConverted = null;

  if (isNaN(temperatureFloat) === false && IsEmpty(temperatureFloat) === false) {

    // if (temperatureScale.toString().trim().toLowerCase() === "celsius") {
    if (temperatureScale.toLowerCase() === "celsius") {

      // * Based on (32°F − 32) × 5/9 = 0°C -- 07/29/2021 MF
      temperatureConverted = ((temperatureFloat - 32) * 5 / 9).toFixed(2);

      // } else if (temperatureScale.toString().trim().toLowerCase() === "fahrenheit") {
    } else if (temperatureScale.toLowerCase() === "fahrenheit") {

      // * Based on (32°F − 32) × 5/9 = 0°C -- 07/29/2021 MF
      temperatureConverted = (temperatureFloat * 9 / 5 + 32).toFixed(2);

    };

  } else {

    temperatureConverted = "";

  };

  // console.log(componentName, GetDateTime(), "ConvertTemperature temperatureConverted", temperatureConverted);

  return temperatureConverted;

};


export const ConvertBitTrueFalse = (records) => {
  // console.log(componentName, "ConvertBitTrueFalse records", records);
  // console.log(componentName, "ConvertBitTrueFalse process.env.DATABASE_DIALECT", process.env.DATABASE_DIALECT);

  // if (process.env.DATABASE_DIALECT == "mysql") {

  for (let i = 0; i < records.length; i++) {

    if (records[i].active === 1) {

      records[i].active = true;

    } else if (records[i].active === 0) {

      records[i].active = false;

    };

    if (records[i].electronic === 1) {

      records[i].electronic = true;

    } else if (records[i].electronic === 0) {

      records[i].electronic = false;

    };

    if (records[i].read === 1) {

      records[i].read = true;

    } else if (records[i].read === 0) {

      records[i].read = false;

    };

    if (records[i].admin === 1) {

      records[i].admin = true;

    } else if (records[i].admin === 0) {

      records[i].admin = false;

    };

  };

  // };

  return records;

};


export const ConvertYesNoTrueFalse = (value) => {
  // console.log(componentName, GetDateTime(), "ConvertYesNoTrueFalse value", value);

  // if (isNaN(value) === true && value.toString().trim() === "Yes") {

  //   return true;

  // } else if (isNaN(value) === true && value.toString().trim() === "No") {

  //   return false;

  // } else if (value === true) {

  //   return "Yes";

  // } else if (value === false) {

  //   return "No";

  // } else {

  //   return value;

  // };

  if (isNaN(value) === true && value === "Yes") {

    return true;

  } else if (isNaN(value) === true && value === "No") {

    return false;

  } else if (value === true) {

    return "Yes";

  } else if (value === false) {

    return "No";

  } else {

    return value;

  };

};


export const ConvertNormalAbnormalTrueFalse = (value) => {
  // console.log(componentName, GetDateTime(), "ConvertNormalAbnormalTrueFalse value", value);

  // if (isNaN(value) === true && value.toString().trim() === "Normal") {

  //   return true;

  // } else if (isNaN(value) === true && value.toString().trim() === "Abnormal") {

  //   return false;

  // } else if (value === true) {

  //   return "Normal";

  // } else if (value === false) {

  //   return "Abnormal";

  // } else {

  //   return value;

  // };

  if (isNaN(value) === true && value === "Normal") {

    return true;

  } else if (isNaN(value) === true && value === "Abnormal") {

    return false;

  } else if (value === true) {

    return "Normal";

  } else if (value === false) {

    return "Abnormal";

  } else {

    return value;

  };

};


export const ConvertEnableDisableTrueFalse = (value) => {
  // console.log(componentName, GetDateTime(), "ConvertEnableDisableTrueFalse value", value);

  // if (isNaN(value) === true && value.toString().trim() === "Enable") {

  //   return true;

  // } else if (isNaN(value) === true && value.toString().trim() === "Disable") {

  //   return false;

  // } else if (value === true) {

  //   return "Enable";

  // } else if (value === false) {

  //   return "Disable";

  // } else {

  //   return value;

  // };

  if (isNaN(value) === true && value === "Enable") {

    return true;

  } else if (isNaN(value) === true && value === "Disable") {

    return false;

  } else if (value === true) {

    return "Enable";

  } else if (value === false) {

    return "Disable";

  } else {

    return value;

  };

};


export const ConvertNullEmptyString = (value) => {
  // console.log(componentName, GetDateTime(), "ConvertNullEmptyString value", value);
  // console.log(componentName, GetDateTime(), "ConvertNullEmptyString typeof value", typeof value);

  // if (value === null) {

  //   return "";
  // } else if (value === undefined) {

  //   return "";

  // } else if (isNaN(value) === true && value.toString().trim() === "") {

  //   return null;

  // } else if (value === "") {

  //   return null;

  // } else {

  //   return value;

  // };

  // TODO: Change this function so that it can handle if there are already empty string values in the database. -- 03/19/2021 MF
  // ! This can't be done in one function like this to handle both conversions because what if the database value is set to an empty string. -- 07/09/2021 MF
  if (value === null) {

    // console.log(componentName, GetDateTime(), "ConvertNullEmptyString null value", value);
    return "";

  } else if (value === undefined) {

    // console.log(componentName, GetDateTime(), "ConvertNullEmptyString undefined value", value);
    return "";

  } else if (value === "NaN") {

    // console.log(componentName, GetDateTime(), "ConvertNullEmptyString NaN value", value);
    return null;

  } else if (isNaN(value) === true && typeof value === "number") {

    // console.log(componentName, GetDateTime(), "ConvertNullEmptyString isNaN value", value);
    return null;

  } else if (isNaN(value) === true && value === "") {

    // console.log(componentName, GetDateTime(), "ConvertNullEmptyString isNaN \"\" value", value);
    return null;

  } else if (value === "") {

    // console.log(componentName, GetDateTime(), "ConvertNullEmptyString \"\" value", value);
    return null;

  } else {

    // console.log(componentName, GetDateTime(), "ConvertNullEmptyString else value", value);
    return value;

  };

};


export const IsWholeNumber = (value) => {
  // console.log(componentName, GetDateTime(), "IsWholeNumber value", value);

  // * I think this is always returning true because the decimal is stripped off before the check is done. -- 04/04/2021 MF
  // console.log(componentName, GetDateTime(), "IsWholeNumber parseInt(value.toString().trim())", parseInt(value.toString().trim()));
  // console.log(componentName, GetDateTime(), "IsWholeNumber isNaN(parseInt(value.toString().trim()))", isNaN(parseInt(value.toString().trim())));
  // console.log(componentName, GetDateTime(), "IsWholeNumber Number.isInteger(parseFloat(value.toString().trim()))", Number.isInteger(parseFloat(value.toString().trim())));

  // if (isNaN(parseInt(value.toString().trim())) === true) {

  //   return false;

  // } else {

  //   return true;

  // };

  // * This removes any values from the string starting at and after a non-number value in the string. -- 06/21/2021 MF
  // if (Number.isInteger(parseFloat(value.toString().trim())) === true) {

  //   return true;

  // } else {

  //   return false;

  // };

  if (isNaN(value.toString().trim()) === true) {

    return false;

  } else {

    // * https://www.w3resource.com/javascript-exercises/javascript-math-exercise-38.php -- 06/21/2021 MF
    if (value - Math.floor(value) !== 0) {

      return false;

    }
    else {

      return true;

    };

  };

};


export const HasDecimalPlaces = (value, decimalPlaces) => {
  // console.log(componentName, GetDateTime(), "HasDecimalPlaces value", value);

  // console.log(componentName, GetDateTime(), "HasDecimalPlaces parseFloat(value.toString().trim())", parseFloat(value.toString().trim()));
  // console.log(componentName, GetDateTime(), "HasDecimalPlaces isNaN(parseFloat(value.toString().trim()))", isNaN(parseFloat(value.toString().trim())));
  // console.log(componentName, GetDateTime(), "HasDecimalPlaces Number.isInteger(parseFloat(value.toString().trim()) * 10)", Number.isInteger(parseFloat(value.toString().trim()) * 10));

  if (isNaN(value.toString().trim()) === true) {

    return false;

  } else {

    let currentDecimalPlaces = 1;

    if (Number.isInteger(parseFloat(decimalPlaces)) === true) {

      currentDecimalPlaces = decimalPlaces;

    };

    // * This removes any values from the string starting at and after a non-number value in the string. -- 06/21/2021 MF
    // * Parse the value to see if it is a float. -- 06/21/2021 MF
    let valueToTest = parseFloat(value.toString().trim());

    let valueDecimals = 0;

    // if (value.toString().trim().indexOf(".") > -1) {
    if (value.toString().trim().includes(".")) {

      // * Remove the characters after the decimal point to be counted later if there is a decimal point. -- 06/21/2021 MF
      valueDecimals = value.toString().trim().substring(value.toString().trim().indexOf(".") + 1);

    };

    // console.log(componentName, GetDateTime(), "HasDecimalPlaces currentDecimalPlaces", currentDecimalPlaces);

    // if (isNaN(parseFloat(value.toString().trim())) === true || (IsEmpty(currentDecimalPlaces) === false && Number.isInteger(parseFloat(value.toString().trim()) * 10 ** currentDecimalPlaces) === false)) {
    // if (isNaN(valueToTest) === true || (IsEmpty(currentDecimalPlaces) === false && Number.isInteger(valueToTest * 10 ** currentDecimalPlaces) === false)) {
    // if (isNaN(parseFloat(value.toString().trim())) === true || (IsEmpty(currentDecimalPlaces) === false && value.toString().trim().substring(value.toString().trim().indexOf(".") + 1).length > currentDecimalPlaces)) {

    // console.log(componentName, GetDateTime(), "HasDecimalPlaces valueToTest", valueToTest);
    // console.log(componentName, GetDateTime(), "HasDecimalPlaces isNaN(valueToTest)", isNaN(valueToTest));
    // console.log(componentName, GetDateTime(), "HasDecimalPlaces IsEmpty(currentDecimalPlaces)", IsEmpty(currentDecimalPlaces));
    // console.log(componentName, GetDateTime(), "HasDecimalPlaces valueDecimals.length > currentDecimalPlaces", valueDecimals.length > currentDecimalPlaces);

    if (isNaN(valueToTest) === true || (IsEmpty(currentDecimalPlaces) === false && valueDecimals.length > currentDecimalPlaces)) {

      return false;

    } else {

      return true;

    };

  };

};


export const GenerateRandomNumberDigits = (digits) => {
  // console.log(componentName, GetDateTime(), "GenerateRandomNumberDigits digits", digits);

  let randomNumber = Math.floor(Math.random() * 10 ** digits).toString();

  while (randomNumber.length < (digits)) {

    randomNumber = `0${randomNumber}`;

  };

  // console.log(componentName, GetDateTime(), "GenerateRandomNumberDigits randomNumber", randomNumber);

  return randomNumber;

};


export const FormatPhoneNumber = (phoneNumber) => {
  // console.log(componentName, GetDateTime(), "formatPhoneNumber phoneNumber", phoneNumber);
  // console.log(componentName, GetDateTime(), "formatPhoneNumber typeof phoneNumber", typeof phoneNumber);

  // * From https://learnersbucket.com/examples/javascript/how-to-format-phone-number-in-javascript/ -- 07/22/2021 MF

  let onlyDigits = "";

  if (typeof phoneNumber === "string") {

    onlyDigits = phoneNumber.replace(/\D/g, "");

  };

  let validPhoneNumber = onlyDigits.match(/^(\d{3})(\d{3})(\d{4})$/);

  // console.log(componentName, GetDateTime(), "formatPhoneNumber validPhoneNumber", validPhoneNumber);

  if (IsEmpty(validPhoneNumber) === false) {

    return `${validPhoneNumber[1]}-${validPhoneNumber[2]}-${validPhoneNumber[3]}`;

  } else {

    return phoneNumber;

  };

};


export const FormatTitle = (title) => {
  // console.log(componentName, GetDateTime(), "FormatTitle title", title);
  // console.log(componentName, GetDateTime(), "FormatTitle typeof title", typeof title);

  // * From https://stackoverflow.com/questions/11427759/how-to-insert-space-before-capitalize-character-in-a-word-using-replace-and-rege -- 08/10/2021 MF
  // * From https://attacomsian.com/blog/string-capitalize-javascript -- 08/10/2021 MF
  // * From https://www.codeproject.com/Articles/108996/Splitting-Pascal-Camel-Case-with-RegEx-Enhancement -- 08/10/2021 MF

  let formattedTitle = "";

  // if (IsEmpty(title) === false && title.toLowerCase().includes("isbar" === true)) {

  //   console.log(componentName, GetDateTime(), "FormatTitle title", title);

  // };

  if (IsEmpty(title) === false && title !== "iSBAR" && title !== "iSBARs" && title !== "iSBAREnable") {

    // * iSBARs is the special case that is difficult to make work in regex. -- 08/16/2021 MF
    // formattedTitle = title.replace(/([a-z])([A-Z])([a-z])/g, "$1 $2$3").replace(/\b\w/g, c => c.toUpperCase());
    formattedTitle = title.replace(/(?<!^)([A-Z][a-z]|(?<=[a-z])[A-Z])/g, " $1").replace(/\b\w/g, c => c.toUpperCase());

  } else if (IsEmpty(title) === false && title === "iSBAR") {

    formattedTitle = "iSBAR";

  } else if (IsEmpty(title) === false && title === "iSBARs") {

    formattedTitle = "iSBARs";

  } else if (IsEmpty(title) === false && title === "iSBAREnable") {

    formattedTitle = "iSBAR Enable";

  };

  // console.log(componentName, GetDateTime(), "FormatTitle formattedTitle", formattedTitle);

  return formattedTitle;

};


export const RandomizeItems = (items, randomize) => {
  // console.log(componentName, GetDateTime(), "RandomizeItems items", items);
  // console.log(componentName, GetDateTime(), "RandomizeItems randomize", randomize);

  let itemsRandomized = [];

  if (randomize === true) {

    itemsRandomized = items.map((a) => (
      { sort: Math.random(), value: a }
    ))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

  } else {

    itemsRandomized = items;

  };

  return itemsRandomized;

};
