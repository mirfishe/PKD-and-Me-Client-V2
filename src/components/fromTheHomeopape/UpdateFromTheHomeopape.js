import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, FormGroup, Label, Input, Button } from "reactstrap";
import Parse from "html-react-parser";
import applicationSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, ConvertBitTrueFalse, FormatLowerCase, FormatUpperCase } from "../../utilities/SharedFunctions";
import { encodeURL, ToTitleCase, LogError } from "../../utilities/ApplicationFunctions";

// * https://www.npmjs.com/package/rss-parser
// * https://github.com/rbren/rss-parser
// import Parser from "rss-parser";

const FromTheHomeopape = (props) => {

  const componentName = "FromTheHomeopape.js";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [feedItems, setFeedItems] = useState([]);
  const [feedItems2, setFeedItems2] = useState([]);
  const [homeopapeItems, setHomeopapeItems] = useState([]);
  const [homeopapeItemsReview, setHomeopapeItemsReview] = useState([]);

  // const [cbxDisplay, setCbxDisplay] = useState(false);
  // const [cbxPosted, setCbxPosted] = useState(false);

  // let breakArray = false;
  let displayItemsCount = 0;
  let displayUpdateItemsCount = 0;


  const formatPost = (txtArticleTitle, txtArticleURL, txtItemContentSnippet) => {
    // console.log(componentName, GetDateTime(), "formatPost txtArticleTitle", txtArticleTitle);
    // console.log(componentName, GetDateTime(), "formatPost txtArticleURL", txtArticleURL);
    // console.log(componentName, GetDateTime(), "formatPost itemContentSnippet", itemContentSnippet);

    let post = ToTitleCase(txtArticleTitle) + " #PhilipDick #PhilipKDick ";
    let itemContentSnippet = "";

    if (IsEmpty(txtItemContentSnippet) === false) {

      itemContentSnippet = txtItemContentSnippet;

    };

    // if (cbxPhilipKDickFestival === true) {

    //   post = post + " #PhilipKDickFestival ";

    // };

    // if (cbxDickian === true) {

    //   post = post + " #Dickian ";

    // };

    if (FormatLowerCase(txtArticleTitle).includes("blade runner") === true || FormatLowerCase(itemContentSnippet).includes("blade runner") === true) {

      post = post + " #BladeRunner ";

    };

    if (FormatLowerCase(txtArticleTitle).includes("blade runner 2049") === true || FormatLowerCase(itemContentSnippet).includes("blade runner 2049") === true) {

      post = post + " #BladeRunner2049 ";

    };

    // if (FormatLowerCase(txtArticleTitle).includes("black lotus") === true || FormatLowerCase(itemContentSnippet).includes("black lotus") === true) {

    //   post = post + " #BladeRunner #BladeRunner2049 ";

    // };

    if (FormatLowerCase(txtArticleTitle).includes("total recall") === true || FormatLowerCase(itemContentSnippet).includes("total recall") === true) {
      post = post + " #TotalRecall ";


    };

    if (FormatLowerCase(txtArticleTitle).includes("electric dreams") === true || FormatLowerCase(itemContentSnippet).includes("electric dreams") === true) {
      post = post + " #ElectricDreams ";


    };

    if (FormatLowerCase(txtArticleTitle).includes("man in the high castle") === true || FormatLowerCase(itemContentSnippet).includes("man in the high castle") === true) {

      post = post + " #TMITHC #HighCastle ";

    };

    if (FormatLowerCase(txtArticleTitle).includes("minority report") === true || FormatLowerCase(itemContentSnippet).includes("minority report") === true) {

      post = post + " #MinorityReport ";

    };


    let param = "";
    let regExp = "";
    // let newURL = decodeURI(txtArticleURL);
    let newURL = txtArticleURL.replaceAll("\%3F", "?").replaceAll("\%26", "&").replaceAll("\%3D", "=");
    // let newURL = txtArticleURL.replaceAll("\%3F", "?").replaceAll("\%3f", "?").replaceAll("\%26", "&").replaceAll("\%3D", "=").replaceAll("\%3d", "=");

    // if (/*newURL.includes("\%3F") === true || newURL.includes("\%3f") === true ||*/ newURL.includes("www.heavymetal.com")) {

    //   console.log(componentName, GetDateTime(), "formatPost txtArticleURL.replaceAll(\"\%3F\", \"?\")", txtArticleURL.replaceAll("\%3F", "?"));
    //   console.log(componentName, GetDateTime(), "formatPost txtArticleURLtxtArticleURL.replaceAll(\"\%3F\", \"?\").replaceAll(\"\%3f\", \"?\").replaceAll(\"\%26\", \"&\").replaceAll(\"\%3D\", \"=\").replaceAll(\"\%3d\", \"=\")", txtArticleURL.replaceAll("\%3F", "?").replaceAll("\%3f", "?").replaceAll("\%26", "&").replaceAll("\%3D", "=").replaceAll("\%3d", "="));
    //   console.log(componentName, GetDateTime(), "formatPost newURL", newURL);
    //   console.log(componentName, GetDateTime(), "formatPost decodeURI(txtArticleURL)", decodeURI(txtArticleURL));
    //   console.log(componentName, GetDateTime(), "formatPost decodeURI(newURL)", decodeURI(newURL));
    // };

    // * Remove fbclid= -- 06/26/2021 MF
    // * FaceBook analytics and tracking -- 06/26/2021 MF
    // * Removes everything after the fbclid= -- 06/26/2021 MF
    // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537 -- 06/26/2021 MF
    param = "fbclid";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");
    // console.log(componentName, GetDateTime(), "formatPost newURL", newURL);

    // * Remove utm_medium= -- 06/26/2021 MF
    // * Google Analytics and tracking -- 06/26/2021 MF
    // * Removes everything after the utm_medium= -- 06/26/2021 MF
    param = "utm_medium";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");
    // console.log(componentName, GetDateTime(), "formatPost newURL", newURL);

    // * Remove utm_campaign= -- 06/26/2021 MF
    // * Google Analytics and tracking -- 06/26/2021 MF
    // * Removes everything after the utm_campaign= -- 06/26/2021 MF
    param = "utm_campaign";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");
    // console.log(componentName, GetDateTime(), "formatPost newURL", newURL);

    // * Remove utm_source= -- 06/26/2021 MF
    // * Google Analytics and tracking -- 06/26/2021 MF
    // * Removes everything after the utm_source= -- 06/26/2021 MF
    param = "utm_source";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");
    // console.log(componentName, GetDateTime(), "formatPost newURL", newURL);


    post = post + newURL;

    // setFormattedPost(post);

    // let formattedPostsArray = [...formattedPosts];

    // formattedPostsArray.push(post);

    // setFormattedPosts(formattedPostsArray);

    return post;

  };


  const getNews = () => {

    let url = baseURL + "fromthehomeopape/";
    // TODO: Fix the way that the limit works on the server because it works differently than the local version. -- 06/26/2021 MF
    // let url = baseURL + "fromthehomeopape/top/10";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        // console.log(componentName, GetDateTime(), "getNews response", response);

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getNews results", results);

        if (IsEmpty(results) === false && results.transactionSuccess === true) {

          setHomeopapeItems(results.records);
          // setHomeopapeItems(results.records[0]);

        };

      })
      .catch((error) => {
        // console.error(componentName, GetDateTime(), "getNews error", error);

        setErrorMessage(error.name + ": " + error.message);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const getNewsReview = () => {

    let url = baseURL + "fromthehomeopape/review";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        // console.log(componentName, GetDateTime(), "getNewsReview response", response);

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getNews results", results);

        if (IsEmpty(results) === false && results.transactionSuccess === true) {

          setHomeopapeItemsReview(results.records);
          // setHomeopapeItemsReview(results.records[0]);

        };

      })
      .catch((error) => {
        // console.error(componentName, GetDateTime(), "getNews error", error);

        setErrorMessage(error.name + ": " + error.message);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  // const fetchNews = () => {

  //   let url = baseURL + "fromthehomeopape/new";

  //   fetch(url, {
  //     method: "GET",
  //     headers: new Headers({
  //       "Content-Type": "application/json"
  //     })
  //   })
  //   .then(response => {
  //     // console.log(componentName, GetDateTime(), "fetchNews response", response);

  //     if (!response.ok) {

  //       throw Error(`${response.status} ${response.statusText} ${response.url}`);

  //     } else {

  //       return response.json();

  //     };

  //     })
  //     .then(results => {
  //       console.log(componentName, GetDateTime(), "fetchNews results", results);

  //       // ! This happens too fast before the records have been written to the table.
  //       fetchNewsUpdate();

  //     })
  //     .catch((error) => {
  //       console.error(componentName, GetDateTime(), "fetchNews error", error);

  //       setErrorMessage(error.name + ": " + error.message);

  //        let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

  //     });

  // };


  // const fetchNewsUpdate = () => {

  //   let url = baseURL + "fromthehomeopape/update";

  //   fetch(url, {
  //     method: "GET",
  //     headers: new Headers({
  //       "Content-Type": "application/json"
  //     })
  //   })
  //   .then(response => {
  //     // console.log(componentName, GetDateTime(), "fetchNewsUpdate response", response);

  //     if (!response.ok) {

  //       throw Error(`${response.status} ${response.statusText} ${response.url}`);

  //     } else {

  //       return response.json();

  //     };

  //     })
  //     .then(results => {
  //       console.log(componentName, GetDateTime(), "fetchNewsUpdate results", results);

  //     })
  //     .catch((error) => {
  //       console.error(componentName, GetDateTime(), "fetchNewsUpdate error", error);

  //       setErrorMessage(error.name + ": " + error.message);

  //      let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

  //     });

  // };


  useEffect(() => {

    // fetchNews();
    // fetchNews2();

    // * Handled in a cron job on the server now. -- 06/26/2021 MF
    // fetchNews();

    getNews();

    getNewsReview();

  }, []);


  const markAllViewed = () => {

    clearMessages();

    let url = baseURL + "fromthehomeopape/markviewed/";

    if (IsEmpty(sessionToken) === false) {

      // console.log(componentName, GetDateTime(), "markAllViewed url", url);

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        })
      })
        .then(response => {
          // console.log(componentName, GetDateTime(), "markAllViewed response", response);

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
          // console.log(componentName, GetDateTime(), "markAllViewed data", data);

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            // getNewsReview();
            setHomeopapeItemsReview([]);

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {
          console.error(componentName, GetDateTime(), "markAllViewed error", error);
          // console.error(componentName, GetDateTime(), "markAllViewed error.name", error.name);
          // console.error(componentName, GetDateTime(), "markAllViewed error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const setDisplay = (itemID, display) => {
    // console.log(componentName, GetDateTime(), "setDisplay itemID", itemID);
    // console.log(componentName, GetDateTime(), "setDisplay display", display);

    clearMessages();

    let displayValue;

    if (display === true || display === 1) {

      displayValue = 1;

    } else {

      displayValue = 0;

    };

    let url = baseURL + "fromthehomeopape/display/";

    if (IsEmpty(itemID) === false && IsEmpty(sessionToken) === false) {

      url = url + itemID;
      // console.log(componentName, GetDateTime(), "setDisplay url", url);

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
          // console.log(componentName, GetDateTime(), "setDisplay response", response);

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
          // console.log(componentName, GetDateTime(), "setDisplay data", data);

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            getNews();

            getNewsReview();

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {
          console.error(componentName, GetDateTime(), "setDisplay error", error);
          // console.error(componentName, GetDateTime(), "setDisplay error.name", error.name);
          // console.error(componentName, GetDateTime(), "setDisplay error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const setPosted = (itemID, posted) => {
    // console.log(componentName, GetDateTime(), "setPosted itemID", itemID);
    // console.log(componentName, GetDateTime(), "setPosted posted", posted);

    clearMessages();

    let postedValue;

    if (posted === true || posted === 1) {

      postedValue = 1;

    } else {

      postedValue = 0;

    };

    let url = baseURL + "fromthehomeopape/posted/";

    if (IsEmpty(itemID) === false && IsEmpty(sessionToken) === false) {

      url = url + itemID;
      // console.log(componentName, GetDateTime(), "setPosted url", url);

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
          // console.log(componentName, GetDateTime(), "setPosted response", response);

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
          // console.log(componentName, GetDateTime(), "setPosted data", data);

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            getNews();

            getNewsReview();

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {
          console.error(componentName, GetDateTime(), "setPosted error", error);
          // console.error(componentName, GetDateTime(), "setPosted error.name", error.name);
          // console.error(componentName, GetDateTime(), "setPosted error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const setAlwaysFilter = (itemID, alwaysFilter) => {
    // console.log(componentName, GetDateTime(), "setAlwaysFilter itemID", itemID);
    // console.log(componentName, GetDateTime(), "setAlwaysFilter alwaysFilter", alwaysFilter);

    clearMessages();

    let alwaysFilterValue;

    if (alwaysFilter === true || alwaysFilter === 1) {

      alwaysFilterValue = 1;

    } else {

      alwaysFilterValue = 0;

    };

    let url = baseURL + "fromthehomeopape/alwaysFilter/";

    if (IsEmpty(itemID) === false && IsEmpty(sessionToken) === false) {

      url = url + itemID;
      // console.log(componentName, GetDateTime(), "setAlwaysFilter url", url);

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
          // console.log(componentName, GetDateTime(), "setAlwaysFilter response", response);

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
          // console.log(componentName, GetDateTime(), "setAlwaysFilter data", data);

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            getNews();

            getNewsReview();

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {
          console.error(componentName, GetDateTime(), "setAlwaysFilter error", error);
          // console.error(componentName, GetDateTime(), "setAlwaysFilter error.name", error.name);
          // console.error(componentName, GetDateTime(), "setAlwaysFilter error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const setViewed = (itemID, viewed) => {
    // console.log(componentName, GetDateTime(), "setViewed itemID", itemID);
    // console.log(componentName, GetDateTime(), "setViewed viewed", viewed);

    clearMessages();

    let viewedValue;

    if (viewed === true || viewed === 1) {

      viewedValue = 1;

    } else {

      viewedValue = 0;

    };

    let url = baseURL + "fromthehomeopape/viewed/";

    if (IsEmpty(itemID) === false && IsEmpty(sessionToken) === false) {

      url = url + itemID;
      // console.log(componentName, GetDateTime(), "setViewed url", url);

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
          // console.log(componentName, GetDateTime(), "setViewed response", response);

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
          // console.log(componentName, GetDateTime(), "setViewed data", data);

          addMessage(data.message);

          if (data.transactionSuccess === true) {

            getNews();

            getNewsReview();

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {
          console.error(componentName, GetDateTime(), "setViewed error", error);
          // console.error(componentName, GetDateTime(), "setViewed error.name", error.name);
          // console.error(componentName, GetDateTime(), "setViewed error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect check for admin", admin);

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);


  return (
    <Container className="mt-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      <Row>
        <Col xs="6">

          <h3>All Items <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { markAllViewed(); }}>Mark All Viewed</Button></h3>

          {homeopapeItemsReview.map((homeopapeItem, index) => {

            // * One method to only display ten items in the list. -- 06/26/2021 MF
            // if (index > 100) {

            //   breakArray = true;

            // };

            // if (breakArray === true) {

            //   return;

            // };

            // * One method to only display ten items in the list. -- 06/26/2021 MF
            // if (displayUpdateItemsCount >= 100) {

            //   console.log(componentName, GetDateTime(), "homeopapeItemsReview.map Ten item maximum!", displayUpdateItemsCount, index);
            //   homeopapeItemsReview.splice(0, index);

            // };

            let show = true;

            if (homeopapeItem.display === true) { // homeopapeItem.display === 1

              show = false;

              // } else if (displayUpdateItemsCount >= 100) {

              //   // console.log(componentName, GetDateTime(), "homeopapeItemsReview.map Ten item maximum!", displayUpdateItemsCount, index);
              //   // homeopapeItemsReview.splice(0, index);
              //   show = false;

            } else {

              displayUpdateItemsCount++;
              // console.log(componentName, GetDateTime(), "homeopapeItemsReview.map", homeopapeItem.itemTitle, displayUpdateItemsCount, index);

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
            // if (FormatLowerCase(homeopapeItem.itemLink).includes(".ebay.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("reddit.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("craigslist.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("amazon.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("audible.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("pinterest.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("twitter.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("facebook.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("tiktok.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("sites.google.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("books.google.")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("elasticsearch.columbian.com")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemLink).includes("news.ycombinator.com")) {

            //   show = false;

            // };

            // if (FormatLowerCase(homeopapeItem.itemTitle).includes("pistorius") || FormatLowerCase(homeopapeItem.itemContentSnippet).includes("pistorius")) {

            //   show = false;

            // };

            let itemLink;
            let itemID;
            let param = "";
            let regExp = "";

            if (IsEmpty(homeopapeItem) === false && IsEmpty(homeopapeItem.itemLink) === false) {

              itemLink = homeopapeItem.itemLink.replaceAll("https://www.google.com/url?rct=j&sa=t&url=", "");

              // * Remove &ct=ga&cd=CAIyGjFhOTgyNzMwYWNlOTE1ZDI6Y29tOmVuOlVT&usg=AFQjCNEhFPEPL8--91umtz1jWdrmBW2JZQ -- 06/26/2021 MF
              // * Google -- 06/26/2021 MF
              // * Removes everything after the ct= -- 06/26/2021 MF
              // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537 -- 06/26/2021 MF
              param = "ct";
              regExp = new RegExp("[?&]" + param + "=.*$");
              itemLink = itemLink.replace(regExp, "");
              itemLink = itemLink.replace("%3F", "?");
              itemLink = itemLink.replace("%3D", "=");
              itemID = homeopapeItem.itemID.replaceAll("tag:google.com,2013:googlealerts/feed:", "");

            };

            // * Remove html tags from string. -- 06/26/2021 MF
            // * https://www.tutorialspoint.com/how-to-remove-html-tags-from-a-string-in-javascript -- 06/26/2021 MF
            let formattedPost = formatPost(homeopapeItem.itemTitle.replace(/(<([^>]+)>)/ig, ''), itemLink, homeopapeItem.itemContentSnippet.replace(/(<([^>]+)>)/ig, ''));

            // console.log(componentName, GetDateTime(), "homeopapeItemsReview.map homeopapeItem", homeopapeItem);
            // console.log(componentName, GetDateTime(), "homeopapeItemsReview.map homeopapeItem.itemID", homeopapeItem.itemID);
            // console.log(componentName, GetDateTime(), "homeopapeItemsReview.map homeopapeItem.homeopapeID", homeopapeItem.homeopapeID);
            // console.log(componentName, GetDateTime(), "homeopapeItemsReview.map homeopapeItem.display", homeopapeItem.display);
            // console.log(componentName, GetDateTime(), "homeopapeItemsReview.map homeopapeItem.posted", homeopapeItem.posted);

            return (
              <React.Fragment key={itemID}>

                {show === true ?

                  <Row className="mb-5">

                    {/* <Col xs="1"> */}

                    {/* <FormGroup className="ms-4">

            <Label for="cbxDisplay"><Input type="checkbox" id="cbxDisplay" checked={cbxDisplay} onChange={(event) => { setCbxDisplay(!cbxDisplay); }} />Display</Label>

          </FormGroup>

          <FormGroup className="ms-4">

            <Label for="cbxPosted"><Input type="checkbox" id="cbxPosted" checked={cbxPosted} onChange={(event) => { setCbxPosted(!cbxPosted); }} />Posted</Label>

          </FormGroup> */}

                    {/* <Button outline size="sm" color="primary" onClick={(event) => { setDisplay(itemID, !homeopapeItem.display); }} >Display</Button>
                      <Button outline size="sm" color="secondary" onClick={(event) => { setPosted(itemID, !homeopapeItem.posted); }} >Posted</Button>
                    </Col> */}

                    <Col xs="12">

                      <React.Fragment>

                        <div>
                          {/* <div dangerouslySetInnerHTML={{ "__html": homeopapeItem.itemTitle }} /> */}
                          {Parse(homeopapeItem.itemTitle)}<br />
                          <a href={itemLink} target="_blank">{itemLink}</a><br />
                          ({homeopapeItem.itemPubDate}) {homeopapeItem.itemContentSnippet}
                        </div>

                        <FormGroup className="text-center">
                          <Alert color="info">{formattedPost}</Alert>
                        </FormGroup>

                      </React.Fragment>

                      <Button outline size="sm" color="primary" onClick={(event) => { setDisplay(itemID, !homeopapeItem.display); }} >Display</Button>
                      <Button outline size="sm" color="secondary" className="ms-2" onClick={(event) => { setPosted(itemID, !homeopapeItem.posted); }} >{homeopapeItem.posted === true || homeopapeItem.posted === 1 ? <React.Fragment>Undo Posted</React.Fragment> : <React.Fragment>Posted</React.Fragment>}</Button>
                      <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setAlwaysFilter(itemID, !homeopapeItem.alwaysFilter); }}>{homeopapeItem.alwaysFilter === true || homeopapeItem.alwaysFilter === 1 ? <React.Fragment>Undo Always Filter</React.Fragment> : <React.Fragment>Always Filter</React.Fragment>}</Button>
                      <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(itemID, !homeopapeItem.viewed); }}>{homeopapeItem.viewed === true || homeopapeItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

                      {/* {homeopapeItem.alwaysFilter === true || homeopapeItem.alwaysFilter === 1 ? <p>Already Always Filter</p> : null} */}
                      {/* {homeopapeItem.posted === true || homeopapeItem.posted === 1 ? <p>Already Posted</p> : null} */}

                    </Col>

                  </Row>

                  : null}

              </React.Fragment>

            );
          })}

        </Col>

        <Col xs="6">

          <h3>Displayed</h3>

          {homeopapeItems.map((homeopapeItem, index) => {

            // * One method to only display ten items in the list. -- 06/26/2021 MF
            // if (index > 20) {

            //   breakArray = true;

            // };

            // if (breakArray === true) {

            //   return;

            // };

            // * One method to only display ten items in the list. -- 06/26/2021 MF
            // if (displayItemsCount >= 20) {

            //   console.log(componentName, GetDateTime(), "homeopapeItems.map Ten item maximum!", displayItemsCount, index);
            //   homeopapeItems.splice(0, index);

            // };

            let show = true;

            if (homeopapeItem.display !== true) { // homeopapeItem.display !== 1

              show = false;

            } else if (displayItemsCount >= 20) {

              // console.log(componentName, GetDateTime(), "homeopapeItems.map Ten item maximum!", displayItemsCount, index);
              // homeopapeItems.splice(0, index);
              show = false;

            } else {

              displayItemsCount++;
              // console.log(componentName, GetDateTime(), "homeopapeItems.map", homeopapeItem.itemTitle, displayItemsCount, index);

            };

            let itemLink;
            let itemID;
            let param = "";
            let regExp = "";

            if (IsEmpty(homeopapeItem) === false && IsEmpty(homeopapeItem.itemLink) === false) {

              itemLink = homeopapeItem.itemLink.replaceAll("https://www.google.com/url?rct=j&sa=t&url=", "");

              // * Remove &ct=ga&cd=CAIyGjFhOTgyNzMwYWNlOTE1ZDI6Y29tOmVuOlVT&usg=AFQjCNEhFPEPL8--91umtz1jWdrmBW2JZQ -- 06/26/2021 MF
              // * Google -- 06/26/2021 MF
              // * Removes everything after the ct= -- 06/26/2021 MF
              // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537 -- 06/26/2021 MF
              param = "ct";
              regExp = new RegExp("[?&]" + param + "=.*$");
              itemLink = itemLink.replace(regExp, "");
              itemLink = itemLink.replace("%3F", "?");
              itemLink = itemLink.replace("%3D", "=");
              itemID = homeopapeItem.itemID.replaceAll("tag:google.com,2013:googlealerts/feed:", "");

            };

            // * Remove html tags from string. -- 06/26/2021 MF
            // * https://www.tutorialspoint.com/how-to-remove-html-tags-from-a-string-in-javascript -- 06/26/2021 MF
            let formattedPost = formatPost(homeopapeItem.itemTitle.replace(/(<([^>]+)>)/ig, ''), itemLink);

            // console.log(componentName, GetDateTime(), "homeopapeItems.map homeopapeItem", homeopapeItem);
            // console.log(componentName, GetDateTime(), "homeopapeItems.map homeopapeItem.itemID", homeopapeItem.itemID);
            // console.log(componentName, GetDateTime(), "homeopapeItems.map homeopapeItem.homeopapeID", homeopapeItem.homeopapeID);
            // console.log(componentName, GetDateTime(), "homeopapeItems.map homeopapeItem.display", homeopapeItem.display);
            // console.log(componentName, GetDateTime(), "homeopapeItems.map homeopapeItem.posted", homeopapeItem.posted);

            return (
              <React.Fragment key={itemID}>

                {show === true ?

                  <Row className="mb-5">

                    {/* <Col xs="1"> */}
                    {/* <FormGroup className="ms-4">

              <Label for="cbxDisplay"><Input type="checkbox" id="cbxDisplay" checked={cbxDisplay} onChange={(event) => { setCbxDisplay(!cbxDisplay); }} />Display</Label>

            </FormGroup>

            <FormGroup className="ms-4">

              <Label for="cbxPosted"><Input type="checkbox" id="cbxPosted" checked={cbxPosted} onChange={(event) => { setCbxPosted(!cbxPosted); }} />Posted</Label>

            </FormGroup> */}

                    {/* <Button outline size="sm" color="primary" onClick={(event) => { setDisplay(itemID, !homeopapeItem.display); }} >Display</Button>
                      <Button outline size="sm" color="secondary" onClick={(event) => { setPosted(itemID, !homeopapeItem.posted); }} >Posted</Button>

                      {homeopapeItem.posted === true ? <p>Already Posted</p> : null}

                    </Col> */}

                    <Col xs="12">

                      <React.Fragment>

                        <div>
                          {/* <div dangerouslySetInnerHTML={{ "__html": homeopapeItem.itemTitle }} /> */}
                          {Parse(homeopapeItem.itemTitle)}<br />
                          <a href={itemLink} target="_blank">{itemLink}</a><br />
                          ({homeopapeItem.itemPubDate}) {homeopapeItem.itemContentSnippet}
                        </div>

                        <FormGroup className="text-center">
                          <Alert color="info">{formattedPost}</Alert>
                        </FormGroup>

                      </React.Fragment>

                      <Button outline size="sm" color="primary" onClick={(event) => { setDisplay(itemID, !homeopapeItem.display); }} >Display</Button>
                      <Button outline size="sm" color="secondary" className="ms-2" onClick={(event) => { setPosted(itemID, !homeopapeItem.posted); }} >{homeopapeItem.posted === true || homeopapeItem.posted === 1 ? <React.Fragment>Undo Posted</React.Fragment> : <React.Fragment>Posted</React.Fragment>}</Button>
                      <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setAlwaysFilter(itemID, !homeopapeItem.alwaysFilter); }}>{homeopapeItem.alwaysFilter === true || homeopapeItem.alwaysFilter === 1 ? <React.Fragment>Undo Always Filter</React.Fragment> : <React.Fragment>Always Filter</React.Fragment>}</Button>
                      <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { setViewed(itemID, !homeopapeItem.viewed); }}>{homeopapeItem.viewed === true || homeopapeItem.viewed === 1 ? <React.Fragment>Undo Viewed</React.Fragment> : <React.Fragment>Viewed</React.Fragment>}</Button>

                      {/* {homeopapeItem.alwaysFilter === true || homeopapeItem.alwaysFilter === 1 ? <p>Already Always Filter</p> : null} */}
                      {/* {homeopapeItem.posted === true || homeopapeItem.posted === 1 ? <p>Already Posted</p> : null} */}

                    </Col>

                  </Row>

                  : null}

              </React.Fragment>
            );
          })}

        </Col>
      </Row>

    </Container>
  );
};

export default FromTheHomeopape;
