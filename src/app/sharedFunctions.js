import AppSettings from "./environment";

const componentName = "sharedFunctions.js";


export const encodeURL = (titleName) => {

  // console.log(componentName, GetDateTime(), "encodeURL titleName", titleName);

  let newTitleName = titleName;

  if (titleName !== undefined) {

    // Changes the - to |
    newTitleName = newTitleName.replaceAll("-", "|");
    // Changes the spaces to -
    newTitleName = newTitleName.replaceAll(" ", "-");
    // Changes the rest to be a safe URL
    newTitleName = encodeURIComponent(newTitleName);

  };

  // console.log(componentName, GetDateTime(), "encodeURL newTitleName", newTitleName);

  return newTitleName;
};


export const decodeURL = (titleName) => {

  // console.log(componentName, GetDateTime(), "decodeURL titleName", titleName);

  let newTitleName = titleName;

  if (titleName !== undefined) {

    // Changes it back from a safe URL
    newTitleName = decodeURIComponent(newTitleName);
    // Changes the - to space
    newTitleName = newTitleName.replaceAll("-", " ");
    // Changes the | to -
    newTitleName = newTitleName.replaceAll("|", "-");

  };

  // console.log(componentName, GetDateTime(), "decodeURL newTitleName", newTitleName);

  return newTitleName;
};


// export const displayParagraphs = (text) => {
//     // Not needed; Use the .displayParagraphs css style

//     // console.log(componentName, GetDateTime(), "displayParagraphs text", text);

//     let newText = text;

//     if (newText !== undefined) {

//         // newText = "<p>" + newText;

//         // Changes the \n to </p><p>
//         newText = newText.replaceAll("\n", "</p><p>");

//         // newText = newText + "</p>";

//     };

//     // console.log(componentName, GetDateTime(), "displayParagraphs newText", newText);

//     return newText;
// };


export const removeOnePixelImage = (text, ASIN) => {

  // console.log(componentName, GetDateTime(), "removeOnePixelImage text", text);
  // console.log(componentName, GetDateTime(), "removeOnePixelImage ASIN", ASIN);

  let newText = text;

  if (newText !== undefined && newText !== null && newText !== "") {

    // Removes the <img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=B008ETL5R6 width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
    // This is not working.
    // newText = newText.replaceAll("<img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&", "");
    // newText = newText.replaceAll(" width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");
    // newText = newText.replaceAll("a=" + ASIN, "");

    // Removes the <img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=B008ETL5R6 width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
    newText = newText.replaceAll("<img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=" + ASIN + " width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");

    // The difference between the next ones is the l=li1, l=li2, l=li3
    // Removes the <img src="https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=0812699637" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
    newText = newText.replaceAll("<img src=\"https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=" + ASIN + "\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />", "");
    // Removes the <img src="https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li1&o=1&a=0997135603" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
    newText = newText.replaceAll("<img src=\"https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li1&o=1&a=" + ASIN + "\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />", "");
    // Removes the <img src="https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li2&o=1&a=0997135603" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
    newText = newText.replaceAll("<img src=\"https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li2&o=1&a=" + ASIN + "\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />", "");


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

  if (newText !== undefined && newText !== null && newText !== "") {

    // So that it doesn't remove the URL when the application is running locally or on a site without the images
    if (AppSettings.profileType === "philipdick" || AppSettings.profileType === "homeopape") {

      // Removes the "https://philipdick.com"
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

  if (newText !== undefined && newText !== null && newText !== "") {

    // So that it doesn't remove the URL when the application is running locally or on a site without the images
    if (AppSettings.profileType === "philipdick") {

      // Removes the "https://philipdick.com"
      newText = newText.replaceAll("https://philipdick.com", "");

    };

  };

  // console.log(componentName, GetDateTime(), "setLocalPath newText", newText);

  return newText;
};


export const createImageName = (titleName) => {

  // console.log(componentName, GetDateTime(), "createImageName titleName", titleName);

  let newImageName = "";

  if (titleName !== undefined && titleName !== null && titleName !== "") {
    // Capitalize the first letter of every word
    newImageName = titleName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    // I'm sure there's a more elegant way to do this
    // newImageName = newImageName.replaceAll(".", "");
    // newImageName = newImageName.replaceAll("?", "");
    // newImageName = newImageName.replaceAll(",", "");
    // newImageName = newImageName.replaceAll(":", "");
    // newImageName = newImageName.replaceAll("-", "");
    //newImageName = newImageName.replace(/[.,\/#\'\?!$%\^&\*;:{}=\-_`~()]/g,"");
    //newImageName = newImageName.replaceAll(" ", "");
    // Remove all spaces - Doesn't work
    // newImageName = newImageName.replace(/\s{2,}/g," ");

    // https://www.codefari.com/2019/11/removereplace-special-characters-from.html
    // SELECT regexp_replace('Remove!@#$ Special &*&characters', '[^\w]+','','g');
    // regexp_replace("titleName", '[^\w]+')
    // newImageName = titleName.replace(regExpr, "");

    // select "titleName"
    // --, replace("titleName", '-', '|')
    // , regexp_replace("titleName", '[^\w]+','','g')
    // , regexp_replace("titleName", '[^\w]+',' ','g')
    // , replace(regexp_replace("titleName", '[^\w]+',' ','g'), ' ', '-')
    // from titles

    // https://stackoverflow.com/questions/9705194/replace-special-characters-in-a-string-with-underscore/9705227
    newImageName = newImageName.replace(/[^a-zA-Z0-9]/g, "");


    newImageName = "https://philipdick.com/images/covers/" + newImageName + ".jpg";
  };

  // console.log(componentName, GetDateTime(), "createImageName newImageName", newImageName);

  return newImageName;
};


export const createTitleURL = (titleName) => {

  // console.log(componentName, GetDateTime(), "createImageName titleName", titleName);

  let newTitleURL = "";

  if (titleName !== undefined && titleName !== null && titleName !== "") {
    // Capitalize the first letter of every word
    newTitleURL = titleName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    // I'm sure there's a more elegant way to do this
    // newTitleURL = newTitleURL.replaceAll(".", "");
    // newTitleURL = newTitleURL.replaceAll("?", "");
    // newTitleURL = newTitleURL.replaceAll(",", "");
    // newTitleURL = newTitleURL.replaceAll(":", "");
    // newTitleURL = newTitleURL.replaceAll("-", "");
    //newTitleURL = newTitleURL.replace(/[.,\/#\'\?!$%\^&\*;:{}=\-_`~()]/g,"");
    //newTitleURL = newTitleURL.replaceAll(" ", "");
    // Remove all spaces - Doesn't work
    // newTitleURL = newTitleURL.replace(/\s{2,}/g," ");

    // https://www.codefari.com/2019/11/removereplace-special-characters-from.html
    // SELECT regexp_replace('Remove!@#$ Special &*&characters', '[^\w]+','','g');
    // regexp_replace("titleName", '[^\w]+')
    // newTitleURL = titleName.replace(regExpr, "");

    // select "titleName"
    // --, replace("titleName", '-', '|')
    // , regexp_replace("titleName", '[^\w]+','','g')
    // , regexp_replace("titleName", '[^\w]+',' ','g')
    // Use this regular expression to create the titleURL
    // Execpt that letters after ' are captitalized also
    // , replace(regexp_replace(initcap("titleName"), '[^\w]+',' ','g'), ' ', '-')
    // from titles

    // https://stackoverflow.com/questions/9705194/replace-special-characters-in-a-string-with-underscore/9705227
    newTitleURL = newTitleURL.replace(/[^a-zA-Z0-9]/g, "-");
    // I'm sure there's a more elegant way to do this
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

  if (textLinkFull !== undefined && textLinkFull !== null && textLinkFull !== "") {

    // console.log(componentName, GetDateTime(), "getASIN textLinkFull.indexOf(\"/dp/\")" , textLinkFull.indexOf("/dp/"));
    // console.log(componentName, GetDateTime(), "getASIN textLinkFull.indexOf(\"/product/\")" , textLinkFull.indexOf("/product/"));

    if (textLinkFull.indexOf("/dp/") !== -1) {

      // console.log(componentName, GetDateTime(), "getASIN textLinkFull.substring(textLinkFull.indexOf(\"/dp/\") + 4, textLinkFull.indexOf(\"/ref=\"))", textLinkFull.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("/ref=")));
      txtASIN = textLinkFull.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("/ref="));

    } else if (textLinkFull.indexOf("/product/") !== -1) {

      // console.log(componentName, GetDateTime(), "getASIN textLinkFull.substring(textLinkFull.indexOf(\"/dp/\") + 4, textLinkFull.indexOf(\"/ref=\"))", textLinkFull.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("/ref=")));
      txtASIN = textLinkFull.substring(textLinkFull.indexOf("/product/") + 9, textLinkFull.indexOf("/ref="));

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

  // https://stackoverflow.com/questions/4597900/checking-something-isempty-in-javascript
  // https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in

  // const isEmpty = (object) => {
  //   for (var key in object) {
  //     if (object.hasOwnProperty(key)) {
  //         return false;
  //     };
  //   };
  //   return true;
  // };

  return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);

  // Returns true
  // console.log(componentName, GetDateTime(), "IsEmpty(\"\")", IsEmpty(""));
  // console.log(componentName, GetDateTime(), "IsEmpty(null)", IsEmpty(null));
  // console.log(componentName, GetDateTime(), "IsEmpty(undefined)", IsEmpty(undefined));
  // console.log(componentName, GetDateTime(), "IsEmpty([])", IsEmpty([]));
  // console.log(componentName, GetDateTime(), "IsEmpty({})", IsEmpty({}));

  // Returns false
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


export const TryParseJSON = (jsonString) => {
  // console.log(componentName, GetDateTime(), "TryParseJSON jsonString", jsonString);

  // https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
  try {
    let jsonData = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object", 
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (jsonData && typeof jsonData === "object") {
      return jsonData;
    };
  }
  catch (error) {
    // Don't display this error in the console. This function is already returning false is the JSON file is not in the correct format.
    // console.log(componentName, GetDateTime(), "TryParseJSON error", error);
  };

  return false;

};


export const DisplayObjectData = (ObjectData) => {
  // console.log(componentName, GetDateTime(), "DisplayObjectData ObjectData", ObjectData);

  let objectDataString = JSON.stringify(ObjectData);

  objectDataString = objectDataString.replaceAll("[{\"", "<p>");
  objectDataString = objectDataString.replaceAll("\"},{\"", "</p><p>");
  objectDataString = objectDataString.replaceAll("\"}]", "</p>");

  objectDataString = objectDataString.replaceAll("{\"", "<p>");
  objectDataString = objectDataString.replaceAll("\"}", "</p>");

  objectDataString = objectDataString.replaceAll("\":\"", " = ");
  objectDataString = objectDataString.replaceAll("\":", " = ");

  objectDataString = objectDataString.replaceAll("\",\"", "</p><p>");
  objectDataString = objectDataString.replaceAll(",\"", "</p><p>");

  objectDataString = objectDataString.replaceAll("},", "");

  objectDataString = objectDataString.replaceAll("[]", "");

  objectDataString = objectDataString.replaceAll("[\"", "");
  objectDataString = objectDataString.replaceAll("\"]", "");

  objectDataString = objectDataString.replaceAll("[", "");
  objectDataString = objectDataString.replaceAll("]", "");
  objectDataString = objectDataString.replaceAll("{", "");
  objectDataString = objectDataString.replaceAll("}", "");

  return (objectDataString);

};


export const GetDateTime = () => {
  // console.log(componentName, GetDateTime(), "GetDateTime");

  return new Date().toLocaleString();

};

export const GetCurrentYear = () => {
  // console.log(componentName, GetDateTime(), "GetCurrentYear");

  return new Date().getFullYear();

};

export const displayDate = (dateToDisplay) => {
  // console.log(componentName, GetDateTime(), "displayDate dateToDisplay", dateToDisplay);

  let newDisplayDate = "";

  if (IsEmpty(dateToDisplay) === false) {

    // Year
    let yyyy = dateToDisplay.toString().substring(0, 4);
    // Month
    let mm = dateToDisplay.toString().substring(5, 7);
    // Day
    let dd = dateToDisplay.toString().substring(8, 10);

    newDisplayDate = mm + "/" + dd + "/" + yyyy;

  };

  // console.log(componentName, GetDateTime(), "displayDate dateToDisplay", dateToDisplay);

  return newDisplayDate;
};


export const displayYear = (dateToDisplay) => {
  // console.log(componentName, GetDateTime(), "displayYear dateToDisplay", dateToDisplay);

  let newDisplayDate = "";

  if (IsEmpty(dateToDisplay) === false) {

    // Year
    let yyyy = dateToDisplay.toString().substring(0, 4);
    // Month
    // let mm = dateToDisplay.toString().substring(5, 7);
    // Day
    // let dd = dateToDisplay.toString().substring(8, 10);

    // newDisplayDate = mm + "/" + dd + "/" + yyyy;

    newDisplayDate = yyyy;

  };

  // console.log(componentName, GetDateTime(), "displayYear dateToDisplay", dateToDisplay);

  return newDisplayDate;
};


// export const displayParagraphs = (text) => {
//     // Not needed; Use the .displayParagraphs css style

//     // console.log(componentName, GetDateTime(), "displayParagraphs text", text);

//     let newText = text;

//     if (IsEmpty(newText) === false) {

//         // newText = "<p>" + newText;

//         // Changes the \n to </p><p>
//         newText = newText.replaceAll("\n", "</p><p>");

//         // newText = newText + "</p>";

//     };

//     // console.log(componentName, GetDateTime(), "displayParagraphs newText", newText);

//     return newText;
// };


export const truncateText = (text, limit) => {
  // console.log(componentName, GetDateTime(), "truncateText text", text);

  // https://stackoverflow.com/questions/4700226/i-want-to-truncate-a-text-or-line-with-ellipsis-using-javascript

  // let newText = text;

  if (text.length > limit) {

    for (let i = limit; i > 0; i--) {
      if (text.charAt(i) === ' ' && (text.charAt(i - 1) !== ',' || text.charAt(i - 1) !== '.' || text.charAt(i - 1) !== ';')) {
        return text.substring(0, i) + '...';
      };
    };

    return text.substring(0, limit) + '...';

  } else {
    return text;
  };

  // console.log(componentName, GetDateTime(), "truncateText newText", newText);

  // return newText;
};