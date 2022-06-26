import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Plus } from 'react-bootstrap-icons';
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime, formatTrim } from "shared-functions";
import { encodeURL, addErrorLog } from "../../utilities/ApplicationFunctions";
import { addStateCategory } from "../../app/categoriesSlice";
import { addStateURL } from "../../app/urlsSlice";

// ! The coding on this component is not finished. -- 03/06/2021 MF

const EditCategory = (props) => {

  const componentName = "EditCategory";

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

    clearMessages();
    setCategoryRecordAdded(null);

    // setCategoryItem(null);
    // setCategoryID(null);
    // setCategory(null);
    // setSortID(null);
    setActive(null);

    let categoryValidated = false;
    let formValidated = false;

    if (isEmpty(txtCategory) === false) {

      if (formatTrim(txtCategory).length > 0) {

        categoryValidated = true;
        setErrCategory("");

      } else {

        categoryValidated = false;
        setErrCategory("Please enter a category.");

      };

    };

    if (categoryValidated === true) {

      formValidated = true;

    } else {

      formValidated = false;

    };


    if (formValidated === true) {

      if (isEmpty(txtCategory) === false) {

        let recordObject = {
          category: formatTrim(txtCategory)
        };


        let url = baseURL + "categories/";

        if (isEmpty(sessionToken) === false) {

          fetch(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": sessionToken
            }),
            body: JSON.stringify({ category: recordObject })
          })
            .then(response => {

              // if (response.ok !== true) {

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
              console.error(componentName, getDateTime(), "addCategory error", error);
              // console.error(componentName, getDateTime(), "addCategory error.name", error.name);
              // console.error(componentName, getDateTime(), "addCategory error.message", error.message);

              addErrorMessage(error.name + ": " + error.message);

              // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

            });

        };

      };

    };

  };


  const updateCategory = (deleteCategory) => {


  };


  const deleteCategory = () => {


  };


  useEffect(() => {

    if (isEmpty(categoryRecordAdded) === false && categoryRecordAdded === true) {

      clearMessages();
      setCategoryRecordAdded(null);

      setTxtCategory("");

      setModal(!modal);

    };

  }, [categoryRecordAdded]);


  useEffect(() => {

    if (isEmpty(categoryRecordUpdated) === false && categoryRecordUpdated === true) {

      clearMessages();
      setCategoryRecordUpdated(null);

      setTxtCategory("");

      setModal(!modal);

    };

    if (isEmpty(categoryRecordDeleted) === false && categoryRecordDeleted === true) {

      clearMessages();
      setCategoryRecordDeleted(null);

      setTxtCategory("");

      setModal(!modal);

    };

  }, [categoryRecordUpdated, categoryRecordDeleted]);


  useEffect(() => {

    if (admin !== true) {

      // return <Redirect to="/" />;
      setModal(false);

    };

  }, [admin]);


  return (
    <React.Fragment>

      {applicationAllowUserInteractions === true && isEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Add Category</Button></span> : null}

      {applicationAllowUserInteractions === true && isEmpty(admin) === false && admin === true && props.displayIcon === true ? <Plus className="add-edit-icon" onClick={(event) => { setModal(!modal); }} /> : null}

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
              <Input type="text" id="txtCategory" value={txtCategory} onChange={(event) => { setTxtCategory(event.target.value); }} />
              {isEmpty(errCategory) === false ? <Alert color="danger">{errCategory}</Alert> : null}
            </FormGroup>

            <ModalFooter>

              {isEmpty(categoryItem) === true ?

                <Button outline size="lg" color="primary" onClick={addCategory}>Add Category</Button>

                :

                <React.Fragment>

                  <Button outline size="lg" color="primary" onClick={(event) => { updateCategory(false); }}>Update Category</Button>

                  {isEmpty(active) === false && (active === false || active === 0) ?

                    <Button outline size="lg" color="danger" onClick={(event) => { updateCategory(false); }}>Undelete/Restore Category</Button>

                    : null}

                  {isEmpty(active) === false && (active === true || active === 1) ?

                    <Button outline size="lg" color="danger" onClick={(event) => { updateCategory(true); }}>Delete Category</Button>

                    : null}

                  <Button outline size="lg" color="warning" onClick={(event) => { deleteCategory(); }}>Hard Delete Category</Button>
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
