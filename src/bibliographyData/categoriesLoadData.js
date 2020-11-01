import {baseURL} from "../app/constants";

const categoriesLoadData = () => {
    // console.log("categoriesLoadData.js getCategories");
    // console.log("categoriesLoadData.js getCategories baseURL", baseURL);

    let categoryMessage = "";
    let errCategoryMessage = "";
    let categoryResultsFound = null;
    let categoryList = [];

    let url = baseURL + "category/";

    fetch(url)
    .then(response => {
        // console.log("categoriesLoadData.js getCategories response", response);
        if (!response.ok) {
            throw Error(response.status + " " + response.statusText + " " + response.url);
        } else {
            return response.json();
        };
    })
    .then(data => {
        // console.log("categoriesLoadData.js getCategories data", data);

        categoryResultsFound = data.resultsFound;
        categoryMessage = data.message;

        if (data.resultsFound === true) {
            // Would like to remove categories that don't have titles associated with them
            // if (data.categories.titles.length > 0) {
                categoryList = data.categories;
            // };
        } else {
            errCategoryMessage = data.message;
        };

        return data;

    })
    .catch(error => {
        console.log("categoriesLoadData.js getCategories error", error);
        // console.log("categoriesLoadData.js getCategories error.name", error.name);
        // console.log("categoriesLoadData.js getCategories error.message", error.message);
        errCategoryMessage = error.name + ": " + error.message;
    });

};

export default categoriesLoadData;
