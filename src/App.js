import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./App.css";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {HouseFill} from "react-bootstrap-icons";
import {Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavbarText, Alert} from "reactstrap";
import AppSettings from "./app/environment";
import {encodeURL} from "./app/sharedFunctions";
import {setHostname, setProfileType, setAPI_URL, setBaseURL, setTagManagerArgsgtmId, setSiteName, setAppName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setAppOffline, setElectronicOnly, setElectronicOnlyMessage} from "./app/appSlice";
import {loadArrayURLs, setPageURL, setLinkItem} from "./app/urlsSlice";
// import categoriesLoadData from "./bibliographyData/categoriesLoadData";
// import categoriesOfflineData from "./bibliographyData/categoriesOfflineData";
import CategoryData from "./bibliographyData/Categories.json";
import {loadArrayCategories, setCategoriesDataOffline} from "./bibliographyData/categoriesSlice";
// import editionsLoadData from "./bibliographyData/editionsLoadData";
// import editionsOfflineData from "./bibliographyData/editionsOfflineData";
import EditionData from "./bibliographyData/Editions.json";
import {loadArrayEditions, setEditionsDataOffline} from "./bibliographyData/editionsSlice";
// import mediaLoadData from "./bibliographyData/mediaLoadData";
// import mediaOfflineData from "./bibliographyData/mediaOfflineData";
import MediaData from "./bibliographyData/Media.json";
import {loadArrayMedia, setMediaDataOffline} from "./bibliographyData/mediaSlice";
// import titlesLoadData from "./bibliographyData/titlesLoadData";
// import titlesOfflineData from "./bibliographyData/titlesOfflineData";
import TitleData from "./bibliographyData/Titles.json";
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

  const dispatch = useDispatch();
  // const history = useHistory();

  const pageURL = useSelector(state => state.urls.pageURL);
  const linkItem = useSelector(state => state.urls.linkItem);

  // Load settings from environment into Redux
  // const hostname = AppSettings.hostname;
  dispatch(setHostname(AppSettings.hostname));

  // const profileType = AppSettings.profileType;
  dispatch(setProfileType(AppSettings.profileType));

  // const API_URL = AppSettings.API_URL;
  dispatch(setAPI_URL(AppSettings.API_URL));

  const baseURL = AppSettings.baseURL;
  dispatch(setBaseURL(AppSettings.baseURL));

  // const tagManagerArgsgtmId = AppSettings.tagManagerArgs.gtmId;
  dispatch(setTagManagerArgsgtmId(AppSettings.tagManagerArgs.gtmId));

  // const siteName = AppSettings.siteName;
  dispatch(setSiteName(AppSettings.siteName));

  // const appName = AppSettings.appName;
  dispatch(setAppName(AppSettings.appName));

  // const metaDescription = AppSettings.metaDescription;
  dispatch(setMetaDescription(AppSettings.metaDescription));

  const defaultPageComponent = AppSettings.defaultPageComponent;
  dispatch(setDefaultPageComponent(AppSettings.defaultPageComponent));

  const routerBaseName = AppSettings.routerBaseName;
  dispatch(setRouterBaseName(AppSettings.routerBaseName));

  const appOffline = AppSettings.appOffline;
  dispatch(setAppOffline(AppSettings.appOffline));

  // const electronicOnly = AppSettings.electronicOnly;
  dispatch(setElectronicOnly(AppSettings.electronicOnly));

  // const electronicOnlyMessage = AppSettings.electronicOnlyMessage;
  dispatch(setElectronicOnlyMessage(AppSettings.electronicOnlyMessage));

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

  const [showNew, setShowNew] = useState(true);
  const [showAbout, setShowAbout] = useState(true);
  const [showHomeopape, setShowHomeopape] = useState(false);

  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showMediaList, setShowMediaList] = useState(false);
  const [showTitleList, setShowTitleList] = useState(false);
  const [showEditionList, setShowEditionList] = useState(false);

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllMedia, setShowAllMedia] = useState(false);
  // This route no longer works. 
  const [showAllTitles, setShowAllTitles] = useState(false);
  // This route no longer works. 
  const [showAllEditions, setShowAllEditions] = useState(false);

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

  const loadDataStore = (data, source) => {

    if (source === "category") {
      // console.log("App.js loadDataStore data", data);
      dispatch(loadArrayCategories(data));
      loadURLs(data, source);
    } else if (source === "media") {
      // console.log("App.js loadDataStore data", data);
      dispatch(loadArrayMedia(data));
      loadURLs(data, source);
    } else if (source === "title") {
      // console.log("App.js loadDataStore data", data);
      dispatch(loadArrayTitles(data));
      loadURLs(data, source);
    };

  };

  const loadURLs = (data, source) => {

    let arrayURLs = [];
  
    for (let i = 0; i < data.length; i++) {

      if (source === "category") {
        // console.log("App.js loadURLs data[i].category", data[i].category);
        arrayURLs.push({linkName: encodeURL(data[i].category), linkType: source, linkID: data[i].categoryID});
      } else if (source === "media") {
        // console.log("App.js loadURLs data[i].media", data[i].media);
        arrayURLs.push({linkName: encodeURL(data[i].media), linkType: source, linkID: data[i].mediaID});
      } else if (source === "title") {
        // console.log("App.js loadURLs data[i].titleURL", data[i].titleURL);
        arrayURLs.push({linkName: data[i].titleURL, linkType: source, linkID: data[i].titleID});
      };
  
    };
    dispatch(loadArrayURLs(arrayURLs));
  
  };

  const getCategories = () => {
    // console.log("App.js getCategories");
    // console.log("App.js getCategories baseURL", baseURL);

    setCategoryMessage("");
    setErrCategoryMessage("");
    // setCategoryResultsFound(null);
    // setCategoryList([]);

    let url = baseURL + "category/";

    fetch(url)
    .then(response => {
        // console.log("App.js getCategories response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          dispatch(setCategoriesDataOffline(true));
          return {resultsFound: true, message: "Offline Categories data used.", categories: CategoryData};
        } else {
          dispatch(setCategoriesDataOffline(false));
          return response.json();
        };
    })
    .then(data => {
        // console.log("App.js getCategories data", data);

        // setCategoryResultsFound(data.resultsFound);
        // setCategoryMessage(data.message);

        if (data.resultsFound === true) {
          // setCategoryList(data.categories);
          // dispatch(loadArrayCategories(data.categories));

          loadDataStore(data.categories, "category");

          // loadURLs(data.categories, "category");
          // let arrayURLs = [];
          // for (let i = 0; i < data.categories.length; i++) {
          //   // console.log("App.js getCategories data.categories[i].category", data.categories[i].category);
          //   arrayURLs.push({linkName: data.categories[i].category, linkType: "category", linkID: data.categories[i].categoryID});
          // };
          // dispatch(loadArrayURLs(arrayURLs));

        } else {
          console.log("App.js getCategories resultsFound error", data.message);
          // setErrCategoryMessage(data.message);
          dispatch(setCategoriesDataOffline(true));
          dispatch(loadArrayCategories(CategoryData));
        };

    })
    .catch(error => {
        console.log("App.js getCategories error", error);
        // console.log("App.js getCategories error.name", error.name);
        // console.log("App.js getCategories error.message", error.message);
        // setErrCategoryMessage(error.name + ": " + error.message);
        dispatch(setCategoriesDataOffline(true));
        dispatch(loadArrayCategories(CategoryData));
    });

};

const getMedia = () => {
  // console.log("App.js getMedia");
  // console.log("App.js getMedia baseURL", baseURL);

  setMediaMessage("");
  setErrMediaMessage("");
  // setMediaResultsFound(null);
  // setMediaList([]);

  // console.log("App.js getMedia this.props.mediaID", this.props.mediaID);
  // this.props.setMediaID(null);
  // console.log("App.js getMedia this.props.titleID", this.props.titleID);
  // this.props.setTitleID(null);

  let url = baseURL + "media/";

  fetch(url)
  .then(response => {
      // console.log("App.js getMedia response", response);
      if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          dispatch(setMediaDataOffline(true));
          return {resultsFound: true, message: "Offline Media data used.", media: MediaData};
      } else {
          dispatch(setMediaDataOffline(false));
          return response.json();
      };
  })
  .then(data => {
      // console.log("App.js getMedia data", data);

      // setMediaResultsFound(data.resultsFound);
      // setMediaMessage(data.message);

      if (data.resultsFound === true) {
          // setMediaList(data.media);
          // dispatch(loadArrayMedia(data.media));

          loadDataStore(data.media, "media");

          // loadURLs(data.media, "media");
          // let arrayURLs = [];
          // for (let i = 0; i < data.media.length; i++) {
          //   // console.log("App.js getMedia data.media[i].media", data.media[i].media);
          //   arrayURLs.push({linkName: data.media[i].media, linkType: "media", linkID: data.media[i].mediaID});
          // };
          // dispatch(loadArrayURLs(arrayURLs));

      } else {
          console.log("App.js getMedia resultsFound error", data.message);
          // setErrMediaMessage(data.message);
          dispatch(setMediaDataOffline(true));
          dispatch(loadArrayMedia(MediaData));
      };

  })
  .catch(error => {
      console.log("App.js getMedia error", error);
      // console.log("App.js getMedia error.name", error.name);
      // console.log("App.js getMedia error.message", error.message);
      // setErrMediaMessage(error.name + ": " + error.message);
      dispatch(setMediaDataOffline(true));
      dispatch(loadArrayMedia(MediaData));
  });

};

const getTitles = () => {
  // console.log("App.js getTitle");
  // console.log("App.js getTitle baseURL", baseURL);

  setTitleMessage("");
  setErrTitleMessage("");
  // setTitleResultsFound(null);
  // setTitleList([]);

  // console.log("App.js getTitle this.props.titleID", this.props.titleID);
  // this.props.setTitleID(null);
  // console.log("App.js getTitle this.props.titleID", this.props.titleID);
  // this.props.setTitleID(null);

  let url = baseURL + "title/list";

  fetch(url)
  .then(response => {
      // console.log("App.js getTitle response", response);
      if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          dispatch(setTitlesDataOffline(true));
          return {resultsFound: true, message: "Offline Titles data used.", titles: TitleData};
      } else {
          dispatch(setTitlesDataOffline(false));
          return response.json();
      };
  })
  .then(data => {
      // console.log("App.js getTitle data", data);

      // setTitleResultsFound(data.resultsFound);
      // setTitleMessage(data.message);

      if (data.resultsFound === true) {
          // setTitleList(data.titles);
          // dispatch(loadArrayTitles(data.titles));

          loadDataStore(data.titles, "title");

          // loadURLs(data.titles, "title");
          // let arrayURLs = [];
          // for (let i = 0; i < data.titles.length; i++) {
          //   // console.log("App.js getTitles data.titles[i].titleURL", data.titles[i].titleURL);
          //   arrayURLs.push({linkName: data.titles[i].titleURL, linkType: "title", linkID: data.titles[i].titleID});
          // };
          // dispatch(loadArrayURLs(arrayURLs));

      } else {
          console.log("App.js getTitles resultsFound error", data.message);
          // setErrTitleMessage(data.message);
          dispatch(setTitlesDataOffline(true));
          dispatch(loadArrayTitles(TitleData));
      };

  })
  .catch(error => {
      console.log("App.js getTitle error", error);
      // console.log("App.js getTitle error.name", error.name);
      // console.log("App.js getTitle error.message", error.message);
      // setErrTitleMessage(error.name + ": " + error.message);
      dispatch(setTitlesDataOffline(true));
      dispatch(loadArrayTitles(TitleData));
  });

};

const getEditions = () => {
  // console.log("App.js getEdition");
  // console.log("App.js getEdition baseURL", baseURL);

  setEditionMessage("");
  setErrEditionMessage("");
  // setEditionResultsFound(null);
  // setEditionList([]);

  // console.log("App.js getEdition this.props.editionID", this.props.editionID);
  // this.props.setEditionID(null);
  // console.log("App.js getEdition this.props.titleID", this.props.titleID);
  // this.props.setTitleID(null);

  let url = baseURL + "edition/list";

  fetch(url)
  .then(response => {
      // console.log("App.js getEdition response", response);
      if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          dispatch(setEditionsDataOffline(true));
          return {resultsFound: true, message: "Offline Editions data used.", editions: EditionData};
      } else {
          dispatch(setEditionsDataOffline(false));
          return response.json();
      };
  })
  .then(data => {
      // console.log("App.js getEdition data", data);

      // setEditionResultsFound(data.resultsFound);
      // setEditionMessage(data.message);

      if (data.resultsFound === true) {
          // setEditionList(data.editions);
          dispatch(loadArrayEditions(data.editions));
      } else {
          console.log("App.js getEditions resultsFound error", data.message);
          // setErrEditionMessage(data.message);
          dispatch(setEditionsDataOffline(true));
          dispatch(loadArrayEditions(EditionData));
      };

  })
  .catch(error => {
      console.log("App.js getEditions error", error);
      // console.log("App.js getEdition error.name", error.name);
      // console.log("App.js getEdition error.message", error.message);
      // setErrEditionMessage(error.name + ": " + error.message);
      dispatch(setEditionsDataOffline(true));
      dispatch(loadArrayEditions(EditionData));
  });

};

  useEffect(() => {
    // console.log("App.js useEffect");

    // Only load the bibliography data once per session unless the data is changed
    if (appOffline) {

      if(!categoriesLoaded) {
        dispatch(setCategoriesDataOffline(true));
        // dispatch(loadArrayCategories(CategoryData));
        loadDataStore(CategoryData, "category");
      };

      if(!mediaLoaded) {
        dispatch(setMediaDataOffline(true));
        // dispatch(loadArrayMedia(MediaData));
        loadDataStore(MediaData, "media");
      };

      if(!titlesLoaded) {
        dispatch(setTitlesDataOffline(true));
        // dispatch(loadArrayTitles(TitleData));
        loadDataStore(TitleData, "title");
      };

      if(!editionsLoaded) {
        dispatch(setEditionsDataOffline(true));
        dispatch(loadArrayEditions(EditionData));
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
    // console.log("App.js useEffect categoriesDataOffline", categoriesDataOffline);
    // console.log("App.js useEffect mediaDataOffline", mediaDataOffline);
    // console.log("App.js useEffect titlesDataOffline", titlesDataOffline);
    // console.log("App.js useEffect editionsDataOffline", editionsDataOffline);

    if (categoriesDataOffline && mediaDataOffline && titlesDataOffline && editionsDataOffline) {
      // console.log("App.js useEffect setAppOffline");
      dispatch(setAppOffline(true));
    };
    
  }, [categoriesDataOffline, mediaDataOffline, titlesDataOffline, editionsDataOffline]);

  useEffect(() => {
    // console.log("App.js useEffect categoriesDataOffline", categoriesDataOffline);
    // console.log("App.js useEffect mediaDataOffline", mediaDataOffline);
    // console.log("App.js useEffect titlesDataOffline", titlesDataOffline);
    // console.log("App.js useEffect editionsDataOffline", editionsDataOffline);

    if (categoriesDataOffline && mediaDataOffline && titlesDataOffline && editionsDataOffline) {
      // console.log("App.js useEffect setAppOffline");
      dispatch(setAppOffline(true));
    };
    
  }, [categoriesDataOffline, mediaDataOffline, titlesDataOffline, editionsDataOffline]);

  useEffect(() => {
    // console.log("App.js useEffect pageURL", pageURL);
    // console.log("App.js useEffect pageURL.replaceAll(\"/\", \"\")", pageURL.replaceAll("/", ""));

    if (pageURL !== undefined && pageURL !== "") {

      let linkArrayItem = {};

      for (let i = 0; i < urlLookup.length; i++) {
        linkArrayItem = urlLookup.find(linkName => linkName.linkName === pageURL.replaceAll("/", ""));
        // console.log("App.js useEffect linkArrayItem", linkArrayItem);
        // setLinkItem(linkArrayItem);
      };

      // console.log("App.js useEffect linkArrayItem", linkArrayItem);
      // console.log("App.js useEffect typeof linkArrayItem", typeof linkArrayItem);
      dispatch(setLinkItem(linkArrayItem));
      
    };
    
  }, [pageURL, urlLookup]);

  return (
      <BrowserRouter basename={routerBaseName}>
      <Navbar color="light" light>
        <Nav>
          <NavbarBrand className="mx-2">
            <Link to="/"><HouseFill color="black" /></Link>
          </NavbarBrand>
          {showHomeopape ? 
          <NavItem className="mx-2">
            <Link to="/homeopape"><NavbarText>Homeopape</NavbarText></Link>
          </NavItem>
          : null}
          {showNew? 
          <NavItem className="mx-2">
            <Link to="/new"><NavbarText>New To Philip K. Dick?</NavbarText></Link>
          </NavItem>
          : null}
          {showAbout ? 
          <NavItem className="mx-2">
            <Link to="/about"><NavbarText>About Philip K. Dick</NavbarText></Link>
          </NavItem>
          : null}
          {showCategoryList ? 
          <NavItem className="mx-2">
            <Link to="/categoryList"><NavbarText>Category List</NavbarText></Link>
          </NavItem>
          : null}
          {showMediaList ? 
          <NavItem className="mx-2">
            <Link to="/mediaList"><NavbarText>Media List</NavbarText></Link>
          </NavItem>
          : null}
          {showTitleList ? 
          <NavItem className="mx-2">
            <Link to="/titleList"><NavbarText>Title List</NavbarText></Link>
          </NavItem>
          : null}
          {showEditionList ? 
          <NavItem className="mx-2">
            <Link to="/editionList"><NavbarText>Edition List</NavbarText></Link>
          </NavItem>
          : null}
          {showAllCategories ? 
          <NavItem className="mx-2">
            <Link to="/categories"><NavbarText>All Categories</NavbarText></Link>
          </NavItem>
          : null}
          {showAllMedia ? 
          <NavItem className="mx-2">
            <Link to="/media"><NavbarText>All Media</NavbarText></Link>
          </NavItem>
          : null}
          {showAllTitles ? 
          <NavItem className="mx-2">
            <Link to="/titles"><NavbarText>All Titles</NavbarText></Link>
          </NavItem>
          : null}
          {showAllEditions ? 
          <NavItem className="mx-2">
            <Link to="/editions"><NavbarText>All Editions</NavbarText></Link>
          </NavItem>
          : null}
          <NavItem className="mx-2">
          <a href="https://pkdickbooks.com" target="_blank" rel="noopener noreferrer"><NavbarText>Philip K. Dick Bookshelf</NavbarText></a>
          </NavItem>
          <NavItem className="mx-2">
          <a href="https://philipdick.com" target="_blank" rel="noopener noreferrer"><NavbarText>Philip K. Dick Site</NavbarText></a>
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
