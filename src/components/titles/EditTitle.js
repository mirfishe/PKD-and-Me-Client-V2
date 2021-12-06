import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Image, PencilSquare, Plus } from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, createTitleURL, createImageName } from "../../app/sharedFunctions";
import { addStateTitle, updateStateTitle, deleteStateTitle } from "../../bibliographyData/titlesSlice";
import { updateStateEdition, deleteStateEdition } from "../../bibliographyData/editionsSlice";
import { addStateURL, updateStateURL, deleteStateURL, setPageURL } from "../../app/urlsSlice";

const EditTitle = (props) => {

  const componentName = "EditTitle.js";

  const dispatch = useDispatch();
  const history = useHistory();

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
  // const categoryList = categoryListState.filter(category => category.categoryActive === true || category.categoryActive === 1);
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
  const [titleRecordUpdated, setTitleRecordUpdated] = useState(null);
  const [titleRecordDeleted, setTitleRecordDeleted] = useState(null);
  const [editionRecordUpdated, setEditionRecordUpdated] = useState(null);
  const [editionRecordDeleted, setEditionRecordDeleted] = useState(null);

  const [txtTitleName, setTxtTitleName] = useState("");
  const [txtTitleURL, setTxtTitleURL] = useState("");
  const [txtAuthorFirstName, setTxtAuthorFirstName] = useState("");
  const [txtAuthorLastName, setTxtAuthorLastName] = useState("");
  const [txtSubmissionDate, setTxtSubmissionDate] = useState("");
  const [txtPublicationDate, setTxtPublicationDate] = useState("");
  const [txtImageName, setTxtImageName] = useState("");
  const [ddCategoryID, setDdCategoryID] = useState("");
  const [txtShortDescription, setTxtShortDescription] = useState("");
  const [txtUrlPKDweb, setTxtUrlPKDweb] = useState("");

  const [errTitleName, setErrTitleName] = useState("");
  const [errCategoryID, setErrCategoryID] = useState("");

  const [titleItemIndex, setTitleItemIndex] = useState(null);
  const [titleItem, setTitleItem] = useState(null);
  const [titleID, setTitleID] = useState(null);
  const [titleName, setTitleName] = useState(null);
  const [titleSort, setTitleSort] = useState(null);
  const [titleURL, setTitleURL] = useState(null);
  const [authorFirstName, setAuthorFirstName] = useState(null);
  const [authorLastName, setAuthorLastName] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const [publicationDate, setPublicationDate] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [urlPKDweb, setUrlPKDweb] = useState(null);
  const [active, setActive] = useState(null);

  const editionListState = useSelector(state => state.editions.arrayEditions);
  // console.log(componentName, GetDateTime(), "editionListState", editionListState);
  let editionList = [];

  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, GetDateTime(), "titleListState", titleListState);

  const urlLookup = useSelector(state => state.urls.arrayURLs);

  const linkItem = useSelector(state => state.urls.linkItem);
  // console.log(componentName, GetDateTime(), "linkItem", linkItem);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect titleListState", titleListState);

    if (IsEmpty(props.titleID) === false) {

      let titleObject = titleListState.find(title => title.titleID === props.titleID);
      // console.log(componentName, GetDateTime(), "useEffect titleObject", titleObject);
      // console.log(componentName, GetDateTime(), "useEffect typeof titleObject", typeof titleObject);

      // setTitleItemIndex(titleListState.findIndex(title => title.titleID === titleObject.titleID));
      // console.log(componentName, GetDateTime(), "useEffect titleItemIndex", titleItemIndex);

      editionList = editionListState.filter(edition => edition.titleID === parseInt(titleObject.titleID));

      if (IsEmpty(titleObject) === false) {

        setTitleItem(titleObject);

        setTitleID(titleObject.titleID);
        setTitleName(titleObject.titleName);
        setTitleSort(titleObject.titleSort);
        setTitleURL(titleObject.titleURL);
        setAuthorFirstName(titleObject.authorFirstName);
        setAuthorLastName(titleObject.authorLastName);
        setSubmissionDate(titleObject.submissionDate);
        setPublicationDate(titleObject.publicationDate);
        setImageName(titleObject.imageName);
        setCategoryID(titleObject.categoryID);
        setShortDescription(titleObject.shortDescription);
        setUrlPKDweb(titleObject.urlPKDweb);
        setActive(titleObject.active);

        setTxtTitleName(titleObject.titleName);
        setTxtTitleURL(titleObject.titleURL);
        setTxtAuthorFirstName(titleObject.authorFirstName);
        setTxtAuthorLastName(titleObject.authorLastName);
        setTxtSubmissionDate(titleObject.submissionDate);
        setTxtPublicationDate(titleObject.publicationDate);

        if (IsEmpty(titleObject.submissionDate) === false) {
          setTxtSubmissionDate(titleObject.submissionDate.toString().substring(0, 10));
        } else {
          setTxtSubmissionDate("");
        };

        if (IsEmpty(titleObject.publicationDate) === false) {
          setTxtPublicationDate(titleObject.publicationDate.toString().substring(0, 10));
        } else {
          setTxtPublicationDate("");
        };

        setTxtImageName(titleObject.imageName);
        setDdCategoryID(titleObject.categoryID);
        setTxtShortDescription(titleObject.shortDescription);
        setTxtUrlPKDweb(titleObject.urlPKDweb);

      };

    };

  }, [props.titleID, titleListState]);


  const addTitle = () => {
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
    setSubmissionDate(null);
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

        // * If the user doesn't enter a submission date, then it isn't added/updated
        if (IsEmpty(txtSubmissionDate) === false) {
          if (txtSubmissionDate.trim().length !== 0) {
            Object.assign(titleObject, { submissionDate: txtSubmissionDate.trim() });
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
              // console.log(componentName, GetDateTime(), "addTitle data", data);

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
                setSubmissionDate(data.records[0].submissionDate);
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
                dispatch(addStateTitle([{ titleID: data.records[0].titleID, titleName: data.records[0].titleName, titleSort: data.records[0].titleSort, titleURL: data.records[0].titleURL, authorFirstName: data.records[0].authorFirstName, authorLastName: data.records[0].authorLastName, submissionDate: data.records[0].submissionDate, publicationDate: data.records[0].publicationDate, imageName: data.records[0].imageName, categoryID: data.records[0].categoryID, shortDescription: data.records[0].shortDescription, urlPKDweb: data.records[0].urlPKDweb, active: data.records[0].active, titleActive: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate/*, category: { categoryID: categoryItem.categoryID, category: categoryItem.category, sortID: categoryItem.sortID, active: categoryItem.active, createDate: categoryItem.createDate, updateDate: categoryItem.updateDate }*/, category: categoryItem.category, sortID: categoryItem.sortID, categoryActive: categoryItem.active, categoryCreateDate: categoryItem.createDate, categoryUpdatedDate: categoryItem.updateDate }]));
                // ? Add to local storage also?

                dispatch(addStateURL([{ linkName: data.records[0].titleURL, linkType: "title", linkID: data.records[0].titleID }]));

              } else {
                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);
              };

            })
            .catch(error => {
              console.error(componentName, GetDateTime(), "addTitle error", error);
              // console.error(componentName, GetDateTime(), "addTitle error.name", error.name);
              // console.error(componentName, GetDateTime(), "addTitle error.message", error.message);
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


  const updateTitle = (deleteTitle) => {
    // console.log(componentName, GetDateTime(), "updateTitle deleteTitle", deleteTitle);
    // console.log(componentName, GetDateTime(), "updateTitle baseURL", baseURL);

    // console.log(componentName, GetDateTime(), "titleItemIndex", titleItemIndex);

    clearMessages();
    setTitleRecordDeleted(null);
    setErrTitleName("");
    setErrCategoryID("");

    setTitleItem(null);
    setTitleID(null);
    setTitleName(null);
    setTitleSort(null);
    setTitleURL(null);
    setAuthorFirstName(null);
    setAuthorLastName(null);
    setSubmissionDate(null);
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
        // console.log(componentName, GetDateTime(), "updateTitle Valid TitleName");
        // console.log(componentName, GetDateTime(), "updateTitle titleNameValidated true", titleNameValidated);
      } else {
        titleNameValidated = false;
        setErrTitleName("Please enter a title.");
        // console.log(componentName, GetDateTime(), "updateTitle Invalid TitleName");
        // console.log(componentName, GetDateTime(), "updateTitle titleNameValidated false", titleNameValidated);
      };
    };

    if (IsEmpty(ddCategoryID) === false) {
      categoryIDValidated = true;
      setErrCategoryID("");
      // console.log(componentName, GetDateTime(), "updateTitle Valid CategoryID");
      // console.log(componentName, GetDateTime(), "updateTitle categoryIDValidated true", categoryIDValidated);
    } else {
      categoryIDValidated = false;
      setErrCategoryID("Please select a category.");
      // console.log(componentName, GetDateTime(), "updateTitle Invalid CategoryID");
      // console.log(componentName, GetDateTime(), "updateTitle categoryIDValidated false", categoryIDValidated);
    };

    if (titleNameValidated === true && categoryIDValidated === true) {
      formValidated = true;
      // console.log(componentName, GetDateTime(), "updateTitle Valid Form");
      // console.log(componentName, GetDateTime(), "updateTitle formValidated true", formValidated);
    } else {
      formValidated = false;
      // console.log(componentName, GetDateTime(), "updateTitle Invalid Form");
      // console.log(componentName, GetDateTime(), "updateTitle formValidated false", formValidated);
    };

    // console.log(componentName, GetDateTime(), "updateTitle titleNameValidated", titleNameValidated);
    // console.log(componentName, GetDateTime(), "updateTitle categoryIDValidated", categoryIDValidated);
    // console.log(componentName, GetDateTime(), "updateTitle formValidated", formValidated);

    if (formValidated === true) {

      if (IsEmpty(txtTitleName) === false) {

        // console.log(componentName, GetDateTime(), "addEdition typeof ddCategoryID", typeof ddCategoryID);

        // console.log(componentName, GetDateTime(), "addEdition parseInt(ddCategoryID)", parseInt(ddCategoryID));

        let titleObject = {
          titleName: txtTitleName.trim(),
          // authorFirstName: txtAuthorFirstName.trim(),
          // authorLastName: txtAuthorLastName.trim(),
          // imageName: txtImageName.trim(),
          categoryID: parseInt(ddCategoryID),
          // shortDescription: txtShortDescription.trim(),
          // urlPKDweb: txtUrlPKDweb.trim(),
          active: !deleteTitle
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

        // * If the user doesn't enter a submission date, then it isn't added/updated
        if (IsEmpty(txtSubmissionDate) === false) {
          if (txtSubmissionDate.trim().length !== 0) {
            Object.assign(titleObject, { submissionDate: txtSubmissionDate.trim() });
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

        // console.log(componentName, GetDateTime(), "updateTitle titleObject", titleObject);

        let url = baseURL + "titles/";

        if (IsEmpty(props.titleID) === false && IsEmpty(sessionToken) === false) {

          url = url + props.titleID;

          // console.log(componentName, GetDateTime(), "updateTitle url", url);

          fetch(url, {
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": sessionToken
            }),
            body: JSON.stringify({ title: titleObject })
          })
            .then(response => {
              // console.log(componentName, GetDateTime(), "updateTitle response", response);
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
              // console.log(componentName, GetDateTime(), "updateTitle data", data);

              setTitleRecordUpdated(data.recordUpdated);
              addMessage(data.message);

              if (data.recordUpdated === true) {

                setTitleItem(data.records[0]);
                // setTitleID(data.records[0].titleID);
                setTitleName(data.records[0].titleName);
                setTitleSort(data.records[0].titleSort);
                setTitleURL(data.records[0].titleURL);
                setAuthorFirstName(data.records[0].authorFirstName);
                setAuthorLastName(data.records[0].authorLastName);
                setSubmissionDate(data.records[0].submissionDate);
                setPublicationDate(data.records[0].publicationDate);
                setImageName(data.records[0].imageName);
                setCategoryID(data.records[0].categoryID);
                setShortDescription(data.records[0].shortDescription);
                setUrlPKDweb(data.records[0].urlPKDweb);
                setActive(data.records[0].active);

                // console.log(componentName, GetDateTime(), "updateTitle categoryList", categoryList);

                let categoryItem = categoryList.filter(category => category.categoryID === data.records[0].categoryID);
                // category: {categoryID: categoryItem[0].categoryID, category: categoryItem[0].category, sortID: categoryItem[0].sortID, active: categoryItem[0].active, createDate: categoryItem[0].createDate, updateDate: categoryItem[0].updateDate}
                categoryItem = categoryItem[0];

                // console.log(componentName, GetDateTime(), "updateTitle data.records[0].categoryID", data.records[0].categoryID);
                // console.log(componentName, GetDateTime(), "updateTitle typeof data.records[0].categoryID", typeof data.records[0].categoryID);
                // console.log(componentName, GetDateTime(), "updateTitle categoryItem", categoryItem);

                // ? Would still work if the createDate and updateDate were left out?
                dispatch(updateStateTitle({ /*titleItemIndex: titleItemIndex,*/ titleID: props.titleID, titleName: data.records[0].titleName, titleSort: data.records[0].titleSort, titleURL: data.records[0].titleURL, authorFirstName: data.records[0].authorFirstName, authorLastName: data.records[0].authorLastName, submissionDate: data.records[0].submissionDate, publicationDate: data.records[0].publicationDate, imageName: data.records[0].imageName, categoryID: data.records[0].categoryID, shortDescription: data.records[0].shortDescription, urlPKDweb: data.records[0].urlPKDweb, active: data.records[0].active, titleActive: data.records[0].active, updateDate: GetDateTime()/*, category: { categoryID: categoryItem.categoryID, category: categoryItem.category, sortID: categoryItem.sortID, active: categoryItem.active, createDate: categoryItem.createDate, updateDate: categoryItem.updateDate }*/ }));
                // ? Update local storage also?

                // * Update/Delete related editions also if active is set to false
                if (data.records[0].active === false || data.records[0].active === 0) {
                  for (let i = 0; i < editionList.length; i++) {

                    // let editionItemIndex = editionListState.findIndex(edition => edition.editionID === editionList[i].editionID);

                    // ? Would still work if the createDate and updateDate were left out?
                    dispatch(updateStateEdition({ /*editionItemIndex: editionItemIndex,*/ editionID: editionList[i].editionID, titleID: editionList[i].titleID, mediaID: editionList[i].mediaID, publicationDate: editionList[i].publicationDate, imageName: editionList[i].imageName, ASIN: editionList[i].ASIN, textLinkShort: editionList[i].textLinkShort, textLinkFull: editionList[i].textLinkFull, imageLinkSmall: editionList[i].imageLinkSmall, imageLinkMedium: editionList[i].imageLinkMedium, imageLinkLarge: editionList[i].imageLinkLarge, textImageLink: editionList[i].textImageLink, active: false, createDate: editionList[i].createDate, updateDate: editionList[i].updateDate }));

                  };

                };

                // let urlListIndex = urlLookup.findIndex(url => url.linkType === "titles" && url.linkID === props.titleID);
                // console.log(componentName, GetDateTime(), "updateTitle urlListIndex", urlListIndex);

                // * Update/Delete related urls in arrayURLs also
                if (data.records[0].active === false || data.records[0].active === 0) {
                  // dispatch(deleteStateURL(urlListIndex));
                  dispatch(deleteStateURL({ linkID: props.titleID, linkType: "titles" }));
                } else {
                  // console.log(componentName, GetDateTime(), "updateTitle urlListIndex", urlListIndex);
                  // console.log(componentName, GetDateTime(), "updateTitle data.records[0].titleURL", data.records[0].titleURL);
                  // console.log(componentName, GetDateTime(), "updateTitle props.titleID", props.titleID);
                  // console.log(componentName, GetDateTime(), "updateTitle data.records[0].categoryID", data.records[0].categoryID);

                  let categoryName = categoryList.find(category => category.categoryID === data.records[0].categoryID);
                  // console.log(componentName, GetDateTime(), "updateTitle categoryName", categoryName);
                  // console.log(componentName, GetDateTime(), "updateTitle categoryName.category", categoryName.category);

                  // console.log(componentName, GetDateTime(), "updateTitle typeof data.records[0].categoryID", typeof data.records[0].categoryID);

                  // ? Doesn't seem to be updating the state for some reason?
                  // dispatch(updateStateURL([{urlListIndex: urlListIndex, linkName: data.records[0].titleURL, linkType: "title", linkID: props.titleID, linkTypeNameID: data.records[0].categoryID, linkTypeName: categoryName.category}]));

                  // dispatch(deleteStateURL(urlListIndex));
                  dispatch(deleteStateURL({ linkID: props.titleID, linkType: "titles" }));
                  dispatch(addStateURL([{ /*urlListIndex: urlListIndex,*/ linkName: data.records[0].titleURL, linkType: "titles", linkID: props.titleID, linkTypeNameID: data.records[0].categoryID, linkTypeName: categoryName.category }]));

                };

                // * Redirect to the new titleURL is that was changed
                if (linkItem.linkName !== data.records[0].titleURL) {
                  redirectPage(data.records[0].titleURL);
                };

              } else {
                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);
              };

            })
            .catch(error => {
              console.error(componentName, GetDateTime(), "updateTitle error", error);
              // console.error(componentName, GetDateTime(), "updateTitle error.name", error.name);
              // console.error(componentName, GetDateTime(), "updateTitle error.message", error.message);
              addErrorMessage(error.name + ": " + error.message);
            });

        };

      };

    };

  };


  const deleteTitle = () => {
    // console.log(componentName, GetDateTime(), "deleteTitle baseURL", baseURL);

    clearMessages();
    setTitleRecordDeleted(null);
    setErrTitleName("");
    setErrCategoryID("");

    let url = baseURL + "titles/";

    if (IsEmpty(props.titleID) === false) {

      url = url + props.titleID;

      // console.log(componentName, GetDateTime(), "deleteTitle url", url);

      if (IsEmpty(sessionToken) === false) {

        fetch(url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          })
        })
          .then(response => {
            // console.log(componentName, GetDateTime(), "deleteTitle response", response);
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
            // console.log(componentName, GetDateTime(), "deleteTitle data", data);

            setTitleRecordDeleted(data.recordDeleted);

            addMessage(data.message); // * Never seen by the user if the delete was successful

            if (data.recordDeleted === true) {

              dispatch(deleteStateTitle(props.titleID));
              // dispatch(deleteStateTitle(titleItemIndex));
              // ? Update local storage also?

              // * Delete related editions also
              for (let i = 0; i < editionList.length; i++) {

                // let editionItemIndex = editionListState.findIndex(edition => edition.editionID === editionList[i].editionID);

                deleteEdition(editionList[i].editionID/*, editionItemIndex*/);

              };

              // let urlListIndex = urlLookup.findIndex(url => url.linkType === "titles" && url.linkID === data.titleID);
              // console.log(componentName, GetDateTime(), "updateTitle urlListIndex", urlListIndex);

              // Update/Delete related urls in arrayURLs also
              // dispatch(deleteStateURL(urlListIndex));
              dispatch(deleteStateURL({ linkID: data.titleID, linkType: "titles" }));

              // ? Redirect when the title is deleted?

            } else {
              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);
            };

          })
          .catch(error => {
            console.error(componentName, GetDateTime(), "deleteTitle error", error);
            // console.error(componentName, GetDateTime(), "deleteTitle error.name", error.name);
            // console.error(componentName, GetDateTime(), "deleteTitle error.message", error.message);
            addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

  };


  const deleteEdition = (editionID/*, editionItemIndex*/) => {
    // console.log(componentName, GetDateTime(), "deleteEdition baseURL", baseURL);

    clearMessages();
    setEditionRecordDeleted(null);

    let url = baseURL + "editions/";

    if (IsEmpty(editionID) === false) {
      url = url + editionID;

      // console.log(componentName, GetDateTime(), "deleteEdition url", url);

      if (IsEmpty(sessionToken) === false) {

        fetch(url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          })
        })
          .then(response => {
            // console.log(componentName, GetDateTime(), "deleteEdition response", response);
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
            // console.log(componentName, GetDateTime(), "deleteEdition data", data);

            setEditionRecordDeleted(data.recordDeleted);

            addMessage(data.message); // Never seen by the user if the delete was successful

            if (data.recordDeleted === true) {

              dispatch(deleteStateEdition(props.editionID));
              // dispatch(deleteStateEdition(editionItemIndex));
              // ? Update local storage also?

            } else {
              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);
            };

          })
          .catch(error => {
            console.error(componentName, GetDateTime(), "deleteEdition error", error);
            // console.error(componentName, GetDateTime(), "deleteEdition error.name", error.name);
            // console.error(componentName, GetDateTime(), "deleteEdition error.message", error.message);
            addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

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
    // console.log(componentName, GetDateTime(), "useEffect titleRecordUpdated", titleRecordUpdated);
    // console.log(componentName, GetDateTime(), "useEffect titleRecordDeleted", titleRecordDeleted);
    if (IsEmpty(titleRecordUpdated) === false && titleRecordUpdated === true) {
      clearMessages();
      setErrTitleName("");
      setErrCategoryID("");
      setTitleRecordUpdated(null);
      // setModal(false);
      toggle();
    };

    if (IsEmpty(titleRecordDeleted) === false && titleRecordDeleted === true) {
      clearMessages();
      setErrTitleName("");
      setErrCategoryID("");
      setTitleRecordDeleted(null);
      // setModal(false);
      toggle();
    };

  }, [titleRecordUpdated, titleRecordDeleted]);


  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);
    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);
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

      {appAllowUserInteractions === true && IsEmpty(titleItem) === true && IsEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Title</Button></span> : null}

      {appAllowUserInteractions === true && IsEmpty(titleItem) === true && IsEmpty(admin) === false && admin === true && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

      {appAllowUserInteractions === true && IsEmpty(titleItem) === false && IsEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Update Title</Button></span> : null}

      {appAllowUserInteractions === true && IsEmpty(titleItem) === false && IsEmpty(admin) === false && admin === true && props.displayIcon === true ? <PencilSquare className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{IsEmpty(titleItem) === true ? <React.Fragment>Add</React.Fragment> : <React.Fragment>Update</React.Fragment>} Title</ModalHeader>
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
              <Input type="text" id="txtTitleName" value={txtTitleName} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtTitleName(event.target.value); }} />
              {IsEmpty(errTitleName) === false ? <Alert color="danger">{errTitleName}</Alert> : null}

            </FormGroup>
            <FormGroup>

              <Label for="txtTitleURL">Title URL</Label>
              <Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtTitleURL(createTitleURL(txtTitleName)); }}>Create Title URL</Button>
              <Input type="text" id="txtTitleURL" value={txtTitleURL} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtTitleURL(event.target.value); }} />

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
              {/* {console.log(componentName, GetDateTime(), "ddCategoryID", ddCategoryID)} */}
              <Label id="lblCategoryID" for="lblCategoryID">Category</Label>
              <Input type="select" id="ddCategoryID" value={ddCategoryID} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setDdCategoryID(event.target.value); }}>
                <option value="">Select a Category</option>
                {categoryList.map((category) => {
                  return (
                    <React.Fragment key={category.categoryID}>
                      {/* {getCategoryIDFromCategoryName(props.categoryName) === category.categoryID ? <option selected value={category.categoryID}>{category.category}</option> : <option key={category.categoryID} value={category.categoryID}>{category.category}</option>} */}
                      <option key={category.categoryID} value={category.categoryID}>{category.category}</option>
                    </React.Fragment>
                  );
                })}
              </Input>
              {IsEmpty(errCategoryID) === false ? <Alert color="danger">{errCategoryID}</Alert> : null}
            </FormGroup>

            <FormGroup row>
              <Col>

                <Label for="txtSubmissionDate">Manuscript Submission Date</Label>
                <Input type="date" id="txtSubmissionDate" value={txtSubmissionDate} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtSubmissionDate(event.target.value); }} />

              </Col>
              <Col>

                <Label for="txtPublicationDate">Publication Date</Label>
                <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtPublicationDate(event.target.value); }} />

              </Col>

            </FormGroup>

            <FormGroup>

              <Label for="txtImageName">Image Name</Label>
              <Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ /*createImageName(txtTitleName);*/ setTxtImageName(createImageName(txtTitleName)); }}>Create Image Name</Button>
              <Input type="text" id="txtImageName" value={txtImageName} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtImageName(event.target.value); }} />
              {IsEmpty(txtImageName) === false && txtImageName !== "" ? <img src={txtImageName} alt={txtTitleName} className="coverThumbnail" /> : <Image size="150" className="noImageIcon" />}

            </FormGroup>
            <FormGroup>

              <Label for="txtShortDescription">Short Description</Label>
              <Input type="textarea" id="txtShortDescription" rows={10} value={txtShortDescription} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtShortDescription(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtUrlPKDweb">url PKDweb</Label>
              <Input type="text" id="txtUrlPKDweb" value={txtUrlPKDweb} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtUrlPKDweb(event.target.value); }} />

            </FormGroup>

            <ModalFooter>

              {IsEmpty(titleItem) === true ?
                <Button outline size="lg" color="primary" onClick={addTitle}>Add Title</Button>
                :
                <React.Fragment>
                  <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateTitle(false); }}>Update Title</Button>
                  {IsEmpty(active) === false && (active === false || active === 0) ?
                    <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateTitle(false); }}>Undelete/Restore Title</Button>
                    : null}
                  {IsEmpty(active) === false && (active === true || active === 1) ?
                    <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateTitle(true); }}>Delete Title</Button>
                    : null}
                  <Button outline size="lg" color="warning" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ deleteTitle(); }}>Hard Delete Title</Button>
                </React.Fragment>
              }
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default EditTitle;
