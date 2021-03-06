import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Alert } from "reactstrap";
// import Edition from "./Edition";
import AppSettings from "../../app/environment";

const EditionList = (props) => {

  const componentName = "EditionList.js";

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  document.title = "Edition List | " + appName + " | " + siteName;

  const [editionMessage, setEditionMessage] = useState("");
  const [errEditionMessage, setErrEditionMessage] = useState("");
  const [editionResultsFound, setEditionResultsFound] = useState(null);
  const [editionList, setEditionList] = useState([]);

  const getEditions = () => {
    // console.log(componentName, "getEdition");
    // console.log(componentName, "getEdition baseURL", baseURL);

    setEditionMessage("");
    setErrEditionMessage("");
    setEditionResultsFound(null);
    setEditionList([]);

    if (baseURL !== undefined && baseURL !== "") {

      let url = baseURL + "edition/list";

      fetch(url)
        .then(response => {
          // console.log(componentName, "getEdition response", response);
          if (!response.ok) {
            throw Error(response.status + " " + response.statusText + " " + response.url);
          } else {
            return response.json();
          };
        })
        .then(data => {
          // console.log(componentName, "getEdition data", data);

          setEditionResultsFound(data.resultsFound);
          setEditionMessage(data.message);

          if (data.resultsFound === true) {
            setEditionList(data.editions);
          } else {
            setErrEditionMessage(data.message);
          };

        })
        .catch(error => {
          console.log(componentName, "getEdition error", error);
          // console.log(componentName, "getEdition error.name", error.name);
          // console.log(componentName, "getEdition error.message", error.message);
          setErrEditionMessage(error.name + ": " + error.message);
        });

    };

  };

  useEffect(() => {
    getEditions();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="text-center">
        {editionMessage !== undefined && editionMessage !== null && editionMessage !== "" ? <Alert color="info">{editionMessage}</Alert> : null}
        {errEditionMessage !== undefined && errEditionMessage !== null && errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
      </Row>
      {editionResultsFound !== null ?
        <Row>
          {/* <pre>
                    {JSON.stringify(editionList)}
                </pre> */}
          <span>
            {JSON.stringify({ "resultsFound": true, "message": "Offline Editions data used.", "editions": editionList })}
          </span>
        </Row>
        : null}

      <Row>
        {/* {editionResultsFound !== null ? <Edition editionList={editionList} /> : null} */}
        {/* <Edition editionList={editionListState} /> */}
      </Row>
    </Container>
  );
};

export default EditionList;
