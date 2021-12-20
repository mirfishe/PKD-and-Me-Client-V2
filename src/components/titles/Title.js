import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, Alert, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import { Rating } from "@material-ui/lab/";
import Parse from "html-react-parser";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty, DisplayDate, DisplayYear, encodeURL, decodeURL, removeOnePixelImage, setLocalPath, setLocalImagePath } from "../../utilities/SharedFunctions";
import { LogError } from "../../utilities/AppFunctions";
import { setPageURL } from "../../app/urlsSlice";
// import AddTitle from "./AddTitle";
import EditTitle from "./EditTitle";
import Edition from "../editions/Edition";
// import AddEdition from "../editions/AddEdition";
import EditEdition from "../editions/EditEdition";
import UserReview from "../userReviews/UserReview";
// import AddUserReview from "../userReviews/AddUserReview";
import EditUserReview from "../userReviews/EditUserReview";

const Title = (props) => {

  const componentName = "Title.js";

  const dispatch = useDispatch();
  const history = useHistory();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  const applicationVersion = useSelector(state => state.app.applicationVersion);
  const computerLog = useSelector(state => state.app.computerLog);

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);
  const userID = useSelector(state => state.user.userID);
  // console.log(componentName, GetDateTime(), "userID", userID);

  // const electronicOnly = useSelector(state => state.app.electronicOnly);
  // const userElectronicOnly = useSelector(state => state.app.userElectronicOnly);
  // const electronicOnlyMessage = useSelector(state => state.app.electronicOnlyMessage);
  // const physicalOnly = useSelector(state => state.app.physicalOnly);
  // const userPhysicalOnly = useSelector(state => state.app.userPhysicalOnly);
  // const physicalOnlyMessage = useSelector(state => state.app.physicalOnlyMessage);

  const [errTitleMessage, setErrTitleMessage] = useState("");
  // const [errEditionMessage, setErrEditionMessage] = useState("");

  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, GetDateTime(), "titleListState", titleListState);
  // const editionListState = useSelector(state => state.editions.arrayEditions);
  // console.log(componentName, GetDateTime(), "editionListState", editionListState);

  // console.log(componentName, GetDateTime(), "props.match.params", props.match.params);
  const titleParam = props.linkItem.linkName; // props.match.params.title;
  // console.log(componentName, GetDateTime(), "typeof titleParam", typeof titleParam);
  // console.log(componentName, GetDateTime(), "titleParam", titleParam);

  let titleNameBreadCrumb = "";
  let titleID = "";
  let titlePublicationDate = "";
  let titleImageName = "";
  // ! This code is causing React to have too many re-renders in this location
  // const [titleID, setTitleID] = useState("");
  // const [titlePublicationDate, setTitlePublicationDate] = useState("");

  let titleList = [];
  // let editionList = [];

  if (!isNaN(titleParam)) {

    // ! This code no longer works with the current URL setup
    // * If titleParam is a number, then it's the titleID
    document.title = titleList[0].titleName + " | " + appName + " | " + siteName;
    titleNameBreadCrumb = titleList[0].titleName;
    titleID = titleList[0].titleID;
    titlePublicationDate = titleList[0].publicationDate;
    titleImageName = titleList[0].imageName;
    // setTitleID(titleList[0].titleID);
    // setTitlePublicationDate(titleList[0].publicationDate);

    titleList = titleListState.filter(title => title.titleID === parseInt(titleParam));

    // editionList = editionListState.filter(edition => edition.titleID === parseInt(titleParam));

  } else if (IsEmpty(titleParam) === false) {

    // * If titleParam is not a number, then it's the title name
    titleList = titleListState.filter(title => title.titleURL === titleParam);
    const title = titleListState.find(title => title.titleURL === titleParam);
    // console.log(componentName, GetDateTime(), "typeof title", typeof title);
    // console.log(componentName, GetDateTime(), "title", title);

    if (IsEmpty(title) === false) {

      document.title = title.titleName + " | " + appName + " | " + siteName;
      titleNameBreadCrumb = title.titleName;
      titleID = title.titleID;
      titlePublicationDate = title.publicationDate;
      titleImageName = title.imageName;
      // setTitleID(title.titleID);
      // setTitlePublicationDate(title.publicationDate);

      // editionList = editionListState.filter(edition => edition.titleID === parseInt(title.titleID));

    } else {

      document.title = "Title Not Found | " + appName + " | " + siteName;
      console.error("Title not found.");
      // console.log(componentName, GetDateTime(), "titleParam", titleParam);
      // // Display all active titles
      // titleList = titleListState;
      // // Display all active editions
      // editionList = editionListState;
      // setErrTitleMessage("Title not found.")

    };

  } else {

    document.title = "All Titles | " + appName + " | " + siteName;
    // * Display all active titles
    // titleList = [...titleListState];
    titleList = titleListState.filter(title => title.titleActive === true || title.titleActive === 1);
    // * Display all active editions
    // editionList = [...editionListState];
    // editionList = editionListState.filter(edition => edition.editionActive === true || edition.editionActive === 1);

  };

  // if (electronicOnly === true || userElectronicOnly === true) {

  // ! How does Knex handle the leftOuterJoin with two columns of the same name?:  active, publicationDate, imageName, sortID, updatedBy, createDate, updateDate
  //   // editionList = editionList.filter(edition => edition.medium.electronic === true);
  //   editionList = editionList.filter(edition => edition.electronic === true || edition.electronic === 1);

  // } else if (physicalOnly === true || userPhysicalOnly === true) {

  // ! How does Knex handle the leftOuterJoin with two columns of the same name?:  active, publicationDate, imageName, sortID, updatedBy, createDate, updateDate
  //   // editionList = editionList.filter(edition => edition.medium.electronic === false);
  //   editionList = editionList.filter(edition => edition.electronic === false || edition.electronic === 0);

  // } else {

  //   editionList = [...editionList];

  // };

  if (IsEmpty(admin) === false && admin === true) {

    titleList = [...titleList];
    // editionList = [...editionList];

  } else {

    titleList = titleList.filter(title => title.titleActive === true || title.titleActive === 1);
    // editionList = editionList.filter(edition => edition.editionActive === true || edition.editionActive === 1);

  };

  // console.log(componentName, GetDateTime(), "titleList", titleList);

  // * Sort the titleList array by title.titleSort
  // * Really not needed here since there should only be one item in the array
  titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
  // console.log(componentName, GetDateTime(), "titleList", titleList);

  // * Sort the editionList array by media.sortID
  // console.log(componentName, GetDateTime(), "editionList", editionList);
  // // editionList.sort((a, b) => (a.medium.sortID > b.medium.sortID) ? 1 : -1);
  // editionList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);
  // console.log(componentName, GetDateTime(), "editionList", editionList);

  const userReviewsState = useSelector(state => state.userReviews.arrayUserReviews);
  // console.log(componentName, GetDateTime(), "userReviewsState", userReviewsState);

  let userReviews = userReviewsState.filter(userReview => userReview.titleID === titleID);

  let userReviewItem = {};

  if (IsEmpty(userID) === false && !isNaN(userID)) {

    userReviewItem = userReviews.filter(userReview => userReview.userID === userID);
    userReviewItem = userReviewItem[0];

  };

  // console.log(componentName, GetDateTime(), "userReviewsState", userReviewsState);
  // console.log(componentName, GetDateTime(), "userReviews", userReviews);
  // console.log(componentName, GetDateTime(), "userReviewItem", userReviewItem);
  // console.log(componentName, GetDateTime(), "typeof userReviewItem.read", typeof userReviewItem.read);
  // console.log(componentName, GetDateTime(), "userReviewItem.read", userReviewItem.read);
  // console.log(componentName, GetDateTime(), "typeof userReviewItem.dateRead", typeof userReviewItem.dateRead);
  // console.log(componentName, GetDateTime(), "userReviewItem.dateRead", userReviewItem.dateRead);
  // console.log(componentName, GetDateTime(), "typeof userReviewItem[0].read", typeof userReviewItem[0].read);
  // console.log(componentName, GetDateTime(), "userReviewItem[0].read", userReviewItem[0].read);
  // console.log(componentName, GetDateTime(), "typeof userReviewItem[0].dateRead", typeof userReviewItem[0].dateRead);
  // console.log(componentName, GetDateTime(), "userReviewItem[0].dateRead", userReviewItem[0].dateRead);

  // const userReviewsRatingsState = useSelector(state => state.userReviews.arrayUserReviewsRatings);
  // // console.log(componentName, GetDateTime(), "userReviewsState", userReviewsState);

  // let userReviewRatingItem = {};
  // // console.log(componentName, GetDateTime(), "userReviewRatingItem", userReviewRatingItem);

  // if (IsEmpty(titleID) === false && !isNaN(titleID)) {

  //     userReviewRatingItem = userReviewsRatingsState.filter(userReview => userReview.titleID === titleID);
  //     userReviewRatingItem = userReviewRatingItem[0];

  // };

  // let overallTitleRatingCount = 0;
  // let overallTitleRating = 0;

  // if (IsEmpty(userReviewRatingItem) === false) {

  //     if (HasNonEmptyProperty(userReviewRatingItem, "userReviewAverage")) {

  //         overallTitleRating = userReviewRatingItem.userReviewAverage;

  //     };

  //     if (HasNonEmptyProperty(userReviewRatingItem, "userReviewCount")) {

  //         overallTitleRatingCount = userReviewRatingItem.userReviewCount;

  //     };

  // };

  // const [overallTitleRatingMessage, setOverallTitleRatingMessage] = useState("");
  // const [errOverallTitleRatingMessage, setErrOverallTitleRatingMessage] = useState("");
  // const [overallTitleRatingResultsFound, setOverallTitleRatingResultsFound] = useState(null);
  // const [overallTitleRating, setOverallTitleRating] = useState(null);
  // const [overallTitleRatingCount, setOverallTitleRatingCount] = useState(0);

  // const getTitleRating = () => {
  //     // console.log(componentName, GetDateTime(), "getTitleRating baseURL", baseURL);

  //     setOverallTitleRatingMessage("");
  //     setErrOverallTitleRatingMessage("");
  //     setOverallTitleRatingResultsFound(null);
  //     setOverallTitleRating(null);
  //     setOverallTitleRatingCount(0);

  //     let url = baseURL + "userreviews/";

  //     if (IsEmpty(titleID) === false) {

  //         url = url + "rating/" + titleID;

  //         // console.log(componentName, GetDateTime(), "getTitleRating url", url);

  //         fetch(url)
  //         .then(response => {
  //             // console.log(componentName, GetDateTime(), "getTitleRating response", response);
  //             if (!response.ok) {
  //                 // throw Error(response.status + " " + response.statusText + " " + response.url);
  //                 return {resultsFound: false, message: "Offline User Reviews Rating data fetch used."};
  //             } else {
  //                 return response.json();
  //             };
  //         })
  //         .then(results => {
  //             // console.log(componentName, GetDateTime(), "getTitleRating results", results);

  //             setOverallTitleRatingResultsFound(results.resultsFound);
  //             setOverallTitleRatingMessage(results.message);

  //             if (IsEmpty(results) === false && results.resultsFound === true) {
  //                 // console.log(componentName, GetDateTime(), "getTitleRating results.userReviews[0].userReviewCount", results.userReviews[0].userReviewCount);
  //                 // console.log(componentName, GetDateTime(), "getTitleRating results.userReviews[0].userReviewSum", results.userReviews[0].userReviewSum);

  //                 setOverallTitleRatingCount(results.userReviews[0].userReviewCount);
  //                 let userReviewCount = results.userReviews[0].userReviewCount;

  //                 if (userReviewCount > 0) {

  //                     let userReviewSum = results.userReviews[0].userReviewSum;
  //                     // Check for division by zero?
  //                     // let userReviewAverage: number = userReviewSum/0;
  //                     let userReviewAverage = userReviewSum/userReviewCount;

  //                     // console.log(componentName, GetDateTime(), "getTitleRating userReviewCount", userReviewCount);
  //                     // console.log(componentName, GetDateTime(), "getTitleRating state.overallTitleRatingCount", state.overallTitleRatingCount);
  //                     // console.log(componentName, GetDateTime(), "getTitleRating userReviewSum", userReviewSum);
  //                     // console.log(componentName, GetDateTime(), "getTitleRating userReviewAverage", userReviewAverage);

  //                     setOverallTitleRating(userReviewAverage);

  //                 };

  //             } else {
  //                 console.log(componentName, GetDateTime(), "getEditions resultsFound error", results.message);

  //                 setErrOverallTitleRatingMessage(results.message);

  //             };

  //         })
  //         .catch((error) => {
  //             console.error(componentName, GetDateTime(), "getTitleRating error", error);

  //             // console.error(componentName, GetDateTime(), "getTitleRating error.name", error.name);
  //             // console.error(componentName, GetDateTime(), "getTitleRating error.message", error.message);
  //             setErrOverallTitleRatingMessage(error.name + ": " + error.message);

  //            let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

  //         });

  //     };

  // };


  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect titleList", titleList);

    if (titleList.length > 0) {

      setErrTitleMessage("");

    } else {

      setErrTitleMessage("Title not found.");

    };

  }, [titleList]);


  // useEffect(() => {
  //     // console.log(componentName, GetDateTime(), "useEffect titleID", titleID);

  //     if (IsEmpty(titleID) === false && IsEmpty(overallTitleRatingResultsFound) === false) {

  //         getTitleRating();

  //     };

  // }, [titleID]);


  // useEffect(() => {
  //     // console.log(componentName, GetDateTime(), "useEffect editionList", editionList);

  //     if (editionList.length > 0) {

  //         setErrEditionMessage("");

  //     } else {

  //         setErrEditionMessage("No editions found.");

  //     };

  // }, [editionList]);


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

      title: titleList[0].titleName,
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

    if (titleList.length > 0) {

      saveRecord();

    };

  }, [titleList]);


  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12">

          <Breadcrumb className="breadcrumb mb-2">
            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>

            {IsEmpty(titleList[0]) === false && IsEmpty(titleList[0].category) === false && isNaN(titleList[0].category) ?

              <BreadcrumbItem><Link to={encodeURL(titleList[0].category)} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(encodeURL(titleList[0].category)); }}>{titleList[0].category}</Link></BreadcrumbItem>

              :

              <BreadcrumbItem><Link to={"/titles/"} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage("/titles/"); }}>All Titles</Link></BreadcrumbItem>

            }

            <BreadcrumbItem active>{titleNameBreadCrumb}</BreadcrumbItem>
          </Breadcrumb>

        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs="12">

          {IsEmpty(errTitleMessage) === false ? <Alert color="danger">{errTitleMessage}</Alert> : null}

        </Col>
      </Row>

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

                  {IsEmpty(title.publicationDate) === false ? <span className="ml-2 smallerText"> ({title.publicationDate.includes("-01-01") === true ? <React.Fragment>{DisplayYear(title.publicationDate)}</React.Fragment> : <React.Fragment>{DisplayDate(title.publicationDate)}</React.Fragment>})</span> : null}

                  {/* {IsEmpty(title.category) === false ? <span className="ml-4 smallerText"><Link to={encodeURL(title.category)}>{title.category}</Link>
                            </span> : null} */}

                  {IsEmpty(activeString) === false ? <span className="ml-2 inactiveItem">({activeString})</span> : null}

                  {/* {IsEmpty(admin) === false && admin === true ? <AddTitle displayButton={true} /> : null} */}

                  {IsEmpty(admin) === false && admin === true ? <EditTitle titleID={title.titleID} displayButton={true} /> : null}

                  {IsEmpty(admin) === false && admin === true ? <EditEdition titleID={title.titleID} titlePublicationDate={titlePublicationDate} titleImageName={titleImageName} displayButton={true} /> : null}

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

                {IsEmpty(title.imageName) === false ? <img onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} className="coverDisplay" /> : <Image className="noImageIcon" />}

              </Col>
              <Col xs="8">

                {appAllowUserInteractions === true && IsEmpty(title.userReviewCount) === false && title.userReviewCount > 0 && title.userReviewAverage > 0 ?

                  <React.Fragment>

                    <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={title.userReviewAverage} />
                    <p><small>out of {title.userReviewCount} review(s)</small></p>

                  </React.Fragment>

                  : null}

                {appAllowUserInteractions === true && IsEmpty(userReviewItem) === false ?

                  <React.Fragment>

                    {IsEmpty(userReviewItem.read) === false && userReviewItem.read === true && (IsEmpty(userReviewItem.dateRead) === true) ? <p>Read</p> : null}
                    {IsEmpty(userReviewItem.dateRead) === false && userReviewItem.dateRead !== "" ? <p>Read on {DisplayDate(userReviewItem.dateRead)}</p> : null}

                  </React.Fragment>

                  : null}

                {/* {appAllowUserInteractions === true && IsEmpty(sessionToken) === false && IsEmpty(userID) === false && IsEmpty(userReviewItem) === true ? <AddUserReview titleID={title.titleID} displayButton={true} /> : null} */}

                {appAllowUserInteractions === true && IsEmpty(sessionToken) === false && IsEmpty(userID) === false && IsEmpty(userReviewItem) === false ? <EditUserReview reviewID={userReviewItem.reviewID} displayButton={true} /> : null}

                {IsEmpty(title.shortDescription) === false ? <p className="displayParagraphs">{title.shortDescription}</p> : null}

                {IsEmpty(title.urlPKDWeb) === false ? <p><a href={title.urlPKDWeb} target="_blank" rel="noopener noreferrer">Encyclopedia Dickiana</a></p> : null}

                {IsEmpty(title.submissionDate) === false ? <p>Manuscript Submission Date: {DisplayDate(title.submissionDate)}</p> : null}

                {/* {IsEmpty(admin) === false && admin === true ? <AddEdition titleID={title.titleID} titlePublicationDate={titlePublicationDate} titleImageName={titleImageName} displayButton={true} /> : null} */}

                {/* {IsEmpty(admin) === false && admin === true ? <EditEdition titleID={title.titleID} titlePublicationDate={titlePublicationDate} titleImageName={titleImageName} displayButton={true} /> : null} */}

              </Col>
            </Row>

          </React.Fragment>
        );
      })}

      {/* <Row className="my-4">
                <Col className="text-center" xs="12">

                {IsEmpty(errEditionMessage) === false ? <Alert color="danger">{errEditionMessage}</Alert> : null}

                {electronicOnly === true || userElectronicOnly === true ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}

                {physicalOnly === true || userPhysicalOnly === true ? <Alert color="info">{physicalOnlyMessage}</Alert> : null}

                </Col>
            </Row>

            {editionList.length > 0 ?
            
            <Row className="my-4">
                <Col xs="12">

                    <h5 className="text-center">Find A Copy 
                    {IsEmpty(admin) === false && admin === true ? <EditEdition titleID={titleID} titlePublicationDate={titlePublicationDate} titleImageName={titleImageName}  displayButton={true} /> : null}
                    </h5>

                </Col>
            </Row>

            : null}

            <Row>

            {editionList.map((edition) => {

                let activeString = "";

                if (edition.editionActive === true || edition.editionActive === 1) {
                
                    // activeString = "Active";
                    activeString = "";

                } else {
                
                    activeString = "Inactive";

                };

            return (
                <Col key={edition.editionID} xs="6" className="mb-4"> */}

      {/* <Card key={edition.editionID}>
                    <CardHeader>

                        <Link to={encodeURL(edition.medium.media)}>{edition.medium.media}</Link>

                    </CardHeader>
                    <CardBody>

                    {IsEmpty(edition.imageLinkLarge) === false ? 
                    
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />

                    :

                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                        {IsEmpty(edition.imageName) === false ? <img src={setLocalImagePath(edition.imageName)} alt={titleItem.titleName + " is available for purchase at Amazon.com"} className="editionImage" /> : <Image className="noImageIcon"/>}
                        </a>

                    }

                    </CardBody>
                    <CardFooter>

                        {IsEmpty(edition.editionPublicationDate) === false ? <CardText>Released: {DisplayDate(editionPublicationDate)}</CardText> : null}

                    </CardFooter>
                    </Card> */}

      {/* <Card key={edition.editionID}>

                    {IsEmpty(activeString) === false ?
                    
                        <CardHeader className="cardHeader inactiveItem">
                            ({activeString})
                        </CardHeader>

                    : null}

                    <Row className="no-gutters">
                        <Col className="col-md-6">

                        {IsEmpty(edition.imageLinkLarge) === false ? 
                        
                            <div dangerouslySetInnerHTML={{"__html": removeOnePixelImage(edition.imageLinkLarge, edition.ASIN)}} />
                            
                        :

                            <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                            {IsEmpty(edition.imageName) === false ? <img src={setLocalImagePath(edition.imageName)} alt={titleItem.titleName + " is available for purchase at Amazon.com"} className="editionImage" /> : <Image className="noImageIcon"/>}
                            </a>

                        }

                        </Col>
                        <Col className="col-md-6">
                            <CardBody>

                                {IsEmpty(edition.editionPublicationDate) === false ? <CardText className="smallerText">Released: {DisplayDate(editionPublicationDate)}</CardText> : null}
                                {IsEmpty(admin) === false && admin === true ? <EditEdition editionID={edition.editionID} titlePublicationDate={titlePublicationDate} titleImageName={titleImageName}  displayButton={true} /> : null}

                            </CardBody>
                        </Col>
                    </Row>
                    <CardFooter className="cardFooter">

                        <CardText><Link to={encodeURL(edition.medium.media)} onClick={(event) => {event.preventDefault(); redirectPage(encodeURL(edition.medium.media));}}>{edition.medium.media}</Link></CardText>

                    </CardFooter>
                    </Card>

                </Col>
                )
            })}
            </Row> */}

      <Row>

        <Edition titleID={titleID} titlePublicationDate={titlePublicationDate} titleImageName={titleImageName} />

      </Row>

      {appAllowUserInteractions === true ?

        <Row>

          <UserReview titleID={titleID} />

        </Row>

        : null}

    </Container>
  );
};

export default Title;
