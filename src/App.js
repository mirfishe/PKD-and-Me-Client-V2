import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavbarText, Alert, Button } from "reactstrap";
import AppSettings from "./app/environment";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty } from "./utilities/SharedFunctions";
import { LogError } from "./utilities/AppFunctions";
import { setApplicationVersion, setCopyrightYear, setLocationLogged, addComputerLog, setAppOffline, setUserElectronicOnly, setUserPhysicalOnly } from "./app/appSlice";
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
// import AddTitle from "./components/titles/AddTitle";
import EditTitle from "./components/titles/EditTitle";
import Category from "./components/categories/Category";
import Media from "./components/media/Media";
import Titles from "./components/titles/Titles";
import Title from "./components/titles/Title";
import Editions from "./components/editions/Editions";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import EditUser from "./components/users/EditUser";
import Checklist from "./components/checklist/Checklist";
import UpdateFromTheHomeopape from "./components/fromTheHomeopape/UpdateFromTheHomeopape";
import AddComment from "./components/comments/AddComment";
import AddTitleSuggestion from "./components/titleSuggestion/AddTitleSuggestion";
import BrokenLinks from "./components/reports/BrokenLinks";
import ComputerLogs from "./components/reports/ComputerLogs";
import Logs from "./components/reports/Logs";
import Errors from "./components/reports/Errors";

function App(props) {

  const componentName = "App.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);
  const computerLog = useSelector(state => state.app.computerLog);
  const locationLogged = useSelector(state => state.app.locationLogged);

  const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

  const firstName = useSelector(state => state.user.firstName);
  // console.log(componentName, GetDateTime(), "firstName", firstName);
  const lastName = useSelector(state => state.user.lastName);
  // console.log(componentName, GetDateTime(), "lastName", lastName);

  // * Load settings from Redux slices. -- 03/06/2021 MF
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
  // console.log(componentName, GetDateTime(), "showNew", showNew);

  // * show New page unless set specifically to false. -- 03/06/2021 MF
  if (showNew !== false) {

    showNew = true;

  };

  let showAbout = useSelector(state => state.app.menuSettings.showAbout);
  // console.log(componentName, GetDateTime(), "showAbout", showAbout);

  // * show About page unless set specifically to false. -- 03/06/2021 MF
  if (showAbout !== false) {

    showAbout = true;

  };

  let showHomeopape = useSelector(state => state.app.menuSettings.showHomeopape);
  // console.log(componentName, GetDateTime(), "showHomeopape", showHomeopape);
  let showDickian = useSelector(state => state.app.menuSettings.showDickian);
  // console.log(componentName, GetDateTime(), "showDickian", showDickian);

  let showAddCategory = useSelector(state => state.app.menuSettings.showAddCategory);
  // console.log(componentName, GetDateTime(), "showAddCategory", showAddCategory);
  let showAddMedia = useSelector(state => state.app.menuSettings.showAddMedia);
  let showAddTitle = useSelector(state => state.app.menuSettings.showAddTitle);
  let showAddEdition = useSelector(state => state.app.menuSettings.showAddEdition);

  let showAllCategories = useSelector(state => state.app.menuSettings.showAllCategories);
  let showAllMedia = useSelector(state => state.app.menuSettings.showAllMedia);

  // ! This route no longer works. -- 03/06/2021 MF
  let showAllTitles = useSelector(state => state.app.menuSettings.showAllTitles);

  // ! This route no longer works. -- 03/06/2021 MF
  let showAllEditions = useSelector(state => state.app.menuSettings.showAllEditions);

  let showUserPhysicalOnly = useSelector(state => state.app.menuSettings.showUserPhysicalOnly);
  let showUserElectronicOnly = useSelector(state => state.app.menuSettings.showUserElectronicOnly);

  const urlLookup = useSelector(state => state.urls.arrayURLs);
  const pageURL = useSelector(state => state.urls.pageURL);
  const linkItem = useSelector(state => state.urls.linkItem);

  const categoryListState = useSelector(state => state.categories.arrayCategories);

  // ! Loading the routerBaseName from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const routerBaseName = useSelector(state => state.app.routerBaseName);
  const routerBaseName = AppSettings.routerBaseName;

  // ! Loading the defaultPageComponent from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
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

  const [url1Loaded, setURL1Loaded] = useState(false);
  const [url2Loaded, setURL2Loaded] = useState(false);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect props.applicationVersion", props.applicationVersion);

    if (IsEmpty(props.applicationVersion) === false) {

      dispatch(setApplicationVersion(props.applicationVersion));

    };

  }, [props.applicationVersion]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect props.copyrightYear", props.copyrightYear);

    if (IsEmpty(props.copyrightYear) === false) {

      dispatch(setCopyrightYear(props.copyrightYear));

    };

  }, [props.copyrightYear]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect window", window);
    // console.log(componentName, GetDateTime(), "useEffect navigator", navigator);

    // console.log(componentName, GetDateTime(), "useEffect window.location", window.location);
    // console.log(componentName, GetDateTime(), "useEffect window.clientinformation", window.clientinformation);

    if (locationLogged === false) {

      // * Only has the IP Address -- 07/29/2021 MF
      // * https://api.ipify.org?format=json -- 07/29/2021 MF

      // let url = "";
      let response = "";
      let data = "";
      let operationValue1 = "Fetching User IP https://geolocation-db.com/json/";

      // * Doesn't have the city, state and postal code anymore for some reason. -- 07/29/2021 MF
      let url1 = "https://geolocation-db.com/json/";

      fetch(url1)
        .then(response => {

          return response.json();

        }).then((results) => {
          // console.log(componentName, GetDateTime(), operationValue1, "results", results);

          data = results;

          // {"country_code":"US","country_name":"United States","city":null,"postal":null,"latitude":37.751,"longitude":-97.822,"IPv4":"65.132.108.210","state":null}

          dispatch(addComputerLog(results));

          setURL1Loaded(true);

        })
        .catch((error) => {
          // console.error(componentName, GetDateTime(), operationValue1, "error", error);

          setURL1Loaded(true);

        });

      let operationValue2 = "Fetching User IP https://api.db-ip.com/v2/free/self";

      let url2 = "https://api.db-ip.com/v2/free/self";

      fetch(url2)
        .then(response => {

          return response.json();

        }).then((results) => {
          // console.log(componentName, GetDateTime(), operationValue2, "results", results);

          data = results;

          //   {
          //     "ipAddress": "47.227.241.250",
          //     "continentCode": "NA",
          //     "continentName": "North America",
          //     "countryCode": "US",
          //     "countryName": "United States",
          //     "stateProvCode": "IN",
          //     "stateProv": "Indiana",
          //     "city": "Carmel"
          // }

          if (IsEmpty(data.error) === true) {

            dispatch(addComputerLog(results));

          } else {
            // console.error(componentName, GetDateTime(), operationValue2, "data.error", data.error);
            // console.error(componentName, GetDateTime(), operationValue2, "data.errorCode", data.errorCode);

          };

          setURL2Loaded(true);

        })
        .catch((error) => {
          // console.error(componentName, GetDateTime(), operationValue2, "error", error);

          setURL2Loaded(true);

        });

    };

  }, []);


  const saveRecord = () => {
    // console.log(componentName, GetDateTime(), "saveRecord computerLog", computerLog);
    // console.log(componentName, GetDateTime(), "saveRecord title", title);
    // console.log(componentName, GetDateTime(), "saveRecord window.location.href", window.location.href);

    let ipAddress = IsEmpty(computerLog) === false && IsEmpty(computerLog.ipAddress) === false ? computerLog.ipAddress : "";
    let city = IsEmpty(computerLog) === false && IsEmpty(computerLog.city) === false ? computerLog.city : "";
    // let state = IsEmpty(computerLog) === false && IsEmpty(computerLog.stateProv) === false ? computerLog.stateProv : "";
    let state = IsEmpty(computerLog) === false && IsEmpty(computerLog.state) === false ? computerLog.state : "";
    let countryCode = IsEmpty(computerLog) === false && IsEmpty(computerLog.countryCode) === false ? computerLog.countryCode : "";
    let countryName = IsEmpty(computerLog) === false && IsEmpty(computerLog.countryName) === false ? computerLog.countryName : "";
    let continentCode = IsEmpty(computerLog) === false && IsEmpty(computerLog.continentCode) === false ? computerLog.continentCode : "";
    let continentName = IsEmpty(computerLog) === false && IsEmpty(computerLog.continentName) === false ? computerLog.continentName : "";
    let stateProvCode = IsEmpty(computerLog) === false && IsEmpty(computerLog.stateProvCode) === false ? computerLog.stateProvCode : "";

    let latitude = IsEmpty(computerLog) === false && IsEmpty(computerLog.latitude) === false ? computerLog.latitude : "";
    let longitude = IsEmpty(computerLog) === false && IsEmpty(computerLog.longitude) === false ? computerLog.longitude : "";
    let postal = IsEmpty(computerLog) === false && IsEmpty(computerLog.postal) === false ? computerLog.postal : "";

    let href = IsEmpty(window.location.href) === false ? window.location.href : "";

    let url = baseURL + "computerLogs/";
    let response = "";
    let data = "";
    let operationValue = "Update Computer Log";

    let recordObject = {};

    recordObject = {

      title: "Homepage",
      href: href,
      applicationVersion: props.applicationVersion,

      lastAccessed: GetDateTime(),

      // * For https://api.db-ip.com/v2/free/self -- 07/29/2021 MF
      ipAddress: ipAddress,
      city: city,
      // state: stateProv,
      state: state,
      countryCode: countryCode,
      countryName: countryName,
      continentCode: continentCode,
      continentName: continentName,
      stateCode: stateProvCode,

      // * From https://geolocation-db.com/json/ -- 07/29/2021 MF
      latitude: latitude,
      longitude: longitude,
      postal: postal

    };

    // console.log(componentName, GetDateTime(), "saveRecord recordObject", recordObject);

    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ recordObject: recordObject })
    })
      .then(response => {
        // console.log(componentName, GetDateTime(), "saveRecord response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);

        } else {

          if (response.status === 200) {

            return response.json();

          } else {

            return response.status;

          };

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "saveRecord results", results);

        data = results;

        dispatch(setLocationLogged(true));

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), operationValue, "saveRecord error", error);

        // addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect computerLog", computerLog);
    // console.log(componentName, GetDateTime(), "useEffect latitude", latitude);
    // console.log(componentName, GetDateTime(), "useEffect longitude", longitude);
    // console.log(componentName, GetDateTime(), "useEffect postalCode", postalCode);

    if (url1Loaded === true && url2Loaded === true) {

      if (locationLogged === false) {

        saveRecord();

      };

      setURL1Loaded(false);
      setURL2Loaded(false);

    };

  }, [computerLog, /*latitude, longitude, postalCode*/ url1Loaded, url2Loaded]);


  const clearToken = () => {

    localStorage.clear();
    // setSessionToken("");
    // console.log(componentName, GetDateTime(), "clearToken localStorage token", localStorage.getItem("token"));
    // console.log(componentName, GetDateTime(), "sessionToken", sessionToken); // Never shows the current value of sessionToken
    // console.log(componentName, GetDateTime(), "clearToken User logged out.");

  };


  const logOut = () => {
    // * Remove user from userSlice. -- 03/06/2021 MF

    dispatch(loadUserData({ userID: null, firstName: null, lastName: null, email: null, updatedBy: null, admin: null, active: null, sessionToken: null, userLoaded: false, arrayChecklist: [], checklistLoaded: false, lastDatabaseRetrievalChecklist: null }));
    dispatch(setSessionToken(null));
    clearToken();

    // * Reload/refresh page. -- 03/06/2021 MF

  };


  const getUser = (token) => {
    // console.log(componentName, GetDateTime(), "getUser baseURL", baseURL);

    clearMessages();

    let url = baseURL + "users/";

    if (IsEmpty(token) === false) {

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": token
        }),
      })
        .then(response => {
          // console.log(componentName, GetDateTime(), "getUser response", response);

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
        .then(results => {
          // console.log(componentName, GetDateTime(), "getUser results", results);

          setUserResultsFound(results.resultsFound);
          // addMessage(results.message);

          if (IsEmpty(results) === false && results.resultsFound === true) {

            if (results.active === true || results.active === 1) {

              dispatch(loadUserData(results));

              // console.log(componentName, GetDateTime(), "getUser checklistLoaded", checklistLoaded);
              // console.log(componentName, GetDateTime(), "getUser results.sessionToken", results.sessionToken);
              // console.log(componentName, GetDateTime(), "getUser token", token);

              if (!checklistLoaded) {

                getChecklist(token);

              };

            } else {
              // * Won't hit this because no records will be returned if the user is not active. -- 03/06/2021 MF

              logOut();

            };

          } else {
            // console.log(componentName, GetDateTime(), "getUser results.resultsFound !== true", results.message);

            // addErrorMessage(results.message);
            logOut();

          };

        })
        .catch((error) => {
          console.error(componentName, GetDateTime(), "getUser error", error);
          // console.error(componentName, GetDateTime(), "getUser error.name", error.name);
          // console.error(componentName, GetDateTime(), "getUser error.message", error.message);

          // addErrorMessage(error.name + ": " + error.message);

          // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const getChecklist = (token) => {
    // console.log(componentName, GetDateTime(), "getChecklist baseURL", baseURL);
    // console.log(componentName, GetDateTime(), "getChecklist token", token);

    setChecklistMessage("");
    setErrChecklistMessage("");
    setChecklistResultsFound(null);

    let url = baseURL + "titles/checklist";

    if (IsEmpty(token) === false) {

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": token
        }),
      })
        .then(response => {
          // console.log(componentName, GetDateTime(), "getChecklist response", response);

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
        .then(results => {
          // console.log(componentName, GetDateTime(), "getChecklist results", results);

          setChecklistResultsFound(results.resultsFound);
          // setChecklistMessage(results.message);

          if (IsEmpty(results) === false && results.resultsFound === true) {

            dispatch(loadArrayChecklist(results.records));

          } else {
            console.log(componentName, GetDateTime(), "getChecklist resultsFound error", results.message);

            // addErrorMessage(results.message);

          };

        })
        .catch((error) => {
          console.error(componentName, GetDateTime(), "getChecklist error", error);
          // console.error(componentName, GetDateTime(), "getChecklist error.name", error.name);
          // console.error(componentName, GetDateTime(), "getChecklist error.message", error.message);

          // addErrorMessage(error.name + ": " + error.message);

          // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  useEffect(() => {

    if (appAllowUserInteractions === true && IsEmpty(localStorage.getItem("token")) === false) {

      dispatch(setSessionToken(localStorage.getItem("token")));
      // console.log(componentName, GetDateTime(), "componentDidMount localStorage token", localStorage.getItem("token"));
      // console.log(componentName, GetDateTime(), "componentDidMount state.sessionToken", state.sessionToken); // Never shows the current value of sessionToken

      // ! Doesn't store if the user is active or is an admin. -- 03/06/2021 MF
      // ! Doesn't store the userID except inside the sessionToken hash. -- 03/06/2021 MF
      // * ########## TEMPORARY ##########
      // setUserID(1);
      // setIsAdmin(true);

      // * Fetch from the API to check these. -- 03/06/2021 MF
      if (!userLoaded) {

        getUser(localStorage.getItem("token"));

      };

      // * Moved to the getUser function. -- 03/06/2021 MF
      // if (!checklistLoaded) {

      //   getChecklist(localStorage.getItem("token"));

      // };

    };

    let documentURL = new URL(document.URL);
    dispatch(setPageURL(documentURL.pathname.replaceAll(routerBaseName, "").replaceAll("/", "")));

  }, []);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect categoriesDataOffline", categoriesDataOffline);
    // console.log(componentName, GetDateTime(), "useEffect mediaDataOffline", mediaDataOffline);
    // console.log(componentName, GetDateTime(), "useEffect titlesDataOffline", titlesDataOffline);
    // console.log(componentName, GetDateTime(), "useEffect editionsDataOffline", editionsDataOffline);

    if (categoriesDataOffline && mediaDataOffline && titlesDataOffline && editionsDataOffline) {

      dispatch(setAppOffline(true));

    };

  }, [categoriesDataOffline, mediaDataOffline, titlesDataOffline, editionsDataOffline]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect pageURL", pageURL);
    // console.log(componentName, GetDateTime(), "useEffect pageURL.replaceAll(\"/\", \"\")", pageURL.replaceAll("/", ""));

    if (IsEmpty(pageURL) === false) {

      let linkArrayItem = {};

      for (let i = 0; i < urlLookup.length; i++) {

        linkArrayItem = urlLookup.find(linkName => linkName.linkName === pageURL.replaceAll("/", ""));
        // console.log(componentName, GetDateTime(), "useEffect linkArrayItem", linkArrayItem);
        // setLinkItem(linkArrayItem);

      };

      // console.log(componentName, GetDateTime(), "useEffect linkArrayItem", linkArrayItem);
      // console.log(componentName, GetDateTime(), "useEffect typeof linkArrayItem", typeof linkArrayItem);
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

          {appAllowUserInteractions === true && (IsEmpty(sessionToken) === true) ?

            <NavItem className="mx-3">
              <Login />
            </NavItem>

            : null}

          {appAllowUserInteractions === true && (IsEmpty(sessionToken) === true) ?

            <NavItem className="mx-3">
              <Register />
            </NavItem>

            : null}

          {appAllowUserInteractions === true && IsEmpty(userLoaded) === false && userLoaded === true ?

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

          {appAllowUserInteractions === true && IsEmpty(userLoaded) === false && userLoaded === true && IsEmpty(firstName) === false && IsEmpty(lastName) === false ?

            <NavItem className="mx-3"><NavbarText>Welcome, {firstName} {lastName}.</NavbarText></NavItem>

            : null}

          {appAllowUserInteractions === true && IsEmpty(checklistLoaded) === false && checklistLoaded === true ?

            <NavItem className="mx-3">
              <Checklist displayButton={true} />
            </NavItem>

            : null}

          {appAllowUserInteractions === true && IsEmpty(sessionToken) === false ?

            <NavItem className="mx-3"><AddTitleSuggestion displayButton={true} />
            </NavItem>
            : null}

          {appAllowUserInteractions === true && IsEmpty(sessionToken) === false ?

            <NavItem className="mx-3"><AddComment displayButton={true} />
            </NavItem>
            : null}

          {appAllowUserInteractions === true && IsEmpty(sessionToken) === false ?

            <NavItem className="mx-3"><Button outline className="my-2" size="sm" color="info" onClick={() => logOut()}>Log Out</Button></NavItem>
            : null}

        </Nav>
      </Navbar>

      {IsEmpty(admin) === false && admin === true ?

        <Navbar>
          <Nav>

            <NavItem className="mx-3">
              <Link to="/fromTheHomeopape"><NavbarText>From The Homeopape</NavbarText></Link>
            </NavItem>

            <NavItem className="mx-3">
              <Link to="/socialMedia"><NavbarText>Hootsuite Post</NavbarText></Link>
            </NavItem>

          </Nav>
        </Navbar>

        : null}

      {IsEmpty(admin) === false && admin === true ?

        <Navbar>
          <Nav>

            <NavItem className="mx-3">
              <Link to="/brokenLinks"><NavbarText>Broken Links</NavbarText></Link>
            </NavItem>

            <NavItem className="mx-3">
              <Link to="/computerLogs"><NavbarText>Computer Logs</NavbarText></Link>
            </NavItem>

            <NavItem className="mx-3">
              <Link to="/logs"><NavbarText>Logs</NavbarText></Link>
            </NavItem>

            <NavItem className="mx-3">
              <Link to="/errors"><NavbarText>Errors</NavbarText></Link>
            </NavItem>

          </Nav>
        </Navbar>

        : null}

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

      {showAddCategory || showAddMedia || showAddTitle || showAddEdition || showAllMenuItems ?

        <Navbar>
          <Nav>

            {showAddCategory && IsEmpty(admin) === false && admin === true ?

              <NavItem className="mx-3">
                <AddCategory displayButton={true} />
              </NavItem>

              : null}

            {showAddMedia && IsEmpty(admin) === false && admin === true ?

              <NavItem className="mx-3">
                <AddMedia displayButton={true} />
              </NavItem>

              : null}

            {showAddTitle && IsEmpty(admin) === false && admin === true ?

              <NavItem className="mx-3">
                {/* <AddTitle displayButton={true} /> */}
                <EditTitle displayButton={true} />
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

            {showUserPhysicalOnly === true && IsEmpty(userPhysicalOnly) === false && userPhysicalOnly === false ?

              <NavItem className="mx-3"><Button outline className="my-2" size="sm" color="info" onClick={() => { dispatch(setUserPhysicalOnly(true)); dispatch(setUserElectronicOnly(false)); }}>Only Physical Editions</Button></NavItem>

              : null}

            {showUserElectronicOnly === true && IsEmpty(userElectronicOnly) === false && userElectronicOnly === false ?

              <NavItem className="mx-3"><Button outline className="my-2" size="sm" color="info" onClick={() => { dispatch(setUserPhysicalOnly(false)); dispatch(setUserElectronicOnly(true)); }}>Only Electronic Editions</Button></NavItem>

              : null}

          </Nav>
        </Navbar>

        : null}

      <Container className="bodyContainer mb-5">
        <Row>
          <Col xs="2">

            {IsEmpty(categoryListState) === false ? <Category /> : null}

            <Media />

          </Col>
          <Col xs="10">

            <Row className="text-center">

              {/* {IsEmpty(linkItem) === false && HasNonEmptyProperty(linkItem, "linkName") ? <Alert color="info">{JSON.stringify(linkItem)}</Alert> : null} */}

              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

              {IsEmpty(checklistMessage) === false ? <Alert color="info">{checklistMessage}</Alert> : null}
              {IsEmpty(errChecklistMessage) === false ? <Alert color="danger">{errChecklistMessage}</Alert> : null}

              <LoadAppSettings />
              <LoadBibliographyData />
              <LoadUserReviews />

            </Row>

            <Switch>

              {/* // * Set the default page from the defaultPageComponent from environment. -- 03/06/2021 MF */}
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

              {/* // ! Can't add this security to the routes because it interferes with the routes below these. -- 12/19/2021 MF */}
              {/* {IsEmpty(admin) === false && admin === true ?

                <React.Fragment> */}

              <Route exact path="/socialMedia" component={FormatPost} />

              <Route exact path="/fromTheHomeopape" component={UpdateFromTheHomeopape} />

              <Route exact path="/brokenLinks" component={BrokenLinks} />

              <Route exact path="/computerLogs" component={ComputerLogs} />

              <Route exact path="/logs" component={Logs} />

              <Route exact path="/errors" component={Errors} />

              {/* </React.Fragment>

                : null} */}

              <Route exact path="/dickian" component={Dickian} />

              <Route exact path="/categories" component={Category} />
              <Route exact path="/media" component={Media} />

              {/* // * This route no longer works. Fixed. -- 03/06/2021 MF */}
              <Route exact path="/titles" component={Titles} />
              {/* <Route exact path="/titles/:category" component={Titles} />
      <Route exact path="/title/:title" component={Title} /> */}

              {/* // * This route no longer works. Fixed. -- 03/06/2021 MF */}
              <Route exact path="/editions" component={Editions} />
              {/* <Route exact path="/editions/:title" component={Editions} /> */}
              {/* <Route exact path="/editions/:media" component={Editions} /> */}

              {/* // ! These need to stay at the bottom of the list so that the links above will work properly. -- 03/06/2021 MF */}
              {IsEmpty(linkItem) === false && HasNonEmptyProperty(linkItem, "linkName") && linkItem.linkType === "categories" ? <Route exact path="/:linkName" render={() => <Titles linkItem={linkItem} />} /> : null}

              {IsEmpty(linkItem) === false && HasNonEmptyProperty(linkItem, "linkName") && linkItem.linkType === "titles" ? <Route exact path="/:linkName" render={() => <Title linkItem={linkItem} />} /> : null}

              {IsEmpty(linkItem) === false && HasNonEmptyProperty(linkItem, "linkName") && linkItem.linkType === "media" ? <Route exact path="/:linkName" render={() => <Editions linkItem={linkItem} />} /> : null}

            </Switch>

            {/* {process.env.NODE_ENV === "development" ? <FromTheHomeopape /> : null} */}

          </Col>
        </Row>
        <Row>
          <Col xs="12" className="smallerText text-center">

            &copy; {props.copyrightYear} All rights reserved. Version: {props.applicationVersion}

          </Col>
        </Row>
      </Container>

    </BrowserRouter>
  );
}

export default App;
