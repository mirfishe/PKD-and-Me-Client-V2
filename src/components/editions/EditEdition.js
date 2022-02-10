import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Image, PencilSquare, Plus } from 'react-bootstrap-icons';
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime, formatTrim, formatToString } from "../../utilities/SharedFunctions";
import { getASIN, removeOnePixelImage, addErrorLog } from "../../utilities/ApplicationFunctions";
import { addStateEdition, updateStateEdition, deleteStateEdition } from "../../app/editionsSlice";

const EditEdition = (props) => {

  const componentName = "EditEdition";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, getDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, getDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;
  // console.log(componentName, getDateTime(), "baseURL", baseURL);

  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

  // console.log(componentName, getDateTime(), "props.editionID", props.editionID);
  // console.log(componentName, getDateTime(), "props.titleID", props.titleID); // Would come from the record that is being edited
  // console.log(componentName, getDateTime(), "props.titlePublicationDate", props.titlePublicationDate);

  const [mediaMessage, setMediaMessage] = useState("");
  const [errMediaMessage, setErrMediaMessage] = useState("");
  const [mediaResultsFound, setMediaResultsFound] = useState(null);

  const mediaListState = useSelector(state => state.media.arrayMedia);
  // console.log(componentName, getDateTime(), "mediaListState", mediaListState);

  const mediaList = mediaListState.filter(media => media.active === true || media.active === 1);
  // const mediaList = mediaListState.filter(media => media.mediaActive === true || media.mediaActive === 1);
  // console.log(componentName, getDateTime(), "mediaList", mediaList);

  // mediaList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);
  // * Sort the list alphabetically instead of by sortID
  mediaList.sort((a, b) => (a.media > b.media) ? 1 : -1);

  // ! This code is causing React to have too many re-renders in this location
  // if (mediaList.length < 1) {

  //     console.log(componentName, getDateTime(), "mediaList is empty", mediaList.length);
  //     setErrMediaMessage("mediaList is empty", mediaList.length);
  //     setMediaResultsFound(false);

  // } else {

  //     console.log(componentName, getDateTime(), "mediaList.length", mediaList.length);
  //     setMediaMessage("mediaList.length", mediaList.length);
  //     setMediaResultsFound(true);

  // };


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect mediaList", mediaList);

    if (mediaList.length < 1) {

      console.log(componentName, getDateTime(), "mediaList is empty", mediaList.length);
      setErrMediaMessage("mediaList is empty", mediaList.length);
      setMediaResultsFound(false);

    } else {

      // console.log(componentName, getDateTime(), "mediaList.length", mediaList.length);
      // setMediaMessage("mediaList.length", mediaList.length);
      setMediaResultsFound(true);

    };

  }, [mediaList]);


  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, getDateTime(), "titleListState", titleListState);

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
  const [titleID, setTitleID] = useState(null);
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

  const editionListState = useSelector(state => state.editions.arrayEditions);
  // console.log(componentName, getDateTime(), "editionListState", editionListState);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect editionListState", editionListState);

    if (isEmpty(props.editionID) === false) {

      let editionObject = editionListState.find(edition => edition.editionID === props.editionID);
      // console.log(componentName, getDateTime(), "useEffect editionObject", editionObject);
      // console.log(componentName, getDateTime(), "useEffect typeof editionObject", typeof editionObject);

      // setEditionItemIndex(editionListState.findIndex(edition => edition.editionID === props.editionID));
      // console.log(componentName, getDateTime(), "useEffect editionItemIndex", editionItemIndex);

      if (isEmpty(editionObject) === false) {

        setEditionItem(editionObject);
        // setEditionID(editionObject.editionID);
        setTitleID(editionObject.titleID);
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

  }, [props.editionID, editionListState]);


  const addEdition = () => {
    // console.log(componentName, getDateTime(), "addEdition baseURL", baseURL);
    // console.log(componentName, getDateTime(), "addEdition props.titleID", props.titleID);

    clearMessages();
    setEditionRecordAdded(null);
    setErrMediaID("");

    setEditionItem(null);
    // setEditionID(null);
    setTitleID(null);
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

    // ? Check to make sure that props.titleID is a number? -- 03/06/2021 MF

    if (isEmpty(ddMediaID) === false) {

      mediaIDValidated = true;
      setErrMediaID("");
      // console.log(componentName, getDateTime(), "addEdition Valid mediaID");
      // console.log(componentName, getDateTime(), "addEdition mediaIDValidated true", mediaIDValidated);

    } else {

      mediaIDValidated = false;
      setErrMediaID("Please select a media.");
      // console.log(componentName, getDateTime(), "addEdition Invalid mediaID");
      // console.log(componentName, getDateTime(), "addEdition mediaIDValidated false", mediaIDValidated);

    };

    if (mediaIDValidated === true) {

      formValidated = true;
      // console.log(componentName, getDateTime(), "addEdition Valid Form");
      // console.log(componentName, getDateTime(), "addEdition formValidated true", formValidated);

    } else {

      formValidated = false;
      // console.log(componentName, getDateTime(), "addEdition Invalid Form");
      // console.log(componentName, getDateTime(), "addEdition formValidated false", formValidated);

    };

    // console.log(componentName, getDateTime(), "addEdition titleIDValidated", titleIDValidated);
    // console.log(componentName, getDateTime(), "addEdition mediaIDValidated", mediaIDValidated);
    // console.log(componentName, getDateTime(), "addEdition formValidated", formValidated);

    if (formValidated === true) {

      // console.log(componentName, getDateTime(), "addEdition typeof props.titleID", typeof props.titleID);
      // console.log(componentName, getDateTime(), "addEdition typeof ddMediaID", typeof ddMediaID);

      // console.log(componentName, getDateTime(), "addEdition parseInt(props.titleID)", parseInt(props.titleID));
      // console.log(componentName, getDateTime(), "addEdition parseInt(ddMediaID)", parseInt(ddMediaID));

      let recordObject = {
        titleID: parseInt(props.titleID),
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

      // console.log(componentName, getDateTime(), "addEdition recordObject", recordObject);

      let url = baseURL + "editions/";
      // console.log(componentName, getDateTime(), "addEdition url", url);

      if (isEmpty(sessionToken) === false) {

        fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          }),
          body: JSON.stringify({ edition: recordObject })
        })
          .then(response => {
            // console.log(componentName, getDateTime(), "addEdition response", response);

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
            // console.log(componentName, getDateTime(), "addEdition data", data);

            setEditionRecordAdded(data.transactionSuccess);
            addMessage(data.message);

            if (data.transactionSuccess === true) {

              setEditionItem(data.records[0]);
              // setEditionID(data.records[0].editionID);
              setTitleID(data.records[0].titleID);
              // setMediaID(data.records[0].mediaID);
              // setPublicationDate(data.records[0].publicationDate);
              // setImageName(data.records[0].imageName);
              // setASIN(data.records[0].ASIN);
              // setTextLinkShort(data.records[0].textLinkShort);
              // setTextLinkFull(data.records[0].textLinkFull);
              // setImageLinkSmall(data.records[0].imageLinkSmall);
              // setImageLinkMedium(data.records[0].imageLinkMedium);
              // setImageLinkLarge(data.records[0].imageLinkLarge);
              // setTextImageLink(data.records[0].textImageLink);
              setActive(data.records[0].active);

              let mediaItem = mediaListState.filter(media => media.mediaID === data.records[0].mediaID);
              // medium: {mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate}
              mediaItem = mediaItem[0];

              // console.log(componentName, getDateTime(), "addEdition typeof data.records[0].mediaID", typeof data.records[0].mediaID);
              // console.log(componentName, getDateTime(), "addEdition mediaItem", mediaItem);

              let titleItem = titleListState.filter(title => title.titleID === data.records[0].titleID);
              // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}
              titleItem = titleItem[0];

              // console.log(componentName, getDateTime(), "addEdition typeof data.records[0].titleID", typeof data.records[0].titleID);
              // console.log(componentName, getDateTime(), "addEdition titleItem", titleItem);

              // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
              dispatch(addStateEdition([{ editionID: data.records[0].editionID, titleID: data.records[0].titleID, mediaID: data.records[0].mediaID, publicationDate: data.records[0].publicationDate, imageName: data.records[0].imageName, ASIN: data.records[0].ASIN, textLinkShort: data.records[0].textLinkShort, textLinkFull: data.records[0].textLinkFull, imageLinkSmall: data.records[0].imageLinkSmall, imageLinkMedium: data.records[0].imageLinkMedium, imageLinkLarge: data.records[0].imageLinkLarge, textImageLink: data.records[0].textImageLink, active: data.records[0].active, editionActive: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate/*, medium: { mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate }*/, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, mediaActive: mediaItem.active, mediaCreateDate: mediaItem.createDate, mediaUpdatedDate: mediaItem.updateDate/*, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }*/, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, submissionDate: titleItem.submissionDate, titlePublicationDate: titleItem.publicationDate, titleImageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, titleActive: titleItem.active, titleCreateDate: titleItem.createDate, titleUpdatedDate: titleItem.updateDate }]));

              // ? Add to local storage also? -- 03/06/2021 MF

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

            // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  const updateEdition = (deleteEdition) => {
    // console.log(componentName, getDateTime(), "updateEdition deleteEdition", deleteEdition);
    // console.log(componentName, getDateTime(), "updateEdition baseURL", baseURL);

    // console.log(componentName, getDateTime(), "editionItemIndex", editionItemIndex);

    clearMessages();
    setEditionRecordUpdated(null);
    setErrMediaID("");

    setEditionItem(null);
    // setEditionID(null);
    setTitleID(null);
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

    // ? Check to make sure that props.editionID is a number? -- 03/06/2021 MF

    if (isEmpty(ddMediaID) === false) {

      mediaIDValidated = true;
      setErrMediaID("");
      // console.log(componentName, getDateTime(), "updateEdition Valid mediaID");
      // console.log(componentName, getDateTime(), "updateEdition mediaIDValidated true", mediaIDValidated);

    } else {

      mediaIDValidated = false;
      setErrMediaID("Please select a media.");
      // console.log(componentName, getDateTime(), "updateEdition Invalid mediaID");
      // console.log(componentName, getDateTime(), "updateEdition mediaIDValidated false", mediaIDValidated);

    };

    if (mediaIDValidated === true) {

      formValidated = true;
      // console.log(componentName, getDateTime(), "updateEdition Valid Form");
      // console.log(componentName, getDateTime(), "updateEdition formValidated true", formValidated);

    } else {

      formValidated = false;
      // console.log(componentName, getDateTime(), "updateEdition Invalid Form");
      // console.log(componentName, getDateTime(), "updateEdition formValidated false", formValidated);

    };

    // console.log(componentName, getDateTime(), "updateEdition titleIDValidated", titleIDValidated);
    // console.log(componentName, getDateTime(), "updateEdition mediaIDValidated", mediaIDValidated);
    // console.log(componentName, getDateTime(), "updateEdition formValidated", formValidated);

    if (formValidated === true) {

      // console.log(componentName, getDateTime(), "addEdition typeof titleID", typeof titleID);
      // console.log(componentName, getDateTime(), "addEdition typeof ddMediaID", typeof ddMediaID);

      // console.log(componentName, getDateTime(), "addEdition parseInt(titleID)", parseInt(titleID));
      // console.log(componentName, getDateTime(), "addEdition parseInt(ddMediaID)", parseInt(ddMediaID));

      let recordObject = {
        editionID: props.editionID,
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

      // console.log(componentName, getDateTime(), "updateEdition recordObject", recordObject);

      let url = baseURL + "editions/";

      if (isEmpty(props.editionID) === false && isEmpty(sessionToken) === false) {

        url = url + props.editionID;

        // console.log(componentName, getDateTime(), "updateEdition url", url);

        fetch(url, {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          }),
          body: JSON.stringify({ edition: recordObject })
        })
          .then(response => {
            // console.log(componentName, getDateTime(), "updateEdition response", response);

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
            // console.log(componentName, getDateTime(), "updateEdition data", data);

            setEditionRecordUpdated(data.transactionSuccess);
            addMessage(data.message);

            if (data.transactionSuccess === true) {

              setEditionItem(data.records[0]);
              // setEditionID(data.records[0].editionID);
              setTitleID(data.records[0].titleID);
              // setMediaID(data.records[0].mediaID);
              // setPublicationDate(data.records[0].publicationDate);
              // setImageName(data.records[0].imageName);
              // setASIN(data.records[0].ASIN);
              // setTextLinkShort(data.records[0].textLinkShort);
              // setTextLinkFull(data.records[0].textLinkFull);
              // setImageLinkSmall(data.records[0].imageLinkSmall);
              // setImageLinkMedium(data.records[0].imageLinkMedium);
              // setImageLinkLarge(data.records[0].imageLinkLarge);
              // setTextImageLink(data.records[0].textImageLink);
              setActive(data.records[0].active);

              let mediaItem = mediaListState.filter(media => media.mediaID === data.records[0].mediaID);
              // medium: {mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate}
              mediaItem = mediaItem[0];

              // console.log(componentName, getDateTime(), "updateEdition typeof data.records[0].mediaID", typeof data.records[0].mediaID);
              // console.log(componentName, getDateTime(), "updateEdition mediaItem", mediaItem);

              let titleItem = titleListState.filter(title => title.titleID === data.records[0].titleID);
              // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}
              titleItem = titleItem[0];

              // console.log(componentName, getDateTime(), "updateEdition typeof data.records[0].titleID", typeof data.records[0].titleID);
              // console.log(componentName, getDateTime(), "updateEdition titleItem", titleItem);

              // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
              dispatch(updateStateEdition({ /*editionItemIndex: editionItemIndex,*/ editionID: props.editionID, titleID: data.records[0].titleID, mediaID: data.records[0].mediaID, publicationDate: data.records[0].publicationDate, imageName: data.records[0].imageName, ASIN: data.records[0].ASIN, textLinkShort: data.records[0].textLinkShort, textLinkFull: data.records[0].textLinkFull, imageLinkSmall: data.records[0].imageLinkSmall, imageLinkMedium: data.records[0].imageLinkMedium, imageLinkLarge: data.records[0].imageLinkLarge, textImageLink: data.records[0].textImageLink, active: data.records[0].active, editionActive: data.records[0].active, updateDate: getDateTime()/*, medium: { mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate }, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }*/ }));

              // ? Add to local storage also? -- 03/06/2021 MF

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

            // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  const deleteEdition = () => {
    // console.log(componentName, getDateTime(), "deleteEdition baseURL", baseURL);

    clearMessages();
    setEditionRecordDeleted(null);
    setErrMediaID("");

    let url = baseURL + "editions/";

    if (isEmpty(props.editionID) === false) {

      url = url + props.editionID;

      // console.log(componentName, getDateTime(), "deleteEdition url", url);

      if (isEmpty(sessionToken) === false) {

        fetch(url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          })
        })
          .then(response => {
            // console.log(componentName, getDateTime(), "deleteEdition response", response);

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
            // console.log(componentName, getDateTime(), "deleteEdition data", data);

            setEditionRecordDeleted(data.transactionSuccess);

            addMessage(data.message); // * Never seen by the user if the delete was successful. -- 03/06/2021 MF

            if (data.transactionSuccess === true) {

              // dispatch(deleteStateEdition(props.editionID));
              // dispatch(deleteStateEdition(editionItemIndex));
              dispatch(deleteStateEdition(data.editionID));
              // ? Update local storage also?. -- 03/06/2021 MF

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

            // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  const checkASIN = (ASIN) => {
    // console.log(componentName, getDateTime(), "checkASIN baseURL", baseURL);

    setASINMessage("");
    setErrASINMessage("");
    setASINResultsFound(null);

    let url = baseURL + "editions/ASIN/";

    if (isEmpty(ASIN) === false) {

      url = url + ASIN;

      // console.log(componentName, getDateTime(), "checkASIN url", url);

      fetch(url)
        .then(response => {
          // console.log(componentName, getDateTime(), "checkASIN response", response);

          if (!response.ok) {

            throw Error(response.status + " " + response.statusText + " " + response.url);

          } else {

            return response.json();

          };

        })
        .then(results => {
          // console.log(componentName, getDateTime(), "checkASIN results", results);

          setASINResultsFound(results.transactionSuccess);
          setASINMessage(results.message);

          if (isEmpty(results) === false && results.transactionSuccess === true) {

            setASINMessage(results.message + "That ASIN already exists in the database. " + results.records[0].titleName + " (" + results.records[0].media + ") editionID=" + results.records[0].editionID);

            // console.log(componentName, getDateTime(), "checkASIN", results.records[0].titleName);
            // console.log(componentName, getDateTime(), "checkASIN", results.records[0].media);
            // console.log(componentName, getDateTime(), "checkASIN", results.records[0].editionID);

          } else {

            setErrASINMessage(results.message + "That ASIN does not exist in the database");

          };

        })
        .catch((error) => {
          console.error(componentName, getDateTime(), "checkASIN error", error);
          // console.error(componentName, getDateTime(), "checkASIN error.name", error.name);
          // console.error(componentName, getDateTime(), "checkASIN error.message", error.message);

          setErrASINMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const copyTitlePublicationDate = () => {
    // console.log(componentName, getDateTime(), "copyTitlePublicationDate props.titlePublicationDate", props.titlePublicationDate);

    if (isEmpty(props.titlePublicationDate) === false) {

      setTxtPublicationDate(formatToString(props.titlePublicationDate).substring(0, 10));

    } else {

      setTxtPublicationDate(undefined);

    };

  };


  const copyTitleImageName = () => {
    // console.log(componentName, getDateTime(), "copyTitleImageName props.titleImageName", props.titleImageName);

    if (isEmpty(props.titleImageName) === false) {

      setTxtImageName(formatToString(props.titleImageName));

    } else {

      setTxtImageName(undefined);

    };

  };


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect editionRecordAdded", editionRecordAdded);

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

      setModal(!modal);

    };

  }, [editionRecordAdded]);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect editionRecordUpdated", editionRecordUpdated);
    // console.log(componentName, getDateTime(), "useEffect editionRecordDeleted", editionRecordDeleted);

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

      setModal(!modal);

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

      setModal(!modal);

    };

  }, [editionRecordUpdated, editionRecordDeleted]);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect check for admin", admin);

    if (admin !== true) {

      // return <Redirect to="/" />;
      setModal(false);

    };

  }, [admin]);


  return (
    <React.Fragment>

      {/* {applicationAllowUserInteractions === true && isEmpty(editionItem) === true && isEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Add Edition</Button></span> : null} */}

      {/* {applicationAllowUserInteractions === true && isEmpty(editionItem) === true && isEmpty(admin) === false && admin === true && props.displayIcon === true ? <Plus className="add-edit-icon" onClick={(event) => { setModal(!modal); }} /> : null} */}

      {applicationAllowUserInteractions === true && isEmpty(editionItem) === true && isEmpty(admin) === false && admin === true ?

        <a href="#" onClick={(event) => { setModal(!modal); }}>Add Edition</a>

        : null}

      {/* {applicationAllowUserInteractions === true && isEmpty(editionItem) === false && isEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Update Edition</Button></span> : null} */}

      {/* {applicationAllowUserInteractions === true && isEmpty(editionItem) === false && isEmpty(admin) === false && admin === true && props.displayIcon === true ? <PencilSquare className="add-edit-icon" onClick={(event) => { setModal(!modal); }} /> : null} */}

      {applicationAllowUserInteractions === true && isEmpty(editionItem) === false && isEmpty(admin) === false && admin === true ?

        <a href="#" onClick={(event) => { setModal(!modal); }}>Update Edition</a>

        : null}


      <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="lg">
        <ModalHeader toggle={(event) => { setModal(!modal); }}>{isEmpty(editionItem) === true ? <React.Fragment>Add</React.Fragment> : <React.Fragment>Update</React.Fragment>} Edition</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
              {isEmpty(mediaMessage) === false ? <Alert color="info">{mediaMessage}</Alert> : null}
              {isEmpty(errMediaMessage) === false ? <Alert color="danger">{errMediaMessage}</Alert> : null}
            </FormGroup>

            <FormGroup row>
              <Col>

                <Label for="ddMediaID">Media</Label>
                <Input type="select" id="ddMediaID" value={ddMediaID} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setDdMediaID(event.target.value); }}>
                  <option value="">Select a Media</option>
                  {mediaList.map((media) => {
                    return (
                      <option key={media.mediaID} value={media.mediaID}>{media.media}</option>
                    );
                  })}
                </Input>
                {isEmpty(errMediaID) === false ? <Alert color="danger">{errMediaID}</Alert> : null}

              </Col>
              <Col>

                <Label for="txtPublicationDate">Publication Date</Label> {isEmpty(props.titlePublicationDate) === false ? <Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={copyTitlePublicationDate}>Copy Title Publication Date</Button> : null}
                <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtPublicationDate(event.target.value); }} />

              </Col>

            </FormGroup>

            <FormGroup>
              <Label for="txtImageName">Image Name</Label> {isEmpty(props.titleImageName) === false ? <Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={copyTitleImageName}>Copy Title Image Name</Button> : null}
              <Input type="text" id="txtImageName" value={txtImageName} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtImageName(event.target.value); }} />
              {isEmpty(txtImageName) === false && txtImageName !== "" ? <img src={txtImageName} alt="Edition Image" /> : <Image size="150" className="no-image-icon" />}
            </FormGroup>

            <FormGroup>
              {isEmpty(txtTextLinkFull) === false ? <Alert color="info">{getASIN(txtTextLinkFull)}</Alert> : null}
              {isEmpty(ASINMessage) === false ? <Alert color="info">{ASINMessage}</Alert> : null}
              {isEmpty(errASINMessage) === false ? <Alert color="danger">{errASINMessage}</Alert> : null}
              <Label for="txtASIN">ASIN</Label><Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ checkASIN(txtASIN); }}>Check for ASIN</Button>
              <Input type="text" id="txtASIN" value={txtASIN} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtASIN(event.target.value); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtTextLinkShort">Text Link Short</Label>
              <Input type="text" id="txtTextLinkShort" value={txtTextLinkShort} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtTextLinkShort(event.target.value); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtTextLinkFull">Text Link Full (Can include non-Amazon.com links)</Label><Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={() => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtASIN(getASIN(txtTextLinkFull)); }}>Copy ASIN</Button>
              <Input type="textarea" id="txtTextLinkFull" rows={5} value={txtTextLinkFull} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtTextLinkFull(event.target.value); setTxtASIN(getASIN(txtTextLinkFull)); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtImageLinkSmall">Image Link Small</Label><Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={() => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkSmall(removeOnePixelImage(txtImageLinkSmall, txtASIN)); }}>Remove One Pixel Image</Button>
              <Input type="textarea" id="txtImageLinkSmall" rows={10} value={txtImageLinkSmall} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkSmall(event.target.value); setTxtASIN(getASIN(txtTextLinkFull)); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtImageLinkMedium">Image Link Medium</Label><Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={() => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkMedium(removeOnePixelImage(txtImageLinkMedium, txtASIN)); }}>Remove One Pixel Image</Button>
              <Input type="textarea" id="txtImageLinkMedium" rows={10} value={txtImageLinkMedium} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkMedium(event.target.value); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtImageLinkLarge">Image Link Large</Label><Button outline size="small" color="secondary" className="ms-3 mb-2" onClick={() => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkLarge(removeOnePixelImage(txtImageLinkLarge, txtASIN)); }}>Remove One Pixel Image</Button>
              <Input type="textarea" id="txtImageLinkLarge" rows={10} value={txtImageLinkLarge} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkLarge(event.target.value); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtTextImageLink">Text Image Link</Label>
              <Input type="textarea" id="txtTextImageLink" rows={10} value={txtTextImageLink} onChange={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ setTxtTextImageLink(event.target.value); }} />
            </FormGroup>

            <ModalFooter>

              {isEmpty(editionItem) === true ?

                <Button outline size="lg" color="primary" onClick={addEdition}>Add Edition</Button>

                :

                <React.Fragment>

                  <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ updateEdition(false); }}>Update Edition</Button>

                  {isEmpty(active) === false && (active === false || active === 0) ?

                    <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ updateEdition(false); }}>Undelete/Restore Edition</Button>

                    : null}

                  {isEmpty(active) === false && (active === true || active === 1) ?

                    <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ updateEdition(true); }}>Delete Edition</Button>

                    : null}

                  <Button outline size="lg" color="warning" onClick={(event) => {/*console.log(componentName, getDateTime(), "event.target.value", event.target.value);*/ deleteEdition(); }}>Hard Delete Edition</Button>
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

export default EditEdition;
