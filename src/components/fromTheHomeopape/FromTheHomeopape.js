import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Container, Col, Row } from "reactstrap";
import Parse from "html-react-parser";
import { isEmpty, getDateTime, isNonEmptyArray, addErrorLog } from "shared-functions";
import { encodeURL, convertBitTrueFalse } from "../../utilities/ApplicationFunctions";

const FromTheHomeopape = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: headerText -- 10/21/2022 MF

  const componentName = "FromTheHomeopape";

  const baseURL = useSelector(state => state.applicationSettings.baseURL);

  // const sessionToken = useSelector(state => state.user.sessionToken);
  // const admin = useSelector(state => state.user.admin);

  let headerText = isEmpty(props) === false && isEmpty(props.headerText) === false ? props.headerText : "";
  let topNumber = isEmpty(props) === false && isEmpty(props.topNumber) === false ? props.topNumber : "";

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [homeopapeItems, setHomeopapeItems] = useState([]);

  // const [cbxDisplay, setCbxDisplay] = useState(false);
  // const [cbxPosted, setCbxPosted] = useState(false);

  // let breakArray = false;
  // let displayItemsCount = 0;


  useEffect(() => {

    if (isEmpty(baseURL) === false) {

      getNews();

    };

  }, [baseURL]);


  const getNews = () => {

    clearMessages();

    let url = baseURL + "fromthehomeopape/top/" + topNumber;
    // // TODO: Fix the way that the limit works on the server because it works differently than the local version. -- 06/26/2021 MF
    // // let url = baseURL + "fromthehomeopape/top/10/10/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(results => {

        if (results.ok !== true) {

          throw Error(`${results.status} ${results.statusText} ${results.url}`);

        } else {

          return results.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          setHomeopapeItems(results.records);
          // setHomeopapeItems(results.records[0]);

        };

      })
      .catch((error) => {

        // console.error(componentName, getDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <Container className="mt-4">

      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      {isNonEmptyArray(homeopapeItems) === true ?

        <React.Fragment>

          <Row className="justify-content-center">
            <Col className="text-center" xs="12">
              {isEmpty(headerText) === false ? <h4 className="text-center">{headerText}</h4> : null}
            </Col>
          </Row>

          {homeopapeItems.map((homeopapeItem, index) => {

            // let show = true;

            // if (homeopapeItem.display !== true) { // homeopapeItem.display !== 1

            //   show = false;

            //   } else if (displayItemsCount >= 20) {

            //     // homeopapeItems.splice(0, index);
            //     show = false;

            //   } else {

            //     displayItemsCount++;

            // };

            // let itemLink;
            // // let itemID;
            // let param = "";
            // let regExp = "";

            // if (isEmpty(homeopapeItem) === false && isEmpty(homeopapeItem.itemLink) === false) {

            //   itemLink = homeopapeItem.itemLink.replaceAll("https://www.google.com/url?rct=j&sa=t&url=", "");

            //   // * Remove &ct=ga&cd=CAIyGjFhOTgyNzMwYWNlOTE1ZDI6Y29tOmVuOlVT&usg=AFQjCNEhFPEPL8--91umtz1jWdrmBW2JZQ -- 06/26/2021 MF
            //   // * Google -- 06/26/2021 MF
            //   // * Removes everything after the ct= -- 06/26/2021 MF
            //   // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537 -- 06/26/2021 MF
            //   param = "ct";
            //   regExp = new RegExp("[?&]" + param + "=.*$");
            //   itemLink = itemLink.replace(regExp, "");
            //   // itemID = homeopapeItem.itemID.replaceAll("tag:google.com,2013:googlealerts/feed:", "");

            // };

            return (
              <React.Fragment key={index}>

                {/* {show === true ? */}

                <Row className="mt-3">
                  <Col xs="12">

                    {/* <a href={itemLink} target="_blank" rel="noopener noreferrer nofollow"><div dangerouslySetInnerHTML={{ "__html": homeopapeItem.itemTitle }} /></a> */}

                    <a href={homeopapeItem.itemLinkFormatted} target="_blank" rel="noopener noreferrer nofollow">{Parse(homeopapeItem.itemTitle)}</a><br />

                    ({homeopapeItem.itemPubDate.substring(0, 10)}) {homeopapeItem.itemContentSnippet}

                  </Col>
                </Row>

                {/* : null} */}

              </React.Fragment>
            );
          })}

        </React.Fragment>

        : null}

    </Container>
  );
};

export default FromTheHomeopape;
