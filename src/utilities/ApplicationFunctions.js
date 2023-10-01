import { isEmpty, getDateTime, isNonEmptyArray, formatLowerCase, formatUpperCase } from "shared-functions";

const componentName = "ApplicationFunctions";

export const encodeURL = (url) => {

  let newURL = url;

  if (isEmpty(url) === false) {

    // Changes the - to | -- 02/20/2021 MF
    newURL = newURL.replaceAll("-", "|");
    // Changes the spaces to - -- 02/20/2021 MF
    newURL = newURL.replaceAll(" ", "-");
    // Changes the rest to be a safe URL -- 02/20/2021 MF
    newURL = encodeURIComponent(newURL);

  };

  return newURL;

};


export const decodeURL = (url) => {

  let newURL = url;

  if (isEmpty(url) === false) {

    // Changes it back from a safe URL -- 02/20/2021 MF
    newURL = decodeURIComponent(newURL);
    // Changes the - to space -- 02/20/2021 MF
    newURL = newURL.replaceAll("-", " ");
    // Changes the | to - -- 02/20/2021 MF
    newURL = newURL.replaceAll("|", "-");

  };

  return newURL;

};


export const removeOnePixelImage = (text, ASIN) => {

  // * SELECT * FROM `editions` WHERE imageLinkSmall like '%ir-na.amazon-adsystem.com%' OR imageLinkMedium like '%ir-na.amazon-adsystem.com%' OR imageLinkLarge like '%ir-na.amazon-adsystem.com%'

  let newText = text;

  if (isEmpty(newText) === false) {

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


    if (newText.includes("https://ir-na.amazon-adsystem.com") === true) {

      // console.log(componentName, getDateTime(), "removeOnePixelImage ASIN", ASIN);
      // console.log(componentName, getDateTime(), "removeOnePixelImage newText", newText);

    };

  };

  return newText;

};


export const setLocalImagePath = (text, profileType) => {

  let newText = text;

  if (isEmpty(newText) === false) {

    // * So that it doesn't remove the URL when the application is running locally or on a site without the images -- 03/06/2021 MF
    if (profileType === "philipdick" || profileType === "homeopape") {

      // * Removes the "https://philipdick.com" -- 03/06/2021 MF
      newText = newText.replaceAll("https://philipdick.com", "");

    };

  };

  return newText;

};


export const setLocalPath = (text, profileType) => {

  let newText = text;

  if (isEmpty(newText) === false) {

    // * So that it doesn't remove the URL when the application is running locally or on a site without the images -- 03/06/2021 MF
    if (profileType === "philipdick") {

      // * Removes the "https://philipdick.com" -- 03/06/2021 MF
      newText = newText.replaceAll("https://philipdick.com", "");

    };

  };

  return newText;

};


export const createImageName = (titleName) => {

  let newImageName = "";

  if (isEmpty(titleName) === false) {

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

  return newImageName;

};


export const createTitleURL = (titleName) => {

  let newTitleURL = "";

  if (isEmpty(titleName) === false) {

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

  return newTitleURL;

};


export const getASIN = (textLinkFull) => {

  let txtASIN = "";

  // select substring("textLinkFull" from position('/dp/' in "textLinkFull") + 4 for 10) from editions

  if (isEmpty(textLinkFull) === false) {

    if (textLinkFull.indexOf("/dp/") !== -1) {

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


export const toTitleCase = (title) => {

  // * Doesn't handle acronyms except for the few listed in the code below. -- 06/26/2021 MF

  // * https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript -- 06/26/2021 MF

  // * Certain minor words should be left lowercase unless they are the first or last words in the string. -- 06/26/2021 MF
  let lowers = ["A", "An", "The", "And", "But", "Or", "For", "Nor", "As", "At",
    "By", "For", "From", "In", "Into", "Near", "Of", "On", "Onto", "To", "With"];

  // * Certain words such as initialisms or acronyms should be left uppercase. -- 06/26/2021 MF
  let uppers = ["Id", "Tv", "Pkd"];

  let newTitle = title.replaceAll("&#39;", "'").replaceAll("&Amp;", "&").replaceAll("&amp;", "&").replaceAll("&Quot;", "\"").replaceAll("&quot;", "\"");

  newTitle = newTitle.replace(/([^\W_]+[^\s-]*) */g, function (titleText) { return formatUpperCase(titleText.charAt(0)) + formatLowerCase(titleText.substr(1)) + " "; });

  newTitle = newTitle.replaceAll("  ", " ");

  for (let i = 0, j = lowers.length; i < j; i++) {

    newTitle = newTitle.replace(new RegExp("\\s" + lowers[i] + "\\s", "g"), function (titleText) { return formatLowerCase(titleText); });

  };

  for (let i = 0, j = uppers.length; i < j; i++) {

    newTitle = newTitle.replace(new RegExp("\\b" + uppers[i] + "\\b", "g"), formatUpperCase(uppers[i]));

  };

  return newTitle;

};


export const convertBitTrueFalse = (records) => {

  // if (process.env.DATABASE_DIALECT == "mysql") {

  if (isNonEmptyArray(records) === true) {

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

  };

  return records;

};
