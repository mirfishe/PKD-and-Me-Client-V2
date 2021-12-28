import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Plus } from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, FormatTrim } from "../../utilities/SharedFunctions";
import { encodeURL, LogError } from "../../utilities/AppFunctions";
import { addStateCategory } from "../../app/categoriesSlice";
import { addStateURL } from "../../app/urlsSlice";

// ! The coding on this component is not finished. -- 03/06/2021 MF

const EditCategory = (props) => {

  const componentName = "EditCategory.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
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
  const [categoryRecordUpdated, setCategoryRecordUpdated] = useState(null);
  const [categoryRecordDeleted, setCategoryRecordDeleted] = useState(null);

  const [txtCategory, setTxtCategory] = useState("");

  const [errCategory, setErrCategory] = useState("");

  const [categoryItem, setCategoryItem] = useState(null);
  // const [categoryID, setCategoryID] = useState(null);
  // const [category, setCategory] = useState(null);
  // const [sortID, setSortID] = useState(null);
  const [active, setActive] = useState(null);


  const addCategory = () => {
    // console.log(componentName, GetDateTime(), "addCategory baseURL", baseURL);

    clearMessages();
    setCategoryRecordAdded(null);

    // setCategoryItem(null);
    // setCategoryID(null);
    // setCategory(null);
    // setSortID(null);
    setActive(null);

    let categoryValidated = false;
    let formValidated = false;

    if (IsEmpty(txtCategory) === false) {

      if (FormatTrim(txtCategory).length > 0) {

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

        let recordObject = {
          category: FormatTrim(txtCategory)
        };

        // console.log(componentName, GetDateTime(), "addCategory recordObject", recordObject);

        let url = baseURL + "categories/";
        // console.log(componentName, GetDateTime(), "addCategory url", url);

        if (IsEmpty(sessionToken) === false) {

          fetch(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": sessionToken
            }),
            body: JSON.stringify({ category: recordObject })
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
              // console.log(componentName, GetDateTime(), "addCategory data", data);

              setCategoryRecordAdded(data.transactionSuccess);
              addMessage(data.message);

              if (data.transactionSuccess === true) {

                // setCategoryItem(data.records[0]);

                // setCategoryID(data.records[0].categoryID);
                // setCategory(data.records[0].category);
                // setSortID(data.records[0].sortID);
                setActive(data.records[0].active);

                // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
                dispatch(addStateCategory([{ categoryID: data.records[0].categoryID, category: data.records[0].category, sortID: data.records[0].sortID, active: data.records[0].active, categoryActive: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate }]));

                // ? Add to local storage also? -- 03/06/2021 MF

                dispatch(addStateURL([{ linkName: encodeURL(data.records[0].category), linkType: "category", linkID: data.records[0].categoryID }]));

              } else {

                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);

              };

            })
            .catch((error) => {
              console.error(componentName, GetDateTime(), "addCategory error", error);
              // console.error(componentName, GetDateTime(), "addCategory error.name", error.name);
              // console.error(componentName, GetDateTime(), "addCategory error.message", error.message);

              addErrorMessage(error.name + ": " + error.message);

              // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

            });

        };

      };

    };

  };


  const updateCategory = (deleteCategory) => {
    // console.log(componentName, GetDateTime(), "updateCategory deleteCategory", deleteCategory);


  };


  const deleteCategory = () => {
    // console.log(componentName, GetDateTime(), "deleteCategory baseURL", baseURL);


  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect categoryRecordAdded", categoryRecordAdded);

    if (IsEmpty(categoryRecordAdded) === false && categoryRecordAdded === true) {

      clearMessages();
      setCategoryRecordAdded(null);

      setTxtCategory("");

      setModal(!modal);

    };

  }, [categoryRecordAdded]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect categoryRecordUpdated", categoryRecordUpdated);
    // console.log(componentName, GetDateTime(), "useEffect categoryRecordDeleted", categoryRecordDeleted);

    if (IsEmpty(categoryRecordUpdated) === false && categoryRecordUpdated === true) {

      clearMessages();
      setCategoryRecordUpdated(null);

      setTxtCategory("");

      setModal(!modal);

    };

    if (IsEmpty(categoryRecordDeleted) === false && categoryRecordDeleted === true) {

      clearMessages();
      setCategoryRecordDeleted(null);

      setTxtCategory("");

      setModal(!modal);

    };

  }, [categoryRecordUpdated, categoryRecordDeleted]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect check for admin", admin);

    if (admin !== true) {

      // return <Redirect to="/" />;
      setModal(false);

    };

  }, [admin]);


  return (
    <React.Fragment>

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Add Category</Button></span> : null}

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayIcon === true ? <Plus className="add-edit-icon" onClick={(event) => { setModal(!modal); }} /> : null}

      <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="md">
        <ModalHeader toggle={(event) => { setModal(!modal); }}>Add Category</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>

            <FormGroup>
              <Label for="txtCategory">Category</Label>
              <Input type="text" id="txtCategory" value={txtCategory} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtCategory(event.target.value); }} />
              {IsEmpty(errCategory) === false ? <Alert color="danger">{errCategory}</Alert> : null}
            </FormGroup>

            <ModalFooter>

              {IsEmpty(categoryItem) === true ?

                <Button outline size="lg" color="primary" onClick={addCategory}>Add Category</Button>

                :

                <React.Fragment>

                  <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateCategory(false); }}>Update Category</Button>

                  {IsEmpty(active) === false && (active === false || active === 0) ?

                    <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateCategory(false); }}>Undelete/Restore Category</Button>

                    : null}

                  {IsEmpty(active) === false && (active === true || active === 1) ?

                    <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateCategory(true); }}>Delete Category</Button>

                    : null}

                  <Button outline size="lg" color="warning" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ deleteCategory(); }}>Hard Delete Category</Button>
                </React.Fragment>

              }

              <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button>

            </ModalFooter>

          </Form>
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
};

export default EditCategory;
