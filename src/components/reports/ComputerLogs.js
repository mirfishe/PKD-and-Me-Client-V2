import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Table, } from "reactstrap";
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime } from "../../utilities/SharedFunctions";
import { LogError } from "../../utilities/ApplicationFunctions";

const ComputerLogs = () => {

  const componentName = "ComputerLogs.js";

  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, getDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, getDateTime(), "admin", admin);

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

  const [computerLogs, setComputerLogs] = useState([]);


  const getComputerLogs = () => {

    clearMessages();

    let url = baseURL + "computerLogs/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": sessionToken
      }),
    })
      .then(response => {
        // console.log(componentName, getDateTime(), "getComputerLogs response", response);

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, getDateTime(), "getNews results", results);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          setComputerLogs(results.records);

        };

      })
      .catch((error) => {
        // console.error(componentName, getDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

    getComputerLogs();

  }, []);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect check for admin", admin);

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

          <h5 className="text-center">Computer Logs</h5>

          {isEmpty(computerLogs) === false ?

            <Table responsive>
              <thead>
                <tr>
                  <th>Last Accessed</th>
                  <th>Title</th>
                  <th>href</th>
                  <th>IP Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Postal Code</th>
                  <th>Country</th>
                  <th>Continent</th>
                </tr>
              </thead>

              <tbody>

                {computerLogs.map((computerLog, index) => {

                  // console.log(componentName, getDateTime(), "map computerLog", computerLog);

                  return (
                    <tr key={index}>
                      {isEmpty(computerLog.lastAccessed) === false ? <td>{computerLog.lastAccessed.slice(0, 19).replace("T", " ")}</td> : <td>{computerLog.lastAccessed}</td>}
                      <td>{computerLog.title}</td>
                      <td>{computerLog.href}</td>
                      <td>{computerLog.ipAddress}</td>
                      <td>{computerLog.city}</td>
                      <td>{computerLog.state}</td>
                      <td>{computerLog.postal}</td>
                      <td>{computerLog.countryName}</td>
                      <td>{computerLog.continentName}</td>
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

export default ComputerLogs;
