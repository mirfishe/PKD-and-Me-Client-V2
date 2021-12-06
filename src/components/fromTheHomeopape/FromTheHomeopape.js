import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Alert, Container, Col, Row, FormGroup, Label, Input, Button } from "reactstrap";
import Parse from "html-react-parser";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, encodeURL, ConvertBitTrueFalse } from "../../app/sharedFunctions";

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

  const [homeopapeItems, setHomeopapeItems] = useState([]);

  // const [cbxDisplay, setCbxDisplay] = useState(false);
  // const [cbxPosted, setCbxPosted] = useState(false);

  const headerText = props.headerText;
  // console.log(componentName, GetDateTime(), "props.headerText", props.headerText);

  // let breakArray = false;
  let displayItemsCount = 0;


  const getNews = () => {

    let url = baseURL + "fromthehomeopape/";
    // TODO: Fix the way that the limit works on the server because it works differently than the local version.
    // let url = baseURL + "fromthehomeopape/top/10/10";

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

          // console.log(componentName, GetDateTime(), "getNews results.records[0]", results.records[0]);

          setHomeopapeItems(results.records);
          // setHomeopapeItems(results.records[0]);

        };

      })
      .catch(error => {
        // console.error(componentName, GetDateTime(), "getNews error", error);
        setErrorMessage(error.name + ": " + error.message);

      });

  };


  useEffect(() => {

    getNews();

  }, []);


  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col className="text-center" xs="12">
          {IsEmpty(errorMessage) === false ? <Alert color="danger">{errorMessage}</Alert> : null}
          {IsEmpty(headerText) === false ? <h4 className="text-center">{headerText}</h4> : null}
        </Col>
      </Row>

      {homeopapeItems.map((homeopapeItem, index) => {

        // * One method to only display ten items in the list.
        // if (index > 10) {
        //   breakArray = true;
        // };

        // if (breakArray === true) {
        //   return;
        // };

        // * One method to only display ten items in the list.
        // if (displayItemsCount >= 10) {
        //   console.log(componentName, GetDateTime(), "homeopapeItems.map Ten item maximum!", displayItemsCount, index);
        //   homeopapeItems.splice(0, index);
        // };

        let show = true;

        if (homeopapeItem.display !== true) { // homeopapeItem.display !== 1
          show = false;
        } else if (displayItemsCount >= 10) {
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

        // console.log(componentName, GetDateTime(), "homeopapeItems.map homeopapeItem", homeopapeItem);
        // console.log(componentName, GetDateTime(), "homeopapeItems.map homeopapeItem.itemID", homeopapeItem.itemID);
        // console.log(componentName, GetDateTime(), "homeopapeItems.map homeopapeItem.homeopapeID", homeopapeItem.homeopapeID);
        // console.log(componentName, GetDateTime(), "homeopapeItems.map homeopapeItem.display", homeopapeItem.display);
        // console.log(componentName, GetDateTime(), "homeopapeItems.map homeopapeItem.posted", homeopapeItem.posted);

        return (
          <React.Fragment key={itemID}>
            {show === true ?
              <Row>
                <Col xs="12">
                  {/* <a href={itemLink} target="_blank"><div dangerouslySetInnerHTML={{ "__html": homeopapeItem.itemTitle }} /></a> */}
                  <a href={itemLink} target="_blank">{Parse(homeopapeItem.itemTitle)}</a><br />
                  ({homeopapeItem.itemPubDate.substring(0, 10)}) {homeopapeItem.itemContentSnippet}
                </Col>
              </Row>
              : null}
          </React.Fragment>
        );
      })}

    </Container>
  );

};

export default FromTheHomeopape;
