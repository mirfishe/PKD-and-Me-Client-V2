import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Table, } from "reactstrap";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";
// import { addErrorLog } from "../../utilities/ApplicationFunctions";

const Logs = () => {

  const componentName = "Logs";

  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

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
      .then(response => {

        if (response.ok !== true) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

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

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

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
