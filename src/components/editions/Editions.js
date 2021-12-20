import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Image } from 'react-bootstrap-icons';
import Parse from "html-react-parser";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty, DisplayDate, DisplayYear, encodeURL, decodeURL, removeOnePixelImage, setLocalPath, setLocalImagePath } from "../../utilities/SharedFunctions";
import { LogError } from "../../utilities/AppFunctions";
import { setTitleSortBy } from "../../app/titlesSlice";
import { setEditionSortBy } from "../../app/editionsSlice";
import { setPageURL } from "../../app/urlsSlice";
// import AddEdition from "../editions/AddEdition";
import EditEdition from "../editions/EditEdition";
import amazonLogo from "../../assets/images/available_at_amazon_en_vertical.png";

const Editions = (props) => {

  const componentName = "Editions.js";

  const dispatch = useDispatch();
  const history = useHistory();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  const applicationVersion = useSelector(state => state.app.applicationVersion);
  const computerLog = useSelector(state => state.app.computerLog);

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  const editionSortBy = useSelector(state => state.editions.editionSortBy);

  const electronicOnly = useSelector(state => state.app.electronicOnly);
  const userElectronicOnly = useSelector(state => state.app.userElectronicOnly);
  const electronicOnlyMessage = useSelector(state => state.app.electronicOnlyMessage);
  const physicalOnly = useSelector(state => state.app.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.app.userPhysicalOnly);
  const physicalOnlyMessage = useSelector(state => state.app.physicalOnlyMessage);

  const [errEditionMessage, setErrEditionMessage] = useState("");

  const editionListState = useSelector(state => state.editions.arrayEditions);
  // console.log(componentName, GetDateTime(), "editionListState", editionListState);
  const mediaListState = useSelector(state => state.media.arrayMedia);
  // console.log(componentName, GetDateTime(), "mediaListState", mediaListState);

  let mediaParam;

  if (IsEmpty(props.linkItem) === false && HasNonEmptyProperty(props.linkItem, "linkName")) {

    // console.log(componentName, GetDateTime(), "props.match.params", props.match.params);
    mediaParam = props.linkItem.linkName; // props.match.params.media;
    // console.log(componentName, GetDateTime(), "typeof mediaParam", typeof mediaParam);
    // console.log(componentName, GetDateTime(), "mediaParam", mediaParam);

  };


  const sortEditions = (sortBy) => {
    // console.log("componentName, sortTitles sortBy", sortBy);

    if (IsEmpty(editionList) === false && editionList.length > 0) {

      if (sortBy === "releaseDate") {

        // * Sort the editionList array by editionPublicationDate, title.titleSort, (would like to add media.sortID)
        // ! Doesn't handle null values well; treats them as "null"
        // editionList.sort((a, b) => (a.publicationDate > b.publicationDate) ? 1 : (a.publicationDate > b.publicationDate) ? ((a.title.titleSort > b.title.titleSort) ? 1 : -1) : -1);

        // * Temporary to test the sorting
        // editionList = editionList.filter(edition => edition.title.titleName === "A Scanner Darkly");

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        // editionList.sort(

        //     function(a, b) {
        //        if (a.publicationDate === b.publicationDate) {

        //             if (a.title.titleSort === b.title.titleSort) {

        //                 // * Media is only important when title.titleSort are the same
        //                 return a.medium.sortID - b.medium.sortID;

        //             };

        //             // * titleSort is only important when publicationDate are the same
        //             return a.title.titleSort - b.title.titleSort;

        //        };

        //        return a.publicationDate > b.publicationDate ? 1 : -1;

        //     });

        // * Separate the array items with undefined/null values, sort them appropriately and then concatenate them back together
        let editionListReleaseDate = editionList.filter(edition => edition.editionPublicationDate !== undefined && edition.editionPublicationDate !== null);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionListReleaseDate.sort(

          function (a, b) {

            if (a.editionPublicationDate === b.editionPublicationDate) {
              // if (a.title.titleSort === b.title.titleSort) {

              if (a.titleSort === b.titleSort) {

                // * Media is only important when title.titleSort are the same
                // return a.medium.sortID - b.medium.sortID;
                return a.sortID - b.sortID;

              };

              // * titleSort is only important when publicationDate are the same
              // return a.title.titleSort - b.title.titleSort;
              return a.titleSort - b.titleSort;

            };

            return a.editionPublicationDate > b.editionPublicationDate ? 1 : -1;

          });
        // console.log(componentName, GetDateTime(), "editionListReleaseDate", editionListReleaseDate);

        let editionListNoReleaseDate = editionList.filter(edition => edition.editionPublicationDate === undefined || edition.editionPublicationDate === null);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionListNoReleaseDate.sort(

          function (a, b) {

            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {

              // * Media is only important when title.titleSort are the same
              // if (a.title.titleName === "A Scanner Darkly" || b.title.titleName === "A Scanner Darkly") {

              //     console.log(componentName, GetDateTime(), "a.title.titleName", a.title.titleName);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID", a.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID", b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID - b.medium.sortID", a.medium.sortID - b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID - a.medium.sortID", b.medium.sortID - a.medium.sortID);

              // };

              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;

            };

            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;

          });

        // console.log(componentName, GetDateTime(), "editionListNoReleaseDate", editionListNoReleaseDate);

        let newEditionList = [...editionListReleaseDate];
        newEditionList.push(...editionListNoReleaseDate);
        // console.log(componentName, GetDateTime(), "newEditionList", newEditionList);

        editionList = [...newEditionList];

      } else if (sortBy === "publicationDate") {

        // * Sort the editionList array by title.publicationDate, title.titleSort, (would like to add media.sortID)
        // ! Doesn't handle null values well; treats them as "null"
        // editionList.sort((a, b) => (a.title.publicationDate > b.title.publicationDate) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.title.titleSort > b.title.titleSort) ? 1 : -1) : -1);

        // * Temporary to test the sorting
        // editionList = editionList.filter(edition => edition.title.titleName === "A Scanner Darkly");

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        // editionList.sort(

        //     function(a, b) {      

        //        if (a.title.publicationDate === b.title.publicationDate) {

        //             if (a.title.titleSort === b.title.titleSort) {

        //                 // * Media is only important when title.titleSort are the same
        //                 return a.medium.sortID - b.medium.sortID;

        //             };

        //             // * titleSort is only important when publicationDate are the same
        //             return a.title.titleSort - b.title.titleSort;

        //        };

        //        return a.title.publicationDate > b.title.publicationDate ? 1 : -1;

        //     });

        // * Separate the array items with undefined/null values, sort them appropriately and then concatenate them back together
        let editionListPublicationDate = editionList.filter(edition => edition.titlePublicationDate === undefined || edition.titlePublicationDate === null);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionListPublicationDate.sort(

          function (a, b) {

            // if (a.title.publicationDate === b.title.publicationDate) {
            if (a.titlePublicationDate === b.titlePublicationDate) {
              // if (a.title.titleSort === b.title.titleSort) {

              if (a.titleSort === b.titleSort) {

                // * Media is only important when title.titleSort are the same
                // return a.medium.sortID - b.medium.sortID;
                return a.sortID - b.sortID;

              };

              // * titleSort is only important when publicationDate are the same
              // return a.title.titleSort - b.title.titleSort;
              return a.titleSort - b.titleSort;

            };

            // return a.title.publicationDate > b.title.publicationDate ? 1 : -1;
            return a.titlePublicationDate > b.titlePublicationDate ? 1 : -1;

          });

        // console.log(componentName, GetDateTime(), "editionListPublicationDate", editionListPublicationDate);

        let editionListNoPublicationDate = editionList.filter(edition => edition.titlePublicationDate === undefined || edition.titlePublicationDate === null);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionListNoPublicationDate.sort(

          function (a, b) {

            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {

              // * Media is only important when title.titleSort are the same
              // if (a.title.titleName === "A Scanner Darkly" || b.title.titleName === "A Scanner Darkly") {

              //     console.log(componentName, GetDateTime(), "a.title.titleName", a.title.titleName);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID", a.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID", b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID - b.medium.sortID", a.medium.sortID - b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID - a.medium.sortID", b.medium.sortID - a.medium.sortID);

              // };

              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;

            };

            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;

          });

        // console.log(componentName, GetDateTime(), "editionListNoPublicationDate", editionListNoPublicationDate);

        let newEditionList = [...editionListPublicationDate];
        newEditionList.push(...editionListNoPublicationDate);
        // console.log(componentName, GetDateTime(), "newEditionList", newEditionList);

        editionList = [...newEditionList];

      } else if (sortBy === "titleName") {

        // * Sort the editionList array by title.titleSort, media.sortID
        // ! Doesn't sort correctly
        // editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.medium.sortID > b.medium.sortID) ? 1 : -1) : -1);

        // editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : -1);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionList.sort(

          function (a, b) {

            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {

              // * Media is only important when title.titleSort are the same
              // if (a.title.titleName === "A Scanner Darkly" || b.title.titleName === "A Scanner Darkly") {

              //     console.log(componentName, GetDateTime(), "a.title.titleName", a.title.titleName);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID", a.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID", b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID - b.medium.sortID", a.medium.sortID - b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID - a.medium.sortID", b.medium.sortID - a.medium.sortID);
              // };

              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;

            };

            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;

          });

      } else {

        // * Sort the editionList array by title.titleSort, media.sortID
        // ! Doesn't sort correctly
        // editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.medium.sortID > b.medium.sortID) ? 1 : -1) : -1);

        // editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : -1);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionList.sort(

          function (a, b) {

            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {

              // * Media is only important when title.titleSort are the same
              // if (a.title.titleName === "A Scanner Darkly" || b.title.titleName === "A Scanner Darkly") {

              //     console.log(componentName, GetDateTime(), "a.title.titleName", a.title.titleName);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID", a.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID", b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID - b.medium.sortID", a.medium.sortID - b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID - a.medium.sortID", b.medium.sortID - a.medium.sortID);
              // };

              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;

            };

            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;

          });

      };

    };

  };


  let editionList = [];

  if (!isNaN(mediaParam)) {

    // ! This code no longer works with the current URL setup
    // * If mediaParam is a number, then it's the mediaID
    document.title = editionList[0].medium.media + " | " + appName + " | " + siteName;
    editionList = editionListState.filter(edition => edition.mediaID === parseInt(mediaParam));

  } else if (IsEmpty(mediaParam) === false) {

    // * If mediaParam is not a number, then it's the media name
    const media = mediaListState.find(media => media.media === decodeURL(mediaParam));
    // console.log(componentName, GetDateTime(), "typeof media", typeof media);
    // console.log(componentName, GetDateTime(), "media", media);

    if (IsEmpty(media) === false) {

      document.title = media.media + " | " + appName + " | " + siteName;
      editionList = editionListState.filter(edition => edition.mediaID === parseInt(media.mediaID));

    } else {

      document.title = "Media Not Found | " + appName + " | " + siteName;
      console.error("Media not found.");
      // * Display all active editions
      // editionList = editionListState;
      // setErrTitleMessage("Media not found.")

    };

  } else {

    document.title = "All Editions | " + appName + " | " + siteName;
    // * Display all active editions
    editionList = [...editionListState];
    // editionList = editionListState.filter(edition => edition.editionActive === true || edition.editionActive === 1);

  };

  if (electronicOnly === true || userElectronicOnly === true) {

    // editionList = editionList.filter(edition => edition.medium.electronic === true);
    editionList = editionList.filter(edition => edition.electronic === true || edition.electronic === 1);

  } else if (physicalOnly === true || userPhysicalOnly === true) {

    // editionList = editionList.filter(edition => edition.medium.electronic === false);
    editionList = editionList.filter(edition => edition.electronic === false || edition.electronic === 0);

  } else {

    editionList = [...editionList];

  };

  if (IsEmpty(admin) === false && admin === true) {

    editionList = [...editionList];

  } else {

    // ! How does Knex handle the leftOuterJoin with two columns of the same name?:  active, publicationDate, imageName, sortID, updatedBy, createDate, updateDate
    // editionList = editionList.filter(edition => (edition.active === true || edition.active === 1) && (edition.medium.active === true || edition.medium.active === 1));
    editionList = editionList.filter(edition => (edition.editionActive === true || edition.editionActive === 1) && (edition.mediaActive === true || edition.mediaActive === 1));

  };

  sortEditions(editionSortBy);
  // console.log(componentName, GetDateTime(), "editionList", editionList);


  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect editionList", editionList);

    if (editionList.length > 0) {

      setErrEditionMessage("");

    } else {

      setErrEditionMessage("No editions found.");

    };

  }, [editionList]);


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

      title: "Editions",
      href: href,
      applicationVersion: applicationVersion,

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

        // dispatch(setLocationLogged(true));

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), operationValue, "saveRecord error", error);

        // addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect computerLog", computerLog);

    if (editionList.length > 0) {

      saveRecord();

    };

  }, [editionList]);


  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12">

          <Breadcrumb className="breadcrumb mb-2">
            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>

            {IsEmpty(mediaParam) === false && isNaN(mediaParam) ?

              <BreadcrumbItem active><Link to={mediaParam} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(mediaParam); }}>{decodeURL(mediaParam)}</Link></BreadcrumbItem>

              :

              <BreadcrumbItem active><Link to={"/editions/"} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage("/editions/"); }}>All Editions</Link></BreadcrumbItem>

            }

          </Breadcrumb>

        </Col>
      </Row>
      <Row>
        <Col xs="12">

          <h4 className="text-center mb-4">{IsEmpty(mediaParam) === false && isNaN(mediaParam) ? decodeURL(mediaParam) : "All Editions"}
            <span className="text-muted ml-2 smallText">Sort By

              {editionSortBy !== "releaseDate" ?

                <a href="#" className="text-decoration-none ml-2" onClick={(event) => { event.preventDefault(); sortEditions("releaseDate"); dispatch(setEditionSortBy("releaseDate")); }}>Release Date</a>

                : null}

              {editionSortBy !== "publicationDate" ?

                <a href="#" className="text-decoration-none ml-2" onClick={(event) => { event.preventDefault(); sortEditions("publicationDate"); dispatch(setEditionSortBy("publicationDate")); dispatch(setTitleSortBy("publicationDate")); }}>Publication Date</a>

                : null}

              {editionSortBy !== "titleName" ?

                <a href="#" className="text-decoration-none ml-2" onClick={(event) => { event.preventDefault(); sortEditions("titleName"); dispatch(setEditionSortBy("titleName")); dispatch(setTitleSortBy("titleName")); }}>Title</a>

                : null}

            </span>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs="12">

          {IsEmpty(errEditionMessage) === false ? <Alert color="danger">{errEditionMessage}</Alert> : null}
          {electronicOnly === true || userElectronicOnly === true ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}
          {physicalOnly === true || userPhysicalOnly === true ? <Alert color="info">{physicalOnlyMessage}</Alert> : null}

        </Col>
      </Row>
      <Row>

        {editionList.map((edition) => {

          // console.log(componentName, GetDateTime(), "editionList map edition", edition);
          // console.log(componentName, GetDateTime(), "editionList map edition.active", edition.active);
          // console.log(componentName, GetDateTime(), "editionList map edition.editionActive", edition.editionActive);
          // console.log(componentName, GetDateTime(), "editionList map edition.imageLinkLarge", edition.imageLinkLarge);
          // console.log(componentName, GetDateTime(), "editionList map edition.imageLinkLarge.replaceAll(\"<img \", \"<img onLoad={(event) => { console.log(\"onLoad\"}; } onError={(event) => { console.log(\"onError\"}; } \")", edition.imageLinkLarge.replaceAll("<img ", "<img onLoad={(event) => { console.log(\"onLoad\"}; } onError={(event) => { console.error(\"onError\"}; } "));
          // console.log(componentName, GetDateTime(), "editionList map edition.imageLinkLarge.replaceAll(\"<img \", \"<img onLoad={(event) => { console.log(\"onLoad\"}; } onError={(event) => { console.log(\"onError\"}; } \")", edition.imageLinkLarge.replaceAll("<img ", "<img onload=\"console.log(\"onload\")\" onError=\"console.error(\"onError\")\" "));
          // * let newWindow = window.open("http://localhost:4000/editions/broken"); newWindow.close();
          // * let newWindow = window.open('http://localhost:4000/editions/broken'); newWindow.close();

          // * fetch('http://localhost:4000/editions/broken', {method: 'GET', headers: new Headers({'Content-Type': 'application/json'})});

          let brokenURLText = "fetch('" + baseURL + "editions/broken/" + edition.editionID + "', {method: 'GET', headers: new Headers({'Content-Type': 'application/json'})});";
          let brokenURLReplaceText = "<img onError=\"console.error('Edition image not loaded!'); " + brokenURLText + "\" ";

          let activeString = "";

          if (edition.editionActive === true || edition.editionActive === 1) {

            // activeString = "Active";
            activeString = "";

          } else {

            activeString = "Inactive";

          };

          return (
            <Col key={edition.editionID} xs="6" className="mb-4">

              {/* <Card key={edition.editionID}>

                    {IsEmpty(mediaParam) === false ?
                    
                    <CardHeader>
                        <Link to={encodeURL(edition.medium.media)}>{edition.medium.media}</Link>
                    </CardHeader>

                    : null}

                    <CardBody className="editionImage">

                    {IsEmpty(edition.imageLinkLarge) === false ? 
                    
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />

                    :

                    <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                    {IsEmpty(edition.imageName) === false ? <img src={setLocalImagePath(edition.imageName)} alt={titleItem.titleName + " is available for purchase at Amazon.com"} className="coverDisplay" /> : <Image className="noImageIcon"/>}
                    </a>

                    }

                    {IsEmpty(edition.editionPublicationDate) === false ? <CardText>Released: {DisplayDate(editionPublicationDate)}</CardText> : null}

                    </CardBody>
                    <CardFooter>

                        <Link to={edition.title.titleURL}>{edition.title.titleName}</Link>
                        {IsEmpty(edition.editionPublicationDate) === false ? <span> <small>({DisplayYear(edition.title.publicationDate)})</small></span> : null}

                    </CardFooter>
                    </Card> */}

              <Card key={edition.editionID}>

                {IsEmpty(activeString) === false ?

                  <CardHeader className="cardHeader inactiveItem">
                    ({activeString})
                  </CardHeader>

                  : null}

                <Row className="no-gutters">
                  <Col className="col-md-6">

                    {IsEmpty(edition.imageLinkLarge) === false && (edition.editionActive === true || edition.editionActive === 1) ?

                      <React.Fragment>

                        {/* <div dangerouslySetInnerHTML={{ "__html": removeOnePixelImage(edition.imageLinkLarge, edition.ASIN).replaceAll("<img ", brokenURLReplaceText) }} /> */}
                        {Parse(removeOnePixelImage(edition.imageLinkLarge, edition.ASIN).replaceAll("<img ", brokenURLReplaceText))}

                      </React.Fragment>

                      :

                      <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                        {IsEmpty(edition.imageName) === false ? <CardImg src={setLocalImagePath(edition.imageName)} alt={edition.titleName + " is available for purchase."} className="editionImage" /> : <Image className="noImageIcon" />}
                      </a>

                    }

                  </Col>
                  <Col className="col-md-6">
                    <CardBody>

                      <CardText><Link to={edition.titleURL} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(edition.titleURL); }}>{edition.titleName}</Link>
                        {IsEmpty(edition.editionPublicationDate) === false ? <span className="ml-1 smallerText">({DisplayYear(edition.editionPublicationDate)})</span> : null}
                      </CardText>

                      {IsEmpty(edition.editionPublicationDate) === false ? <CardText className="smallerText">Released: {DisplayDate(edition.editionPublicationDate)}</CardText> : null}

                      {IsEmpty(edition.textLinkFull) === false && (edition.textLinkFull.includes("amzn.to") === true || edition.textLinkFull.includes("amazon.com") === true || edition.textLinkFull.includes("ws-na.amazon-adsystem.com") === true) ?

                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                          <img src={amazonLogo} alt={edition.titleName + " is available for purchase at Amazon.com."} className="purchaseImage my-2" /><br />
                        </a>

                        :

                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                          <p className="my-2">Find Copy</p>
                        </a>

                      }

                      {/* {IsEmpty(admin) === false && admin === true ? <AddEdition titleID={edition.titleID} titlePublicationDate={edition.titlePublicationDate} titleImageName={edition.titleImageName} displayButton={true} /> : null} */}

                      {/* {IsEmpty(admin) === false && admin === true ? <EditEdition titleID={edition.titleID} titlePublicationDate={edition.titlePublicationDate} titleImageName={edition.titleImageName} displayButton={true} /> : null} */}

                      {IsEmpty(admin) === false && admin === true ? <EditEdition editionID={edition.editionID} titlePublicationDate={edition.titlePublicationDate} titleImageName={edition.titleImageName} displayButton={true} /> : null}

                    </CardBody>
                  </Col>
                </Row>

                {IsEmpty(mediaParam) === false ?

                  <CardFooter className="cardFooter">

                    <CardText><Link to={encodeURL(edition.media)} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(encodeURL(edition.media)); }}>{edition.media}</Link></CardText>

                  </CardFooter>

                  : null}

              </Card>

            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Editions;
