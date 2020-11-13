import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./App.css";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {HouseFill} from "react-bootstrap-icons";
import {Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavbarText} from "reactstrap";
import {setAppOffline} from "./app/appSlice";
import {setPageURL, setLinkItem} from "./app/urlsSlice";
import LoadAppSettings from "./components/loadData/LoadAppSettings";
import LoadBibliographyData from "./components/loadData/LoadBibliographyData";
import Home from "./content/Home";
import New from "./content/New";
import About from "./content/About";
import Homeopape from "./content/Homeopape";
import Dickian from "./content/Dickian";
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

  // Load settings from Redux slices
  const categoriesDataOffline = useSelector(state => state.categories.categoriesDataOffline);
  const mediaDataOffline = useSelector(state => state.media.mediaDataOffline);
  const titlesDataOffline = useSelector(state => state.titles.titlesDataOffline);
  const editionsDataOffline = useSelector(state => state.editions.editionsDataOffline);

  let showAllMenuItems = useSelector(state => state.app.menuSettings.showAllMenuItems);

  let showNew = useSelector(state => state.app.menuSettings.showNew);
  // console.log(componentName, "showNew", showNew);
  // show New page unless set specifically to false
  if (showNew !== false) {
    showNew = true;
  };

  let showAbout = useSelector(state => state.app.menuSettings.showAbout);
  // console.log(componentName, "showAbout", showAbout);
  // show About page unless set specifically to false
  if (showAbout !== false) {
    showAbout = true;
  };

  let showHomeopape = useSelector(state => state.app.menuSettings.showHomeopape);
  // console.log(componentName, "showHomeopape", showHomeopape);
  let showDickian = useSelector(state => state.app.menuSettings.showDickian);
  // console.log(componentName, "showDickian", showDickian);

  let showCategoryList = useSelector(state => state.app.menuSettings.showCategoryList);
  let showMediaList = useSelector(state => state.app.menuSettings.showMediaList);
  let showTitleList = useSelector(state => state.app.menuSettings.showTitleList);
  let showEditionList = useSelector(state => state.app.menuSettings.showEditionList);

  let showAllCategories = useSelector(state => state.app.menuSettings.showAllCategories);
  let showAllMedia = useSelector(state => state.app.menuSettings.showAllMedia);
    // This route no longer works. 
  let showAllTitles = useSelector(state => state.app.menuSettings.showAllTitles);
    // This route no longer works. 
  let showAllEditions = useSelector(state => state.app.menuSettings.showAllEditions);

  const urlLookup = useSelector(state => state.urls.arrayURLs);
  const pageURL = useSelector(state => state.urls.pageURL);
  const linkItem = useSelector(state => state.urls.linkItem);

  const routerBaseName = useSelector(state => state.app.routerBaseName);
  const defaultPageComponent = useSelector(state => state.app.defaultPageComponent);

  useEffect(() => {
    // console.log(componentName, "useEffect");

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
          {showHomeopape || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/homeopape"><NavbarText>Homeopape</NavbarText></Link>
          </NavItem>
          : null}
          {showDickian || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/dickian"><NavbarText>Dickian</NavbarText></Link>
          </NavItem>
          : null}
          {showNew || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/new"><NavbarText>New To Philip K. Dick?</NavbarText></Link>
          </NavItem>
          : null}
          {showAbout || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/about"><NavbarText>About Philip K. Dick</NavbarText></Link>
          </NavItem>
          : null}
          {showCategoryList || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/categoryList"><NavbarText>Category List</NavbarText></Link>
          </NavItem>
          : null}
          {showMediaList || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/mediaList"><NavbarText>Media List</NavbarText></Link>
          </NavItem>
          : null}
          {showTitleList || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/titleList"><NavbarText>Title List</NavbarText></Link>
          </NavItem>
          : null}
          {showEditionList || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/editionList"><NavbarText>Edition List</NavbarText></Link>
          </NavItem>
          : null}
          {showAllCategories || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/categories"><NavbarText>All Categories</NavbarText></Link>
          </NavItem>
          : null}
          {showAllMedia || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/media"><NavbarText>All Media</NavbarText></Link>
          </NavItem>
          : null}
          {showAllTitles || showAllMenuItems ? 
          <NavItem className="mx-3">
            <Link to="/titles"><NavbarText>All Titles</NavbarText></Link>
          </NavItem>
          : null}
          {showAllEditions || showAllMenuItems ? 
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
        <LoadAppSettings />
        <LoadBibliographyData />
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
      {defaultPageComponent === "Dickian" ? <Route exact path="/" component={Dickian} /> : null}
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
      <Route exact path="/dickian" component={Dickian} />
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
