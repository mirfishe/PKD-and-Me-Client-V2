import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, FormGroup, Label, Input, Button } from "reactstrap";
import Parse from "html-react-parser";
import applicationSettings from "../../app/environment";
import { noFunctionAvailable, isEmpty, getDateTime, displayValue, formatLowerCase, formatUpperCase, removeHTML } from "shared-functions";
import { encodeURL, convertBitTrueFalse, toTitleCase /* , addErrorLog */ } from "../../utilities/ApplicationFunctions";

const FromTheHomeopapeItem = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: homeopapeItem -- 10/21/2022 MF
  // * Functions: getNews, getNewsPosted, getNewsReview -- 10/21/2022 MF

  const componentName = "FromTheHomeopapeItem";

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  let homeopapeItem = isEmpty(props) === false && isEmpty(props.homeopapeItem) === false ? props.homeopapeItem : {};
  let getNews = isEmpty(props) === false && isEmpty(props.getNews) === false ? props.getNews : noFunctionAvailable;
  let getNewsPosted = isEmpty(props) === false && isEmpty(props.getNewsPosted) === false ? props.getNewsPosted : noFunctionAvailable;
  let getNewsReview = isEmpty(props) === false && isEmpty(props.getNewsReview) === false ? props.getNewsReview : noFunctionAvailable;

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);


  const formatPost = (txtArticleTitle, txtArticleURL, txtItemContentSnippet) => {

    let post = toTitleCase(txtArticleTitle) + " #PhilipDick #PhilipKDick ";
    let itemContentSnippet = "";

    if (isEmpty(txtItemContentSnippet) === false) {

      itemContentSnippet = txtItemContentSnippet;

    };

    // if (cbxPhilipKDickFestival === true) {

    //   post = post + " #PhilipKDickFestival ";

    // };

    // if (cbxDickian === true) {

    //   post = post + " #Dickian ";

    // };

    if (formatLowerCase(removeHTML(txtArticleTitle)).includes("blade runner") === true || formatLowerCase(removeHTML(itemContentSnippet)).includes("blade runner") === true) {

      post = post + " #BladeRunner ";

    };

    if (formatLowerCase(removeHTML(txtArticleTitle)).includes("blade runner 2049") === true || formatLowerCase(removeHTML(itemContentSnippet)).includes("blade runner 2049") === true) {

      post = post + " #BladeRunner2049 ";

    };

    if (formatLowerCase(removeHTML(txtArticleTitle)).includes("black lotus") === true || formatLowerCase(removeHTML(itemContentSnippet)).includes("black lotus") === true) {

      post = post + " #BladeRunner2049 ";

    };

    if (formatLowerCase(removeHTML(txtArticleTitle)).includes("total recall") === true || formatLowerCase(removeHTML(itemContentSnippet)).includes("total recall") === true) {

      post = post + " #TotalRecall ";

    };

    if (formatLowerCase(removeHTML(txtArticleTitle)).includes("electric dreams") === true || formatLowerCase(removeHTML(itemContentSnippet)).includes("electric dreams") === true) {

      post = post + " #ElectricDreams ";

    };

    if (formatLowerCase(removeHTML(txtArticleTitle)).includes("man in the high castle") === true || formatLowerCase(removeHTML(itemContentSnippet)).includes("man in the high castle") === true) {

      post = post + " #TMITHC #HighCastle ";

    };

    if (formatLowerCase(removeHTML(txtArticleTitle)).includes("minority report") === true || formatLowerCase(removeHTML(itemContentSnippet)).includes("minority report") === true) {

      post = post + " #MinorityReport ";

    };

    // let param = "";
    // let regExp = "";
    // // let newURL = decodeURI(txtArticleURL);
    // let newURL = txtArticleURL.replaceAll("\%3F", "?").replaceAll("\%26", "&").replaceAll("\%3D", "=");
    // // let newURL = txtArticleURL.replaceAll("\%3F", "?").replaceAll("\%3f", "?").replaceAll("\%26", "&").replaceAll("\%3D", "=").replaceAll("\%3d", "=");

    // // * Remove fbclid= -- 06/26/2021 MF
    // // * FaceBook analytics and tracking -- 06/26/2021 MF
    // // * Removes everything after the fbclid= -- 06/26/2021 MF
    // // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537 -- 06/26/2021 MF
    // param = "fbclid";
    // regExp = new RegExp("[?&]" + param + "=.*$");
    // newURL = newURL.replace(regExp, "");

    // // * Remove utm_medium= -- 06/26/2021 MF
    // // * Google Analytics and tracking -- 06/26/2021 MF
    // // * Removes everything after the utm_medium= -- 06/26/2021 MF
    // param = "utm_medium";
    // regExp = new RegExp("[?&]" + param + "=.*$");
    // newURL = newURL.replace(regExp, "");

    // // * Remove utm_campaign= -- 06/26/2021 MF
    // // * Google Analytics and tracking -- 06/26/2021 MF
    // // * Removes everything after the utm_campaign= -- 06/26/2021 MF
    // param = "utm_campaign";
    // regExp = new RegExp("[?&]" + param + "=.*$");
    // newURL = newURL.replace(regExp, "");

    // // * Remove utm_source= -- 06/26/2021 MF
    // // * Google Analytics and tracking -- 06/26/2021 MF
    // // * Removes everything after the utm_source= -- 06/26/2021 MF
    // param = "utm_source";
    // regExp = new RegExp("[?&]" + param + "=.*$");
    // newURL = newURL.replace(regExp, "");

    post = post + txtArticleURL;

    // setFormattedPost(post);

    // let formattedPostsArray = [...formattedPosts];

    // formattedPostsArray.push(post);

    // setFormattedPosts(formattedPostsArray);

    return post;

  };


  // * One method to only display ten items in the list. -- 06/26/2021 MF
  // if (index > 100) {

  //   breakArray = true;

  // };

  // if (breakArray === true) {

  //   return;

  // };

  // * One method to only display ten items in the list. -- 06/26/2021 MF
  // if (displayUpdateItemsCount >= 100) {

  //   homeopapeItemsReview.splice(0, index);

  // };

  // let show = !homeopapeItem.display;
  let show = true;

  if (homeopapeItem.display === true) { // homeopapeItem.display === 1

    show = false;

    // } else if (displayUpdateItemsCount >= 100) {

    //   // homeopapeItemsReview.splice(0, index);
    //   show = false;

    // } else {

    //   displayUpdateItemsCount++;

  };

  // SELECT * FROM homeopapeRSS
  // WHERE itemLink like '%.ebay.%'
  // OR itemLink like '%reddit.%'
  // OR itemLink like '%craigslist.%'
  // OR itemLink like '%amazon.%'
  // OR itemLink like '%pinterest.%'
  // OR itemLink like '%twitter.%'
  // OR itemLink like '%facebook.%'
  // OR itemLink like '%sites.google.%'
  // OR itemLink like '%books.google.%'
  // OR itemLink like '%elasticsearch.columbian.com%'
  // goodreads.com

  // UPDATE homeopapeRSS
  // SET alwaysFilter = 1
  // WHERE itemLink like '%.ebay.%'
  // OR itemLink like '%reddit.%'
  // OR itemLink like '%craigslist.%'
  // OR itemLink like '%amazon.%'
  // OR itemLink like '%audible.%'
  // OR itemLink like '%pinterest.%'
  // OR itemLink like '%twitter.%'
  // OR itemLink like '%facebook.%'
  // OR itemLink like '%sites.google.%'
  // OR itemLink like '%books.google.%'
  // OR itemLink like '%elasticsearch.columbian.com%'
  // goodreads.com

  // // if (homeopapeItem.itemLink.includes("ebay.com")) {
  // if (formatLowerCase(homeopapeItem.itemLink).includes(".ebay.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("reddit.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("craigslist.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("amazon.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("audible.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("pinterest.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("twitter.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("facebook.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("tiktok.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("sites.google.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("books.google.")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("elasticsearch.columbian.com")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemLink).includes("news.ycombinator.com")) {

  //   show = false;

  // };

  // if (formatLowerCase(homeopapeItem.itemTitle).includes("pistorius") || formatLowerCase(homeopapeItem.itemContentSnippet).includes("pistorius")) {

  //   show = false;

  // };

  // let itemLink;
  let itemID;
  // let param = "";
  // let regExp = "";

  if (isEmpty(homeopapeItem) === false && isEmpty(homeopapeItem.itemID) === false) {

    itemID = homeopapeItem.itemID.replaceAll("tag:google.com,2013:googlealerts/feed:", "");

  };

  // if (isEmpty(homeopapeItem) === false && isEmpty(homeopapeItem.itemLink) === false) {

  //   itemLink = homeopapeItem.itemLink.replaceAll("https://www.google.com/url?rct=j&sa=t&url=", "");

  //   // * Remove &ct=ga&cd=CAIyGjFhOTgyNzMwYWNlOTE1ZDI6Y29tOmVuOlVT&usg=AFQjCNEhFPEPL8--91umtz1jWdrmBW2JZQ -- 06/26/2021 MF
  //   // * Google -- 06/26/2021 MF
  //   // * Removes everything after the ct= -- 06/26/2021 MF
  //   // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537 -- 06/26/2021 MF
  //   param = "ct";
  //   regExp = new RegExp("[?&]" + param + "=.*$");
  //   itemLink = itemLink.replace(regExp, "");
  //   itemLink = itemLink.replace("%3F", "?");
  //   itemLink = itemLink.replace("%3D", "=");

  // };

  // * Remove html tags from string. -- 06/26/2021 MF
  // * https://www.tutorialspoint.com/how-to-remove-html-tags-from-a-string-in-javascript -- 06/26/2021 MF
  let formattedPost = formatPost(homeopapeItem.itemTitle.replace(/(<([^>]+)>)/ig, ""), homeopapeItem.itemLinkFormatted, homeopapeItem.itemContentSnippet.replace(/(<([^>]+)>)/ig, ""));


  useEffect(() => {

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);


  const setDisplay = (itemID, display) => {

    clearMessages();

    let displayValue;

    if (display === true || display === 1) {

      displayValue = 1;

    } else {

      displayValue = 0;

    };

    let url = baseURL + "fromthehomeopape/display/";

    if (isEmpty(itemID) === false && isEmpty(sessionToken) === false) {

      url = url + itemID;

      let recordObject = {
        display: displayValue
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

          // if (response.ok !== true) {

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

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            getNews();

            getNewsPosted();

            getNewsReview();

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {

          console.error(componentName, getDateTime(), "setDisplay error", error);
          // console.error(componentName, getDateTime(), "setDisplay error.name", error.name);
          // console.error(componentName, getDateTime(), "setDisplay error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const setPosted = (itemID, posted) => {

    clearMessages();

    let postedValue;

    if (posted === true || posted === 1) {

      postedValue = 1;

    } else {

      postedValue = 0;

    };

    let url = baseURL + "fromthehomeopape/posted/";

    if (isEmpty(itemID) === false && isEmpty(sessionToken) === false) {

      url = url + itemID;

      let recordObject = {
        posted: postedValue
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

          // if (response.ok !== true) {

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

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            getNews();

            getNewsPosted();

            getNewsReview();

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {

          console.error(componentName, getDateTime(), "setPosted error", error);
          // console.error(componentName, getDateTime(), "setPosted error.name", error.name);
          // console.error(componentName, getDateTime(), "setPosted error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const setAlwaysFilter = (itemID, alwaysFilter) => {

    clearMessages();

    let alwaysFilterValue;

    if (alwaysFilter === true || alwaysFilter === 1) {

      alwaysFilterValue = 1;

    } else {

      alwaysFilterValue = 0;

    };

    let url = baseURL + "fromthehomeopape/alwaysFilter/";

    if (isEmpty(itemID) === false && isEmpty(sessionToken) === false) {

      url = url + itemID;

      let recordObject = {
        alwaysFilter: alwaysFilterValue
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

          // if (response.ok !== true) {

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

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            getNews();

            getNewsPosted();

            getNewsReview();

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {

          console.error(componentName, getDateTime(), "setAlwaysFilter error", error);
          // console.error(componentName, getDateTime(), "setAlwaysFilter error.name", error.name);
          // console.error(componentName, getDateTime(), "setAlwaysFilter error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const setViewed = (itemID, viewed) => {

    clearMessages();

    let viewedValue;

    if (viewed === true || viewed === 1) {

      viewedValue = 1;

    } else {

      viewedValue = 0;

    };

    let url = baseURL + "fromthehomeopape/viewed/";

    if (isEmpty(itemID) === false && isEmpty(sessionToken) === false) {

      url = url + itemID;

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

          // if (response.ok !== true) {

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

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            getNews();

            getNewsPosted();

            getNewsReview();

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


  return (
    <React.Fragment>

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      {/* {show === true ? */}

      <Row className="mb-5">

        <Col xs="12">

          <Button outline size="sm" color="primary" onClick={(event) => { setDisplay(itemID, !homeopapeItem.display); setViewed(itemID, !homeopapeItem.viewed); }} >{homeopapeItem.display === true || homeopapeItem.display === 1 ? <React.Fragment>Undo Display</React.Fragment> : <React.Fragment>Display</React.Fragment>}</Button>
          <Button outline size="sm" color="secondary" className="ms-2" onClick={(event) => { setPosted(itemID, !homeopapeItem.posted); }} >{homeopapeItem.posted === true || homeopapeItem.posted === 1 ? <React.Fragment>Undo Posted</React.Fragment> : <React.Fragment>Post</React.Fragment>}</Button>
          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setAlwaysFilter(itemID, !homeopapeItem.alwaysFilter); setViewed(itemID, !homeopapeItem.viewed); }}>{homeopapeItem.alwaysFilter === true || homeopapeItem.alwaysFilter === 1 ? <React.Fragment>Undo Always Filter</React.Fragment> : <React.Fragment>Always Filter</React.Fragment>}</Button>
          <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(itemID, !homeopapeItem.viewed); }}>{homeopapeItem.viewed === true || homeopapeItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

          <div>
            {/* <div dangerouslySetInnerHTML={{ "__html": homeopapeItem.itemTitle }} /> */}
            {Parse(homeopapeItem.itemTitle)}<br />
            <a href={homeopapeItem.itemLinkFormatted} target="_blank">{homeopapeItem.itemLinkFormatted}</a><br />
            ({homeopapeItem.itemPubDate}) {homeopapeItem.itemContentSnippet}<br />
            {itemID}
          </div>

          <FormGroup className="text-center">
            <Alert color="info">{formattedPost}</Alert>
          </FormGroup>

        </Col>

      </Row>

      {/* : null} */}

    </React.Fragment>
  );
};

export default FromTheHomeopapeItem;
