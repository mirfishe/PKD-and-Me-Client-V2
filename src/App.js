import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { HouseFill } from "react-bootstrap-icons";
import { Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavLink, NavbarText, Alert, Button } from "reactstrap";
import applicationSettings from "./app/environment";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty } from "./utilities/SharedFunctions";
import { LogError } from "./utilities/ApplicationFunctions";
import { /* setApplicationVersion, setCopyrightYear, */ setLocationLogged, addComputerLog, setApplicationOffline, setUserElectronicOnly, setUserPhysicalOnly } from "./app/applicationSettingsSlice";
import { setPageURL, setLinkItem } from "./app/urlsSlice";
import LoadApplicationSettings from "./components/loadData/LoadApplicationSettings";
import LoadBibliographyData from "./components/loadData/LoadBibliographyData";
import LoadUserReviews from "./components/loadData/LoadUserReviews";
import { loadUserData, setSessionToken, loadArrayChecklist } from "./app/userSlice";
import Home from "./content/Home";
import New from "./content/New";
import About from "./content/About";
import Homeopape from "./content/Homeopape";
import Dickian from "./content/Dickian";
import FormatPost from "./components/socialMedia/FormatPost";
import EditCategory from "./components/categories/EditCategory";
import EditMedia from "./components/media/EditMedia";
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
import TitleSuggestions from "./components/titleSuggestion/TitleSuggestions";
import Comments from "./components/comments/Comments";
import AddTitleSuggestion from "./components/titleSuggestion/AddTitleSuggestion";
import BrokenLinks from "./components/reports/BrokenLinks";
import ComputerLogs from "./components/reports/ComputerLogs";
import Logs from "./components/reports/Logs";
import Errors from "./components/reports/Errors";

function App() {

  const componentName = "App.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);
  const computerLog = useSelector(state => state.applicationSettings.computerLog);
  const locationLogged = useSelector(state => state.applicationSettings.locationLogged);

  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

  const firstName = useSelector(state => state.user.firstName);
  // console.log(componentName, GetDateTime(), "firstName", firstName);
  const lastName = useSelector(state => state.user.lastName);
  // console.log(componentName, GetDateTime(), "lastName", lastName);

  // * Load settings from Redux slices. -- 03/06/2021 MF
  const categoriesDataOffline = useSelector(state => state.categories.categoriesDataOffline);
  const mediaDataOffline = useSelector(state => state.media.mediaDataOffline);
  const titlesDataOffline = useSelector(state => state.titles.titlesDataOffline);
  const editionsDataOffline = useSelector(state => state.editions.editionsDataOffline);

  const electronicOnly = useSelector(state => state.applicationSettings.electronicOnly);
  const userElectronicOnly = useSelector(state => state.applicationSettings.userElectronicOnly);
  const physicalOnly = useSelector(state => state.applicationSettings.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.applicationSettings.userPhysicalOnly);

  const userLoaded = useSelector(state => state.user.userLoaded);
  const checklistLoaded = useSelector(state => state.user.checklistLoaded);

  let showAllMenuItems = useSelector(state => state.applicationSettings.menuSettings.showAllMenuItems);

  let showNew = useSelector(state => state.applicationSettings.menuSettings.showNew);
  // console.log(componentName, GetDateTime(), "showNew", showNew);

  // * show New page unless set specifically to false. -- 03/06/2021 MF
  if (showNew !== false) {

    showNew = true;

  };

  let showAbout = useSelector(state => state.applicationSettings.menuSettings.showAbout);
  // console.log(componentName, GetDateTime(), "showAbout", showAbout);

  // * show About page unless set specifically to false. -- 03/06/2021 MF
  if (showAbout !== false) {

    showAbout = true;

  };

  let showHomeopape = useSelector(state => state.applicationSettings.menuSettings.showHomeopape);
  // console.log(componentName, GetDateTime(), "showHomeopape", showHomeopape);
  let showDickian = useSelector(state => state.applicationSettings.menuSettings.showDickian);
  // console.log(componentName, GetDateTime(), "showDickian", showDickian);

  let showEditCategory = useSelector(state => state.applicationSettings.menuSettings.showEditCategory);
  // console.log(componentName, GetDateTime(), "showEditCategory", showEditCategory);
  let showEditMedia = useSelector(state => state.applicationSettings.menuSettings.showEditMedia);
  let showEditTitle = useSelector(state => state.applicationSettings.menuSettings.showEditTitle);
  let showEditEdition = useSelector(state => state.applicationSettings.menuSettings.showEditEdition);

  let showAllCategories = useSelector(state => state.applicationSettings.menuSettings.showAllCategories);
  let showAllMedia = useSelector(state => state.applicationSettings.menuSettings.showAllMedia);

  // ! This route no longer works. -- 03/06/2021 MF
  let showAllTitles = useSelector(state => state.applicationSettings.menuSettings.showAllTitles);

  // ! This route no longer works. -- 03/06/2021 MF
  let showAllEditions = useSelector(state => state.applicationSettings.menuSettings.showAllEditions);

  let showUserPhysicalOnly = useSelector(state => state.applicationSettings.menuSettings.showUserPhysicalOnly);
  let showUserElectronicOnly = useSelector(state => state.applicationSettings.menuSettings.showUserElectronicOnly);

  const urlLookup = useSelector(state => state.urls.arrayURLs);
  const pageURL = useSelector(state => state.urls.pageURL);
  const linkItem = useSelector(state => state.urls.linkItem);

  const categoryListState = useSelector(state => state.categories.arrayCategories);

  // ! Loading the routerBaseName from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const routerBaseName = useSelector(state => state.applicationSettings.routerBaseName);
  const routerBaseName = applicationSettings.routerBaseName;

  // ! Loading the defaultPageComponent from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const defaultPageComponent = useSelector(state => state.applicationSettings.defaultPageComponent);
  const defaultPageComponent = applicationSettings.defaultPageComponent;

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


  // useEffect(() => {
  //   // console.log(componentName, GetDateTime(), "useEffect props.applicationVersion", props.applicationVersion);

  //   if (IsEmpty(props.applicationVersion) === false) {

  //     dispatch(setApplicationVersion(props.applicationVersion));

  //   };

  // }, [props.applicationVersion]);


  // useEffect(() => {
  //   // console.log(componentName, GetDateTime(), "useEffect props.copyrightYear", props.copyrightYear);

  //   if (IsEmpty(props.copyrightYear) === false) {

  //     dispatch(setCopyrightYear(props.copyrightYear));

  //   };

  // }, [props.copyrightYear]);


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
      // applicationVersion: props.applicationVersion,
      applicationVersion: process.env.REACT_APP_VERSION,

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

          setUserResultsFound(results.transactionSuccess);
          // addMessage(results.message);

          if (IsEmpty(results) === false && results.transactionSuccess === true) {

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
            // console.log(componentName, GetDateTime(), "getUser results.transactionSuccess !== true", results.message);

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

          setChecklistResultsFound(results.transactionSuccess);
          // setChecklistMessage(results.message);

          if (IsEmpty(results) === false && results.transactionSuccess === true) {

            dispatch(loadArrayChecklist(results.records));

          } else {
            console.log(componentName, GetDateTime(), "getChecklist error", results.message);

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

    if (applicationAllowUserInteractions === true && IsEmpty(localStorage.getItem("token")) === false) {

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

      dispatch(setApplicationOffline(true));

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

          {/* <NavbarBrand href="/">
            <HouseFill color="black" />
          </NavbarBrand> */}

          <NavItem>
            <NavLink tag={Link} to="/"><NavbarText>Home</NavbarText></NavLink>
          </NavItem>

          {showHomeopape === true || showAllMenuItems === true ?

            <NavItem>
              <NavLink tag={Link} to="/homeopape"><NavbarText>Homeopape</NavbarText></NavLink>
            </NavItem>

            : null}

          {showDickian === true || showAllMenuItems === true ?

            <NavItem>
              <NavLink tag={Link} to="/dickian"><NavbarText>Dickian</NavbarText></NavLink>
            </NavItem>

            : null}

          {showNew === true || showAllMenuItems === true ?

            <NavItem>
              <NavLink tag={Link} to="/new"><NavbarText>New To Philip K. Dick?</NavbarText></NavLink>
            </NavItem>

            : null}

          {showAbout === true || showAllMenuItems === true ?

            <NavItem>
              <NavLink tag={Link} to="/about"><NavbarText>About Philip K. Dick</NavbarText></NavLink>
            </NavItem>

            : null}

          {applicationAllowUserInteractions === true && (IsEmpty(sessionToken) === true) ?

            <NavItem>
              <Login />
            </NavItem>

            : null}

          {applicationAllowUserInteractions === true && (IsEmpty(sessionToken) === true) ?

            <NavItem>
              <Register />
            </NavItem>

            : null}

          {applicationAllowUserInteractions === true && IsEmpty(userLoaded) === false && userLoaded === true ?

            <NavItem>
              <EditUser />
            </NavItem>

            : null}

          <NavItem className="mx-3 my-2">
            <a href="https://pkdickbooks.com" target="_blank" rel="noopener noreferrer"><NavbarText>Philip K. Dick Bookshelf</NavbarText></a>
          </NavItem>

          <NavItem className="mx-3 my-2">
            <a href="https://philipdick.com" target="_blank" rel="noopener noreferrer"><NavbarText>Philip K. Dick Site</NavbarText></a>
          </NavItem>

          {/* {applicationAllowUserInteractions === true && IsEmpty(userLoaded) === false && userLoaded === true && IsEmpty(firstName) === false && IsEmpty(lastName) === false ?

            <NavItem><NavbarText>Welcome, {firstName} {lastName}.</NavbarText></NavItem>

            : null} */}

          {applicationAllowUserInteractions === true && IsEmpty(checklistLoaded) === false && checklistLoaded === true ?

            <NavItem>
              <Checklist displayButton={true} />
            </NavItem>

            : null}

          {applicationAllowUserInteractions === true && IsEmpty(sessionToken) === false ?

            <NavItem>
              <AddTitleSuggestion displayButton={true} />
            </NavItem>

            : null}

          {applicationAllowUserInteractions === true && IsEmpty(sessionToken) === false ?

            <NavItem>
              <AddComment displayButton={true} />
            </NavItem>

            : null}

          {applicationAllowUserInteractions === true && IsEmpty(sessionToken) === false ?

            <NavItem>
              <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={() => logOut()}>Log Out</Button></span>
            </NavItem>

            : null}

        </Nav>
      </Navbar>

      {applicationAllowUserInteractions === true && IsEmpty(admin) === false && admin === true ?

        <Navbar>
          <Nav>

            <NavItem>
              <NavLink tag={Link} to="/fromTheHomeopape"><NavbarText>From The Homeopape</NavbarText></NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/socialMedia"><NavbarText>Hootsuite Post</NavbarText></NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/brokenLinks"><NavbarText>Broken Links</NavbarText></NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/computerLogs"><NavbarText>Computer Logs</NavbarText></NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/logs"><NavbarText>Logs</NavbarText></NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/errors"><NavbarText>Errors</NavbarText></NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/titleSuggestions"><NavbarText>Title Suggestions</NavbarText></NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/comments"><NavbarText>Comments</NavbarText></NavLink>
            </NavItem>

          </Nav>
        </Navbar>

        : null}

      {showAllCategories === true || showAllMedia === true || showAllTitles === true || showAllEditions === true || showAllMenuItems === true ?

        <Navbar>
          <Nav>

            {showAllCategories === true || showAllMenuItems === true ?

              <NavItem>
                <NavLink tag={Link} to="/categories"><NavbarText>All Categories</NavbarText></NavLink>
              </NavItem>

              : null}

            {showAllMedia === true || showAllMenuItems === true ?

              <NavItem>
                <NavLink tag={Link} to="/media"><NavbarText>All Media</NavbarText></NavLink>
              </NavItem>

              : null}

            {showAllTitles === true || showAllMenuItems === true ?

              <NavItem>
                <NavLink tag={Link} to="/titles"><NavbarText>All Titles</NavbarText></NavLink>
              </NavItem>

              : null}

            {showAllEditions === true || showAllMenuItems === true ?

              <NavItem>
                <NavLink tag={Link} to="/editions"><NavbarText>All Editions</NavbarText></NavLink>
              </NavItem>

              : null}

          </Nav>
        </Navbar>

        : null}

      {(showEditCategory === true || showEditMedia === true || showEditTitle === true || showEditEdition === true || showAllMenuItems === true) && IsEmpty(admin) === false && admin === true ?

        <Navbar>
          <Nav>

            {showEditCategory && IsEmpty(admin) === false && admin === true ?

              <NavItem>
                <EditCategory displayButton={true} />
              </NavItem>

              : null}

            {showEditMedia && IsEmpty(admin) === false && admin === true ?

              <NavItem>
                <EditMedia displayButton={true} />
              </NavItem>

              : null}

            {showEditTitle && IsEmpty(admin) === false && admin === true ?

              <NavItem>
                {/* <AddTitle displayButton={true} /> */}
                <EditTitle displayButton={true} />
              </NavItem>

              : null}

          </Nav>
        </Navbar>

        : null}

      {(showUserPhysicalOnly === true || showUserElectronicOnly === true || showAllMenuItems === true) && IsEmpty(admin) === false && admin === true ?

        <Navbar>
          <Nav>

            {(showUserPhysicalOnly === true || showUserElectronicOnly === true) && (userPhysicalOnly === true || userElectronicOnly === true) ?

              <NavItem>
                <Button outline className="my-2" size="sm" color="info" onClick={() => { dispatch(setUserPhysicalOnly(false)); dispatch(setUserElectronicOnly(false)); }}>All Editions</Button>
              </NavItem>

              : null}

            {showUserPhysicalOnly === true && IsEmpty(userPhysicalOnly) === false && userPhysicalOnly === false ?

              <NavItem>
                <Button outline className="my-2" size="sm" color="info" onClick={() => { dispatch(setUserPhysicalOnly(true)); dispatch(setUserElectronicOnly(false)); }}>Only Physical Editions</Button>
              </NavItem>

              : null}

            {showUserElectronicOnly === true && IsEmpty(userElectronicOnly) === false && userElectronicOnly === false ?

              <NavItem>
                <Button outline className="my-2" size="sm" color="info" onClick={() => { dispatch(setUserPhysicalOnly(false)); dispatch(setUserElectronicOnly(true)); }}>Only Electronic Editions</Button>
              </NavItem>

              : null}

          </Nav>
        </Navbar>

        : null}

      <Container className="body-container mb-5">
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

              <LoadApplicationSettings />
              <LoadBibliographyData />
              <LoadUserReviews />

            </Row>

            <Routes>

              {/* // * Set the default page from the defaultPageComponent from environment. -- 03/06/2021 MF */}
              {defaultPageComponent === "Home" ? <Route path="/" element={<Home />} /> : null}
              {defaultPageComponent === "About" ? <Route path="/" element={<About />} /> : null}
              {defaultPageComponent === "Homeopape" ? <Route path="/" element={<Homeopape />} /> : null}
              {defaultPageComponent === "Dickian" ? <Route path="/" element={<Dickian />} /> : null}

              {/* <Route path="/">
                {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
                {defaultPageComponent === "Home" ? <Route path="/" element={<Home />}  /> : null}
                {defaultPageComponent === "About" ? <Route path="/" element={<About />}  /> : null}
                {defaultPageComponent === "Homeopape" ? <Route path="/" element={<Homeopape />}  /> : null}
              </Route> */}

              <Route path="/home" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/about" element={<About />} />
              <Route path="/homeopape" element={<Homeopape />} />

              {/* // ! Can't add this security to the routes because it interferes with the routes below these. -- 12/19/2021 MF */}
              {/* {IsEmpty(admin) === false && admin === true ?

                <React.Fragment> */}

              <Route path="/socialMedia" element={<FormatPost />} />

              <Route path="/fromTheHomeopape" element={<UpdateFromTheHomeopape />} />

              <Route path="/brokenLinks" element={<BrokenLinks />} />

              <Route path="/computerLogs" element={<ComputerLogs />} />

              <Route path="/logs" element={<Logs />} />

              <Route path="/errors" element={<Errors />} />

              <Route path="/comments" element={<Comments />} />

              <Route path="/titleSuggestions" element={<TitleSuggestions />} />

              {/* </React.Fragment>

                : null} */}

              <Route path="/dickian" element={<Dickian />} />

              <Route path="/categories" element={<Category />} />
              <Route path="/media" element={<Media />} />

              {/* // * This route no longer works. Fixed. -- 03/06/2021 MF */}
              <Route path="/titles" element={<Titles />} />
              {/* <Route path="/titles/:category" element={<Titles />} />
              <Route path="/title/:title" element={<Title />} /> */}

              {/* // * This route no longer works. Fixed. -- 03/06/2021 MF */}
              <Route path="/editions" element={<Editions />} />
              {/* <Route path="/editions/:title" element={<Editions />} />
               <Route path="/editions/:media" element={<Editions />} /> */}

              {/* // ! These need to stay at the bottom of the list so that the links above will work properly. -- 03/06/2021 MF */}
              {IsEmpty(linkItem) === false && HasNonEmptyProperty(linkItem, "linkName") && linkItem.linkType === "categories" ? <Route path="/:linkName" element={<Titles linkItem={linkItem} />} /> : null}

              {IsEmpty(linkItem) === false && HasNonEmptyProperty(linkItem, "linkName") && linkItem.linkType === "titles" ? <Route path="/:linkName" element={<Title linkItem={linkItem} />} /> : null}

              {IsEmpty(linkItem) === false && HasNonEmptyProperty(linkItem, "linkName") && linkItem.linkType === "media" ? <Route path="/:linkName" element={<Editions linkItem={linkItem} />} /> : null}

            </Routes>

            {/* {process.env.NODE_ENV === "development" ? <FromTheHomeopape /> : null} */}

          </Col>
        </Row>
        <Row>
          <Col xs="12" className="smaller-text text-center">

            {/* &copy; {props.copyrightYear} All rights reserved. Version: {props.applicationVersion} */}

            &copy; 2022 All rights reserved. Version: {process.env.REACT_APP_VERSION}

          </Col>
        </Row>
      </Container>

    </BrowserRouter>
  );
}

export default App;
