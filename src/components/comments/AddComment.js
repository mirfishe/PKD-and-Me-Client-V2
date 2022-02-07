import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button, NavItem, NavbarText, NavLink } from "reactstrap";
import { Plus } from 'react-bootstrap-icons';
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime, formatTrim } from "../../utilities/SharedFunctions";
import { addErrorLog } from "../../utilities/ApplicationFunctions";

// ! The coding on this component is not finished. -- 03/06/2021 MF

const AddComment = (props) => {

  const componentName = "AddComment.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, getDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, getDateTime(), "admin", admin);
  const userID = useSelector(state => state.user.userID);
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
  const [commentRecordAdded, setCommentRecordAdded] = useState(null);

  const [txtComment, setTxtComment] = useState("");
  const [txtEmail, setTxtEmail] = useState("");

  const [errComment, setErrComment] = useState("");
  const [errEmail, setErrEmail] = useState("");

  // const [commentItem, setCommentItem] = useState(null);
  // const [commentID, setCommentID] = useState(null);
  // const [commentUserID, setCommentUserID] = useState(null);
  // const [comment, setComment] = useState(null);
  // const [commentEmail, setCommentEmail] = useState(null);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect check for sessionToken", sessionToken);

    if ((isEmpty(userState) === false)) {

      setTxtEmail(userState.email);

    };

  }, [userState]);


  const addComment = () => {
    // console.log(componentName, getDateTime(), "addComment baseURL", baseURL);

    clearMessages();
    setCommentRecordAdded(null);
    setErrComment("");
    setErrEmail("");

    // setCommentItem(null);
    // setCommentID(null);
    // setCommentUserID(null);
    // setComment(null);
    // setCommentEmail(null);

    let commentValidated = false;
    let emailValidated = false;
    let formValidated = false;

    if (isEmpty(txtComment) === false) {

      if (formatTrim(txtComment).length > 0) {

        commentValidated = true;
        setErrComment("");
        // console.log(componentName, getDateTime(), "addComment Valid Comment");
        // console.log(componentName, getDateTime(), "addComment commentValidated true", commentValidated);

      } else {

        commentValidated = false;
        setErrComment("Please enter a comment.");
        // console.log(componentName, getDateTime(), "addComment Invalid Comment");
        // console.log(componentName, getDateTime(), "addComment commentValidated false", commentValidated);

      };

    };

    if (isEmpty(txtEmail) === false) {

      if (formatTrim(txtEmail).length > 0 || requireUserLogin === false) {

        emailValidated = true;
        setErrEmail("");
        // console.log(componentName, getDateTime(), "addComment Valid email");
        // console.log(componentName, getDateTime(), "addComment emailValidated true", emailValidated);

      } else {

        emailValidated = false;
        setErrEmail("Please enter an email address.");
        // console.log(componentName, getDateTime(), "addComment Invalid email");
        // console.log(componentName, getDateTime(), "addComment emailValidated false", emailValidated);

      };

    };

    if (commentValidated === true /*&& emailValidated === true*/) {

      formValidated = true;
      // console.log(componentName, getDateTime(), "addComment Valid Form");
      // console.log(componentName, getDateTime(), "addComment formValidated true", formValidated);

    } else {

      formValidated = false;
      // console.log(componentName, getDateTime(), "addComment Invalid Form");
      // console.log(componentName, getDateTime(), "addComment formValidated false", formValidated);

    };

    // console.log(componentName, getDateTime(), "addComment emailValidated", emailValidated);
    // console.log(componentName, getDateTime(), "addComment categoryIDValidated", categoryIDValidated);
    // console.log(componentName, getDateTime(), "addComment formValidated", formValidated);

    if (formValidated === true) {

      if (isEmpty(txtComment) === false /*&& isEmpty(txtEmail) === false*/) {

        let recordObject = {
          comment: formatTrim(txtComment),
          userID: userState.userID,
          email: formatTrim(txtEmail)
          // email: userState.email
        };

        // console.log(componentName, getDateTime(), "addComment recordObject", recordObject);

        let url = baseURL + "comments/";
        // console.log(componentName, getDateTime(), "addComment url", url);

        if ((isEmpty(sessionToken) === false) || requireUserLogin === false) {

          let headerObject = new Headers({ "Content-Type": "application/json" });

          // * If the user isn't logged in and user login isn't required, then it isn't added to the Authorization header
          if (isEmpty(sessionToken) === false) {

            Object.assign(headerObject, { "Authorization": sessionToken });

          };

          fetch(url, {
            method: "POST",
            headers: headerObject,
            body: JSON.stringify({ comment: recordObject })
          })
            .then(response => {
              // console.log(componentName, getDateTime(), "addComment response", response);

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
              // console.log(componentName, getDateTime(), "addComment data", data);

              setCommentRecordAdded(data.transactionSuccess);
              addMessage(data.message);

              if (data.transactionSuccess === true) {

                // setCommentItem(data.records[0]);
                // setCommentID(data.records[0].CommentID);
                // setCommentUserID(data.records[0].userID);
                // setComment(data.records[0].Comment);
                // setCommentEmail(data.records[0].email);

                // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
                // dispatch(addStateTitle([{titleID: data.records[0].titleID, email: data.records[0].Email, titleSort: data.records[0].titleSort, titleURL: data.records[0].titleURL, authorFirstName: data.records[0].authorFirstName, authorLastName: data.records[0].authorLastName, publicationDate: data.records[0].publicationDate, imageName: data.records[0].imageName, categoryID: data.records[0].categoryID, Comment: data.records[0].Comment, urlPKDWeb: data.records[0].urlPKDWeb, active: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate}]));

                // ? Add to local storage also? -- 03/06/2021 MF

              } else {

                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);

              };

            })
            .catch((error) => {
              console.error(componentName, getDateTime(), "addComment error", error);
              // console.error(componentName, getDateTime(), "addComment error.name", error.name);
              // console.error(componentName, getDateTime(), "addComment error.message", error.message);

              addErrorMessage(error.name + ": " + error.message);

              // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

            });

        };

      };

    };
  };


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect commentRecordAdded", commentRecordAdded);

    if (isEmpty(commentRecordAdded) === false && commentRecordAdded === true) {

      clearMessages();
      setErrComment("");
      setErrEmail("");
      setCommentRecordAdded(null);

      setTxtComment("");
      setTxtEmail("");

      setModal(!modal);

    };

  }, [commentRecordAdded]);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect check for sessionToken", sessionToken);

    if ((isEmpty(sessionToken) === false) || requireUserLogin === false) {

      // return <Redirect to="/" />;
      setModal(false);

    };

  }, [sessionToken]);


  return (
    <React.Fragment>

      {/* {applicationAllowUserInteractions === true && ((isEmpty(sessionToken) === false) || requireUserLogin === false) && props.displayButton === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Add Comment</Button></span> : null}

      {applicationAllowUserInteractions === true && ((isEmpty(sessionToken) === false) || requireUserLogin === false) && props.displayIcon === true ? <Plus className="add-edit-icon" onClick={(event) => { setModal(!modal); }} /> : null} */}

      {applicationAllowUserInteractions === true && ((isEmpty(sessionToken) === false) || requireUserLogin === false) ?

        <React.Fragment>
          {/* <NavItem> */}
          {/* <NavItem className="mx-3 my-2">
          <a href="#" onClick={(event) => { setModal(!modal); }}><NavbarText>Add Comment</NavbarText></a> */}
          <NavLink onClick={(event) => { setModal(!modal); }}><NavbarText>Add Comment</NavbarText></NavLink>
          {/* </NavItem> */}
        </React.Fragment>

        : null}

      <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="lg">
        <ModalHeader toggle={(event) => { setModal(!modal); }}>Add Comment</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>

            <FormGroup>
              <Label for="txtComment">Comment</Label>
              <Input type="textarea" id="txtComment" rows={10} value={txtComment} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtComment(event.target.value); }} />
              {isEmpty(errComment) === false ? <Alert color="danger">{errComment}</Alert> : null}
            </FormGroup>

            <FormGroup>
              <Label for="txtEmail">Email Address</Label>
              <Input type="text" id="txtEmail" value={txtEmail} onChange={(event) => { setTxtEmail(event.target.value); }} />
              {isEmpty(errEmail) === false ? <Alert color="danger">{errEmail}</Alert> : null}
            </FormGroup>

            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={addComment}>Add Comment</Button>
              <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button>
            </ModalFooter>

          </Form>
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
};

export default AddComment;
