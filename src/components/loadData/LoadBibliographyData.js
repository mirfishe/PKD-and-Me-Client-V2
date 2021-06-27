import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Alert } from "reactstrap";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, encodeURL } from "../../app/sharedFunctions";
import { loadArrayURLs } from "../../app/urlsSlice";
import CategoryData from "../../bibliographyData/categories.json";
import { loadArrayCategories, setCategoriesDataOffline } from "../../bibliographyData/categoriesSlice";
import EditionData from "../../bibliographyData/editions.json";
import { loadArrayEditions, setEditionsDataOffline } from "../../bibliographyData/editionsSlice";
import MediaData from "../../bibliographyData/media.json";
import { loadArrayMedia, setMediaDataOffline } from "../../bibliographyData/mediaSlice";
import TitleData from "../../bibliographyData/titles.json";
import { loadArrayTitles, setTitlesDataOffline } from "../../bibliographyData/titlesSlice";
// import UserReviewRatingData from "../../bibliographyData/userReviewsRatings.json";
import { setUserReviewsRatingsLoaded, setLastDatabaseRetrievalUserReviewsRatings, setUserReviewsRatingsDataOffline } from "../../bibliographyData/userReviewsSlice";

function LoadBibliographyData() {

  const componentName = "LoadBibliographyData.js";

  const dispatch = useDispatch();

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  // ! Loading the appOffline from the state store here is too slow
  // ! Always pulling it from environment.js
  // const appOffline = useSelector(state => state.app.appOffline);
  const appOffline = AppSettings.appOffline;
  // console.log(componentName, GetDateTime(), "appOffline", appOffline);

  // * Load settings from Redux slices
  const categoriesLoaded = useSelector(state => state.categories.categoriesLoaded);
  const mediaLoaded = useSelector(state => state.media.mediaLoaded);
  const titlesLoaded = useSelector(state => state.titles.titlesLoaded);
  const editionsLoaded = useSelector(state => state.editions.editionsLoaded);

  const lastDatabaseRetrievalCategories = useSelector(state => state.categories.lastDatabaseRetrievalCategories);
  const lastDatabaseRetrievalMedia = useSelector(state => state.media.lastDatabaseRetrievalMedia);
  const lastDatabaseRetrievalTitles = useSelector(state => state.titles.lastDatabaseRetrievalTitles);
  const lastDatabaseRetrievalEditions = useSelector(state => state.editions.lastDatabaseRetrievalEditions);

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
    // console.log(componentName, GetDateTime(), "addRatings");
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

        if (userReviewRatingItem.hasOwnProperty("userReviewCount")) {
          userReviewCount = userReviewRatingItem.userReviewCount;
        };

        if (userReviewRatingItem.hasOwnProperty("userReviewSum")) {
          userReviewSum = userReviewRatingItem.userReviewSum;
        };

        if (userReviewCount > 0) {
          // ? Check for division by zero?
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
    // console.log(componentName, GetDateTime(), "getUserReviewsRatings");
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
          // * load offline data
          dispatch(setUserReviewsRatingsDataOffline(true));
          return { resultsFound: false, message: "Offline User Reviews Ratings data fetch used." };
        } else {
          dispatch(setUserReviewsRatingsDataOffline(false));
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "getUserReviewsRatings data", data);
        // setOverallTitleRatingMessage(data.message);

        if (data.resultsFound === true) {
          // loadDataStore(data.records, "userReviewRating");
          addRatings(titleData, data.records);

        } else {
          console.log(componentName, GetDateTime(), "getUserReviewsRatings resultsFound error", data.message);
          // setErrOverallTitleRatingMessage(data.message);
          dispatch(setUserReviewsRatingsDataOffline(true));
          fetchLocalDataUserReviewsRatings(titleData);
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "getUserReviewsRatings error", error);
        // console.log(componentName, GetDateTime(), "getUserReviewsRatings error.name", error.name);
        // console.log(componentName, GetDateTime(), "getUserReviewsRatings error.message", error.message);
        // setErrOverallTitleRatingMessage(error.name + ": " + error.message);
        dispatch(setUserReviewsRatingsDataOffline(true));
        fetchLocalDataUserReviewsRatings(titleData);
      });

  };


  const fetchLocalDataUserReviewsRatings = (titleData) => {
    // console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings");

    let url = "bibliographyData/userReviewsRatings.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * load offline data
          dispatch(setUserReviewsRatingsDataOffline(true));
          // return {resultsFound: true, message: "Offline User Reviews data used.", userReviews: UserReviewData};
          return { resultsFound: false, message: "Offline User Reviews data fetch failed." };
        } else {
          dispatch(setUserReviewsRatingsDataOffline(true));
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings data", data);

        if (data.resultsFound === true) {
          // loadDataStore(data.userReviews, "userReviewRating");
          addRatings(titleData, data.records);
        } else {
          console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings resultsFound error", data.message);
          // setErrUserReviewMessage(data.message);
          dispatch(setUserReviewsRatingsDataOffline(true));
          // loadDataStore(UserReviewData, "userReviewRating");
          // addRatings(titleData, UserReviewRatingData);
          // * Not going to need to load user review ratings from local data.
          addRatings(titleData, []);
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings error", error);
        // console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings error.name", error.name);
        // console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings error.message", error.message);
        // setErrUserReviewMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell
        dispatch(setUserReviewsRatingsDataOffline(true));
        // loadDataStore(UserReviewRatingData, "userReviewRating");
        // addRatings(titleData, UserReviewRatingData);
        // * Not going to need to load user review ratings from local data.
        addRatings(titleData, []);
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
    // console.log(componentName, GetDateTime(), "getCategories");
    // console.log(componentName, GetDateTime(), "getCategories baseURL", baseURL);

    setCategoryMessage("");
    setErrCategoryMessage("");

    let url = baseURL + "categories";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getCategories response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * load offline data
          dispatch(setCategoriesDataOffline(true));
          return { resultsFound: false, message: "Offline Categories data fetch used." };
        } else {
          dispatch(setCategoriesDataOffline(false));
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "getCategories data", data);
        // setCategoryMessage(data.message);

        if (data.resultsFound === true) {
          loadDataStore(data.records, "categories");
        } else {
          console.log(componentName, GetDateTime(), "getCategories resultsFound error", data.message);
          // setErrCategoryMessage(data.message);
          dispatch(setCategoriesDataOffline(true));
          fetchLocalDataCategories();
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "getCategories error", error);
        // console.log(componentName, GetDateTime(), "getCategories error.name", error.name);
        // console.log(componentName, GetDateTime(), "getCategories error.message", error.message);
        // setErrCategoryMessage(error.name + ": " + error.message);
        dispatch(setCategoriesDataOffline(true));
        fetchLocalDataCategories();
      });

  };


  const getMedia = () => {
    // console.log(componentName, GetDateTime(), "getMedia");
    // console.log(componentName, GetDateTime(), "getMedia baseURL", baseURL);

    setMediaMessage("");
    setErrMediaMessage("");

    let url = baseURL + "media";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getMedia response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * load offline data
          dispatch(setMediaDataOffline(true));
          // return {resultsFound: true, message: "Offline Media data used.", media: MediaData};
          return { resultsFound: false, message: "Offline Media data fetch used." };
        } else {
          dispatch(setMediaDataOffline(false));
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "getMedia data", data);
        // setMediaMessage(data.message);

        if (data.resultsFound === true) {
          loadDataStore(data.records, "media");
        } else {
          console.log(componentName, GetDateTime(), "getMedia resultsFound error", data.message);
          // setErrMediaMessage(data.message);
          dispatch(setMediaDataOffline(true));
          fetchLocalDataMedia();
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "getMedia error", error);
        // console.log(componentName, GetDateTime(), "getMedia error.name", error.name);
        // console.log(componentName, GetDateTime(), "getMedia error.message", error.message);
        // setErrMediaMessage(error.name + ": " + error.message);
        dispatch(setMediaDataOffline(true));
        fetchLocalDataMedia();
      });

  };


  const getTitles = () => {
    // console.log(componentName, GetDateTime(), "getTitle");
    // console.log(componentName, GetDateTime(), "getTitle baseURL", baseURL);

    setTitleMessage("");
    setErrTitleMessage("");

    let url = baseURL + "titles";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getTitle response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * load offline data
          dispatch(setTitlesDataOffline(true));
          // return {resultsFound: true, message: "Offline Titles data used.", titles: TitleData};
          return { resultsFound: false, message: "Offline Titles data fetch used." };
        } else {
          dispatch(setTitlesDataOffline(false));
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "getTitle data", data);
        // setTitleMessage(data.message);

        if (data.resultsFound === true) {
          loadDataStore(data.records, "titles");
        } else {
          console.log(componentName, GetDateTime(), "getTitles resultsFound error", data.message);
          // setErrTitleMessage(data.message);
          dispatch(setTitlesDataOffline(true));
          fetchLocalDataTitles();
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "getTitle error", error);
        // console.log(componentName, GetDateTime(), "getTitle error.name", error.name);
        // console.log(componentName, GetDateTime(), "getTitle error.message", error.message);
        // setErrTitleMessage(error.name + ": " + error.message);
        dispatch(setTitlesDataOffline(true));
        fetchLocalDataTitles();
      });

  };


  const getEditions = () => {
    // console.log(componentName, GetDateTime(), "getEdition");
    // console.log(componentName, GetDateTime(), "getEdition baseURL", baseURL);

    setEditionMessage("");
    setErrEditionMessage("");

    let url = baseURL + "editions";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getEdition response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * load offline data
          dispatch(setEditionsDataOffline(true));
          // return {resultsFound: true, message: "Offline Editions data used.", editions: EditionData};
          return { resultsFound: false, message: "Offline Editions data fetch used." };
        } else {
          dispatch(setEditionsDataOffline(false));
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "getEdition data", data);
        // setEditionMessage(data.message);

        if (data.resultsFound === true) {
          loadDataStore(data.records, "editions");
        } else {
          console.log(componentName, GetDateTime(), "getEditions resultsFound error", data.message);
          // setErrEditionMessage(data.message);
          dispatch(setEditionsDataOffline(true));
          fetchLocalDataEditions();
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "getEditions error", error);
        // console.log(componentName, GetDateTime(), "getEdition error.name", error.name);
        // console.log(componentName, GetDateTime(), "getEdition error.message", error.message);
        // setErrEditionMessage(error.name + ": " + error.message);
        dispatch(setEditionsDataOffline(true));
        fetchLocalDataEditions();
      });

  };


  const fetchLocalDataCategories = () => {
    // console.log(componentName, GetDateTime(), "fetchLocalDataCategories");

    let url = "bibliographyData/categories.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataCategories response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer.
          // * load offline data
          dispatch(setCategoriesDataOffline(true));
          // return {resultsFound: true, message: "Offline Categories data used.", categories: CategoryData};
          return { resultsFound: false, message: "Offline Categories data fetch failed." };
        } else {
          dispatch(setCategoriesDataOffline(true));
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataCategories data", data);

        if (data.resultsFound === true) {
          loadDataStore(data.records, "categories");
        } else {
          console.log(componentName, GetDateTime(), "fetchLocalDataCategories resultsFound error", data.message);
          // setErrCategoryMessage(data.message);
          dispatch(setCategoriesDataOffline(true));
          loadDataStore(CategoryData, "categories");
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "fetchLocalDataCategories error", error);
        // console.log(componentName, GetDateTime(), "fetchLocalDataCategories error.name", error.name);
        // console.log(componentName, GetDateTime(), "fetchLocalDataCategories error.message", error.message);
        // setErrCategoryMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell
        dispatch(setCategoriesDataOffline(true));
        loadDataStore(CategoryData, "categories");
      });

  };


  const fetchLocalDataMedia = () => {
    // console.log(componentName, GetDateTime(), "fetchLocalDataMedia");

    let url = "bibliographyData/media.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataMedia response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer.
          // * load offline data
          dispatch(setMediaDataOffline(true));
          // return {resultsFound: true, message: "Offline Media data used.", media: MediaData};
          return { resultsFound: false, message: "Offline Media data fetch failed." };
        } else {
          dispatch(setMediaDataOffline(true));
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataMedia data", data);

        if (data.resultsFound === true) {
          loadDataStore(data.records, "media");
        } else {
          console.log(componentName, GetDateTime(), "fetchLocalDataMedia resultsFound error", data.message);
          // setErrMediaMessage(data.message);
          dispatch(setMediaDataOffline(true));
          loadDataStore(MediaData, "media");
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "fetchLocalDataMedia error", error);
        // console.log(componentName, GetDateTime(), "fetchLocalDataMedia error.name", error.name);
        // console.log(componentName, GetDateTime(), "fetchLocalDataMedia error.message", error.message);
        // setErrMediaMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell
        dispatch(setMediaDataOffline(true));
        loadDataStore(MediaData, "media");
      });

  };


  const fetchLocalDataTitles = () => {
    // console.log(componentName, GetDateTime(), "fetchLocalDataTitles");

    let url = "bibliographyData/titles.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataTitles response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer.
          // * load offline data
          dispatch(setTitlesDataOffline(true));
          // return {resultsFound: true, message: "Offline Titles data used.", titles: TitleData};
          return { resultsFound: false, message: "Offline Titles data fetch failed." };
        } else {
          dispatch(setTitlesDataOffline(true));
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataTitles data", data);

        if (data.resultsFound === true) {
          loadDataStore(data.records, "titles");
        } else {
          console.log(componentName, GetDateTime(), "fetchLocalDataTitles resultsFound error", data.message);
          // setErrTitleMessage(data.message);
          dispatch(setTitlesDataOffline(true));
          loadDataStore(TitleData, "titles");
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "fetchLocalDataTitles error", error);
        // console.log(componentName, GetDateTime(), "fetchLocalDataTitles error.name", error.name);
        // console.log(componentName, GetDateTime(), "fetchLocalDataTitles error.message", error.message);
        // setErrTitleMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell
        dispatch(setTitlesDataOffline(true));
        loadDataStore(TitleData, "titles");
      });

  };


  const fetchLocalDataEditions = () => {
    // console.log(componentName, GetDateTime(), "fetchLocalDataEditions");

    let url = "bibliographyData/editions.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataEditions response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer.
          // * load offline data
          dispatch(setEditionsDataOffline(true));
          // return {resultsFound: true, message: "Offline Editions data used.", editions: EditionData};
          return { resultsFound: false, message: "Offline Editions data fetch failed." };
        } else {
          dispatch(setEditionsDataOffline(true));
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataEditions data", data);

        if (data.resultsFound === true) {
          loadDataStore(data.records, "editions");
        } else {
          console.log(componentName, GetDateTime(), "fetchLocalDataEditions resultsFound error", data.message);
          // setErrEditionMessage(data.message);
          dispatch(setEditionsDataOffline(true));
          loadDataStore(EditionData, "editions");
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "fetchLocalDataEditions error", error);
        // console.log(componentName, GetDateTime(), "fetchLocalDataEditions error.name", error.name);
        // console.log(componentName, GetDateTime(), "fetchLocalDataEditions error.message", error.message);
        // setErrEditionMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell
        dispatch(setEditionsDataOffline(true));
        loadDataStore(EditionData, "editions");
      });

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect");

    // ! Experiment in adding bibliographical data to local storage that doesn't work
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

    // * Only load the bibliography data once per session unless the data is changed
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
