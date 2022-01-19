import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Table, } from "reactstrap";
import applicationSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../utilities/SharedFunctions";
import { LogError } from "../../utilities/ApplicationFunctions";

const BrokenLinks = () => {

  const componentName = "BrokenLinks.js";

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

  const [brokenLinks, setBrokenLinks] = useState([]);


  const getBrokenLinks = () => {

    clearMessages();

    let url = baseURL + "computerLogs/broken/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": sessionToken
      }),
    })
      .then(response => {
        // console.log(componentName, GetDateTime(), "getBrokenLinks response", response);

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getNews results", results);

        if (IsEmpty(results) === false && results.transactionSuccess === true) {

          setBrokenLinks(results.records);

        };

      })
      .catch((error) => {
        // console.error(componentName, GetDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

    getBrokenLinks();

  }, []);


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
        <Col xs="12">

          <h5 className="text-center">Broken Links</h5>

          {IsEmpty(brokenLinks) === false ?

            <Table responsive>
              <thead>
                <tr>
                  <th>Create Date</th>
                  <th>Endpoint</th>
                  <th>Edition ID</th>
                  <th>Title ID</th>
                  <th>Title</th>
                  <th>Image</th>
                </tr>
              </thead>

              <tbody>

                {brokenLinks.map((brokenLink, index) => {

                  // console.log(componentName, GetDateTime(), "map brokenLink", brokenLink);

                  return (
                    <tr key={index}>
                      {IsEmpty(brokenLink.createDate) === false ? <td>{brokenLink.createDate.slice(0, 19).replace("T", " ")}</td> : <td>{brokenLink.createDate}</td>}
                      <td>{brokenLink.endpoint}</td>
                      <td>{brokenLink.editionID}</td>
                      <td>{brokenLink.titleID}</td>
                      <td>{brokenLink.titleName}</td>
                      <td>{brokenLink.imageName}</td>
                    </tr>
                  );
                })}


              </tbody>

            </Table>

            : <p>There are no broken links.</p>}

        </Col>
      </Row>

    </Container>
  );
};

export default BrokenLinks;
