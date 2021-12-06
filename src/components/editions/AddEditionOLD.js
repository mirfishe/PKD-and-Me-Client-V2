import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Image, Plus } from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, getASIN, removeOnePixelImage } from "../../app/sharedFunctions";
import { addStateEdition } from "../../bibliographyData/editionsSlice";

const AddEdition = (props) => {

  const componentName = "AddEdition.js";

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

  // console.log(componentName, GetDateTime(), "props.titleID", props.titleID);
  // console.log(componentName, GetDateTime(), "props.titlePublicationDate", props.titlePublicationDate);

  const [mediaMessage, setMediaMessage] = useState("");
  const [errMediaMessage, setErrMediaMessage] = useState("");
  const [mediaResultsFound, setMediaResultsFound] = useState(null);

  const mediaListState = useSelector(state => state.media.arrayMedia);
  // console.log(componentName, GetDateTime(), "mediaListState", mediaListState);

  const mediaList = mediaListState.filter(media => media.active === true || media.active === 1);
  // const mediaList = mediaListState.filter(media => media.mediaActive === true || media.mediaActive === 1);
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
  const [editionRecordAdded, setEditionRecordAdded] = useState(null);

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


  const addEdition = () => {
    // console.log(componentName, GetDateTime(), "addEdition baseURL", baseURL);
    // console.log(componentName, GetDateTime(), "addEdition props.titleID", props.titleID);

    clearMessages();
    setEditionRecordAdded(null);
    setErrMediaID("");

    setEditionItem(null);
    setEditionID(null);
    setTitleID(null);
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

    // ? Check to make sure that props.titleID is a number?

    if (IsEmpty(ddMediaID) === false) {
      mediaIDValidated = true;
      setErrMediaID("");
      // console.log(componentName, GetDateTime(), "addEdition Valid mediaID");
      // console.log(componentName, GetDateTime(), "addEdition mediaIDValidated true", mediaIDValidated);
    } else {
      mediaIDValidated = false;
      setErrMediaID("Please select a media.");
      // console.log(componentName, GetDateTime(), "addEdition Invalid mediaID");
      // console.log(componentName, GetDateTime(), "addEdition mediaIDValidated false", mediaIDValidated);
    };

    if (mediaIDValidated === true) {
      formValidated = true;
      // console.log(componentName, GetDateTime(), "addEdition Valid Form");
      // console.log(componentName, GetDateTime(), "addEdition formValidated true", formValidated);
    } else {
      formValidated = false;
      // console.log(componentName, GetDateTime(), "addEdition Invalid Form");
      // console.log(componentName, GetDateTime(), "addEdition formValidated false", formValidated);
    };

    // console.log(componentName, GetDateTime(), "addEdition titleIDValidated", titleIDValidated);
    // console.log(componentName, GetDateTime(), "addEdition mediaIDValidated", mediaIDValidated);
    // console.log(componentName, GetDateTime(), "addEdition formValidated", formValidated);

    if (formValidated === true) {

      // console.log(componentName, GetDateTime(), "addEdition typeof props.titleID", typeof props.titleID);
      // console.log(componentName, GetDateTime(), "addEdition typeof ddMediaID", typeof ddMediaID);

      // console.log(componentName, GetDateTime(), "addEdition parseInt(props.titleID)", parseInt(props.titleID));
      // console.log(componentName, GetDateTime(), "addEdition parseInt(ddMediaID)", parseInt(ddMediaID));

      let editionObject = {
        titleID: parseInt(props.titleID),
        mediaID: parseInt(ddMediaID),
        // imageName: txtImageName.trim(),
        // ASIN: txtASIN.trim(),
        // textLinkShort: txtTextLinkShort.trim(),
        // textLinkFull: txtTextLinkFull.trim(),
        // imageLinkSmall: txtImageLinkSmall.trim(),
        // imageLinkMedium: txtImageLinkMedium.trim(),
        // imageLinkLarge: txtImageLinkLarge.trim(),
        // textImageLink: txtTextImageLink.trim()
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

      // console.log(componentName, GetDateTime(), "addEdition editionObject", editionObject);

      let url = baseURL + "editions/";
      // console.log(componentName, GetDateTime(), "addEdition url", url);

      if (IsEmpty(sessionToken) === false) {

        fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          }),
          body: JSON.stringify({ edition: editionObject })
        })
          .then(response => {
            // console.log(componentName, GetDateTime(), "addEdition response", response);
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
            // console.log(componentName, GetDateTime(), "addEdition data", data);

            setEditionRecordAdded(data.recordAdded);
            addMessage(data.message);

            if (data.recordAdded === true) {

              setEditionItem(data.records[0]);
              setEditionID(data.records[0].editionID);
              setTitleID(data.records[0].titleID);
              setMediaID(data.records[0].mediaID);
              setPublicationDate(data.records[0].publicationDate);
              setImageName(data.records[0].imageName);
              setASIN(data.records[0].ASIN);
              setTextLinkShort(data.records[0].textLinkShort);
              setTextLinkFull(data.records[0].textLinkFull);
              setImageLinkSmall(data.records[0].imageLinkSmall);
              setImageLinkMedium(data.records[0].imageLinkMedium);
              setImageLinkLarge(data.records[0].imageLinkLarge);
              setTextImageLink(data.records[0].textImageLink);
              setActive(data.records[0].active);

              let mediaItem = mediaListState.filter(media => media.mediaID === data.records[0].mediaID);
              // medium: {mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate}
              mediaItem = mediaItem[0];

              // console.log(componentName, GetDateTime(), "addEdition typeof data.records[0].mediaID", typeof data.records[0].mediaID);
              // console.log(componentName, GetDateTime(), "addEdition mediaItem", mediaItem);

              let titleItem = titleListState.filter(title => title.titleID === data.records[0].titleID);
              // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}
              titleItem = titleItem[0];

              // console.log(componentName, GetDateTime(), "addEdition typeof data.records[0].titleID", typeof data.records[0].titleID);
              // console.log(componentName, GetDateTime(), "addEdition titleItem", titleItem);

              // ? Would still work if the createDate and updateDate were left out?
              dispatch(addStateEdition([{ editionID: data.records[0].editionID, titleID: data.records[0].titleID, mediaID: data.records[0].mediaID, publicationDate: data.records[0].publicationDate, imageName: data.records[0].imageName, ASIN: data.records[0].ASIN, textLinkShort: data.records[0].textLinkShort, textLinkFull: data.records[0].textLinkFull, imageLinkSmall: data.records[0].imageLinkSmall, imageLinkMedium: data.records[0].imageLinkMedium, imageLinkLarge: data.records[0].imageLinkLarge, textImageLink: data.records[0].textImageLink, active: data.records[0].active, editionActive: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate/*, medium: { mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createDate: mediaItem.createDate, updateDate: mediaItem.updateDate }*/, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, mediaActive: mediaItem.active, mediaCreateDate: mediaItem.createDate, mediaUpdatedDate: mediaItem.updateDate/*, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }*/, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, titlePublicationDate: titleItem.publicationDate, titleImageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, titleActive: titleItem.active, titleCreateDate: titleItem.createDate, titleUpdatedDate: titleItem.updateDate }]));

              // ? Add to local storage also?

            } else {
              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);
            };

          })
          .catch(error => {
            console.error(componentName, GetDateTime(), "addEdition error", error);
            // console.error(componentName, GetDateTime(), "addEdition error.name", error.name);
            // console.error(componentName, GetDateTime(), "addEdition error.message", error.message);
            addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

  };


  const checkASIN = (ASIN) => {
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
        .then(results => {
          // console.log(componentName, GetDateTime(), "checkASIN results", results);

          setASINResultsFound(results.resultsFound);
          setASINMessage(results.message);

          if (IsEmpty(results) === false && results.resultsFound === true) {
            setASINMessage(results.message + "That ASIN already exists in the database. " + results.records[0].titleName + " (" + results.records[0].media + ") editionID=" + results.records[0].editionID);

            // console.log(componentName, GetDateTime(), "checkASIN", results.records[0].titleName);
            // console.log(componentName, GetDateTime(), "checkASIN", results.records[0].media);
            // console.log(componentName, GetDateTime(), "checkASIN", results.records[0].editionID);

          } else {
            setErrASINMessage(results.message + "That ASIN does not exist in the database");
          };

        })
        .catch(error => {
          console.error(componentName, GetDateTime(), "checkASIN error", error);
          // console.error(componentName, GetDateTime(), "checkASIN error.name", error.name);
          // console.error(componentName, GetDateTime(), "checkASIN error.message", error.message);
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


  const copyTitleImageName = () => {
    // console.log(componentName, GetDateTime(), "copyTitleImageName props.titleImageName", props.titleImageName);

    if (IsEmpty(props.titleImageName) === false) {
      setTxtImageName(props.titleImageName.toString());
    } else {
      setTxtImageName(undefined);
    };

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect editionRecordAdded", editionRecordAdded);
    if (IsEmpty(editionRecordAdded) === false && editionRecordAdded === true) {
      clearMessages();
      setErrMediaID("");
      setEditionRecordAdded(null);
      // setModal(false);
      toggle();
    };

  }, [editionRecordAdded]);


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

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Edition</Button></span> : null}

      {appAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Add Edition</ModalHeader>
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
                <Input type="select" id="ddMediaID" value={ddMediaID} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setDdMediaID(event.target.value); }}>
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
                <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtPublicationDate(event.target.value); }} />

              </Col>

            </FormGroup>

            <FormGroup>

              <Label for="txtImageName">Image Name</Label> {IsEmpty(props.titleImageName) === false ? <Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={copyTitleImageName}>Copy Image Name</Button> : null}
              <Input type="text" id="txtImageName" value={txtImageName} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtImageName(event.target.value); }} />
              {IsEmpty(txtImageName) === false && txtImageName !== "" ? <img src={txtImageName} alt="Edition Image" /> : <Image size="150" className="noImageIcon" />}

            </FormGroup>
            <FormGroup>

              {IsEmpty(txtTextLinkFull) === false ? <Alert color="info">{getASIN(txtTextLinkFull)}</Alert> : null}
              {IsEmpty(ASINMessage) === false ? <Alert color="info">{ASINMessage}</Alert> : null}
              {IsEmpty(errASINMessage) === false ? <Alert color="danger">{errASINMessage}</Alert> : null}
              <Label for="txtASIN">ASIN</Label><Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ checkASIN(txtASIN); }}>Check for ASIN</Button>
              <Input type="text" id="txtASIN" value={txtASIN} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtASIN(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtTextLinkShort">Text Link Short</Label>
              <Input type="text" id="txtTextLinkShort" value={txtTextLinkShort} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtTextLinkShort(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtTextLinkFull">Text Link Full (Can include non-Amazon.com links)</Label><Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtASIN(getASIN(txtTextLinkFull)); }}>Copy ASIN</Button>
              <Input type="textarea" id="txtTextLinkFull" rows={5} value={txtTextLinkFull} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtTextLinkFull(event.target.value); setTxtASIN(getASIN(txtTextLinkFull)); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtImageLinkSmall">Image Link Small</Label><Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkSmall(removeOnePixelImage(txtImageLinkSmall, txtASIN)); }}>Remove One Pixel Image</Button>
              <Input type="textarea" id="txtImageLinkSmall" rows={10} value={txtImageLinkSmall} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkSmall(event.target.value); setTxtASIN(getASIN(txtTextLinkFull)); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtImageLinkMedium">Image Link Medium</Label><Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkMedium(removeOnePixelImage(txtImageLinkMedium, txtASIN)); }}>Remove One Pixel Image</Button>
              <Input type="textarea" id="txtImageLinkMedium" rows={10} value={txtImageLinkMedium} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkMedium(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtImageLinkLarge">Image Link Large</Label><Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkLarge(removeOnePixelImage(txtImageLinkLarge, txtASIN)); }}>Remove One Pixel Image</Button>
              <Input type="textarea" id="txtImageLinkLarge" rows={10} value={txtImageLinkLarge} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtImageLinkLarge(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtTextImageLink">Text Image Link</Label>
              <Input type="textarea" id="txtTextImageLink" rows={10} value={txtTextImageLink} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtTextImageLink(event.target.value); }} />

            </FormGroup>

            <ModalFooter>
              <Button outline size="lg" color="primary" onClick={addEdition}>Add Edition</Button>
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default AddEdition;
