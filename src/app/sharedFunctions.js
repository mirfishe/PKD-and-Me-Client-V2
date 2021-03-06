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

    if (newText !== undefined) {
        
        // Removes the <img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&a=B008ETL5R6 width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />
        newText = newText.replaceAll("<img src=https://ir-na.amazon-adsystem.com/e/ir?t=bulbocreat-20&language=en_US&l=li3&o=1&", "");
        newText = newText.replaceAll(" width=1 height=1 border=0 alt= style=border:none !important; margin:0px !important; />", "");
        newText = newText.replaceAll("a=" + ASIN, "");

    };

    // console.log(componentName, "removeOnePixelImage newText", newText);

    return newText;
};

export const setLocalImagePath = (text) => {

    // console.log(componentName, "setLocalImagePath text", text);
    // console.log(componentName, "setLocalImagePath AppSettings.profileType", AppSettings.profileType);

    let newText = text;

    if (newText !== undefined) {

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

    if (newText !== undefined) {

        // So that it doesn't remove the URL when the application is running locally or on a site without the images
        if (AppSettings.profileType === "philipdick") {
            
            // Removes the "https://philipdick.com"
            newText = newText.replaceAll("https://philipdick.com", "");

        };

    };

    // console.log(componentName, "setLocalPath newText", newText);

    return newText;
};