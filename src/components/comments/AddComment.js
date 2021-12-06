import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Plus } from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";

const AddComment = (props) => {

  const componentName = "AddComment.js";

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
  const [commentRecordAdded, setCommentRecordAdded] = useState(null);

  const [txtComment, setTxtComment] = useState("");
  const [txtEmail, setTxtEmail] = useState("");

  const [errComment, setErrComment] = useState("");
  const [errEmail, setErrEmail] = useState("");

  const [commentItem, setCommentItem] = useState(null);
  const [commentID, setCommentID] = useState(null);
  const [commentUserID, setCommentUserID] = useState(null);
  const [comment, setComment] = useState(null);
  const [commentEmail, setCommentEmail] = useState(null);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect check for sessionToken", sessionToken);

    if ((IsEmpty(userState) === false)) {
      setTxtEmail(userState.email);
    };

  }, [userState]);


  const addComment = () => {
    // console.log(componentName, GetDateTime(), "addComment baseURL", baseURL);

    clearMessages();
    setCommentRecordAdded(null);
    setErrComment("");
    setErrEmail("");

    setCommentItem(null);
    setCommentID(null);
    setCommentUserID(null);
    setComment(null);
    setCommentEmail(null);

    let commentValidated = false;
    let emailValidated = false;
    let formValidated = false;

    if (IsEmpty(txtComment) === false) {
      if (txtComment.trim().length > 0) {
        commentValidated = true;
        setErrComment("");
        // console.log(componentName, GetDateTime(), "addComment Valid Comment");
        // console.log(componentName, GetDateTime(), "addComment commentValidated true", commentValidated);
      } else {
        commentValidated = false;
        setErrComment("Please enter a comment.");
        // console.log(componentName, GetDateTime(), "addComment Invalid Comment");
        // console.log(componentName, GetDateTime(), "addComment commentValidated false", commentValidated);
      };
    };

    if (IsEmpty(txtEmail) === false) {
      if (txtEmail.trim().length > 0 || requireUserLogin === false) {
        emailValidated = true;
        setErrEmail("");
        // console.log(componentName, GetDateTime(), "addComment Valid email");
        // console.log(componentName, GetDateTime(), "addComment emailValidated true", emailValidated);
      } else {
        emailValidated = false;
        setErrEmail("Please enter an email address.");
        // console.log(componentName, GetDateTime(), "addComment Invalid email");
        // console.log(componentName, GetDateTime(), "addComment emailValidated false", emailValidated);
      };
    };

    if (commentValidated === true /*&& emailValidated === true*/) {
      formValidated = true;
      // console.log(componentName, GetDateTime(), "addComment Valid Form");
      // console.log(componentName, GetDateTime(), "addComment formValidated true", formValidated);
    } else {
      formValidated = false;
      // console.log(componentName, GetDateTime(), "addComment Invalid Form");
      // console.log(componentName, GetDateTime(), "addComment formValidated false", formValidated);
    };

    // console.log(componentName, GetDateTime(), "addComment emailValidated", emailValidated);
    // console.log(componentName, GetDateTime(), "addComment categoryIDValidated", categoryIDValidated);
    // console.log(componentName, GetDateTime(), "addComment formValidated", formValidated);

    if (formValidated === true) {

      if (IsEmpty(txtComment) === false /*&& IsEmpty(txtEmail) === false*/) {

        let commentObject = {
          comment: txtComment.trim(),
          userID: userState.userID,
          email: txtEmail.trim()
          // email: userState.email
        };

        // console.log(componentName, GetDateTime(), "addComment commentObject", commentObject);

        let url = baseURL + "comments/";
        // console.log(componentName, GetDateTime(), "addComment url", url);

        if ((IsEmpty(sessionToken) === false) || requireUserLogin === false) {

          let headerObject = new Headers({ "Content-Type": "application/json" });

          // * If the user isn't logged in and user login isn't required, then it isn't added to the Authorization header
          if (IsEmpty(sessionToken) === false) {
            Object.assign(headerObject, { "Authorization": sessionToken });
          };

          fetch(url, {
            method: "POST",
            headers: headerObject,
            body: JSON.stringify({ comment: commentObject })
          })
            .then(response => {
              // console.log(componentName, GetDateTime(), "addComment response", response);
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
              // console.log(componentName, GetDateTime(), "addComment data", data);

              setCommentRecordAdded(data.recordAdded);
              addMessage(data.message);

              if (data.recordAdded === true) {

                setCommentItem(data.records[0]);
                setCommentID(data.records[0].CommentID);
                setCommentUserID(data.records[0].userID);
                setComment(data.records[0].Comment);
                setCommentEmail(data.records[0].email);

                // ? Would still work if the createDate and updateDate were left out?
                // dispatch(addStateTitle([{titleID: data.records[0].titleID, email: data.records[0].Email, titleSort: data.records[0].titleSort, titleURL: data.records[0].titleURL, authorFirstName: data.records[0].authorFirstName, authorLastName: data.records[0].authorLastName, publicationDate: data.records[0].publicationDate, imageName: data.records[0].imageName, categoryID: data.records[0].categoryID, Comment: data.records[0].Comment, urlPKDweb: data.records[0].urlPKDweb, active: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate}]));
                // ? Add to local storage also?

              } else {
                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);
              };

            })
            .catch(error => {
              console.error(componentName, GetDateTime(), "addComment error", error);
              // console.error(componentName, GetDateTime(), "addComment error.name", error.name);
              // console.error(componentName, GetDateTime(), "addComment error.message", error.message);
              addErrorMessage(error.name + ": " + error.message);
            });

        };

      };

    };
  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect commentRecordAdded", commentRecordAdded);
    if (IsEmpty(commentRecordAdded) === false && commentRecordAdded === true) {
      clearMessages();
      setErrComment("");
      setErrEmail("");
      setCommentRecordAdded(null);
      // setModal(false);
      toggle();
    };

  }, [commentRecordAdded]);


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

      {appAllowUserInteractions === true && ((IsEmpty(sessionToken) === false) || requireUserLogin === false) && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Comment</Button></span> : null}

      {appAllowUserInteractions === true && ((IsEmpty(sessionToken) === false) || requireUserLogin === false) && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Add Comment</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>
            <FormGroup>

              <Label for="txtComment">Comment</Label>
              <Input type="textarea" id="txtComment" rows={10} value={txtComment} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtComment(event.target.value); }} />
              {IsEmpty(errComment) === false ? <Alert color="danger">{errComment}</Alert> : null}

            </FormGroup>
            <FormGroup>

              <Label for="txtEmail">Email Address</Label>
              <Input type="text" id="txtEmail" value={txtEmail} onChange={(event) => { setTxtEmail(event.target.value); }} />
              {IsEmpty(errEmail) === false ? <Alert color="danger">{errEmail}</Alert> : null}

            </FormGroup>

            <ModalFooter>

              <Button outline size="lg" color="primary" onClick={addComment}>Add Comment</Button>
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default AddComment;
