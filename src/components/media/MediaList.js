import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Alert } from "reactstrap";
// import Media from "./Media";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";

const MediaList = (props) => {

  const componentName = "MediaList.js";

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  document.title = "Media List | " + appName + " | " + siteName;

  const [mediaMessage, setMediaMessage] = useState("");
  const [errMediaMessage, setErrMediaMessage] = useState("");
  const [mediaResultsFound, setMediaResultsFound] = useState(null);
  const [mediaList, setMediaList] = useState([]);


  const getMedia = () => {
    // console.log(componentName, GetDateTime(), "getMedia");
    // console.log(componentName, GetDateTime(), "getMedia baseURL", baseURL);

    setMediaMessage("");
    setErrMediaMessage("");
    setMediaResultsFound(null);
    setMediaList([]);

    if (IsEmpty(baseURL) === false) {

      let url = baseURL + "media";

      fetch(url)
        .then(response => {
          // console.log(componentName, GetDateTime(), "getMedia response", response);
          if (!response.ok) {
            throw Error(response.status + " " + response.statusText + " " + response.url);
          } else {
            return response.json();
          };
        })
        .then(results => {
          // console.log(componentName, GetDateTime(), "getMedia results", results);

          setMediaResultsFound(results.resultsFound);
          setMediaMessage(results.message);

          if (IsEmpty(results) === false && results.resultsFound === true) {
            setMediaList(results.records);
          } else {
            setErrMediaMessage(results.message);
          };

        })
        .catch(error => {
          console.error(componentName, GetDateTime(), "getMedia error", error);
          // console.error(componentName, GetDateTime(), "getMedia error.name", error.name);
          // console.error(componentName, GetDateTime(), "getMedia error.message", error.message);
          setErrMediaMessage(error.name + ": " + error.message);
        });

    };

  };


  useEffect(() => {
    getMedia();
  }, []);


  return (
    <Container className="mt-4">
      <Row className="text-center">
        {IsEmpty(mediaMessage) === false ? <Alert color="info">{mediaMessage}</Alert> : null}
        {IsEmpty(errMediaMessage) === false ? <Alert color="danger">{errMediaMessage}</Alert> : null}
      </Row>
      {mediaResultsFound !== null ?
        <Row>
          {/* <pre>
                    {JSON.stringify(mediaList)}
                </pre> */}
          <span>
            {JSON.stringify({ "resultsFound": true, "message": "Offline Media data used.", "records": mediaList })}
          </span>
        </Row>
        : null}

      <Row>
        {/* {mediaResultsFound !== null ? <Media mediaList={mediaList} /> : null} */}
        {/* <Media mediaList={mediaListState} /> */}
      </Row>
    </Container>
  );
};

export default MediaList;
