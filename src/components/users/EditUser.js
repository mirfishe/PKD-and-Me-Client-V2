import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button, NavItem, NavbarText, NavLink } from "reactstrap";
import applicationSettings from "../../app/environment";
import { emailRegExp } from "../../app/constants";
import { isEmpty, displayValue, getDateTime, formatTrim } from "../../utilities/SharedFunctions";
import { addErrorLog } from "../../utilities/ApplicationFunctions";
import { loadUserData } from "../../app/userSlice";

const EditUser = (props) => {

  // ? What if the user has deleted their account and wants to reupdateUser?
  // * The database won't allow duplicate email addresses to be entered.

  const componentName = "EditUser";

  const dispatch = useDispatch();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

  // const [user, setUser] = useState({});
  // const [userID, setUserID] = useState(null);
  const userID = useSelector(state => state.user.userID);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [updatedBy, setUpdatedBy] = useState(null);
  // const [admin, setAdmin] = useState(false);
  const admin = useSelector(state => state.user.admin);
  // const [active, setActive] = useState(false);
  // const [sessionToken, setSessionToken] = useState(null);
  const sessionToken = useSelector(state => state.user.sessionToken);

  const userLoaded = useSelector(state => state.user.userLoaded);

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
  const [userRecordUpdated, setUserRecordUpdated] = useState(null);

  const [txtFirstName, setTxtFirstName] = useState(useSelector(state => state.user.firstName)); // process.env.REACT_APP_FIRSTNAME_DEFAULT
  const [txtLastName, setTxtLastName] = useState(useSelector(state => state.user.lastName)); // process.env.REACT_APP_LASTNAME_DEFAULT
  const [txtEmail, setTxtEmail] = useState(useSelector(state => state.user.email)); // process.env.REACT_APP_EMAIL_DEFAULT
  const [txtPassword, setTxtPassword] = useState(""); // process.env.REACT_APP_PASSWORD_DEFAULT

  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");


  const updateUser = (deleteUser) => {

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

    if (isEmpty(txtFirstName) === false) {

      if (formatTrim(txtFirstName).length > 0) {

        firstNameValidated = true;
        setErrFirstName("");

      } else {

        firstNameValidated = false;
        setErrFirstName("Please enter a first name.");

      };

    };

    if (isEmpty(txtLastName) === false) {

      if (formatTrim(txtLastName).length > 0) {

        lastNameValidated = true;
        setErrLastName("");

      } else {

        lastNameValidated = false;
        setErrLastName("Please enter a last name.");

      };

    };

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

    // * If the user doesn't enter a password, then it isn't updated
    if (isEmpty(txtPassword) === false) {

      if (formatTrim(txtPassword).length !== 0) {

        if (formatTrim(txtPassword).length > 4) {

          passwordValidated = true;
          setErrPassword("");

        } else {

          passwordValidated = false;
          setErrPassword("Password must be at least 5 characters.");

        };

      } else {

        passwordValidated = true;
        setErrPassword("");
      };

    } else {

      passwordValidated = true;
      setErrPassword("");

    };

    if (firstNameValidated === true && lastNameValidated === true && emailValidated === true && passwordValidated === true) {

      formValidated = true;

    } else {

      formValidated = false;

    };


    if (formValidated === true) {

      if (isEmpty(txtFirstName) === false && isEmpty(txtLastName) === false && isEmpty(txtEmail) === false && isEmpty(txtPassword) === false) {

        let recordObject = {
          firstName: formatTrim(txtFirstName),
          lastName: formatTrim(txtLastName),
          email: formatTrim(txtEmail),
          updatedBy: userID,
          // active:     active
          active: !deleteUser
        };

        // * If the user doesn't enter a password, then it isn't updated
        if (isEmpty(txtPassword) === false) {

          if (formatTrim(txtPassword).length !== 0) {

            Object.assign(recordObject, { password: formatTrim(txtPassword) });

          };

        };


        let url = baseURL + "users/";

        // ? Does it matter if the user is updating their own record as an admin or not? -- 03/06/2021 MF
        if (admin === true) {

          url = url + userID;

        };


        fetch(url, {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          }),
          body: JSON.stringify({ user: recordObject })
        })
          .then(response => {

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

            // if (results !== 500 && results !== 401) {

            setUserRecordUpdated(results.transactionSuccess);
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
              // dispatch(setSessionToken(results.sessionToken));

            } else {

              // addErrorMessage(results.error);
              addErrorMessage(results.errorMessages);

            };

            // } else {

            //     // console.log("Login.js error", json);
            //     addErrorMessage(Login failed.");

            // };

          })
          .catch((error) => {
            console.error(componentName, getDateTime(), "updateUser error", error);
            // console.error(componentName, getDateTime(), "updateUser error.name", error.name);
            // console.error(componentName, getDateTime(), "updateUser error.message", error.message);

            addErrorMessage(error.name + ": " + error.message);

            // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  useEffect(() => {

    if (isEmpty(userRecordUpdated) === false) {

      clearMessages();
      setErrFirstName("");
      setErrLastName("");
      setErrEmail("");
      setErrPassword("");
      setUserRecordUpdated(null);

      setTxtFirstName("");
      setTxtLastName("");
      setTxtEmail("");
      setTxtPassword("");

      setModal(!modal);

    };

  }, [userRecordUpdated]);


  useEffect(() => {

    if (isEmpty(userLoaded) === false && userLoaded === false) {

      clearMessages();
      setErrEmail("");
      setErrPassword("");

      setTxtFirstName("");
      setTxtLastName("");
      setTxtEmail("");
      setTxtPassword("");

      setModal(false);

    };

  }, [userLoaded]);


  return (
    <React.Fragment>

      {/* {applicationAllowUserInteractions === true && isEmpty(userLoaded) === false && userLoaded === true ? <Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Update User</Button> : null} */}

      {applicationAllowUserInteractions === true && isEmpty(userLoaded) === false && userLoaded === true ?

        <React.Fragment>
          {/* <NavItem> */}
          {/* <NavItem className="mx-3 my-2">
            <a href="#" onClick={(event) => { setModal(!modal); }}><NavbarText>Update User</NavbarText></a> */}
          <NavLink onClick={(event) => { setModal(!modal); }}><NavbarText>Update User</NavbarText></NavLink>
          {/* </NavItem> */}
        </React.Fragment>

        : null}

      <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="md">
        <ModalHeader toggle={(event) => { setModal(!modal); }}>Update User</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>

            <FormGroup>
              <Label for="txtFirstName">First Name</Label>
              <Input type="text" id="txtFirstName" label="First Name" value={txtFirstName} onChange={(event) => { setTxtFirstName(event.target.value); }} />
              {isEmpty(errFirstName) === false ? <Alert color="danger">{errFirstName}</Alert> : null}
            </FormGroup>

            <FormGroup>
              <Label for="txtLastName">Last Name</Label>
              <Input type="text" id="txtLastName" label="Last Name" value={txtLastName} onChange={(event) => { setTxtLastName(event.target.value); }} />
              {isEmpty(errLastName) === false ? <Alert color="danger">{errLastName}</Alert> : null}
            </FormGroup>

            <FormGroup>
              <Label for="txtEmail">Email Address</Label>
              <Input id="txtEmail" label="Email Address" value={txtEmail} onChange={(event) => { setTxtEmail(event.target.value); }} />
              {isEmpty(errEmail) === false ? <Alert color="danger">{errEmail}</Alert> : null}
            </FormGroup>

            <FormGroup>
              <Label for="txtPassword">Password</Label>
              <Input type="password" id="txtPassword" value={txtPassword} onChange={(event) => { setTxtPassword(event.target.value); }} />
              {isEmpty(errPassword) === false ? <Alert color="danger">{errPassword}</Alert> : null}
            </FormGroup>

            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={(event) => { updateUser(false); }}>Update</Button>
              <Button outline size="lg" color="danger" onClick={(event) => { updateUser(true); }}>Delete</Button>
              <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button>
            </ModalFooter>

          </Form>
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
};

export default EditUser;
