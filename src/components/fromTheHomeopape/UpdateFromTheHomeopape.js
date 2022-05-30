import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, FormGroup, Label, Input, Button } from "reactstrap";
// import Parse from "html-react-parser";
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime, formatLowerCase, formatUpperCase, removeHTML } from "shared-functions";
// import { encodeURL, convertBitTrueFalse, toTitleCase, addErrorLog } from "../../utilities/ApplicationFunctions";
import FromTheHomeopapeItem from "./FromTheHomeopapeItem";

// * https://www.npmjs.com/package/rss-parser
// * https://github.com/rbren/rss-parser
// import Parser from "rss-parser";

const FromTheHomeopape = (props) => {

  const componentName = "FromTheHomeopape";

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  // const [feedItems, setFeedItems] = useState([]);
  // const [feedItems2, setFeedItems2] = useState([]);
  const [homeopapeItems, setHomeopapeItems] = useState([]);
  const [homeopapeItemsPosted, setHomeopapeItemsPosted] = useState([]);
  const [homeopapeItemsReview, setHomeopapeItemsReview] = useState([]);
  const [homeopapeItemsReviewTitle, setHomeopapeItemsReviewTitle] = useState([]);
  const [homeopapeItemsReviewText, setHomeopapeItemsReviewText] = useState([]);
  const [homeopapeItemsReviewNeither, setHomeopapeItemsReviewNeither] = useState([]);
  const [homeopapeItemsReviewIncorrectContext, setHomeopapeItemsReviewIncorrectContext] = useState([]);

  // const [cbxDisplay, setCbxDisplay] = useState(false);
  // const [cbxPosted, setCbxPosted] = useState(false);

  // let breakArray = false;
  // let displayItemsCount = 0;
  // let displayUpdateItemsCount = 0;


  const filterNewsReview = (homeopapeItemsReview) => {

    let newHomeopapeItemsReview = [];
    let newHomeopapeItemsReviewTitle = [];
    let newHomeopapeItemsReviewText = [];
    let newHomeopapeItemsReviewNeither = [];
    let newHomeopapeItemsReviewIncorrectContext = [];

    if (Array.isArray(homeopapeItemsReview) === true) {

      for (let i = 0; i < homeopapeItemsReview.length; i++) {


        let inTitle = false;
        let inText = false;
        let incorrectContext = false;

        // ? Remove the punctuation in the checks? -- 02/13/2022 MF
        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("philip k. dick") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("philip k. dick") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("philip k dick") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("philip k dick") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("dick philip k") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("dick philip k") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("dick, philip k") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("dick, philip k") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("dick, philip") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("dick, philip") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("philip dick") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("philip dick") === true) {

          inText = true;

        };

        // if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("philip") === true && formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("dick") === true) {

        //   inTitle = true;

        // };

        // if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("philip") === true && formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("dick") === true) {

        //   inText = true;

        // };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("philip kindred dick") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("philip kindred dick") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("blade runner") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("blade runner") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("blade runner 2049") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("blade runner 2049") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("black lotus") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("black lotus") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("total recall") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("total recall") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("electric dreams") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("electric dreams") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("man in the high castle") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("man in the high castle") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("minority report") === true) {

          inTitle = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("minority report") === true) {

          inText = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemLinkFormatted)).includes("wrestling") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("wrestling") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("wrestling") === true) {

          incorrectContext = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemLinkFormatted)).includes("running") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("running") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("running") === true) {

          incorrectContext = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemLinkFormatted)).includes("marathon") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("marathon") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("marathon") === true) {

          incorrectContext = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemLinkFormatted)).includes("amputation") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("amputation") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("amputation") === true) {

          incorrectContext = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemLinkFormatted)).includes("amputee") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("amputee") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("amputee") === true) {

          incorrectContext = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemLinkFormatted)).includes("sprinter") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("sprinter") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("sprinter") === true) {

          incorrectContext = true;

        };

        if (formatLowerCase(removeHTML(homeopapeItemsReview[i].itemLinkFormatted)).includes("prosthesis") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("prosthesis") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("prosthesis") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemLinkFormatted)).includes("prostheses") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemTitle)).includes("prostheses") === true || formatLowerCase(removeHTML(homeopapeItemsReview[i].itemContentSnippet)).includes("prostheses") === true) {

          incorrectContext = true;

        };

        if (homeopapeItemsReview[i].display === false) {

          newHomeopapeItemsReview.push(homeopapeItemsReview[i]);

        };

        if (incorrectContext !== true && homeopapeItemsReview[i].display === false) {

          if (inTitle === true) {

            newHomeopapeItemsReviewTitle.push(homeopapeItemsReview[i]);

          };

          if (inText === true && inTitle !== true) {

            newHomeopapeItemsReviewText.push(homeopapeItemsReview[i]);

          };

          if (inTitle !== true && inText !== true) {

            newHomeopapeItemsReviewNeither.push(homeopapeItemsReview[i]);

          };

        } else if (incorrectContext === true && homeopapeItemsReview[i].display === false) {

          newHomeopapeItemsReviewIncorrectContext.push(homeopapeItemsReview[i]);

        };

      };

    };


    setHomeopapeItemsReview(newHomeopapeItemsReview);
    setHomeopapeItemsReviewTitle(newHomeopapeItemsReviewTitle);
    setHomeopapeItemsReviewText(newHomeopapeItemsReviewText);
    setHomeopapeItemsReviewNeither(newHomeopapeItemsReviewNeither);
    setHomeopapeItemsReviewIncorrectContext(newHomeopapeItemsReviewIncorrectContext);

  };


  const getNews = () => {

    let url = baseURL + "fromthehomeopape/top/50";
    // // TODO: Fix the way that the limit works on the server because it works differently than the local version. -- 06/26/2021 MF
    // // let url = baseURL + "fromthehomeopape/top/10";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {

        if (response.ok !== true) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          setHomeopapeItems(results.records);
          // setHomeopapeItems(results.records[0]);

        } else {

          setHomeopapeItems([]);

        };

      })
      .catch((error) => {
        // console.error(componentName, getDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const getNewsPosted = () => {

    let url = baseURL + "fromthehomeopape/posted";
    // // TODO: Fix the way that the limit works on the server because it works differently than the local version. -- 06/26/2021 MF
    // // let url = baseURL + "fromthehomeopape/top/10";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {

        if (response.ok !== true) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          setHomeopapeItemsPosted(results.records);
          // setHomeopapeItemsPosted(results.records[0]);

        } else {

          setHomeopapeItemsPosted([]);

        };

      })
      .catch((error) => {
        // console.error(componentName, getDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

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

        if (response.ok !== true) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          filterNewsReview(results.records);
          // setHomeopapeItemsReview(results.records);
          // setHomeopapeItemsReview(results.records[0]);

        } else {

          filterNewsReview([]);
          // setHomeopapeItemsReview([]);

        };

      })
      .catch((error) => {
        // console.error(componentName, getDateTime(), "getNewsReview error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

    // fetchNews();
    // fetchNews2();

    // * Handled in a cron job on the server now. -- 06/26/2021 MF
    // fetchNews();

    getNews();

    getNewsPosted();

    getNewsReview();

  }, []);


  const markAllViewed = () => {

    clearMessages();

    let url = baseURL + "fromthehomeopape/markviewed/";

    if (isEmpty(sessionToken) === false) {


      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        })
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

            // getNewsReview();
            setHomeopapeItemsReview([]);

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {
          console.error(componentName, getDateTime(), "markAllViewed error", error);
          // console.error(componentName, getDateTime(), "markAllViewed error.name", error.name);
          // console.error(componentName, getDateTime(), "markAllViewed error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  useEffect(() => {

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);


  return (
    <Container className="mt-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      <Row>

        {Array.isArray(homeopapeItems) === true ?

          <Col xs="4">

            <h3>Displayed</h3>

            {homeopapeItems.map((homeopapeItem, index) => {

              return (
                <React.Fragment key={index}>

                  <FromTheHomeopapeItem homeopapeItem={homeopapeItem} getNews={getNews} getNewsPosted={getNewsPosted} getNewsReview={getNewsReview} />

                </React.Fragment>
              );
            })}

          </Col>

          : null}

        {Array.isArray(homeopapeItemsPosted) === true ?

          <Col xs="4">

            <h3>Posted</h3>

            {homeopapeItemsPosted.map((homeopapeItem, index) => {

              return (
                <React.Fragment key={index}>

                  <FromTheHomeopapeItem homeopapeItem={homeopapeItem} getNews={getNews} getNewsPosted={getNewsPosted} getNewsReview={getNewsReview} />

                </React.Fragment>
              );
            })}

          </Col>

          : null}

        <Col xs="4">

          {Array.isArray(homeopapeItemsReviewTitle) === true ?

            <React.Fragment>

              <h3>In Title <span className="text-muted ms-2 small-text">{homeopapeItemsReviewTitle.length} in category out of {homeopapeItemsReview.length} total to review.</span></h3>

              {homeopapeItemsReviewTitle.map((homeopapeItem, index) => {

                return (
                  <React.Fragment key={index}>

                    <FromTheHomeopapeItem homeopapeItem={homeopapeItem} getNews={getNews} getNewsPosted={getNewsPosted} getNewsReview={getNewsReview} />

                  </React.Fragment>
                );
              })}

              <hr />

            </React.Fragment>

            : null}


          {Array.isArray(homeopapeItemsReviewText) === true ?

            <React.Fragment>

              <h3>In Text/Mentioned <span className="text-muted ms-2 small-text">{homeopapeItemsReviewText.length} in category out of {homeopapeItemsReview.length} total to review.</span></h3>

              {homeopapeItemsReviewText.map((homeopapeItem, index) => {

                return (
                  <React.Fragment key={index}>

                    <FromTheHomeopapeItem homeopapeItem={homeopapeItem} getNews={getNews} getNewsPosted={getNewsPosted} getNewsReview={getNewsReview} />

                  </React.Fragment>
                );
              })}

              <hr />

            </React.Fragment>

            : null}


          {Array.isArray(homeopapeItemsReviewNeither) === true ?

            <React.Fragment>

              <h3>Neither <span className="text-muted ms-2 small-text">{homeopapeItemsReviewNeither.length} in category out of {homeopapeItemsReview.length} total to review.</span></h3>

              {homeopapeItemsReviewNeither.map((homeopapeItem, index) => {

                return (
                  <React.Fragment key={index}>

                    <FromTheHomeopapeItem homeopapeItem={homeopapeItem} getNews={getNews} getNewsPosted={getNewsPosted} getNewsReview={getNewsReview} />

                  </React.Fragment>
                );
              })}

              <hr />

            </React.Fragment>

            : null}


          {Array.isArray(homeopapeItemsReviewIncorrectContext) === true ?

            <React.Fragment>

              <h3>Incorrect Context <span className="text-muted ms-2 small-text">{homeopapeItemsReviewIncorrectContext.length} in category out of {homeopapeItemsReview.length} total to review.</span></h3>

              {homeopapeItemsReviewIncorrectContext.map((homeopapeItem, index) => {

                return (
                  <React.Fragment key={index}>

                    <FromTheHomeopapeItem homeopapeItem={homeopapeItem} getNews={getNews} getNewsPosted={getNewsPosted} getNewsReview={getNewsReview} />

                  </React.Fragment>
                );
              })}

              <hr />

            </React.Fragment>

            : null}


          {Array.isArray(homeopapeItemsReview) === true ?

            <React.Fragment>

              <h3>All Items <span className="text-muted ms-2 small-text">{homeopapeItemsReview.length} in category out of {homeopapeItemsReview.length} total to review.</span> <Button outline size="sm" color="danger" className="ms-2" onClick={(event) => { markAllViewed(); }}>Mark All Viewed</Button></h3>

              {homeopapeItemsReview.map((homeopapeItem, index) => {

                return (
                  <React.Fragment key={index}>

                    <FromTheHomeopapeItem homeopapeItem={homeopapeItem} getNews={getNews} getNewsPosted={getNewsPosted} getNewsReview={getNewsReview} />

                  </React.Fragment>
                );
              })}

            </React.Fragment>

            : null}

        </Col>

      </Row>

    </Container>
  );
};

export default FromTheHomeopape;
