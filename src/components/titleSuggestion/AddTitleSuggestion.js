import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Plus } from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";

const AddTitleSuggestion = (props) => {

  const componentName = "AddTitleSuggestion.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);
  const userID = useSelector(state => state.user.userID);
  // console.log(componentName, GetDateTime(), "userID", userID);

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const requireUserLogin = useSelector(state => state.app.requireUserLogin);
  // console.log(componentName, GetDateTime(), "requireUserLogin", requireUserLogin);

  const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

  const userState = { userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active) };
  // console.log(componentName, GetDateTime(), "userState", userState);

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
  const [txtEmailAddress, setTxtEmailAddress] = useState("");

  const [errTitleName, setErrTitleName] = useState("");
  const [errShortDescription, setErrShortDescription] = useState("");
  const [errEmailAddress, setErrEmailAddress] = useState("");

  const [titleSuggestionItem, setTitleSuggestionItem] = useState(null);
  const [titleSuggestionID, setTitleSuggestionID] = useState(null);
  const [titleSuggestionUserID, setTitleSuggestionUserID] = useState(null);
  const [titleName, setTitleName] = useState(null);
  const [authorFirstName, setAuthorFirstName] = useState(null);
  const [authorLastName, setAuthorLastName] = useState(null);
  const [publicationDate, setPublicationDate] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [titleURL, setTitleURL] = useState(null);
  const [titleSuggestionEmailAddress, setTitleSuggestionEmailAddress] = useState(null);


  const addTitleSuggestion = () => {
    // console.log(componentName, GetDateTime(), "addTitleSuggestion");
    // console.log(componentName, GetDateTime(), "addTitleSuggestion baseURL", baseURL);

    clearMessages();
    setTitleSuggestionRecordAdded(null);
    setErrTitleName("");
    setErrShortDescription("");
    setErrEmailAddress("");

    setTitleSuggestionItem(null);
    setTitleSuggestionID(null);
    setTitleSuggestionUserID(null);
    setTitleName(null);
    setAuthorFirstName(null);
    setAuthorLastName(null);
    setPublicationDate(null);
    setShortDescription(null);
    setTitleURL(null);
    setTitleSuggestionEmailAddress(null);

    let titleNameValidated = false;
    let shortDescriptionValidated = false;
    let emailAddressValidated = false;
    let formValidated = false;

    if (IsEmpty(txtTitleName) === false) {
      if (txtTitleName.trim().length > 0) {
        titleNameValidated = true;
        setErrTitleName("");
        // console.log(componentName, GetDateTime(), "addTitleSuggestion Valid TitleName");
        // console.log(componentName, GetDateTime(), "addTitleSuggestion titleNameValidated true", titleNameValidated);
      } else {
        titleNameValidated = false;
        setErrTitleName("Please enter a title.");
        // console.log(componentName, GetDateTime(), "addTitleSuggestion Invalid TitleName");
        // console.log(componentName, GetDateTime(), "addTitleSuggestion titleNameValidated false", titleNameValidated);
      };
    };

    if (IsEmpty(txtShortDescription) === false) {
      if (txtShortDescription.trim().length > 0) {
        shortDescriptionValidated = true;
        setErrShortDescription("");
        // console.log(componentName, GetDateTime(), "addTitleSuggestion Valid TitleName");
        // console.log(componentName, GetDateTime(), "addTitleSuggestion titleNameValidated true", titleNameValidated);
      } else {
        shortDescriptionValidated = false;
        setErrShortDescription("Please enter a description of why the title should be added.");
        // console.log(componentName, GetDateTime(), "addTitleSuggestion Invalid TitleName");
        // console.log(componentName, GetDateTime(), "addTitleSuggestion titleNameValidated false", titleNameValidated);
      };
    };

    if (IsEmpty(txtEmailAddress) === false) {
      if (txtEmailAddress.trim().length > 0 || requireUserLogin === false) {
        emailAddressValidated = true;
        setErrEmailAddress("");
        // console.log(componentName, GetDateTime(), "addMessage Valid emailAddress");
        // console.log(componentName, GetDateTime(), "addMessage emailAddressValidated true", emailAddressValidated);
      } else {
        emailAddressValidated = false;
        setErrEmailAddress("Please enter an email address.");
        // console.log(componentName, GetDateTime(), "addMessage Invalid emailAddress");
        // console.log(componentName, GetDateTime(), "addMessage emailAddressValidated false", emailAddressValidated);
      };
    };

    if (titleNameValidated === true && shortDescriptionValidated === true && emailAddressValidated === true) {
      formValidated = true;
      // console.log(componentName, GetDateTime(), "addTitleSuggestion Valid Form");
      // console.log(componentName, GetDateTime(), "addTitleSuggestion formValidated true", formValidated);
    } else {
      formValidated = false;
      // console.log(componentName, GetDateTime(), "addTitleSuggestion Invalid Form");
      // console.log(componentName, GetDateTime(), "addTitleSuggestion formValidated false", formValidated);
    };

    // console.log(componentName, GetDateTime(), "addTitleSuggestion titleNameValidated", titleNameValidated);
    // console.log(componentName, GetDateTime(), "addTitleSuggestion categoryIDValidated", categoryIDValidated);
    // console.log(componentName, GetDateTime(), "addTitleSuggestion formValidated", formValidated);

    if (formValidated === true) {

      if (IsEmpty(txtTitleName) === false && IsEmpty(txtShortDescription) === false && IsEmpty(txtEmailAddress) === false) {

        let titleSuggestionObject = {
          titleName: txtTitleName.trim(),
          // authorFirstName: txtAuthorFirstName.trim(),
          // authorLastName: txtAuthorLastName.trim(),
          shortDescription: txtShortDescription.trim(),
          // titleURL: txtTitleURL.trim(),
          emailAddress: txtEmailAddress.trim()
        };

        // * If the user doesn't enter an author first name, then it isn't added/updated
        if (IsEmpty(txtAuthorFirstName) === false) {
          if (txtAuthorFirstName.trim().length !== 0) {
            Object.assign(titleSuggestionObject, { authorFirstName: txtAuthorFirstName.trim() });
          };
        };

        // * If the user doesn't enter an author last name, then it isn't added/updated
        if (IsEmpty(txtAuthorLastName) === false) {
          if (txtAuthorLastName.trim().length !== 0) {
            Object.assign(titleSuggestionObject, { authorLastName: txtAuthorLastName.trim() });
          };
        };

        // * If the user doesn't enter a publication date, then it isn't added/updated
        if (IsEmpty(txtPublicationDate) === false) {
          if (txtPublicationDate.trim().length !== 0) {
            Object.assign(titleSuggestionObject, { publicationDate: txtPublicationDate.trim() });
          };
        };

        // * If the user doesn't enter a title URL, then it isn't added/updated
        if (IsEmpty(txtTitleURL) === false) {
          if (txtTitleURL.trim().length !== 0) {
            Object.assign(titleSuggestionObject, { titleURL: txtTitleURL.trim() });
          };
        };

        // console.log(componentName, GetDateTime(), "addTitleSuggestion titleSuggestionObject", titleSuggestionObject);

        let url = baseURL + "titles/";
        // console.log(componentName, GetDateTime(), "addTitleSuggestion url", url);

        if ((IsEmpty(sessionToken) === false) || requireUserLogin === false) {

          let headerObject = new Headers({ "Content-Type": "application/json" });

          // * If the user isn't logged in and user login isn't required, then it isn't added to the Authorization header
          if (IsEmpty(sessionToken) === false) {
            Object.assign(headerObject, { "Authorization": sessionToken });
          };

          fetch(url, {
            method: "POST",
            headers: headerObject,
            body: JSON.stringify({ titleSuggestion: titleSuggestionObject })
          })
            .then(response => {
              // console.log(componentName, GetDateTime(), "addTitleSuggestion response", response);
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
              // console.log(componentName, GetDateTime(), "addTitleSuggestion data", data);

              setTitleSuggestionRecordAdded(data.recordAdded);
              addMessage(data.message);

              if (data.recordAdded === true) {

                setTitleSuggestionItem(data.records[0]);
                setTitleSuggestionID(data.records[0].titleSuggestionID);
                setTitleSuggestionUserID(data.records[0].userID);
                setTitleName(data.records[0].titleName);
                setAuthorFirstName(data.records[0].authorFirstName);
                setAuthorLastName(data.records[0].authorLastName);
                setPublicationDate(data.records[0].publicationDate);
                setShortDescription(data.records[0].shortDescription);
                setTitleURL(data.records[0].titleURL);
                setTitleSuggestionEmailAddress(data.records[0].emailAddress);

                // ? Would still work if the createDate and updateDate were left out?
                // dispatch(addStateTitle([{titleID: data.records[0].titleID, titleName: data.records[0].titleName, titleSort: data.records[0].titleSort, titleURL: data.records[0].titleURL, authorFirstName: data.records[0].authorFirstName, authorLastName: data.records[0].authorLastName, publicationDate: data.records[0].publicationDate, imageName: data.records[0].imageName, categoryID: data.records[0].categoryID, shortDescription: data.records[0].shortDescription, urlPKDweb: data.records[0].urlPKDweb, active: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate}]));
                // ? Add to local storage also?

              } else {
                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);
              };

            })
            .catch(error => {
              console.log(componentName, GetDateTime(), "addTitleSuggestion error", error);
              // console.log(componentName, GetDateTime(), "addTitleSuggestion error.name", error.name);
              // console.log(componentName, GetDateTime(), "addTitleSuggestion error.message", error.message);
              addErrorMessage(error.name + ": " + error.message);
            });

        };

      };

    };
  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect titleSuggestionRecordAdded", titleSuggestionRecordAdded);
    if (IsEmpty(titleSuggestionRecordAdded) === false) {
      clearMessages();
      setErrTitleName("");
      setErrShortDescription("");
      setErrEmailAddress("");
      setTitleSuggestionRecordAdded(null);
      // setModal(false);
      toggle();
    };

  }, [titleSuggestionRecordAdded]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect check for sessionToken", sessionToken);

    if ((IsEmpty(sessionToken) === false) || requireUserLogin === false) {
      // return <Redirect to="/" />;
      setModal(false);
    };

  }, [sessionToken]);


  const toggle = () => {
    setModal(!modal);
  };


  return (
    <React.Fragment>

      {appAllowUserInteractions === true && ((IsEmpty(sessionToken) === false) || requireUserLogin === false) && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Title Suggestion</Button></span> : null}

      {appAllowUserInteractions === true && ((IsEmpty(sessionToken) === false) || requireUserLogin === false) && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Add Title Suggestion</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>
            <FormGroup>

              <Label for="txtTitleName">Title</Label>
              <Input type="text" id="txtTitleName" value={txtTitleName} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtTitleName(event.target.value); }} />
              {IsEmpty(errTitleName) === false ? <Alert color="danger">{errTitleName}</Alert> : null}

            </FormGroup>
            <FormGroup>

              <Label for="txtAuthorFirstName">Author First Name</Label>
              <Input type="text" id="txtAuthorFirstName" value={txtAuthorFirstName} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtAuthorFirstName(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtAuthorLastName">Author Last Name</Label>
              <Input type="text" id="txtAuthorLastName" value={txtAuthorLastName} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtAuthorLastName(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtPublicationDate">Publication Date</Label>
              <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtPublicationDate(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtShortDescription">Description Of Why The Title Should Be Added</Label>
              <Input type="textarea" id="txtShortDescription" rows={10} value={txtShortDescription} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtShortDescription(event.target.value); }} />
              {IsEmpty(errShortDescription) === false ? <Alert color="danger">{errShortDescription}</Alert> : null}

            </FormGroup>
            <FormGroup>

              <Label for="txtTitleURL">Title URL</Label>
              <Input type="text" id="txtTitleURL" value={txtTitleURL} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtTitleURL(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtEmailAddress">Email Address</Label>
              <Input type="text" id="txtEmailAddress" value={txtEmailAddress} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtEmailAddress(event.target.value); }} />
              {IsEmpty(errEmailAddress) === false ? <Alert color="danger">{errEmailAddress}</Alert> : null}

            </FormGroup>

            <ModalFooter>

              <Button outline size="lg" color="primary" onClick={addTitleSuggestion}>Add Title Suggestion</Button>
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default AddTitleSuggestion;
