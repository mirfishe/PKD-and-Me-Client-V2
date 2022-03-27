import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Alert } from "reactstrap";
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime, hasNonEmptyProperty } from "../../utilities/SharedFunctions";
import { encodeURL, addErrorLog } from "../../utilities/ApplicationFunctions";
import { loadArrayURLs } from "../../app/urlsSlice";
import { loadArrayCategories, setCategoriesDataOffline } from "../../app/categoriesSlice";
import { loadArrayEditions, setEditionsDataOffline } from "../../app/editionsSlice";
import { loadArrayMedia, setMediaDataOffline } from "../../app/mediaSlice";
import { loadArrayTitles, setTitlesDataOffline } from "../../app/titlesSlice";
import { setUserReviewsRatingsLoaded, setLastDatabaseRetrievalUserReviewsRatings /* , setUserReviewsRatingsDataOffline */ } from "../../app/userReviewsSlice";

function LoadBibliographyData() {

  const componentName = "LoadBibliographyData";

  const dispatch = useDispatch();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  // ! Loading the applicationOffline from the state store here is too slow
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const applicationOffline = useSelector(state => state.applicationSettings.applicationOffline);
  const applicationOffline = applicationSettings.applicationOffline;

  // * Load settings from Redux slices. -- 03/06/2021 MF
  const categoriesLoaded = useSelector(state => state.categories.categoriesLoaded);
  const mediaLoaded = useSelector(state => state.media.mediaLoaded);
  const titlesLoaded = useSelector(state => state.titles.titlesLoaded);
  const editionsLoaded = useSelector(state => state.editions.editionsLoaded);

  // const lastDatabaseRetrievalCategories = useSelector(state => state.categories.lastDatabaseRetrievalCategories);
  // const lastDatabaseRetrievalMedia = useSelector(state => state.media.lastDatabaseRetrievalMedia);
  // const lastDatabaseRetrievalTitles = useSelector(state => state.titles.lastDatabaseRetrievalTitles);
  // const lastDatabaseRetrievalEditions = useSelector(state => state.editions.lastDatabaseRetrievalEditions);

  const [categoryMessage, setCategoryMessage] = useState("");
  const [errCategoryMessage, setErrCategoryMessage] = useState("");
  const [mediaMessage, setMediaMessage] = useState("");
  const [errMediaMessage, setErrMediaMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [errTitleMessage, setErrTitleMessage] = useState("");
  const [editionMessage, setEditionMessage] = useState("");
  const [errEditionMessage, setErrEditionMessage] = useState("");
  const [overallTitleRatingMessage, setOverallTitleRatingMessage] = useState("");
  const [errOverallTitleRatingMessage, setErrOverallTitleRatingMessage] = useState("");


  const addRatings = (titleData, userReviewsRatingsData) => {

    let arrayTitles = [...titleData];
    let arrayUserReviewsRatings = [];

    if (isEmpty(userReviewsRatingsData) === false) {

      arrayUserReviewsRatings = [...userReviewsRatingsData];

    };

    if (Array.isArray(arrayTitles) === true) {

      for (let i = 0; i < arrayTitles.length; i++) {

        let userReviewRatingItem = {};

        if (isEmpty(arrayTitles[i].titleID) === false && !isNaN(arrayTitles[i].titleID)) {

          userReviewRatingItem = arrayUserReviewsRatings.filter(userReview => userReview.titleID === arrayTitles[i].titleID);
          userReviewRatingItem = userReviewRatingItem[0];

        };

        let userReviewCount = 0;
        let userReviewSum = 0;
        let userReviewAverage = 0;

        if (isEmpty(userReviewRatingItem) === false) {


          if (hasNonEmptyProperty(userReviewRatingItem, "userReviewCount")) {

            userReviewCount = userReviewRatingItem.userReviewCount;

          };

          if (hasNonEmptyProperty(userReviewRatingItem, "userReviewSum")) {

            userReviewSum = userReviewRatingItem.userReviewSum;

          };

          if (userReviewCount > 0) {

            // ? Check for division by zero? -- 03/06/2021 MF
            // let userReviewAverage: number = userReviewSum/0;
            userReviewAverage = userReviewSum / userReviewCount;

          };


        };


        Object.assign(arrayTitles[i], { userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage });

      };

    };

    dispatch(loadArrayTitles(arrayTitles));
    dispatch(setUserReviewsRatingsLoaded(true));
    dispatch(setLastDatabaseRetrievalUserReviewsRatings(getDateTime()));

  };


  const getUserReviewsRatings = (titleData) => {

    setOverallTitleRatingMessage("");
    setErrOverallTitleRatingMessage("");

    let url = baseURL + "userreviews/";

    url = url + "rating";


    fetch(url)
      .then(response => {

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          // dispatch(setUserReviewsRatingsDataOffline(true));
          return { transactionSuccess: false, errorOccurred: true, message: "Offline User Reviews Ratings data fetch used." };

        } else {

          // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          // dispatch(setUserReviewsRatingsDataOffline(false));
          return response.json();

        };

      })
      .then(results => {
        // setOverallTitleRatingMessage(results.message);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          // loadDataStore(results.records, "userReviewRating");
          addRatings(titleData, results.records);

          // } else {

          //   console.error(componentName, getDateTime(), "getUserReviewsRatings error", results.message);
          //   // setErrOverallTitleRatingMessage(results.message);
          //   // dispatch(setUserReviewsRatingsDataOffline(true));
          //   // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          //   // fetchLocalDataUserReviewsRatings(titleData);

        };

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "getUserReviewsRatings error", error);
        // console.error(componentName, getDateTime(), "getUserReviewsRatings error.name", error.name);
        // console.error(componentName, getDateTime(), "getUserReviewsRatings error.message", error.message);

        // setErrOverallTitleRatingMessage(error.name + ": " + error.message);
        // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
        // dispatch(setUserReviewsRatingsDataOffline(true));
        // fetchLocalDataUserReviewsRatings(titleData);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const loadDataStore = (data, source) => {

    if (source === "categories") {

      dispatch(loadArrayCategories(data));
      // localStorage.setItem("arrayCategories", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalCategories", getDateTime());
      loadURLs(data, source);

    } else if (source === "media") {

      dispatch(loadArrayMedia(data));
      // localStorage.setItem("arrayMedia", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalMedia", getDateTime());
      loadURLs(data, source);

    } else if (source === "titles") {

      // dispatch(loadArrayTitles(data));
      getUserReviewsRatings(data);
      // localStorage.setItem("arrayTitles", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalTitles", getDateTime());
      loadURLs(data, source);

    } else if (source === "editions") {

      dispatch(loadArrayEditions(data));
      // localStorage.setItem("arrayEditions", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalEditions", getDateTime());

    };

  };


  const loadURLs = (data, source) => {

    let arrayURLs = [];

    if (Array.isArray(data) === true) {

      for (let i = 0; i < data.length; i++) {

        if (source === "categories") {

          arrayURLs.push({ linkName: encodeURL(data[i].category), linkType: source, linkID: data[i].categoryID, linkTypeNameID: data[i].categoryID, linkTypeName: data[i].category });

        } else if (source === "media") {

          arrayURLs.push({ linkName: encodeURL(data[i].media), linkType: source, linkID: data[i].mediaID, linkTypeNameID: data[i].mediaID, linkTypeName: data[i].media });

        } else if (source === "titles") {

          arrayURLs.push({ linkName: data[i].titleURL, linkType: source, linkID: data[i].titleID, linkTypeNameID: data[i].categoryID, linkTypeName: data[i].category });

        };

      };

    };

    dispatch(loadArrayURLs(arrayURLs));

  };


  const getCategories = () => {

    setCategoryMessage("");
    setErrCategoryMessage("");

    let url = baseURL + "categories";

    fetch(url)
      .then(response => {

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setCategoriesDataOffline(true));
          return { transactionSuccess: false, errorOccurred: true, message: "Offline Categories data fetch used." };

        } else {

          dispatch(setCategoriesDataOffline(false));
          return response.json();

        };

      })
      .then(results => {

        // setCategoryMessage(results.message);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "categories");

        } else {

          console.error(componentName, getDateTime(), "getCategories error", results.message);
          // setErrCategoryMessage(results.message);
          dispatch(setCategoriesDataOffline(true));
          fetchLocalDataCategories();

        };

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "getCategories error", error);
        // console.error(componentName, getDateTime(), "getCategories error.name", error.name);
        // console.error(componentName, getDateTime(), "getCategories error.message", error.message);

        // setErrCategoryMessage(error.name + ": " + error.message);
        dispatch(setCategoriesDataOffline(true));
        fetchLocalDataCategories();

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const getMedia = () => {

    setMediaMessage("");
    setErrMediaMessage("");

    let url = baseURL + "media";

    fetch(url)
      .then(response => {

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setMediaDataOffline(true));
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Media data used.", media: MediaData};
          return { transactionSuccess: false, errorOccurred: true, message: "Offline Media data fetch used." };

        } else {

          dispatch(setMediaDataOffline(false));
          return response.json();

        };

      })
      .then(results => {

        // setMediaMessage(results.message);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "media");

        } else {

          console.error(componentName, getDateTime(), "getMedia error", results.message);
          // setErrMediaMessage(results.message);
          // dispatch(setMediaDataOffline(true));
          fetchLocalDataMedia();

        };

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "getMedia error", error);
        // console.error(componentName, getDateTime(), "getMedia error.name", error.name);
        // console.error(componentName, getDateTime(), "getMedia error.message", error.message);

        // setErrMediaMessage(error.name + ": " + error.message);
        // dispatch(setMediaDataOffline(true));
        fetchLocalDataMedia();

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const getTitles = () => {

    setTitleMessage("");
    setErrTitleMessage("");

    let url = baseURL + "titles";

    fetch(url)
      .then(response => {

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setTitlesDataOffline(true));
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Titles data used.", titles: TitleData};
          return { transactionSuccess: false, errorOccurred: true, message: "Offline Titles data fetch used." };

        } else {

          dispatch(setTitlesDataOffline(false));
          return response.json();

        };

      })
      .then(results => {

        // setTitleMessage(results.message);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "titles");

        } else {

          console.error(componentName, getDateTime(), "getTitles error", results.message);
          // setErrTitleMessage(results.message);
          dispatch(setTitlesDataOffline(true));
          fetchLocalDataTitles();

        };

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "getTitle error", error);
        // console.error(componentName, getDateTime(), "getTitle error.name", error.name);
        // console.error(componentName, getDateTime(), "getTitle error.message", error.message);

        // setErrTitleMessage(error.name + ": " + error.message);
        dispatch(setTitlesDataOffline(true));
        fetchLocalDataTitles();

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const getEditions = () => {

    setEditionMessage("");
    setErrEditionMessage("");

    let url = baseURL + "editions";

    fetch(url)
      .then(response => {

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setEditionsDataOffline(true));
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Editions data used.", editions: EditionData};
          return { transactionSuccess: false, errorOccurred: true, message: "Offline Editions data fetch used." };

        } else {

          dispatch(setEditionsDataOffline(false));
          return response.json();

        };

      })
      .then(results => {

        // setEditionMessage(results.message);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "editions");

        } else {

          console.error(componentName, getDateTime(), "getEditions error", results.message);
          // setErrEditionMessage(results.message);
          dispatch(setEditionsDataOffline(true));
          fetchLocalDataEditions();

        };

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "getEditions error", error);
        // console.error(componentName, getDateTime(), "getEdition error.name", error.name);
        // console.error(componentName, getDateTime(), "getEdition error.message", error.message);

        // setErrEditionMessage(error.name + ": " + error.message);
        dispatch(setEditionsDataOffline(true));
        fetchLocalDataEditions();

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const fetchLocalDataCategories = () => {

    let url = "bibliographyData/categories.json";

    fetch(url)
      .then(response => {

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer. -- 03/06/2021 MF
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setCategoriesDataOffline(true));
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Categories data used.", categories: CategoryData};
          return { transactionSuccess: false, errorOccurred: true, message: "Offline Categories data fetch failed." };

        } else {

          dispatch(setCategoriesDataOffline(true));
          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "categories");

        } else {

          console.error(componentName, getDateTime(), "fetchLocalDataCategories error", results.message);
          // setErrCategoryMessage(results.message);
          dispatch(setCategoriesDataOffline(true));
          // loadDataStore(CategoryData, "categories");

        };

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "fetchLocalDataCategories error", error);
        // console.error(componentName, getDateTime(), "fetchLocalDataCategories error.name", error.name);
        // console.error(componentName, getDateTime(), "fetchLocalDataCategories error.message", error.message);

        // setErrCategoryMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell. -- 03/06/2021 MF
        dispatch(setCategoriesDataOffline(true));
        // loadDataStore(CategoryData, "categories");

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const fetchLocalDataMedia = () => {

    let url = "bibliographyData/media.json";

    fetch(url)
      .then(response => {

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer. -- 03/06/2021 MF
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setMediaDataOffline(true));
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Media data used.", media: MediaData};
          return { transactionSuccess: false, errorOccurred: true, message: "Offline Media data fetch failed." };

        } else {

          dispatch(setMediaDataOffline(true));
          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "media");

        } else {

          console.error(componentName, getDateTime(), "fetchLocalDataMedia error", results.message);
          // setErrMediaMessage(results.message);
          dispatch(setMediaDataOffline(true));
          // loadDataStore(MediaData, "media");

        };

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "fetchLocalDataMedia error", error);
        // console.error(componentName, getDateTime(), "fetchLocalDataMedia error.name", error.name);
        // console.error(componentName, getDateTime(), "fetchLocalDataMedia error.message", error.message);

        // setErrMediaMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell. -- 03/06/2021 MF
        dispatch(setMediaDataOffline(true));
        // loadDataStore(MediaData, "media");

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const fetchLocalDataTitles = () => {

    let url = "bibliographyData/titles.json";

    fetch(url)
      .then(response => {

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer. -- 03/06/2021 MF
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setTitlesDataOffline(true));
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Titles data used.", titles: TitleData};
          return { transactionSuccess: false, errorOccurred: true, message: "Offline Titles data fetch failed." };

        } else {

          dispatch(setTitlesDataOffline(true));
          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "titles");

        } else {

          console.error(componentName, getDateTime(), "fetchLocalDataTitles error", results.message);
          // setErrTitleMessage(results.message);
          dispatch(setTitlesDataOffline(true));
          // loadDataStore(TitleData, "titles");

        };

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "fetchLocalDataTitles error", error);
        // console.error(componentName, getDateTime(), "fetchLocalDataTitles error.name", error.name);
        // console.error(componentName, getDateTime(), "fetchLocalDataTitles error.message", error.message);

        // setErrTitleMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell. -- 03/06/2021 MF
        dispatch(setTitlesDataOffline(true));
        // loadDataStore(TitleData, "titles");

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const fetchLocalDataEditions = () => {

    let url = "bibliographyData/editions.json";

    fetch(url)
      .then(response => {

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer. -- 03/06/2021 MF
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setEditionsDataOffline(true));
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Editions data used.", editions: EditionData};
          return { transactionSuccess: false, errorOccurred: true, message: "Offline Editions data fetch failed." };

        } else {

          dispatch(setEditionsDataOffline(true));
          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "editions");

        } else {

          console.error(componentName, getDateTime(), "fetchLocalDataEditions error", results.message);
          // setErrEditionMessage(results.message);
          dispatch(setEditionsDataOffline(true));
          // loadDataStore(EditionData, "editions");

        };

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "fetchLocalDataEditions error", error);
        // console.error(componentName, getDateTime(), "fetchLocalDataEditions error.name", error.name);
        // console.error(componentName, getDateTime(), "fetchLocalDataEditions error.message", error.message);

        // setErrEditionMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell. -- 03/06/2021 MF
        dispatch(setEditionsDataOffline(true));
        // loadDataStore(EditionData, "editions");

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

    // ! Experiment in adding bibliographical data to local storage that doesn't work. -- 03/06/2021 MF
    // let categoriesDataLocalStorage = false;
    // let mediaDataLocalStorage = false;
    // let titlesDataLocalStorage = false;
    // let editionsDataLocalStorage = false;

    // let currentDateTime = new Date().setTime(new Date().getTime());

    // if (!categoriesLoaded && isEmpty(localStorage.getItem("lastDatabaseRetrievalCategories")) === false) {


    //   // let localStoragelastDatabaseRetrievalCategories = new Date(localStorage.getItem("lastDatabaseRetrievalCategories"));

    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalCategories")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalCategories")).getTime() - (8*60*60*1000));

    //   if (currentDateTime > checkDateTime) {

    //     if (isEmpty(localStorage.getItem("arrayCategories")) === false) {

    //       const localStorageArrayCategories = localStorage.getItem("arrayCategories");
    //       loadDataStore(JSON.parse(localStorageArrayCategories), "category");

    //       categoriesDataLocalStorage = true;

    //     };

    //   };

    // };

    // if (!mediaLoaded && isEmpty(localStorage.getItem("lastDatabaseRetrievalMedia")) === false {


    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalMedia")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalMedia")).getTime() - (8*60*60*1000));

    //   if (currentDateTime > checkDateTime) {

    //     if (isEmpty(localStorage.getItem("arrayMedia")) === false) {

    //       const localStorageArrayMedia = localStorage.getItem("arrayMedia");
    //       loadDataStore(JSON.parse(localStorageArrayMedia), "media");

    //       mediaDataLocalStorage = true;

    //     };

    //   };

    // };

    // if (!titlesLoaded && isEmpty(localStorage.getItem("lastDatabaseRetrievalTitles")) === false) {


    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).getTime() - (8*60*60*1000));

    //   if (currentDateTime > checkDateTime) {

    //     if (isEmpty(localStorage.getItem("arrayTitles")) === false) {

    //       const localStorageArrayTitles = localStorage.getItem("arrayTitles");
    //       loadDataStore(JSON.parse(localStorageArrayTitles), "title");

    //       titlesDataLocalStorage = true;

    //     };

    //   };

    // };

    // if (!editionsLoaded && isEmpty(localStorage.getItem("lastDatabaseRetrievalEditions")) === false) {


    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).getTime() - (8*60*60*1000));

    //   if (currentDateTime > checkDateTime) {

    //   if (isEmpty(localStorage.getItem("arrayEditions")) === false) {

    //       const localStorageArrayEditions = localStorage.getItem("arrayEditions");
    //       loadDataStore(JSON.parse(localStorageArrayEditions), "edition");

    //       editionsDataLocalStorage = true;

    //     };

    //   };

    // };

    // * Only load the bibliography data once per session unless the data is changed. -- 03/06/2021 MF
    if (applicationOffline) {

      if (!categoriesLoaded /*&& !categoriesDataLocalStorage*/) {

        dispatch(setCategoriesDataOffline(true));
        fetchLocalDataCategories();

      };

      if (!mediaLoaded /*&& !mediaDataLocalStorage*/) {

        dispatch(setMediaDataOffline(true));
        fetchLocalDataMedia();

      };

      if (!titlesLoaded /*&& !titlesDataLocalStorage*/) {

        dispatch(setTitlesDataOffline(true));
        fetchLocalDataTitles();

      };

      if (!editionsLoaded /*&& !editionsDataLocalStorage*/) {

        dispatch(setEditionsDataOffline(true));
        fetchLocalDataEditions();

      };

    } else {

      if (!categoriesLoaded /*&& !categoriesDataLocalStorage*/) {

        getCategories();

      };

      if (!mediaLoaded /*&& !mediaDataLocalStorage*/) {

        getMedia();

      };

      if (!titlesLoaded /*&& !titlesDataLocalStorage*/) {

        getTitles();

      };

      if (!editionsLoaded /*&& !editionsDataLocalStorage*/) {

        getEditions();

      };

    };

  }, []);


  return (
    <Row className="text-center">

      {isEmpty(categoryMessage) === false ? <Alert color="info">{categoryMessage}</Alert> : null}
      {isEmpty(errCategoryMessage) === false ? <Alert color="danger">{errCategoryMessage}</Alert> : null}

      {isEmpty(mediaMessage) === false ? <Alert color="info">{mediaMessage}</Alert> : null}
      {isEmpty(errMediaMessage) === false ? <Alert color="danger">{errMediaMessage}</Alert> : null}

      {isEmpty(titleMessage) === false ? <Alert color="info">{titleMessage}</Alert> : null}
      {isEmpty(errTitleMessage) === false ? <Alert color="danger">{errTitleMessage}</Alert> : null}

      {isEmpty(editionMessage) === false ? <Alert color="info">{editionMessage}</Alert> : null}
      {isEmpty(errEditionMessage) === false ? <Alert color="danger">{errEditionMessage}</Alert> : null}

      {isEmpty(overallTitleRatingMessage) === false ? <Alert color="info">{overallTitleRatingMessage}</Alert> : null}
      {isEmpty(errOverallTitleRatingMessage) === false ? <Alert color="danger">{errOverallTitleRatingMessage}</Alert> : null}

    </Row>
  );
}

export default LoadBibliographyData;
