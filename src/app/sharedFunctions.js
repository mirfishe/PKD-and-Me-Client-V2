export const displayDate = (dateToDisplay) => {

    // console.log("constants displayDate dateToDisplay", dateToDisplay);

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

    // console.log("constants displayDate dateToDisplay", dateToDisplay);

    return newDisplayDate;
};

export const displayYear = (dateToDisplay) => {

    // console.log("constants displayYear dateToDisplay", dateToDisplay);

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

    // console.log("constants displayYear dateToDisplay", dateToDisplay);

    return newDisplayDate;
};

export const encodeURL = (titleName) => {

    // console.log("constants encodeURL titleName", titleName);

    let newTitleName = titleName;

    if (titleName !== undefined) {

        // Changes the - to |
        newTitleName = newTitleName.replaceAll("-", "|");
        // Changes the spaces to -
        newTitleName = newTitleName.replaceAll(" ", "-");
        // Changes the rest to be a safe URL
        newTitleName = encodeURIComponent(newTitleName);

    };

    // console.log("constants encodeURL newTitleName", newTitleName);

    return newTitleName;
};

export const decodeURL = (titleName) => {

    // console.log("constants decodeURL titleName", titleName);

    let newTitleName = titleName;

    if (titleName !== undefined) {

        // Changes it back from a safe URL
        newTitleName = decodeURIComponent(newTitleName);
        // Changes the - to space
        newTitleName = newTitleName.replaceAll("-", " ");
        // Changes the | to -
        newTitleName = newTitleName.replaceAll("|", "-");

    };

    // console.log("constants decodeURL newTitleName", newTitleName);

    return newTitleName;
};