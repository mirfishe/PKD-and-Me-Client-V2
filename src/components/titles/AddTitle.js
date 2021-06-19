import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Image, Plus } from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, createTitleURL, createImageName } from "../../app/sharedFunctions";
import { addStateTitle } from "../../bibliographyData/titlesSlice";
import { addStateURL } from "../../app/urlsSlice";

const AddTitle = (props) => {

  const componentName = "AddTitle.js";

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

  const [categoryMessage, setCategoryMessage] = useState("");
  const [errCategoryMessage, setErrCategoryMessage] = useState("");
  const [categoryResultsFound, setCategoryResultsFound] = useState(null);

  const categoryListState = useSelector(state => state.categories.arrayCategories);
  // console.log(componentName, GetDateTime(), "categoryListState", categoryListState);

  const categoryList = categoryListState.filter(category => category.active === true || category.active === 1);
  // console.log(componentName, GetDateTime(), "categoryList", categoryList);

  // categoryList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);
  // * Sort the list alphabetically instead of by sortID
  categoryList.sort((a, b) => (a.category > b.category) ? 1 : -1);

  // ! This code is causing React to have too many re-renders in this location
  // if (categoryList.length < 1) {
  //     console.log(componentName, GetDateTime(), "categoryList is empty", categoryList.length);
  //     setErrCategoryMessage("categoryList is empty", categoryList.length);
  //     setCategoryResultsFound(false);
  // } else {
  //     console.log(componentName, GetDateTime(), "categoryList.length", categoryList.length);
  //     setCategoryMessage("categoryList.length", categoryList.length);
  //     setCategoryResultsFound(true);
  // };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect categoryList", categoryList);

    if (categoryList.length < 1) {
      console.log(componentName, GetDateTime(), "categoryList is empty", categoryList.length);
      setErrCategoryMessage("categoryList is empty", categoryList.length);
      setCategoryResultsFound(false);
    } else {
      // console.log(componentName, GetDateTime(), "useEffect categoryList.length", categoryList.length);
      // setCategoryMessage("categoryList.length", categoryList.length);
      setCategoryResultsFound(true);
    };

    // setDdCategoryID(getCategoryIDFromCategoryName(props.categoryName));

  }, [categoryList]);


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
  const [titleRecordAdded, setTitleRecordAdded] = useState(null);

  const [txtTitleName, setTxtTitleName] = useState("");
  const [txtTitleURL, setTxtTitleURL] = useState("");
  const [txtAuthorFirstName, setTxtAuthorFirstName] = useState("");
  const [txtAuthorLastName, setTxtAuthorLastName] = useState("");
  const [txtPublicationDate, setTxtPublicationDate] = useState("");
  const [txtImageName, setTxtImageName] = useState("");
  const [ddCategoryID, setDdCategoryID] = useState("");
  const [txtShortDescription, setTxtShortDescription] = useState("");
  const [txtUrlPKDweb, setTxtUrlPKDweb] = useState("");

  const [errTitleName, setErrTitleName] = useState("");
  const [errCategoryID, setErrCategoryID] = useState("");

  const [titleItem, setTitleItem] = useState(null);
  const [titleID, setTitleID] = useState(null);
  const [titleName, setTitleName] = useState(null);
  const [titleSort, setTitleSort] = useState(null);
  const [titleURL, setTitleURL] = useState(null);
  const [authorFirstName, setAuthorFirstName] = useState(null);
  const [authorLastName, setAuthorLastName] = useState(null);
  const [publicationDate, setPublicationDate] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [urlPKDweb, setUrlPKDweb] = useState(null);
  const [active, setActive] = useState(null);


  const addTitle = () => {
    // console.log(componentName, GetDateTime(), "addTitle");
    // console.log(componentName, GetDateTime(), "addTitle baseURL", baseURL);

    clearMessages();
    setTitleRecordAdded(null);
    setErrTitleName("");
    setErrCategoryID("");

    setTitleItem(null);
    setTitleID(null);
    setTitleName(null);
    setTitleSort(null);
    setTitleURL(null);
    setAuthorFirstName(null);
    setAuthorLastName(null);
    setPublicationDate(null);
    setImageName(null);
    setCategoryID(null);
    setShortDescription(null);
    setUrlPKDweb(null);
    setActive(null);

    let titleNameValidated = false;
    let categoryIDValidated = false;
    let formValidated = false;

    if (IsEmpty(txtTitleName) === false) {
      if (txtTitleName.trim().length > 0) {
        titleNameValidated = true;
        setErrTitleName("");
        // console.log(componentName, GetDateTime(), "addTitle Valid TitleName");
        // console.log(componentName, GetDateTime(), "addTitle titleNameValidated true", titleNameValidated);
      } else {
        titleNameValidated = false;
        setErrTitleName("Please enter a title.");
        // console.log(componentName, GetDateTime(), "addTitle Invalid TitleName");
        // console.log(componentName, GetDateTime(), "addTitle titleNameValidated false", titleNameValidated);
      };
    };

    if (IsEmpty(ddCategoryID) === false) {
      categoryIDValidated = true;
      setErrCategoryID("");
      // console.log(componentName, GetDateTime(), "addTitle Valid CategoryID");
      // console.log(componentName, GetDateTime(), "addTitle categoryIDValidated true", categoryIDValidated);
    } else {
      categoryIDValidated = false;
      setErrCategoryID("Please select a category.");
      // console.log(componentName, GetDateTime(), "addTitle Invalid CategoryID");
      // console.log(componentName, GetDateTime(), "addTitle categoryIDValidated false", categoryIDValidated);
    };

    if (titleNameValidated === true && categoryIDValidated === true) {
      formValidated = true;
      // console.log(componentName, GetDateTime(), "addTitle Valid Form");
      // console.log(componentName, GetDateTime(), "addTitle formValidated true", formValidated);
    } else {
      formValidated = false;
      // console.log(componentName, GetDateTime(), "addTitle Invalid Form");
      // console.log(componentName, GetDateTime(), "addTitle formValidated false", formValidated);
    };

    // console.log(componentName, GetDateTime(), "addTitle titleNameValidated", titleNameValidated);
    // console.log(componentName, GetDateTime(), "addTitle categoryIDValidated", categoryIDValidated);
    // console.log(componentName, GetDateTime(), "addTitle formValidated", formValidated);

    if (formValidated === true) {

      if (IsEmpty(txtTitleName) === false) {

        // console.log(componentName, GetDateTime(), "addEdition typeof ddCategoryID", typeof ddCategoryID);

        // console.log(componentName, GetDateTime(), "addEdition parseInt(ddCategoryID)", parseInt(ddCategoryID));

        let titleObject = {
          titleName: txtTitleName.trim(),
          // authorFirstName: txtAuthorFirstName.trim(),
          // authorLastName: txtAuthorLastName.trim(),
          // imageName: txtImageName.trim(),
          categoryID: parseInt(ddCategoryID)
          // shortDescription: txtShortDescription.trim(),
          // urlPKDweb: txtUrlPKDweb.trim()
        };

        // * If the user doesn't enter a title URL, then it isn't added/updated
        if (IsEmpty(txtTitleURL) === false) {
          if (txtTitleURL.trim().length !== 0) {
            Object.assign(titleObject, { titleURL: txtTitleURL.trim() });
          };
        };

        // * If the user doesn't enter an author first name, then it isn't added/updated
        if (IsEmpty(txtAuthorFirstName) === false) {
          if (txtAuthorFirstName.trim().length !== 0) {
            Object.assign(titleObject, { authorFirstName: txtAuthorFirstName.trim() });
          };
        };

        // * If the user doesn't enter an author last name, then it isn't added/updated
        if (IsEmpty(txtAuthorLastName) === false) {
          if (txtAuthorLastName.trim().length !== 0) {
            Object.assign(titleObject, { authorLastName: txtAuthorLastName.trim() });
          };
        };

        // * If the user doesn't enter an image name then it isn't added/updated
        if (IsEmpty(txtImageName) === false) {
          if (txtImageName.trim().length !== 0) {
            Object.assign(titleObject, { imageName: txtImageName.trim() });
          };
        };

        // * If the user doesn't enter a publication date, then it isn't added/updated
        if (IsEmpty(txtPublicationDate) === false) {
          if (txtPublicationDate.trim().length !== 0) {
            Object.assign(titleObject, { publicationDate: txtPublicationDate.trim() });
          };
        };


        // * If the user doesn't enter a short description, then it isn't added/updated
        if (IsEmpty(txtShortDescription) === false) {
          if (txtShortDescription.trim().length !== 0) {
            Object.assign(titleObject, { shortDescription: txtShortDescription.trim() });
          };
        };

        // * If the user doesn't enter a url for PKDweb, then it isn't added/updated
        if (IsEmpty(txtUrlPKDweb) === false) {
          if (txtUrlPKDweb.trim().length !== 0) {
            Object.assign(titleObject, { urlPKDweb: txtUrlPKDweb.trim() });
          };
        };

        // console.log(componentName, GetDateTime(), "addTitle titleObject", titleObject);

        let url = baseURL + "titles/";
        // console.log(componentName, GetDateTime(), "addTitle url", url);

        if (IsEmpty(sessionToken) === false) {

          fetch(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": sessionToken
            }),
            body: JSON.stringify({ title: titleObject })
          })
            .then(response => {
              // console.log(componentName, GetDateTime(), "addTitle response", response);
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
              console.log(componentName, GetDateTime(), "addTitle data", data);

              setTitleRecordAdded(data.recordAdded);
              addMessage(data.message);

              if (data.recordAdded === true) {

                setTitleItem(data.records[0]);
                setTitleID(data.records[0].titleID);
                setTitleName(data.records[0].titleName);
                setTitleSort(data.records[0].titleSort);
                setTitleURL(data.records[0].titleURL);
                setAuthorFirstName(data.records[0].authorFirstName);
                setAuthorLastName(data.records[0].authorLastName);
                setPublicationDate(data.records[0].publicationDate);
                setImageName(data.records[0].imageName);
                setCategoryID(data.records[0].categoryID);
                setShortDescription(data.records[0].shortDescription);
                setUrlPKDweb(data.records[0].urlPKDweb);
                setActive(data.records[0].active);

                let categoryItem = categoryList.filter(category => category.categoryID === data.records[0].categoryID);
                // category: {categoryID: categoryItem.categoryID, category: categoryItem.category, sortID: categoryItem.sortID, active: categoryItem.active, createDate: categoryItem.createDate, updateDate: categoryItem.updateDate}
                categoryItem = categoryItem[0];

                // console.log(componentName, GetDateTime(), "addTitle typeof data.records[0].categoryID", typeof data.records[0].categoryID);
                // console.log(componentName, GetDateTime(), "addTitle categoryItem", categoryItem);

                // ? Would still work if the createDate and updateDate were left out?
                dispatch(addStateTitle([{ titleID: data.records[0].titleID, titleName: data.records[0].titleName, titleSort: data.records[0].titleSort, titleURL: data.records[0].titleURL, authorFirstName: data.records[0].authorFirstName, authorLastName: data.records[0].authorLastName, publicationDate: data.records[0].publicationDate, imageName: data.records[0].imageName, categoryID: data.records[0].categoryID, shortDescription: data.records[0].shortDescription, urlPKDweb: data.records[0].urlPKDweb, active: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate/*, category: { categoryID: categoryItem.categoryID, category: categoryItem.category, sortID: categoryItem.sortID, active: categoryItem.active, createDate: categoryItem.createDate, updateDate: categoryItem.updateDate }*/, category: categoryItem.category, sortID: categoryItem.sortID, categoryActive: categoryItem.active, categoryCreateDate: categoryItem.createDate, categoryUpdatedDate: categoryItem.updateDate }]));
                // ? Add to local storage also?

                dispatch(addStateURL([{ linkName: data.records[0].titleURL, linkType: "title", linkID: data.records[0].titleID }]));

              } else {
                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);
              };

            })
            .catch(error => {
              console.log(componentName, GetDateTime(), "addTitle error", error);
              // console.log(componentName, GetDateTime(), "addTitle error.name", error.name);
              // console.log(componentName, GetDateTime(), "addTitle error.message", error.message);
              addErrorMessage(error.name + ": " + error.message);
            });

        };

      };

    };
  };


  // ! This code is causing React to have too many re-renders in this location
  const getCategoryIDFromCategoryName = (categoryName) => {
    // console.log(componentName, GetDateTime(), "getCategoryIDFromCategoryName categoryName", categoryName);

    if (IsEmpty(categoryName) === false) {
      // console.log(componentName, GetDateTime(), "getCategoryIDFromCategoryName categoryName", categoryName);

      // * Could use a find here also
      const categoryProps = categoryList.filter(category => category.category === categoryName);
      // console.log(componentName, GetDateTime(), "getCategoryIDFromCategoryName categoryProps", categoryProps);

      if (!isNaN(categoryProps[0].categoryID)) {
        // console.log(componentName, GetDateTime(), "getCategoryIDFromCategoryName categoryProps[0].categoryID", categoryProps[0].categoryID);

        // setDdCategoryID(categoryProps[0].categoryID);

        return categoryProps[0].categoryID;

      } else {
        return 0;
      };

    } else {
      return 0;
    };

    // return 0;

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect titleRecordAdded", titleRecordAdded);
    if (IsEmpty(titleRecordAdded) === false && titleRecordAdded === true) {
      clearMessages();
      setErrTitleName("");
      setErrCategoryID("");
      setTitleRecordAdded(null);
      // setModal(false);
      toggle();
    };

  }, [titleRecordAdded]);


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

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Title</Button></span> : null}

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Add Title</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
              {IsEmpty(categoryMessage) === false ? <Alert color="info">{categoryMessage}</Alert> : null}
              {IsEmpty(errCategoryMessage) === false ? <Alert color="danger">{errCategoryMessage}</Alert> : null}
            </FormGroup>

            <FormGroup>

              <Label for="txtTitleName">Title</Label>
              <Input type="text" id="txtTitleName" value={txtTitleName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtTitleName(event.target.value); }} />
              {IsEmpty(errTitleName) === false ? <Alert color="danger">{errTitleName}</Alert> : null}

            </FormGroup>
            <FormGroup>

              <Label for="txtTitleURL">Title URL</Label>
              <Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(event.target.value);*/ setTxtTitleURL(createTitleURL(txtTitleName)); }}>Create Title URL</Button>
              <Input type="text" id="txtTitleURL" value={txtTitleURL} onChange={(event) => {/*console.log(event.target.value);*/ setTxtTitleURL(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtAuthorFirstName">Author First Name</Label>
              <Input type="text" id="txtAuthorFirstName" value={txtAuthorFirstName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtAuthorFirstName(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtAuthorLastName">Author Last Name</Label>
              <Input type="text" id="txtAuthorLastName" value={txtAuthorLastName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtAuthorLastName(event.target.value); }} />

            </FormGroup>

            <FormGroup row>
              <Col>

                {/* {console.log(componentName, GetDateTime(), "ddCategoryID", ddCategoryID)} */}
                <Label id="lblCategoryID" for="lblCategoryID">Category</Label>
                <Input type="select" id="ddCategoryID" value={ddCategoryID} onChange={(event) => {/*console.log(event.target.value);*/ setDdCategoryID(event.target.value); }}>
                  <option value="">Select a Category</option>
                  {categoryList.map((category) => {
                    return (
                      <React.Fragment>
                        {/* {getCategoryIDFromCategoryName(props.categoryName) === category.categoryID ? <option selected value={category.categoryID}>{category.category}</option> : <option key={category.categoryID} value={category.categoryID}>{category.category}</option>} */}
                        <option key={category.categoryID} value={category.categoryID}>{category.category}</option>
                      </React.Fragment>
                    );
                  })}
                </Input>
                {IsEmpty(errCategoryID) === false ? <Alert color="danger">{errCategoryID}</Alert> : null}

              </Col>
              <Col>

                <Label for="txtPublicationDate">Publication Date</Label>
                <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => {/*console.log(event.target.value);*/ setTxtPublicationDate(event.target.value); }} />

              </Col>

            </FormGroup>

            <FormGroup>

              <Label for="txtImageName">Image Name</Label>
              <Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(event.target.value);*/ /*createImageName(txtTitleName);*/ setTxtImageName(createImageName(txtTitleName)); }}>Create Image Name</Button>
              <Input type="text" id="txtImageName" value={txtImageName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtImageName(event.target.value); }} />
              {IsEmpty(txtImageName) === false && txtImageName !== "" ? <img src={txtImageName} alt={txtTitleName} className="coverThumbnail" /> : <Image size="150" className="noImageIcon" />}

            </FormGroup>
            <FormGroup>

              <Label for="txtShortDescription">Short Description</Label>
              <Input type="textarea" id="txtShortDescription" rows={10} value={txtShortDescription} onChange={(event) => {/*console.log(event.target.value);*/ setTxtShortDescription(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtUrlPKDweb">url PKDweb</Label>
              <Input type="text" id="txtUrlPKDweb" value={txtUrlPKDweb} onChange={(event) => {/*console.log(event.target.value);*/ setTxtUrlPKDweb(event.target.value); }} />

            </FormGroup>

            <ModalFooter>

              <Button outline size="lg" color="primary" onClick={addTitle}>Add Title</Button>
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default AddTitle;
