import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, InputGroup, InputGroupText, Label, Input, Alert, Button } from "reactstrap";
import applicationSettings from "../../app/environment";
import { emailRegExp } from "../../app/constants";
import { IsEmpty, DisplayValue, GetDateTime, FormatTrim } from "../../utilities/SharedFunctions";
import { LogError } from "../../utilities/ApplicationFunctions";
import { loadUserData, setSessionToken, loadArrayChecklist } from "../../app/userSlice";

const Register = (props) => {

  // ? What if the user has deleted their account and wants to reupdateUser? -- 03/06/2021 MF
  // * The database won't allow duplicate email addresses to be entered. -- 03/06/2021 MF

  const componentName = "Register.js";

  const dispatch = useDispatch();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

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
  const [showPassword, setShowPassword] = useState("password");

  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
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


  const register = () => {

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

    if (IsEmpty(txtFirstName) === false) {

      if (FormatTrim(txtFirstName).length > 0) {

        firstNameValidated = true;
        setErrFirstName("");
        // console.log(componentName, GetDateTime(), "register Valid First Name");
        // console.log(componentName, GetDateTime(), "register firstNameValidated true", firstNameValidated);

      } else {

        firstNameValidated = false;
        setErrFirstName("Please enter a first name.");
        // console.log(componentName, GetDateTime(), "register Invalid First Name");
        // console.log(componentName, GetDateTime(), "register firstNameValidated false", firstNameValidated);

      };

    };

    if (IsEmpty(txtLastName) === false) {

      if (FormatTrim(txtLastName).length > 0) {

        lastNameValidated = true;
        setErrLastName("");
        // console.log(componentName, GetDateTime(), "register Valid Last Name");
        // console.log(componentName, GetDateTime(), "register lastNameValidated true", lastNameValidated);

      } else {

        lastNameValidated = false;
        setErrLastName("Please enter a last name.");
        // console.log(componentName, GetDateTime(), "register Invalid Last Name");
        // console.log(componentName, GetDateTime(), "register lastNameValidated false", lastNameValidated);

      };

    };

    if (IsEmpty(txtEmail) === false) {

      if (FormatTrim(txtEmail).match(emailRegExp) && FormatTrim(txtEmail).length > 0) {

        // if (FormatTrim(txtEmail).match(emailFormat) && FormatTrim(txtEmail).length > 0) {
        emailValidated = true;
        setErrEmail("");
        // console.log(componentName, GetDateTime(), "register Valid Email Address");
        // console.log(componentName, GetDateTime(), "register emailValidated true", emailValidated);

      } else {

        emailValidated = false;
        setErrEmail("Please enter a valid email address.");
        // console.log(componentName, GetDateTime(), "register Invalid Email Address");
        // console.log(componentName, GetDateTime(), "register emailValidated false", emailValidated);

      };

    };

    if (IsEmpty(txtPassword) === false) {

      if (FormatTrim(txtPassword).length > 4) {

        passwordValidated = true;
        setErrPassword("");
        // console.log(componentName, GetDateTime(), "register Valid Password");
        // console.log(componentName, GetDateTime(), "register passwordValidated true", passwordValidated);

      } else {

        passwordValidated = false;
        setErrPassword("Password must be at least 5 characters.");
        // console.log(componentName, GetDateTime(), "register Invalid Password");
        // console.log(componentName, GetDateTime(), "register passwordValidated false", passwordValidated);

      };

    };

    if (firstNameValidated === true && lastNameValidated === true && emailValidated === true && passwordValidated === true) {

      formValidated = true;
      // console.log(componentName, GetDateTime(), "register Valid Form");
      // console.log(componentName, GetDateTime(), "register formValidated true", formValidated);

    } else {

      formValidated = false;
      // console.log(componentName, GetDateTime(), "register Invalid Form");
      // console.log(componentName, GetDateTime(), "register formValidated false", formValidated);

    };

    // console.log(componentName, GetDateTime(), "register firstNameValidated", firstNameValidated);
    // console.log(componentName, GetDateTime(), "register lastNameValidated", lastNameValidated);
    // console.log(componentName, GetDateTime(), "register emailValidated", emailValidated);
    // console.log(componentName, GetDateTime(), "register passwordValidated", passwordValidated);
    // console.log(componentName, GetDateTime(), "register formValidated", formValidated);

    if (formValidated === true) {

      if (IsEmpty(txtFirstName) === false && IsEmpty(txtLastName) === false && IsEmpty(txtEmail) === false && IsEmpty(txtPassword) === false) {

        let recordObject = {
          firstName: FormatTrim(txtFirstName),
          lastName: FormatTrim(txtLastName),
          email: FormatTrim(txtEmail),
          password: FormatTrim(txtPassword)
        };

        // console.log(componentName, GetDateTime(), "register recordObject", recordObject);

        let url = baseURL + "users/register/";
        // console.log(componentName, GetDateTime(), "register url", url);

        fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({ user: recordObject })
        })
          .then(response => {
            // console.log(componentName, GetDateTime(), "register response", response);

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
            // console.log(componentName, GetDateTime(), "register data", data);

            // if (data !== 500 && data !== 401) {

            // setUserRecordAdded(data.transactionSuccess);
            addMessage(data.message);

            if (data.transactionSuccess === true) {

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

              setUserRecordAdded(data.transactionSuccess);

            } else {

              addErrorMessage(data.errorMessages);

            };

            // } else {

            //     // console.log("Login.js error", json);
            //     addErrorMessage(Login failed.");

            // };

          })
          .catch((error) => {
            console.error(componentName, GetDateTime(), "register error", error);
            // console.error(componentName, GetDateTime(), "register error.name", error.name);
            // console.error(componentName, GetDateTime(), "register error.message", error.message);

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

          setChecklistResultsFound(results.transactionSuccess);
          // setChecklistMessage(results.message);

          if (IsEmpty(results) === false && results.transactionSuccess === true) {

            dispatch(loadArrayChecklist(results.records));

          } else {

            console.log(componentName, GetDateTime(), "getChecklist error", results.message);
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
    // console.log(componentName, GetDateTime(), "useEffect userRecordAdded", userRecordAdded);

    if (IsEmpty(userRecordAdded) === false) {

      clearMessages();
      setErrFirstName("");
      setErrLastName("");
      setErrEmail("");
      setErrPassword("");
      setUserRecordAdded(null);
      setModal(!modal);

    };

  }, [userRecordAdded]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect sessionToken", sessionToken);

    if (IsEmpty(sessionToken) === false) {

      clearMessages();
      setErrFirstName("");
      setErrLastName("");
      setErrEmail("");
      setErrPassword("");
      setModal(!modal);

    };

  }, [sessionToken]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect process.env.NODE_ENV", process.env.NODE_ENV);

    if (process.env.NODE_ENV === "development") {

      setTxtEmail(process.env.REACT_APP_EMAIL_DEFAULT);
      setTxtPassword(process.env.REACT_APP_PASSWORD_DEFAULT);
      setTxtFirstName(process.env.REACT_APP_FIRSTNAME_DEFAULT);
      setTxtLastName(process.env.REACT_APP_LASTNAME_DEFAULT);

    };

  }, []);


  return (
    <React.Fragment>

      {applicationAllowUserInteractions === true && IsEmpty(sessionToken) === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Register</Button></span> : null}

      <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="md">
        <ModalHeader toggle={(event) => { setModal(!modal); }}>Register</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>

            <FormGroup>
              <Label for="txtFirstName">First Name</Label>
              <Input type="text" id="txtFirstName" label="First Name" value={txtFirstName} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtFirstName(event.target.value); }} />
              {errFirstName !== "" ? <Alert color="danger">{errFirstName}</Alert> : null}
            </FormGroup>

            <FormGroup>
              <Label for="txtLastName">Last Name</Label>
              <Input type="text" id="txtLastName" label="Last Name" value={txtLastName} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtLastName(event.target.value); }} />
              {errLastName !== "" ? <Alert color="danger">{errLastName}</Alert> : null}
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
                <InputGroupText><i className="fas fa-eye" onMouseOver={(event) => { setShowPassword("text"); }} onMouseOut={(event) => { setShowPassword("password"); }}></i></InputGroupText>
                {/* <InputGroupText><i className="fas fa-eye-slash"></i></InputGroupText> */}
              </InputGroup>
              {errPassword !== "" ? <Alert color="danger">{errPassword}</Alert> : null}
            </FormGroup>

            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={register}>Register</Button>
              <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button>
            </ModalFooter>

          </Form>
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
};

export default Register;
