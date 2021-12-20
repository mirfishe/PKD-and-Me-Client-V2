import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert, Container, Col, Row, Table, } from "reactstrap";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../utilities/SharedFunctions";
import { LogError } from "../../utilities/AppFunctions";

const Reports = () => {

  const componentName = "Reports.js";

  const history = useHistory();

  // const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
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

  const [computerLogs, setComputerLogs] = useState([]);
  const [brokenLinks, setBrokenLinks] = useState([]);


  const getBrokenLinks = () => {

    clearMessages();

    let url = baseURL + "computerLogs/broken/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
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

        if (IsEmpty(results) === false && results.resultsFound === true) {

          setBrokenLinks(results.records);

        };

      })
      .catch((error) => {
        // console.error(componentName, GetDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const getComputerLogs = () => {

    clearMessages();

    let url = baseURL + "computerLogs/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        // console.log(componentName, GetDateTime(), "getComputerLogs response", response);

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getNews results", results);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          setComputerLogs(results.records);

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

    getComputerLogs();

  }, []);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect check for admin", admin);

    if (admin !== true) {

      history.push("/");

    };

  }, [admin]);


  return (
    <Container className="mt-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      <Row>
        <Col xs="12">

          <h3>Broken Links</h3>

          {IsEmpty(brokenLinks) === false ?

            <Table responsive>
              <thead>
                <tr>
                  <th>Endpoint</th>
                  <th>Edition ID</th>
                  <th>Title ID</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Create Date</th>
                </tr>
              </thead>

              <tbody>

                {brokenLinks.map((brokenLink, index) => {

                  // console.log(componentName, GetDateTime(), "map brokenLink", brokenLink);

                  return (
                    <tr key={index}>
                      <td>{brokenLink.endpoint}</td>
                      <td>{brokenLink.editionID}</td>
                      <td>{brokenLink.titleID}</td>
                      <td>{brokenLink.titleName}</td>
                      <td>{brokenLink.imageName}</td>
                      {IsEmpty(brokenLink.createDate) === false ? <td>{brokenLink.createDate.slice(0, 19).replace("T", " ")}</td> : <td>{brokenLink.createDate}</td>}
                    </tr>
                  );
                })}


              </tbody>

            </Table>

            : <p>There are no broken links.</p>}

        </Col>
      </Row>

      <Row>
        <Col xs="12">

          <h3>Computer Logs</h3>

          {IsEmpty(computerLogs) === false ?

            <Table responsive>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>href</th>
                  <th>IP Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Postal Code</th>
                  <th>Country</th>
                  <th>Continent</th>
                  <th>Last Accessed</th>
                </tr>
              </thead>

              <tbody>

                {computerLogs.map((computerLog, index) => {

                  // console.log(componentName, GetDateTime(), "map computerLog", computerLog);

                  return (
                    <tr key={index}>
                      <td>{computerLog.title}</td>
                      <td>{computerLog.href}</td>
                      <td>{computerLog.ipAddress}</td>
                      <td>{computerLog.city}</td>
                      <td>{computerLog.state}</td>
                      <td>{computerLog.postal}</td>
                      <td>{computerLog.countryName}</td>
                      <td>{computerLog.continentName}</td>
                      {IsEmpty(computerLog.lastAccessed) === false ? <td>{computerLog.lastAccessed.slice(0, 19).replace("T", " ")}</td> : <td>{computerLog.lastAccessed}</td>}
                    </tr>
                  );
                })}


              </tbody>

            </Table>

            : <p>There are no computer logs.</p>}

        </Col>
      </Row>

    </Container>
  );
};

export default Reports;
