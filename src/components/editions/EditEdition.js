import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Image, PencilSquare } from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, getASIN, removeOnePixelImage } from "../../app/sharedFunctions";
import { updateStateEdition, deleteStateEdition } from "../../bibliographyData/editionsSlice";

const EditEdition = (props) => {

  const componentName = "EditEdition.js";

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

  // console.log(componentName, GetDateTime(), "props.editionID", props.editionID);
  // console.log(componentName, GetDateTime(), "props.titleID", props.titleID); // Would come from the record that is being edited
  // console.log(componentName, GetDateTime(), "props.titlePublicationDate", props.titlePublicationDate);

  const [mediaMessage, setMediaMessage] = useState("");
  const [errMediaMessage, setErrMediaMessage] = useState("");
  const [mediaResultsFound, setMediaResultsFound] = useState(null);

  const mediaListState = useSelector(state => state.media.arrayMedia);
  // console.log(componentName, GetDateTime(), "mediaListState", mediaListState);

  const mediaList = mediaListState.filter(media => media.active === true || media.active === 1);
  // console.log(componentName, GetDateTime(), "mediaList", mediaList);

  // mediaList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);
  // * Sort the list alphabetically instead of by sortID
  mediaList.sort((a, b) => (a.media > b.media) ? 1 : -1);

  // ! This code is causing React to have too many re-renders in this location
  // if (mediaList.length < 1) {
  //     console.log(componentName, GetDateTime(), "mediaList is empty", mediaList.length);
  //     setErrMediaMessage("mediaList is empty", mediaList.length);
  //     setMediaResultsFound(false);
  // } else {
  //     console.log(componentName, GetDateTime(), "mediaList.length", mediaList.length);
  //     setMediaMessage("mediaList.length", mediaList.length);
  //     setMediaResultsFound(true);
  // };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect mediaList", mediaList);

    if (mediaList.length < 1) {
      console.log(componentName, GetDateTime(), "mediaList is empty", mediaList.length);
      setErrMediaMessage("mediaList is empty", mediaList.length);
      setMediaResultsFound(false);
    } else {
      // console.log(componentName, GetDateTime(), "mediaList.length", mediaList.length);
      // setMediaMessage("mediaList.length", mediaList.length);
      setMediaResultsFound(true);
    };

  }, [mediaList]);


  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, GetDateTime(), "titleListState", titleListState);

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

  const [editionItemIndex, setEditionItemIndex] = useState(null);
  const [editionItem, setEditionItem] = useState(null);
  const [editionID, setEditionID] = useState(null);
  const [titleID, setTitleID] = useState(null);
  const [mediaID, setMediaID] = useState(null);
  const [publicationDate, setPublicationDate] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [ASIN, setASIN] = useState(null);
  const [textLinkShort, setTextLinkShort] = useState(null);
  const [textLinkFull, setTextLinkFull] = useState(null);
  const [imageLinkSmall, setImageLinkSmall,] = useState(null);
  const [imageLinkMedium, setImageLinkMedium] = useState(null);
  const [imageLinkLarge, setImageLinkLarge] = useState(null);
  const [textImageLink, setTextImageLink] = useState(null);
  const [active, setActive] = useState(null);

  const [ASINMessage, setASINMessage] = useState("");
  const [errASINMessage, setErrASINMessage] = useState("");
  const [ASINResultsFound, setASINResultsFound] = useState(null);

  const editionListState = useSelector(state => state.editions.arrayEditions);
  // console.log(componentName, GetDateTime(), "editionListState", editionListState);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect editionListState", editionListState);

    if (IsEmpty(props.editionID) === false) {

      let editionObject = editionListState.find(edition => edition.editionID === props.editionID);
      // console.log(componentName, GetDateTime(), "useEffect editionObject", editionObject);
      // console.log(componentName, GetDateTime(), "useEffect typeof editionObject", typeof editionObject);

      setEditionItemIndex(editionListState.findIndex(edition => edition.editionID === props.editionID));
      // console.log(componentName, GetDateTime(), "useEffect editionItemIndex", editionItemIndex);

      if (IsEmpty(editionObject) === false) {

        setEditionItem(editionObject);
        setEditionID(editionObject.editionID);
        setTitleID(editionObject.titleID);
        setMediaID(editionObject.mediaID);
        setPublicationDate(editionObject.publicationDate);
        setImageName(editionObject.imageName);
        setASIN(editionObject.ASIN);
        setTextLinkShort(editionObject.textLinkShort);
        setTextLinkFull(editionObject.textLinkFull);
        setImageLinkSmall(editionObject.imageLinkSmall);
        setImageLinkMedium(editionObject.imageLinkMedium);
        setImageLinkLarge(editionObject.imageLinkLarge);
        setTextImageLink(editionObject.textImageLink);
        setActive(editionObject.active);

        setDdMediaID(editionObject.mediaID);

        if (IsEmpty(editionObject.publicationDate) === false) {
          setTxtPublicationDate(editionObject.publicationDate.toString().substring(0, 10));
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


  const updateEdition = (deleteEdition) => {
    // console.log(componentName, GetDateTime(), "updateEdition");
    // console.log(componentName, GetDateTime(), "updateEdition deleteEdition", deleteEdition);
    // console.log(componentName, GetDateTime(), "updateEdition baseURL", baseURL);

    // console.log(componentName, GetDateTime(), "editionItemIndex", editionItemIndex);

    clearMessages();
    setEditionRecordUpdated(null);
    setErrMediaID("");

    setEditionItem(null);
    setEditionID(null);
    // setTitleID(null);
    setMediaID(null);
    setPublicationDate(null);
    setImageName(null);
    setASIN(null);
    setTextLinkShort(null);
    setTextLinkFull(null);
    setImageLinkSmall(null);
    setImageLinkMedium(null);
    setImageLinkLarge(null);
    setTextImageLink(null);
    setActive(null);

    let mediaIDValidated = false;
    let formValidated = false;

    // ? Check to make sure that props.editionID is a number?

    if (IsEmpty(ddMediaID) === false) {
      mediaIDValidated = true;
      setErrMediaID("");
      // console.log(componentName, GetDateTime(), "updateEdition Valid mediaID");
      // console.log(componentName, GetDateTime(), "updateEdition mediaIDValidated true", mediaIDValidated);
    } else {
      mediaIDValidated = false;
      setErrMediaID("Please select a media.");
      // console.log(componentName, GetDateTime(), "updateEdition Invalid mediaID");
      // console.log(componentName, GetDateTime(), "updateEdition mediaIDValidated false", mediaIDValidated);
    };

    if (mediaIDValidated === true) {
      formValidated = true;
      // console.log(componentName, GetDateTime(), "updateEdition Valid Form");
      // console.log(componentName, GetDateTime(), "updateEdition formValidated true", formValidated);
    } else {
      formValidated = false;
      // console.log(componentName, GetDateTime(), "updateEdition Invalid Form");
      // console.log(componentName, GetDateTime(), "updateEdition formValidated false", formValidated);
    };

    // console.log(componentName, GetDateTime(), "updateEdition titleIDValidated", titleIDValidated);
    // console.log(componentName, GetDateTime(), "updateEdition mediaIDValidated", mediaIDValidated);
    // console.log(componentName, GetDateTime(), "updateEdition formValidated", formValidated);

    if (formValidated === true) {

      // console.log(componentName, GetDateTime(), "addEdition typeof titleID", typeof titleID);
      // console.log(componentName, GetDateTime(), "addEdition typeof ddMediaID", typeof ddMediaID);

      // console.log(componentName, GetDateTime(), "addEdition parseInt(titleID)", parseInt(titleID));
      // console.log(componentName, GetDateTime(), "addEdition parseInt(ddMediaID)", parseInt(ddMediaID));

      let editionObject = {
        editionID: props.editionID,
        titleID: parseInt(titleID),
        mediaID: parseInt(ddMediaID),
        // imageName: txtImageName.trim(),
        // ASIN: txtASIN.trim(),
        // textLinkShort: txtTextLinkShort.trim(),
        // textLinkFull: txtTextLinkFull.trim(),
        // imageLinkSmall: txtImageLinkSmall.trim(),
        // imageLinkMedium: txtImageLinkMedium.trim(),
        // imageLinkLarge: txtImageLinkLarge.trim(),
        // textImageLink: txtTextImageLink.trim(),
        active: !deleteEdition
      };

      // * If the user doesn't enter a publication date, then it isn't added/updated
      if (IsEmpty(txtPublicationDate) === false) {
        if (txtPublicationDate.trim().length !== 0) {
          Object.assign(editionObject, { publicationDate: txtPublicationDate.trim() });
        };
      };

      // * If the user doesn't enter an image name, then it isn't added/updated
      if (IsEmpty(txtImageName) === false) {
        if (txtImageName.trim().length !== 0) {
          Object.assign(editionObject, { imageName: txtImageName.trim() });
        };
      };

      // * If the user doesn't enter an ASIN, then it isn't added/updated
      if (IsEmpty(txtASIN) === false) {
        if (txtASIN.trim().length !== 0) {
          Object.assign(editionObject, { ASIN: txtASIN.trim() });
        };
      };

      // * If the user doesn't enter a textLinkShort, then it isn't added/updated
      if (IsEmpty(txtTextLinkShort) === false) {
        if (txtTextLinkShort.trim().length !== 0) {
          Object.assign(editionObject, { textLinkShort: txtTextLinkShort.trim() });
        };
      };

      // * If the user doesn't enter a textLinkFull, then it isn't added/updated
      if (IsEmpty(txtTextLinkFull) === false) {
        if (txtTextLinkFull.trim().length !== 0) {
          Object.assign(editionObject, { textLinkFull: txtTextLinkFull.trim() });
        };
      };

      // * If the user doesn't enter an imageLinkSmall, then it isn't added/updated
      if (IsEmpty(txtImageLinkSmall) === false) {
        if (txtImageLinkSmall.trim().length !== 0) {
          Object.assign(editionObject, { imageLinkSmall: txtImageLinkSmall.trim() });
        };
      };

      // * If the user doesn't enter an imageLinkMedium, then it isn't added/updated
      if (IsEmpty(txtImageLinkMedium) === false) {
        if (txtImageLinkMedium.trim().length !== 0) {
          Object.assign(editionObject, { imageLinkMedium: txtImageLinkMedium.trim() });
        };
      };

      // * If the user doesn't enter an imageLinkLarge, then it isn't added/updated
      if (IsEmpty(txtImageLinkLarge) === false) {
        if (txtImageLinkLarge.trim().length !== 0) {
          Object.assign(editionObject, { imageLinkLarge: txtImageLinkLarge.trim() });
        };
      };

      // * If the user doesn't enter a textImageLink, then it isn't added/updated
      if (IsEmpty(txtTextImageLink) === false) {
        if (txtTextImageLink.trim().length !== 0) {
          Object.assign(editionObject, { textImageLink: txtTextImageLink.trim() });
        };
      };

      // console.log(componentName, GetDateTime(), "updateEdition editionObject", editionObject);

      let url = baseURL + "editions/";

      if (IsEmpty(props.editionID) === false && IsEmpty(sessionToken) === false) {

        url = url + props.editionID;

        // console.log(componentName, GetDateTime(), "updateEdition url", url);

        fetch(url, {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          }),
          body: JSON.stringify({ edition: editionObject })
        })
          .then(response => {
            // console.log(componentName, GetDateTime(), "updateEdition response", response);
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
            console.log(componentName, GetDateTime(), "updateEdition data", data);

            setEditionRecordUpdated(data.recordAdded);
            addMessage(data.message);

            if (data.recordUpdated === true) {

              setEditionItem(data);
              setEditionID(data.editionID);
              setTitleID(data.titleID);
              setMediaID(data.mediaID);
              setPublicationDate(data.publicationDate);
              setImageName(data.imageName);
              setASIN(data.ASIN);
              setTextLinkShort(data.textLinkShort);
              setTextLinkFull(data.textLinkFull);
              setImageLinkSmall(data.imageLinkSmall);
              setImageLinkMedium(data.imageLinkMedium);
              setImageLinkLarge(data.imageLinkLarge);
              setTextImageLink(data.textImageLink);
              setActive(data.active);

              let mediaItem = mediaListState.filter(media => media.mediaID === data.mediaID);
              // medium: {mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate}
              mediaItem = mediaItem[0];

              // console.log(componentName, GetDateTime(), "updateEdition typeof data.mediaID", typeof data.mediaID);
              // console.log(componentName, GetDateTime(), "updateEdition mediaItem", mediaItem);

              let titleItem = titleListState.filter(title => title.titleID === data.titleID);
              // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}
              titleItem = titleItem[0];

              // console.log(componentName, GetDateTime(), "updateEdition typeof data.titleID", typeof data.titleID);
              // console.log(componentName, GetDateTime(), "updateEdition titleItem", titleItem);

              // TODO: Fix the structure of this Redux call.
              // ? Would still work if the createDate and updateDate were left out?
              dispatch(updateStateEdition({ editionItemIndex: editionItemIndex, editionID: data.editionID, titleID: data.titleID, mediaID: data.mediaID, publicationDate: data.publicationDate, imageName: data.imageName, ASIN: data.ASIN, textLinkShort: data.textLinkShort, textLinkFull: data.textLinkFull, imageLinkSmall: data.imageLinkSmall, imageLinkMedium: data.imageLinkMedium, imageLinkLarge: data.imageLinkLarge, textImageLink: data.textImageLink, active: data.active, updateDate: new Date().toISOString(), medium: { mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate }, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate } }));
              // ? Add to local storage also?

            } else {
              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);
            };

          })
          .catch(error => {
            console.log(componentName, GetDateTime(), "updateEdition error", error);
            // console.log(componentName, GetDateTime(), "updateEdition error.name", error.name);
            // console.log(componentName, GetDateTime(), "updateEdition error.message", error.message);
            addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

  };


  const deleteEdition = () => {
    // console.log(componentName, GetDateTime(), "deleteEdition");
    // console.log(componentName, GetDateTime(), "deleteEdition baseURL", baseURL);

    clearMessages();
    setEditionRecordDeleted(null);
    setErrMediaID("");

    let url = baseURL + "editions/";

    if (IsEmpty(props.editionID) === false) {
      url = url + props.editionID;

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
            console.log(componentName, GetDateTime(), "deleteEdition data", data);

            setEditionRecordDeleted(data.recordDeleted);

            addMessage(data.message); // * Never seen by the user if the delete was successful

            if (data.recordDeleted === true) {

              // dispatch(deleteStateEdition(props.editionID));
              dispatch(deleteStateEdition(editionItemIndex));
              // ? Update local storage also?

            } else {
              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);
            };

          })
          .catch(error => {
            console.log(componentName, GetDateTime(), "deleteEdition error", error);
            // console.log(componentName, GetDateTime(), "deleteEdition error.name", error.name);
            // console.log(componentName, GetDateTime(), "deleteEdition error.message", error.message);
            addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

  };


  const checkASIN = (ASIN) => {
    // console.log(componentName, GetDateTime(), "checkASIN");
    // console.log(componentName, GetDateTime(), "checkASIN baseURL", baseURL);

    setASINMessage("");
    setErrASINMessage("");
    setASINResultsFound(null);

    let url = baseURL + "editions/ASIN/";

    if (IsEmpty(ASIN) === false) {
      url = url + ASIN;

      // console.log(componentName, GetDateTime(), "checkASIN url", url);

      fetch(url)
        .then(response => {
          // console.log(componentName, GetDateTime(), "checkASIN response", response);
          if (!response.ok) {
            throw Error(response.status + " " + response.statusText + " " + response.url);
          } else {
            return response.json();
          };
        })
        .then(data => {
          console.log(componentName, GetDateTime(), "checkASIN data", data);

          setASINResultsFound(data.resultsFound);
          setASINMessage(data.message);

          if (data.resultsFound === true) {
            setASINMessage(data.message + "That ASIN already exists in the database. " + data.editions[0].titleName + " (" + data.editions[0].media + ") editionID=" + data.editions[0].editionID);

            // console.log(componentName, GetDateTime(), "checkASIN", data.editions[0].titleName);
            // console.log(componentName, GetDateTime(), "checkASIN", data.editions[0].media);
            // console.log(componentName, GetDateTime(), "checkASIN", data.editions[0].editionID);

          } else {
            setErrASINMessage(data.message + "That ASIN does not exist in the database");
          };

        })
        .catch(error => {
          console.log(componentName, GetDateTime(), "checkASIN error", error);
          // console.log(componentName, GetDateTime(), "checkASIN error.name", error.name);
          // console.log(componentName, GetDateTime(), "checkASIN error.message", error.message);
          setErrASINMessage(error.name + ": " + error.message);
        });

    };

  };


  const copyTitlePublicationDate = () => {
    // console.log(componentName, GetDateTime(), "copyTitlePublicationDate props.titlePublicationDate", props.titlePublicationDate);

    if (IsEmpty(props.titlePublicationDate) === false) {
      setTxtPublicationDate(props.titlePublicationDate.toString().substring(0, 10));
    } else {
      setTxtPublicationDate(undefined);
    };

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect editionRecordUpdated", editionRecordUpdated);
    // console.log(componentName, GetDateTime(), "useEffect editionRecordDeleted", editionRecordDeleted);
    if (IsEmpty(editionRecordUpdated) === false && editionRecordUpdated === true) {
      clearMessages();
      setErrMediaID("");
      setEditionRecordUpdated(null);
      // setModal(false);
      toggle();
    };

    if (IsEmpty(editionRecordDeleted) === false && editionRecordDeleted === true) {
      clearMessages();
      setErrMediaID("");
      setEditionRecordDeleted(null);
      // setModal(false);
      toggle();
    };

  }, [editionRecordUpdated, editionRecordDeleted]);


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

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Update Edition</Button></span> : null}

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayIcon === true ? <PencilSquare className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Update Edition</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
              {IsEmpty(mediaMessage) === false ? <Alert color="info">{mediaMessage}</Alert> : null}
              {IsEmpty(errMediaMessage) === false ? <Alert color="danger">{errMediaMessage}</Alert> : null}
            </FormGroup>

            <FormGroup row>
              <Col>

                <Label for="ddMediaID">Media</Label>
                <Input type="select" id="ddMediaID" value={ddMediaID} onChange={(event) => {/*console.log(event.target.value);*/ setDdMediaID(event.target.value); }}>
                  <option value="">Select a Media</option>
                  {mediaList.map((media) => {
                    return (
                      <option key={media.mediaID} value={media.mediaID}>{media.media}</option>
                    );
                  })}
                </Input>
                {IsEmpty(errMediaID) === false ? <Alert color="danger">{errMediaID}</Alert> : null}

              </Col>
              <Col>

                <Label for="txtPublicationDate">Publication Date</Label> {IsEmpty(props.titlePublicationDate) === false ? <Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={copyTitlePublicationDate}>Copy Title Publication Date</Button> : null}
                <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => {/*console.log(event.target.value);*/ setTxtPublicationDate(event.target.value); }} />

              </Col>

            </FormGroup>

            <FormGroup>

              <Label for="txtImageName">Image Name</Label>
              <Input type="text" id="txtImageName" value={txtImageName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtImageName(event.target.value); }} />
              {IsEmpty(txtImageName) === false && txtImageName !== "" ? <img src={txtImageName} alt="" /> : <Image size="150" className="noImageIcon" />}

            </FormGroup>
            <FormGroup>

              {IsEmpty(txtTextLinkFull) === false ? <Alert color="info">{getASIN(txtTextLinkFull)}</Alert> : null}
              {IsEmpty(ASINMessage) === false ? <Alert color="info">{ASINMessage}</Alert> : null}
              {IsEmpty(errASINMessage) === false ? <Alert color="danger">{errASINMessage}</Alert> : null}
              <Label for="txtASIN">ASIN</Label><Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={(event) => {/*console.log(event.target.value);*/ checkASIN(txtASIN); }}>Check for ASIN</Button>
              <Input type="text" id="txtASIN" value={txtASIN} onChange={(event) => {/*console.log(event.target.value);*/ setTxtASIN(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtTextLinkShort">Text Link Short</Label>
              <Input type="text" id="txtTextLinkShort" value={txtTextLinkShort} onChange={(event) => {/*console.log(event.target.value);*/ setTxtTextLinkShort(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtTextLinkFull">Text Link Full</Label><Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(event.target.value);*/ setTxtASIN(getASIN(txtTextLinkFull)); }}>Copy ASIN</Button>
              <Input type="textarea" id="txtTextLinkFull" rows={5} value={txtTextLinkFull} onChange={(event) => {/*console.log(event.target.value);*/ setTxtTextLinkFull(event.target.value); setTxtASIN(getASIN(txtTextLinkFull)); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtImageLinkSmall">Image Link Small</Label><Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(event.target.value);*/ setTxtImageLinkSmall(removeOnePixelImage(txtImageLinkSmall, txtASIN)); }}>Remove One Pixel Image</Button>
              <Input type="textarea" id="txtImageLinkSmall" rows={10} value={txtImageLinkSmall} onChange={(event) => {/*console.log(event.target.value);*/ setTxtImageLinkSmall(event.target.value); setTxtASIN(getASIN(txtTextLinkFull)); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtImageLinkMedium">Image Link Medium</Label><Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(event.target.value);*/ setTxtImageLinkMedium(removeOnePixelImage(txtImageLinkMedium, txtASIN)); }}>Remove One Pixel Image</Button>
              <Input type="textarea" id="txtImageLinkMedium" rows={10} value={txtImageLinkMedium} onChange={(event) => {/*console.log(event.target.value);*/ setTxtImageLinkMedium(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtImageLinkLarge">Image Link Large</Label><Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(event.target.value);*/ setTxtImageLinkLarge(removeOnePixelImage(txtImageLinkLarge, txtASIN)); }}>Remove One Pixel Image</Button>
              <Input type="textarea" id="txtImageLinkLarge" rows={10} value={txtImageLinkLarge} onChange={(event) => {/*console.log(event.target.value);*/ setTxtImageLinkLarge(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtTextImageLink">Text Image Link</Label>
              <Input type="textarea" id="txtTextImageLink" rows={10} value={txtTextImageLink} onChange={(event) => {/*console.log(event.target.value);*/ setTxtTextImageLink(event.target.value); }} />

            </FormGroup>

            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(event.target.value);*/ updateEdition(false); }}>Update Edition</Button>
              {IsEmpty(active) === true && (active === false || active === 0) ?
                <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(event.target.value);*/ updateEdition(false); }}>Undelete/Restore Edition</Button>
                : null}
              {IsEmpty(active) === true && (active === true || active === 1) ?
                <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(event.target.value);*/ updateEdition(true); }}>Delete Edition</Button>
                : null}
              <Button outline size="lg" color="warning" onClick={(event) => {/*console.log(event.target.value);*/ deleteEdition(); }}>Hard Delete Edition</Button>
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default EditEdition;
