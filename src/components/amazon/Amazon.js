import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Table, } from "reactstrap";
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

  const [amazonItems, setAmazonItems] = useState([]);
  const [amazonItemsPhilipDick, setAmazonItemsPhilipDick] = useState([]);
  const [amazonItemsBladeRunner, setAmazonItemsBladeRunner] = useState([]);
  const [amazonItemsTotalRecall, setAmazonItemsTotalRecall] = useState([]);
  const [amazonItemsMinorityReport, setAmazonItemsMinorityReport] = useState([]);
  const [amazonItemsTMITHC, setAmazonItemsTMITHC] = useState([]);
  const [amazonItemsNoCategory, setAmazonItemsNoCategory] = useState([]);


  const filterAmazonItems = (amazonItems) => {
    // console.log(componentName, getDateTime(), "filterAmazonItems amazonItems", amazonItems);

    let newAmazonItems = [];
    let newAmazonItemsPhilipDick = [];
    let newAmazonItemsBladeRunner = [];
    let newAmazonItemsTotalRecall = [];
    let newAmazonItemsMinorityReport = [];
    let newAmazonItemsTMITHC = [];
    let newAmazonItemsNoCategory = [];


    for (let i = 0; i < amazonItems.length; i++) {

      // console.log(componentName, getDateTime(), "filterAmazonItems amazonItems[i]", amazonItems[i]);

      let authorPhilipDick = false;
      let categoryBladeRunner = false;
      let categoryTotalRecall = false;
      let categoryMinorityReport = false;
      let categoryTMITHC = false;

      if (isEmpty(amazonItems[i].authorName) === false) {

        // ? Remove the punctuation in the checks? -- 02/13/2022 MF
        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip k. dick") === true) {

          authorPhilipDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip k dick") === true) {

          authorPhilipDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick philip k") === true) {

          authorPhilipDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick, philip k") === true) {

          authorPhilipDick = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip dick") === true) {

          authorPhilipDick = true;

        };


        // if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip") === true && formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("dick") === true) {

        //   authorPhilipDick = true;

        // };

        if (formatLowerCase(removeHTML(amazonItems[i].authorName)).includes("philip kindred dick") === true) {

          authorPhilipDick = true;

        };

      };



      if (isEmpty(amazonItems[i].titleName) === false) {

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("blade runner") === true) {

          categoryBladeRunner = true;

        };

        if (formatLowerCase(removeHTML(amazonItems[i].titleName)).includes("blade runner 2049") === true) {

          categoryBladeRunner = true;

        };

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

      };


      // if (amazonItems[i].active === true) {

      //   newAmazonItems.push(amazonItems[i]);

      // };

      if (amazonItems[i].active === true) {

        if (authorPhilipDick === true) {

          newAmazonItemsPhilipDick.push(amazonItems[i]);

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

        if (authorPhilipDick === false && categoryBladeRunner === false && categoryTotalRecall === false && categoryMinorityReport === false && categoryTMITHC === false) {

          newAmazonItemsNoCategory.push(amazonItems[i]);

        };

      };

    };

    // console.log(componentName, getDateTime(), "filterAmazonItems newHomeopapeItemsReview", newHomeopapeItemsReview);
    // console.log(componentName, getDateTime(), "filterAmazonItems newHomeopapeItemsReviewTitle", newHomeopapeItemsReviewTitle);
    // console.log(componentName, getDateTime(), "filterAmazonItems newHomeopapeItemsReviewText", newHomeopapeItemsReviewText);
    // console.log(componentName, getDateTime(), "filterAmazonItems newHomeopapeItemsReviewNeither", newHomeopapeItemsReviewNeither);

    setAmazonItems(newAmazonItems);
    setAmazonItemsPhilipDick(newAmazonItemsPhilipDick);
    setAmazonItemsBladeRunner(newAmazonItemsBladeRunner);
    setAmazonItemsTotalRecall(newAmazonItemsTotalRecall);
    setAmazonItemsMinorityReport(newAmazonItemsMinorityReport);
    setAmazonItemsTMITHC(newAmazonItemsTMITHC);
    setAmazonItemsNoCategory(newAmazonItemsNoCategory);

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

          filterAmazonItems(results.records);
          // setAmazonItems(results.records);

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

      {isEmpty(amazonItemsPhilipDick) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: Philip K. Dick</h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsPhilipDick.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              return (
                <Col key={index} xs="3">

                  <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <img src={amazonItem.imageName} alt={amazonItem.titleName} className="cover-medium" /> : <Image size="150" className="no-image-icon" />}</a><br />

                  {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                  {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                  {/* {amazonItem.publicationDate}<br /> */}

                  {/* {amazonItem.ASIN}<br /> */}


                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {isEmpty(amazonItemsBladeRunner) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: Blade Runner</h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsBladeRunner.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              return (
                <Col key={index} xs="3">

                  <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <img src={amazonItem.imageName} alt={amazonItem.titleName} className="cover-medium" /> : <Image size="150" className="no-image-icon" />}</a><br />

                  {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                  {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                  {/* {amazonItem.publicationDate}<br /> */}

                  {/* {amazonItem.ASIN}<br /> */}


                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {isEmpty(amazonItemsTotalRecall) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: Total Recall</h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsTotalRecall.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              return (
                <Col key={index} xs="3">

                  <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <img src={amazonItem.imageName} alt={amazonItem.titleName} className="cover-medium" /> : <Image size="150" className="no-image-icon" />}</a><br />

                  {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                  {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                  {/* {amazonItem.publicationDate}<br /> */}

                  {/* {amazonItem.ASIN}<br /> */}


                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {isEmpty(amazonItemsMinorityReport) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: Minority Report</h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsMinorityReport.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              return (
                <Col key={index} xs="3">

                  <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <img src={amazonItem.imageName} alt={amazonItem.titleName} className="cover-medium" /> : <Image size="150" className="no-image-icon" />}</a><br />

                  {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                  {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                  {/* {amazonItem.publicationDate}<br /> */}

                  {/* {amazonItem.ASIN}<br /> */}


                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {isEmpty(amazonItemsTMITHC) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: TMITHC</h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsTMITHC.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              return (
                <Col key={index} xs="3">

                  <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <img src={amazonItem.imageName} alt={amazonItem.titleName} className="cover-medium" /> : <Image size="150" className="no-image-icon" />}</a><br />

                  {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                  {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                  {/* {amazonItem.publicationDate}<br /> */}

                  {/* {amazonItem.ASIN}<br /> */}


                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {isEmpty(amazonItemsNoCategory) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items: No Category</h5>

            </Col>
          </Row>

          <Row>

            {amazonItemsNoCategory.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              return (
                <Col key={index} xs="3">

                  <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <img src={amazonItem.imageName} alt={amazonItem.titleName} className="cover-medium" /> : <Image size="150" className="no-image-icon" />}</a><br />

                  {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                  {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                  {/* {amazonItem.publicationDate}<br /> */}

                  {/* {amazonItem.ASIN}<br /> */}


                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}


      {isEmpty(amazonItems) === false ?

        <React.Fragment>

          <Row>
            <Col xs="12">

              <h5 className="text-center">Amazon Items</h5>

            </Col>
          </Row>

          <Row>

            {amazonItems.map((amazonItem, index) => {

              // console.log(componentName, getDateTime(), "map amazonItem", amazonItem);

              return (
                <Col key={index} xs="3">

                  <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <img src={amazonItem.imageName} alt={amazonItem.titleName} className="cover-medium" /> : <Image size="150" className="no-image-icon" />}</a><br />

                  {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

                  {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

                  {/* {amazonItem.publicationDate}<br /> */}

                  {/* {amazonItem.ASIN}<br /> */}


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
