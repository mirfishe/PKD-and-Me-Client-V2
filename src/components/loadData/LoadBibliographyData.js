import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Alert } from "reactstrap";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty } from "../../utilities/SharedFunctions";
import { encodeURL, LogError } from "../../utilities/AppFunctions";
import { loadArrayURLs } from "../../app/urlsSlice";
import { loadArrayCategories, setCategoriesDataOffline } from "../../app/categoriesSlice";
import { loadArrayEditions, setEditionsDataOffline } from "../../app/editionsSlice";
import { loadArrayMedia, setMediaDataOffline } from "../../app/mediaSlice";
import { loadArrayTitles, setTitlesDataOffline } from "../../app/titlesSlice";
import { setUserReviewsRatingsLoaded, setLastDatabaseRetrievalUserReviewsRatings /* , setUserReviewsRatingsDataOffline */ } from "../../app/userReviewsSlice";

function LoadBibliographyData() {

  const componentName = "LoadBibliographyData.js";

  const dispatch = useDispatch();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  // ! Loading the appOffline from the state store here is too slow
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const appOffline = useSelector(state => state.app.appOffline);
  const appOffline = AppSettings.appOffline;
  // console.log(componentName, GetDateTime(), "appOffline", appOffline);

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
    // console.log(componentName, GetDateTime(), "addRatings baseURL", baseURL);
    // console.log(componentName, GetDateTime(), "addRatings userReviewsRatingsData", userReviewsRatingsData);

    let arrayTitles = [...titleData];
    let arrayUserReviewsRatings = [];

    if (IsEmpty(userReviewsRatingsData) === false) {

      arrayUserReviewsRatings = [...userReviewsRatingsData];

    };

    for (let i = 0; i < arrayTitles.length; i++) {

      let userReviewRatingItem = {};
      // console.log(componentName, GetDateTime(), "addRatings userReviewRatingItem", userReviewRatingItem);

      if (IsEmpty(arrayTitles[i].titleID) === false && !isNaN(arrayTitles[i].titleID)) {

        userReviewRatingItem = arrayUserReviewsRatings.filter(userReview => userReview.titleID === arrayTitles[i].titleID);
        userReviewRatingItem = userReviewRatingItem[0];

      };

      let userReviewCount = 0;
      let userReviewSum = 0;
      let userReviewAverage = 0;

      if (IsEmpty(userReviewRatingItem) === false) {

        // console.log(componentName, GetDateTime(), "addRatings userReviewRatingItem", userReviewRatingItem);

        if (HasNonEmptyProperty(userReviewRatingItem, "userReviewCount")) {

          userReviewCount = userReviewRatingItem.userReviewCount;

        };

        if (HasNonEmptyProperty(userReviewRatingItem, "userReviewSum")) {

          userReviewSum = userReviewRatingItem.userReviewSum;

        };

        if (userReviewCount > 0) {

          // ? Check for division by zero? -- 03/06/2021 MF
          // let userReviewAverage: number = userReviewSum/0;
          userReviewAverage = userReviewSum / userReviewCount;

        };

        // console.log(componentName, GetDateTime(), "addRatings userReviewCount", userReviewCount);
        // console.log(componentName, GetDateTime(), "addRatings userReviewSum", userReviewSum);
        // console.log(componentName, GetDateTime(), "addRatings userReviewAverage", userReviewAverage);

      };

      // console.log(componentName, GetDateTime(), "addRatings userReviewCount", userReviewCount);
      // console.log(componentName, GetDateTime(), "addRatings userReviewSum", userReviewSum);
      // console.log(componentName, GetDateTime(), "addRatings userReviewAverage", userReviewAverage);

      Object.assign(arrayTitles[i], { userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage });

    };

    dispatch(loadArrayTitles(arrayTitles));
    dispatch(setUserReviewsRatingsLoaded(true));
    dispatch(setLastDatabaseRetrievalUserReviewsRatings(GetDateTime()));

  };


  const getUserReviewsRatings = (titleData) => {
    // console.log(componentName, GetDateTime(), "getUserReviewsRatings baseURL", baseURL);
    // console.log(componentName, GetDateTime(), "getUserReviewsRatings titleData", titleData);

    setOverallTitleRatingMessage("");
    setErrOverallTitleRatingMessage("");

    let url = baseURL + "userreviews/";

    url = url + "rating";

    // console.log(componentName, GetDateTime(), "getUserReviewsRatings url", url);

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getUserReviewsRatings response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          // dispatch(setUserReviewsRatingsDataOffline(true));
          return { resultsFound: false, message: "Offline User Reviews Ratings data fetch used." };

        } else {

          // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          // dispatch(setUserReviewsRatingsDataOffline(false));
          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getUserReviewsRatings results", results);
        // setOverallTitleRatingMessage(results.message);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          // loadDataStore(results.records, "userReviewRating");
          addRatings(titleData, results.records);

          // } else {

          //   console.log(componentName, GetDateTime(), "getUserReviewsRatings resultsFound error", results.message);
          //   // setErrOverallTitleRatingMessage(results.message);
          //   // dispatch(setUserReviewsRatingsDataOffline(true));
          //   // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          //   // fetchLocalDataUserReviewsRatings(titleData);

        };

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), "getUserReviewsRatings error", error);
        // console.error(componentName, GetDateTime(), "getUserReviewsRatings error.name", error.name);
        // console.error(componentName, GetDateTime(), "getUserReviewsRatings error.message", error.message);

        // setErrOverallTitleRatingMessage(error.name + ": " + error.message);
        // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
        // dispatch(setUserReviewsRatingsDataOffline(true));
        // fetchLocalDataUserReviewsRatings(titleData);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const loadDataStore = (data, source) => {

    if (source === "categories") {
      // console.log(componentName, GetDateTime(), "loadDataStore data", data);

      dispatch(loadArrayCategories(data));
      // localStorage.setItem("arrayCategories", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalCategories", GetDateTime());
      loadURLs(data, source);

    } else if (source === "media") {
      // console.log(componentName, GetDateTime(), "loadDataStore data", data);

      dispatch(loadArrayMedia(data));
      // localStorage.setItem("arrayMedia", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalMedia", GetDateTime());
      loadURLs(data, source);

    } else if (source === "titles") {
      // console.log(componentName, GetDateTime(), "loadDataStore data", data);

      // dispatch(loadArrayTitles(data));
      getUserReviewsRatings(data);
      // localStorage.setItem("arrayTitles", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalTitles", GetDateTime());
      loadURLs(data, source);

    } else if (source === "editions") {
      // console.log(componentName, GetDateTime(), "loadDataStore data", data);

      dispatch(loadArrayEditions(data));
      // localStorage.setItem("arrayEditions", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalEditions", GetDateTime());

    };

  };


  const loadURLs = (data, source) => {

    let arrayURLs = [];

    for (let i = 0; i < data.length; i++) {

      if (source === "categories") {
        // console.log(componentName, GetDateTime(), "loadURLs data[i].category", data[i].category);

        arrayURLs.push({ linkName: encodeURL(data[i].category), linkType: source, linkID: data[i].categoryID, linkTypeNameID: data[i].categoryID, linkTypeName: data[i].category });

      } else if (source === "media") {
        // console.log(componentName, GetDateTime(), "loadURLs data[i].media", data[i].media);

        arrayURLs.push({ linkName: encodeURL(data[i].media), linkType: source, linkID: data[i].mediaID, linkTypeNameID: data[i].mediaID, linkTypeName: data[i].media });

      } else if (source === "titles") {
        // console.log(componentName, GetDateTime(), "loadURLs data[i].titleURL", data[i].titleURL);

        arrayURLs.push({ linkName: data[i].titleURL, linkType: source, linkID: data[i].titleID, linkTypeNameID: data[i].categoryID, linkTypeName: data[i].category });

      };

    };

    dispatch(loadArrayURLs(arrayURLs));

  };


  const getCategories = () => {
    // console.log(componentName, GetDateTime(), "getCategories baseURL", baseURL);

    setCategoryMessage("");
    setErrCategoryMessage("");

    let url = baseURL + "categories";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getCategories response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setCategoriesDataOffline(true));
          return { resultsFound: false, message: "Offline Categories data fetch used." };

        } else {

          dispatch(setCategoriesDataOffline(false));
          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getCategories results", results);

        // setCategoryMessage(results.message);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          loadDataStore(results.records, "categories");

        } else {

          console.log(componentName, GetDateTime(), "getCategories resultsFound error", results.message);
          // setErrCategoryMessage(results.message);
          dispatch(setCategoriesDataOffline(true));
          fetchLocalDataCategories();

        };

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), "getCategories error", error);
        // console.error(componentName, GetDateTime(), "getCategories error.name", error.name);
        // console.error(componentName, GetDateTime(), "getCategories error.message", error.message);

        // setErrCategoryMessage(error.name + ": " + error.message);
        dispatch(setCategoriesDataOffline(true));
        fetchLocalDataCategories();

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const getMedia = () => {
    // console.log(componentName, GetDateTime(), "getMedia baseURL", baseURL);

    setMediaMessage("");
    setErrMediaMessage("");

    let url = baseURL + "media";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getMedia response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setMediaDataOffline(true));
          // return {resultsFound: true, message: "Offline Media data used.", media: MediaData};
          return { resultsFound: false, message: "Offline Media data fetch used." };

        } else {

          dispatch(setMediaDataOffline(false));
          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getMedia results", results);

        // setMediaMessage(results.message);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          loadDataStore(results.records, "media");

        } else {

          console.log(componentName, GetDateTime(), "getMedia resultsFound error", results.message);
          // setErrMediaMessage(results.message);
          // dispatch(setMediaDataOffline(true));
          fetchLocalDataMedia();

        };

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), "getMedia error", error);
        // console.error(componentName, GetDateTime(), "getMedia error.name", error.name);
        // console.error(componentName, GetDateTime(), "getMedia error.message", error.message);

        // setErrMediaMessage(error.name + ": " + error.message);
        // dispatch(setMediaDataOffline(true));
        fetchLocalDataMedia();

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const getTitles = () => {
    // console.log(componentName, GetDateTime(), "getTitle baseURL", baseURL);

    setTitleMessage("");
    setErrTitleMessage("");

    let url = baseURL + "titles";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getTitle response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setTitlesDataOffline(true));
          // return {resultsFound: true, message: "Offline Titles data used.", titles: TitleData};
          return { resultsFound: false, message: "Offline Titles data fetch used." };

        } else {

          dispatch(setTitlesDataOffline(false));
          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getTitle results", results);

        // setTitleMessage(results.message);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          loadDataStore(results.records, "titles");

        } else {

          console.log(componentName, GetDateTime(), "getTitles resultsFound error", results.message);
          // setErrTitleMessage(results.message);
          dispatch(setTitlesDataOffline(true));
          fetchLocalDataTitles();

        };

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), "getTitle error", error);
        // console.error(componentName, GetDateTime(), "getTitle error.name", error.name);
        // console.error(componentName, GetDateTime(), "getTitle error.message", error.message);

        // setErrTitleMessage(error.name + ": " + error.message);
        dispatch(setTitlesDataOffline(true));
        fetchLocalDataTitles();

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const getEditions = () => {
    // console.log(componentName, GetDateTime(), "getEdition baseURL", baseURL);

    setEditionMessage("");
    setErrEditionMessage("");

    let url = baseURL + "editions";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getEdition response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setEditionsDataOffline(true));
          // return {resultsFound: true, message: "Offline Editions data used.", editions: EditionData};
          return { resultsFound: false, message: "Offline Editions data fetch used." };

        } else {

          dispatch(setEditionsDataOffline(false));
          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getEdition results", results);

        // setEditionMessage(results.message);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          loadDataStore(results.records, "editions");

        } else {

          console.log(componentName, GetDateTime(), "getEditions resultsFound error", results.message);
          // setErrEditionMessage(results.message);
          dispatch(setEditionsDataOffline(true));
          fetchLocalDataEditions();

        };

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), "getEditions error", error);
        // console.error(componentName, GetDateTime(), "getEdition error.name", error.name);
        // console.error(componentName, GetDateTime(), "getEdition error.message", error.message);

        // setErrEditionMessage(error.name + ": " + error.message);
        dispatch(setEditionsDataOffline(true));
        fetchLocalDataEditions();

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const fetchLocalDataCategories = () => {

    let url = "bibliographyData/categories.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataCategories response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer. -- 03/06/2021 MF
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setCategoriesDataOffline(true));
          // return {resultsFound: true, message: "Offline Categories data used.", categories: CategoryData};
          return { resultsFound: false, message: "Offline Categories data fetch failed." };

        } else {

          dispatch(setCategoriesDataOffline(true));
          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataCategories results", results);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          loadDataStore(results.records, "categories");

        } else {

          console.log(componentName, GetDateTime(), "fetchLocalDataCategories resultsFound error", results.message);
          // setErrCategoryMessage(results.message);
          dispatch(setCategoriesDataOffline(true));
          // loadDataStore(CategoryData, "categories");

        };

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), "fetchLocalDataCategories error", error);
        // console.error(componentName, GetDateTime(), "fetchLocalDataCategories error.name", error.name);
        // console.error(componentName, GetDateTime(), "fetchLocalDataCategories error.message", error.message);

        // setErrCategoryMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell. -- 03/06/2021 MF
        dispatch(setCategoriesDataOffline(true));
        // loadDataStore(CategoryData, "categories");

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const fetchLocalDataMedia = () => {

    let url = "bibliographyData/media.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataMedia response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer. -- 03/06/2021 MF
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setMediaDataOffline(true));
          // return {resultsFound: true, message: "Offline Media data used.", media: MediaData};
          return { resultsFound: false, message: "Offline Media data fetch failed." };

        } else {

          dispatch(setMediaDataOffline(true));
          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataMedia results", results);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          loadDataStore(results.records, "media");

        } else {

          console.log(componentName, GetDateTime(), "fetchLocalDataMedia resultsFound error", results.message);
          // setErrMediaMessage(results.message);
          dispatch(setMediaDataOffline(true));
          // loadDataStore(MediaData, "media");

        };

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), "fetchLocalDataMedia error", error);
        // console.error(componentName, GetDateTime(), "fetchLocalDataMedia error.name", error.name);
        // console.error(componentName, GetDateTime(), "fetchLocalDataMedia error.message", error.message);

        // setErrMediaMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell. -- 03/06/2021 MF
        dispatch(setMediaDataOffline(true));
        // loadDataStore(MediaData, "media");

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const fetchLocalDataTitles = () => {

    let url = "bibliographyData/titles.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataTitles response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer. -- 03/06/2021 MF
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setTitlesDataOffline(true));
          // return {resultsFound: true, message: "Offline Titles data used.", titles: TitleData};
          return { resultsFound: false, message: "Offline Titles data fetch failed." };

        } else {

          dispatch(setTitlesDataOffline(true));
          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataTitles results", results);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          loadDataStore(results.records, "titles");

        } else {

          console.log(componentName, GetDateTime(), "fetchLocalDataTitles resultsFound error", results.message);
          // setErrTitleMessage(results.message);
          dispatch(setTitlesDataOffline(true));
          // loadDataStore(TitleData, "titles");

        };

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), "fetchLocalDataTitles error", error);
        // console.error(componentName, GetDateTime(), "fetchLocalDataTitles error.name", error.name);
        // console.error(componentName, GetDateTime(), "fetchLocalDataTitles error.message", error.message);

        // setErrTitleMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell. -- 03/06/2021 MF
        dispatch(setTitlesDataOffline(true));
        // loadDataStore(TitleData, "titles");

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const fetchLocalDataEditions = () => {

    let url = "bibliographyData/editions.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataEditions response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer. -- 03/06/2021 MF
          // * Load offline data. -- 03/06/2021 MF
          dispatch(setEditionsDataOffline(true));
          // return {resultsFound: true, message: "Offline Editions data used.", editions: EditionData};
          return { resultsFound: false, message: "Offline Editions data fetch failed." };

        } else {

          dispatch(setEditionsDataOffline(true));
          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataEditions results", results);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          loadDataStore(results.records, "editions");

        } else {

          console.log(componentName, GetDateTime(), "fetchLocalDataEditions resultsFound error", results.message);
          // setErrEditionMessage(results.message);
          dispatch(setEditionsDataOffline(true));
          // loadDataStore(EditionData, "editions");

        };

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), "fetchLocalDataEditions error", error);
        // console.error(componentName, GetDateTime(), "fetchLocalDataEditions error.name", error.name);
        // console.error(componentName, GetDateTime(), "fetchLocalDataEditions error.message", error.message);

        // setErrEditionMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell. -- 03/06/2021 MF
        dispatch(setEditionsDataOffline(true));
        // loadDataStore(EditionData, "editions");

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

    // ! Experiment in adding bibliographical data to local storage that doesn't work. -- 03/06/2021 MF
    // let categoriesDataLocalStorage = false;
    // let mediaDataLocalStorage = false;
    // let titlesDataLocalStorage = false;
    // let editionsDataLocalStorage = false;

    // let currentDateTime = new Date().setTime(new Date().getTime());
    // // console.log(componentName, GetDateTime(), "useEffect currentDateTime", currentDateTime);
    // // console.log(componentName, GetDateTime(), "useEffect new Date(currentDateTime).toISOString()", new Date(currentDateTime).toISOString());

    // if (!categoriesLoaded && IsEmpty(localStorage.getItem("lastDatabaseRetrievalCategories")) === false) {

    //   // console.log(componentName, GetDateTime(), "useEffect localStorage.getItem(\"lastDatabaseRetrievalCategories\")", localStorage.getItem("lastDatabaseRetrievalCategories"));

    //   // let localStoragelastDatabaseRetrievalCategories = new Date(localStorage.getItem("lastDatabaseRetrievalCategories"));
    //   // console.log(componentName, GetDateTime(), "useEffect localStoragelastDatabaseRetrievalCategories", localStoragelastDatabaseRetrievalCategories);
    //   // console.log(componentName, GetDateTime(), "useEffect localStoragelastDatabaseRetrievalCategories.setTime(localStoragelastDatabaseRetrievalCategories.getTime())", localStoragelastDatabaseRetrievalCategories.setTime(localStoragelastDatabaseRetrievalCategories.getTime()));
    //   // console.log(componentName, GetDateTime(), "useEffect typeof localStoragelastDatabaseRetrievalCategories", typeof localStoragelastDatabaseRetrievalCategories);

    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalCategories")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalCategories")).getTime() - (8*60*60*1000));
    //   // console.log(componentName, GetDateTime(), "useEffect checkDateTime", checkDateTime);
    //   // console.log(componentName, GetDateTime(), "useEffect new Date(checkDateTime).toISOString()", new Date(checkDateTime).toISOString());

    //   if (currentDateTime > checkDateTime) {

    //     if (IsEmpty(localStorage.getItem("arrayCategories")) === false) {
    //       // console.log(componentName, GetDateTime(), "useEffect localStorage.getItem(\"arrayCategories\")", localStorage.getItem("arrayCategories"));

    //       const localStorageArrayCategories = localStorage.getItem("arrayCategories");
    //       loadDataStore(JSON.parse(localStorageArrayCategories), "category");

    //       categoriesDataLocalStorage = true;

    //     };

    //   };

    // };

    // if (!mediaLoaded && IsEmpty(localStorage.getItem("lastDatabaseRetrievalMedia")) === false {

    //   // console.log(componentName, GetDateTime(), "useEffect localStorage.getItem(\"lastDatabaseRetrievalMedia\")", localStorage.getItem("lastDatabaseRetrievalMedia"));

    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalMedia")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalMedia")).getTime() - (8*60*60*1000));
    //   // console.log(componentName, GetDateTime(), "useEffect checkDateTime", checkDateTime);
    //   // console.log(componentName, GetDateTime(), "useEffect new Date(checkDateTime).toISOString()", new Date(checkDateTime).toISOString());

    //   if (currentDateTime > checkDateTime) {

    //     if (IsEmpty(localStorage.getItem("arrayMedia")) === false) {
    //       // console.log(componentName, GetDateTime(), "useEffect localStorage.getItem(\"arrayMedia\")", localStorage.getItem("arrayMedia"));

    //       const localStorageArrayMedia = localStorage.getItem("arrayMedia");
    //       loadDataStore(JSON.parse(localStorageArrayMedia), "media");

    //       mediaDataLocalStorage = true;

    //     };

    //   };

    // };

    // if (!titlesLoaded && IsEmpty(localStorage.getItem("lastDatabaseRetrievalTitles")) === false) {

    //   // console.log(componentName, GetDateTime(), "useEffect localStorage.getItem(\"lastDatabaseRetrievalTitles\")", localStorage.getItem("lastDatabaseRetrievalTitles"));

    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).getTime() - (8*60*60*1000));
    //   // console.log(componentName, GetDateTime(), "useEffect checkDateTime", checkDateTime);
    //   console.log(componentName, GetDateTime(), "useEffect new Date(checkDateTime).toISOString()", new Date(checkDateTime).toISOString());

    //   if (currentDateTime > checkDateTime) {

    //     if (IsEmpty(localStorage.getItem("arrayTitles")) === false) {
    //       // console.log(componentName, GetDateTime(), "useEffect localStorage.getItem(\"arrayTitles\")", localStorage.getItem("arrayTitles"));

    //       const localStorageArrayTitles = localStorage.getItem("arrayTitles");
    //       loadDataStore(JSON.parse(localStorageArrayTitles), "title");

    //       titlesDataLocalStorage = true;

    //     };

    //   };

    // };

    // if (!editionsLoaded && IsEmpty(localStorage.getItem("lastDatabaseRetrievalEditions")) === false) {

    //   // console.log(componentName, GetDateTime(), "useEffect localStorage.getItem(\"lastDatabaseRetrievalEditions\")", localStorage.getItem("lastDatabaseRetrievalEditions"));

    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).getTime() - (8*60*60*1000));
    //   // console.log(componentName, GetDateTime(), "useEffect checkDateTime", checkDateTime);
    //   console.log(componentName, GetDateTime(), "useEffect new Date(checkDateTime).toISOString()", new Date(checkDateTime).toISOString());

    //   if (currentDateTime > checkDateTime) {

    //   if (IsEmpty(localStorage.getItem("arrayEditions")) === false) {
    //       // console.log(componentName, GetDateTime(), "useEffect localStorage.getItem(\"arrayEditions\")", localStorage.getItem("arrayEditions"));

    //       const localStorageArrayEditions = localStorage.getItem("arrayEditions");
    //       loadDataStore(JSON.parse(localStorageArrayEditions), "edition");

    //       editionsDataLocalStorage = true;

    //     };

    //   };

    // };

    // * Only load the bibliography data once per session unless the data is changed. -- 03/06/2021 MF
    if (appOffline) {

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

      {IsEmpty(categoryMessage) === false ? <Alert color="info">{categoryMessage}</Alert> : null}
      {IsEmpty(errCategoryMessage) === false ? <Alert color="danger">{errCategoryMessage}</Alert> : null}

      {IsEmpty(mediaMessage) === false ? <Alert color="info">{mediaMessage}</Alert> : null}
      {IsEmpty(errMediaMessage) === false ? <Alert color="danger">{errMediaMessage}</Alert> : null}

      {IsEmpty(titleMessage) === false ? <Alert color="info">{titleMessage}</Alert> : null}
      {IsEmpty(errTitleMessage) === false ? <Alert color="danger">{errTitleMessage}</Alert> : null}

      {IsEmpty(editionMessage) === false ? <Alert color="info">{editionMessage}</Alert> : null}
      {IsEmpty(errEditionMessage) === false ? <Alert color="danger">{errEditionMessage}</Alert> : null}

      {IsEmpty(overallTitleRatingMessage) === false ? <Alert color="info">{overallTitleRatingMessage}</Alert> : null}
      {IsEmpty(errOverallTitleRatingMessage) === false ? <Alert color="danger">{errOverallTitleRatingMessage}</Alert> : null}

    </Row>
  );
}

export default LoadBibliographyData;
