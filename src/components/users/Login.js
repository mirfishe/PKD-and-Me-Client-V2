import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import AppSettings from "../../app/environment";
import { emailRegExp } from "../../app/constants";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";
import { loadUserData, setSessionToken, loadArrayChecklist } from "../../app/userSlice";

const Login = (props) => {

  const componentName = "Login.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
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
    // console.log(componentName, GetDateTime(), "logIn");

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
      if (txtEmail.trim().match(emailRegExp) && txtEmail.trim().length > 0) {
        // if (txtEmail.trim().match(emailFormat) && txtEmail.trim().length > 0) {
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
      if (txtPassword.trim().length > 4) {
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
        let userObject = {
          email: txtEmail.trim(),
          password: txtPassword.trim()
        };
        // console.log(componentName, GetDateTime(), "logIn userObject", userObject);

        let url = baseURL + "users/login/";
        // console.log(componentName, GetDateTime(), "logIn url", url);

        fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({ user: userObject })
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
          .then(data => {
            // console.log(componentName, GetDateTime(), "logIn data", data);

            // if (data !== 500 && data !== 401) {

            // setUserResultsFound(data.resultsFound);
            addMessage(data.message);

            if (data.resultsFound === true) {
              // setUser(data);
              // setUserID(data.userID);
              // setFirstName(data.firstName);
              // setLastName(data.lastName);
              // setEmail(data.email);
              // setUpdatedBy(data.updatedBy);
              // setAdmin(data.admin);
              // setActive(data.active);
              // setSessionToken(data.sessionToken);

              dispatch(loadUserData(data));
              dispatch(setSessionToken(data.sessionToken));
              updateToken(data.sessionToken);

              getChecklist(data.sessionToken);

              setUserResultsFound(data.resultsFound);

            } else {
              addErrorMessage(data.error);
            };
            // } else {
            //     // console.log("Login.js error", json);
            //     addErrorMessage(Login failed.");
            // };

          })
          .catch(error => {
            console.log(componentName, GetDateTime(), "logIn error", error);
            // console.log(componentName, GetDateTime(), "logIn error.name", error.name);
            // console.log(componentName, GetDateTime(), "logIn error.message", error.message);
            addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

  };


  const getChecklist = (token) => {
    // console.log(componentName, GetDateTime(), "getChecklist");
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
        .then(data => {
          // console.log(componentName, GetDateTime(), "getChecklist data", data);

          setChecklistResultsFound(data.resultsFound);
          // setChecklistMessage(data.message);

          if (data.resultsFound === true) {

            dispatch(loadArrayChecklist(data.records));

          } else {
            console.log(componentName, GetDateTime(), "getChecklist resultsFound error", data.message);
            addErrorMessage(data.message);
          };

        })
        .catch(error => {
          console.log(componentName, GetDateTime(), "getChecklist error", error);
          // console.log(componentName, GetDateTime(), "getChecklist error.name", error.name);
          // console.log(componentName, GetDateTime(), "getChecklist error.message", error.message);
          // addErrorMessage(error.name + ": " + error.message);
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
      toggle();
    };

  }, [userResultsFound]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect sessionToken", sessionToken);
    if (IsEmpty(sessionToken) === false) {
      clearMessages();
      setErrEmail("");
      setErrPassword("");
      // setModal(false);
      toggle();
    };

  }, [sessionToken]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect process.env.NODE_ENV", process.env.NODE_ENV);

    if (process.env.NODE_ENV === "development") {

      setTxtEmail(process.env.REACT_APP_EMAIL_DEFAULT);
      setTxtPassword(process.env.REACT_APP_PASSWORD_DEFAULT);

    };

  }, []);


  const toggle = () => {
    setModal(!modal);
  };


  return (
    <React.Fragment>
      {appAllowUserInteractions === true && IsEmpty(sessionToken) === true ? <Button outline className="my-2" size="sm" color="info" onClick={toggle}>Login</Button> : null}
      <Modal isOpen={modal} toggle={toggle} size="md">
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>
            <FormGroup>

              <Label for="txtEmail">Email Address</Label>
              <Input id="txtEmail" label="Email Address" value={txtEmail} onChange={(event) => {/*console.log(event.target.value);*/ setTxtEmail(event.target.value); }} />
              {errEmail !== "" ? <Alert color="danger">{errEmail}</Alert> : null}

            </FormGroup>
            <FormGroup>

              <Label for="txtPassword">Password</Label>
              <Input type="password" id="txtPassword" value={txtPassword} onChange={(event) => {/*console.log(event.target.value);*/ setTxtPassword(event.target.value); }} />
              {errPassword !== "" ? <Alert color="danger">{errPassword}</Alert> : null}

            </FormGroup>

            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={logIn}>Log In</Button>
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default Login;
