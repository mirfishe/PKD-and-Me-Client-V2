import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button, NavItem, NavbarText, NavLink } from "reactstrap";
import { Plus } from 'react-bootstrap-icons';
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime, formatTrim } from "../../utilities/SharedFunctions";
import { addErrorLog } from "../../utilities/ApplicationFunctions";

// ! The coding on this component is not finished. -- 03/06/2021 MF

const AddTitleSuggestion = (props) => {

  const componentName = "AddTitleSuggestion";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, getDateTime(), "sessionToken", sessionToken);
  // const admin = useSelector(state => state.user.admin);
  // console.log(componentName, getDateTime(), "admin", admin);
  // const userID = useSelector(state => state.user.userID);
  // console.log(componentName, getDateTime(), "userID", userID);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;
  // console.log(componentName, getDateTime(), "baseURL", baseURL);

  const requireUserLogin = useSelector(state => state.applicationSettings.requireUserLogin);
  // console.log(componentName, getDateTime(), "requireUserLogin", requireUserLogin);

  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

  const userState = { userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active) };
  // console.log(componentName, getDateTime(), "userState", userState);

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
  const [titleSuggestionRecordAdded, setTitleSuggestionRecordAdded] = useState(null);

  const [txtTitleName, setTxtTitleName] = useState("");
  const [txtAuthorFirstName, setTxtAuthorFirstName] = useState("");
  const [txtAuthorLastName, setTxtAuthorLastName] = useState("");
  const [txtPublicationDate, setTxtPublicationDate] = useState("");
  const [txtShortDescription, setTxtShortDescription] = useState("");
  const [txtTitleURL, setTxtTitleURL] = useState("");
  const [txtEmail, setTxtEmail] = useState("");

  const [errTitleName, setErrTitleName] = useState("");
  const [errShortDescription, setErrShortDescription] = useState("");
  const [errEmail, setErrEmail] = useState("");

  // const [titleSuggestionItem, setTitleSuggestionItem] = useState(null);
  // const [titleSuggestionID, setTitleSuggestionID] = useState(null);
  // const [titleSuggestionUserID, setTitleSuggestionUserID] = useState(null);
  // const [titleName, setTitleName] = useState(null);
  // const [authorFirstName, setAuthorFirstName] = useState(null);
  // const [authorLastName, setAuthorLastName] = useState(null);
  // const [publicationDate, setPublicationDate] = useState(null);
  // const [shortDescription, setShortDescription] = useState(null);
  // const [titleURL, setTitleURL] = useState(null);
  // const [titleSuggestionEmail, setTitleSuggestionEmail] = useState(null);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect check for sessionToken", sessionToken);

    if ((isEmpty(userState) === false)) {

      setTxtEmail(userState.email);

    };

  }, [userState]);


  const addTitleSuggestion = () => {
    // console.log(componentName, getDateTime(), "addTitleSuggestion baseURL", baseURL);
    // console.log(componentName, getDateTime(), "addTitleSuggestion sessionToken", sessionToken);

    clearMessages();
    setTitleSuggestionRecordAdded(null);
    setErrTitleName("");
    setErrShortDescription("");
    setErrEmail("");

    // setTitleSuggestionItem(null);
    // setTitleSuggestionID(null);
    // setTitleSuggestionUserID(null);
    // setTitleName(null);
    // setAuthorFirstName(null);
    // setAuthorLastName(null);
    // setPublicationDate(null);
    // setShortDescription(null);
    // setTitleURL(null);
    // setTitleSuggestionEmail(null);

    let titleNameValidated = false;
    let shortDescriptionValidated = false;
    let emailValidated = false;
    let formValidated = false;

    if (isEmpty(txtTitleName) === false) {

      if (formatTrim(txtTitleName).length > 0) {

        titleNameValidated = true;
        setErrTitleName("");
        // console.log(componentName, getDateTime(), "addTitleSuggestion Valid TitleName");
        // console.log(componentName, getDateTime(), "addTitleSuggestion titleNameValidated true", titleNameValidated);

      } else {

        titleNameValidated = false;
        setErrTitleName("Please enter a title.");
        // console.log(componentName, getDateTime(), "addTitleSuggestion Invalid TitleName");
        // console.log(componentName, getDateTime(), "addTitleSuggestion titleNameValidated false", titleNameValidated);

      };

    };

    if (isEmpty(txtShortDescription) === false) {

      if (formatTrim(txtShortDescription).length > 0) {

        shortDescriptionValidated = true;
        setErrShortDescription("");
        // console.log(componentName, getDateTime(), "addTitleSuggestion Valid TitleName");
        // console.log(componentName, getDateTime(), "addTitleSuggestion titleNameValidated true", titleNameValidated);

      } else {

        shortDescriptionValidated = false;
        setErrShortDescription("Please enter a description of why the title should be added.");
        // console.log(componentName, getDateTime(), "addTitleSuggestion Invalid TitleName");
        // console.log(componentName, getDateTime(), "addTitleSuggestion titleNameValidated false", titleNameValidated);

      };

    };

    if (isEmpty(txtEmail) === false) {

      if (formatTrim(txtEmail).length > 0 || requireUserLogin === false) {

        emailValidated = true;
        setErrEmail("");
        // console.log(componentName, getDateTime(), "addMessage Valid email");
        // console.log(componentName, getDateTime(), "addMessage emailValidated true", emailValidated);

      } else {

        emailValidated = false;
        setErrEmail("Please enter an email address.");
        // console.log(componentName, getDateTime(), "addMessage Invalid email");
        // console.log(componentName, getDateTime(), "addMessage emailValidated false", emailValidated);

      };

    };

    if (titleNameValidated === true && shortDescriptionValidated === true && emailValidated === true) {

      formValidated = true;
      // console.log(componentName, getDateTime(), "addTitleSuggestion Valid Form");
      // console.log(componentName, getDateTime(), "addTitleSuggestion formValidated true", formValidated);

    } else {

      formValidated = false;
      // console.log(componentName, getDateTime(), "addTitleSuggestion Invalid Form");
      // console.log(componentName, getDateTime(), "addTitleSuggestion formValidated false", formValidated);

    };

    // console.log(componentName, getDateTime(), "addTitleSuggestion titleNameValidated", titleNameValidated);
    // console.log(componentName, getDateTime(), "addTitleSuggestion categoryIDValidated", categoryIDValidated);
    // console.log(componentName, getDateTime(), "addTitleSuggestion formValidated", formValidated);

    if (formValidated === true) {

      if (isEmpty(txtTitleName) === false && isEmpty(txtShortDescription) === false && isEmpty(txtEmail) === false) {

        let recordObject = {
          titleName: formatTrim(txtTitleName),
          // authorFirstName: formatTrim(txtAuthorFirstName),
          // authorLastName: formatTrim(txtAuthorLastName),
          shortDescription: formatTrim(txtShortDescription),
          // titleURL: formatTrim(txtTitleURL),
          userID: userState.userID,
          email: formatTrim(txtEmail)
        };

        // * If the user doesn't enter an author first name, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtAuthorFirstName) === false) {

          if (formatTrim(txtAuthorFirstName).length !== 0) {

            Object.assign(recordObject, { authorFirstName: formatTrim(txtAuthorFirstName) });

          };

        };

        // * If the user doesn't enter an author last name, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtAuthorLastName) === false) {

          if (formatTrim(txtAuthorLastName).length !== 0) {

            Object.assign(recordObject, { authorLastName: formatTrim(txtAuthorLastName) });

          };

        };

        // * If the user doesn't enter a publication date, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtPublicationDate) === false) {


          if (formatTrim(txtPublicationDate).length !== 0) {
            Object.assign(recordObject, { publicationDate: formatTrim(txtPublicationDate) });

          };

        };

        // * If the user doesn't enter a title URL, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtTitleURL) === false) {

          if (formatTrim(txtTitleURL).length !== 0) {

            Object.assign(recordObject, { titleURL: formatTrim(txtTitleURL) });

          };

        };

        // console.log(componentName, getDateTime(), "addTitleSuggestion recordObject", recordObject);

        let url = baseURL + "titleSuggestions/";
        // console.log(componentName, getDateTime(), "addTitleSuggestion url", url);

        if ((isEmpty(sessionToken) === false) || requireUserLogin === false) {

          let headerObject = new Headers({ "Content-Type": "application/json" });

          // * If the user isn't logged in and user login isn't required, then it isn't added to the Authorization header. -- 03/06/2021 MF
          if (isEmpty(sessionToken) === false) {

            Object.assign(headerObject, { "Authorization": sessionToken });

          };

          fetch(url, {
            method: "POST",
            headers: headerObject,
            body: JSON.stringify({ titleSuggestion: recordObject })
          })
            .then(response => {
              // console.log(componentName, getDateTime(), "addTitleSuggestion response", response);

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
              // console.log(componentName, getDateTime(), "addTitleSuggestion data", data);

              setTitleSuggestionRecordAdded(data.transactionSuccess);
              addMessage(data.message);

              if (data.transactionSuccess === true) {

                // setTitleSuggestionItem(data.records[0]);
                // setTitleSuggestionID(data.records[0].titleSuggestionID);
                // setTitleSuggestionUserID(data.records[0].userID);
                // setTitleName(data.records[0].titleName);
                // setAuthorFirstName(data.records[0].authorFirstName);
                // setAuthorLastName(data.records[0].authorLastName);
                // setPublicationDate(data.records[0].publicationDate);
                // setShortDescription(data.records[0].shortDescription);
                // setTitleURL(data.records[0].titleURL);
                // setTitleSuggestionEmail(data.records[0].email);

                // ? Would still work if the createDate and updateDate were left out?. -- 03/06/2021 MF
                // dispatch(addStateTitle([{titleID: data.records[0].titleID, titleName: data.records[0].titleName, titleSort: data.records[0].titleSort, titleURL: data.records[0].titleURL, authorFirstName: data.records[0].authorFirstName, authorLastName: data.records[0].authorLastName, publicationDate: data.records[0].publicationDate, imageName: data.records[0].imageName, categoryID: data.records[0].categoryID, shortDescription: data.records[0].shortDescription, urlPKDWeb: data.records[0].urlPKDWeb, active: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate}]));

                // ? Add to local storage also?. -- 03/06/2021 MF

              } else {

                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);

              };

            })
            .catch((error) => {
              console.error(componentName, getDateTime(), "addTitleSuggestion error", error);
              // console.error(componentName, getDateTime(), "addTitleSuggestion error.name", error.name);
              // console.error(componentName, getDateTime(), "addTitleSuggestion error.message", error.message);

              addErrorMessage(error.name + ": " + error.message);

              // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

            });

        };

      };

    };
  };


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect titleSuggestionRecordAdded", titleSuggestionRecordAdded);

    if (isEmpty(titleSuggestionRecordAdded) === false) {

      clearMessages();
      setErrTitleName("");
      setErrShortDescription("");
      setErrEmail("");
      setTitleSuggestionRecordAdded(null);

      setTxtTitleName("");
      setTxtAuthorFirstName("");
      setTxtAuthorLastName("");
      setTxtPublicationDate("");
      setTxtShortDescription("");
      setTxtTitleURL("");
      setTxtEmail("");

      setModal(!modal);

    };

  }, [titleSuggestionRecordAdded]);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect check for sessionToken", sessionToken);

    if ((isEmpty(sessionToken) === false) || requireUserLogin === false) {

      // return <Redirect to="/" />;
      setModal(false);

    };

  }, [sessionToken]);


  return (
    <React.Fragment>

      {/* {applicationAllowUserInteractions === true && ((isEmpty(sessionToken) === false) || requireUserLogin === false) && props.displayButton === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Add Title Suggestion</Button></span> : null}

      {applicationAllowUserInteractions === true && ((isEmpty(sessionToken) === false) || requireUserLogin === false) && props.displayIcon === true ? <Plus className="add-edit-icon" onClick={(event) => { setModal(!modal); }} /> : null} */}

      {applicationAllowUserInteractions === true && ((isEmpty(sessionToken) === false) || requireUserLogin === false) ?

        <React.Fragment>
          {/* <NavItem> */}
          {/* <NavItem className="mx-3 my-2">
            <a href="#" onClick={(event) => { setModal(!modal); }}><NavbarText>Add Title Suggestion</NavbarText></a> */}
          <NavLink onClick={(event) => { setModal(!modal); }}><NavbarText>Add Title Suggestion</NavbarText></NavLink>
          {/* </NavItem> */}
        </React.Fragment>

        : null}

      <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="lg">
        <ModalHeader toggle={(event) => { setModal(!modal); }}>Add Title Suggestion</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>

            <FormGroup>
              <Label for="txtTitleName">Title</Label>
              <Input type="text" id="txtTitleName" value={txtTitleName} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtTitleName(event.target.value); }} />
              {isEmpty(errTitleName) === false ? <Alert color="danger">{errTitleName}</Alert> : null}
            </FormGroup>

            <FormGroup>
              <Label for="txtAuthorFirstName">Author First Name</Label>
              <Input type="text" id="txtAuthorFirstName" value={txtAuthorFirstName} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtAuthorFirstName(event.target.value); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtAuthorLastName">Author Last Name</Label>
              <Input type="text" id="txtAuthorLastName" value={txtAuthorLastName} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtAuthorLastName(event.target.value); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtPublicationDate">Publication Date</Label>
              <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtPublicationDate(event.target.value); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtShortDescription">Description Of Why The Title Should Be Added</Label>
              <Input type="textarea" id="txtShortDescription" rows={10} value={txtShortDescription} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtShortDescription(event.target.value); }} />
              {isEmpty(errShortDescription) === false ? <Alert color="danger">{errShortDescription}</Alert> : null}
            </FormGroup>

            <FormGroup>
              <Label for="txtTitleURL">Title URL</Label>
              <Input type="text" id="txtTitleURL" value={txtTitleURL} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtTitleURL(event.target.value); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtEmail">Email Address</Label>
              <Input type="text" id="txtEmail" value={txtEmail} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtEmail(event.target.value); }} />
              {isEmpty(errEmail) === false ? <Alert color="danger">{errEmail}</Alert> : null}
            </FormGroup>

            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={addTitleSuggestion}>Add Title Suggestion</Button>
              <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button>
            </ModalFooter>

          </Form>
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
};

export default AddTitleSuggestion;
