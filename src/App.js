import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./App.css";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {HouseFill} from "react-bootstrap-icons";
import {Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavbarText, Alert} from "reactstrap";
import AppSettings from "./app/environment";
import {encodeURL} from "./app/sharedFunctions";
import {setHostname, setProfileType, setAPI_URL, setBaseURL, setTagManagerArgsgtmId, setSiteName, setAppName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setAppOffline, setElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setPhysicalOnlyMessage} from "./app/appSlice";
import {loadArrayURLs, setPageURL, setLinkItem} from "./app/urlsSlice";
// import categoriesLoadData from "./bibliographyData/categoriesLoadData";
// import categoriesOfflineData from "./bibliographyData/categoriesOfflineData";
// import CategoryData from "./bibliographyData/Categories.json";
import {loadArrayCategories, setCategoriesDataOffline} from "./bibliographyData/categoriesSlice";
// import editionsLoadData from "./bibliographyData/editionsLoadData";
// import editionsOfflineData from "./bibliographyData/editionsOfflineData";
// import EditionData from "./bibliographyData/Editions.json";
import {loadArrayEditions, setEditionsDataOffline} from "./bibliographyData/editionsSlice";
// import mediaLoadData from "./bibliographyData/mediaLoadData";
// import mediaOfflineData from "./bibliographyData/mediaOfflineData";
// import MediaData from "./bibliographyData/Media.json";
import {loadArrayMedia, setMediaDataOffline} from "./bibliographyData/mediaSlice";
// import titlesLoadData from "./bibliographyData/titlesLoadData";
// import titlesOfflineData from "./bibliographyData/titlesOfflineData";
// import TitleData from "./bibliographyData/Titles.json";
import {loadArrayTitles, setTitlesDataOffline} from "./bibliographyData/titlesSlice";

import Home from "./content/Home";
import New from "./content/New";
import About from "./content/About";
import Homeopape from "./content/Homeopape";
import CategoryList from "./components/categories/CategoryList";
import MediaList from "./components/media/MediaList";
import TitleList from "./components/titles/TitleList";
import EditionList from "./components/editions/EditionList";
import Category from "./components/categories/Category";
import Media from "./components/media/Media";
import Titles from "./components/titles/Titles";
import Title from "./components/titles/Title";
import Editions from "./components/editions/Editions";

function App() {

  const componentName = "App.js";

  const dispatch = useDispatch();
  // const history = useHistory();

  let showNew = true;
  let showAbout = true;
  let showHomeopape = false;

  let showCategoryList = false;
  let showMediaList = false;
  let showTitleList = false;
  let showEditionList = false;

  let showAllCategories = false;
  let showAllMedia = false;
  // This route no longer works. 
  let showAllTitles = false;
  // This route no longer works. 
  let showAllEditions = false;

  // const showAllMenuItems = true;
  const showAllMenuItems = false;

  if (showAllMenuItems) {
    showNew = true;
    showAbout = true;
    showHomeopape = true;

    showCategoryList = true;
    showMediaList = true;
    showTitleList = true;
    showEditionList = true;

    showAllCategories = true;
    showAllMedia = true;
    // This route no longer works. 
    showAllTitles = true;
    // This route no longer works. 
    showAllEditions = true;
  };

  const pageURL = useSelector(state => state.urls.pageURL);
  const linkItem = useSelector(state => state.urls.linkItem);

  // Load settings from environment into Redux
  // const hostname = AppSettings.hostname;
  dispatch(setHostname(AppSettings.hostname));

  let profileType = AppSettings.profileType;
  dispatch(setProfileType(AppSettings.profileType));

  // let API_URL = AppSettings.API_URL;
  dispatch(setAPI_URL(AppSettings.API_URL));

  let baseURL = AppSettings.baseURL;
  dispatch(setBaseURL(AppSettings.baseURL));

  // let tagManagerArgsgtmId = AppSettings.tagManagerArgs.gtmId;
  dispatch(setTagManagerArgsgtmId(AppSettings.tagManagerArgs.gtmId));

  // console.log(componentName, "AppSettings.siteName", AppSettings.siteName);
  // let siteName = AppSettings.siteName;
  dispatch(setSiteName(AppSettings.siteName));

  // let appName = AppSettings.appName;
  dispatch(setAppName(AppSettings.appName));

  // let metaDescription = AppSettings.metaDescription;
  dispatch(setMetaDescription(AppSettings.metaDescription));

  let defaultPageComponent = AppSettings.defaultPageComponent;
  dispatch(setDefaultPageComponent(AppSettings.defaultPageComponent));

  let routerBaseName = AppSettings.routerBaseName;
  dispatch(setRouterBaseName(AppSettings.routerBaseName));

  let appOffline = AppSettings.appOffline;
  dispatch(setAppOffline(AppSettings.appOffline));

  // let electronicOnly = AppSettings.electronicOnly;
  dispatch(setElectronicOnly(AppSettings.electronicOnly));

  // let electronicOnlyMessage = AppSettings.electronicOnlyMessage;
  dispatch(setElectronicOnlyMessage(AppSettings.electronicOnlyMessage));

  // let physicalOnly = AppSettings.physicalOnly;
  dispatch(setPhysicalOnly(AppSettings.physicalOnly));

  // let physicalOnlyMessage = AppSettings.physicalOnlyMessage;
  dispatch(setPhysicalOnlyMessage(AppSettings.physicalOnlyMessage));

  // Load settings from Redux slices
  const categoriesDataOffline = useSelector(state => state.categories.categoriesDataOffline);
  const mediaDataOffline = useSelector(state => state.media.mediaDataOffline);
  const titlesDataOffline = useSelector(state => state.titles.titlesDataOffline);
  const editionsDataOffline = useSelector(state => state.editions.editionsDataOffline);

  const categoriesLoaded = useSelector(state => state.categories.categoriesLoaded);
  const mediaLoaded = useSelector(state => state.media.mediaLoaded);
  const titlesLoaded = useSelector(state => state.titles.titlesLoaded);
  const editionsLoaded = useSelector(state => state.editions.editionsLoaded);

  const urlLookup = useSelector(state => state.urls.arrayURLs);

  const [categoryMessage, setCategoryMessage] = useState("");
  const [errCategoryMessage, setErrCategoryMessage] = useState("");
  // const [categoryResultsFound, setCategoryResultsFound] = useState(null);
  // const [categoryList, setCategoryList] = useState([]);
  const [mediaMessage, setMediaMessage] = useState("");
  const [errMediaMessage, setErrMediaMessage] = useState("");
  // const [mediaResultsFound, setMediaResultsFound] = useState(null);
  // const [mediaList, setMediaList] = useState([]);
  const [titleMessage, setTitleMessage] = useState("");
  const [errTitleMessage, setErrTitleMessage] = useState("");
  // const [titleResultsFound, setTitleResultsFound] = useState(null);
  // const [titleList, setTitleList] = useState([]);
  const [editionMessage, setEditionMessage] = useState("");
  const [errEditionMessage, setErrEditionMessage] = useState("");
  // const [editionResultsFound, setEditionResultsFound] = useState(null);
  // const [editionList, setEditionList] = useState([]);

  const loadAppSettings = () => {
    // console.log(componentName, "fetchLocalDataAppSettings");
    // console.log(componentName, "fetchLocalDataAppSettings profileType", profileType);

    let url = "./appSettings/" + profileType + ".json";

    fetch(url)
    .then(response => {
        // console.log(componentName, "fetchLocalDataAppSettings response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          // return {resultsFound: true, message: "Offline Categories data used.", categories: CategoryData};
        } else {
          return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "fetchLocalDataAppSettings data", data);

        if (data.resultsFound === true) {

          // Duplicated from the code above
          // Won't overwrite the settings from above in AppSettings because the component re-renders after the fetch and restores the settings to the ones in AppSettings

          // console.log(componentName, "fetchLocalDataAppSettings data.profileType", data.profileType);
          if (data.profileType !== undefined && data.profileType !== "") {
            profileType = data.profileType;
            dispatch(setProfileType(data.profileType));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.API_URL", data.API_URL);
          if (data.API_URL !== undefined && data.API_URL !== "") {
            // API_URL = data.API_URL;
            dispatch(setAPI_URL(data.API_URL));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.baseURL", data.baseURL);
          if (data.baseURL !== undefined && data.baseURL !== "") {
            baseURL = data.baseURL;
            dispatch(setBaseURL(data.baseURL));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.tagManagerArgs", data.tagManagerArgs);
          // console.log(componentName, "fetchLocalDataAppSettings data.tagManagerArgs.gtmId", data.tagManagerArgs.gtmId);
          if (data.tagManagerArgs !== undefined && data.tagManagerArgs.gtmId !== undefined && data.tagManagerArgs.gtmId !== "") {
            // tagManagerArgsgtmId = data.tagManagerArgs.gtmId;
            dispatch(setTagManagerArgsgtmId(data.tagManagerArgs.gtmId));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.siteName", data.siteName);
          if (data.siteName !== undefined && data.siteName !== "") {
            // siteName = data.siteName;
            dispatch(setSiteName(data.siteName));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.appName", data.appName);
          if (data.appName !== undefined && data.appName !== "") {
            // appName = data.appName;
            dispatch(setAppName(data.appName));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.metaDescription", data.metaDescription);
          if (data.metaDescription !== undefined && data.metaDescription !== "") {
            // metaDescription = data.metaDescription;
            dispatch(setMetaDescription(data.metaDescription));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.defaultPageComponent", data.defaultPageComponent);
          if (data.defaultPageComponent !== undefined && data.defaultPageComponent !== "") {
            defaultPageComponent = data.defaultPageComponent;
            dispatch(setDefaultPageComponent(data.defaultPageComponent));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.routerBaseName", data.routerBaseName);
          if (data.routerBaseName !== undefined && data.routerBaseName !== "") {
            routerBaseName = data.routerBaseName;
            dispatch(setRouterBaseName(data.routerBaseName));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.appOffline", data.appOffline);
          if (data.appOffline !== undefined) {
            appOffline = data.appOffline;
            dispatch(setAppOffline(data.appOffline));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.electronicOnly", data.electronicOnly);
          if (data.electronicOnly !== undefined) {
            // electronicOnly = data.electronicOnly;
            dispatch(setElectronicOnly(data.electronicOnly));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.electronicOnlyMessage", data.electronicOnlyMessage);
          if (data.electronicOnlyMessage !== undefined && data.electronicOnlyMessage !== "") {
            // electronicOnlyMessage = data.electronicOnlyMessage;
            dispatch(setElectronicOnlyMessage(data.electronicOnlyMessage));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.physicalOnly", data.physicalOnly);
          if (data.physicalOnly !== undefined) {
            // physicalOnly = data.physicalOnly;
            dispatch(setPhysicalOnly(data.physicalOnly));
          };

          // console.log(componentName, "fetchLocalDataAppSettings data.physicalOnlyMessage", data.physicalOnlyMessage);
          if (data.physicalOnlyMessage !== undefined && data.physicalOnlyMessage !== "") {
            // physicalOnlyMessage = data.physicalOnlyMessage;
            dispatch(setPhysicalOnlyMessage(data.physicalOnlyMessage));
          };

        } else {
          console.log(componentName, "fetchLocalDataAppSettings resultsFound error", data.message);
        };

    })
    .catch(error => {
        console.log(componentName, "fetchLocalDataAppSettings error", error);
        // console.log(componentName, "fetchLocalDataAppSettings error.name", error.name);
        // console.log(componentName, "fetchLocalDataAppSettings error.message", error.message);
    });

};

  const loadDataStore = (data, source) => {

    if (source === "category") {
      // console.log(componentName, "loadDataStore data", data);
      dispatch(loadArrayCategories(data));
      loadURLs(data, source);
    } else if (source === "media") {
      // console.log(componentName, "loadDataStore data", data);
      dispatch(loadArrayMedia(data));
      loadURLs(data, source);
    } else if (source === "title") {
      // console.log(componentName, "loadDataStore data", data);
      dispatch(loadArrayTitles(data));
      loadURLs(data, source);
    } else if (source === "edition") {
      // console.log(componentName, "loadDataStore data", data);
      dispatch(loadArrayEditions(data));
    };

  };

  const loadURLs = (data, source) => {

    let arrayURLs = [];
  
    for (let i = 0; i < data.length; i++) {

      if (source === "category") {
        // console.log(componentName, "loadURLs data[i].category", data[i].category);
        arrayURLs.push({linkName: encodeURL(data[i].category), linkType: source, linkID: data[i].categoryID});
      } else if (source === "media") {
        // console.log(componentName, "loadURLs data[i].media", data[i].media);
        arrayURLs.push({linkName: encodeURL(data[i].media), linkType: source, linkID: data[i].mediaID});
      } else if (source === "title") {
        // console.log(componentName, "loadURLs data[i].titleURL", data[i].titleURL);
        arrayURLs.push({linkName: data[i].titleURL, linkType: source, linkID: data[i].titleID});
      };
  
    };
    dispatch(loadArrayURLs(arrayURLs));
  
  };

  const getCategories = () => {
    // console.log(componentName, "getCategories");
    // console.log(componentName, "getCategories baseURL", baseURL);

    setCategoryMessage("");
    setErrCategoryMessage("");
    // setCategoryResultsFound(null);
    // setCategoryList([]);

    let url = baseURL + "category/list";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getCategories response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          dispatch(setCategoriesDataOffline(true));
          // return {resultsFound: true, message: "Offline Categories data used.", categories: CategoryData};
          return {resultsFound: false, message: "Offline Categories data used."};
        } else {
          dispatch(setCategoriesDataOffline(false));
          return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getCategories data", data);

        // setCategoryResultsFound(data.resultsFound);
        // setCategoryMessage(data.message);

        if (data.resultsFound === true) {
          // setCategoryList(data.categories);
          // dispatch(loadArrayCategories(data.categories));
          loadDataStore(data.categories, "category");

          // loadURLs(data.categories, "category");
          // let arrayURLs = [];
          // for (let i = 0; i < data.categories.length; i++) {
          //   // console.log(componentName, "getCategories data.categories[i].category", data.categories[i].category);
          //   arrayURLs.push({linkName: data.categories[i].category, linkType: "category", linkID: data.categories[i].categoryID});
          // };
          // dispatch(loadArrayURLs(arrayURLs));

        } else {
          console.log(componentName, "getCategories resultsFound error", data.message);
          // setErrCategoryMessage(data.message);
          dispatch(setCategoriesDataOffline(true));
          // dispatch(loadArrayCategories(CategoryData));
          // loadDataStore(CategoryData, "category");
          fetchLocalDataCategories();
        };

    })
    .catch(error => {
        console.log(componentName, "getCategories error", error);
        // console.log(componentName, "getCategories error.name", error.name);
        // console.log(componentName, "getCategories error.message", error.message);
        // setErrCategoryMessage(error.name + ": " + error.message);
        dispatch(setCategoriesDataOffline(true));
        // dispatch(loadArrayCategories(CategoryData));
        // loadDataStore(CategoryData, "category");
        fetchLocalDataCategories();
    });

  };

  const getMedia = () => {
    // console.log(componentName, "getMedia");
    // console.log(componentName, "getMedia baseURL", baseURL);

    setMediaMessage("");
    setErrMediaMessage("");
    // setMediaResultsFound(null);
    // setMediaList([]);

    // console.log(componentName, "getMedia this.props.mediaID", this.props.mediaID);
    // this.props.setMediaID(null);
    // console.log(componentName, "getMedia this.props.titleID", this.props.titleID);
    // this.props.setTitleID(null);

    let url = baseURL + "media/list";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getMedia response", response);
        if (!response.ok) {
            // throw Error(response.status + " " + response.statusText + " " + response.url);
            // load offline data
            dispatch(setMediaDataOffline(true));
            // return {resultsFound: true, message: "Offline Media data used.", media: MediaData};
            return {resultsFound: false, message: "Offline Media data used."};
        } else {
            dispatch(setMediaDataOffline(false));
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getMedia data", data);

        // setMediaResultsFound(data.resultsFound);
        // setMediaMessage(data.message);

        if (data.resultsFound === true) {
            // setMediaList(data.media);
            // dispatch(loadArrayMedia(data.media));
            loadDataStore(data.media, "media");

            // loadURLs(data.media, "media");
            // let arrayURLs = [];
            // for (let i = 0; i < data.media.length; i++) {
            //   // console.log(componentName, "getMedia data.media[i].media", data.media[i].media);
            //   arrayURLs.push({linkName: data.media[i].media, linkType: "media", linkID: data.media[i].mediaID});
            // };
            // dispatch(loadArrayURLs(arrayURLs));

        } else {
            console.log(componentName, "getMedia resultsFound error", data.message);
            // setErrMediaMessage(data.message);
            dispatch(setMediaDataOffline(true));
            // dispatch(loadArrayMedia(MediaData));
            // loadDataStore(MediaData, "media");
            fetchLocalDataMedia();
        };

    })
    .catch(error => {
        console.log(componentName, "getMedia error", error);
        // console.log(componentName, "getMedia error.name", error.name);
        // console.log(componentName, "getMedia error.message", error.message);
        // setErrMediaMessage(error.name + ": " + error.message);
        dispatch(setMediaDataOffline(true));
        // dispatch(loadArrayMedia(MediaData));
        // loadDataStore(MediaData, "media");
        fetchLocalDataMedia();
    });

  };

  const getTitles = () => {
    // console.log(componentName, "getTitle");
    // console.log(componentName, "getTitle baseURL", baseURL);

    setTitleMessage("");
    setErrTitleMessage("");
    // setTitleResultsFound(null);
    // setTitleList([]);

    // console.log(componentName, "getTitle this.props.titleID", this.props.titleID);
    // this.props.setTitleID(null);
    // console.log(componentName, "getTitle this.props.titleID", this.props.titleID);
    // this.props.setTitleID(null);

    let url = baseURL + "title/list";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getTitle response", response);
        if (!response.ok) {
            // throw Error(response.status + " " + response.statusText + " " + response.url);
            // load offline data
            dispatch(setTitlesDataOffline(true));
            // return {resultsFound: true, message: "Offline Titles data used.", titles: TitleData};
            return {resultsFound: false, message: "Offline Titles data used."};
        } else {
            dispatch(setTitlesDataOffline(false));
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getTitle data", data);

        // setTitleResultsFound(data.resultsFound);
        // setTitleMessage(data.message);

        if (data.resultsFound === true) {
            // setTitleList(data.titles);
            // dispatch(loadArrayTitles(data.titles));
            loadDataStore(data.titles, "title");

            // loadURLs(data.titles, "title");
            // let arrayURLs = [];
            // for (let i = 0; i < data.titles.length; i++) {
            //   // console.log(componentName, "getTitles data.titles[i].titleURL", data.titles[i].titleURL);
            //   arrayURLs.push({linkName: data.titles[i].titleURL, linkType: "title", linkID: data.titles[i].titleID});
            // };
            // dispatch(loadArrayURLs(arrayURLs));

        } else {
            console.log(componentName, "getTitles resultsFound error", data.message);
            // setErrTitleMessage(data.message);
            dispatch(setTitlesDataOffline(true));
            // dispatch(loadArrayTitles(TitleData));
            // loadDataStore(TitleData, "title");
            fetchLocalDataTitles();
        };

    })
    .catch(error => {
        console.log(componentName, "getTitle error", error);
        // console.log(componentName, "getTitle error.name", error.name);
        // console.log(componentName, "getTitle error.message", error.message);
        // setErrTitleMessage(error.name + ": " + error.message);
        dispatch(setTitlesDataOffline(true));
        // dispatch(loadArrayTitles(TitleData));
        // loadDataStore(TitleData, "title");
        fetchLocalDataTitles();
    });

  };

  const getEditions = () => {
    // console.log(componentName, "getEdition");
    // console.log(componentName, "getEdition baseURL", baseURL);

    setEditionMessage("");
    setErrEditionMessage("");
    // setEditionResultsFound(null);
    // setEditionList([]);

    // console.log(componentName, "getEdition this.props.editionID", this.props.editionID);
    // this.props.setEditionID(null);
    // console.log(componentName, "getEdition this.props.titleID", this.props.titleID);
    // this.props.setTitleID(null);

    let url = baseURL + "edition/list";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getEdition response", response);
        if (!response.ok) {
            // throw Error(response.status + " " + response.statusText + " " + response.url);
            // load offline data
            dispatch(setEditionsDataOffline(true));
            // return {resultsFound: true, message: "Offline Editions data used.", editions: EditionData};
            return {resultsFound: false, message: "Offline Editions data used."};
        } else {
            dispatch(setEditionsDataOffline(false));
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getEdition data", data);

        // setEditionResultsFound(data.resultsFound);
        // setEditionMessage(data.message);

        if (data.resultsFound === true) {
            // setEditionList(data.editions);
            // dispatch(loadArrayEditions(data.editions));
            loadDataStore(data.editions, "edition");
        } else {
            console.log(componentName, "getEditions resultsFound error", data.message);
            // setErrEditionMessage(data.message);
            dispatch(setEditionsDataOffline(true));
            // dispatch(loadArrayEditions(EditionData));
            // loadDataStore(EditionData, "edition");
            fetchLocalDataEditions();
        };

    })
    .catch(error => {
        console.log(componentName, "getEditions error", error);
        // console.log(componentName, "getEdition error.name", error.name);
        // console.log(componentName, "getEdition error.message", error.message);
        // setErrEditionMessage(error.name + ": " + error.message);
        dispatch(setEditionsDataOffline(true));
        // dispatch(loadArrayEditions(EditionData));
        // loadDataStore(EditionData, "edition");
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
          // setCategoryList(data.categories);
          // dispatch(loadArrayCategories(data.categories));
          loadDataStore(data.categories, "category");

          // loadURLs(data.categories, "category");
          // let arrayURLs = [];
          // for (let i = 0; i < data.categories.length; i++) {
          //   // console.log(componentName, "fetchLocalDataCategories data.categories[i].category", data.categories[i].category);
          //   arrayURLs.push({linkName: data.categories[i].category, linkType: "category", linkID: data.categories[i].categoryID});
          // };
          // dispatch(loadArrayURLs(arrayURLs));

        } else {
          console.log(componentName, "fetchLocalDataCategories resultsFound error", data.message);
          // setErrCategoryMessage(data.message);
          dispatch(setCategoriesDataOffline(true));
          // dispatch(loadArrayCategories(CategoryData));
          // loadDataStore(CategoryData, "category");
        };

    })
    .catch(error => {
        console.log(componentName, "fetchLocalDataCategories error", error);
        // console.log(componentName, "fetchLocalDataCategories error.name", error.name);
        // console.log(componentName, "fetchLocalDataCategories error.message", error.message);
        // setErrCategoryMessage(error.name + ": " + error.message);
        dispatch(setCategoriesDataOffline(true));
        // dispatch(loadArrayCategories(CategoryData));
        // loadDataStore(CategoryData, "category");
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
            // setMediaList(data.media);
            // dispatch(loadArrayMedia(data.media));
            loadDataStore(data.media, "media");

            // loadURLs(data.media, "media");
            // let arrayURLs = [];
            // for (let i = 0; i < data.media.length; i++) {
            //   // console.log(componentName, "fetchLocalDataMedia data.media[i].media", data.media[i].media);
            //   arrayURLs.push({linkName: data.media[i].media, linkType: "media", linkID: data.media[i].mediaID});
            // };
            // dispatch(loadArrayURLs(arrayURLs));

        } else {
            console.log(componentName, "fetchLocalDataMedia resultsFound error", data.message);
            // setErrMediaMessage(data.message);
            dispatch(setMediaDataOffline(true));
            // dispatch(loadArrayMedia(MediaData));
            // loadDataStore(MediaData, "media");
        };

    })
    .catch(error => {
        console.log(componentName, "fetchLocalDataMedia error", error);
        // console.log(componentName, "fetchLocalDataMedia error.name", error.name);
        // console.log(componentName, "fetchLocalDataMedia error.message", error.message);
        // setErrMediaMessage(error.name + ": " + error.message);
        dispatch(setMediaDataOffline(true));
        // dispatch(loadArrayMedia(MediaData));
        // loadDataStore(MediaData, "media");
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
            // setTitleList(data.titles);
            // dispatch(loadArrayTitles(data.titles));
            loadDataStore(data.titles, "title");

            // loadURLs(data.titles, "title");
            // let arrayURLs = [];
            // for (let i = 0; i < data.titles.length; i++) {
            //   // console.log(componentName, "fetchLocalDataTitles data.titles[i].titleURL", data.titles[i].titleURL);
            //   arrayURLs.push({linkName: data.titles[i].titleURL, linkType: "title", linkID: data.titles[i].titleID});
            // };
            // dispatch(loadArrayURLs(arrayURLs));

        } else {
            console.log(componentName, "fetchLocalDataTitles resultsFound error", data.message);
            // setErrTitleMessage(data.message);
            dispatch(setTitlesDataOffline(true));
            // dispatch(loadArrayTitles(TitleData));
            // loadDataStore(TitleData, "title");
        };

    })
    .catch(error => {
        console.log(componentName, "fetchLocalDataTitles error", error);
        // console.log(componentName, "fetchLocalDataTitles error.name", error.name);
        // console.log(componentName, "fetchLocalDataTitles error.message", error.message);
        // setErrTitleMessage(error.name + ": " + error.message);
        dispatch(setTitlesDataOffline(true));
        // dispatch(loadArrayTitles(TitleData));
        // loadDataStore(TitleData, "title");
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
            dispatch(setEditionsDataOffline(false));
            return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "fetchLocalDataEditions data", data);

        // setEditionResultsFound(data.resultsFound);
        // setEditionMessage(data.message);

        if (data.resultsFound === true) {
            // setEditionList(data.editions);
            // dispatch(loadArrayEditions(data.editions));
            loadDataStore(data.editions, "edition");
        } else {
            console.log(componentName, "fetchLocalDataEditions resultsFound error", data.message);
            // setErrEditionMessage(data.message);
            dispatch(setEditionsDataOffline(true));
            // dispatch(loadArrayEditions(EditionData));
            // loadDataStore(EditionData, "edition");
        };

    })
    .catch(error => {
        console.log(componentName, "fetchLocalDataEditions error", error);
        // console.log(componentName, "fetchLocalDataEditions error.name", error.name);
        // console.log(componentName, "fetchLocalDataEditions error.message", error.message);
        // setErrEditionMessage(error.name + ": " + error.message);
        dispatch(setEditionsDataOffline(true));
        // dispatch(loadArrayEditions(EditionData));
        // loadDataStore(EditionData, "edition");
    });

  };

  useEffect(() => {
    // console.log(componentName, "useEffect");

    loadAppSettings();

    // Only load the bibliography data once per session unless the data is changed
    if (appOffline) {

      if(!categoriesLoaded) {
        dispatch(setCategoriesDataOffline(true));
        // dispatch(loadArrayCategories(CategoryData));
        // loadDataStore(CategoryData, "category");
        fetchLocalDataCategories();
      };

      if(!mediaLoaded) {
        dispatch(setMediaDataOffline(true));
        // dispatch(loadArrayMedia(MediaData));
        // loadDataStore(MediaData, "media");
        fetchLocalDataMedia();
      };

      if(!titlesLoaded) {
        dispatch(setTitlesDataOffline(true));
        // dispatch(loadArrayTitles(TitleData));
        // loadDataStore(TitleData, "title");
        fetchLocalDataTitles();
      };

      if(!editionsLoaded) {
        dispatch(setEditionsDataOffline(true));
        // dispatch(loadArrayEditions(EditionData));
        fetchLocalDataEditions();
      };

    // } else if (!appOffline) {
    //   getCategories();
    //   getMedia();
    //   getTitles();
    //   getEditions();
    } else {

      if(!categoriesLoaded) {
        getCategories();
      };

      if(!mediaLoaded) {
        getMedia();
      };

      if(!titlesLoaded) {
        getTitles();
      };

      if(!editionsLoaded) {
        getEditions();
      };

    };

    let documentURL = new URL(document.URL);
    dispatch(setPageURL(documentURL.pathname.replaceAll(routerBaseName, "").replaceAll("/", "")));

  }, []);

  useEffect(() => {
    // console.log(componentName, "useEffect categoriesDataOffline", categoriesDataOffline);
    // console.log(componentName, "useEffect mediaDataOffline", mediaDataOffline);
    // console.log(componentName, "useEffect titlesDataOffline", titlesDataOffline);
    // console.log(componentName, "useEffect editionsDataOffline", editionsDataOffline);

    if (categoriesDataOffline && mediaDataOffline && titlesDataOffline && editionsDataOffline) {
      // console.log(componentName, "useEffect setAppOffline");
      dispatch(setAppOffline(true));
    };
    
  }, [categoriesDataOffline, mediaDataOffline, titlesDataOffline, editionsDataOffline]);

  useEffect(() => {
    // console.log(componentName, "useEffect pageURL", pageURL);
    // console.log(componentName, "useEffect pageURL.replaceAll(\"/\", \"\")", pageURL.replaceAll("/", ""));

    if (pageURL !== undefined && pageURL !== "") {

      let linkArrayItem = {};

      for (let i = 0; i < urlLookup.length; i++) {
        linkArrayItem = urlLookup.find(linkName => linkName.linkName === pageURL.replaceAll("/", ""));
        // console.log(componentName, "useEffect linkArrayItem", linkArrayItem);
        // setLinkItem(linkArrayItem);
      };

      // console.log(componentName, "useEffect linkArrayItem", linkArrayItem);
      // console.log(componentName, "useEffect typeof linkArrayItem", typeof linkArrayItem);
      dispatch(setLinkItem(linkArrayItem));
      
    };
    
  }, [pageURL, urlLookup]);

  return (
      <BrowserRouter basename={routerBaseName}>
      <Navbar color="light" light>
        <Nav>
          <NavbarBrand className="mx-3">
            <Link to="/"><HouseFill color="black" /></Link>
          </NavbarBrand>
          {showHomeopape ? 
          <NavItem className="mx-3">
            <Link to="/homeopape"><NavbarText>Homeopape</NavbarText></Link>
          </NavItem>
          : null}
          {showNew? 
          <NavItem className="mx-3">
            <Link to="/new"><NavbarText>New To Philip K. Dick?</NavbarText></Link>
          </NavItem>
          : null}
          {showAbout ? 
          <NavItem className="mx-3">
            <Link to="/about"><NavbarText>About Philip K. Dick</NavbarText></Link>
          </NavItem>
          : null}
          {showCategoryList ? 
          <NavItem className="mx-3">
            <Link to="/categoryList"><NavbarText>Category List</NavbarText></Link>
          </NavItem>
          : null}
          {showMediaList ? 
          <NavItem className="mx-3">
            <Link to="/mediaList"><NavbarText>Media List</NavbarText></Link>
          </NavItem>
          : null}
          {showTitleList ? 
          <NavItem className="mx-3">
            <Link to="/titleList"><NavbarText>Title List</NavbarText></Link>
          </NavItem>
          : null}
          {showEditionList ? 
          <NavItem className="mx-3">
            <Link to="/editionList"><NavbarText>Edition List</NavbarText></Link>
          </NavItem>
          : null}
          {showAllCategories ? 
          <NavItem className="mx-3">
            <Link to="/categories"><NavbarText>All Categories</NavbarText></Link>
          </NavItem>
          : null}
          {showAllMedia ? 
          <NavItem className="mx-3">
            <Link to="/media"><NavbarText>All Media</NavbarText></Link>
          </NavItem>
          : null}
          {showAllTitles ? 
          <NavItem className="mx-3">
            <Link to="/titles"><NavbarText>All Titles</NavbarText></Link>
          </NavItem>
          : null}
          {showAllEditions ? 
          <NavItem className="mx-3">
            <Link to="/editions"><NavbarText>All Editions</NavbarText></Link>
          </NavItem>
          : null}
          <NavItem className="mx-3">
          <a href="https://pkdickbooks.com" target="_blank" rel="noopener noreferrer"><NavbarText>Philip K. Dick Bookshelf</NavbarText></a>
          </NavItem>
          <NavItem className="mx-3">
          <a href="https://philipdick.com"><NavbarText>Philip K. Dick Site</NavbarText></a>
          </NavItem>
        </Nav>
      </Navbar>

      <Container className="bodyContainer mb-5">
      <Row>
        {/* {linkItem !== undefined && linkItem.hasOwnProperty("linkName") ? <Alert color="info">{JSON.stringify(linkItem)}</Alert> : null} */}
        {categoryMessage !== "" ? <Alert color="info">{categoryMessage}</Alert> : null}
        {errCategoryMessage !== "" ? <Alert color="danger">{errCategoryMessage}</Alert> : null}
        {mediaMessage !== "" ? <Alert color="info">{mediaMessage}</Alert> : null}
        {errMediaMessage !== "" ? <Alert color="danger">{errMediaMessage}</Alert> : null}
        {titleMessage !== "" ? <Alert color="info">{titleMessage}</Alert> : null}
        {errTitleMessage !== "" ? <Alert color="danger">{errTitleMessage}</Alert> : null}
        {editionMessage !== "" ? <Alert color="info">{editionMessage}</Alert> : null}
        {errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
      </Row>
      <Row>
      <Col xs="2">
        <Category />
        <Media />
      </Col>
      <Col xs="10">
      <Switch>

      {/* Set the default page from the defaultPageComponent from environment */}
      {defaultPageComponent === "Home" ? <Route exact path="/" component={Home} /> : null}
      {defaultPageComponent === "About" ? <Route exact path="/" component={About} /> : null}
      {defaultPageComponent === "Homeopape" ? <Route exact path="/" component={Homeopape} /> : null}
      {/* <Route exact path="/">
        {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
        {defaultPageComponent === "Home" ? <Route exact path="/" component={Home} /> : null}
        {defaultPageComponent === "About" ? <Route exact path="/" component={About} /> : null}
        {defaultPageComponent === "Homeopape" ? <Route exact path="/" component={Homeopape} /> : null}
      </Route> */}


      <Route exact path="/home" component={Home} />
      <Route exact path="/new" component={New} />
      <Route exact path="/about" component={About} />
      <Route exact path="/homeopape" component={Homeopape} />
      <Route exact path="/categoryList" component={CategoryList} />
      <Route exact path="/mediaList" component={MediaList} />
      <Route exact path="/titleList" component={TitleList} />
      <Route exact path="/editionList" component={EditionList} />
      <Route exact path="/categories" component={Category} />
      <Route exact path="/media" component={Media} />

      {/* This route no longer works. */}
      <Route exact path="/titles" component={Titles} />
      {/* <Route exact path="/titles/:category" component={Titles} />
      <Route exact path="/title/:title" component={Title} /> */}

      {/* This route no longer works. */}
      <Route exact path="/editions" component={Editions} />
      {/* <Route exact path="/editions/:title" component={Editions} /> */}
      {/* <Route exact path="/editions/:media" component={Editions} /> */}

      {/* These need to stay at the bottom of the list so that the links above will work properly. */}
      {linkItem !== undefined && linkItem.hasOwnProperty("linkName") && linkItem.linkType === "category" ? <Route exact path="/:linkName" render={() => <Titles linkItem={linkItem} />} />: null}
      {linkItem !== undefined && linkItem.hasOwnProperty("linkName") && linkItem.linkType === "title" ? <Route exact path="/:linkName" render={() => <Title linkItem={linkItem} />} />: null}
      {linkItem !== undefined && linkItem.hasOwnProperty("linkName") && linkItem.linkType === "media" ? <Route exact path="/:linkName" render={() => <Editions linkItem={linkItem} />} />: null}

      </Switch>
      </Col>
      </Row>
      </Container>

      </BrowserRouter>
  );
}

export default App;
