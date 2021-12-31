import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Table, } from "reactstrap";
import applicationSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../utilities/SharedFunctions";
import { LogError } from "../../utilities/ApplicationFunctions";

const Errors = () => {

  const componentName = "Errors.js";

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

  const [errors, setErrors] = useState([]);


  const getErrors = () => {

    clearMessages();

    let url = baseURL + "errors/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": sessionToken
      }),
    })
      .then(response => {
        // console.log(componentName, GetDateTime(), "getErrors response", response);

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getNews results", results);

        if (IsEmpty(results) === false && results.transactionSuccess === true) {

          setErrors(results.records);

        };

      })
      .catch((error) => {
        // console.error(componentName, GetDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

    getErrors();

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

          <h5 className="text-center">Errors</h5>

          {IsEmpty(errors) === false ?

            <Table responsive>
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Component Name</th>
                  <th>Transaction Data</th>
                  <th>Error Data</th>
                  <th>Create Date</th>
                </tr>
              </thead>

              <tbody>

                {errors.map((error, index) => {

                  // console.log(componentName, GetDateTime(), "map error", error);

                  return (
                    <tr key={index}>
                      <td>{error.operation}</td>
                      <td>{error.componentName}</td>
                      <td>{error.transactionData}</td>
                      <td>{error.errorData}</td>
                      {IsEmpty(error.createDate) === false ? <td>{error.createDate.slice(0, 19).replace("T", " ")}</td> : <td>{error.createDate}</td>}
                    </tr>
                  );
                })}


              </tbody>

            </Table>

            : <p>There are no errors.</p>}

        </Col>
      </Row>

    </Container>
  );
};

export default Errors;
