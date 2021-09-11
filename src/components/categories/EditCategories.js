import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { PencilSquare } from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";

const EditCategories = (props) => {

  const componentName = "EditCategories.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

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
  const [categoryRecordUpdated, setCategoryRecordUpdated] = useState(null);
  const [categoryRecordDeleted, setCategoryRecordDeleted] = useState(null);

  const [errCategory, setErrCategory] = useState("");
  const [errSortID, setErrSortID] = useState("");

  const categoryListState = useSelector(state => state.categories.arrayCategories);
  // console.log(componentName, GetDateTime(), "categoryListState", categoryListState);

  let categoryList = [];

  if (IsEmpty(admin) === false && admin === true) {
    categoryList = [...categoryListState];
  } else {
    categoryList = categoryListState.filter(category => category.active === true || category.active === 1);
    // categoryList = categoryListState.filter(category => category.categoryActive === true || category.categoryActive === 1);
  };
  // console.log(componentName, GetDateTime(), "categoryList", categoryList);

  categoryList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

  let categoryListForm = [...categoryList];


  const updateCategories = () => {
    // console.log(componentName, GetDateTime(), "updateCategories");

    // Need to restructure the form for this to work
    // let formElements = event.target.elements;
    // console.log(componentName, GetDateTime(), "updateCategories formElements", formElements);

    // for (let i = 0; i < .length; i++) {

    // };


  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect check for admin", admin);

    if (admin !== true) {
      // return <Redirect to="/" />;
      setModal(false);
    };

  }, [admin]);


  const toggle = () => {
    setModal(!modal);
  };


  return (
    <React.Fragment>

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Edit Categories</Button></span> : null}

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayIcon === true ? <PencilSquare className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Update Categories</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>

            <FormGroup row>
              <Col xs="10">
                <Label for="txtCategory">Category</Label>
              </Col>

              <Col xs="2">
                <Label for="txtSortID">Sort ID</Label>
              </Col>

            </FormGroup>

            {categoryList.map((category) => {

              return (

                <FormGroup row key={category.categoryID}>

                  <Col xs="10">
                    <Input type="text" id={"txtCategory" + category.categoryID} value={category.category} onChange={(event) => { console.log(componentName, GetDateTime(), "event.target.value", event.target.value); console.log(event.target); }} />
                    {/* {IsEmpty(errCategory) === false ? <Alert color="danger">{errCategory}</Alert> : null} */}
                  </Col>

                  <Col xs="2">
                    <Input type="text" id={"txtSortID" + category.categoryID} value={category.sortID} onChange={(event) => { console.log(componentName, GetDateTime(), "event.target.value", event.target.value); console.log(event.target); }} />
                    {/* {IsEmpty(errSortID) === false ? <Alert color="danger">{errSortID}</Alert> : null} */}
                  </Col>

                </FormGroup>

              );
            })}
            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={updateCategories}>Update Categories</Button>
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default EditCategories;
