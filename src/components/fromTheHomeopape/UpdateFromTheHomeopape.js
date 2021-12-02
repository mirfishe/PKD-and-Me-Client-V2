import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Alert, Container, Col, Row, FormGroup, Label, Input, Button } from "reactstrap";
import Parse from "html-react-parser";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, encodeURL, ConvertBitTrueFalse } from "../../app/sharedFunctions";

// * https://www.npmjs.com/package/rss-parser
// * https://github.com/rbren/rss-parser
import Parser from "rss-parser";

const FromTheHomeopape = (props) => {

  const componentName = "FromTheHomeopape.js";

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
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

  // const [cbxDisplay, setCbxDisplay] = useState(false);
  // const [cbxPosted, setCbxPosted] = useState(false);

  // let breakArray = false;
  let displayItemsCount = 0;
  let displayUpdateItemsCount = 0;


  const toTitleCase = (title) => {
    // console.log(componentName, GetDateTime(), "toTitleCase title", title);

    // * https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    let i, j, str, lowers, uppers;

    str = title.replaceAll("&#39;", "'").replaceAll("&Amp;", "&").replaceAll("&amp;", "&").replaceAll("&Quot;", "\"").replaceAll("&quot;", "\"");

    str = str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // * Certain minor words should be left lowercase unless 
    // * they are the first or last words in the string
    lowers = ["A", "An", "The", "And", "But", "Or", "For", "Nor", "As", "At",
      "By", "For", "From", "In", "Into", "Near", "Of", "On", "Onto", "To", "With"];
    for (i = 0, j = lowers.length; i < j; i++)
      str = str.replace(new RegExp("\\s" + lowers[i] + "\\s", "g"),
        function (txt) {
          return txt.toLowerCase();
        });

    // * Certain words such as initialisms or acronyms should be left uppercase
    uppers = ["Id", "Tv", "Pkd"];
    for (i = 0, j = uppers.length; i < j; i++)
      str = str.replace(new RegExp("\\b" + uppers[i] + "\\b", "g"),
        uppers[i].toUpperCase());

    return str;

  };


  const formatPost = (txtArticleTitle, txtArticleURL, txtItemContentSnippet) => {
    // console.log(componentName, GetDateTime(), "formatPost txtArticleTitle", txtArticleTitle);
    // console.log(componentName, GetDateTime(), "formatPost txtArticleURL", txtArticleURL);
    // console.log(componentName, GetDateTime(), "formatPost itemContentSnippet", itemContentSnippet);

    let post = toTitleCase(txtArticleTitle) + " #PhilipDick #PhilipKDick ";
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

    if (txtArticleTitle.toLowerCase().includes("blade runner") === true || itemContentSnippet.toLowerCase().includes("blade runner") === true) {
      post = post + " #BladeRunner ";
    };

    if (txtArticleTitle.toLowerCase().includes("blade runner 2049") === true || itemContentSnippet.toLowerCase().includes("blade runner 2049") === true) {
      post = post + " #BladeRunner2049 ";
    };

    if (txtArticleTitle.toLowerCase().includes("total recall") === true || itemContentSnippet.toLowerCase().includes("total recall") === true) {
      post = post + " #TotalRecall ";
    };

    if (txtArticleTitle.toLowerCase().includes("electric dreams") === true || itemContentSnippet.toLowerCase().includes("electric dreams") === true) {
      post = post + " #ElectricDreams ";
    };

    if (txtArticleTitle.toLowerCase().includes("man in the high castle") === true || itemContentSnippet.toLowerCase().includes("man in the high castle") === true) {
      post = post + " #TMITHC #HighCastle ";
    };

    if (txtArticleTitle.toLowerCase().includes("minority report") === true || itemContentSnippet.toLowerCase().includes("minority report") === true) {
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

    // * Remove fbclid=
    // * FaceBook analytics and tracking
    // * Removes everything after the fbclid=
    // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537
    param = "fbclid";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");
    // console.log(componentName, GetDateTime(), "formatPost newURL", newURL);

    // * Remove utm_medium=
    // * Google Analytics and tracking
    // * Removes everything after the utm_medium=
    param = "utm_medium";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");
    // console.log(componentName, GetDateTime(), "formatPost newURL", newURL);

    // * Remove utm_campaign=
    // * Google Analytics and tracking
    // * Removes everything after the utm_campaign=
    param = "utm_campaign";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");
    // console.log(componentName, GetDateTime(), "formatPost newURL", newURL);

    // * Remove utm_source=
    // * Google Analytics and tracking
    // * Removes everything after the utm_source=
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
    // console.log(componentName, GetDateTime(), "getNews");

    let url = baseURL + "fromthehomeopape/";
    // TODO: Fix the way that the limit works on the server because it works differently than the local version.
    // let url = baseURL + "fromthehomeopape/top/10";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getNews results", results);

        if (!results.ok) {
          // throw Error(results.status + " " + results.statusText + " " + results.url);
        } else {
          return results.json();
          // return results.text();
        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getNews results", results);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          setHomeopapeItems(results.records);
          // setHomeopapeItems(results.records[0]);

        };

      })
      .catch(error => {
        // console.error(componentName, GetDateTime(), "getNews error", error);
        setErrorMessage(error.name + ": " + error.message);

      });

  };


  const fetchNews = () => {
    // console.log(componentName, GetDateTime(), "fetchNews");

    let url = baseURL + "fromthehomeopape/new";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(results => {
        // console.log(componentName, GetDateTime(), "fetchNews results", results);

        if (!results.ok) {
          // throw Error(results.status + " " + results.statusText + " " + results.url);
        } else {
          return results.json();
          // return results.text();
        };

      })
      .then(results => {
        console.log(componentName, GetDateTime(), "fetchNews results", results);

        // ! This happens too fast before the records have been written to the table.
        fetchNewsUpdate();

      })
      .catch(error => {
        console.error(componentName, GetDateTime(), "fetchNews error", error);
        setErrorMessage(error.name + ": " + error.message);

      });

  };


  const fetchNewsUpdate = () => {
    // console.log(componentName, GetDateTime(), "fetchNewsUpdate");

    let url = baseURL + "fromthehomeopape/update";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(results => {
        // console.log(componentName, GetDateTime(), "fetchNewsUpdate results", results);

        if (!results.ok) {
          // throw Error(results.status + " " + results.statusText + " " + results.url);
        } else {
          return results.json();
          // return results.text();
        };

      })
      .then(results => {
        console.log(componentName, GetDateTime(), "fetchNewsUpdate results", results);

      })
      .catch(error => {
        console.error(componentName, GetDateTime(), "fetchNewsUpdate error", error);
        setErrorMessage(error.name + ": " + error.message);

      });

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect");

    // fetchNews();
    // fetchNews2();

    // * Handled in a cron job on the server now.
    // fetchNews();

    getNews();

  }, []);


  const setDisplay = (itemID, display) => {
    // console.log(componentName, GetDateTime(), "setDisplay");
    // console.log(componentName, GetDateTime(), "setDisplay itemID", itemID);
    // console.log(componentName, GetDateTime(), "setDisplay display", display);

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

          if (data.recordUpdated === true) {

            getNews();

          } else {
            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);
          };

        })
        .catch(error => {
          console.error(componentName, GetDateTime(), "setDisplay error", error);
          // console.error(componentName, GetDateTime(), "setDisplay error.name", error.name);
          // console.error(componentName, GetDateTime(), "setDisplay error.message", error.message);
          addErrorMessage(error.name + ": " + error.message);
        });

    };

  };


  const setPosted = (itemID, posted) => {
    // console.log(componentName, GetDateTime(), "setPosted");
    // console.log(componentName, GetDateTime(), "setPosted itemID", itemID);
    // console.log(componentName, GetDateTime(), "setPosted posted", posted);

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

          if (data.recordUpdated === true) {

            getNews();

          } else {
            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);
          };

        })
        .catch(error => {
          console.error(componentName, GetDateTime(), "setPosted error", error);
          // console.error(componentName, GetDateTime(), "setPosted error.name", error.name);
          // console.error(componentName, GetDateTime(), "setPosted error.message", error.message);
          addErrorMessage(error.name + ": " + error.message);
        });

    };

  };


  const setAlwaysFilter = (itemID, alwaysFilter) => {
    // console.log(componentName, GetDateTime(), "setAlwaysFilter");
    // console.log(componentName, GetDateTime(), "setAlwaysFilter itemID", itemID);
    // console.log(componentName, GetDateTime(), "setAlwaysFilter alwaysFilter", alwaysFilter);

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

          if (data.recordUpdated === true) {

            getNews();

          } else {
            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);
          };

        })
        .catch(error => {
          console.error(componentName, GetDateTime(), "setAlwaysFilter error", error);
          // console.error(componentName, GetDateTime(), "setAlwaysFilter error.name", error.name);
          // console.error(componentName, GetDateTime(), "setAlwaysFilter error.message", error.message);
          addErrorMessage(error.name + ": " + error.message);
        });

    };

  };


  return (
    <Container className="mt-4">

      {IsEmpty(message) === false ? <Alert color="info">{message}</Alert> : null}
      {IsEmpty(errorMessage) === false ? <Alert color="danger">{errorMessage}</Alert> : null}

      <Row>
        <Col xs="6">

          <h3>All Items</h3>

          {homeopapeItems.map((homeopapeItem, index) => {

            // * One method to only display ten items in the list.
            // if (index > 100) {
            //   breakArray = true;
            // };

            // if (breakArray === true) {
            //   return;
            // };

            // * One method to only display ten items in the list.
            // if (displayUpdateItemsCount >= 100) {
            //   console.log(componentName, GetDateTime(), "homeopapeItems.map Ten item maximum!", displayUpdateItemsCount, index);
            //   homeopapeItems.splice(0, index);
            // };

            let show = true;

            if (homeopapeItem.display === true) { // homeopapeItem.display === 1
              show = false;
              // } else if (displayUpdateItemsCount >= 100) {
              //   // console.log(componentName, GetDateTime(), "homeopapeItems.map Ten item maximum!", displayUpdateItemsCount, index);
              //   // homeopapeItems.splice(0, index);
              //   show = false;
            } else {
              displayUpdateItemsCount++;
              // console.log(componentName, GetDateTime(), "homeopapeItems.map", homeopapeItem.itemTitle, displayUpdateItemsCount, index);
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

            // if (homeopapeItem.itemLink.includes("ebay.com")) {
            if (homeopapeItem.itemLink.toLowerCase().includes(".ebay.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("reddit.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("craigslist.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("amazon.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("audible.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("pinterest.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("twitter.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("facebook.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("tiktok.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("sites.google.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("books.google.")) {
              show = false;
            };

            if (homeopapeItem.itemLink.toLowerCase().includes("elasticsearch.columbian.com")) {
              show = false;
            };

            if (homeopapeItem.itemTitle.toLowerCase().includes("pistorius") || homeopapeItem.itemContentSnippet.toLowerCase().includes("pistorius")) {
              show = false;
            };

            let itemLink;
            let itemID;
            let param = "";
            let regExp = "";

            if (IsEmpty(homeopapeItem) === false && IsEmpty(homeopapeItem.itemLink) === false) {
              itemLink = homeopapeItem.itemLink.replaceAll("https://www.google.com/url?rct=j&sa=t&url=", "");

              // * Remove &ct=ga&cd=CAIyGjFhOTgyNzMwYWNlOTE1ZDI6Y29tOmVuOlVT&usg=AFQjCNEhFPEPL8--91umtz1jWdrmBW2JZQ
              // * Google
              // * Removes everything after the ct=
              // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537
              param = "ct";
              regExp = new RegExp("[?&]" + param + "=.*$");
              itemLink = itemLink.replace(regExp, "");
              itemID = homeopapeItem.itemID.replaceAll("tag:google.com,2013:googlealerts/feed:", "");

            };

            // * Remove html tags from string.
            // * https://www.tutorialspoint.com/how-to-remove-html-tags-from-a-string-in-javascript
            let formattedPost = formatPost(homeopapeItem.itemTitle.replace(/(<([^>]+)>)/ig, ''), itemLink, homeopapeItem.itemContentSnippet.replace(/(<([^>]+)>)/ig, ''));

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
                    {/* <FormGroup className="ml-4">

            <Label for="cbxDisplay"><Input type="checkbox" id="cbxDisplay" checked={cbxDisplay} onChange={(event) => { setCbxDisplay(!cbxDisplay); }} />Display</Label>

          </FormGroup>

          <FormGroup className="ml-4">

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
                      <Button outline size="sm" color="secondary" className="ml-2" onClick={(event) => { setPosted(itemID, !homeopapeItem.posted); }} >Posted</Button>
                      <Button outline size="sm" color="danger" className="ml-2" onClick={(event) => { setAlwaysFilter(itemID, !homeopapeItem.alwaysFilter); }}>Always Filter</Button>

                      {homeopapeItem.alwaysFilter === true || homeopapeItem.alwaysFilter === 1 ? <p>Already Always Filter</p> : null}
                      {homeopapeItem.posted === true || homeopapeItem.posted === 1 ? <p>Already Posted</p> : null}

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

            // * One method to only display ten items in the list.
            // if (index > 20) {
            //   breakArray = true;
            // };

            // if (breakArray === true) {
            //   return;
            // };

            // * One method to only display ten items in the list.
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

              // * Remove &ct=ga&cd=CAIyGjFhOTgyNzMwYWNlOTE1ZDI6Y29tOmVuOlVT&usg=AFQjCNEhFPEPL8--91umtz1jWdrmBW2JZQ
              // * Google
              // * Removes everything after the ct=
              // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537
              param = "ct";
              regExp = new RegExp("[?&]" + param + "=.*$");
              itemLink = itemLink.replace(regExp, "");
              itemID = homeopapeItem.itemID.replaceAll("tag:google.com,2013:googlealerts/feed:", "");

            };

            // * Remove html tags from string.
            // * https://www.tutorialspoint.com/how-to-remove-html-tags-from-a-string-in-javascript
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
                    {/* <FormGroup className="ml-4">

              <Label for="cbxDisplay"><Input type="checkbox" id="cbxDisplay" checked={cbxDisplay} onChange={(event) => { setCbxDisplay(!cbxDisplay); }} />Display</Label>

            </FormGroup>

            <FormGroup className="ml-4">

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
                      <Button outline size="sm" color="secondary" className="ml-2" onClick={(event) => { setPosted(itemID, !homeopapeItem.posted); }} >Posted</Button>
                      <Button outline size="sm" color="danger" className="ml-2" onClick={(event) => { setAlwaysFilter(itemID, !homeopapeItem.alwaysFilter); }}>Always Filter</Button>

                      {homeopapeItem.alwaysFilter === true || homeopapeItem.alwaysFilter === 1 ? <p>Already Always Filter</p> : null}
                      {homeopapeItem.posted === true || homeopapeItem.posted === 1 ? <p>Already Posted</p> : null}


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