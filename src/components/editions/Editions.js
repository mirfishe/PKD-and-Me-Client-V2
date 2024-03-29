import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray, hasNonEmptyProperty, displayDate, displayYear, addErrorLog, parse } from "shared-functions";
import { encodeURL, decodeURL, setLocalImagePath } from "../../utilities/ApplicationFunctions";
import { setTitleSortBy } from "../../app/titlesSlice";
import { setEditionSortBy } from "../../app/editionsSlice";
import amazonLogo from "../../assets/images/available_at_amazon_en_vertical.png";

const Editions = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: applicationVersion, linkItem, match -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "Editions";

  const dispatch = useDispatch();

  const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const profileType = useSelector(state => state.applicationSettings.profileType);
  const siteName = useSelector(state => state.applicationSettings.siteName);
  const applicationName = useSelector(state => state.applicationSettings.applicationName);
  // const applicationVersion = useSelector(state => state.applicationSettings.applicationVersion);
  const computerLog = useSelector(state => state.applicationSettings.computerLog);

  // const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const editionSortBy = useSelector(state => state.editions.editionSortBy);

  const electronicOnly = useSelector(state => state.applicationSettings.electronicOnly);
  const userElectronicOnly = useSelector(state => state.applicationSettings.userElectronicOnly);
  const electronicOnlyMessage = useSelector(state => state.applicationSettings.electronicOnlyMessage);
  const physicalOnly = useSelector(state => state.applicationSettings.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.applicationSettings.userPhysicalOnly);
  const physicalOnlyMessage = useSelector(state => state.applicationSettings.physicalOnlyMessage);

  const arrayEditions = useSelector(state => state.editions.arrayEditions);
  const arrayMedia = useSelector(state => state.media.arrayMedia);

  const applicationVersion = useSelector(state => state.applicationSettings.applicationVersion);

  // let applicationVersion = isEmpty(props) === false && isEmpty(props.applicationVersion) === false ? props.applicationVersion : null;
  let linkItem = isEmpty(props) === false && isEmpty(props.linkItem) === false ? props.linkItem : "";
  // let match = isEmpty(props) === false && isEmpty(props.match) === false ? props.match : null;

  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [mediaParam, setMediaParam] = useState(null);
  const [editionList, setEditionList] = useState([]);


  useEffect(() => {

    if (isEmpty(linkItem) === false && isEmpty(linkItem.linkName) === false) {

      setMediaParam(linkItem.linkName); // match.params.media;

    };

  }, [linkItem]);


  useEffect(() => {

    let newEditionList = [];

    if (isNaN(mediaParam) === false) {

      if (isEmpty(newEditionList[0]) === false) {

        // ! This code no longer works with the current URL setup
        // * If mediaParam is a number, then it's the mediaID
        document.title = newEditionList[0].medium.media + " | " + applicationName + " | " + siteName;
        newEditionList = arrayEditions.filter(edition => edition.mediaID === parseInt(mediaParam));

      };

    } else if (isEmpty(mediaParam) === false) {

      // * If mediaParam is not a number, then it's the media name
      let media = arrayMedia.find(media => media.media === decodeURL(mediaParam));

      if (isEmpty(media) === false) {

        document.title = media.media + " | " + applicationName + " | " + siteName;
        newEditionList = arrayEditions.filter(edition => edition.mediaID === parseInt(media.mediaID));

      } else {

        document.title = "Media Not Found | " + applicationName + " | " + siteName;
        console.error("Media not found.");
        // * Display all active editions
        // newEditionList = arrayEditions;
        // setErrTitleMessage("Media not found.")

      };

    } else {

      document.title = "All Editions | " + applicationName + " | " + siteName;
      // * Display all active editions
      newEditionList = [...arrayEditions];
      // newEditionList = arrayEditions.filter(edition => edition.editionActive === true || edition.editionActive === 1);

    };

    if (electronicOnly === true || userElectronicOnly === true) {

      // newEditionList = newEditionList.filter(edition => edition.medium.electronic === true);
      newEditionList = newEditionList.filter(edition => edition.electronic === true || edition.electronic === 1);

    } else if (physicalOnly === true || userPhysicalOnly === true) {

      // newEditionList = newEditionList.filter(edition => edition.medium.electronic === false);
      newEditionList = newEditionList.filter(edition => edition.electronic === false || edition.electronic === 0);

    } else {

      newEditionList = [...newEditionList];

    };

    if (isEmpty(admin) === false && admin === true) {

      newEditionList = [...newEditionList];

    } else {

      // ! How does Knex handle the leftOuterJoin with two columns of the same name?:  active, publicationDate, imageName, sortID, updatedBy, createDate, updateDate
      // newEditionList = newEditionList.filter(edition => (edition.active === true || edition.active === 1) && (edition.medium.active === true || edition.medium.active === 1));
      newEditionList = newEditionList.filter(edition => (edition.editionActive === true || edition.editionActive === 1) && (edition.mediaActive === true || edition.mediaActive === 1));

    };

    newEditionList = sortEditions(newEditionList, editionSortBy);

    setEditionList(newEditionList);

  }, [mediaParam, arrayMedia, arrayEditions, editionSortBy, admin]);


  useEffect(() => {

    if (isEmpty(editionList) === false) {

      clearMessages();

    } else {

      addErrorMessage("No editions found.");

    };

  }, [editionList]);


  useEffect(() => {

    if (isEmpty(editionList) === false) {

      addVisitLog();

    };

  }, [editionList]);


  const sortEditions = (editionList, sortBy) => {

    let newEditionList = [...editionList];

    if (isEmpty(newEditionList) === false) {

      if (sortBy === "releaseDate") {

        // * Sort the newEditionList array by editionPublicationDate, title.titleSort, (would like to add media.sortID)
        // ! Doesn't handle null values well; treats them as "null"
        // newEditionList.sort((a, b) => (a.publicationDate > b.publicationDate) ? 1 : (a.publicationDate > b.publicationDate) ? ((a.title.titleSort > b.title.titleSort) ? 1 : -1) : -1);

        // * Temporary to test the sorting
        // newEditionList = newEditionList.filter(edition => edition.title.titleName === "A Scanner Darkly");

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        // newEditionList.sort(

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
        let editionListReleaseDate = newEditionList.filter(edition => edition.editionPublicationDate !== undefined && edition.editionPublicationDate !== null);

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

        let editionListNoReleaseDate = newEditionList.filter(edition => edition.editionPublicationDate === undefined || edition.editionPublicationDate === null);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionListNoReleaseDate.sort(

          function (a, b) {

            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {

              // * Media is only important when title.titleSort are the same
              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;

            };

            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;

          });

        let newSortedEditionList = [...editionListReleaseDate];
        newSortedEditionList.push(...editionListNoReleaseDate);

        newEditionList = [...newSortedEditionList];

      } else if (sortBy === "publicationDate") {

        // * Sort the newEditionList array by title.publicationDate, title.titleSort, (would like to add media.sortID)
        // ! Doesn't handle null values well; treats them as "null"
        // newEditionList.sort((a, b) => (a.title.publicationDate > b.title.publicationDate) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.title.titleSort > b.title.titleSort) ? 1 : -1) : -1);

        // * Temporary to test the sorting
        // newEditionList = newEditionList.filter(edition => edition.title.titleName === "A Scanner Darkly");

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        // newEditionList.sort(

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
        let editionListPublicationDate = newEditionList.filter(edition => edition.titlePublicationDate === undefined || edition.titlePublicationDate === null);

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

        let editionListNoPublicationDate = newEditionList.filter(edition => edition.titlePublicationDate === undefined || edition.titlePublicationDate === null);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionListNoPublicationDate.sort(

          function (a, b) {

            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {

              // * Media is only important when title.titleSort are the same
              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;

            };

            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;

          });

        let newSortedEditionList = [...editionListPublicationDate];
        newSortedEditionList.push(...editionListNoPublicationDate);

        newEditionList = [...newSortedEditionList];

      } else if (sortBy === "titleName") {

        // * Sort the newEditionList array by title.titleSort, media.sortID
        // ! Doesn't sort correctly
        // newEditionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.medium.sortID > b.medium.sortID) ? 1 : -1) : -1);

        // newEditionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : -1);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        newEditionList.sort(

          function (a, b) {

            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {

              // * Media is only important when title.titleSort are the same
              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;

            };

            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;

          });

      } else {

        // * Sort the newEditionList array by title.titleSort, media.sortID
        // ! Doesn't sort correctly
        // newEditionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.medium.sortID > b.medium.sortID) ? 1 : -1) : -1);

        // newEditionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : -1);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        newEditionList.sort(

          function (a, b) {

            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {

              // * Media is only important when title.titleSort are the same
              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;

            };

            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;

          });

      };

    };

    return newEditionList;

  };


  const addVisitLog = () => {

    let ipAddress = isEmpty(computerLog) === false && isEmpty(computerLog.ipAddress) === false ? computerLog.ipAddress : "";
    let city = isEmpty(computerLog) === false && isEmpty(computerLog.city) === false ? computerLog.city : "";
    // let state = isEmpty(computerLog) === false && isEmpty(computerLog.stateProv) === false ? computerLog.stateProv : "";
    let state = isEmpty(computerLog) === false && isEmpty(computerLog.state) === false ? computerLog.state : "";
    let countryCode = isEmpty(computerLog) === false && isEmpty(computerLog.countryCode) === false ? computerLog.countryCode : "";
    let countryName = isEmpty(computerLog) === false && isEmpty(computerLog.countryName) === false ? computerLog.countryName : "";
    let continentCode = isEmpty(computerLog) === false && isEmpty(computerLog.continentCode) === false ? computerLog.continentCode : "";
    let continentName = isEmpty(computerLog) === false && isEmpty(computerLog.continentName) === false ? computerLog.continentName : "";
    let stateProvCode = isEmpty(computerLog) === false && isEmpty(computerLog.stateProvCode) === false ? computerLog.stateProvCode : "";

    let latitude = isEmpty(computerLog) === false && isEmpty(computerLog.latitude) === false ? computerLog.latitude : "";
    let longitude = isEmpty(computerLog) === false && isEmpty(computerLog.longitude) === false ? computerLog.longitude : "";
    let postal = isEmpty(computerLog) === false && isEmpty(computerLog.postal) === false ? computerLog.postal : "";

    let href = isEmpty(window.location.href) === false ? window.location.href : "";

    let url = baseURL + "computerLogs/";
    let response = "";
    let data = "";
    let operationValue = "Update Computer Log";

    let recordObject = {};

    recordObject = {

      title: "Editions",
      href: href,
      applicationVersion: applicationVersion,

      lastAccessed: getDateTime(),

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

    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ recordObject: recordObject })
    })
      .then(results => {

        if (results.ok !== true) {

          // throw Error(results.status + " " + results.statusText + " " + results.url);

        } else {

          if (results.status === 200) {

            return results.json();

          } else {

            return results.status;

          };

        };

      })
      .then(results => {

        data = results;

        // dispatch(setLocationLogged(true));

      })
      .catch((error) => {

        console.error(componentName, getDateTime(), operationValue, "addVisitLog error", error);

        // addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`);

        // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12">

          <Breadcrumb className="breadcrumb mb-2">
            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>

            {isEmpty(mediaParam) === false && isNaN(mediaParam) ?

              <BreadcrumbItem active><Link to={mediaParam} onClick={(event) => { event.preventDefault(); redirectPage(mediaParam); }}>{decodeURL(mediaParam)}</Link></BreadcrumbItem>

              :

              <BreadcrumbItem active><Link to={"/editions/"} onClick={(event) => { event.preventDefault(); redirectPage("/editions/"); }}>All Editions</Link></BreadcrumbItem>

            }

          </Breadcrumb>

        </Col>
      </Row>
      <Row>
        <Col xs="12">

          <h4 className="text-center mb-4">{isEmpty(mediaParam) === false && isNaN(mediaParam) ? decodeURL(mediaParam) : "All Editions"}
            <span className="text-muted ms-2 small-text">Sort By

              {editionSortBy !== "releaseDate" ?

                <a href="#" className="ms-2" onClick={(event) => { event.preventDefault(); sortEditions("releaseDate"); dispatch(setEditionSortBy("releaseDate")); }}>Release Date</a>

                : null}

              {editionSortBy !== "publicationDate" ?

                <a href="#" className="ms-2" onClick={(event) => { event.preventDefault(); sortEditions("publicationDate"); dispatch(setEditionSortBy("publicationDate")); dispatch(setTitleSortBy("publicationDate")); }}>Publication Date</a>

                : null}

              {editionSortBy !== "titleName" ?

                <a href="#" className="ms-2" onClick={(event) => { event.preventDefault(); sortEditions("titleName"); dispatch(setEditionSortBy("titleName")); dispatch(setTitleSortBy("titleName")); }}>Title</a>

                : null}

            </span>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs="12">

          <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

          {electronicOnly === true || userElectronicOnly === true ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}
          {physicalOnly === true || userPhysicalOnly === true ? <Alert color="info">{physicalOnlyMessage}</Alert> : null}

        </Col>
      </Row>

      {isNonEmptyArray(editionList) === true ?

        <Row>

          {editionList.map((edition) => {

            // * let newWindow = window.open("http://localhost:4000/editions/broken"); newWindow.close();
            // * let newWindow = window.open('http://localhost:4000/editions/broken'); newWindow.close();

            // * fetch('http://localhost:4000/editions/broken', {method: 'GET', headers: new Headers({'Content-Type': 'application/json'})});

            // let brokenURLText = "fetch('" + baseURL + "editions/broken/" + edition.editionID + "', {method: 'GET', headers: new Headers({'Content-Type': 'application/json'})});";
            // let brokenURLReplaceText = "<img onError=\"console.error('Edition image not loaded!'); " + brokenURLText + "\" ";

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

                    {isEmpty(mediaParam) === false ?
                    
                    <CardHeader>
                        <Link to={encodeURL(edition.medium.media)}>{edition.medium.media}</Link>
                    </CardHeader>

                    : null}

                    <CardBody className="edition-image">

                    {isEmpty(edition.imageLinkLarge) === false ? 
                    
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />

                    :

                    <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer nofollow">
                    {isEmpty(edition.imageName) === false ? <img src={setLocalImagePath(edition.imageName, profileType)} alt={titleItem.titleName + " is available for purchase at Amazon.com"} className="cover-display" /> : <Image className="no-image-icon"/>}
                    </a>

                    }

                    {isEmpty(edition.editionPublicationDate) === false ? <CardText>Released: {displayDate(editionPublicationDate)}</CardText> : null}

                    </CardBody>
                    <CardFooter>

                        <Link to={edition.title.titleURL}>{edition.title.titleName}</Link>
                        {isEmpty(edition.editionPublicationDate) === false ? <span> <small>({displayYear(edition.title.publicationDate)})</small></span> : null}

                    </CardFooter>
                    </Card> */ }

                <Card key={edition.editionID}>

                  {isEmpty(activeString) === false ?

                    <CardHeader className="card-header inactive-item">
                      ({activeString})
                    </CardHeader>

                    : null}

                  <Row className="no-gutters">
                    <Col className="col-md-6">

                      {edition.editionActive === true || edition.editionActive === 1 ?

                        <React.Fragment>

                          {isEmpty(edition.imageNameAPI) === false && isEmpty(edition.textLinkFullAPI) === false /* isEmpty(edition.imageLinkLarge) === false */ ?

                            <React.Fragment>

                              {/* <div dangerouslySetInnerHTML={{ "__html": removeOnePixelImage(edition.imageLinkLarge, edition.ASIN).replaceAll("<img ", brokenURLReplaceText) }} /> */}
                              {/* {parse(removeOnePixelImage(edition.imageLinkLarge, edition.ASIN).replaceAll("<img ", brokenURLReplaceText))} */}

                              <a href={edition.textLinkFullAPI} target="_blank" rel="noopener noreferrer nofollow">
                                {isEmpty(edition.imageNameAPI) === false ? <img src={edition.imageNameAPI} alt={edition.titleName + " is available for purchase."} className="edition-image" onError={(event) => { console.error("Edition image not loaded!"); fetch(baseURL + "editions/broken/" + edition.editionID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} /> : <Image className="no-image-icon" />}
                              </a>

                            </React.Fragment>

                            :

                            <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer nofollow">
                              {isEmpty(edition.imageName) === false ? <CardImg src={setLocalImagePath(edition.imageName, profileType)} alt={edition.titleName + " is available for purchase."} className="edition-image" /> : <Image className="no-image-icon" />}
                            </a>

                          }

                        </React.Fragment>

                        : null}

                    </Col>
                    <Col className="col-md-6">
                      <CardBody>

                        <CardText><Link to={edition.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(edition.titleURL); }}>{edition.titleName}</Link>
                          {isEmpty(edition.editionPublicationDate) === false ? <span className="ms-1 smaller-text">({displayYear(edition.editionPublicationDate)})</span> : null}
                        </CardText>

                        {isEmpty(edition.editionPublicationDate) === false ? <CardText className="smaller-text">Released: {displayDate(edition.editionPublicationDate)}</CardText> : null}

                        {/* {isEmpty(edition.textLinkFull) === false && (edition.textLinkFull.includes("amzn.to") === true || edition.textLinkFull.includes("amazon.com") === true || edition.textLinkFull.includes("ws-na.amazon-adsystem.com") === true) ?

                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer nofollow">
                          <img src={amazonLogo} alt={edition.titleName + " is available for purchase at Amazon.com."} className="purchase-image my-2" /><br />
                        </a>

                        :

                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer nofollow">
                          <p className="my-2">Find Copy</p>
                        </a>

                      } */ }

                        {isEmpty(edition.textLinkFullAPI) === false ?

                          <a href={edition.textLinkFullAPI} target="_blank" rel="noopener noreferrer nofollow">
                            <img src={amazonLogo} alt={edition.titleName + " is available for purchase at Amazon.com."} className="purchase-image my-2" /><br />
                          </a>

                          :

                          <React.Fragment>

                            {isEmpty(edition.textLinkFullAPI) === false ?

                              <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer nofollow">
                                <p className="my-2">Find Copy</p>
                              </a>

                              : null}

                          </React.Fragment>

                        }

                      </CardBody>
                    </Col>
                  </Row>

                  {isEmpty(mediaParam) === false ?

                    <CardFooter className="card-footer">

                      <CardText><Link to={encodeURL(edition.media)} onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(edition.media)); }}>{edition.media}</Link></CardText>

                    </CardFooter>

                    : null}

                </Card>

              </Col>
            );
          })}
        </Row>

        : null}

    </Container>
  );
};

export default Editions;
