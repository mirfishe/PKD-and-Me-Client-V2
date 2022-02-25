import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Button } from "reactstrap";
import { Image, PencilSquare, Plus } from 'react-bootstrap-icons';
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime, formatLowerCase, formatUpperCase, removeHTML } from "../../utilities/SharedFunctions";
import { addErrorLog } from "../../utilities/ApplicationFunctions";

const Amazon = () => {

  const componentName = "Amazon";

  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, getDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, getDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;
  // console.log(componentName, getDateTime(), "baseURL", baseURL);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [amazonItemsCategory, setAmazonItemsCategory] = useState("PhilipKDick");

  const [amazonItems, setAmazonItems] = useState([]);
  const [amazonItemsPhilipKDick, setAmazonItemsPhilipKDick] = useState([]);
  const [amazonItemsBladeRunner, setAmazonItemsBladeRunner] = useState([]);
  const [amazonItemsTotalRecall, setAmazonItemsTotalRecall] = useState([]);
  const [amazonItemsMinorityReport, setAmazonItemsMinorityReport] = useState([]);
  const [amazonItemsTMITHC, setAmazonItemsTMITHC] = useState([]);
  const [amazonItemsNoCategory, setAmazonItemsNoCategory] = useState([]);
  const [amazonItemsIncorrectContext, setAmazonItemsIncorrectContext] = useState([]);

  // SELECT * FROM logs WHERE componentName = 'amazon-controller'

  // INSERT INTO amazon (ASIN, titleName, authorName, publicationDate, imageName, textLinkFull)
  // SELECT DISTINCT ASIN, titleName, authorName, publicationDate, imageName, textLinkFull FROM amazonImport
  // WHERE ASIN NOT IN (SELECT ASIN FROM amazon)

  // UPDATE amazon
  // SET active = 0,
  // viewed = 1
  // where authorName like '%Abnett, Dan%'

  // ! Need to account for changing images. -- 02/21/2022 MF
  // SELECT DISTINCT amazonImport.createDate, amazon.* FROM amazon
  // INNER JOIN amazonImport ON amazonImport.ASIN = amazon.ASIN
  // WHERE amazon.ASIN IN
  // (SELECT ASIN FROM amazon
  // group by ASIN
  // HAVING COUNT(*) > 1)
  // ORDER BY amazon.ASIN, amazonImport.createDate

  // -- SELECT amazonImport.ASIN, amazonSource.ASIN, amazonImport.publicationDate, amazonSource.publicationDate;
  // -- FROM amazonImport;
  // -- UPDATE amazonImport
  // INNER JOIN amazonImport AS amazonSource ON amazonImport.ASIN = amazonSource.ASIN AND amazonSource.publicationDate IS NOT NULL;
  // -- SET amazonImport.publicationDate = amazonSource.publicationDate
  // WHERE amazonImport.publicationDate IS NULL;

  // -- SELECT amazonImport.ASIN, amazonSource.ASIN, amazonImport.titleName, amazonSource.titleName
  // -- FROM amazonImport
  // -- UPDATE amazonImport
  // INNER JOIN amazonImport AS amazonSource ON amazonImport.ASIN = amazonSource.ASIN AND amazonSource.titleName IS NOT NULL
  // -- SET amazonImport.titleName = amazonSource.titleName
  // WHERE amazonImport.titleName IS NULL

  // -- SELECT amazon.ASIN, amazonSource.ASIN, amazon.publicationDate, amazonSource.publicationDate
  // -- FROM amazon
  // -- UPDATE amazon
  // INNER JOIN amazonImport AS amazonSource ON amazon.ASIN = amazonSource.ASIN AND amazonSource.publicationDate IS NOT NULL
  // -- SET amazon.publicationDate = amazonSource.publicationDate
  // WHERE amazon.publicationDate IS NULL

  // -- SELECT amazon.ASIN, amazonSource.ASIN, amazon.titleName, amazonSource.titleName
  // -- FROM amazon
  // -- UPDATE amazon
  // INNER JOIN amazonImport AS amazonSource ON amazon.ASIN = amazonSource.ASIN AND amazonSource.titleName IS NOT NULL
  // -- SET amazon.titleName = amazonSource.titleName
  // WHERE amazon.titleName IS NULL


  const filterAmazonItems = (amazonItems) => {
    // console.log(componentName, getDateTime(), "filterAmazonItems amazonItems", amazonItems);

    let newAmazonItems = [...amazonItems];
    let newAmazonItemsPhilipKDick = [];
    let newAmazonItemsBladeRunner = [];
    let newAmazonItemsTotalRecall = [];
    let newAmazonItemsMinorityReport = [];
    let newAmazonItemsTMITHC = [];
    let newAmazonItemsNoCategory = [];
    let newAmazonItemsIncorrectContext = [];


    for (let i = 0; i < amazonItems.length; i++) {

      // console.log(componentName, getDateTime(), "filterAmazonItems amazonItems[i]", amazonItems[i]);

      let categoryPhilipKDick = false;
      let categoryBladeRunner = false;
      let categoryTotalRecall = false;
      let categoryMinorityReport = false;
      let categoryTMITHC = false;
      let categoryIncorrectContext = false;

      if (isEmpty(amazonItems[i].authorName) === false) {

        // ? Remove the punctuation in the checks? -- 02/13/2022 MF
        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip k. dick") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip k dick") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick philip k") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick, philip k") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick, philip") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip dick") === true) {

          categoryPhilipKDick = true;

        };

        // if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip") === true && formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick") === true) {

        //   categoryPhilipKDick = true;

        // };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip kindred dick") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("pistorius") === true) {

          categoryIncorrectContext = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("van dyke") === true) {

          categoryIncorrectContext = true;

        };

      };

      if (isEmpty(amazonItems[i].titleName) === false) {

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("philip k. dick") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("philip k dick") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("dick philip k") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("dick, philip k") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("dick, philip") === true) {

          categoryPhilipKDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("philip dick") === true) {

          categoryPhilipKDick = true;

        };

        // if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("philip") === true && formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("dick") === true) {

        //   categoryPhilipKDick = true;

        // };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("philip kindred dick") === true) {

          categoryPhilipKDick = true;

        };

      };


      if (isEmpty(amazonItems[i].titleName) === false) {

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("blade runner") === true) {

          categoryBladeRunner = true;

        };

        // if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("blade runner 2049") === true) {

        //   categoryBladeRunner = true;

        // };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("black lotus") === true) {

          categoryBladeRunner = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("total recall") === true) {

          categoryTotalRecall = true;

        };

        // if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("electric dreams") === true) {

        //   inTitle = true;

        // };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("man in the high castle") === true) {

          categoryTMITHC = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("minority report") === true) {

          categoryMinorityReport = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("pistorius") === true) {

          categoryIncorrectContext = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("van dyke") === true) {

          categoryIncorrectContext = true;

        };

      };


      // if (amazonItems[i].active === true) {

      //   newAmazonItems.push(amazonItems[i]);

      // };

      if (categoryIncorrectContext !== true) {

        if (categoryPhilipKDick === true) {

          newAmazonItemsPhilipKDick.push(amazonItems[i]);

        };

        if (categoryBladeRunner === true) {

          newAmazonItemsBladeRunner.push(amazonItems[i]);

        };

        if (categoryTotalRecall === true) {

          newAmazonItemsTotalRecall.push(amazonItems[i]);

        };

        if (categoryTMITHC === true) {

          newAmazonItemsTMITHC.push(amazonItems[i]);

        };

        if (categoryMinorityReport === true) {

          newAmazonItemsMinorityReport.push(amazonItems[i]);

        };

        if (categoryPhilipKDick === false && categoryBladeRunner === false && categoryTotalRecall === false && categoryMinorityReport === false && categoryTMITHC === false) {

          newAmazonItemsNoCategory.push(amazonItems[i]);

        };

      } else {

        newAmazonItemsIncorrectContext.push(amazonItems[i]);

      };

    };

    // console.log(componentName, getDateTime(), "filterAmazonItems newHomeopapeItemsReview", newHomeopapeItemsReview);
    // console.log(componentName, getDateTime(), "filterAmazonItems newHomeopapeItemsReviewTitle", newHomeopapeItemsReviewTitle);
    // console.log(componentName, getDateTime(), "filterAmazonItems newHomeopapeItemsReviewText", newHomeopapeItemsReviewText);
    // console.log(componentName, getDateTime(), "filterAmazonItems newHomeopapeItemsReviewNeither", newHomeopapeItemsReviewNeither);

    newAmazonItems.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsPhilipKDick.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsBladeRunner.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsTotalRecall.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsMinorityReport.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsTMITHC.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsNoCategory.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);
    newAmazonItemsIncorrectContext.sort((a, b) => (formatLowerCase(a.authorName) > formatLowerCase(b.authorName)) ? 1 : -1);

    setAmazonItems(newAmazonItems);
    setAmazonItemsPhilipKDick(newAmazonItemsPhilipKDick);
    setAmazonItemsBladeRunner(newAmazonItemsBladeRunner);
    setAmazonItemsTotalRecall(newAmazonItemsTotalRecall);
    setAmazonItemsMinorityReport(newAmazonItemsMinorityReport);
    setAmazonItemsTMITHC(newAmazonItemsTMITHC);
    setAmazonItemsNoCategory(newAmazonItemsNoCategory);
    setAmazonItemsIncorrectContext(newAmazonItemsIncorrectContext);

  };


  const getAmazonItems = () => {

    clearMessages();

    let url = baseURL + "amazon";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": sessionToken
      }),
    })
      .then(response => {
        // console.log(componentName, getDateTime(), "getAmazonItems response", response);

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, getDateTime(), "getNews results", results);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          filterAmazonItems(results.records[0]);
          // setAmazonItems(results.records[0]);

        } else {

          filterAmazonItems([]);
          // setAmazonItems([]);

        };

      })
      .catch((error) => {
        // console.error(componentName, getDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const setActive = (ASIN, active) => {
    // console.log(componentName, getDateTime(), "setActive ASIN", ASIN);
    // console.log(componentName, getDateTime(), "setActive active", active);

    clearMessages();

    let activeValue;

    if (active === true || active === 1) {

      activeValue = 1;

    } else {

      activeValue = 0;

    };

    let url = baseURL + "amazon/active/";

    if (isEmpty(ASIN) === false && isEmpty(sessionToken) === false) {

      url = url + ASIN;
      // console.log(componentName, getDateTime(), "setActive url", url);

      let recordObject = {
        active: activeValue
      };

      fetch(url, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        }),
        body: JSON.stringify({ recordObject: recordObject })
      })
        .then(response => {
          // console.log(componentName, getDateTime(), "setActive response", response);

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
          // console.log(componentName, getDateTime(), "setActive data", data);

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            getAmazonItems();

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {
          console.error(componentName, getDateTime(), "setActive error", error);
          // console.error(componentName, getDateTime(), "setActive error.name", error.name);
          // console.error(componentName, getDateTime(), "setActive error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const setViewed = (ASIN, viewed) => {
    // console.log(componentName, getDateTime(), "setViewed ASIN", ASIN);
    // console.log(componentName, getDateTime(), "setViewed viewed", viewed);

    clearMessages();

    let viewedValue;

    if (viewed === true || viewed === 1) {

      viewedValue = 1;

    } else {

      viewedValue = 0;

    };

    let url = baseURL + "amazon/viewed/";

    if (isEmpty(ASIN) === false && isEmpty(sessionToken) === false) {

      url = url + ASIN;
      // console.log(componentName, getDateTime(), "setViewed url", url);

      let recordObject = {
        viewed: viewedValue
      };

      fetch(url, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        }),
        body: JSON.stringify({ recordObject: recordObject })
      })
        .then(response => {
          // console.log(componentName, getDateTime(), "setViewed response", response);

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
          // console.log(componentName, getDateTime(), "setViewed data", data);

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            getAmazonItems();

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {
          console.error(componentName, getDateTime(), "setViewed error", error);
          // console.error(componentName, getDateTime(), "setViewed error.name", error.name);
          // console.error(componentName, getDateTime(), "setViewed error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  useEffect(() => {

    getAmazonItems();

  }, []);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect check for admin", admin);

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);


  return (
    <Container className="mt-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      <Row>
        <Col xs="12">

          <a href="#" onClick={(event) => { setAmazonItemsCategory("AllItems"); }}>All Items</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("PhilipKDick"); }}>Philip K. Dick</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("BladeRunner"); }}>Blade Runner</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("TotalRecall"); }}>Total Recall</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("MinorityReport"); }}>Minority Report</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("TMITHC"); }}>TMITHC</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("IncorrectContext"); }}>Incorrect Context</a> | <a href="#" onClick={(event) => { setAmazonItemsCategory("NoCategory"); }}>No Category</a>

        </Col>
      </Row>


      {amazonItemsCategory === "PhilipKDick" && isEmpty(amazonItemsPhilipKDick) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: Philip K. Dick <span className="text-muted ms-2 small-text">{amazonItemsPhilipKDick.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsPhilipKDick.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              let activeString = "";

              if (amazonItem.active === true || amazonItem.active === 1) {

                // activeString = "Active";
                activeString = "";

              } else {

                activeString = "Inactive";

              };

              return (
                <Col key={index} xs="3">

                  <Card>

                    {isEmpty(activeString) === false ?

                      <CardHeader className="card-header inactive-item">
                        ({activeString})
                      </CardHeader>

                      : null}

                    <Row className="no-gutters">
                      <Col className="col-md-4">

                        <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <CardImg src={amazonItem.imageName} /> : <Image size="150" className="no-image-icon" />}</a>

                      </Col>
                      <Col className="col-md-8">
                        <CardBody>

                          {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                          {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                          {/* {amazonItem.publicationDate}<br /> */}

                          {amazonItem.ASIN}<br />

                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setActive(amazonItem.ASIN, !amazonItem.active); }}>{amazonItem.active === true || amazonItem.active === 1 ? <React.Fragment>Not Active</React.Fragment> : <React.Fragment>Active</React.Fragment>}</Button>
                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(amazonItem.ASIN, !amazonItem.viewed); }}>{amazonItem.viewed === true || amazonItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

                        </CardBody>
                      </Col>
                    </Row>

                    {isEmpty(amazonItem.searchIndex) === false ?

                      <CardFooter className="card-footer">

                        {amazonItem.searchIndex}

                      </CardFooter>

                      : null}

                  </Card>

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {amazonItemsCategory === "BladeRunner" && isEmpty(amazonItemsBladeRunner) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: Blade Runner <span className="text-muted ms-2 small-text">{amazonItemsBladeRunner.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsBladeRunner.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              let activeString = "";

              if (amazonItem.active === true || amazonItem.active === 1) {

                // activeString = "Active";
                activeString = "";

              } else {

                activeString = "Inactive";

              };

              return (
                <Col key={index} xs="3">

                  <Card>

                    {isEmpty(activeString) === false ?

                      <CardHeader className="card-header inactive-item">
                        ({activeString})
                      </CardHeader>

                      : null}

                    <Row className="no-gutters">
                      <Col className="col-md-4">

                        <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <CardImg src={amazonItem.imageName} /> : <Image size="150" className="no-image-icon" />}</a>

                      </Col>
                      <Col className="col-md-8">
                        <CardBody>

                          {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                          {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                          {/* {amazonItem.publicationDate}<br /> */}

                          {amazonItem.ASIN}<br />

                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setActive(amazonItem.ASIN, !amazonItem.active); }}>{amazonItem.active === true || amazonItem.active === 1 ? <React.Fragment>Not Active</React.Fragment> : <React.Fragment>Active</React.Fragment>}</Button>
                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(amazonItem.ASIN, !amazonItem.viewed); }}>{amazonItem.viewed === true || amazonItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

                        </CardBody>
                      </Col>
                    </Row>

                    {isEmpty(amazonItem.searchIndex) === false ?

                      <CardFooter className="card-footer">

                        {amazonItem.searchIndex}

                      </CardFooter>

                      : null}

                  </Card>

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {amazonItemsCategory === "TotalRecall" && isEmpty(amazonItemsTotalRecall) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: Total Recall <span className="text-muted ms-2 small-text">{amazonItemsTotalRecall.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsTotalRecall.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              let activeString = "";

              if (amazonItem.active === true || amazonItem.active === 1) {

                // activeString = "Active";
                activeString = "";

              } else {

                activeString = "Inactive";

              };

              return (
                <Col key={index} xs="3">

                  <Card>

                    {isEmpty(activeString) === false ?

                      <CardHeader className="card-header inactive-item">
                        ({activeString})
                      </CardHeader>

                      : null}

                    <Row className="no-gutters">
                      <Col className="col-md-4">

                        <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <CardImg src={amazonItem.imageName} /> : <Image size="150" className="no-image-icon" />}</a>

                      </Col>
                      <Col className="col-md-8">
                        <CardBody>

                          {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                          {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                          {/* {amazonItem.publicationDate}<br /> */}

                          {amazonItem.ASIN}<br />

                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setActive(amazonItem.ASIN, !amazonItem.active); }}>{amazonItem.active === true || amazonItem.active === 1 ? <React.Fragment>Not Active</React.Fragment> : <React.Fragment>Active</React.Fragment>}</Button>
                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(amazonItem.ASIN, !amazonItem.viewed); }}>{amazonItem.viewed === true || amazonItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

                        </CardBody>
                      </Col>
                    </Row>

                    {isEmpty(amazonItem.searchIndex) === false ?

                      <CardFooter className="card-footer">

                        {amazonItem.searchIndex}

                      </CardFooter>

                      : null}

                  </Card>

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {amazonItemsCategory === "MinorityReport" && isEmpty(amazonItemsMinorityReport) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: Minority Report <span className="text-muted ms-2 small-text">{amazonItemsMinorityReport.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsMinorityReport.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              let activeString = "";

              if (amazonItem.active === true || amazonItem.active === 1) {

                // activeString = "Active";
                activeString = "";

              } else {

                activeString = "Inactive";

              };

              return (
                <Col key={index} xs="3">

                  <Card>

                    {isEmpty(activeString) === false ?

                      <CardHeader className="card-header inactive-item">
                        ({activeString})
                      </CardHeader>

                      : null}

                    <Row className="no-gutters">
                      <Col className="col-md-4">

                        <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <CardImg src={amazonItem.imageName} /> : <Image size="150" className="no-image-icon" />}</a>

                      </Col>
                      <Col className="col-md-8">
                        <CardBody>

                          {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                          {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                          {/* {amazonItem.publicationDate}<br /> */}

                          {amazonItem.ASIN}<br />

                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setActive(amazonItem.ASIN, !amazonItem.active); }}>{amazonItem.active === true || amazonItem.active === 1 ? <React.Fragment>Not Active</React.Fragment> : <React.Fragment>Active</React.Fragment>}</Button>
                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(amazonItem.ASIN, !amazonItem.viewed); }}>{amazonItem.viewed === true || amazonItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

                        </CardBody>
                      </Col>
                    </Row>

                    {isEmpty(amazonItem.searchIndex) === false ?

                      <CardFooter className="card-footer">

                        {amazonItem.searchIndex}

                      </CardFooter>

                      : null}

                  </Card>

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {amazonItemsCategory === "TMITHC" && isEmpty(amazonItemsTMITHC) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: TMITHC <span className="text-muted ms-2 small-text">{amazonItemsTMITHC.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsTMITHC.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              let activeString = "";

              if (amazonItem.active === true || amazonItem.active === 1) {

                // activeString = "Active";
                activeString = "";

              } else {

                activeString = "Inactive";

              };

              return (
                <Col key={index} xs="3">

                  <Card>

                    {isEmpty(activeString) === false ?

                      <CardHeader className="card-header inactive-item">
                        ({activeString})
                      </CardHeader>

                      : null}

                    <Row className="no-gutters">
                      <Col className="col-md-4">

                        <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <CardImg src={amazonItem.imageName} /> : <Image size="150" className="no-image-icon" />}</a>

                      </Col>
                      <Col className="col-md-8">
                        <CardBody>

                          {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                          {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                          {/* {amazonItem.publicationDate}<br /> */}

                          {amazonItem.ASIN}<br />

                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setActive(amazonItem.ASIN, !amazonItem.active); }}>{amazonItem.active === true || amazonItem.active === 1 ? <React.Fragment>Not Active</React.Fragment> : <React.Fragment>Active</React.Fragment>}</Button>
                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(amazonItem.ASIN, !amazonItem.viewed); }}>{amazonItem.viewed === true || amazonItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

                        </CardBody>
                      </Col>
                    </Row>

                    {isEmpty(amazonItem.searchIndex) === false ?

                      <CardFooter className="card-footer">

                        {amazonItem.searchIndex}

                      </CardFooter>

                      : null}

                  </Card>

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {amazonItemsCategory === "IncorrectContext" && isEmpty(amazonItemsIncorrectContext) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: Incorrect Context <span className="text-muted ms-2 small-text">{amazonItemsIncorrectContext.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsIncorrectContext.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              let activeString = "";

              if (amazonItem.active === true || amazonItem.active === 1) {

                // activeString = "Active";
                activeString = "";

              } else {

                activeString = "Inactive";

              };

              return (
                <Col key={index} xs="3">

                  <Card>

                    {isEmpty(activeString) === false ?

                      <CardHeader className="card-header inactive-item">
                        ({activeString})
                      </CardHeader>

                      : null}

                    <Row className="no-gutters">
                      <Col className="col-md-4">

                        <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <CardImg src={amazonItem.imageName} /> : <Image size="150" className="no-image-icon" />}</a>

                      </Col>
                      <Col className="col-md-8">
                        <CardBody>

                          {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                          {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                          {/* {amazonItem.publicationDate}<br /> */}

                          {amazonItem.ASIN}<br />

                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setActive(amazonItem.ASIN, !amazonItem.active); }}>{amazonItem.active === true || amazonItem.active === 1 ? <React.Fragment>Not Active</React.Fragment> : <React.Fragment>Active</React.Fragment>}</Button>
                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(amazonItem.ASIN, !amazonItem.viewed); }}>{amazonItem.viewed === true || amazonItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

                        </CardBody>
                      </Col>
                    </Row>

                    {isEmpty(amazonItem.searchIndex) === false ?

                      <CardFooter className="card-footer">

                        {amazonItem.searchIndex}

                      </CardFooter>

                      : null}

                  </Card>

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {amazonItemsCategory === "NoCategory" && isEmpty(amazonItemsNoCategory) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: No Category <span className="text-muted ms-2 small-text">{amazonItemsNoCategory.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsNoCategory.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              let activeString = "";

              if (amazonItem.active === true || amazonItem.active === 1) {

                // activeString = "Active";
                activeString = "";

              } else {

                activeString = "Inactive";

              };

              return (
                <Col key={index} xs="3">

                  <Card>

                    {isEmpty(activeString) === false ?

                      <CardHeader className="card-header inactive-item">
                        ({activeString})
                      </CardHeader>

                      : null}

                    <Row className="no-gutters">
                      <Col className="col-md-4">

                        <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <CardImg src={amazonItem.imageName} /> : <Image size="150" className="no-image-icon" />}</a>

                      </Col>
                      <Col className="col-md-8">
                        <CardBody>

                          {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                          {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                          {/* {amazonItem.publicationDate}<br /> */}

                          {amazonItem.ASIN}<br />

                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setActive(amazonItem.ASIN, !amazonItem.active); }}>{amazonItem.active === true || amazonItem.active === 1 ? <React.Fragment>Not Active</React.Fragment> : <React.Fragment>Active</React.Fragment>}</Button>
                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(amazonItem.ASIN, !amazonItem.viewed); }}>{amazonItem.viewed === true || amazonItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

                        </CardBody>
                      </Col>
                    </Row>

                    {isEmpty(amazonItem.searchIndex) === false ?

                      <CardFooter className="card-footer">

                        {amazonItem.searchIndex}

                      </CardFooter>

                      : null}

                  </Card>

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {amazonItemsCategory === "AllItems" && isEmpty(amazonItems) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items <span className="text-muted ms-2 small-text">{amazonItems.length} in category out of {amazonItems.length} total to review.</span></h5>

            </Col>
          </Row>

          <Row>

            {amazonItems.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              let activeString = "";

              if (amazonItem.active === true || amazonItem.active === 1) {

                // activeString = "Active";
                activeString = "";

              } else {

                activeString = "Inactive";

              };

              return (
                <Col key={index} xs="3">

                  <Card>

                    {isEmpty(activeString) === false ?

                      <CardHeader className="card-header inactive-item">
                        ({activeString})
                      </CardHeader>

                      : null}

                    <Row className="no-gutters">
                      <Col className="col-md-4">

                        <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <CardImg src={amazonItem.imageName} /> : <Image size="150" className="no-image-icon" />}</a>

                      </Col>
                      <Col className="col-md-8">
                        <CardBody>

                          {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                          {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                          {/* {amazonItem.publicationDate}<br /> */}

                          {amazonItem.ASIN}<br />

                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setActive(amazonItem.ASIN, !amazonItem.active); }}>{amazonItem.active === true || amazonItem.active === 1 ? <React.Fragment>Not Active</React.Fragment> : <React.Fragment>Active</React.Fragment>}</Button>
                          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(amazonItem.ASIN, !amazonItem.viewed); }}>{amazonItem.viewed === true || amazonItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

                        </CardBody>
                      </Col>
                    </Row>

                    {isEmpty(amazonItem.searchIndex) === false ?

                      <CardFooter className="card-footer">

                        {amazonItem.searchIndex}

                      </CardFooter>

                      : null}

                  </Card>

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

    </Container>
  );
};

export default Amazon;
