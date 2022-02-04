import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, InputGroup, InputGroupText, Label, Input, Alert, Button, NavItem, NavbarText, NavLink } from "reactstrap";
import applicationSettings from "../../app/environment";
import { emailRegExp } from "../../app/constants";
import { isEmpty, displayValue, getDateTime, formatTrim } from "../../utilities/SharedFunctions";
import { addErrorLog } from "../../utilities/ApplicationFunctions";
import { loadUserData, setSessionToken, loadArrayChecklist } from "../../app/userSlice";

const Login = (props) => {

  const componentName = "Login.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;
  // console.log(componentName, getDateTime(), "baseURL", baseURL);

  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

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

    if (isEmpty(newToken) === false) {

      localStorage.setItem("token", newToken);
      // console.log(componentName, getDateTime(), "updateToken newToken", newToken);
      // console.log(componentName, getDateTime(), "updateToken state.sessionToken", state.sessionToken); // Never shows the current value of sessionToken
      // console.log(componentName, getDateTime(), "updateToken User token changed.");

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

    if (isEmpty(txtEmail) === false) {

      if (formatTrim(txtEmail).match(emailRegExp) && formatTrim(txtEmail).length > 0) {

        // if (formatTrim(txtEmail).match(emailFormat) && formatTrim(txtEmail).length > 0) {
        emailValidated = true;
        setErrEmail("");
        // console.log(componentName, getDateTime(), "logIn Valid Email Address");
        // console.log(componentName, getDateTime(), "logIn emailValidated true", emailValidated);

      } else {

        emailValidated = false;
        setErrEmail("Please enter a valid email address.");
        // console.log(componentName, getDateTime(), "logIn Invalid Email Address");
        // console.log(componentName, getDateTime(), "logIn emailValidated false", emailValidated);

      };

    };

    if (isEmpty(txtPassword) === false) {

      if (formatTrim(txtPassword).length > 4) {

        passwordValidated = true;
        setErrPassword("");
        // console.log(componentName, getDateTime(), "logIn Valid Password");
        // console.log(componentName, getDateTime(), "logIn passwordValidated true", passwordValidated);

      } else {

        passwordValidated = false;
        setErrPassword("Password must be at least 5 characters.");
        // console.log(componentName, getDateTime(), "logIn Invalid Password");
        // console.log(componentName, getDateTime(), "logIn passwordValidated false", passwordValidated);

      };

    };

    if (emailValidated === true && passwordValidated === true) {

      formValidated = true;
      // console.log(componentName, getDateTime(), "logIn Valid Form");
      // console.log(componentName, getDateTime(), "logIn formValidated true", formValidated);

    } else {

      formValidated = false;
      // console.log(componentName, getDateTime(), "logIn Invalid Form");
      // console.log(componentName, getDateTime(), "logIn formValidated false", formValidated);

    };

    // console.log(componentName, getDateTime(), "logIn emailValidated", emailValidated);
    // console.log(componentName, getDateTime(), "logIn passwordValidated", passwordValidated);
    // console.log(componentName, getDateTime(), "logIn formValidated", formValidated);

    if (formValidated === true) {

      if (isEmpty(txtEmail) === false && isEmpty(txtPassword) === false) {

        let recordObject = {
          email: formatTrim(txtEmail),
          password: formatTrim(txtPassword)
        };

        // console.log(componentName, getDateTime(), "logIn recordObject", recordObject);

        let url = baseURL + "users/login/";
        // console.log(componentName, getDateTime(), "logIn url", url);

        fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({ user: recordObject })
        })
          .then(response => {
            // console.log(componentName, getDateTime(), "logIn response", response);

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
            // console.log(componentName, getDateTime(), "logIn results", results);

            // if (results !== 500 && results !== 401) {

            // setUserResultsFound(results.transactionSuccess);
            addMessage(results.message);

            if (isEmpty(results) === false && results.transactionSuccess === true) {

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

              setUserResultsFound(results.transactionSuccess);

            } else {

              addErrorMessage(results.error);

            };

            // } else {

            //     // console.log("Login.js error", json);
            //     addErrorMessage(Login failed.");

            // };

          })
          .catch((error) => {
            console.error(componentName, getDateTime(), "logIn error", error);
            // console.error(componentName, getDateTime(), "logIn error.name", error.name);
            // console.error(componentName, getDateTime(), "logIn error.message", error.message);

            addErrorMessage(error.name + ": " + error.message);

            // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  const getChecklist = (token) => {
    // console.log(componentName, getDateTime(), "getChecklist baseURL", baseURL);

    setChecklistMessage("");
    setErrChecklistMessage("");
    setChecklistResultsFound(null);

    let url = baseURL + "titles/checklist";

    if (isEmpty(token) === false) {

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": token
        }),
      })
        .then(response => {
          // console.log(componentName, getDateTime(), "getChecklist response", response);

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
          // console.log(componentName, getDateTime(), "getChecklist results", results);

          setChecklistResultsFound(results.transactionSuccess);
          // setChecklistMessage(results.message);

          if (isEmpty(results) === false && results.transactionSuccess === true) {

            dispatch(loadArrayChecklist(results.records));

          } else {

            console.log(componentName, getDateTime(), "getChecklist error", results.message);
            addErrorMessage(results.message);

          };

        })
        .catch((error) => {
          console.error(componentName, getDateTime(), "getChecklist error", error);
          // console.error(componentName, getDateTime(), "getChecklist error.name", error.name);
          // console.error(componentName, getDateTime(), "getChecklist error.message", error.message);

          // addErrorMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect userResultsFound", userResultsFound);

    if (isEmpty(userResultsFound) === false) {

      clearMessages();
      setErrEmail("");
      setErrPassword("");
      setUserResultsFound(null);
      setModal(!modal);

    };

  }, [userResultsFound]);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect sessionToken", sessionToken);

    if (isEmpty(sessionToken) === false) {

      clearMessages();
      setErrEmail("");
      setErrPassword("");
      setModal(!modal);

    };

  }, [sessionToken]);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect process.env.NODE_ENV", process.env.NODE_ENV);

    if (process.env.NODE_ENV === "development") {

      setTxtEmail(process.env.REACT_APP_EMAIL_DEFAULT);
      setTxtPassword(process.env.REACT_APP_PASSWORD_DEFAULT);

    };

  }, []);


  return (
    <React.Fragment>

      {/* {applicationAllowUserInteractions === true && isEmpty(sessionToken) === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Login</Button></span> : null} */}

      {applicationAllowUserInteractions === true && isEmpty(sessionToken) === true ?

        <React.Fragment>
          {/* <NavItem> */}
          {/* <NavItem className="mx-3 my-2">
            <a href="#" onClick={(event) => { setModal(!modal); }}><NavbarText>Login</NavbarText></a> */}
          <NavLink onClick={(event) => { setModal(!modal); }}><NavbarText>Login</NavbarText></NavLink>
          {/* </NavItem> */}
        </React.Fragment>

        : null}

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
              <Input id="txtEmail" label="Email Address" value={txtEmail} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtEmail(event.target.value); }} />
              {errEmail !== "" ? <Alert color="danger">{errEmail}</Alert> : null}
            </FormGroup>

            <FormGroup>
              <Label for="txtPassword">Password</Label>
              <InputGroup>
                <Input type={showPassword} /*type="password"*/ id="txtPassword" value={txtPassword} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtPassword(event.target.value); }} />
                <InputGroupText><i className="fas fa-eye" onMouseOver={(event) => { setShowPassword("text"); }} onMouseOut={(event) => { setShowPassword("password"); }}></i></InputGroupText>
                {/* <InputGroupText><i className="fas fa-eye-slash"></i></InputGroupText> */}
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
