import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Plus } from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, encodeURL } from "../../app/sharedFunctions";
import { addStateCategory } from "../../bibliographyData/categoriesSlice";
import { addStateURL } from "../../app/urlsSlice";

const AddCategory = (props) => {

  const componentName = "AddCategory.js";

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
  const [categoryRecordAdded, setCategoryRecordAdded] = useState(null);

  const [txtCategory, setTxtCategory] = useState("");

  const [errCategory, setErrCategory] = useState("");

  // const [categoryItem, setCategoryItem] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [category, setCategory] = useState(null);
  const [sortID, setSortID] = useState(null);
  const [active, setActive] = useState(null);


  const addCategory = () => {
    // console.log(componentName, GetDateTime(), "addCategory");
    // console.log(componentName, GetDateTime(), "addCategory baseURL", baseURL);

    clearMessages();
    setCategoryRecordAdded(null);

    // setCategoryItem(null);
    setCategoryID(null);
    setCategory(null);
    setSortID(null);
    setActive(null);

    let categoryValidated = false;
    let formValidated = false;

    if (IsEmpty(txtCategory) === false) {
      if (txtCategory.trim().length > 0) {
        categoryValidated = true;
        setErrCategory("");
        // console.log(componentName, GetDateTime(), "addCategory Valid Category");
        // console.log(componentName, GetDateTime(), "addCategory categoryValidated true", categoryValidated);
      } else {
        categoryValidated = false;
        setErrCategory("Please enter a category.");
        // console.log(componentName, GetDateTime(), "addCategory Invalid Category");
        // console.log(componentName, GetDateTime(), "addCategory categoryValidated false", categoryValidated);
      };
    };

    if (categoryValidated === true) {
      formValidated = true;
      // console.log(componentName, GetDateTime(), "addCategory Valid Form");
      // console.log(componentName, GetDateTime(), "addCategory formValidated true", formValidated);
    } else {
      formValidated = false;
      // console.log(componentName, GetDateTime(), "addCategory Invalid Form");
      // console.log(componentName, GetDateTime(), "addCategory formValidated false", formValidated);
    };

    // console.log(componentName, GetDateTime(), "addCategory categoryValidated", categoryValidated);
    // console.log(componentName, GetDateTime(), "addCategory formValidated", formValidated);

    if (formValidated === true) {

      if (IsEmpty(txtCategory) === false) {

        let categoryObject = {
          category: txtCategory.trim()
        };

        // console.log(componentName, GetDateTime(), "addCategory categoryObject", categoryObject);

        let url = baseURL + "categories/";
        // console.log(componentName, GetDateTime(), "addCategory url", url);

        if (IsEmpty(sessionToken) === false) {

          fetch(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": sessionToken
            }),
            body: JSON.stringify({ category: categoryObject })
          })
            .then(response => {
              // console.log(componentName, GetDateTime(), "addCategory response", response);
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
              console.log(componentName, GetDateTime(), "addCategory data", data);

              setCategoryRecordAdded(data.recordAdded);
              addMessage(data.message);

              if (data.recordAdded === true) {

                // setCategoryItem(data);

                setCategoryID(data.categoryID);
                setCategory(data.category);
                setSortID(data.sortID);
                setActive(data.active);

                // ? Would still work if the createDate and updateDate were left out?
                dispatch(addStateCategory([{ categoryID: data.categoryID, category: data.category, sortID: data.sortID, active: data.active, createDate: data.createDate, updateDate: data.updateDate }]));
                // ? Add to local storage also?

                dispatch(addStateURL([{ linkName: encodeURL(data.category), linkType: "category", linkID: data.categoryID }]));

              } else {
                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);
              };

            })
            .catch(error => {
              console.log(componentName, GetDateTime(), "addCategory error", error);
              // console.log(componentName, GetDateTime(), "addCategory error.name", error.name);
              // console.log(componentName, GetDateTime(), "addCategory error.message", error.message);
              addErrorMessage(error.name + ": " + error.message);
            });

        };

      };

    };

  };

  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect categoryRecordAdded", categoryRecordAdded);
    if (IsEmpty(categoryRecordAdded) === false && categoryRecordAdded === true) {
      clearMessages();
      setCategoryRecordAdded(null);
      // setModal(false);
      toggle();
    };

  }, [categoryRecordAdded]);


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

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Category</Button></span> : null}

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="md">
        <ModalHeader toggle={toggle}>Add Category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>
            <FormGroup>

              <Label for="txtCategory">Category</Label>
              <Input type="text" id="txtCategory" value={txtCategory} onChange={(event) => {/*console.log(event.target.value);*/ setTxtCategory(event.target.value); }} />
              {IsEmpty(errCategory) === false ? <Alert color="danger">{errCategory}</Alert> : null}

            </FormGroup>

            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={addCategory}>Add Category</Button>
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default AddCategory;
