import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Label, Input, Alert, Button } from "reactstrap";
import AppSettings from "../../app/environment";
import { emailRegExp } from "../../app/constants";
import { IsEmpty, DisplayValue, GetDateTime, FormatTrim } from "../../utilities/SharedFunctions";
import { LogError } from "../../utilities/AppFunctions";
import { loadUserData, setSessionToken, loadArrayChecklist } from "../../app/userSlice";

const Login = (props) => {

  const componentName = "Login.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

  // const [user, setUser] = useState({});
  // const [userID, setUserID] = useState(null);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [updatedBy, setUpdatedBy] = useState(null);
  // const [admin, setAdmin] = useState(false);
  // const [active, setActive] = useState(false);
  // const [sessionToken, setSessionToken] = useState(null);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [modal, setModal] = useState(false);
  const [userResultsFound, setUserResultsFound] = useState(null);

  const [checklistMessage, setChecklistMessage] = useState("");
  const [errChecklistMessage, setErrChecklistMessage] = useState("");
  const [checklistResultsFound, setChecklistResultsFound] = useState(null);

  const [txtEmail, setTxtEmail] = useState(""); // process.env.REACT_APP_EMAIL_DEFAULT
  const [txtPassword, setTxtPassword] = useState(""); // process.env.REACT_APP_PASSWORD_DEFAULT
  const [showPassword, setShowPassword] = useState("password");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");


  const updateToken = (newToken) => {

    if (IsEmpty(newToken) === false) {

      localStorage.setItem("token", newToken);
      // console.log(componentName, GetDateTime(), "updateToken newToken", newToken);
      // console.log(componentName, GetDateTime(), "updateToken state.sessionToken", state.sessionToken); // Never shows the current value of sessionToken
      // console.log(componentName, GetDateTime(), "updateToken User token changed.");

    };

  };


  const logIn = () => {

    clearMessages();
    setErrEmail("");
    setErrPassword("");
    // setUser({});
    // setUserID(null);
    // setFirstName("");
    // setLastName("");
    // setEmail("");
    // setUpdatedBy(null);
    // setAdmin(false);
    // setActive(false);
    // setSessionToken("");

    let emailValidated = false;
    let passwordValidated = false;
    let formValidated = false;

    if (IsEmpty(txtEmail) === false) {

      if (FormatTrim(txtEmail).match(emailRegExp) && FormatTrim(txtEmail).length > 0) {

        // if (FormatTrim(txtEmail).match(emailFormat) && FormatTrim(txtEmail).length > 0) {
        emailValidated = true;
        setErrEmail("");
        // console.log(componentName, GetDateTime(), "logIn Valid Email Address");
        // console.log(componentName, GetDateTime(), "logIn emailValidated true", emailValidated);

      } else {

        emailValidated = false;
        setErrEmail("Please enter a valid email address.");
        // console.log(componentName, GetDateTime(), "logIn Invalid Email Address");
        // console.log(componentName, GetDateTime(), "logIn emailValidated false", emailValidated);
      };

    };

    if (IsEmpty(txtPassword) === false) {

      if (FormatTrim(txtPassword).length > 4) {

        passwordValidated = true;
        setErrPassword("");
        // console.log(componentName, GetDateTime(), "logIn Valid Password");
        // console.log(componentName, GetDateTime(), "logIn passwordValidated true", passwordValidated);

      } else {

        passwordValidated = false;
        setErrPassword("Password must be at least 5 characters.");
        // console.log(componentName, GetDateTime(), "logIn Invalid Password");
        // console.log(componentName, GetDateTime(), "logIn passwordValidated false", passwordValidated);

      };

    };

    if (emailValidated === true && passwordValidated === true) {

      formValidated = true;
      // console.log(componentName, GetDateTime(), "logIn Valid Form");
      // console.log(componentName, GetDateTime(), "logIn formValidated true", formValidated);

    } else {

      formValidated = false;
      // console.log(componentName, GetDateTime(), "logIn Invalid Form");
      // console.log(componentName, GetDateTime(), "logIn formValidated false", formValidated);

    };

    // console.log(componentName, GetDateTime(), "logIn emailValidated", emailValidated);
    // console.log(componentName, GetDateTime(), "logIn passwordValidated", passwordValidated);
    // console.log(componentName, GetDateTime(), "logIn formValidated", formValidated);

    if (formValidated === true) {

      if (IsEmpty(txtEmail) === false && IsEmpty(txtPassword) === false) {

        let recordObject = {
          email: FormatTrim(txtEmail),
          password: FormatTrim(txtPassword)
        };

        // console.log(componentName, GetDateTime(), "logIn recordObject", recordObject);

        let url = baseURL + "users/login/";
        // console.log(componentName, GetDateTime(), "logIn url", url);

        fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({ user: recordObject })
        })
          .then(response => {
            // console.log(componentName, GetDateTime(), "logIn response", response);

            // if (!response.ok) {

            //     throw Error(response.status + " " + response.statusText + " " + response.url);

            // } else {

            // if (response.status === 200) {

            return response.json();

            // } else {

            //     return response.status;

            // };

            // };

          })
          .then(results => {
            // console.log(componentName, GetDateTime(), "logIn results", results);

            // if (results !== 500 && results !== 401) {

            // setUserResultsFound(results.resultsFound);
            addMessage(results.message);

            if (IsEmpty(results) === false && results.resultsFound === true) {

              // setUser(results);
              // setUserID(results.userID);
              // setFirstName(results.firstName);
              // setLastName(results.lastName);
              // setEmail(results.email);
              // setUpdatedBy(results.updatedBy);
              // setAdmin(results.admin);
              // setActive(results.active);
              // setSessionToken(results.sessionToken);

              dispatch(loadUserData(results));
              dispatch(setSessionToken(results.sessionToken));
              updateToken(results.sessionToken);

              getChecklist(results.sessionToken);

              setUserResultsFound(results.resultsFound);

            } else {

              addErrorMessage(results.error);

            };

            // } else {

            //     // console.log("Login.js error", json);
            //     addErrorMessage(Login failed.");

            // };

          })
          .catch((error) => {
            console.error(componentName, GetDateTime(), "logIn error", error);
            // console.error(componentName, GetDateTime(), "logIn error.name", error.name);
            // console.error(componentName, GetDateTime(), "logIn error.message", error.message);

            addErrorMessage(error.name + ": " + error.message);

            // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  const getChecklist = (token) => {
    // console.log(componentName, GetDateTime(), "getChecklist baseURL", baseURL);

    setChecklistMessage("");
    setErrChecklistMessage("");
    setChecklistResultsFound(null);

    let url = baseURL + "titles/checklist";

    if (IsEmpty(token) === false) {

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": token
        }),
      })
        .then(response => {
          // console.log(componentName, GetDateTime(), "getChecklist response", response);

          // if (!response.ok) {

          //     throw Error(response.status + " " + response.statusText + " " + response.url);

          // } else {

          // if (response.status === 200) {

          return response.json();

          // } else {

          //     return response.status;

          // };

          // };

        })
        .then(results => {
          // console.log(componentName, GetDateTime(), "getChecklist results", results);

          setChecklistResultsFound(results.resultsFound);
          // setChecklistMessage(results.message);

          if (IsEmpty(results) === false && results.resultsFound === true) {

            dispatch(loadArrayChecklist(results.records));

          } else {

            console.log(componentName, GetDateTime(), "getChecklist resultsFound error", results.message);
            addErrorMessage(results.message);

          };

        })
        .catch((error) => {
          console.error(componentName, GetDateTime(), "getChecklist error", error);
          // console.error(componentName, GetDateTime(), "getChecklist error.name", error.name);
          // console.error(componentName, GetDateTime(), "getChecklist error.message", error.message);

          // addErrorMessage(error.name + ": " + error.message);

          // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect userResultsFound", userResultsFound);

    if (IsEmpty(userResultsFound) === false) {

      clearMessages();
      setErrEmail("");
      setErrPassword("");
      setUserResultsFound(null);
      // setModal(false);
      setModal(!modal);

    };

  }, [userResultsFound]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect sessionToken", sessionToken);

    if (IsEmpty(sessionToken) === false) {

      clearMessages();
      setErrEmail("");
      setErrPassword("");
      // setModal(false);
      setModal(!modal);

    };

  }, [sessionToken]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect process.env.NODE_ENV", process.env.NODE_ENV);

    if (process.env.NODE_ENV === "development") {

      setTxtEmail(process.env.REACT_APP_EMAIL_DEFAULT);
      setTxtPassword(process.env.REACT_APP_PASSWORD_DEFAULT);

    };

  }, []);


  return (
    <React.Fragment>

      {appAllowUserInteractions === true && IsEmpty(sessionToken) === true ? <Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Login</Button> : null}

      <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="md">
        <ModalHeader toggle={(event) => { setModal(!modal); }}>Login</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup className="text-center">

              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

            </FormGroup>

            <FormGroup>
              <Label for="txtEmail">Email Address</Label>
              <Input id="txtEmail" label="Email Address" value={txtEmail} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtEmail(event.target.value); }} />
              {errEmail !== "" ? <Alert color="danger">{errEmail}</Alert> : null}
            </FormGroup>

            <FormGroup>
              <Label for="txtPassword">Password</Label>
              <InputGroup>
                <Input type={showPassword} /*type="password"*/ id="txtPassword" value={txtPassword} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtPassword(event.target.value); }} />
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fas fa-eye" onMouseOver={(event) => { setShowPassword("text"); }} onMouseOut={(event) => { setShowPassword("password"); }}></i></InputGroupText>
                  {/* <InputGroupText><i className="fas fa-eye-slash"></i></InputGroupText> */}
                </InputGroupAddon>
              </InputGroup>
              {errPassword !== "" ? <Alert color="danger">{errPassword}</Alert> : null}
            </FormGroup>

            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={logIn}>Log In</Button>
              <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button>
            </ModalFooter>

          </Form>
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
};

export default Login;
