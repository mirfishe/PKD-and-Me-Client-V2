import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Alert } from "reactstrap";
// import Title from "./Title";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";

const TitleList = (props) => {

  const componentName = "TitleList.js";

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  document.title = "Title List | " + appName + " | " + siteName;

  const [titleMessage, setTitleMessage] = useState("");
  const [errTitleMessage, setErrTitleMessage] = useState("");
  const [titleResultsFound, setTitleResultsFound] = useState(null);
  const [titleList, setTitleList] = useState([]);


  const getTitles = () => {
    // console.log(componentName, GetDateTime(), "getTitle");
    // console.log(componentName, GetDateTime(), "getTitle baseURL", baseURL);

    setTitleMessage("");
    setErrTitleMessage("");
    setTitleResultsFound(null);
    setTitleList([]);

    if (IsEmpty(baseURL) === false) {

      let url = baseURL + "titles";

      fetch(url)
        .then(response => {
          // console.log(componentName, GetDateTime(), "getTitle response", response);
          if (!response.ok) {
            throw Error(response.status + " " + response.statusText + " " + response.url);
          } else {
            return response.json();
          };
        })
        .then(results => {
          // console.log(componentName, GetDateTime(), "getTitle results", results);

          setTitleResultsFound(results.resultsFound);
          setTitleMessage(results.message);

          if (IsEmpty(results) === false && results.resultsFound === true) {
            setTitleList(results.records);
          } else {
            setErrTitleMessage(results.message);
          };

        })
        .catch(error => {
          console.error(componentName, GetDateTime(), "getTitle error", error);
          // console.error(componentName, GetDateTime(), "getTitle error.name", error.name);
          // console.error(componentName, GetDateTime(), "getTitle error.message", error.message);
          setErrTitleMessage(error.name + ": " + error.message);
        });

    };

  };


  useEffect(() => {
    getTitles();
  }, []);


  return (
    <Container className="mt-4">
      <Row className="text-center">
        {IsEmpty(titleMessage) === false ? <Alert color="info">{titleMessage}</Alert> : null}
        {IsEmpty(errTitleMessage) === false ? <Alert color="danger">{errTitleMessage}</Alert> : null}
      </Row>
      {titleResultsFound !== null ?
        <Row>
          {/* <pre>
                    {JSON.stringify(titleList)}
                </pre> */}
          <span>
            {JSON.stringify({ "resultsFound": true, "message": "Offline Titles data used.", "records": titleList })}
          </span>
        </Row>
        : null}

      <Row>
        {/* {titleResultsFound !== null ? <Title titleList={titleList} /> : null} */}
        {/* <Title titleList={titleListState} /> */}
      </Row>
    </Container>
  );
};

export default TitleList;
