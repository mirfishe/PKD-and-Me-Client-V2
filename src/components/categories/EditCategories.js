import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { PencilSquare } from 'react-bootstrap-icons';
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime, isNonEmptyArray } from "shared-functions";

// ! The coding on this component is not finished. -- 03/06/2021 MF

const EditCategories = (props) => {

  const componentName = "EditCategories";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

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

  let categoryList = [];

  if (isEmpty(admin) === false && admin === true) {

    categoryList = [...categoryListState];

  } else {

    categoryList = categoryListState.filter(category => category.active === true || category.active === 1);
    // categoryList = categoryListState.filter(category => category.categoryActive === true || category.categoryActive === 1);

  };


  categoryList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

  let categoryListForm = [...categoryList];


  const updateCategories = () => {

    // Need to restructure the form for this to work
    // let formElements = event.target.elements;

    // if (isNonEmptyArray() === true) {

    // for (let i = 0; i < .length; i++) {

    // };

    // };

  };


  useEffect(() => {

    if (admin !== true) {

      // return <Redirect to="/" />;
      setModal(false);

    };

  }, [admin]);


  return (
    <React.Fragment>

      {applicationAllowUserInteractions === true && isEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Edit Categories</Button></span> : null}

      {applicationAllowUserInteractions === true && isEmpty(admin) === false && admin === true && props.displayIcon === true ? <PencilSquare className="add-edit-icon" onClick={(event) => { setModal(!modal); }} /> : null}

      <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="lg">
        <ModalHeader toggle={(event) => { setModal(!modal); }}>Update Categories</ModalHeader>
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

            {isNonEmptyArray(categoryList) === true ?

              <React.Fragment>

                {categoryList.map((category) => {

                  return (

                    <FormGroup row key={category.categoryID}>

                      <Col xs="10">
                        <Input type="text" id={"txtCategory" + category.categoryID} value={category.category} onChange={(event) => { console.log(componentName, getDateTime(), "event.target.value", event.target.value); console.log(event.target); }} />
                        {/* {isEmpty(errCategory) === false ? <Alert color="danger">{errCategory}</Alert> : null} */}
                      </Col>

                      <Col xs="2">
                        <Input type="text" id={"txtSortID" + category.categoryID} value={category.sortID} onChange={(event) => { console.log(componentName, getDateTime(), "event.target.value", event.target.value); console.log(event.target); }} />
                        {/* {isEmpty(errSortID) === false ? <Alert color="danger">{errSortID}</Alert> : null} */}
                      </Col>

                    </FormGroup>

                  );
                })}

              </React.Fragment>

              : null}

            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={updateCategories}>Update Categories</Button>
              <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button>
            </ModalFooter>

          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default EditCategories;
