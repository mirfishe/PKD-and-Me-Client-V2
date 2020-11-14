import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "reactstrap";
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

  const [categoryMessage, setCategoryMessage] = useState("");
  const [errCategoryMessage, setErrCategoryMessage] = useState("");
  const [mediaMessage, setMediaMessage] = useState("");
  const [errMediaMessage, setErrMediaMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [errTitleMessage, setErrTitleMessage] = useState("");
  const [editionMessage, setEditionMessage] = useState("");
  const [errEditionMessage, setErrEditionMessage] = useState("");

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
        dispatch(setEditionsDataOffline(true));
        loadDataStore(EditionData, "edition");
    });

  };

  useEffect(() => {
    // console.log(componentName, "useEffect");

    // Only load the bibliography data once per session unless the data is changed
    if (appOffline) {

      if(!categoriesLoaded) {
        dispatch(setCategoriesDataOffline(true));
        fetchLocalDataCategories();
      };

      if(!mediaLoaded) {
        dispatch(setMediaDataOffline(true));
        fetchLocalDataMedia();
      };

      if(!titlesLoaded) {
        dispatch(setTitlesDataOffline(true));
        fetchLocalDataTitles();
      };

      if(!editionsLoaded) {
        dispatch(setEditionsDataOffline(true));
        fetchLocalDataEditions();
      };

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

  }, []);

  return (
    <React.Fragment>
        {categoryMessage !== "" ? <Alert color="info">{categoryMessage}</Alert> : null}
        {errCategoryMessage !== "" ? <Alert color="danger">{errCategoryMessage}</Alert> : null}
        {mediaMessage !== "" ? <Alert color="info">{mediaMessage}</Alert> : null}
        {errMediaMessage !== "" ? <Alert color="danger">{errMediaMessage}</Alert> : null}
        {titleMessage !== "" ? <Alert color="info">{titleMessage}</Alert> : null}
        {errTitleMessage !== "" ? <Alert color="danger">{errTitleMessage}</Alert> : null}
        {editionMessage !== "" ? <Alert color="info">{editionMessage}</Alert> : null}
        {errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
    </React.Fragment>
  );
}

export default LoadBibliographyData;
