import AppSettings from "./environment";

const componentName = "sharedFunctions.js";

export const displayDate = (dateToDisplay) => {

    // console.log(componentName, "displayDate dateToDisplay", dateToDisplay);

    let newDisplayDate = "";

    if (dateToDisplay !== undefined) {

        // Year
        let yyyy = dateToDisplay.toString().substring(0, 4);
        // Month
        let mm = dateToDisplay.toString().substring(5, 7);
        // Day
        let dd = dateToDisplay.toString().substring(8, 10);

        newDisplayDate = mm + "/" + dd + "/" + yyyy;

    };

    // console.log(componentName, "displayDate dateToDisplay", dateToDisplay);

    return newDisplayDate;
};

export const displayYear = (dateToDisplay) => {

    // console.log(componentName, "displayYear dateToDisplay", dateToDisplay);

    let newDisplayDate = "";

    if (dateToDisplay !== undefined) {

        // Year
        let yyyy = dateToDisplay.toString().substring(0, 4);
        // Month
        // let mm = dateToDisplay.toString().substring(5, 7);
        // Day
        // let dd = dateToDisplay.toString().substring(8, 10);

        // newDisplayDate = mm + "/" + dd + "/" + yyyy;

        newDisplayDate = yyyy;

    };

    // console.log(componentName, "displayYear dateToDisplay", dateToDisplay);

    return newDisplayDate;
};

export const encodeURL = (titleName) => {

    // console.log(componentName, "encodeURL titleName", titleName);

    let newTitleName = titleName;

    if (titleName !== undefined) {

        // Changes the - to |
        newTitleName = newTitleName.replaceAll("-", "|");
        // Changes the spaces to -
        newTitleName = newTitleName.replaceAll(" ", "-");
        // Changes the rest to be a safe URL
        newTitleName = encodeURIComponent(newTitleName);

    };

    // console.log(componentName, "encodeURL newTitleName", newTitleName);

    return newTitleName;
};

export const decodeURL = (titleName) => {

    // console.log(componentName, "decodeURL titleName", titleName);

    let newTitleName = titleName;

    if (titleName !== undefined) {

        // Changes it back from a safe URL
        newTitleName = decodeURIComponent(newTitleName);
        // Changes the - to space
        newTitleName = newTitleName.replaceAll("-", " ");
        // Changes the | to -
        newTitleName = newTitleName.replaceAll("|", "-");

    };

    // console.log(componentName, "decodeURL newTitleName", newTitleName);

    return newTitleName;
};

export const displayParagraphs = (text) => {

    // console.log(componentName, "displayParagraphs text", text);

    let newText = text;

    if (newText !== undefined) {

        newText = "<p>" + newText;
        
        // Changes the \n to </p><p>
        newText = newText.replaceAll("\n", "</p><p>");

        newText = newText + "</p>";

    };

    // console.log(componentName, "displayParagraphs newText", newText);

    return newText;
};

export const truncateText = (text, limit) => {
    // https://stackoverflow.com/questions/4700226/i-want-to-truncate-a-text-or-line-with-ellipsis-using-javascript

    // console.log(componentName, "truncateText text", text);

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

    // console.log(componentName, "truncateText newText", newText);

    // return newText;
};

export const removeOnePixelImage = (text, ASIN) => {

    // console.log(componentName, "removeOnePixelImage text", text);
    // console.log(componentName, "removeOnePixelImage ASIN", ASIN);

    let newText = text;

    if (newText !== undefined && newText !== null && newText !== "") {
        
        // Removes the <img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=B008ETL5R6 width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
        // This is not working.
        // newText = newText.replaceAll("<img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&", "");
        // newText = newText.replaceAll(" width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");
        // newText = newText.replaceAll("a=" + ASIN, "");

        // Removes the <img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=B008ETL5R6 width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
        newText = newText.replaceAll("<img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=" + ASIN + " width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");
        // Removes the <img src="https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=0812699637" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
        newText = newText.replaceAll("<img src=\"https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=" + ASIN + "\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />", "");


        if (newText.includes("https://ir-na.amazon-adsystem.com")) {
            console.log(componentName, "removeOnePixelImage ASIN", ASIN);
            console.log(componentName, "removeOnePixelImage newText", newText);
        };
        
    };

    // console.log(componentName, "removeOnePixelImage newText", newText);

    return newText;
};

export const setLocalImagePath = (text) => {

    // console.log(componentName, "setLocalImagePath text", text);
    // console.log(componentName, "setLocalImagePath AppSettings.profileType", AppSettings.profileType);

    let newText = text;

    if (newText !== undefined && newText !== null && newText !== "") {

        // So that it doesn't remove the URL when the application is running locally or on a site without the images
        if (AppSettings.profileType === "philipdick" || AppSettings.profileType === "homeopape") {
            
            // Removes the "https://philipdick.com"
            newText = newText.replaceAll("https://philipdick.com", "");

        };

    };

    // console.log(componentName, "setLocalPath newText", newText);

    return newText;
};

export const setLocalPath = (text) => {

    // console.log(componentName, "setLocalPath text", text);
    // console.log(componentName, "setLocalPath AppSettings.profileType", AppSettings.profileType);

    let newText = text;

    if (newText !== undefined && newText !== null && newText !== "") {

        // So that it doesn't remove the URL when the application is running locally or on a site without the images
        if (AppSettings.profileType === "philipdick") {
            
            // Removes the "https://philipdick.com"
            newText = newText.replaceAll("https://philipdick.com", "");

        };

    };

    // console.log(componentName, "setLocalPath newText", newText);

    return newText;
};


export const createImageName = (titleName) => {

    // console.log(componentName, "createImageName titleName", titleName);

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

    // console.log(componentName, "createImageName newImageName", newImageName);

    return newImageName;
};

export const createTitleURL = (titleName) => {

    // console.log(componentName, "createImageName titleName", titleName);

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

    // console.log(componentName, "createImageName newTitleURL", newTitleURL);

    return newTitleURL;
};

export const getASIN = (textLinkFull) => {

    // console.log(componentName, "getASIN textLinkFull", textLinkFull);

    let txtASIN = "";

    // select substring("textLinkFull" from position('/dp/' in "textLinkFull") + 4 for 10) from editions

    if (textLinkFull !== undefined && textLinkFull !== null && textLinkFull !== "") {

        // console.log(componentName, "getASIN textLinkFull.indexOf(\"/dp/\")" , textLinkFull.indexOf("/dp/"));
        // console.log(componentName, "getASIN textLinkFull.indexOf(\"/product/\")" , textLinkFull.indexOf("/product/"));

        if (textLinkFull.indexOf("/dp/") !== -1) {

            // console.log(componentName, "getASIN textLinkFull.substring(textLinkFull.indexOf(\"/dp/\") + 4, textLinkFull.indexOf(\"/ref=\"))", textLinkFull.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("/ref=")));
            txtASIN = textLinkFull.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("/ref="));

        } else if (textLinkFull.indexOf("/product/") !== -1) {

            // console.log(componentName, "getASIN textLinkFull.substring(textLinkFull.indexOf(\"/dp/\") + 4, textLinkFull.indexOf(\"/ref=\"))", textLinkFull.substring(textLinkFull.indexOf("/dp/") + 4, textLinkFull.indexOf("/ref=")));
            txtASIN = textLinkFull.substring(textLinkFull.indexOf("/product/") + 9, textLinkFull.indexOf("/ref="));

        };

    } else {
        // return false;
        // return null;
        // return "";
    };

    return txtASIN;

};