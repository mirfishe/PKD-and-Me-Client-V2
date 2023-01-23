import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Table, } from "reactstrap";
import { isEmpty, getDateTime, isNonEmptyArray, addErrorLog } from "shared-functions";

const Logs = () => {

  const componentName = "Logs";

  const navigate = useNavigate();

  const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const siteName = useSelector(state => state.applicationSettings.siteName);
  const applicationName = useSelector(state => state.applicationSettings.applicationName);

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [logs, setLogs] = useState([]);

  document.title = "Logs | " + applicationName + " | " + siteName;


  useEffect(() => {

    getLogs();

  }, []);


  useEffect(() => {

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);



  const getLogs = () => {

    clearMessages();

    let url = baseURL + "logs/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": sessionToken
      }),
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

          setLogs(results.records);

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

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      <Row>
        <Col xs="12">

          <h5 className="text-center">Logs</h5>

          {isNonEmptyArray(logs) === true ?

            <Table responsive>
              <thead>
                <tr>
                  <th>Create Date</th>
                  <th>Operation</th>
                  <th>Component Name</th>
                  <th>Transaction Data</th>
                </tr>
              </thead>

              <tbody>

                {logs.map((log, index) => {


                  return (
                    <tr key={index}>
                      {isEmpty(log.createDate) === false ? <td>{log.createDate.slice(0, 19).replace("T", " ")}</td> : <td>{log.createDate}</td>}
                      <td>{log.operation}</td>
                      <td>{log.componentName}</td>
                      <td>{log.transactionData}</td>
                    </tr>
                  );
                })}


              </tbody>

            </Table>

            : <p>There are no logs.</p>}

        </Col>
      </Row>

    </Container>
  );
};

export default Logs;
