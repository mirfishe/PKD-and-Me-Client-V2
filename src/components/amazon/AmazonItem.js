import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Button } from "reactstrap";
import { Image, PencilSquare, Plus } from 'react-bootstrap-icons';
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime, displayDate, formatLowerCase, formatUpperCase, removeHTML } from "shared-functions";
import { addErrorLog } from "../../utilities/ApplicationFunctions";

const AmazonItem = (props) => {

  const componentName = "AmazonItem";

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

  let amazonItem = isEmpty(props.amazonItem) === false ? props.amazonItem : {};

  // console.log(componentName, getDateTime(), "amazonItem", amazonItem);

  // let activeString = "";

  // if (amazonItem.active === true || amazonItem.active === 1) {

  //   // activeString = "Active";
  //   activeString = "";

  // } else {

  //   activeString = "Inactive";

  // };

  let viewedString = "";

  if (amazonItem.viewed === true || amazonItem.viewed === 1) {

    viewedString = "Viewed";

  } else {

    // viewedString = "Not Viewed";

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

            props.getAmazonItems();

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

            props.getAmazonItems();

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
    // console.log(componentName, getDateTime(), "useEffect check for admin", admin);

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);


  return (
    <Card>

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      {/* {isEmpty(activeString) === false ?

      <CardHeader className="card-header inactive-item">
        ({activeString})
      </CardHeader>

      : null} */}

      {isEmpty(viewedString) === false ?

        <CardHeader className="card-header inactive-item">
          ({viewedString})
        </CardHeader>

        : null}

      <Row className="no-gutters">
        <Col className="col-md-4">

          <a href={amazonItem.textLinkFull} target="_blank">{isEmpty(amazonItem.imageName) === false ? <CardImg src={amazonItem.imageName} /> : <Image size="150" className="no-image-icon" />}</a>

          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(amazonItem.ASIN, !amazonItem.viewed); }}>{amazonItem.viewed === true || amazonItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

        </Col>
        <Col className="col-md-8">
          <CardBody>

            {isEmpty(amazonItem.titleName) === false ? <React.Fragment><a href={amazonItem.textLinkFull} target="_blank">{amazonItem.titleName}</a><br /></React.Fragment> : null}

            {isEmpty(amazonItem.authorName) === false ? <React.Fragment>{amazonItem.authorName}<br /></React.Fragment> : null}

            {/* {amazonItem.publicationDate}<br /> */}

            {displayDate(amazonItem.updateDate)}<br />

            {amazonItem.ASIN}<br />

            <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setActive(amazonItem.ASIN, !amazonItem.active); }}>{amazonItem.active === true || amazonItem.active === 1 ? <React.Fragment>Not Active</React.Fragment> : <React.Fragment>Active</React.Fragment>}</Button>

          </CardBody>
        </Col>
      </Row>

      {isEmpty(amazonItem.searchIndex) === false ?

        <CardFooter className="card-footer">

          {amazonItem.searchIndex}

        </CardFooter>

        : null}

    </Card>
  );
};

export default AmazonItem;
