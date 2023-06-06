import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row, Alert, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Image } from "react-bootstrap-icons";
// import { Rating } from "@mui/lab/";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray, hasNonEmptyProperty, displayDate, displayYear, getFirstItem, addErrorLog } from "shared-functions";
import { encodeURL, decodeURL, removeOnePixelImage, setLocalPath, setLocalImagePath, parse } from "../../utilities/ApplicationFunctions";
import EditTitle from "./EditTitle";
import TitleText from "./TitleText";
import Edition from "../editions/Edition";
import EditEdition from "../editions/EditEdition";
import UserReview from "../userReviews/UserReview";
import EditUserReview from "../userReviews/EditUserReview";

const Title = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: applicationVersion, linkItem, match -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "Title";

  const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const profileType = useSelector(state => state.applicationSettings.profileType);
  const siteName = useSelector(state => state.applicationSettings.siteName);
  const applicationName = useSelector(state => state.applicationSettings.applicationName);
  // const applicationVersion = useSelector(state => state.applicationSettings.applicationVersion);
  const computerLog = useSelector(state => state.applicationSettings.computerLog);
  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);
  const userID = useSelector(state => state.user.userID);

  // const electronicOnly = useSelector(state => state.applicationSettings.electronicOnly);
  // const userElectronicOnly = useSelector(state => state.applicationSettings.userElectronicOnly);
  // const electronicOnlyMessage = useSelector(state => state.applicationSettings.electronicOnlyMessage);
  // const physicalOnly = useSelector(state => state.applicationSettings.physicalOnly);
  // const userPhysicalOnly = useSelector(state => state.applicationSettings.userPhysicalOnly);
  // const physicalOnlyMessage = useSelector(state => state.applicationSettings.physicalOnlyMessage);

  const arrayTitles = useSelector(state => state.titles.arrayTitles);
  // const arrayEditions = useSelector(state => state.editions.arrayEditions);
  // const arrayUserReviewsRatings = useSelector(state => state.userReviews.arrayUserReviewsRatings);
  const arrayUserReviews = useSelector(state => state.userReviews.arrayUserReviews);

  const applicationVersion = useSelector(state => state.applicationSettings.applicationVersion);

  // let applicationVersion = isEmpty(props) === false && isEmpty(props.applicationVersion) === false ? props.applicationVersion : null;
  let linkItem = isEmpty(props) === false && isEmpty(props.linkItem) === false ? props.linkItem : null;
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

  const [titleParam, setTitleParam] = useState(null);
  const [titleList, setTitleList] = useState([]);
  const [titleNameBreadCrumb, setTitleNameBreadCrumb] = useState("");
  const [titleID, setTitleID] = useState("");
  const [titlePublicationDate, setTitlePublicationDate] = useState("");
  const [titleImageName, setTitleImageName] = useState("");
  // const [editionList, setEditionList] = useState([]);
  // const [userReviews, setUserReviews] = useState([]);
  const [userReviewItem, setUserReviewItem] = useState({});
  // const [userReviewRatingItem, setUserReviewRatingItem] = useState({});
  // const [overallTitleRating, setOverallTitleRating] = useState(0);
  // const [overallTitleRatingCount, setOverallTitleRatingCount] = useState(0);

  // const [overallTitleRatingMessage, setOverallTitleRatingMessage] = useState("");
  // const [errOverallTitleRatingMessage, setErrOverallTitleRatingMessage] = useState("");
  // const [overallTitleRatingResultsFound, setOverallTitleRatingResultsFound] = useState(null);
  // const [overallTitleRating, setOverallTitleRating] = useState(null);
  // const [overallTitleRatingCount, setOverallTitleRatingCount] = useState(0);


  useEffect(() => {

    if (isEmpty(linkItem) === false && isEmpty(linkItem.linkName) === false) {

      setTitleParam(linkItem.linkName); // match.params.category;

    };

  }, [linkItem]);


  useEffect(() => {

    // let titleNameBreadCrumb = "";
    // let titleID = "";
    // let titlePublicationDate = "";
    // let titleImageName = "";
    // ! This code is causing React to have too many re-renders in this location
    // const [titleID, setTitleID] = useState("");
    // const [titlePublicationDate, setTitlePublicationDate] = useState("");

    let newTitleList = [];
    // let newEditionList = [];

    if (isNaN(titleParam) === false) {

      newTitleList = arrayTitles.filter(title => title.titleID === parseInt(titleParam));

      // newEditionList = arrayEditions.filter(edition => edition.titleID === parseInt(titleParam));

      if (isEmpty(newTitleList) === false) {

        // ! This code no longer works with the current URL setup
        // * If titleParam is a number, then it's the titleID
        document.title = newTitleList[0].titleName + " | " + applicationName + " | " + siteName;
        setTitleNameBreadCrumb(newTitleList[0].titleName);
        setTitleID(newTitleList[0].titleID);
        setTitlePublicationDate(newTitleList[0].publicationDate);
        setTitleImageName(newTitleList[0].imageName);
        // setTitleID(newTitleList[0].titleID);
        // setTitlePublicationDate(newTitleList[0].publicationDate);

      };

    } else if (isEmpty(titleParam) === false) {

      // * If titleParam is not a number, then it's the title name
      newTitleList = arrayTitles.filter(title => title.titleURL === titleParam);
      let title = arrayTitles.find(title => title.titleURL === titleParam);

      if (isEmpty(title) === false) {

        document.title = title.titleName + " | " + applicationName + " | " + siteName;
        setTitleNameBreadCrumb(title.titleName);
        setTitleID(title.titleID);
        setTitlePublicationDate(title.publicationDate);
        setTitleImageName(title.imageName);
        // setTitleID(title.titleID);
        // setTitlePublicationDate(title.publicationDate);

        // newEditionList = arrayEditions.filter(edition => edition.titleID === parseInt(title.titleID));

      } else {

        document.title = "Title Not Found | " + applicationName + " | " + siteName;
        console.error("Title not found.");
        // // Display all active titles
        // newTitleList = arrayTitles;
        // // Display all active editions
        // newEditionList = arrayEditions;
        // addErrorMessage("Title not found.")

      };

    } else {

      document.title = "All Titles | " + applicationName + " | " + siteName;
      // * Display all active titles
      // newTitleList = [...arrayTitles];
      newTitleList = arrayTitles.filter(title => title.titleActive === true || title.titleActive === 1);
      // * Display all active editions
      // newEditionList = [...arrayEditions];
      // newEditionList = arrayEditions.filter(edition => edition.editionActive === true || edition.editionActive === 1);

    };

    // if (electronicOnly === true || userElectronicOnly === true) {

    // ! How does Knex handle the leftOuterJoin with two columns of the same name?:  active, publicationDate, imageName, sortID, updatedBy, createDate, updateDate
    //   // newEditionList = newEditionList.filter(edition => edition.medium.electronic === true);
    //   newEditionList = newEditionList.filter(edition => edition.electronic === true || edition.electronic === 1);

    // } else if (physicalOnly === true || userPhysicalOnly === true) {

    // ! How does Knex handle the leftOuterJoin with two columns of the same name?:  active, publicationDate, imageName, sortID, updatedBy, createDate, updateDate
    //   // newEditionList = newEditionList.filter(edition => edition.medium.electronic === false);
    //   newEditionList = newEditionList.filter(edition => edition.electronic === false || edition.electronic === 0);

    // } else {

    //   newEditionList = [...newEditionList];

    // };

    if (isEmpty(admin) === false && admin === true) {

      // newTitleList = [...newTitleList];
      // // newEditionList = [...newEditionList];

    } else {

      newTitleList = newTitleList.filter(title => title.titleActive === true || title.titleActive === 1);
      // newEditionList = newEditionList.filter(edition => edition.editionActive === true || edition.editionActive === 1);

    };

    // * Sort the newTitleList array by title.titleSort
    // * Really not needed here since there should only be one item in the array
    newTitleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

    //   // * Sort the newEditionList array by media.sortID
    //   // newEditionList.sort((a, b) => (a.medium.sortID > b.medium.sortID) ? 1 : -1);
    //   newEditionList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

    setTitleList(newTitleList);

    // setEditionList(newEditionList);

  }, [titleParam, arrayTitles]);


  useEffect(() => {

    let newUserReviews = arrayUserReviews.filter(userReview => userReview.titleID === titleID);

    let newUserReviewItem = {};

    if (isEmpty(userID) === false && !isNaN(userID) === true) {

      newUserReviewItem = getFirstItem(newUserReviews.filter(userReview => userReview.userID === userID));

    };

    // setUserReviews(newUserReviews);

    setUserReviewItem(newUserReviewItem);

    // let newUserReviewRatingItem = {};

    // if (isEmpty(titleID) === false && !isNaN(titleID) === true) {

    //   newUserReviewRatingItem = getFirstItem(arrayUserReviewsRatings.filter(userReview => userReview.titleID === titleID));

    // };

    // let newOverallTitleRating = 0;
    // let newOverallTitleRatingCount = 0;

    // if (isEmpty(newUserReviewRatingItem) === false) {

    //   if (isEmpty(userReviewRatingItem.userReviewCount) === false) {

    //     userReviewCount = userReviewRatingItem.userReviewCount;

    //   };

    //   if (isEmpty(userReviewRatingItem.userReviewSum) === false) {

    //     userReviewSum = userReviewRatingItem.userReviewSum;

    //   };

    // };

    // setUserReviewRatingItem(newUserReviewRatingItem);
    // setOverallTitleRating(newOverallTitleRating);
    // setOverallTitleRatingCount(newOverallTitleRatingCount);

  }, [arrayUserReviews]);


  useEffect(() => {

    if (isEmpty(titleList) === false) {

      clearMessages();

    } else {

      addErrorMessage("Title not found.");

    };

  }, [titleList]);


  // useEffect(() => {

  //     if (isEmpty(titleID) === false && isEmpty(overallTitleRatingResultsFound) === false) {

  //         getTitleRating();

  //     };

  // }, [titleID]);


  useEffect(() => {

    if (isEmpty(titleList) === false) {

      addVisitLog();

    };

  }, [titleList]);


  // const getTitleRating = () => {

  //     setOverallTitleRatingMessage("");
  //     setErrOverallTitleRatingMessage("");
  //     setOverallTitleRatingResultsFound(null);
  //     setOverallTitleRating(null);
  //     setOverallTitleRatingCount(0);

  //     let url = baseURL + "userreviews/";

  //     if (isEmpty(titleID) === false) {

  //         url = url + "rating/" + titleID;


  //         fetch(url)
  //         .then(results => {

  //             if (results.ok !== true) {

  //                 // throw Error(results.status + " " + results.statusText + " " + results.url);
  //                 return {transactionSuccess: false, errorOccurred: true, message: "Offline User Reviews Rating data fetch used."};

  //             } else {

  //                 return results.json();

  //             };

  //         })
  //         .then(results => {

  //             setOverallTitleRatingResultsFound(results.transactionSuccess);
  //             setOverallTitleRatingMessage(results.message);

  //             if (isEmpty(results) === false && results.transactionSuccess === true) {

  //                 setOverallTitleRatingCount(results.userReviews[0].userReviewCount);
  //                 let userReviewCount = results.userReviews[0].userReviewCount;

  //                 if (userReviewCount > 0) {

  //                     let userReviewSum = results.userReviews[0].userReviewSum;
  //                     // Check for division by zero?
  //                     // let userReviewAverage: number = userReviewSum/0;
  //                     let userReviewAverage = userReviewSum/userReviewCount;


  //                     setOverallTitleRating(userReviewAverage);

  //                 };

  //             } else {
  //                 console.error(componentName, getDateTime(), "getEditions error", results.message);

  //                 setErrOverallTitleRatingMessage(results.message);

  //             };

  //         })
  //         .catch((error) => {

  //             console.error(componentName, getDateTime(), "getTitleRating error", error);

  //             // console.error(componentName, getDateTime(), "getTitleRating error.name", error.name);
  //             // console.error(componentName, getDateTime(), "getTitleRating error.message", error.message);
  //             setErrOverallTitleRatingMessage(error.name + ": " + error.message);

  //            addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

  //         });

  //     };

  // };


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

      title: titleList[0].titleName,
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

            {isEmpty(titleList[0]) === false && isEmpty(titleList[0].category) === false && isNaN(titleList[0].category) ?

              <BreadcrumbItem><Link to={encodeURL(titleList[0].category)} onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(titleList[0].category)); }}>{titleList[0].category}</Link></BreadcrumbItem>

              :

              <BreadcrumbItem><Link to={"/titles/"} onClick={(event) => { event.preventDefault(); redirectPage("/titles/"); }}>All Titles</Link></BreadcrumbItem>

            }

            <BreadcrumbItem active>{titleNameBreadCrumb}</BreadcrumbItem>
          </Breadcrumb>

        </Col>
      </Row>

      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      {isNonEmptyArray(titleList) === true ?

        <React.Fragment>

          {titleList.map((title) => {

            let activeString = "";

            if (title.titleActive === true || title.titleActive === 1) {

              // activeString = "Active";
              activeString = "";

            } else {

              activeString = "Inactive";

            };

            return (
              <React.Fragment key={title.titleID}>
                <Row>
                  <Col xs="12">
                    <h4>{title.titleName}

                      {isEmpty(title.publicationDate) === false ? <span className="ms-2 smaller-text"> ({title.publicationDate.includes("-01-01") === true ? <React.Fragment>{displayYear(title.publicationDate)}</React.Fragment> : <React.Fragment>{displayDate(title.publicationDate)}</React.Fragment>})</span> : null}

                      {/* {isEmpty(title.category) === false ? <span className="ms-4 smaller-text"><Link to={encodeURL(title.category)}>{title.category}</Link>
                            </span> : null} */ }

                      {isEmpty(activeString) === false ? <span className="ms-2 inactive-item">({activeString})</span> : null}

                    </h4>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col xs="12">

                    <p>{title.authorFirstName} {title.authorLastName}</p>

                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col xs="4">

                    {isEmpty(title.imageName) === false ? <img onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName, profileType)} alt={title.titleName} className="cover-display" /> : <Image className="no-image-icon" />}

                  </Col>
                  <Col xs="8">

                    {applicationAllowUserInteractions === true && isEmpty(title.userReviewCount) === false && title.userReviewCount > 0 && title.userReviewAverage > 0 ?

                      <React.Fragment>

                        {/* <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={title.userReviewAverage} /> */}
                        <p><small>out of {title.userReviewCount} review(s)</small></p>

                      </React.Fragment>

                      : null}

                    {applicationAllowUserInteractions === true && isEmpty(userReviewItem) === false ?

                      <React.Fragment>

                        {isEmpty(userReviewItem.read) === false && userReviewItem.read === true && (isEmpty(userReviewItem.dateRead) === true) ? <p>Read</p> : null}
                        {isEmpty(userReviewItem.dateRead) === false ? <p>Read on {displayDate(userReviewItem.dateRead)}</p> : null}

                      </React.Fragment>

                      : null}

                    {isEmpty(title.shortDescription) === false ? <p className="display-paragraphs">{title.shortDescription}</p> : null}

                    {isEmpty(title.urlPKDWeb) === false ? <p><a href={title.urlPKDWeb} target="_blank" rel="noopener">Encyclopedia Dickiana</a></p> : null}

                    {isEmpty(title.urlPKDBookshelf) === false ? <p><a href={title.urlPKDBookshelf} target="_blank" rel="noopener">PKD Bookshelf</a></p> : null}

                    {isEmpty(title.writtenDate) === false ? <p>Manuscript Written Date: {displayDate(title.writtenDate)}</p> : null}

                    {isEmpty(title.submissionDate) === false ? <p>Manuscript Submission Date: {displayDate(title.submissionDate)}</p> : null}

                    {isEmpty(title.manuscriptTitle) === false ? <p>Manuscript Title: {title.manuscriptTitle}</p> : null}

                    {applicationAllowUserInteractions === true && isEmpty(sessionToken) === false && isEmpty(userID) === false && isEmpty(userReviewItem) === true ?

                      <EditUserReview titleID={title.titleID} />

                      : null}

                    {isEmpty(admin) === false && admin === true ?

                      <Row>

                        <EditEdition titleID={title.titleID} titlePublicationDate={titlePublicationDate} titleImageName={titleImageName} />

                      </Row>

                      : null}

                  </Col>
                </Row>

              </React.Fragment>
            );
          })}

        </React.Fragment>

        : null}

      {isEmpty(admin) === false && admin === true ?

        <Row>

          <EditTitle />

        </Row>

        : null}

      {isEmpty(admin) === false && admin === true ?

        <Row>

          <EditTitle titleID={titleID} />

        </Row>

        : null}

      {isEmpty(admin) === false && admin === true ?

        <Row>

          <TitleText titleID={titleID} />

        </Row>

        : null}

      <Row>

        <Edition titleID={titleID} titlePublicationDate={titlePublicationDate} titleImageName={titleImageName} />

      </Row>

      {applicationAllowUserInteractions === true ?

        <Row>

          <UserReview titleID={titleID} />

        </Row>

        : null}

    </Container>
  );
};

export default Title;
