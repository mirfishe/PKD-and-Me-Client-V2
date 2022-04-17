import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem, NavLink } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime, hasNonEmptyProperty, displayYear } from "shared-functions";
import { encodeURL, decodeURL, setLocalPath, setLocalImagePath, addErrorLog } from "../../utilities/ApplicationFunctions";
import { setTitleSortBy } from "../../app/titlesSlice";
import { setEditionSortBy } from "../../app/editionsSlice";
import { setPageURL } from "../../app/urlsSlice";
// import AddTitle from "./AddTitle";
import EditTitle from "./EditTitle";
// import AddEdition from "../editions/AddEdition";
// import EditEdition from "../editions/EditEdition";

const Titles = (props) => {

  const componentName = "Titles";

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

  // const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const titleSortBy = useSelector(state => state.titles.titleSortBy);

  const electronicOnly = useSelector(state => state.applicationSettings.electronicOnly);
  const userElectronicOnly = useSelector(state => state.applicationSettings.userElectronicOnly);
  // const electronicOnlyMessage = useSelector(state => state.applicationSettings.electronicOnlyMessage);
  const physicalOnly = useSelector(state => state.applicationSettings.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.applicationSettings.userPhysicalOnly);
  // const physicalOnlyMessage = useSelector(state => state.applicationSettings.physicalOnlyMessage);

  // const [errCategoryMessage, setErrCategoryMessage] = useState("");
  const [errTitleMessage, setErrTitleMessage] = useState("");

  const titleListState = useSelector(state => state.titles.arrayTitles);
  const categoryListState = useSelector(state => state.categories.arrayCategories);
  const editionListState = useSelector(state => state.editions.arrayEditions);

  let categoryParam;

  if (isEmpty(props.linkItem) === false && hasNonEmptyProperty(props.linkItem, "linkName")) {

    categoryParam = props.linkItem.linkName; // props.match.params.category;

  };

  let editionList = [...editionListState];

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


  const sortTitles = (sortBy) => {

    if (isEmpty(titleList) === false && titleList.length > 0) {

      if (sortBy === "publicationDate") {

        // * Sort the titleList array by title.publicationDate
        // ! Doesn't handle null values well; treats them as "null"
        // titleList.sort((a, b) => (a.publicationDate > b.publicationDate) ? 1 : -1);

        // * Sort by titleSort first to order the items with a null value for publicationDate?
        // titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
        // ! Doesn't sort at all
        // https://stackoverflow.com/questions/29829205/sort-an-array-so-that-null-values-always-come-last
        // https://stackoverflow.com/questions/2328562/javascript-sorting-array-of-mixed-strings-and-null-values
        // titleList.sort((a, b) => ((b.publicationDate !== null) - (a.publicationDate !== null) || a.publicationDate - b.publicationDate));

        // ! Doesn't sort correctly
        // * https://stackoverflow.com/questions/29829205/sort-an-array-so-that-null-values-always-come-last
        // * https://stackoverflow.com/questions/2328562/javascript-sorting-array-of-mixed-strings-and-null-values
        // titleList.sort(function(a, b) {
        //     if (a.publicationDate === b.publicationDate) {

        //         // titleSort is only important when publicationDates are the same
        //         return b.titleSort - a.titleSort;

        //      };

        //     return ((b.publicationDate != null) - (a.publicationDate != null) || a.publicationDate - b.publicationDate);
        // });

        // * Separate the array items with undefined/null values, sort them appropriately and then concatenate them back together
        let titleListPublicationDate = titleList.filter(title => title.titlePublicationDate !== undefined && title.titlePublicationDate !== null);
        titleListPublicationDate.sort((a, b) => (a.titlePublicationDate > b.titlePublicationDate) ? 1 : -1);

        let titleListNoPublicationDate = titleList.filter(title => title.titlePublicationDate === undefined || title.titlePublicationDate === null);
        titleListNoPublicationDate.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

        let newTitleList = [...titleListPublicationDate];
        newTitleList.push(...titleListNoPublicationDate);

        titleList = [...newTitleList];

      } else if (sortBy === "titleName") {

        // * Sort the titleList array by title.titleSort
        titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

      } else {

        // * Sort the titleList array by title.titleSort
        titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

      };

    };

  };


  let titleList = [];

  if (!isNaN(categoryParam)) {

    // ! This code no longer works with the current URL setup
    // * If categoryParam is a number, then it's the categoryID
    document.title = titleList[0].category + " | " + applicationName + " | " + siteName;
    titleList = titleListState.filter(title => title.categoryID === parseInt(categoryParam));

  } else if (isEmpty(categoryParam) === false) {

    // * If categoryParam is not a number, then it's the category name
    const category = categoryListState.find(category => category.category === decodeURL(categoryParam));

    if (isEmpty(category) === false) {

      document.title = category.category + " | " + applicationName + " | " + siteName;
      titleList = titleListState.filter(title => title.categoryID === parseInt(category.categoryID));

    } else {

      document.title = "Category Not Found | " + applicationName + " | " + siteName;
      console.error("Category not found.");
      // // Display all active titles
      // titleList = titleListState;
      // // Display all editions
      // editionList = editionListState;
      // setErrCategoryMessage("Category not found.")

    };

  } else {

    document.title = "All Titles | " + applicationName + " | " + siteName;
    // Display all active titles
    titleList = [...titleListState];
    // titleList = titleListState.filter(title => title.titleActive === true || title.titleActive === 1);

  };

  if (isEmpty(admin) === false && admin === true) {

    titleList = [...titleList];

  } else {

    // ! How does Knex handle the leftOuterJoin with two columns of the same name?:  active, publicationDate, imageName, sortID, updatedBy, createDate, updateDate
    // titleList = titleList.filter(title => (title.active === true || title.active === 1) && (title.category.active === true || title.category.active === 1));
    titleList = titleList.filter(title => (title.titleActive === true || title.titleActive === 1) && (title.categoryActive === true || title.categoryActive === 1));

  };



  // ! If the user is viewing electronic only editions, all titles still appear even if there are no electronic editions of that title. -- 08/09/2021 MF

  sortTitles(titleSortBy);


  const redirectPage = (linkName) => {

    // * Scroll to top of the page after clicking the link. -- 08/05/2021 MF
    window.scrollTo(0, 0);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

  };


  useEffect(() => {

    if (titleList.length > 0) {

      setErrTitleMessage("");

    } else {

      setErrTitleMessage("No titles found.");

    };

  }, [titleList]);


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

      title: "Titles",
      href: href,
      // applicationVersion: props.applicationVersion,
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

        data = results;

        // dispatch(setLocationLogged(true));

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), operationValue, "saveRecord error", error);

        // addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

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

            {isEmpty(categoryParam) === false && isNaN(categoryParam) ?

              <BreadcrumbItem active><Link to={categoryParam} onClick={(event) => { event.preventDefault(); redirectPage(categoryParam); }}>{decodeURL(categoryParam)}</Link></BreadcrumbItem>

              :

              <BreadcrumbItem active><Link to={"/titles/"} onClick={(event) => { event.preventDefault(); redirectPage("/titles/"); }}>All Titles</Link></BreadcrumbItem>

            }

          </Breadcrumb>

        </Col>
      </Row>
      <Row>
        <Col xs="12">

          <h4 className="text-center mb-4">{isEmpty(categoryParam) === false && isNaN(categoryParam) ? decodeURL(categoryParam) : "All Titles"}

            {/* {isEmpty(admin) === false && admin === true ? <AddTitle categoryName={decodeURL(categoryParam)} displayButton={true} /> : null} */}

            {isEmpty(admin) === false && admin === true ? <EditTitle categoryName={decodeURL(categoryParam)} displayButton={true} /> : null}

            <span className="text-muted ms-2 small-text">Sort By&nbsp;

              {titleSortBy !== "publicationDate" ?

                <a href="#" onClick={(event) => { event.preventDefault(); sortTitles("publicationDate"); dispatch(setTitleSortBy("publicationDate")); dispatch(setEditionSortBy("publicationDate")); }}>Publication Date</a>

                : null}

              {titleSortBy !== "titleName" ?

                <a href="#" onClick={(event) => { event.preventDefault(); sortTitles("titleName"); dispatch(setTitleSortBy("titleName")); dispatch(setEditionSortBy("titleName")); }}>Title</a>

                : null}

            </span>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs="12">

          {/* {isEmpty(errCategoryMessage) === false ? <Alert color="danger">{errCategoryMessage}</Alert> : null} */}
          {isEmpty(errTitleMessage) === false ? <Alert color="danger">{errTitleMessage}</Alert> : null}

        </Col>
      </Row>

      {Array.isArray(titleList) === true ?

        <Row>

          {titleList.map((title) => {

            let activeString = "";

            if (title.titleActive === true || title.titleActive === 1) {

              // activeString = "Active";
              activeString = "";

            } else {

              activeString = "Inactive";

            };

            const editionsAvailable = editionList.reduce((titleCount, edition) => edition.titleID === title.titleID ? ++titleCount : titleCount, 0);

            return (
              <Col key={title.titleID} xs="4" className="mb-4">

                {/* <Link to={`${title.titleID}`}>{title.titleID}</Link>
                    <Link to={`${title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}`}>{title.titleName}</Link>
                    <Link to={title.titleID}>{title.titleID}</Link>
                    <Link to={title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>

                    <Link to={`/editions/${title.titleID}`}>{title.titleID}</Link>
                    <Link to={`/editions/${title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}`}>{title.titleName}</Link>
                    <Link to={title.titleID}>{title.titleID}</Link>
                    <Link to={title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link> */}

                {/* <Card key={title.titleID}>

                    {isEmpty(categoryParam) === false ?
                    
                    <CardHeader>
                        <Link to={encodeURL(title.category)}>{title.category}</Link> */}

                {/* <Link to={title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>
                        {isEmpty(title.publicationDate) === false ? <span> <small>({displayYear(title.publicationDate)})</small></span> : null} */}

                {/* </CardHeader>  

                    : null} */}

                {/* <CardBody>

                        <Link to={title.titleURL}>
                        {isEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="no-image-icon" />}
                        </Link>
                        <CardText>{title.authorFirstName} {title.authorLastName}</CardText>

                    </CardBody>
                    <CardFooter> */}

                {/* <Link to={title.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category}</Link> */}

                {/* <Link to={title.titleURL}>{title.titleName}</Link>
                        {isEmpty(title.publicationDate) === false ? <span> <small>({displayYear(title.publicationDate)})</small></span> : null}
                    </CardFooter>
                    </Card> */}

                <Card key={title.titleID}>

                  {isEmpty(activeString) === false ?

                    <CardHeader className="card-header inactive-item">
                      ({activeString})
                    </CardHeader>

                    : null}

                  <Row className="no-gutters">
                    <Col className="col-md-4">

                      <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>

                        {isEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="no-image-icon" />}

                      </Link>

                    </Col>
                    <Col className="col-md-8">
                      <CardBody>

                        {/* <CardText><Link to={title.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category}</Link></CardText> */}

                        <CardText><Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>{title.titleName}</Link>

                          {isEmpty(title.publicationDate) === false ? <span className="ms-1 smaller-text">({displayYear(title.publicationDate)})</span> : null}</CardText>

                        <CardText className="smaller-text">{title.authorFirstName} {title.authorLastName}</CardText>

                        <CardText className="smaller-text">{editionsAvailable}<span> </span>

                          {electronicOnly === true || userElectronicOnly === true ? <span>electronic </span> : null}

                          {physicalOnly === true || userPhysicalOnly === true ? <span>physical </span> : null}

                          edition{editionsAvailable !== 1 ? <span>s</span> : null} available</CardText>

                        {/* {isEmpty(admin) === false && admin === true ? <EditTitle titleID={title.titleID} displayButton={true} /> : null} */}

                        {/* {isEmpty(admin) === false && admin === true ? <AddEdition titleID={title.titleID} titlePublicationDate={title.publicationDate} titleImageName={title.imageName} displayButton={true} /> : null} */}

                        {/* {isEmpty(admin) === false && admin === true ? <EditEdition titleID={title.titleID} titlePublicationDate={title.publicationDate} titleImageName={title.imageName} displayButton={true} /> : null} */}

                      </CardBody>
                    </Col>
                  </Row>

                  {isEmpty(categoryParam) === false ?

                    <CardFooter className="card-footer">

                      <CardText><Link to={encodeURL(title.category)} onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(title.category)); }}>{title.category}</Link></CardText>

                      {/* <Link to={title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>
                        {isEmpty(title.publicationDate) === false ? <span> <small>({displayYear(title.publicationDate)})</small></span> : null} */}

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

export default Titles;
