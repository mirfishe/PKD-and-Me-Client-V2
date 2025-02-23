import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import { isEmpty, getDateTime, isNonEmptyArray, getFirstItem, displayValue, formatTrim, formatToString, addErrorLog } from "shared-functions";
import { getASIN, removeOnePixelImage } from "../../utilities/ApplicationFunctions";
// import { addStateEdition, updateStateEdition, deleteStateEdition } from "../../app/editionsSlice";

const EditEdition = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: editionID, titleID, titleImageName, titlePublicationDate -- 10/21/2022 MF

  const componentName = "EditEdition";

  const dispatch = useDispatch();

  const baseURL = useSelector(state => state.applicationSettings.baseURL);

  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const mediaListState = useSelector(state => state.media.arrayMedia);
  const titleListState = useSelector(state => state.titles.arrayTitles);
  const editionListState = useSelector(state => state.editions.arrayEditions);

  let editionID = isEmpty(props) === false && isEmpty(props.editionID) === false ? props.editionID : 0;
  let titleID = isEmpty(props) === false && isEmpty(props.titleID) === false ? props.titleID : 0;
  let titleImageName = isEmpty(props) === false && isEmpty(props.titleImageName) === false ? props.titleImageName : "";
  let titlePublicationDate = isEmpty(props) === false && isEmpty(props.titlePublicationDate) === false ? props.titlePublicationDate : null;

  const [showForm, setShowForm] = useState(false);

  const [mediaMessage, setMediaMessage] = useState("");
  const [errMediaMessage, setErrMediaMessage] = useState("");
  const [mediaResultsFound, setMediaResultsFound] = useState(null);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [editionRecordAdded, setEditionRecordAdded] = useState(null);
  const [editionRecordUpdated, setEditionRecordUpdated] = useState(null);
  const [editionRecordDeleted, setEditionRecordDeleted] = useState(null);

  const [ddMediaID, setDdMediaID] = useState("");
  const [txtPublicationDate, setTxtPublicationDate] = useState("");
  const [txtImageName, setTxtImageName] = useState("");
  const [txtASIN, setTxtASIN] = useState("");
  const [txtTextLinkShort, setTxtTextLinkShort] = useState("");
  const [txtTextLinkFull, setTxtTextLinkFull] = useState("");
  const [txtImageLinkSmall, setTxtImageLinkSmall] = useState("");
  const [txtImageLinkMedium, setTxtImageLinkMedium] = useState("");
  const [txtImageLinkLarge, setTxtImageLinkLarge] = useState("");
  const [txtTextImageLink, setTxtTextImageLink] = useState("");

  const [errMediaID, setErrMediaID] = useState("");

  // const [editionItemIndex, setEditionItemIndex] = useState(null);
  const [editionItem, setEditionItem] = useState(null);
  // const [editionID, setEditionID] = useState(null);
  // const [titleID, setTitleID] = useState(null);
  // const [mediaID, setMediaID] = useState(null);
  // const [publicationDate, setPublicationDate] = useState(null);
  // const [imageName, setImageName] = useState(null);
  // const [ASIN, setASIN] = useState(null);
  // const [textLinkShort, setTextLinkShort] = useState(null);
  // const [textLinkFull, setTextLinkFull] = useState(null);
  // const [imageLinkSmall, setImageLinkSmall,] = useState(null);
  // const [imageLinkMedium, setImageLinkMedium] = useState(null);
  // const [imageLinkLarge, setImageLinkLarge] = useState(null);
  // const [textImageLink, setTextImageLink] = useState(null);
  const [active, setActive] = useState(null);

  const [ASINMessage, setASINMessage] = useState("");
  const [errASINMessage, setErrASINMessage] = useState("");
  const [ASINResultsFound, setASINResultsFound] = useState(null);

  let mediaList = mediaListState.filter(media => media.active === true || media.active === 1);
  // let mediaList = mediaListState.filter(media => media.mediaActive === true || media.mediaActive === 1);

  // mediaList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);
  // * Sort the list alphabetically instead of by sortID
  mediaList.sort((a, b) => (a.media > b.media) ? 1 : -1);

  // ! This code is causing React to have too many re-renders in this location
  // if (mediaList.length < 1) {

  //     console.error(componentName, getDateTime(), "mediaList is empty", mediaList.length);
  //     setErrMediaMessage("mediaList is empty", mediaList.length);
  //     setMediaResultsFound(false);

  // } else {

  //     console.error(componentName, getDateTime(), "mediaList.length", mediaList.length);
  //     setMediaMessage("mediaList.length", mediaList.length);
  //     setMediaResultsFound(true);

  // };


  // useEffect(() => {

  //   if (admin !== true) {

  //     // return <Redirect to="/" />;
  //     setModal(false);

  //   };

  // }, [admin]);


  useEffect(() => {

    if (mediaList.length < 1) {

      console.error(componentName, getDateTime(), "mediaList is empty", mediaList.length);
      setErrMediaMessage("mediaList is empty", mediaList.length);
      setMediaResultsFound(false);

    } else {

      // setMediaMessage("mediaList.length", mediaList.length);
      setMediaResultsFound(true);

    };

  }, [mediaList]);


  useEffect(() => {

    if (isEmpty(editionID) === false) {

      let editionObject = editionListState.find(edition => edition.editionID === editionID);

      // setEditionItemIndex(editionListState.findIndex(edition => edition.editionID === editionID));

      if (isEmpty(editionObject) === false) {

        setEditionItem(editionObject);
        // setEditionID(editionObject.editionID);
        // setTitleID(editionObject.titleID);
        // setMediaID(editionObject.mediaID);
        // setPublicationDate(editionObject.publicationDate);
        // setImageName(editionObject.imageName);
        // setASIN(editionObject.ASIN);
        // setTextLinkShort(editionObject.textLinkShort);
        // setTextLinkFull(editionObject.textLinkFull);
        // setImageLinkSmall(editionObject.imageLinkSmall);
        // setImageLinkMedium(editionObject.imageLinkMedium);
        // setImageLinkLarge(editionObject.imageLinkLarge);
        // setTextImageLink(editionObject.textImageLink);
        setActive(editionObject.active);

        setDdMediaID(editionObject.mediaID);

        if (isEmpty(editionObject.publicationDate) === false) {

          setTxtPublicationDate(formatToString(editionObject.publicationDate).substring(0, 10));

        } else {

          setTxtPublicationDate("");

        };

        setTxtImageName(editionObject.imageName);
        setTxtASIN(editionObject.ASIN);
        setTxtTextLinkShort(editionObject.textLinkShort);
        setTxtTextLinkFull(editionObject.textLinkFull);
        setTxtImageLinkSmall(editionObject.imageLinkSmall);
        setTxtImageLinkMedium(editionObject.imageLinkMedium);
        setTxtImageLinkLarge(editionObject.imageLinkLarge);
        setTxtTextImageLink(editionObject.textImageLink);

      };

    };

  }, [editionID, editionListState]);


  useEffect(() => {

    if (isEmpty(editionRecordAdded) === false && editionRecordAdded === true) {

      clearMessages();
      setErrMediaID("");
      setEditionRecordAdded(null);

      setDdMediaID("");
      setTxtPublicationDate("");
      setTxtImageName("");
      setTxtASIN("");
      setTxtTextLinkShort("");
      setTxtTextLinkFull("");
      setTxtImageLinkSmall("");
      setTxtImageLinkMedium("");
      setTxtImageLinkLarge("");
      setTxtTextImageLink("");

      // setModal(!modal);

    };

  }, [editionRecordAdded]);


  useEffect(() => {

    if (isEmpty(editionRecordUpdated) === false && editionRecordUpdated === true) {

      clearMessages();
      setErrMediaID("");
      setEditionRecordUpdated(null);

      setDdMediaID("");
      setTxtPublicationDate("");
      setTxtImageName("");
      setTxtASIN("");
      setTxtTextLinkShort("");
      setTxtTextLinkFull("");
      setTxtImageLinkSmall("");
      setTxtImageLinkMedium("");
      setTxtImageLinkLarge("");
      setTxtTextImageLink("");

      // setModal(!modal);

    };

    if (isEmpty(editionRecordDeleted) === false && editionRecordDeleted === true) {

      clearMessages();
      setErrMediaID("");
      setEditionRecordDeleted(null);

      setDdMediaID("");
      setTxtPublicationDate("");
      setTxtImageName("");
      setTxtASIN("");
      setTxtTextLinkShort("");
      setTxtTextLinkFull("");
      setTxtImageLinkSmall("");
      setTxtImageLinkMedium("");
      setTxtImageLinkLarge("");
      setTxtTextImageLink("");

      // setModal(!modal);

    };

  }, [editionRecordUpdated, editionRecordDeleted]);


  const addEdition = () => {

    clearMessages();
    setEditionRecordAdded(null);
    setErrMediaID("");

    setEditionItem(null);
    // setEditionID(null);
    // setTitleID(null);
    // setMediaID(null);
    // setPublicationDate(null);
    // setImageName(null);
    // setASIN(null);
    // setTextLinkShort(null);
    // setTextLinkFull(null);
    // setImageLinkSmall(null);
    // setImageLinkMedium(null);
    // setImageLinkLarge(null);
    // setTextImageLink(null);
    setActive(null);

    let mediaIDValidated = false;
    let formValidated = false;

    // ? Check to make sure that titleID is a number? -- 03/06/2021 MF

    if (isEmpty(ddMediaID) === false) {

      mediaIDValidated = true;
      setErrMediaID("");

    } else {

      mediaIDValidated = false;
      setErrMediaID("Please select a media.");

    };

    if (mediaIDValidated === true) {

      formValidated = true;

    } else {

      formValidated = false;

    };

    if (formValidated === true) {

      let recordObject = {
        titleID: parseInt(titleID),
        mediaID: parseInt(ddMediaID),
        // imageName: formatTrim(txtImageName),
        // ASIN: formatTrim(txtASIN),
        // textLinkShort: formatTrim(txtTextLinkShort),
        // textLinkFull: formatTrim(txtTextLinkFull),
        // imageLinkSmall: formatTrim(txtImageLinkSmall),
        // imageLinkMedium: formatTrim(txtImageLinkMedium),
        // imageLinkLarge: formatTrim(txtImageLinkLarge),
        // textImageLink: formatTrim(txtTextImageLink)
      };

      // * If the user doesn't enter a publication date, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtPublicationDate) === false) {

        if (formatTrim(txtPublicationDate).length !== 0) {

          Object.assign(recordObject, { publicationDate: formatTrim(txtPublicationDate) });

        };

      };

      // * If the user doesn't enter an image name, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtImageName) === false) {

        if (formatTrim(txtImageName).length !== 0) {

          Object.assign(recordObject, { imageName: formatTrim(txtImageName) });

        };

      };

      // * If the user doesn't enter an ASIN, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtASIN) === false) {

        if (formatTrim(txtASIN).length !== 0) {

          Object.assign(recordObject, { ASIN: formatTrim(txtASIN) });

        };

      };

      // * If the user doesn't enter a textLinkShort, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtTextLinkShort) === false) {

        if (formatTrim(txtTextLinkShort).length !== 0) {

          Object.assign(recordObject, { textLinkShort: formatTrim(txtTextLinkShort) });

        };

      };

      // * If the user doesn't enter a textLinkFull, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtTextLinkFull) === false) {

        if (formatTrim(txtTextLinkFull).length !== 0) {

          Object.assign(recordObject, { textLinkFull: formatTrim(txtTextLinkFull) });

        };

      };

      // * If the user doesn't enter an imageLinkSmall, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtImageLinkSmall) === false) {

        if (formatTrim(txtImageLinkSmall).length !== 0) {

          Object.assign(recordObject, { imageLinkSmall: formatTrim(txtImageLinkSmall) });

        };

      };

      // * If the user doesn't enter an imageLinkMedium, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtImageLinkMedium) === false) {

        if (formatTrim(txtImageLinkMedium).length !== 0) {

          Object.assign(recordObject, { imageLinkMedium: formatTrim(txtImageLinkMedium) });

        };

      };

      // * If the user doesn't enter an imageLinkLarge, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtImageLinkLarge) === false) {

        if (formatTrim(txtImageLinkLarge).length !== 0) {

          Object.assign(recordObject, { imageLinkLarge: formatTrim(txtImageLinkLarge) });

        };

      };

      // * If the user doesn't enter a textImageLink, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtTextImageLink) === false) {

        if (formatTrim(txtTextImageLink).length !== 0) {

          Object.assign(recordObject, { textImageLink: formatTrim(txtTextImageLink) });

        };

      };

      let url = baseURL + "editions/";

      if (isEmpty(sessionToken) === false) {

        fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          }),
          body: JSON.stringify({ edition: recordObject })
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

            setEditionRecordAdded(data.transactionSuccess);
            addMessage(data.message);

            if (data.transactionSuccess === true) {

              let dataRecord = getFirstItem(data.records);

              // setEditionItem(dataRecord);
              // // setEditionID(dataRecord.editionID);
              // setTitleID(dataRecord.titleID);
              // // setMediaID(dataRecord.mediaID);
              // // setPublicationDate(dataRecord.publicationDate);
              // // setImageName(dataRecord.imageName);
              // // setASIN(dataRecord.ASIN);
              // // setTextLinkShort(dataRecord.textLinkShort);
              // // setTextLinkFull(dataRecord.textLinkFull);
              // // setImageLinkSmall(dataRecord.imageLinkSmall);
              // // setImageLinkMedium(dataRecord.imageLinkMedium);
              // // setImageLinkLarge(dataRecord.imageLinkLarge);
              // // setTextImageLink(dataRecord.textImageLink);
              // setActive(dataRecord.active);

              // let mediaItem = getFirstItem(mediaListState.filter(media => media.mediaID === dataRecord.mediaID));
              // // medium: {mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate}

              // let titleItem = getFirstItem(titleListState.filter(title => title.titleID === dataRecord.titleID));
              // // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}

              // // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
              // dispatch(addStateEdition([{ editionID: dataRecord.editionID, titleID: dataRecord.titleID, mediaID: dataRecord.mediaID, publicationDate: dataRecord.publicationDate, imageName: dataRecord.imageName, ASIN: dataRecord.ASIN, textLinkShort: dataRecord.textLinkShort, textLinkFull: dataRecord.textLinkFull, imageLinkSmall: dataRecord.imageLinkSmall, imageLinkMedium: dataRecord.imageLinkMedium, imageLinkLarge: dataRecord.imageLinkLarge, textImageLink: dataRecord.textImageLink, active: dataRecord.active, editionActive: dataRecord.active, createDate: dataRecord.createDate, updateDate: dataRecord.updateDate /* , medium: { mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate } */, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, mediaActive: mediaItem.active, mediaCreateDate: mediaItem.createDate, mediaUpdatedDate: mediaItem.updateDate /* , title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate } */, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, submissionDate: titleItem.submissionDate, titlePublicationDate: titleItem.publicationDate, titleImageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, titleActive: titleItem.active, titleCreateDate: titleItem.createDate, titleUpdatedDate: titleItem.updateDate }]));

              // // ? Add to local storage also? -- 03/06/2021 MF

            } else {

              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);

            };

          })
          .catch((error) => {
            console.error(componentName, getDateTime(), "addEdition error", error);
            // console.error(componentName, getDateTime(), "addEdition error.name", error.name);
            // console.error(componentName, getDateTime(), "addEdition error.message", error.message);

            addErrorMessage(error.name + ": " + error.message);

            // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  const updateEdition = (deleteEdition) => {

    clearMessages();
    setEditionRecordUpdated(null);
    setErrMediaID("");

    setEditionItem(null);
    // setEditionID(null);
    // setTitleID(null);
    // setMediaID(null);
    // setPublicationDate(null);
    // setImageName(null);
    // setASIN(null);
    // setTextLinkShort(null);
    // setTextLinkFull(null);
    // setImageLinkSmall(null);
    // setImageLinkMedium(null);
    // setImageLinkLarge(null);
    // setTextImageLink(null);
    setActive(null);

    let mediaIDValidated = false;
    let formValidated = false;

    // ? Check to make sure that editionID is a number? -- 03/06/2021 MF

    if (isEmpty(ddMediaID) === false) {

      mediaIDValidated = true;
      setErrMediaID("");

    } else {

      mediaIDValidated = false;
      setErrMediaID("Please select a media.");

    };

    if (mediaIDValidated === true) {

      formValidated = true;

    } else {

      formValidated = false;

    };

    if (formValidated === true) {

      let recordObject = {
        editionID: editionID,
        titleID: parseInt(titleID),
        mediaID: parseInt(ddMediaID),
        // imageName: formatTrim(txtImageName),
        // ASIN: formatTrim(txtASIN),
        // textLinkShort: formatTrim(txtTextLinkShort),
        // textLinkFull: formatTrim(txtTextLinkFull),
        // imageLinkSmall: formatTrim(txtImageLinkSmall),
        // imageLinkMedium: formatTrim(txtImageLinkMedium),
        // imageLinkLarge: formatTrim(txtImageLinkLarge),
        // textImageLink: formatTrim(txtTextImageLink),
        active: !deleteEdition
      };

      // * If the user doesn't enter a publication date, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtPublicationDate) === false) {

        if (formatTrim(txtPublicationDate).length !== 0) {

          Object.assign(recordObject, { publicationDate: formatTrim(txtPublicationDate) });

        };

      };

      // * If the user doesn't enter an image name, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtImageName) === false) {

        if (formatTrim(txtImageName).length !== 0) {

          Object.assign(recordObject, { imageName: formatTrim(txtImageName) });

        };

      };

      // * If the user doesn't enter an ASIN, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtASIN) === false) {

        if (formatTrim(txtASIN).length !== 0) {

          Object.assign(recordObject, { ASIN: formatTrim(txtASIN) });

        };

      };

      // * If the user doesn't enter a textLinkShort, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtTextLinkShort) === false) {

        if (formatTrim(txtTextLinkShort).length !== 0) {

          Object.assign(recordObject, { textLinkShort: formatTrim(txtTextLinkShort) });

        };

      };

      // * If the user doesn't enter a textLinkFull, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtTextLinkFull) === false) {

        if (formatTrim(txtTextLinkFull).length !== 0) {

          Object.assign(recordObject, { textLinkFull: formatTrim(txtTextLinkFull) });

        };

      };

      // * If the user doesn't enter an imageLinkSmall, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtImageLinkSmall) === false) {

        if (formatTrim(txtImageLinkSmall).length !== 0) {

          Object.assign(recordObject, { imageLinkSmall: formatTrim(txtImageLinkSmall) });

        };

      };

      // * If the user doesn't enter an imageLinkMedium, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtImageLinkMedium) === false) {

        if (formatTrim(txtImageLinkMedium).length !== 0) {

          Object.assign(recordObject, { imageLinkMedium: formatTrim(txtImageLinkMedium) });

        };

      };

      // * If the user doesn't enter an imageLinkLarge, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtImageLinkLarge) === false) {

        if (formatTrim(txtImageLinkLarge).length !== 0) {

          Object.assign(recordObject, { imageLinkLarge: formatTrim(txtImageLinkLarge) });

        };

      };

      // * If the user doesn't enter a textImageLink, then it isn't added/updated. -- 03/06/2021 MF
      if (isEmpty(txtTextImageLink) === false) {

        if (formatTrim(txtTextImageLink).length !== 0) {

          Object.assign(recordObject, { textImageLink: formatTrim(txtTextImageLink) });

        };

      };

      let url = baseURL + "editions/";

      if (isEmpty(editionID) === false && isEmpty(sessionToken) === false) {

        url = url + editionID;

        fetch(url, {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          }),
          body: JSON.stringify({ edition: recordObject })
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

            setEditionRecordUpdated(data.transactionSuccess);
            addMessage(data.message);

            if (data.transactionSuccess === true) {

              let dataRecord = getFirstItem(data.records);

              setEditionItem(dataRecord);
              // setEditionID(dataRecord.editionID);
              // setTitleID(dataRecord.titleID);
              // setMediaID(dataRecord.mediaID);
              // setPublicationDate(dataRecord.publicationDate);
              // setImageName(dataRecord.imageName);
              // setASIN(dataRecord.ASIN);
              // setTextLinkShort(dataRecord.textLinkShort);
              // setTextLinkFull(dataRecord.textLinkFull);
              // setImageLinkSmall(dataRecord.imageLinkSmall);
              // setImageLinkMedium(dataRecord.imageLinkMedium);
              // setImageLinkLarge(dataRecord.imageLinkLarge);
              // setTextImageLink(dataRecord.textImageLink);
              setActive(dataRecord.active);

              // let mediaItem = getFirstItem(mediaListState.filter(media => media.mediaID === dataRecord.mediaID));
              // // medium: {mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate}

              // let titleItem = getFirstItem(titleListState.filter(title => title.titleID === dataRecord.titleID));
              // // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}

              // // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
              // dispatch(updateStateEdition({/* editionItemIndex: editionItemIndex, */ editionID: editionID, titleID: dataRecord.titleID, mediaID: dataRecord.mediaID, publicationDate: dataRecord.publicationDate, imageName: dataRecord.imageName, ASIN: dataRecord.ASIN, textLinkShort: dataRecord.textLinkShort, textLinkFull: dataRecord.textLinkFull, imageLinkSmall: dataRecord.imageLinkSmall, imageLinkMedium: dataRecord.imageLinkMedium, imageLinkLarge: dataRecord.imageLinkLarge, textImageLink: dataRecord.textImageLink, active: dataRecord.active, editionActive: dataRecord.active, updateDate: getDateTime() /* , medium: { mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate }, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate } */ }));

              // // ? Add to local storage also? -- 03/06/2021 MF

            } else {

              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);

            };

          })
          .catch((error) => {
            console.error(componentName, getDateTime(), "updateEdition error", error);
            // console.error(componentName, getDateTime(), "updateEdition error.name", error.name);
            // console.error(componentName, getDateTime(), "updateEdition error.message", error.message);

            addErrorMessage(error.name + ": " + error.message);

            // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  const deleteEdition = () => {

    clearMessages();
    setEditionRecordDeleted(null);
    setErrMediaID("");

    let url = baseURL + "editions/";

    if (isEmpty(editionID) === false) {

      url = url + editionID;

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

            setEditionRecordDeleted(data.transactionSuccess);

            addMessage(data.message); // * Never seen by the user if the delete was successful. -- 03/06/2021 MF

            if (data.transactionSuccess === true) {

              // // dispatch(deleteStateEdition(editionID));
              // // dispatch(deleteStateEdition(editionItemIndex));
              // dispatch(deleteStateEdition(data.editionID));
              // // ? Update local storage also?. -- 03/06/2021 MF

            } else {

              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);

            };

          })
          .catch((error) => {
            console.error(componentName, getDateTime(), "deleteEdition error", error);
            // console.error(componentName, getDateTime(), "deleteEdition error.name", error.name);
            // console.error(componentName, getDateTime(), "deleteEdition error.message", error.message);

            addErrorMessage(error.name + ": " + error.message);

            // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  const checkASIN = (ASIN) => {

    setASINMessage("");
    setErrASINMessage("");
    setASINResultsFound(null);

    let url = baseURL + "editions/ASIN/";

    if (isEmpty(ASIN) === false) {

      url = url + ASIN;

      fetch(url)
        .then(results => {

          if (results.ok !== true) {

            throw Error(results.status + " " + results.statusText + " " + results.url);

          } else {

            return results.json();

          };

        })
        .then(results => {

          setASINResultsFound(results.transactionSuccess);
          setASINMessage(results.message);

          if (isEmpty(results) === false && results.transactionSuccess === true) {

            setASINMessage(results.message + "That ASIN already exists in the database. " + results.records[0].titleName + " (" + results.records[0].media + ") editionID=" + results.records[0].editionID);

          } else {

            setErrASINMessage(results.message + "That ASIN does not exist in the database");

          };

        })
        .catch((error) => {
          console.error(componentName, getDateTime(), "checkASIN error", error);
          // console.error(componentName, getDateTime(), "checkASIN error.name", error.name);
          // console.error(componentName, getDateTime(), "checkASIN error.message", error.message);

          setErrASINMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const copyTitlePublicationDate = () => {

    if (isEmpty(titlePublicationDate) === false) {

      setTxtPublicationDate(formatToString(titlePublicationDate).substring(0, 10));

    } else {

      setTxtPublicationDate(undefined);

    };

  };


  const copyTitleImageName = () => {

    if (isEmpty(titleImageName) === false) {

      setTxtImageName(formatToString(titleImageName));

    } else {

      setTxtImageName(undefined);

    };

  };


  return (
    <React.Fragment>

      {applicationAllowUserInteractions === true && isEmpty(admin) === false && admin === true ?

        <React.Fragment>

          <button aria-label={showForm === false ? "expand" : "collapse"} onClick={() => { setShowForm(!showForm); }}>

            <div>
              {isEmpty(editionItem) === true ? <React.Fragment>Add</React.Fragment> : <React.Fragment>Update</React.Fragment>} Edition

              {showForm === false ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-up"></i>}
            </div>

            {showForm === true ?

              <span onClick={() => { setShowForm(!showForm); }}>

                <FormGroup className="text-center">
                  <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
                  <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
                  {isEmpty(mediaMessage) === false ? <Alert color="info">{mediaMessage}</Alert> : null}
                  {isEmpty(errMediaMessage) === false ? <Alert color="danger">{errMediaMessage}</Alert> : null}
                </FormGroup>

                <FormGroup row>
                  <Col>

                    <Label for="ddMediaID">Media</Label>
                    <Input type="select" id="ddMediaID" value={ddMediaID} onChange={(event) => { setDdMediaID(event.target.value); }}>
                      <option value="">Select a Media</option>

                      {isNonEmptyArray(mediaList) === true ?

                        <React.Fragment>

                          {mediaList.map((media) => {
                            return (
                              <option key={media.mediaID} value={media.mediaID}>{media.media}</option>
                            );
                          })}

                        </React.Fragment>

                        : null}

                    </Input>
                    {isEmpty(errMediaID) === false ? <Alert color="danger">{errMediaID}</Alert> : null}

                  </Col>
                  <Col>

                    <Label for="txtPublicationDate">Publication Date</Label> {isEmpty(titlePublicationDate) === false ? <Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={copyTitlePublicationDate}>Copy Title Publication Date</Button> : null}
                    <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => { setTxtPublicationDate(event.target.value); }} />

                  </Col>

                </FormGroup>

                <FormGroup>
                  <Label for="txtImageName">Image Name</Label> {isEmpty(titleImageName) === false ? <Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={copyTitleImageName}>Copy Title Image Name</Button> : null}
                  <Input type="text" id="txtImageName" value={txtImageName} onChange={(event) => { setTxtImageName(event.target.value); }} />
                  {isEmpty(txtImageName) === false ? <img src={txtImageName} alt="Edition" /> : <Image size="150" className="no-image-icon" />}
                </FormGroup>

                <FormGroup>
                  {isEmpty(txtTextLinkFull) === false ? <Alert color="info">{getASIN(txtTextLinkFull)}</Alert> : null}
                  {isEmpty(ASINMessage) === false ? <Alert color="info">{ASINMessage}</Alert> : null}
                  {isEmpty(errASINMessage) === false ? <Alert color="danger">{errASINMessage}</Alert> : null}
                  <Label for="txtASIN">ASIN</Label><Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={(event) => { checkASIN(txtASIN); }}>Check for ASIN</Button>
                  <Input type="text" id="txtASIN" value={txtASIN} onChange={(event) => { setTxtASIN(event.target.value); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtTextLinkShort">Text Link Short</Label>
                  <Input type="text" id="txtTextLinkShort" value={txtTextLinkShort} onChange={(event) => { setTxtTextLinkShort(event.target.value); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtTextLinkFull">Text Link Full (Can include non-Amazon.com links)</Label><Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={() => { setTxtASIN(getASIN(txtTextLinkFull)); }}>Copy ASIN</Button>
                  <Input type="textarea" id="txtTextLinkFull" rows={5} value={txtTextLinkFull} onChange={(event) => { setTxtTextLinkFull(event.target.value); setTxtASIN(getASIN(txtTextLinkFull)); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtImageLinkSmall">Image Link Small</Label><Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={() => { setTxtImageLinkSmall(removeOnePixelImage(txtImageLinkSmall, txtASIN)); }}>Remove One Pixel Image</Button>
                  <Input type="textarea" id="txtImageLinkSmall" rows={10} value={txtImageLinkSmall} onChange={(event) => { setTxtImageLinkSmall(event.target.value); setTxtASIN(getASIN(txtTextLinkFull)); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtImageLinkMedium">Image Link Medium</Label><Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={() => { setTxtImageLinkMedium(removeOnePixelImage(txtImageLinkMedium, txtASIN)); }}>Remove One Pixel Image</Button>
                  <Input type="textarea" id="txtImageLinkMedium" rows={10} value={txtImageLinkMedium} onChange={(event) => { setTxtImageLinkMedium(event.target.value); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtImageLinkLarge">Image Link Large</Label><Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={() => { setTxtImageLinkLarge(removeOnePixelImage(txtImageLinkLarge, txtASIN)); }}>Remove One Pixel Image</Button>
                  <Input type="textarea" id="txtImageLinkLarge" rows={10} value={txtImageLinkLarge} onChange={(event) => { setTxtImageLinkLarge(event.target.value); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtTextImageLink">Text Image Link</Label>
                  <Input type="textarea" id="txtTextImageLink" rows={10} value={txtTextImageLink} onChange={(event) => { setTxtTextImageLink(event.target.value); }} />
                </FormGroup>

                {isEmpty(editionItem) === true ?

                  <Button outline size="lg" color="primary" onClick={addEdition}>Add Edition</Button>

                  :

                  <React.Fragment>

                    <Button outline size="lg" color="primary" onClick={(event) => { updateEdition(false); }}>Update Edition</Button>

                    {isEmpty(active) === false && (active === false || active === 0) ?

                      <Button outline size="lg" color="danger" onClick={(event) => { updateEdition(false); }}>Undelete/Restore Edition</Button>

                      : null}

                    {isEmpty(active) === false && (active === true || active === 1) ?

                      <Button outline size="lg" color="danger" onClick={(event) => { updateEdition(true); }}>Delete Edition</Button>

                      : null}

                    <Button outline size="lg" color="warning" onClick={(event) => { deleteEdition(); }}>Hard Delete Edition</Button>
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

export default EditEdition;
