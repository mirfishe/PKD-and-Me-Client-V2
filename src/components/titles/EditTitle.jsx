import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import { isEmpty, getDateTime, isNonEmptyArray, getFirstItem, displayValue, formatTrim, formatToString, addErrorLog } from "shared-functions";
import { createTitleURL, createImageName } from "../../utilities/ApplicationFunctions";
// import { addStateTitle, updateStateTitle, deleteStateTitle } from "../../app/titlesSlice";
// import { updateStateEdition, deleteStateEdition } from "../../app/editionsSlice";
import {/* addStateURL, updateStateURL, deleteStateURL, */ setPageURL } from "../../app/urlsSlice";

const EditTitle = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: categoryName, editionID, titleID -- 10/21/2022 MF

  const componentName = "EditTitle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const categoryListState = useSelector(state => state.categories.arrayCategories);
  const editionListState = useSelector(state => state.editions.arrayEditions);
  const titleListState = useSelector(state => state.titles.arrayTitles);
  // const urlLookup = useSelector(state => state.urls.arrayURLs);

  const linkItem = useSelector(state => state.urls.linkItem);

  let titleID = isEmpty(props) === false && isEmpty(props.titleID) === false ? props.titleID : 0;

  const [showForm, setShowForm] = useState(false);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [titleRecordAdded, setTitleRecordAdded] = useState(null);
  const [titleRecordUpdated, setTitleRecordUpdated] = useState(null);
  const [titleRecordDeleted, setTitleRecordDeleted] = useState(null);
  // const [editionRecordUpdated, setEditionRecordUpdated] = useState(null);
  // const [editionRecordDeleted, setEditionRecordDeleted] = useState(null);

  const [txtTitleName, setTxtTitleName] = useState("");
  const [txtTitleURL, setTxtTitleURL] = useState("");
  const [txtAuthorFirstName, setTxtAuthorFirstName] = useState("");
  const [txtAuthorLastName, setTxtAuthorLastName] = useState("");
  const [txtManuscriptTitle, setTxtManuscriptTitle] = useState("");
  const [txtWrittenDate, setTxtWrittenDate] = useState("");
  const [txtSubmissionDate, setTxtSubmissionDate] = useState("");
  const [txtPublicationDate, setTxtPublicationDate] = useState("");
  const [txtImageName, setTxtImageName] = useState("");
  const [ddCategoryID, setDdCategoryID] = useState("");
  const [txtShortDescription, setTxtShortDescription] = useState("");
  const [txtUrlPKDWeb, setTxtUrlPKDWeb] = useState("");

  const [errTitleName, setErrTitleName] = useState("");
  const [errCategoryID, setErrCategoryID] = useState("");

  // const [titleItemIndex, setTitleItemIndex] = useState(null);
  const [titleItem, setTitleItem] = useState(null);
  // const [titleID, setTitleID] = useState(null);
  // const [titleName, setTitleName] = useState(null);
  // const [titleSort, setTitleSort] = useState(null);
  // const [titleURL, setTitleURL] = useState(null);
  // const [authorFirstName, setAuthorFirstName] = useState(null);
  // const [authorLastName, setAuthorLastName] = useState(null);
  // const [manuscriptTitle, setManuscriptTitle] = useState(null);
  // const [writtenDate, setWrittenDate] = useState(null);
  // const [submissionDate, setSubmissionDate] = useState(null);
  // const [publicationDate, setPublicationDate] = useState(null);
  // const [imageName, setImageName] = useState(null);
  // const [categoryID, setCategoryID] = useState(null);
  // const [shortDescription, setShortDescription] = useState(null);
  // const [urlPKDWeb, setUrlPKDWeb] = useState(null);
  const [active, setActive] = useState(null);

  let categoryList = categoryListState.filter(category => category.active === true || category.active === 1);
  // let categoryList = categoryListState.filter(category => category.categoryActive === true || category.categoryActive === 1);

  // categoryList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);
  // * Sort the list alphabetically instead of by sortID
  categoryList.sort((a, b) => (a.category > b.category) ? 1 : -1);

  // ! This code is causing React to have too many re-renders in this location
  // if (categoryList.length < 1) {

  //     console.error(componentName, getDateTime(), "categoryList is empty", categoryList.length);
  //     addErrorMessage("categoryList is empty", categoryList.length);

  // } else {

  //     console.error(componentName, getDateTime(), "categoryList.length", categoryList.length);
  //     addMessage("categoryList.length", categoryList.length);

  // };

  let editionList = [];


  useEffect(() => {

    if (categoryList.length < 1) {

      console.error(componentName, getDateTime(), "categoryList is empty", categoryList.length);
      addErrorMessage("categoryList is empty", categoryList.length);

    } else {

      // addMessage("categoryList.length", categoryList.length);

    };

    // setDdCategoryID(getCategoryIDFromCategoryName(categoryName));

  }, [categoryList]);


  useEffect(() => {

    if (isEmpty(titleID) === false) {

      let titleObject = titleListState.find(title => title.titleID === titleID);

      // setTitleItemIndex(titleListState.findIndex(title => title.titleID === titleObject.titleID));

      if (isEmpty(titleObject) === false) {

        editionList = editionListState.filter(edition => edition.titleID === parseInt(titleObject.titleID));

      };

      if (isEmpty(titleObject) === false) {

        setTitleItem(titleObject);

        // setTitleID(titleObject.titleID);
        // setTitleName(titleObject.titleName);
        // setTitleSort(titleObject.titleSort);
        // setTitleURL(titleObject.titleURL);
        // setAuthorFirstName(titleObject.authorFirstName);
        // setAuthorLastName(titleObject.authorLastName);
        // setManuscriptTitle(titleObject.manuscriptTitle);
        // setWrittenDate(titleObject.writtenDate);
        // setSubmissionDate(titleObject.submissionDate);
        // setPublicationDate(titleObject.publicationDate);
        // setImageName(titleObject.imageName);
        // setCategoryID(titleObject.categoryID);
        // setShortDescription(titleObject.shortDescription);
        // setUrlPKDWeb(titleObject.urlPKDWeb);
        setActive(titleObject.active);

        setTxtTitleName(titleObject.titleName);
        setTxtTitleURL(titleObject.titleURL);
        setTxtAuthorFirstName(titleObject.authorFirstName);
        setTxtAuthorLastName(titleObject.authorLastName);
        setTxtManuscriptTitle(titleObject.manuscriptTitle);
        setTxtWrittenDate(titleObject.writtenDate);
        setTxtSubmissionDate(titleObject.submissionDate);
        setTxtPublicationDate(titleObject.publicationDate);

        if (isEmpty(titleObject.writtenDate) === false) {

          setTxtWrittenDate(formatToString(titleObject.writtenDate).substring(0, 10));

        } else {

          setTxtWrittenDate("");

        };

        if (isEmpty(titleObject.submissionDate) === false) {

          setTxtSubmissionDate(formatToString(titleObject.submissionDate).substring(0, 10));

        } else {

          setTxtSubmissionDate("");

        };

        if (isEmpty(titleObject.publicationDate) === false) {

          setTxtPublicationDate(formatToString(titleObject.publicationDate).substring(0, 10));

        } else {

          setTxtPublicationDate("");

        };

        setTxtImageName(titleObject.imageName);
        setDdCategoryID(titleObject.categoryID);
        setTxtShortDescription(titleObject.shortDescription);
        setTxtUrlPKDWeb(titleObject.urlPKDWeb);

      };

    };

  }, [titleID, titleListState]);


  useEffect(() => {

    if (isEmpty(titleRecordAdded) === false && titleRecordAdded === true) {

      clearMessages();
      setErrTitleName("");
      setErrCategoryID("");
      setTitleRecordAdded(null);

      setTxtTitleName("");
      setTxtTitleURL("");
      setTxtAuthorFirstName("");
      setTxtAuthorLastName("");
      setTxtManuscriptTitle("");
      setTxtWrittenDate("");
      setTxtSubmissionDate("");
      setTxtPublicationDate("");
      setTxtImageName("");
      setDdCategoryID("");
      setTxtShortDescription("");
      setTxtUrlPKDWeb("");

      // setModal(!modal);

    };

  }, [titleRecordAdded]);


  useEffect(() => {

    if (isEmpty(titleRecordUpdated) === false && titleRecordUpdated === true) {

      clearMessages();
      setErrTitleName("");
      setErrCategoryID("");
      setTitleRecordUpdated(null);

      setTxtTitleName("");
      setTxtTitleURL("");
      setTxtAuthorFirstName("");
      setTxtAuthorLastName("");
      setTxtManuscriptTitle("");
      setTxtWrittenDate("");
      setTxtSubmissionDate("");
      setTxtPublicationDate("");
      setTxtImageName("");
      setDdCategoryID("");
      setTxtShortDescription("");
      setTxtUrlPKDWeb("");

      // setModal(!modal);

    };

    if (isEmpty(titleRecordDeleted) === false && titleRecordDeleted === true) {

      clearMessages();
      setErrTitleName("");
      setErrCategoryID("");
      setTitleRecordDeleted(null);

      setTxtTitleName("");
      setTxtTitleURL("");
      setTxtAuthorFirstName("");
      setTxtAuthorLastName("");
      setTxtManuscriptTitle("");
      setTxtWrittenDate("");
      setTxtSubmissionDate("");
      setTxtPublicationDate("");
      setTxtImageName("");
      setDdCategoryID("");
      setTxtShortDescription("");
      setTxtUrlPKDWeb("");

      // setModal(!modal);

    };

  }, [titleRecordUpdated, titleRecordDeleted]);


  // useEffect(() => {

  //   if (admin !== true) {

  //     // return <Redirect to="/" />;
  //     setModal(false);

  //   };

  // }, [admin]);


  const addTitle = () => {

    clearMessages();
    setTitleRecordAdded(null);
    setErrTitleName("");
    setErrCategoryID("");

    setTitleItem(null);
    // setTitleID(null);
    // setTitleName(null);
    // setTitleSort(null);
    // setTitleURL(null);
    // setAuthorFirstName(null);
    // setAuthorLastName(null);
    // setManuscriptTitle(null);
    // setWrittenDate(null);
    // setSubmissionDate(null);
    // setPublicationDate(null);
    // setImageName(null);
    // setCategoryID(null);
    // setShortDescription(null);
    // setUrlPKDWeb(null);
    setActive(null);

    let titleNameValidated = false;
    let categoryIDValidated = false;
    let formValidated = false;

    if (isEmpty(txtTitleName) === false) {

      if (formatTrim(txtTitleName).length > 0) {

        titleNameValidated = true;
        setErrTitleName("");

      } else {

        titleNameValidated = false;
        setErrTitleName("Please enter a title.");

      };

    };

    if (isEmpty(ddCategoryID) === false) {

      categoryIDValidated = true;
      setErrCategoryID("");

    } else {

      categoryIDValidated = false;
      setErrCategoryID("Please select a category.");

    };

    if (titleNameValidated === true && categoryIDValidated === true) {

      formValidated = true;

    } else {

      formValidated = false;

    };


    if (formValidated === true) {

      if (isEmpty(txtTitleName) === false) {

        let recordObject = {
          titleName: formatTrim(txtTitleName),
          // authorFirstName: formatTrim(txtAuthorFirstName),
          // authorLastName: formatTrim(txtAuthorLastName),
          // imageName: formatTrim(txtImageName),
          categoryID: parseInt(ddCategoryID)
          // shortDescription: formatTrim(txtShortDescription),
          // urlPKDWeb: formatTrim(txtUrlPKDWeb)
        };

        // * If the user doesn't enter a title URL, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtTitleURL) === false) {

          if (formatTrim(txtTitleURL).length !== 0) {

            Object.assign(recordObject, { titleURL: formatTrim(txtTitleURL) });

          };

        };

        // * If the user doesn't enter an author first name, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtAuthorFirstName) === false) {

          if (formatTrim(txtAuthorFirstName).length !== 0) {

            Object.assign(recordObject, { authorFirstName: formatTrim(txtAuthorFirstName) });

          };

        };

        // * If the user doesn't enter an author last name, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtAuthorLastName) === false) {

          if (formatTrim(txtAuthorLastName).length !== 0) {

            Object.assign(recordObject, { authorLastName: formatTrim(txtAuthorLastName) });

          };

        };

        // * If the user doesn't enter an image name then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtImageName) === false) {

          if (formatTrim(txtImageName).length !== 0) {

            Object.assign(recordObject, { imageName: formatTrim(txtImageName) });

          };

        };

        // * If the user doesn't enter a manuscript title, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtManuscriptTitle) === false) {

          if (formatTrim(txtManuscriptTitle).length !== 0) {

            Object.assign(recordObject, { manuscriptTitle: formatTrim(txtManuscriptTitle) });

          };

        };

        // * If the user doesn't enter a written date, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtWrittenDate) === false) {

          if (formatTrim(txtWrittenDate).length !== 0) {

            Object.assign(recordObject, { writtenDate: formatTrim(txtWrittenDate) });

          };

        };

        // * If the user doesn't enter a submission date, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtSubmissionDate) === false) {

          if (formatTrim(txtSubmissionDate).length !== 0) {

            Object.assign(recordObject, { submissionDate: formatTrim(txtSubmissionDate) });

          };

        };

        // * If the user doesn't enter a publication date, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtPublicationDate) === false) {

          if (formatTrim(txtPublicationDate).length !== 0) {

            Object.assign(recordObject, { publicationDate: formatTrim(txtPublicationDate) });

          };

        };

        // * If the user doesn't enter a short description, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtShortDescription) === false) {

          if (formatTrim(txtShortDescription).length !== 0) {

            Object.assign(recordObject, { shortDescription: formatTrim(txtShortDescription) });

          };

        };

        // * If the user doesn't enter a url for PKDWeb, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtUrlPKDWeb) === false) {

          if (formatTrim(txtUrlPKDWeb).length !== 0) {

            Object.assign(recordObject, { urlPKDWeb: formatTrim(txtUrlPKDWeb) });

          };

        };

        let url = baseURL + "titles/";

        if (isEmpty(sessionToken) === false) {

          fetch(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": sessionToken
            }),
            body: JSON.stringify({ title: recordObject })
          })
            .then(results => {

              // if (results.ok !== true) {

              //     throw Error(results.status + " " + results.statusText + " " + results.url);

              // } else {

              // if (results.status === 200) {

              return results.json();

              // } else {

              //     return results.status;

              // };

              // };

            })
            .then(data => {

              setTitleRecordAdded(data.transactionSuccess);
              addMessage(data.message);

              if (data.transactionSuccess === true) {

                let dataRecord = getFirstItem(data.records);

                setTitleItem(dataRecord);
                // setTitleID(dataRecord.titleID);
                // setTitleName(dataRecord.titleName);
                // setTitleSort(dataRecord.titleSort);
                // setTitleURL(dataRecord.titleURL);
                // setAuthorFirstName(dataRecord.authorFirstName);
                // setAuthorLastName(dataRecord.authorLastName);
                // setManuscriptTitle(dataRecord.manuscriptTitle);
                // setWrittenDate(dataRecord.writtenDate);
                // setSubmissionDate(dataRecord.submissionDate);
                // setPublicationDate(dataRecord.publicationDate);
                // setImageName(dataRecord.imageName);
                // setCategoryID(dataRecord.categoryID);
                // setShortDescription(dataRecord.shortDescription);
                // setUrlPKDWeb(dataRecord.urlPKDWeb);
                setActive(dataRecord.active);

                // let categoryItem = getFirstItem(categoryList.filter(category => category.categoryID === dataRecord.categoryID));
                // // category: {categoryID: categoryItem.categoryID, category: categoryItem.category, sortID: categoryItem.sortID, active: categoryItem.active, createDate: categoryItem.createDate, updateDate: categoryItem.updateDate}


                // // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
                // dispatch(addStateTitle([{ titleID: dataRecord.titleID, titleName: dataRecord.titleName, titleSort: dataRecord.titleSort, titleURL: dataRecord.titleURL, authorFirstName: dataRecord.authorFirstName, authorLastName: dataRecord.authorLastName, manuscriptTitle: dataRecord.manuscriptTitle, writtenDate: dataRecord.writtenDate, submissionDate: dataRecord.submissionDate, publicationDate: dataRecord.publicationDate, imageName: dataRecord.imageName, categoryID: dataRecord.categoryID, shortDescription: dataRecord.shortDescription, urlPKDWeb: dataRecord.urlPKDWeb, active: dataRecord.active, titleActive: dataRecord.active, createDate: dataRecord.createDate, updateDate: dataRecord.updateDate /* , category: { categoryID: categoryItem.categoryID, category: categoryItem.category, sortID: categoryItem.sortID, active: categoryItem.active, createDate: categoryItem.createDate, updateDate: categoryItem.updateDate } */, category: categoryItem.category, sortID: categoryItem.sortID, categoryActive: categoryItem.active, categoryCreateDate: categoryItem.createDate, categoryUpdatedDate: categoryItem.updateDate }]));

                // // ? Add to local storage also? -- 03/06/2021 MF

                // dispatch(addStateURL([{ linkName: dataRecord.titleURL, linkType: "title", linkID: dataRecord.titleID }]));

              } else {

                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);

              };

            })
            .catch((error) => {
              console.error(componentName, getDateTime(), "addTitle error", error);
              // console.error(componentName, getDateTime(), "addTitle error.name", error.name);
              // console.error(componentName, getDateTime(), "addTitle error.message", error.message);

              addErrorMessage(error.name + ": " + error.message);

              // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

            });

        };

      };

    };
  };


  // ! This code is causing React to have too many re-renders in this location. -- 03/06/2021 MF
  // const getCategoryIDFromCategoryName = (categoryName) => {

  //   if (isEmpty(categoryName) === false) {

  //     // * Could use a find here also. -- 03/06/2021 MF
  //     let categoryProps = categoryList.filter(category => category.category === categoryName);

  //     if (isNaN(categoryProps[0].categoryID) === false) {

  //       // setDdCategoryID(categoryProps[0].categoryID);

  //       return categoryProps[0].categoryID;

  //     } else {

  //       return 0;

  //     };

  //   } else {

  //     return 0;

  //   };

  //   // return 0;

  // };


  const updateTitle = (deleteTitle) => {

    clearMessages();
    setTitleRecordDeleted(null);
    setErrTitleName("");
    setErrCategoryID("");

    setTitleItem(null);
    // setTitleID(null);
    // setTitleName(null);
    // setTitleSort(null);
    // setTitleURL(null);
    // setAuthorFirstName(null);
    // setAuthorLastName(null);
    // setManuscriptTitle(null);
    // setWrittenDate(null);
    // setSubmissionDate(null);
    // setPublicationDate(null);
    // setImageName(null);
    // setCategoryID(null);
    // setShortDescription(null);
    // setUrlPKDWeb(null);
    setActive(null);

    let titleNameValidated = false;
    let categoryIDValidated = false;
    let formValidated = false;

    if (isEmpty(txtTitleName) === false) {

      if (formatTrim(txtTitleName).length > 0) {

        titleNameValidated = true;
        setErrTitleName("");

      } else {

        titleNameValidated = false;
        setErrTitleName("Please enter a title.");

      };

    };

    if (isEmpty(ddCategoryID) === false) {

      categoryIDValidated = true;
      setErrCategoryID("");

    } else {

      categoryIDValidated = false;
      setErrCategoryID("Please select a category.");

    };

    if (titleNameValidated === true && categoryIDValidated === true) {

      formValidated = true;

    } else {

      formValidated = false;

    };

    if (formValidated === true) {

      if (isEmpty(txtTitleName) === false) {

        let recordObject = {
          titleName: formatTrim(txtTitleName),
          // authorFirstName: formatTrim(txtAuthorFirstName),
          // authorLastName: formatTrim(txtAuthorLastName),
          // imageName: formatTrim(txtImageName),
          categoryID: parseInt(ddCategoryID),
          // shortDescription: formatTrim(txtShortDescription),
          // urlPKDWeb: formatTrim(txtUrlPKDWeb),
          active: !deleteTitle
        };

        // * If the user doesn't enter a title URL, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtTitleURL) === false) {

          if (formatTrim(txtTitleURL).length !== 0) {

            Object.assign(recordObject, { titleURL: formatTrim(txtTitleURL) });

          };

        };

        // * If the user doesn't enter an author first name, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtAuthorFirstName) === false) {

          if (formatTrim(txtAuthorFirstName).length !== 0) {

            Object.assign(recordObject, { authorFirstName: formatTrim(txtAuthorFirstName) });

          };

        };

        // * If the user doesn't enter an author last name, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtAuthorLastName) === false) {

          if (formatTrim(txtAuthorLastName).length !== 0) {

            Object.assign(recordObject, { authorLastName: formatTrim(txtAuthorLastName) });

          };

        };

        // * If the user doesn't enter an image name then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtImageName) === false) {

          if (formatTrim(txtImageName).length !== 0) {

            Object.assign(recordObject, { imageName: formatTrim(txtImageName) });

          };

        };

        // * If the user doesn't enter a manuscript title, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtManuscriptTitle) === false) {

          if (formatTrim(txtManuscriptTitle).length !== 0) {

            Object.assign(recordObject, { manuscriptTitle: formatTrim(txtManuscriptTitle) });

          };

        };

        // * If the user doesn't enter a written date, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtWrittenDate) === false) {

          if (formatTrim(txtWrittenDate).length !== 0) {

            Object.assign(recordObject, { writtenDate: formatTrim(txtWrittenDate) });

          };

        };

        // * If the user doesn't enter a submission date, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtSubmissionDate) === false) {

          if (formatTrim(txtSubmissionDate).length !== 0) {

            Object.assign(recordObject, { submissionDate: formatTrim(txtSubmissionDate) });

          };

        };

        // * If the user doesn't enter a publication date, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtPublicationDate) === false) {

          if (formatTrim(txtPublicationDate).length !== 0) {

            Object.assign(recordObject, { publicationDate: formatTrim(txtPublicationDate) });

          };

        };

        // * If the user doesn't enter a short description, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtShortDescription) === false) {

          if (formatTrim(txtShortDescription).length !== 0) {

            Object.assign(recordObject, { shortDescription: formatTrim(txtShortDescription) });

          };

        };

        // * If the user doesn't enter a url for PKDWeb, then it isn't added/updated. -- 03/06/2021 MF
        if (isEmpty(txtUrlPKDWeb) === false) {

          if (formatTrim(txtUrlPKDWeb).length !== 0) {

            Object.assign(recordObject, { urlPKDWeb: formatTrim(txtUrlPKDWeb) });

          };

        };

        let url = baseURL + "titles/";

        if (isEmpty(titleID) === false && isEmpty(sessionToken) === false) {

          url = url + titleID;

          fetch(url, {
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": sessionToken
            }),
            body: JSON.stringify({ title: recordObject })
          })
            .then(results => {

              // if (results.ok !== true) {

              //     throw Error(results.status + " " + results.statusText + " " + results.url);

              // } else {

              // if (results.status === 200) {

              return results.json();

              // } else {

              //     return results.status;

              // };

              // };

            })
            .then(data => {

              setTitleRecordUpdated(data.transactionSuccess);
              addMessage(data.message);

              if (data.transactionSuccess === true) {

                let dataRecord = getFirstItem(data.records);

                setTitleItem(dataRecord);
                // // setTitleID(dataRecord.titleID);
                // setTitleName(dataRecord.titleName);
                // setTitleSort(dataRecord.titleSort);
                // setTitleURL(dataRecord.titleURL);
                // setAuthorFirstName(dataRecord.authorFirstName);
                // setAuthorLastName(dataRecord.authorLastName);
                // setManuscriptTitle(dataRecord.manuscriptTitle);
                // setWrittenDate(dataRecord.writtenDate);
                // setSubmissionDate(dataRecord.submissionDate);
                // setPublicationDate(dataRecord.publicationDate);
                // setImageName(dataRecord.imageName);
                // setCategoryID(dataRecord.categoryID);
                // setShortDescription(dataRecord.shortDescription);
                // setUrlPKDWeb(dataRecord.urlPKDWeb);
                setActive(dataRecord.active);

                // let categoryItem = getFirstItem(categoryList.filter(category => category.categoryID === dataRecord.categoryID));
                // // category: {categoryID: categoryItem[0].categoryID, category: categoryItem[0].category, sortID: categoryItem[0].sortID, active: categoryItem[0].active, createDate: categoryItem[0].createDate, updateDate: categoryItem[0].updateDate}

                // // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
                // dispatch(updateStateTitle({/* titleItemIndex: titleItemIndex, */ titleID: titleID, titleName: dataRecord.titleName, titleSort: dataRecord.titleSort, titleURL: dataRecord.titleURL, authorFirstName: dataRecord.authorFirstName, authorLastName: dataRecord.authorLastName, manuscriptTitle: dataRecord.manuscriptTitle, writtenDate: dataRecord.writtenDate, submissionDate: dataRecord.submissionDate, publicationDate: dataRecord.publicationDate, imageName: dataRecord.imageName, categoryID: dataRecord.categoryID, shortDescription: dataRecord.shortDescription, urlPKDWeb: dataRecord.urlPKDWeb, active: dataRecord.active, titleActive: dataRecord.active, updateDate: getDateTime() /* , category: { categoryID: categoryItem.categoryID, category: categoryItem.category, sortID: categoryItem.sortID, active: categoryItem.active, createDate: categoryItem.createDate, updateDate: categoryItem.updateDate } */ }));

                // // ? Update local storage also? -- 03/06/2021 MF

                // // * Update/Delete related editions also if active is set to false. -- 03/06/2021 MF
                // if (dataRecord.active === false || dataRecord.active === 0) {

                //   if (isNonEmptyArray(editionList) === true) {

                //     for (let i = 0; i < editionList.length; i++) {

                //       // let editionItemIndex = editionListState.findIndex(edition => edition.editionID === editionList[i].editionID);

                //       // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
                //       dispatch(updateStateEdition({/* editionItemIndex: editionItemIndex, */ editionID: editionList[i].editionID, titleID: editionList[i].titleID, mediaID: editionList[i].mediaID, publicationDate: editionList[i].publicationDate, imageName: editionList[i].imageName, ASIN: editionList[i].ASIN, textLinkShort: editionList[i].textLinkShort, textLinkFull: editionList[i].textLinkFull, imageLinkSmall: editionList[i].imageLinkSmall, imageLinkMedium: editionList[i].imageLinkMedium, imageLinkLarge: editionList[i].imageLinkLarge, textImageLink: editionList[i].textImageLink, active: false, createDate: editionList[i].createDate, updateDate: editionList[i].updateDate }));

                //     };

                //   };

                // };

                // // let urlListIndex = urlLookup.findIndex(url => url.linkType === "titles" && url.linkID === titleID);

                // // * Update/Delete related urls in arrayURLs also. -- 03/06/2021 MF
                // if (dataRecord.active === false || dataRecord.active === 0) {

                //   // dispatch(deleteStateURL(urlListIndex));
                //   dispatch(deleteStateURL({ linkID: titleID, linkType: "titles" }));

                // } else {

                //   let categoryName = categoryList.find(category => category.categoryID === dataRecord.categoryID);

                //   // ? Doesn't seem to be updating the state for some reason? -- 03/06/2021 MF
                //   // dispatch(updateStateURL([{urlListIndex: urlListIndex, linkName: dataRecord.titleURL, linkType: "title", linkID: titleID, linkTypeNameID: dataRecord.categoryID, linkTypeName: categoryName.category}]));

                //   // dispatch(deleteStateURL(urlListIndex));
                //   dispatch(deleteStateURL({ linkID: titleID, linkType: "titles" }));
                //   dispatch(addStateURL([{/* urlListIndex: urlListIndex, */ linkName: dataRecord.titleURL, linkType: "titles", linkID: titleID, linkTypeNameID: dataRecord.categoryID, linkTypeName: categoryName.category }]));

                // };

                // * Redirect to the new titleURL is that was changed. -- 03/06/2021 MF
                if (linkItem.linkName !== dataRecord.titleURL) {

                  redirectPage(dataRecord.titleURL);

                };

              } else {

                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);

              };

            })
            .catch((error) => {
              console.error(componentName, getDateTime(), "updateTitle error", error);
              // console.error(componentName, getDateTime(), "updateTitle error.name", error.name);
              // console.error(componentName, getDateTime(), "updateTitle error.message", error.message);

              addErrorMessage(error.name + ": " + error.message);

              // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

            });

        };

      };

    };

  };


  const deleteTitle = () => {

    clearMessages();
    setTitleRecordDeleted(null);
    setErrTitleName("");
    setErrCategoryID("");

    let url = baseURL + "titles/";

    if (isEmpty(titleID) === false) {

      url = url + titleID;

      if (isEmpty(sessionToken) === false) {

        fetch(url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          })
        })
          .then(results => {

            // if (results.ok !== true) {

            //     throw Error(results.status + " " + results.statusText + " " + results.url);

            // } else {

            // if (results.status === 200) {

            return results.json();

            // } else {

            //     return results.status;

            // };

            // };

          })
          .then(data => {

            setTitleRecordDeleted(data.transactionSuccess);

            addMessage(data.message); // * Never seen by the user if the delete was successful. -- 03/06/2021 MF

            if (data.transactionSuccess === true) {

              // dispatch(deleteStateTitle(titleID));
              // // dispatch(deleteStateTitle(titleItemIndex));
              // // ? Update local storage also? -- 03/06/2021 MF

              // if (isNonEmptyArray(editionList) === true) {

              //   // * Delete related editions also. -- 03/06/2021 MF
              //   for (let i = 0; i < editionList.length; i++) {

              //     // let editionItemIndex = editionListState.findIndex(edition => edition.editionID === editionList[i].editionID);

              //     deleteEdition(editionList[i].editionID /* , editionItemIndex */);

              //   };

              // };

              // // let urlListIndex = urlLookup.findIndex(url => url.linkType === "titles" && url.linkID === data.titleID);

              // // Update/Delete related urls in arrayURLs also
              // // dispatch(deleteStateURL(urlListIndex));
              // dispatch(deleteStateURL({ linkID: data.titleID, linkType: "titles" }));

              // // ? Redirect when the title is deleted? -- 03/06/2021 MF

            } else {

              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);

            };

          })
          .catch((error) => {
            console.error(componentName, getDateTime(), "deleteTitle error", error);
            // console.error(componentName, getDateTime(), "deleteTitle error.name", error.name);
            // console.error(componentName, getDateTime(), "deleteTitle error.message", error.message);

            addErrorMessage(error.name + ": " + error.message);

            // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  // const deleteEdition = (editionID /* , editionItemIndex */) => {

  //   clearMessages();
  //   setEditionRecordDeleted(null);

  //   let url = baseURL + "editions/";

  //   if (isEmpty(editionID) === false) {

  //     url = url + editionID;


  //     if (isEmpty(sessionToken) === false) {

  //       fetch(url, {
  //         method: "DELETE",
  //         headers: new Headers({
  //           "Content-Type": "application/json",
  //           "Authorization": sessionToken
  //         })
  //       })
  //         .then(results => {

  //           // if (results.ok !== true) {

  //           //     throw Error(results.status + " " + results.statusText + " " + results.url);

  //           // } else {

  //           // if (results.status === 200) {

  //           return results.json();

  //           // } else {

  //           //     return results.status;

  //           // };

  //           // };

  //         })
  //         .then(data => {

  //           setEditionRecordDeleted(data.transactionSuccess);

  //           addMessage(data.message); // Never seen by the user if the delete was successful

  //           if (data.transactionSuccess === true) {

  //             dispatch(deleteStateEdition(editionID));
  //             // dispatch(deleteStateEdition(editionItemIndex));
  //             // ? Update local storage also? -- 03/06/2021 MF

  //           } else {

  //             // addErrorMessage(data.error);
  //             addErrorMessage(data.errorMessages);

  //           };

  //         })
  //         .catch((error) => {
  //           console.error(componentName, getDateTime(), "deleteEdition error", error);
  //           // console.error(componentName, getDateTime(), "deleteEdition error.name", error.name);
  //           // console.error(componentName, getDateTime(), "deleteEdition error.message", error.message);

  //           addErrorMessage(error.name + ": " + error.message);

  //           // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

  //         });

  //     };

  //   };

  // };


  const redirectPage = (linkName) => {

    // * Scroll to top of the page after clicking the link. -- 08/05/2021 MF
    window.scrollTo(0, 0);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

  };


  return (
    <React.Fragment>

      {applicationAllowUserInteractions === true && isEmpty(admin) === false && admin === true ?

        <React.Fragment>

          <button aria-label={showForm === false ? "expand" : "collapse"} onClick={() => { setShowForm(!showForm); }}>

            <div>
              {isEmpty(titleItem) === true ? <React.Fragment>Add</React.Fragment> : <React.Fragment>Update</React.Fragment>} Title

              {showForm === false ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-up"></i>}
            </div>

            {showForm === true ?

              <span onClick={() => { setShowForm(!showForm); }}>

                <FormGroup className="text-center">
                  <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
                  <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
                </FormGroup>

                <FormGroup>
                  <Label for="txtTitleName">Title</Label>
                  <Input type="text" id="txtTitleName" value={txtTitleName} onChange={(event) => { setTxtTitleName(event.target.value); }} />
                  {isEmpty(errTitleName) === false ? <Alert color="danger">{errTitleName}</Alert> : null}
                </FormGroup>

                <FormGroup>
                  <Label for="txtTitleURL">Title URL</Label>
                  <Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={() => { setTxtTitleURL(createTitleURL(txtTitleName)); }}>Create Title URL</Button>
                  <Input type="text" id="txtTitleURL" value={txtTitleURL} onChange={(event) => { setTxtTitleURL(event.target.value); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtAuthorFirstName">Author First Name</Label>
                  <Input type="text" id="txtAuthorFirstName" value={txtAuthorFirstName} onChange={(event) => { setTxtAuthorFirstName(event.target.value); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtAuthorLastName">Author Last Name</Label>
                  <Input type="text" id="txtAuthorLastName" value={txtAuthorLastName} onChange={(event) => { setTxtAuthorLastName(event.target.value); }} />
                </FormGroup>

                <FormGroup>
                  <Label id="lblCategoryID" for="lblCategoryID">Category</Label>
                  <Input type="select" id="ddCategoryID" value={ddCategoryID} onChange={(event) => { setDdCategoryID(event.target.value); }}>
                    <option value="">Select a Category</option>

                    {isNonEmptyArray(categoryList) === true ?

                      <React.Fragment>

                        {categoryList.map((category) => {
                          return (
                            <React.Fragment key={category.categoryID}>
                              {/* {getCategoryIDFromCategoryName(categoryName) === category.categoryID ? <option selected value={category.categoryID}>{category.category}</option> : <option key={category.categoryID} value={category.categoryID}>{category.category}</option>} */}
                              <option key={category.categoryID} value={category.categoryID}>{category.category}</option>
                            </React.Fragment>
                          );
                        })}

                      </React.Fragment>

                      : null}

                  </Input>
                  {isEmpty(errCategoryID) === false ? <Alert color="danger">{errCategoryID}</Alert> : null}
                </FormGroup>

                <FormGroup>
                  <Label for="txtManuscriptTitle">Manuscript Title</Label>
                  <Input type="text" id="txtManuscriptTitle" value={txtManuscriptTitle} onChange={(event) => { setTxtManuscriptTitle(event.target.value); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtWrittenDate">Manuscript Written Date</Label>
                  <Input type="date" id="txtWrittenDate" value={txtWrittenDate} onChange={(event) => { setTxtWrittenDate(event.target.value); }} />
                </FormGroup>

                <FormGroup row>
                  <Col>

                    <Label for="txtSubmissionDate">Manuscript Submission Date</Label>
                    <Input type="date" id="txtSubmissionDate" value={txtSubmissionDate} onChange={(event) => { setTxtSubmissionDate(event.target.value); }} />

                  </Col>
                  <Col>

                    <Label for="txtPublicationDate">Publication Date</Label>
                    <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => { setTxtPublicationDate(event.target.value); }} />

                  </Col>

                </FormGroup>

                <FormGroup>
                  <Label for="txtImageName">Image Name</Label>
                  <Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={() => {/* createImageName(txtTitleName); */ setTxtImageName(createImageName(txtTitleName)); }}>Create Image Name</Button>
                  <Input type="text" id="txtImageName" value={txtImageName} onChange={(event) => { setTxtImageName(event.target.value); }} />
                  {isEmpty(txtImageName) === false ? <img src={txtImageName} alt={txtTitleName} className="cover-thumbnail" /> : <Image size="150" className="no-image-icon" />}
                </FormGroup>

                <FormGroup>
                  <Label for="txtShortDescription">Short Description</Label>
                  <Input type="textarea" id="txtShortDescription" rows={10} value={txtShortDescription} onChange={(event) => { setTxtShortDescription(event.target.value); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtUrlPKDWeb">url PKDWeb</Label>
                  <Input type="text" id="txtUrlPKDWeb" value={txtUrlPKDWeb} onChange={(event) => { setTxtUrlPKDWeb(event.target.value); }} />
                </FormGroup>

                {isEmpty(titleItem) === true ?

                  <Button outline size="lg" color="primary" onClick={addTitle}>Add Title</Button>

                  :

                  <React.Fragment>

                    <Button outline size="lg" color="primary" onClick={(event) => { updateTitle(false); }}>Update Title</Button>

                    {isEmpty(active) === false && (active === false || active === 0) ?

                      <Button outline size="lg" color="danger" onClick={(event) => { updateTitle(false); }}>Undelete/Restore Title</Button>

                      : null}

                    {isEmpty(active) === false && (active === true || active === 1) ?

                      <Button outline size="lg" color="danger" onClick={(event) => { updateTitle(true); }}>Delete Title</Button>

                      : null}

                    <Button outline size="lg" color="warning" onClick={(event) => { deleteTitle(); }}>Hard Delete Title</Button>

                  </React.Fragment>
                }

                {/* <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button> */}

              </span>

              : null}

          </button>

        </React.Fragment>

        : null}

    </React.Fragment>
  );
};

export default EditTitle;
