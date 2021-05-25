import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import AppSettings from "../../app/environment";
import { emailRegExp } from "../../app/constants";
import { loadUserData, setSessionToken, loadArrayChecklist } from "../../app/userSlice";

const Register = (props) => {

  // ? What if the user has deleted their account and wants to reupdateUser?
  // * The database won't allow duplicate email addresses to be entered.

  const componentName = "Register.js";

  const dispatch = useDispatch();

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, "baseURL", baseURL);

  const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

  // const [user, setUser] = useState(null);
  // const [userID, setUserID] = useState(null);
  // const [firstName, setFirstName] = useState(null);
  // const [lastName, setLastName] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [updatedBy, setUpdatedBy] = useState(null);
  // const [admin, setAdmin] = useState(null);
  // const [active, setActive] = useState(null);
  // const [sessionToken, setSessionToken] = useState(null);
  const sessionToken = useSelector(state => state.user.sessionToken);

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
  const [userRecordAdded, setUserRecordAdded] = useState(null);

  const [checklistMessage, setChecklistMessage] = useState("");
  const [errChecklistMessage, setErrChecklistMessage] = useState("");
  const [checklistResultsFound, setChecklistResultsFound] = useState(null);

  const [txtFirstName, setTxtFirstName] = useState(""); // process.env.REACT_APP_FIRSTNAME_DEFAULT
  const [txtLastName, setTxtLastName] = useState(""); // process.env.REACT_APP_LASTNAME_DEFAULT
  const [txtEmail, setTxtEmail] = useState(""); // process.env.REACT_APP_EMAIL_DEFAULT
  const [txtPassword, setTxtPassword] = useState(""); // process.env.REACT_APP_PASSWORD_DEFAULT

  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");


  const updateToken = (newToken) => {
    if (newToken !== undefined && newToken !== null && newToken !== "") {
      localStorage.setItem("token", newToken);
      // console.log(componentName, "updateToken newToken", newToken);
      // console.log(componentName, "updateToken state.sessionToken", state.sessionToken); // Never shows the current value of sessionToken
      // console.log(componentName, "updateToken User token changed.");
    };
  };


  const register = () => {
    // console.log(componentName, "register");

    clearMessages();
    setErrFirstName("");
    setErrLastName("");
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

    let firstNameValidated = false;
    let lastNameValidated = false;
    let emailValidated = false;
    let passwordValidated = false;
    let formValidated = false;

    if (txtFirstName !== undefined && txtFirstName !== null) {
      if (txtFirstName.trim().length > 0) {
        firstNameValidated = true;
        setErrFirstName("");
        // console.log(componentName, "register Valid First Name");
        // console.log(componentName, "register firstNameValidated true", firstNameValidated);
      } else {
        firstNameValidated = false;
        setErrFirstName("Please enter a first name.");
        // console.log(componentName, "register Invalid First Name");
        // console.log(componentName, "register firstNameValidated false", firstNameValidated);
      };
    };

    if (txtLastName !== undefined && txtLastName !== null) {
      if (txtLastName.trim().length > 0) {
        lastNameValidated = true;
        setErrLastName("");
        // console.log(componentName, "register Valid Last Name");
        // console.log(componentName, "register lastNameValidated true", lastNameValidated);
      } else {
        lastNameValidated = false;
        setErrLastName("Please enter a last name.");
        // console.log(componentName, "register Invalid Last Name");
        // console.log(componentName, "register lastNameValidated false", lastNameValidated);
      };
    };

    if (txtEmail !== undefined && txtEmail !== null) {
      if (txtEmail.trim().match(emailRegExp) && txtEmail.trim().length > 0) {
        // if (txtEmail.trim().match(emailFormat) && txtEmail.trim().length > 0) {
        emailValidated = true;
        setErrEmail("");
        // console.log(componentName, "register Valid Email Address");
        // console.log(componentName, "register emailValidated true", emailValidated);
      } else {
        emailValidated = false;
        setErrEmail("Please enter a valid email address.");
        // console.log(componentName, "register Invalid Email Address");
        // console.log(componentName, "register emailValidated false", emailValidated);
      };
    };

    if (txtPassword !== undefined && txtPassword !== null) {
      if (txtPassword.trim().length > 4) {
        passwordValidated = true;
        setErrPassword("");
        // console.log(componentName, "register Valid Password");
        // console.log(componentName, "register passwordValidated true", passwordValidated);
      } else {
        passwordValidated = false;
        setErrPassword("Password must be at least 5 characters.");
        // console.log(componentName, "register Invalid Password");
        // console.log(componentName, "register passwordValidated false", passwordValidated);
      };
    };

    if (firstNameValidated === true && lastNameValidated === true && emailValidated === true && passwordValidated === true) {
      formValidated = true;
      // console.log(componentName, "register Valid Form");
      // console.log(componentName, "register formValidated true", formValidated);
    } else {
      formValidated = false;
      // console.log(componentName, "register Invalid Form");
      // console.log(componentName, "register formValidated false", formValidated);
    };

    // console.log(componentName, "register firstNameValidated", firstNameValidated);
    // console.log(componentName, "register lastNameValidated", lastNameValidated);
    // console.log(componentName, "register emailValidated", emailValidated);
    // console.log(componentName, "register passwordValidated", passwordValidated);
    // console.log(componentName, "register formValidated", formValidated);

    if (formValidated === true) {

      if (txtFirstName !== undefined && txtFirstName !== null && txtLastName !== undefined && txtLastName !== null && txtEmail !== undefined && txtEmail !== null && txtPassword !== undefined && txtPassword !== null) {
        let userObject = {
          firstName: txtFirstName.trim(),
          lastName: txtLastName.trim(),
          email: txtEmail.trim(),
          password: txtPassword.trim()
        };
        // console.log(componentName, "register userObject", userObject);

        let url = baseURL + "user/register/";
        // console.log(componentName, "register url", url);

        fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({ user: userObject })
        })
          .then(response => {
            // console.log(componentName, "register response", response);
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
            console.log(componentName, "register data", data);

            // if (data !== 500 && data !== 401) {

            // setUserRecordAdded(data.recordAdded);
            addMessage(data.message);

            if (data.recordAdded === true) {
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

              setUserRecordAdded(data.recordAdded);

            } else {
              addErrorMessage(data.errorMessages);
            };
            // } else {
            //     // console.log("Login.js error", json);
            //     addErrorMessage(Login failed.");
            // };

          })
          .catch(error => {
            console.log(componentName, "register error", error);
            // console.log(componentName, "register error.name", error.name);
            // console.log(componentName, "register error.message", error.message);
            addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

  };


  const getChecklist = (token) => {
    // console.log(componentName, "getChecklist");
    // console.log(componentName, "getChecklist baseURL", baseURL);

    setChecklistMessage("");
    setErrChecklistMessage("");
    setChecklistResultsFound(null);

    let url = baseURL + "title/checklist/list";

    if (token !== undefined && token !== null && token !== "") {

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": token
        }),
      })
        .then(response => {
          // console.log(componentName, "getChecklist response", response);
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
          console.log(componentName, "getChecklist data", data);

          setChecklistResultsFound(data.resultsFound);
          // setChecklistMessage(data.message);

          if (data.resultsFound === true) {

            dispatch(loadArrayChecklist(data.titles));

          } else {
            console.log(componentName, "getChecklist resultsFound error", data.message);
            addErrorMessage(data.message);
          };

        })
        .catch(error => {
          console.log(componentName, "getChecklist error", error);
          // console.log(componentName, "getChecklist error.name", error.name);
          // console.log(componentName, "getChecklist error.message", error.message);
          // addErrorMessage(error.name + ": " + error.message);
        });

    };

  };


  useEffect(() => {
    // console.log(componentName, "useEffect userRecordAdded", userRecordAdded);
    if (userRecordAdded !== undefined && userRecordAdded !== null && userRecordAdded !== false) {
      clearMessages();
      setErrFirstName("");
      setErrLastName("");
      setErrEmail("");
      setErrPassword("");
      setUserRecordAdded(null);
      // setModal(false);
      toggle();
    };

  }, [userRecordAdded]);


  useEffect(() => {
    // console.log(componentName, "useEffect sessionToken", sessionToken);
    if (sessionToken !== undefined && sessionToken !== null && sessionToken !== "") {
      clearMessages();
      setErrFirstName("");
      setErrLastName("");
      setErrEmail("");
      setErrPassword("");
      toggle();
    };

  }, [sessionToken]);


  useEffect(() => {
    // console.log(componentName, "useEffect process.env.NODE_ENV", process.env.NODE_ENV);

    if (process.env.NODE_ENV === "development") {

      setTxtEmail(process.env.REACT_APP_EMAIL_DEFAULT);
      setTxtPassword(process.env.REACT_APP_PASSWORD_DEFAULT);
      setTxtFirstName(process.env.REACT_APP_FIRSTNAME_DEFAULT);
      setTxtLastName(process.env.REACT_APP_LASTNAME_DEFAULT);

    };

  }, []);


  const toggle = () => {
    setModal(!modal);
  };


  return (
    <React.Fragment>
      {appAllowUserInteractions === true && sessionToken === undefined || sessionToken === null || sessionToken === "" ? <Button outline className="my-2" size="sm" color="info" onClick={toggle}>Register</Button> : null}
      <Modal isOpen={modal} toggle={toggle} size="md">
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>
            <FormGroup>

              <Label for="txtFirstName">First Name</Label>
              <Input type="text" id="txtFirstName" label="First Name" value={txtFirstName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtFirstName(event.target.value); }} />
              {errFirstName !== "" ? <Alert color="danger">{errFirstName}</Alert> : null}

            </FormGroup>
            <FormGroup>

              <Label for="txtLastName">Last Name</Label>
              <Input type="text" id="txtLastName" label="Last Name" value={txtLastName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtLastName(event.target.value); }} />
              {errLastName !== "" ? <Alert color="danger">{errLastName}</Alert> : null}

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
              <Button outline size="lg" color="primary" onClick={register}>Register</Button>
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default Register;