import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavbarText, Alert, Button } from "reactstrap";
import AppSettings from "./app/environment";
import { setAppOffline, setUserElectronicOnly, setUserPhysicalOnly } from "./app/appSlice";
import { setPageURL, setLinkItem } from "./app/urlsSlice";
import LoadAppSettings from "./components/loadData/LoadAppSettings";
import LoadBibliographyData from "./components/loadData/LoadBibliographyData";
import LoadUserReviews from "./components/loadData/LoadUserReviews";
import { loadUserData, setSessionToken, loadArrayChecklist } from "./app/userSlice";
import Home from "./content/Home";
import New from "./content/New";
import About from "./content/About";
import Homeopape from "./content/Homeopape";
import Dickian from "./content/Dickian";
import FormatPost from "./components/socialMedia/FormatPost";
import AddCategory from "./components/categories/AddCategory";
import AddMedia from "./components/media/AddMedia";
import AddTitle from "./components/titles/AddTitle";
import CategoryList from "./components/categories/CategoryList";
import MediaList from "./components/media/MediaList";
import TitleList from "./components/titles/TitleList";
import EditionList from "./components/editions/EditionList";
import UserReviewList from "./components/userReviews/UserReviewList";
import UserReviewRatingList from "./components/userReviews/UserReviewRatingList";
import URLList from "./components/loadData/URLList";
import Category from "./components/categories/Category";
import Media from "./components/media/Media";
import Titles from "./components/titles/Titles";
import Title from "./components/titles/Title";
import Editions from "./components/editions/Editions";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import EditUser from "./components/users/EditUser";
import Checklist from "./components/checklist/Checklist";

function App() {

  const componentName = "App.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, "admin", admin);

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, "baseURL", baseURL);

  const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

  const firstName = useSelector(state => state.user.firstName);
  // console.log(componentName, "firstName", firstName);
  const lastName = useSelector(state => state.user.lastName);
  // console.log(componentName, "lastName", lastName);

  // * Load settings from Redux slices
  const categoriesDataOffline = useSelector(state => state.categories.categoriesDataOffline);
  const mediaDataOffline = useSelector(state => state.media.mediaDataOffline);
  const titlesDataOffline = useSelector(state => state.titles.titlesDataOffline);
  const editionsDataOffline = useSelector(state => state.editions.editionsDataOffline);

  const electronicOnly = useSelector(state => state.app.electronicOnly);
  const userElectronicOnly = useSelector(state => state.app.userElectronicOnly);
  const physicalOnly = useSelector(state => state.app.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.app.userPhysicalOnly);

  const userLoaded = useSelector(state => state.user.userLoaded);
  const checklistLoaded = useSelector(state => state.user.checklistLoaded);

  let showAllMenuItems = useSelector(state => state.app.menuSettings.showAllMenuItems);

  let showNew = useSelector(state => state.app.menuSettings.showNew);
  // console.log(componentName, "showNew", showNew);
  // * show New page unless set specifically to false
  if (showNew !== false) {
    showNew = true;
  };

  let showAbout = useSelector(state => state.app.menuSettings.showAbout);
  // console.log(componentName, "showAbout", showAbout);
  // * show About page unless set specifically to false
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
  let showUserReviewList = useSelector(state => state.app.menuSettings.showUserReviewList);
  let showUserReviewRatingList = useSelector(state => state.app.menuSettings.showUserReviewRatingList);
  let showURLList = useSelector(state => state.app.menuSettings.showURLList);

  let showAddCategory = useSelector(state => state.app.menuSettings.showAddCategory);
  // console.log(componentName, "showAddCategory", showAddCategory);
  let showAddMedia = useSelector(state => state.app.menuSettings.showAddMedia);
  let showAddTitle = useSelector(state => state.app.menuSettings.showAddTitle);
  let showAddEdition = useSelector(state => state.app.menuSettings.showAddEdition);

  let showAllCategories = useSelector(state => state.app.menuSettings.showAllCategories);
  let showAllMedia = useSelector(state => state.app.menuSettings.showAllMedia);
  // ! This route no longer works. 
  let showAllTitles = useSelector(state => state.app.menuSettings.showAllTitles);
  // ! This route no longer works. 
  let showAllEditions = useSelector(state => state.app.menuSettings.showAllEditions);

  let showUserPhysicalOnly = useSelector(state => state.app.menuSettings.showUserPhysicalOnly);
  let showUserElectronicOnly = useSelector(state => state.app.menuSettings.showUserElectronicOnly);

  const urlLookup = useSelector(state => state.urls.arrayURLs);
  const pageURL = useSelector(state => state.urls.pageURL);
  const linkItem = useSelector(state => state.urls.linkItem);

  // ! Loading the routerBaseName from the state store here is too slow
  // ! Always pulling it from environment.js
  // const routerBaseName = useSelector(state => state.app.routerBaseName);
  const routerBaseName = AppSettings.routerBaseName;

  // ! Loading the defaultPageComponent from the state store here is too slow
  // ! Always pulling it from environment.js
  // const defaultPageComponent = useSelector(state => state.app.defaultPageComponent);
  const defaultPageComponent = AppSettings.defaultPageComponent;

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [userResultsFound, setUserResultsFound] = useState(null);

  const [checklistMessage, setChecklistMessage] = useState("");
  const [errChecklistMessage, setErrChecklistMessage] = useState("");
  const [checklistResultsFound, setChecklistResultsFound] = useState(null);

  const clearToken = () => {
    localStorage.clear();
    // setSessionToken("");
    // console.log(componentName, "clearToken localStorage token", localStorage.getItem("token"));
    // console.log(componentName, "sessionToken", sessionToken); // Never shows the current value of sessionToken
    // console.log(componentName, "clearToken User logged out.");
  };

  const logOut = () => {
    // * remove user from userSlice
    dispatch(loadUserData({ userID: null, firstName: null, lastName: null, email: null, updatedBy: null, admin: null, active: null, sessionToken: null, userLoaded: false, arrayChecklist: [], checklistLoaded: false, lastDatabaseRetrievalChecklist: null }));
    dispatch(setSessionToken(null));
    clearToken();

    // * reload/refresh page

  };

  const getUser = (token) => {
    // console.log(componentName, "getUser");
    // console.log(componentName, "getUser baseURL", baseURL);

    clearMessages();

    let url = baseURL + "user/";

    if (token !== undefined && token !== null && token !== "") {

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": token
        }),
      })
        .then(response => {
          // console.log(componentName, "getUser response", response);
          // if (!response.ok) {
          //     throw Error(response.status + " " + response.statusText + " " + response.url);
          // } else {
          // if (response.status === 200) {
          return response.json();
          // } else {
          //     return response.status;
          // };
          // };
        })
        .then(data => {
          // console.log(componentName, "getUser data", data);

          setUserResultsFound(data.resultsFound);
          // addMessage(data.message);

          if (data.resultsFound === true) {

            if (data.active === true) {

              dispatch(loadUserData(data));

              // console.log(componentName, "getUser checklistLoaded", checklistLoaded);
              // console.log(componentName, "getUser data.sessionToken", data.sessionToken);
              // console.log(componentName, "getUser token", token);
              if (!checklistLoaded) {
                getChecklist(token);
              };

            } else {
              // * Won't hit this because no records will be returned if the user is not active
              logOut();
            };

          } else {
            // console.log(componentName, "getUser data.resultsFound !== true", data.message);
            // addErrorMessage(data.message);
            logOut();
          };

        })
        .catch(error => {
          console.log(componentName, "getUser error", error);
          // console.log(componentName, "getUser error.name", error.name);
          // console.log(componentName, "getUser error.message", error.message);
          // addErrorMessage(error.name + ": " + error.message);
        });

    };

  };

  const getChecklist = (token) => {
    // console.log(componentName, "getChecklist");
    // console.log(componentName, "getChecklist baseURL", baseURL);
    // console.log(componentName, "getChecklist token", token);

    setChecklistMessage("");
    setErrChecklistMessage("");
    setChecklistResultsFound(null);

    let url = baseURL + "title/checklist/list";

    if (token !== undefined && token !== null && token !== "") {

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": token
        }),
      })
        .then(response => {
          // console.log(componentName, "getChecklist response", response);
          // if (!response.ok) {
          //     throw Error(response.status + " " + response.statusText + " " + response.url);
          // } else {
          // if (response.status === 200) {
          return response.json();
          // } else {
          //     return response.status;
          // };
          // };
        })
        .then(data => {
          // console.log(componentName, "getChecklist data", data);

          setChecklistResultsFound(data.resultsFound);
          // setChecklistMessage(data.message);

          if (data.resultsFound === true) {

            dispatch(loadArrayChecklist(data.titles));

          } else {
            console.log(componentName, "getChecklist resultsFound error", data.message);
            // addErrorMessage(data.message);
          };

        })
        .catch(error => {
          console.log(componentName, "getChecklist error", error);
          // console.log(componentName, "getChecklist error.name", error.name);
          // console.log(componentName, "getChecklist error.message", error.message);
          // addErrorMessage(error.name + ": " + error.message);
        });

    };

  };

  useEffect(() => {
    // console.log(componentName, "useEffect");

    if (appAllowUserInteractions === true && localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null && localStorage.getItem("token") !== "") {

      dispatch(setSessionToken(localStorage.getItem("token")));
      // console.log(componentName, "componentDidMount localStorage token", localStorage.getItem("token"));
      // console.log(componentName, "componentDidMount state.sessionToken", state.sessionToken); // Never shows the current value of sessionToken

      // ! Doesn't store if the user is active or is an admin
      // ! Doesn't store the userID except inside the sessionToken hash
      // * ########## TEMPORARY ##########
      // setUserID(1);
      // setIsAdmin(true);
      // * Fetch from the API to check these
      if (!userLoaded) {
        getUser(localStorage.getItem("token"));
      };

      // * Moved to the getUser function
      // if (!checklistLoaded) {
      //   getChecklist(localStorage.getItem("token"));
      // };

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
          <NavbarBrand href="/" className="mx-3">
            <HouseFill color="black" />
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
          {showAbout || showAllMenuItems ?
            <NavItem className="mx-3">
              <Link to="/socialMedia"><NavbarText>Hootsuite Post</NavbarText></Link>
            </NavItem>
            : null}
          {appAllowUserInteractions === true && (sessionToken === undefined || sessionToken === null || sessionToken === "") ?
            <NavItem className="mx-3">
              <Login />
            </NavItem>
            : null}
          {appAllowUserInteractions === true && (sessionToken === undefined || sessionToken === null || sessionToken === "") ?
            <NavItem className="mx-3">
              <Register />
            </NavItem>
            : null}
          {appAllowUserInteractions === true && userLoaded !== undefined && userLoaded !== null && userLoaded === true ?
            <NavItem className="mx-3">
              <EditUser />
            </NavItem>
            : null}
          <NavItem className="mx-3">
            <a href="https://pkdickbooks.com" target="_blank" rel="noopener noreferrer"><NavbarText>Philip K. Dick Bookshelf</NavbarText></a>
          </NavItem>
          <NavItem className="mx-3">
            <a href="https://philipdick.com"><NavbarText>Philip K. Dick Site</NavbarText></a>
          </NavItem>
          {appAllowUserInteractions === true && userLoaded !== undefined && userLoaded !== null && userLoaded === true && firstName !== undefined && firstName !== null && firstName !== "" && lastName !== undefined && lastName !== null && lastName !== "" ? <NavItem className="mx-3"><NavbarText>Welcome, {firstName} {lastName}.</NavbarText></NavItem>
            : null}
          {appAllowUserInteractions === true && checklistLoaded !== undefined && checklistLoaded !== null && checklistLoaded === true ?
            <NavItem className="mx-3">
              <Checklist displayButton={true} />
            </NavItem>
            : null}
          {appAllowUserInteractions === true && sessionToken !== undefined && sessionToken !== null && sessionToken !== "" ?
            <NavItem className="mx-3"><Button outline className="my-2" size="sm" color="info" onClick={() => logOut()}>Log Out</Button></NavItem>
            : null}
        </Nav>
      </Navbar>
      {showAllCategories || showAllMedia || showAllTitles || showAllEditions || showAllMenuItems ?
        <Navbar color="light" light>
          <Nav>
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
          </Nav>
        </Navbar>
        : null}

      {showCategoryList || showMediaList || showTitleList || showEditionList || showUserReviewList || showUserReviewRatingList || showURLList || showAddCategory || showAddMedia || showAddTitle || showAddEdition || showAllMenuItems ?
        <Navbar>
          <Nav>
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
            {showUserReviewList || showAllMenuItems ?
              <NavItem className="mx-3">
                <Link to="/userReviewList"><NavbarText>User Review List</NavbarText></Link>
              </NavItem>
              : null}
            {showUserReviewRatingList || showAllMenuItems ?
              <NavItem className="mx-3">
                <Link to="/userReviewRatingList"><NavbarText>User Review Rating List</NavbarText></Link>
              </NavItem>
              : null}
            {showURLList || showAllMenuItems ?
              <NavItem className="mx-3">
                <Link to="/urlList"><NavbarText>URL List</NavbarText></Link>
              </NavItem>
              : null}
            {showAddCategory && admin !== undefined && admin !== null && admin === true ?
              <NavItem className="mx-3">
                <AddCategory displayButton={true} />
              </NavItem>
              : null}
            {showAddMedia && admin !== undefined && admin !== null && admin === true ?
              <NavItem className="mx-3">
                <AddMedia displayButton={true} />
              </NavItem>
              : null}
            {showAddTitle && admin !== undefined && admin !== null && admin === true ?
              <NavItem className="mx-3">
                <AddTitle displayButton={true} />
              </NavItem>
              : null}
          </Nav>
        </Navbar>
        : null}

      {showUserPhysicalOnly || showUserElectronicOnly || showAllMenuItems ?
        <Navbar>
          <Nav>
            {(showUserPhysicalOnly === true || showUserElectronicOnly === true) && (userPhysicalOnly === true || userElectronicOnly === true) ?
              <NavItem className="mx-3"><Button outline className="my-2" size="sm" color="info" onClick={() => { dispatch(setUserPhysicalOnly(false)); dispatch(setUserElectronicOnly(false)); }}>All Editions</Button></NavItem>
              : null}
            {showUserPhysicalOnly === true && userPhysicalOnly !== undefined && userPhysicalOnly !== null && userPhysicalOnly === false ?
              <NavItem className="mx-3"><Button outline className="my-2" size="sm" color="info" onClick={() => { dispatch(setUserPhysicalOnly(true)); dispatch(setUserElectronicOnly(false)); }}>Only Physical Editions</Button></NavItem>
              : null}
            {showUserElectronicOnly === true && userElectronicOnly !== undefined && userElectronicOnly !== null && userElectronicOnly === false ?
              <NavItem className="mx-3"><Button outline className="my-2" size="sm" color="info" onClick={() => { dispatch(setUserPhysicalOnly(false)); dispatch(setUserElectronicOnly(true)); }}>Only Electronic Editions</Button></NavItem>
              : null}
          </Nav>
        </Navbar>
        : null}

      <Container className="bodyContainer mb-5">
        <Row>
          <Col xs="2">
            <Category />
            <Media />
          </Col>
          <Col xs="10">

            <Row className="text-center">
              {/* {linkItem !== undefined && linkItem !== null && linkItem.hasOwnProperty("linkName") ? <Alert color="info">{JSON.stringify(linkItem)}</Alert> : null} */}
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
              {checklistMessage !== undefined && checklistMessage !== null && checklistMessage !== "" ? <Alert color="info">{checklistMessage}</Alert> : null}
              {errChecklistMessage !== undefined && errChecklistMessage !== null && errChecklistMessage !== "" ? <Alert color="danger">{errChecklistMessage}</Alert> : null}
              <LoadAppSettings />
              <LoadBibliographyData />
              <LoadUserReviews />
            </Row>

            <Switch>

              {/* // * Set the default page from the defaultPageComponent from environment */}
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
              <Route exact path="/socialMedia" component={FormatPost} />
              <Route exact path="/homeopape" component={Homeopape} />
              <Route exact path="/dickian" component={Dickian} />
              <Route exact path="/categoryList" component={CategoryList} />
              <Route exact path="/mediaList" component={MediaList} />
              <Route exact path="/titleList" component={TitleList} />
              <Route exact path="/editionList" component={EditionList} />
              <Route exact path="/userReviewList" component={UserReviewList} />
              <Route exact path="/userReviewRatingList" component={UserReviewRatingList} />
              <Route exact path="/urlList" component={URLList} />
              <Route exact path="/categories" component={Category} />
              <Route exact path="/media" component={Media} />

              {/* // * This route no longer works. Fixed. */}
              <Route exact path="/titles" component={Titles} />
              {/* <Route exact path="/titles/:category" component={Titles} />
      <Route exact path="/title/:title" component={Title} /> */}

              {/* // * This route no longer works. Fixed. */}
              <Route exact path="/editions" component={Editions} />
              {/* <Route exact path="/editions/:title" component={Editions} /> */}
              {/* <Route exact path="/editions/:media" component={Editions} /> */}

              {/* // ! These need to stay at the bottom of the list so that the links above will work properly. */}
              {linkItem !== undefined && linkItem.hasOwnProperty("linkName") && linkItem.linkType === "category" ? <Route exact path="/:linkName" render={() => <Titles linkItem={linkItem} />} /> : null}
              {linkItem !== undefined && linkItem.hasOwnProperty("linkName") && linkItem.linkType === "title" ? <Route exact path="/:linkName" render={() => <Title linkItem={linkItem} />} /> : null}
              {linkItem !== undefined && linkItem.hasOwnProperty("linkName") && linkItem.linkType === "media" ? <Route exact path="/:linkName" render={() => <Editions linkItem={linkItem} />} /> : null}

            </Switch>
          </Col>
        </Row>
      </Container>

    </BrowserRouter>
  );
}

export default App;
