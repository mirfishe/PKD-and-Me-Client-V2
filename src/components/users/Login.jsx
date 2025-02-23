import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, InputGroup, InputGroupText, Label, Input, Alert, Button, NavItem, NavbarText, NavLink } from "reactstrap";
import { emailRegExp } from "../../app/constants";
import { noFunctionAvailable, isEmpty, getDateTime, formatTrim, addErrorLog } from "shared-functions";
import { loadUserData, setSessionToken, loadArrayChecklist } from "../../app/userSlice";

const Login = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: -- 10/21/2022 MF
  // * Functions: getChecklist -- 10/21/2022 MF

  const componentName = "Login";

  const dispatch = useDispatch();

  const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

  const sessionToken = useSelector(state => state.user.sessionToken);
  // const admin = useSelector(state => state.user.admin);

  let getChecklist = isEmpty(props) === false && isEmpty(props.getChecklist) === false ? props.getChecklist : noFunctionAvailable;

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

  const [txtEmail, setTxtEmail] = useState(""); // import.meta.env.REACT_APP_EMAIL_DEFAULT
  const [txtPassword, setTxtPassword] = useState(""); // import.meta.env.REACT_APP_PASSWORD_DEFAULT
  const [showPassword, setShowPassword] = useState("password");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");


  useEffect(() => {

    if (isEmpty(userResultsFound) === false) {

      clearMessages();

      setErrEmail("");
      setErrPassword("");

      setUserResultsFound(null);

      setModal(!modal);

    };

  }, [userResultsFound]);


  useEffect(() => {

    if (isEmpty(sessionToken) === false) {

      clearMessages();

      setErrEmail("");
      setErrPassword("");

      setModal(!modal);

    };

  }, [sessionToken]);


  useEffect(() => {

    if (import.meta.env.MODE === "development") {

      setTxtEmail(import.meta.env.REACT_APP_EMAIL_DEFAULT);
      setTxtPassword(import.meta.env.REACT_APP_PASSWORD_DEFAULT);

    };

  }, []);


  const updateToken = (newToken) => {

    if (isEmpty(newToken) === false) {

      localStorage.setItem("token", newToken);

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

      } else {

        emailValidated = false;
        setErrEmail("Please enter a valid email address.");

      };

    };

    if (isEmpty(txtPassword) === false) {

      if (formatTrim(txtPassword).length > 4) {

        passwordValidated = true;
        setErrPassword("");

      } else {

        passwordValidated = false;
        setErrPassword("Password must be at least 5 characters.");

      };

    };

    if (emailValidated === true && passwordValidated === true) {

      formValidated = true;

    } else {

      formValidated = false;

    };

    if (formValidated === true) {

      if (isEmpty(txtEmail) === false && isEmpty(txtPassword) === false) {

        let recordObject = {
          email: formatTrim(txtEmail),
          password: formatTrim(txtPassword)
        };


        let url = baseURL + "users/login/";

        fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({ recordObject: recordObject })
        })
          .then(results => {

            // if (results.ok !== true) {

            //     throw Error(results.status + " " + results.statusText + " " + results.url);

            // } else {

            // if (results.status === 200) {

            return results.json();

            // } else {

            //     return results.status;

            // };

            // };

          })
          .then(results => {

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

            // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  return (
    <React.Fragment>

      {/* {applicationAllowUserInteractions === true && isEmpty(sessionToken) === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Login</Button></span> : null} */}

      {applicationAllowUserInteractions === true && isEmpty(sessionToken) === true ?

        <React.Fragment>
          {/* <NavItem> */}
          {/* <NavItem className="mx-3 my-2">
            <a href="#" onClick={(event) => { setModal(!modal); }}><NavbarText>Login</NavbarText></a> */ }
          <NavLink className="nav_link" onClick={(event) => { setModal(!modal); }}><NavbarText>Login</NavbarText></NavLink>
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
              <Input id="txtEmail" label="Email Address" autoFocus value={txtEmail} onChange={(event) => { setTxtEmail(event.target.value); }} />
              {isEmpty(errEmail) === false ? <Alert color="danger">{errEmail}</Alert> : null}
            </FormGroup>

            <FormGroup>
              <Label for="txtPassword">Password</Label>
              <InputGroup>
                <Input type={showPassword} id="txtPassword" value={txtPassword} onChange={(event) => { setTxtPassword(event.target.value); }} />
                <InputGroupText><i className="fas fa-eye" onMouseOver={(event) => { setShowPassword("text"); }} onMouseOut={(event) => { setShowPassword("password"); }}></i></InputGroupText>
                {/* <InputGroupText><i className="fas fa-eye-slash"></i></InputGroupText> */}
              </InputGroup>
              {isEmpty(errPassword) === false ? <Alert color="danger">{errPassword}</Alert> : null}
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
