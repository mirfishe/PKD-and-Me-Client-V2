import AppSettings from "./app//environment";

const componentName = "categoriesLoadData.js";

const baseURL = AppSettings.baseURL;

const categoriesLoadData = () => {
    // console.log(componentName, "getCategories");
    // console.log(componentName, "getCategories baseURL", baseURL);

    let categoryMessage = "";
    let errCategoryMessage = "";
    let categoryResultsFound = null;
    let categoryList = [];

    let url = baseURL + "category/";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getCategories response", response);
        if (!response.ok) {
            throw Error(response.status + " " + response.statusText + " " + response.url);
        } else {
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getCategories data", data);

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
        console.log(componentName, "getCategories error", error);
        // console.log(componentName, "getCategories error.name", error.name);
        // console.log(componentName, "getCategories error.message", error.message);
        errCategoryMessage = error.name + ": " + error.message;
    });

};

export default categoriesLoadData;
