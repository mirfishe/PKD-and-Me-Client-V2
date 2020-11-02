import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./App.css";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {HouseFill} from "react-bootstrap-icons";
import {Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavbarText, Alert} from "reactstrap";
import {baseURL} from "./app/constants";
import {setBaseURL, setAppOffline} from "./bibliographyData/appSlice";
// import categoriesLoadData from "./bibliographyData/categoriesLoadData";
import categoriesOfflineData from "./bibliographyData/categoriesOfflineData";
import {loadArrayCategories, setCategoriesDataOffline} from "./bibliographyData/categoriesSlice";
// import editionsLoadData from "./bibliographyData/editionsLoadData";
import editionsOfflineData from "./bibliographyData/editionsOfflineData";
import {loadArrayEditions, setEditionsDataOffline} from "./bibliographyData/editionsSlice";
// import mediaLoadData from "./bibliographyData/mediaLoadData";
import mediaOfflineData from "./bibliographyData/mediaOfflineData";
import {loadArrayMedia, setMediaDataOffline} from "./bibliographyData/mediaSlice";
// import titlesLoadData from "./bibliographyData/titlesLoadData";
import titlesOfflineData from "./bibliographyData/titlesOfflineData";
import {loadArrayTitles, setTitlesDataOffline} from "./bibliographyData/titlesSlice";

import CategoryList from "./components/categories/CategoryList";
import MediaList from "./components/media/MediaList";
import TitleList from "./components/titles/TitleList";
import EditionList from "./components/editions/EditionList";
import About from "./components/about/About";
import Category from "./components/categories/Category";
import Media from "./components/media/Media";
import Titles from "./components/titles/Titles";
import Title from "./components/titles/Title";
import Editions from "./components/editions/Editions";

function App() {

  const dispatch = useDispatch();

  // const appOffline = false;
  dispatch(setAppOffline(false));
  const appOffline = useSelector(state => state.app.appOffline);

  const categoriesDataOffline = useSelector(state => state.categories.categoriesDataOffline);
  const mediaDataOffline = useSelector(state => state.media.mediaDataOffline);
  const titlesDataOffline = useSelector(state => state.titles.titlesDataOffline);
  const editionsDataOffline = useSelector(state => state.editions.editionsDataOffline);

  const categoriesLoaded = useSelector(state => state.categories.categoriesLoaded);
  const mediaLoaded = useSelector(state => state.media.mediaLoaded);
  const titlesLoaded = useSelector(state => state.titles.titlesLoaded);
  const editionsLoaded = useSelector(state => state.editions.editionsLoaded);

  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showMediaList, setShowMediaList] = useState(false);
  const [showTitleList, setShowTitleList] = useState(false);
  const [showEditionList, setShowEditionList] = useState(false);

  const [showAllTitles, setShowAllTitles] = useState(true);
  const [showAllEditions, setShowAllEditions] = useState(true);

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
          return {resultsFound: true, message: "Offline Categories data used.", categories: categoriesOfflineData};
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
          dispatch(loadArrayCategories(data.categories));
        } else {
          console.log("App.js getCategories resultsFound error", data.message);
          // setErrCategoryMessage(data.message);
          dispatch(setCategoriesDataOffline(true));
          dispatch(loadArrayCategories(categoriesOfflineData));
        };

    })
    .catch(error => {
        console.log("App.js getCategories error", error);
        // console.log("App.js getCategories error.name", error.name);
        // console.log("App.js getCategories error.message", error.message);
        // setErrCategoryMessage(error.name + ": " + error.message);
        dispatch(setCategoriesDataOffline(true));
        dispatch(loadArrayCategories(categoriesOfflineData));
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
          return {resultsFound: true, message: "Offline Media data used.", media: mediaOfflineData};
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
          dispatch(loadArrayMedia(data.media));
      } else {
          console.log("App.js getMedia resultsFound error", data.message);
          // setErrMediaMessage(data.message);
          dispatch(setMediaDataOffline(true));
          dispatch(loadArrayMedia(mediaOfflineData));
      };

  })
  .catch(error => {
      console.log("App.js getMedia error", error);
      // console.log("App.js getMedia error.name", error.name);
      // console.log("App.js getMedia error.message", error.message);
      // setErrMediaMessage(error.name + ": " + error.message);
      dispatch(setMediaDataOffline(true));
      dispatch(loadArrayMedia(mediaOfflineData));
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
          return {resultsFound: true, message: "Offline Titles data used.", titles: titlesOfflineData};
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
          dispatch(loadArrayTitles(data.titles));
      } else {
          console.log("App.js getTitles resultsFound error", data.message);
          // setErrTitleMessage(data.message);
          dispatch(setTitlesDataOffline(true));
          dispatch(loadArrayTitles(titlesOfflineData));
      };

  })
  .catch(error => {
      console.log("App.js getTitle error", error);
      // console.log("App.js getTitle error.name", error.name);
      // console.log("App.js getTitle error.message", error.message);
      // setErrTitleMessage(error.name + ": " + error.message);
      dispatch(setTitlesDataOffline(true));
      dispatch(loadArrayTitles(titlesOfflineData));
  });

};

const getEditions = () => {
  console.log("App.js getEdition");
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
          return {resultsFound: true, message: "Offline Editions data used.", editions: editionsOfflineData};
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
          dispatch(loadArrayEditions(editionsOfflineData));
      };

  })
  .catch(error => {
      console.log("App.js getEditions error", error);
      // console.log("App.js getEdition error.name", error.name);
      // console.log("App.js getEdition error.message", error.message);
      // setErrEditionMessage(error.name + ": " + error.message);
      dispatch(setEditionsDataOffline(true));
      dispatch(loadArrayEditions(editionsOfflineData));
  });

};

  useEffect(() => {
    // console.log("App.js useEffect");

    // Only load the bibliography data once per session unless the data is changed
    if (appOffline) {
      dispatch(setCategoriesDataOffline(true));
      dispatch(loadArrayCategories(categoriesOfflineData));
      dispatch(setMediaDataOffline(true));
      dispatch(loadArrayMedia(mediaOfflineData));
      dispatch(setTitlesDataOffline(true));
      dispatch(loadArrayTitles(titlesOfflineData));
      dispatch(setEditionsDataOffline(true));
      dispatch(loadArrayEditions(editionsOfflineData));
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

    dispatch(setBaseURL(baseURL));

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

    if (appOffline) {
      setShowCategoryList(false);
      setShowMediaList(false);
      setShowTitleList(false);
      setShowEditionList(false);
    };
    
  }, [appOffline]);

  return (
      <BrowserRouter basename="/pkd-and-me">
      <Navbar color="light" light>
        <Nav>
          <NavbarBrand className="mx-2">
            <Link to="/"><HouseFill color="black" /></Link>
          </NavbarBrand>
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
          {/* <NavItem className="mx-2">
            <Link to="/categories"><NavbarText>Categories</NavbarText></Link>
          </NavItem>
          <NavItem className="mx-2">
            <Link to="/media"><NavbarText>Media</NavbarText></Link>
          </NavItem> */}
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
      <Route exact path="/" component={About} />
      <Route exact path="/about" component={About} />
      <Route exact path="/categoryList" component={CategoryList} />
      <Route exact path="/mediaList" component={MediaList} />
      <Route exact path="/titleList" component={TitleList} />
      <Route exact path="/editionList" component={EditionList} />
      <Route exact path="/categories" component={Category} />
      <Route exact path="/media" component={Media} />
      <Route exact path="/titles" component={Titles} />
      <Route exact path="/titles/:category" component={Titles} />
      <Route exact path="/title/:title" component={Title} />
      <Route exact path="/editions" component={Editions} />
      {/* <Route exact path="/editions/:title" component={Editions} /> */}
      <Route exact path="/editions/:media" component={Editions} />
      </Switch>
      </Col>
      </Row>
      </Container>

      </BrowserRouter>
  );
}

export default App;
