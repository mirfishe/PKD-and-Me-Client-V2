import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Image } from 'react-bootstrap-icons';
import Parse from "html-react-parser";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, isNonEmptyArray, displayValue, hasNonEmptyProperty, displayDate, displayYear } from "shared-functions";
import { encodeURL, decodeURL, removeOnePixelImage, setLocalPath, setLocalImagePath, addErrorLog } from "../../utilities/ApplicationFunctions";
import { setTitleSortBy } from "../../app/titlesSlice";
import { setEditionSortBy } from "../../app/editionsSlice";
import { setPageURL } from "../../app/urlsSlice";
// import AddEdition from "../editions/AddEdition";
import EditEdition from "../editions/EditEdition";
import amazonLogo from "../../assets/images/available_at_amazon_en_vertical.png";

const Editions = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: applicationVersion, linkItem, match -- 10/21/2022 MF

  const componentName = "Editions";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  const siteName = useSelector(state => state.applicationSettings.siteName);
  const applicationName = useSelector(state => state.applicationSettings.applicationName);
  // const applicationVersion = useSelector(state => state.applicationSettings.applicationVersion);
  const computerLog = useSelector(state => state.applicationSettings.computerLog);

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const editionSortBy = useSelector(state => state.editions.editionSortBy);

  const electronicOnly = useSelector(state => state.applicationSettings.electronicOnly);
  const userElectronicOnly = useSelector(state => state.applicationSettings.userElectronicOnly);
  const electronicOnlyMessage = useSelector(state => state.applicationSettings.electronicOnlyMessage);
  const physicalOnly = useSelector(state => state.applicationSettings.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.applicationSettings.userPhysicalOnly);
  const physicalOnlyMessage = useSelector(state => state.applicationSettings.physicalOnlyMessage);

  let applicationVersion = isEmpty(props) === false && isEmpty(props.applicationVersion) === false ? props.applicationVersion : null;
  let linkItem = isEmpty(props) === false && isEmpty(props.linkItem) === false ? props.linkItem : "";
  let match = isEmpty(props) === false && isEmpty(props.match) === false ? props.match : null;

  const [errEditionMessage, setErrEditionMessage] = useState("");

  const editionListState = useSelector(state => state.editions.arrayEditions);
  const mediaListState = useSelector(state => state.media.arrayMedia);

  let mediaParam;

  if (isEmpty(linkItem) === false && hasNonEmptyProperty(linkItem, "linkName")) {

    mediaParam = linkItem.linkName; // match.params.media;

  };

  let editionList = [];

  if (isNaN(mediaParam) === false) {

    // ! This code no longer works with the current URL setup
    // * If mediaParam is a number, then it's the mediaID
    document.title = editionList[0].medium.media + " | " + applicationName + " | " + siteName;
    editionList = editionListState.filter(edition => edition.mediaID === parseInt(mediaParam));

  } else if (isEmpty(mediaParam) === false) {

    // * If mediaParam is not a number, then it's the media name
    const media = mediaListState.find(media => media.media === decodeURL(mediaParam));

    if (isEmpty(media) === false) {

      document.title = media.media + " | " + applicationName + " | " + siteName;
      editionList = editionListState.filter(edition => edition.mediaID === parseInt(media.mediaID));

    } else {

      document.title = "Media Not Found | " + applicationName + " | " + siteName;
      console.error("Media not found.");
      // * Display all active editions
      // editionList = editionListState;
      // setErrTitleMessage("Media not found.")

    };

  } else {

    document.title = "All Editions | " + applicationName + " | " + siteName;
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

  if (isEmpty(admin) === false && admin === true) {

    editionList = [...editionList];

  } else {

    // ! How does Knex handle the leftOuterJoin with two columns of the same name?:  active, publicationDate, imageName, sortID, updatedBy, createDate, updateDate
    // editionList = editionList.filter(edition => (edition.active === true || edition.active === 1) && (edition.medium.active === true || edition.medium.active === 1));
    editionList = editionList.filter(edition => (edition.editionActive === true || edition.editionActive === 1) && (edition.mediaActive === true || edition.mediaActive === 1));

  };

  sortEditions(editionSortBy);


  useEffect(() => {

    if (editionList.length > 0) {

      setErrEditionMessage("");

    } else {

      setErrEditionMessage("No editions found.");

    };

  }, [editionList]);


  useEffect(() => {

    if (editionList.length > 0) {

      saveRecord();

    };

  }, [editionList]);


  const sortEditions = (sortBy) => {
    // console.log("componentName, sortTitles sortBy", sortBy);

    if (isEmpty(editionList) === false && editionList.length > 0) {

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

        let editionListNoReleaseDate = editionList.filter(edition => edition.editionPublicationDate === undefined || edition.editionPublicationDate === null);

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


        let newEditionList = [...editionListReleaseDate];
        newEditionList.push(...editionListNoReleaseDate);

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


        let editionListNoPublicationDate = editionList.filter(edition => edition.titlePublicationDate === undefined || edition.titlePublicationDate === null);

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


        let newEditionList = [...editionListPublicationDate];
        newEditionList.push(...editionListNoPublicationDate);

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
              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;

            };

            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;

          });

      };

    };

  };


  const redirectPage = (linkName) => {

    // * Scroll to top of the page after clicking the link. -- 08/05/2021 MF
    window.scrollTo(0, 0);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

  };


  const saveRecord = () => {

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
      // applicationVersion: applicationVersion,
      applicationVersion: process.env.REACT_APP_VERSION,

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
      .then(response => {

        if (response.ok !== true) {

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

        data = results;

        // dispatch(setLocationLogged(true));

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), operationValue, "saveRecord error", error);

        // addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

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

          {isEmpty(errEditionMessage) === false ? <Alert color="danger">{errEditionMessage}</Alert> : null}
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

                    <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                    {isEmpty(edition.imageName) === false ? <img src={setLocalImagePath(edition.imageName)} alt={titleItem.titleName + " is available for purchase at Amazon.com"} className="cover-display" /> : <Image className="no-image-icon"/>}
                    </a>

                    }

                    {isEmpty(edition.editionPublicationDate) === false ? <CardText>Released: {displayDate(editionPublicationDate)}</CardText> : null}

                    </CardBody>
                    <CardFooter>

                        <Link to={edition.title.titleURL}>{edition.title.titleName}</Link>
                        {isEmpty(edition.editionPublicationDate) === false ? <span> <small>({displayYear(edition.title.publicationDate)})</small></span> : null}

                    </CardFooter>
                    </Card> */}

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
                              {/* {Parse(removeOnePixelImage(edition.imageLinkLarge, edition.ASIN).replaceAll("<img ", brokenURLReplaceText))} */}

                              <a href={edition.textLinkFullAPI} target="_blank" rel="noopener noreferrer">
                                {isEmpty(edition.imageNameAPI) === false ? <img src={edition.imageNameAPI} alt={edition.titleName + " is available for purchase."} className="edition-image" onError={(event) => { console.error("Edition image not loaded!"); fetch(baseURL + "editions/broken/" + edition.editionID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} /> : <Image className="no-image-icon" />}
                              </a>

                            </React.Fragment>

                            :

                            <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                              {isEmpty(edition.imageName) === false ? <CardImg src={setLocalImagePath(edition.imageName)} alt={edition.titleName + " is available for purchase."} className="edition-image" /> : <Image className="no-image-icon" />}
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

                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                          <img src={amazonLogo} alt={edition.titleName + " is available for purchase at Amazon.com."} className="purchase-image my-2" /><br />
                        </a>

                        :

                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                          <p className="my-2">Find Copy</p>
                        </a>

                      } */}

                        {isEmpty(edition.textLinkFullAPI) === false ?

                          <a href={edition.textLinkFullAPI} target="_blank" rel="noopener noreferrer">
                            <img src={amazonLogo} alt={edition.titleName + " is available for purchase at Amazon.com."} className="purchase-image my-2" /><br />
                          </a>

                          :

                          <React.Fragment>

                            {isEmpty(edition.textLinkFullAPI) === false ?

                              <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                                <p className="my-2">Find Copy</p>
                              </a>

                              : null}

                          </React.Fragment>

                        }

                        {/* {isEmpty(admin) === false && admin === true ? <AddEdition titleID={edition.titleID} titlePublicationDate={edition.titlePublicationDate} titleImageName={edition.titleImageName} displayButton={true} /> : null} */}

                        {/* {isEmpty(admin) === false && admin === true ? <EditEdition titleID={edition.titleID} titlePublicationDate={edition.titlePublicationDate} titleImageName={edition.titleImageName} displayButton={true} /> : null} */}

                        {/* {isEmpty(admin) === false && admin === true ? <EditEdition editionID={edition.editionID} titlePublicationDate={edition.titlePublicationDate} titleImageName={edition.titleImageName} displayButton={true} /> : null} */}

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
