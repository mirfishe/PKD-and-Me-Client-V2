import React, { useState, useEffect } from "react";
import { Alert, Container, Col, Row } from "reactstrap";
import Parse from "html-react-parser";
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime } from "../../utilities/SharedFunctions";
import { encodeURL, convertBitTrueFalse, addErrorLog } from "../../utilities/ApplicationFunctions";

const FromTheHomeopape = (props) => {

  const componentName = "FromTheHomeopape";

  // const sessionToken = useSelector(state => state.user.sessionToken);
  // // console.log(componentName, getDateTime(), "sessionToken", sessionToken);
  // const admin = useSelector(state => state.user.admin);
  // // console.log(componentName, getDateTime(), "admin", admin);

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

  const [homeopapeItems, setHomeopapeItems] = useState([]);

  // const [cbxDisplay, setCbxDisplay] = useState(false);
  // const [cbxPosted, setCbxPosted] = useState(false);

  const headerText = props.headerText;
  // console.log(componentName, getDateTime(), "props.headerText", props.headerText);

  // let breakArray = false;
  // let displayItemsCount = 0;


  const getNews = () => {

    let url = baseURL + "fromthehomeopape/top/20";
    // // TODO: Fix the way that the limit works on the server because it works differently than the local version. -- 06/26/2021 MF
    // // let url = baseURL + "fromthehomeopape/top/10/10";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        // console.log(componentName, getDateTime(), "getNews response", response);

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, getDateTime(), "getNews results", results);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          // console.log(componentName, getDateTime(), "getNews results.records[0]", results.records[0]);

          setHomeopapeItems(results.records);
          // setHomeopapeItems(results.records[0]);

        };

      })
      .catch((error) => {
        // console.error(componentName, getDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

    getNews();

  }, []);


  return (
    <Container className="mt-4">

      {isEmpty(homeopapeItems) === false ?

        <React.Fragment>

          <Row className="justify-content-center">
            <Col className="text-center" xs="12">
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
              {isEmpty(headerText) === false ? <h4 className="text-center">{headerText}</h4> : null}
            </Col>
          </Row>

          {homeopapeItems.map((homeopapeItem, index) => {

            // let show = true;

            // if (homeopapeItem.display !== true) { // homeopapeItem.display !== 1

            //   show = false;

            //   } else if (displayItemsCount >= 20) {

            //     // console.log(componentName, getDateTime(), "homeopapeItems.map Ten item maximum!", displayItemsCount, index);
            //     // homeopapeItems.splice(0, index);
            //     show = false;

            //   } else {

            //     displayItemsCount++;
            //     // console.log(componentName, getDateTime(), "homeopapeItems.map", homeopapeItem.itemTitle, displayItemsCount, index);

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

            // console.log(componentName, getDateTime(), "homeopapeItems.map homeopapeItem", homeopapeItem);
            // console.log(componentName, getDateTime(), "homeopapeItems.map homeopapeItem.itemID", homeopapeItem.itemID);
            // console.log(componentName, getDateTime(), "homeopapeItems.map homeopapeItem.homeopapeID", homeopapeItem.homeopapeID);
            // console.log(componentName, getDateTime(), "homeopapeItems.map homeopapeItem.display", homeopapeItem.display);
            // console.log(componentName, getDateTime(), "homeopapeItems.map homeopapeItem.posted", homeopapeItem.posted);

            return (
              <React.Fragment key={index}>

                {/* {show === true ? */}

                <Row className="mt-3">
                  <Col xs="12">

                    {/* <a href={itemLink} target="_blank"><div dangerouslySetInnerHTML={{ "__html": homeopapeItem.itemTitle }} /></a> */}

                    <a href={homeopapeItem.itemLinkFormatted} target="_blank">{Parse(homeopapeItem.itemTitle)}</a><br />

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
