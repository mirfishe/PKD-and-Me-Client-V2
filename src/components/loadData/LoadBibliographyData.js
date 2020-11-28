import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row, Alert} from "reactstrap";
import AppSettings from "../../app/environment";
import {encodeURL} from "../../app/sharedFunctions";
import {loadArrayURLs} from "../../app/urlsSlice";
import CategoryData from "../../bibliographyData/Categories.json";
import {loadArrayCategories, setCategoriesDataOffline} from "../../bibliographyData/categoriesSlice";
import EditionData from "../../bibliographyData/Editions.json";
import {loadArrayEditions, setEditionsDataOffline} from "../../bibliographyData/editionsSlice";
import MediaData from "../../bibliographyData/Media.json";
import {loadArrayMedia, setMediaDataOffline} from "../../bibliographyData/mediaSlice";
import TitleData from "../../bibliographyData/Titles.json";
import {loadArrayTitles, setTitlesDataOffline} from "../../bibliographyData/titlesSlice";
import UserReviewRatingData from "../../bibliographyData/UserReviewsRatings.json";
import {setUserReviewsRatingsLoaded, setLastDatabaseRetrievalUserReviewsRatings, setUserReviewsRatingsDataOffline} from "../../bibliographyData/userReviewsSlice";

function LoadBibliographyData() {

  const componentName = "LoadBibliographyData.js";

  const dispatch = useDispatch();

  // Loading the baseURL from the state store here is too slow
  // Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, "baseURL", baseURL);

  // Loading the appOffline from the state store here is too slow
  // Always pulling it from environment.js
  // const appOffline = useSelector(state => state.app.appOffline);
  const appOffline = AppSettings.appOffline;
  // console.log(componentName, "appOffline", appOffline);

  // Load settings from Redux slices
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
    // console.log(componentName, "addRatings");
    // console.log(componentName, "addRatings baseURL", baseURL);

    let arrayTitles = [...titleData];
    let arrayUserReviewsRatings = [...userReviewsRatingsData];

    for (let i = 0; i < arrayTitles.length; i++) {

      let userReviewRatingItem = {};
      // console.log(componentName, "addRatings userReviewRatingItem", userReviewRatingItem);
  
      if (arrayTitles[i].titleID !== undefined && arrayTitles[i].titleID !== null && !isNaN(arrayTitles[i].titleID)) {
        userReviewRatingItem = arrayUserReviewsRatings.filter(userReview => userReview.titleID === arrayTitles[i].titleID);
        userReviewRatingItem = userReviewRatingItem[0];
      };

      let userReviewCount = 0;
      let userReviewSum = 0;
      let userReviewAverage = 0;

      if (userReviewRatingItem !== undefined && userReviewRatingItem !== null) {

        // console.log(componentName, "addRatings userReviewRatingItem", userReviewRatingItem);
    
        if (userReviewRatingItem.hasOwnProperty("userReviewCount")) {
          userReviewCount = userReviewRatingItem.userReviewCount;
        };

        if (userReviewRatingItem.hasOwnProperty("userReviewSum")) {
          userReviewSum = userReviewRatingItem.userReviewSum;
        };

        if (userReviewCount > 0) {
          // Check for division by zero?
          // let userReviewAverage: number = userReviewSum/0;
          userReviewAverage = userReviewSum/userReviewCount;
        };

        // console.log(componentName, "addRatings userReviewCount", userReviewCount);
        // console.log(componentName, "addRatings userReviewSum", userReviewSum);
        // console.log(componentName, "addRatings userReviewAverage", userReviewAverage);

      };

      // console.log(componentName, "addRatings userReviewCount", userReviewCount);
      // console.log(componentName, "addRatings userReviewSum", userReviewSum);
      // console.log(componentName, "addRatings userReviewAverage", userReviewAverage);

      Object.assign(arrayTitles[i], {userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage});

      };
  
    dispatch(loadArrayTitles(arrayTitles));
    dispatch(setUserReviewsRatingsLoaded(true));
    dispatch(setLastDatabaseRetrievalUserReviewsRatings(new Date().toISOString()));
  
  };

  const getUserReviewsRatings = (titleData) => {
    // console.log(componentName, "getUserReviewsRatings");
    // console.log(componentName, "getUserReviewsRatings baseURL", baseURL);

    setOverallTitleRatingMessage("");
    setErrOverallTitleRatingMessage("");

    let url = baseURL + "userreview/";

      url = url + "rating/list";

      // console.log(componentName, "getUserReviewsRatings url", url);

      fetch(url)
      .then(response => {
          // console.log(componentName, "getUserReviewsRatings response", response);
          if (!response.ok) {
              // throw Error(response.status + " " + response.statusText + " " + response.url);
              // load offline data
              dispatch(setUserReviewsRatingsDataOffline(true));
              return {resultsFound: false, message: "Offline User Reviews Ratings data fetch used."};
          } else {
              dispatch(setUserReviewsRatingsDataOffline(false));
              return response.json();
          };
      })
      .then(data => {
        // console.log(componentName, "getUserReviewsRatings data", data);
        // setOverallTitleRatingMessage(data.message);

        if (data.resultsFound === true) {
          // loadDataStore(data.userReviews, "userReviewRating");
          addRatings(titleData, data.userReviews);

        } else {
          console.log(componentName, "getUserReviewsRatings resultsFound error", data.message);
          // setErrOverallTitleRatingMessage(data.message);
          dispatch(setUserReviewsRatingsDataOffline(true));
          fetchLocalDataUserReviewsRatings(titleData);
        };

    })
      .catch(error => {
          console.log(componentName, "getUserReviewsRatings error", error);
          // console.log(componentName, "getUserReviewsRatings error.name", error.name);
          // console.log(componentName, "getUserReviewsRatings error.message", error.message);
          // setErrOverallTitleRatingMessage(error.name + ": " + error.message);
          dispatch(setUserReviewsRatingsDataOffline(true));
          fetchLocalDataUserReviewsRatings(titleData);
      });

};

  const fetchLocalDataUserReviewsRatings = (titleData) => {
  // console.log(componentName, "fetchLocalDataUserReviewsRatings");

  let url = "./bibliographyData/UserReviewsRatings.json";

  fetch(url)
  .then(response => {
      // console.log(componentName, "fetchLocalDataUserReviewsRatings response", response);
      if (!response.ok) {
        // throw Error(response.status + " " + response.statusText + " " + response.url);
        // load offline data
        dispatch(setUserReviewsRatingsDataOffline(true));
        // return {resultsFound: true, message: "Offline User Reviews data used.", userReviews: UserReviewData};
        return {resultsFound: false, message: "Offline User Reviews data fetch failed."};
      } else {
        dispatch(setUserReviewsRatingsDataOffline(true));
        return response.json();
      };
  })
  .then(data => {
      console.log(componentName, "fetchLocalDataUserReviewsRatings data", data);

      if (data.resultsFound === true) {
        // loadDataStore(data.userReviews, "userReviewRating");
        addRatings(titleData, data.userReviews);
      } else {
        console.log(componentName, "fetchLocalDataUserReviewsRatings resultsFound error", data.message);
        // setErrUserReviewMessage(data.message);
        dispatch(setUserReviewsRatingsDataOffline(true));
        // loadDataStore(UserReviewData, "userReviewRating");
        addRatings(titleData, UserReviewRatingData);
      };

  })
  .catch(error => {
      console.log(componentName, "fetchLocalDataUserReviewsRatings error", error);
      // console.log(componentName, "fetchLocalDataUserReviewsRatings error.name", error.name);
      // console.log(componentName, "fetchLocalDataUserReviewsRatings error.message", error.message);
      // setErrUserReviewMessage(error.name + ": " + error.message);
      // This doesn't actually run as far as I can tell
      dispatch(setUserReviewsRatingsDataOffline(true));
      // loadDataStore(UserReviewRatingData, "userReviewRating");
      addRatings(titleData, UserReviewRatingData);
  });

};

  const loadDataStore = (data, source) => {

    if (source === "category") {
      // console.log(componentName, "loadDataStore data", data);
      dispatch(loadArrayCategories(data));
      // localStorage.setItem("arrayCategories", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalCategories", new Date().toISOString());
      loadURLs(data, source);
    } else if (source === "media") {
      // console.log(componentName, "loadDataStore data", data);
      dispatch(loadArrayMedia(data));
      // localStorage.setItem("arrayMedia", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalMedia", new Date().toISOString());
      loadURLs(data, source);
    } else if (source === "title") {
      // console.log(componentName, "loadDataStore data", data);
      // dispatch(loadArrayTitles(data));
      getUserReviewsRatings(data);
      // localStorage.setItem("arrayTitles", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalTitles", new Date().toISOString());
      loadURLs(data, source);
    } else if (source === "edition") {
      // console.log(componentName, "loadDataStore data", data);
      dispatch(loadArrayEditions(data));
      // localStorage.setItem("arrayEditions", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalEditions", new Date().toISOString());
    };

  };

  const loadURLs = (data, source) => {

    let arrayURLs = [];
  
    for (let i = 0; i < data.length; i++) {

      if (source === "category") {
        // console.log(componentName, "loadURLs data[i].category", data[i].category);
        arrayURLs.push({linkName: encodeURL(data[i].category), linkType: source, linkID: data[i].categoryID, linkTypeNameID: data[i].categoryID, linkTypeName: data[i].category});
      } else if (source === "media") {
        // console.log(componentName, "loadURLs data[i].media", data[i].media);
        arrayURLs.push({linkName: encodeURL(data[i].media), linkType: source, linkID: data[i].mediaID, linkTypeNameID: data[i].mediaID, linkTypeName: data[i].media});
      } else if (source === "title") {
        // console.log(componentName, "loadURLs data[i].titleURL", data[i].titleURL);
        arrayURLs.push({linkName: data[i].titleURL, linkType: source, linkID: data[i].titleID, linkTypeNameID: data[i].categoryID, linkTypeName: data[i].category.category});
      };
  
    };
    dispatch(loadArrayURLs(arrayURLs));
  
  };

  const getCategories = () => {
    // console.log(componentName, "getCategories");
    // console.log(componentName, "getCategories baseURL", baseURL);

    setCategoryMessage("");
    setErrCategoryMessage("");

    let url = baseURL + "category/list";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getCategories response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          dispatch(setCategoriesDataOffline(true));
          return {resultsFound: false, message: "Offline Categories data fetch used."};
        } else {
          dispatch(setCategoriesDataOffline(false));
          return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getCategories data", data);
        // setCategoryMessage(data.message);

        if (data.resultsFound === true) {
          loadDataStore(data.categories, "category");
        } else {
          console.log(componentName, "getCategories resultsFound error", data.message);
          // setErrCategoryMessage(data.message);
          dispatch(setCategoriesDataOffline(true));
          fetchLocalDataCategories();
        };

    })
    .catch(error => {
        console.log(componentName, "getCategories error", error);
        // console.log(componentName, "getCategories error.name", error.name);
        // console.log(componentName, "getCategories error.message", error.message);
        // setErrCategoryMessage(error.name + ": " + error.message);
        dispatch(setCategoriesDataOffline(true));
        fetchLocalDataCategories();
    });

  };

  const getMedia = () => {
    // console.log(componentName, "getMedia");
    // console.log(componentName, "getMedia baseURL", baseURL);

    setMediaMessage("");
    setErrMediaMessage("");

    let url = baseURL + "media/list";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getMedia response", response);
        if (!response.ok) {
            // throw Error(response.status + " " + response.statusText + " " + response.url);
            // load offline data
            dispatch(setMediaDataOffline(true));
            // return {resultsFound: true, message: "Offline Media data used.", media: MediaData};
            return {resultsFound: false, message: "Offline Media data fetch used."};
        } else {
            dispatch(setMediaDataOffline(false));
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getMedia data", data);
        // setMediaMessage(data.message);

        if (data.resultsFound === true) {
            loadDataStore(data.media, "media");
        } else {
            console.log(componentName, "getMedia resultsFound error", data.message);
            // setErrMediaMessage(data.message);
            dispatch(setMediaDataOffline(true));
            fetchLocalDataMedia();
        };

    })
    .catch(error => {
        console.log(componentName, "getMedia error", error);
        // console.log(componentName, "getMedia error.name", error.name);
        // console.log(componentName, "getMedia error.message", error.message);
        // setErrMediaMessage(error.name + ": " + error.message);
        dispatch(setMediaDataOffline(true));
        fetchLocalDataMedia();
    });

  };

  const getTitles = () => {
    // console.log(componentName, "getTitle");
    // console.log(componentName, "getTitle baseURL", baseURL);

    setTitleMessage("");
    setErrTitleMessage("");

    let url = baseURL + "title/list";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getTitle response", response);
        if (!response.ok) {
            // throw Error(response.status + " " + response.statusText + " " + response.url);
            // load offline data
            dispatch(setTitlesDataOffline(true));
            // return {resultsFound: true, message: "Offline Titles data used.", titles: TitleData};
            return {resultsFound: false, message: "Offline Titles data fetch used."};
        } else {
            dispatch(setTitlesDataOffline(false));
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getTitle data", data);
        // setTitleMessage(data.message);

        if (data.resultsFound === true) {
            loadDataStore(data.titles, "title");
        } else {
            console.log(componentName, "getTitles resultsFound error", data.message);
            // setErrTitleMessage(data.message);
            dispatch(setTitlesDataOffline(true));
            fetchLocalDataTitles();
        };

    })
    .catch(error => {
        console.log(componentName, "getTitle error", error);
        // console.log(componentName, "getTitle error.name", error.name);
        // console.log(componentName, "getTitle error.message", error.message);
        // setErrTitleMessage(error.name + ": " + error.message);
        dispatch(setTitlesDataOffline(true));
        fetchLocalDataTitles();
    });

  };

  const getEditions = () => {
    // console.log(componentName, "getEdition");
    // console.log(componentName, "getEdition baseURL", baseURL);

    setEditionMessage("");
    setErrEditionMessage("");

    let url = baseURL + "edition/list";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getEdition response", response);
        if (!response.ok) {
            // throw Error(response.status + " " + response.statusText + " " + response.url);
            // load offline data
            dispatch(setEditionsDataOffline(true));
            // return {resultsFound: true, message: "Offline Editions data used.", editions: EditionData};
            return {resultsFound: false, message: "Offline Editions data fetch used."};
        } else {
            dispatch(setEditionsDataOffline(false));
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getEdition data", data);
        // setEditionMessage(data.message);

        if (data.resultsFound === true) {
            loadDataStore(data.editions, "edition");
        } else {
            console.log(componentName, "getEditions resultsFound error", data.message);
            // setErrEditionMessage(data.message);
            dispatch(setEditionsDataOffline(true));
            fetchLocalDataEditions();
        };

    })
    .catch(error => {
        console.log(componentName, "getEditions error", error);
        // console.log(componentName, "getEdition error.name", error.name);
        // console.log(componentName, "getEdition error.message", error.message);
        // setErrEditionMessage(error.name + ": " + error.message);
        dispatch(setEditionsDataOffline(true));
        fetchLocalDataEditions();
    });

  };

  const fetchLocalDataCategories = () => {
    // console.log(componentName, "fetchLocalDataCategories");

    let url = "./bibliographyData/Categories.json";

    fetch(url)
    .then(response => {
        // console.log(componentName, "fetchLocalDataCategories response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          dispatch(setCategoriesDataOffline(true));
          // return {resultsFound: true, message: "Offline Categories data used.", categories: CategoryData};
          return {resultsFound: false, message: "Offline Categories data fetch failed."};
        } else {
          dispatch(setCategoriesDataOffline(true));
          return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "fetchLocalDataCategories data", data);

        if (data.resultsFound === true) {
          loadDataStore(data.categories, "category");
        } else {
          console.log(componentName, "fetchLocalDataCategories resultsFound error", data.message);
          // setErrCategoryMessage(data.message);
          dispatch(setCategoriesDataOffline(true));
          loadDataStore(CategoryData, "category");
        };

    })
    .catch(error => {
        console.log(componentName, "fetchLocalDataCategories error", error);
        // console.log(componentName, "fetchLocalDataCategories error.name", error.name);
        // console.log(componentName, "fetchLocalDataCategories error.message", error.message);
        // setErrCategoryMessage(error.name + ": " + error.message);
        // This doesn't actually run as far as I can tell
        dispatch(setCategoriesDataOffline(true));
        loadDataStore(CategoryData, "category");
    });

  };

  const fetchLocalDataMedia = () => {
    // console.log(componentName, "fetchLocalDataMedia");

    let url = "./bibliographyData/Media.json";

    fetch(url)
    .then(response => {
        // console.log(componentName, "fetchLocalDataMedia response", response);
        if (!response.ok) {
            // throw Error(response.status + " " + response.statusText + " " + response.url);
            // load offline data
            dispatch(setMediaDataOffline(true));
            // return {resultsFound: true, message: "Offline Media data used.", media: MediaData};
            return {resultsFound: false, message: "Offline Media data fetch failed."};
        } else {
            dispatch(setMediaDataOffline(true));
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "fetchLocalDataMedia data", data);

        if (data.resultsFound === true) {
            loadDataStore(data.media, "media");
        } else {
            console.log(componentName, "fetchLocalDataMedia resultsFound error", data.message);
            // setErrMediaMessage(data.message);
            dispatch(setMediaDataOffline(true));
            loadDataStore(MediaData, "media");
        };

    })
    .catch(error => {
        console.log(componentName, "fetchLocalDataMedia error", error);
        // console.log(componentName, "fetchLocalDataMedia error.name", error.name);
        // console.log(componentName, "fetchLocalDataMedia error.message", error.message);
        // setErrMediaMessage(error.name + ": " + error.message);
        // This doesn't actually run as far as I can tell
        dispatch(setMediaDataOffline(true));
        loadDataStore(MediaData, "media");
    });

  };

  const fetchLocalDataTitles = () => {
    // console.log(componentName, "fetchLocalDataTitles");

    let url = "./bibliographyData/Titles.json";

    fetch(url)
    .then(response => {
        // console.log(componentName, "fetchLocalDataTitles response", response);
        if (!response.ok) {
            // throw Error(response.status + " " + response.statusText + " " + response.url);
            // load offline data
            dispatch(setTitlesDataOffline(true));
            // return {resultsFound: true, message: "Offline Titles data used.", titles: TitleData};
            return {resultsFound: false, message: "Offline Titles data fetch failed."};
        } else {
            dispatch(setTitlesDataOffline(true));
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "fetchLocalDataTitles data", data);

        if (data.resultsFound === true) {
            loadDataStore(data.titles, "title");
        } else {
            console.log(componentName, "fetchLocalDataTitles resultsFound error", data.message);
            // setErrTitleMessage(data.message);
            dispatch(setTitlesDataOffline(true));
            loadDataStore(TitleData, "title");
        };

    })
    .catch(error => {
        console.log(componentName, "fetchLocalDataTitles error", error);
        // console.log(componentName, "fetchLocalDataTitles error.name", error.name);
        // console.log(componentName, "fetchLocalDataTitles error.message", error.message);
        // setErrTitleMessage(error.name + ": " + error.message);
        // This doesn't actually run as far as I can tell
        dispatch(setTitlesDataOffline(true));
        loadDataStore(TitleData, "title");
    });

  };

  const fetchLocalDataEditions = () => {
    // console.log(componentName, "fetchLocalDataEditions");

    let url = "./bibliographyData/Editions.json";

    fetch(url)
    .then(response => {
        // console.log(componentName, "fetchLocalDataEditions response", response);
        if (!response.ok) {
            // throw Error(response.status + " " + response.statusText + " " + response.url);
            // load offline data
            dispatch(setEditionsDataOffline(true));
            // return {resultsFound: true, message: "Offline Editions data used.", editions: EditionData};
            return {resultsFound: false, message: "Offline Editions data fetch failed."};
        } else {
            dispatch(setEditionsDataOffline(true));
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "fetchLocalDataEditions data", data);

        if (data.resultsFound === true) {
            loadDataStore(data.editions, "edition");
        } else {
            console.log(componentName, "fetchLocalDataEditions resultsFound error", data.message);
            // setErrEditionMessage(data.message);
            dispatch(setEditionsDataOffline(true));
            loadDataStore(EditionData, "edition");
        };

    })
    .catch(error => {
        console.log(componentName, "fetchLocalDataEditions error", error);
        // console.log(componentName, "fetchLocalDataEditions error.name", error.name);
        // console.log(componentName, "fetchLocalDataEditions error.message", error.message);
        // setErrEditionMessage(error.name + ": " + error.message);
        // This doesn't actually run as far as I can tell
        dispatch(setEditionsDataOffline(true));
        loadDataStore(EditionData, "edition");
    });

  };

  useEffect(() => {
    // console.log(componentName, "useEffect");

    // Experiment in adding bibliographical data to local storage that doesn't work
    // let categoriesDataLocalStorage = false;
    // let mediaDataLocalStorage = false;
    // let titlesDataLocalStorage = false;
    // let editionsDataLocalStorage = false;

    // let currentDateTime = new Date().setTime(new Date().getTime());
    // // console.log(componentName, "useEffect currentDateTime", currentDateTime);
    // // console.log(componentName, "useEffect new Date(currentDateTime).toISOString()", new Date(currentDateTime).toISOString());

    // if (!categoriesLoaded && localStorage.getItem("lastDatabaseRetrievalCategories") !== undefined && localStorage.getItem("lastDatabaseRetrievalCategories") !== null) {

    //   // console.log(componentName, "useEffect localStorage.getItem(\"lastDatabaseRetrievalCategories\")", localStorage.getItem("lastDatabaseRetrievalCategories"));

    //   // let localStoragelastDatabaseRetrievalCategories = new Date(localStorage.getItem("lastDatabaseRetrievalCategories"));
    //   // console.log(componentName, "useEffect localStoragelastDatabaseRetrievalCategories", localStoragelastDatabaseRetrievalCategories);
    //   // console.log(componentName, "useEffect localStoragelastDatabaseRetrievalCategories.setTime(localStoragelastDatabaseRetrievalCategories.getTime())", localStoragelastDatabaseRetrievalCategories.setTime(localStoragelastDatabaseRetrievalCategories.getTime()));
    //   // console.log(componentName, "useEffect typeof localStoragelastDatabaseRetrievalCategories", typeof localStoragelastDatabaseRetrievalCategories);

    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalCategories")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalCategories")).getTime() - (8*60*60*1000));
    //   // console.log(componentName, "useEffect checkDateTime", checkDateTime);
    //   // console.log(componentName, "useEffect new Date(checkDateTime).toISOString()", new Date(checkDateTime).toISOString());

    //   if (currentDateTime > checkDateTime) {
    //     if (localStorage.getItem("arrayCategories") !== undefined && localStorage.getItem("arrayCategories") !== null) {
    //       // console.log(componentName, "useEffect localStorage.getItem(\"arrayCategories\")", localStorage.getItem("arrayCategories"));

    //       const localStorageArrayCategories = localStorage.getItem("arrayCategories");
    //       loadDataStore(JSON.parse(localStorageArrayCategories), "category");

    //       categoriesDataLocalStorage = true;
    //     };
    //   };

    // };

    // if (!mediaLoaded && localStorage.getItem("lastDatabaseRetrievalMedia") !== undefined && localStorage.getItem("lastDatabaseRetrievalMedia") !== null) {

    //   // console.log(componentName, "useEffect localStorage.getItem(\"lastDatabaseRetrievalMedia\")", localStorage.getItem("lastDatabaseRetrievalMedia"));

    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalMedia")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalMedia")).getTime() - (8*60*60*1000));
    //   // console.log(componentName, "useEffect checkDateTime", checkDateTime);
    //   // console.log(componentName, "useEffect new Date(checkDateTime).toISOString()", new Date(checkDateTime).toISOString());

    //   if (currentDateTime > checkDateTime) {
    //     if (localStorage.getItem("arrayMedia") !== undefined && localStorage.getItem("arrayMedia") !== null) {
    //       // console.log(componentName, "useEffect localStorage.getItem(\"arrayMedia\")", localStorage.getItem("arrayMedia"));

    //       const localStorageArrayMedia = localStorage.getItem("arrayMedia");
    //       loadDataStore(JSON.parse(localStorageArrayMedia), "media");
          
    //       mediaDataLocalStorage = true;
    //     };
    //   };

    // };

    // if (!titlesLoaded && localStorage.getItem("lastDatabaseRetrievalTitles") !== undefined && localStorage.getItem("lastDatabaseRetrievalTitles") !== null) {

    //   // console.log(componentName, "useEffect localStorage.getItem(\"lastDatabaseRetrievalTitles\")", localStorage.getItem("lastDatabaseRetrievalTitles"));

    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).getTime() - (8*60*60*1000));
    //   // console.log(componentName, "useEffect checkDateTime", checkDateTime);
    //   console.log(componentName, "useEffect new Date(checkDateTime).toISOString()", new Date(checkDateTime).toISOString());

    //   if (currentDateTime > checkDateTime) {
    //     if (localStorage.getItem("arrayTitles") !== undefined && localStorage.getItem("arrayTitles") !== null) {
    //       // console.log(componentName, "useEffect localStorage.getItem(\"arrayTitles\")", localStorage.getItem("arrayTitles"));

    //       const localStorageArrayTitles = localStorage.getItem("arrayTitles");
    //       loadDataStore(JSON.parse(localStorageArrayTitles), "title");
          
    //       titlesDataLocalStorage = true;
    //     };
    //   };

    // };

    // if (!editionsLoaded && localStorage.getItem("lastDatabaseRetrievalEditions") !== undefined && localStorage.getItem("lastDatabaseRetrievalEditions") !== null) {

    //   // console.log(componentName, "useEffect localStorage.getItem(\"lastDatabaseRetrievalEditions\")", localStorage.getItem("lastDatabaseRetrievalEditions"));

    //   let checkDateTime = new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).setTime(new Date(localStorage.getItem("lastDatabaseRetrievalTitles")).getTime() - (8*60*60*1000));
    //   // console.log(componentName, "useEffect checkDateTime", checkDateTime);
    //   console.log(componentName, "useEffect new Date(checkDateTime).toISOString()", new Date(checkDateTime).toISOString());

    //   if (currentDateTime > checkDateTime) {
    //   if (localStorage.getItem("arrayEditions") !== undefined && localStorage.getItem("arrayEditions") !== null) {
    //       // console.log(componentName, "useEffect localStorage.getItem(\"arrayEditions\")", localStorage.getItem("arrayEditions"));

    //       const localStorageArrayEditions = localStorage.getItem("arrayEditions");
    //       loadDataStore(JSON.parse(localStorageArrayEditions), "edition");
          
    //       editionsDataLocalStorage = true;
    //     };
    //   };

    // };

    // Only load the bibliography data once per session unless the data is changed
    if (appOffline) {

      if(!categoriesLoaded /*&& !categoriesDataLocalStorage*/) {
        dispatch(setCategoriesDataOffline(true));
        fetchLocalDataCategories();
      };

      if(!mediaLoaded /*&& !mediaDataLocalStorage*/) {
        dispatch(setMediaDataOffline(true));
        fetchLocalDataMedia();
      };

      if(!titlesLoaded /*&& !titlesDataLocalStorage*/) {
        dispatch(setTitlesDataOffline(true));
        fetchLocalDataTitles();
      };

      if(!editionsLoaded /*&& !editionsDataLocalStorage*/) {
        dispatch(setEditionsDataOffline(true));
        fetchLocalDataEditions();
      };

    } else {

      if(!categoriesLoaded /*&& !categoriesDataLocalStorage*/) {
        getCategories();
      };

      if(!mediaLoaded /*&& !mediaDataLocalStorage*/) {
        getMedia();
      };

      if(!titlesLoaded /*&& !titlesDataLocalStorage*/) {
        getTitles();
      };

      if(!editionsLoaded /*&& !editionsDataLocalStorage*/) {
        getEditions();
      };

    };

  }, []);

  return (
    <Row className="text-center">
        {categoryMessage !== undefined && categoryMessage !== null && categoryMessage !== "" ? <Alert color="info">{categoryMessage}</Alert> : null}
        {errCategoryMessage !== undefined && errCategoryMessage !== null && errCategoryMessage !== "" ? <Alert color="danger">{errCategoryMessage}</Alert> : null}
        {mediaMessage !== undefined && mediaMessage !== null && mediaMessage !== "" ? <Alert color="info">{mediaMessage}</Alert> : null}
        {errMediaMessage !== undefined && errMediaMessage !== null && errMediaMessage !== "" ? <Alert color="danger">{errMediaMessage}</Alert> : null}
        {titleMessage !== undefined && titleMessage !== null && titleMessage !== "" ? <Alert color="info">{titleMessage}</Alert> : null}
        {errTitleMessage !== undefined && errTitleMessage !== null && errTitleMessage !== "" ? <Alert color="danger">{errTitleMessage}</Alert> : null}
        {editionMessage !== undefined && editionMessage !== null && editionMessage !== "" ? <Alert color="info">{editionMessage}</Alert> : null}
        {errEditionMessage !== undefined && errEditionMessage !== null && errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
        {overallTitleRatingMessage !== undefined && overallTitleRatingMessage !== null && overallTitleRatingMessage !== "" ? <Alert color="info">{overallTitleRatingMessage}</Alert> : null}
        {errOverallTitleRatingMessage !== undefined && errOverallTitleRatingMessage !== null && errOverallTitleRatingMessage !== "" ? <Alert color="danger">{errOverallTitleRatingMessage}</Alert> : null}
    </Row>
  );
}

export default LoadBibliographyData;
