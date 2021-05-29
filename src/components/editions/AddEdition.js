import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Image, Plus } from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import { getASIN, removeOnePixelImage } from "../../app/sharedFunctions";
import { addStateEdition } from "../../bibliographyData/editionsSlice";

const AddEdition = (props) => {

  const componentName = "AddEdition.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, "admin", admin);

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, "baseURL", baseURL);

  const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

  // console.log(componentName, "props.titleID", props.titleID);
  // console.log(componentName, "props.titlePublicationDate", props.titlePublicationDate);

  const [mediaMessage, setMediaMessage] = useState("");
  const [errMediaMessage, setErrMediaMessage] = useState("");
  const [mediaResultsFound, setMediaResultsFound] = useState(null);

  const mediaListState = useSelector(state => state.media.arrayMedia);
  // console.log(componentName, "mediaListState", mediaListState);

  const mediaList = mediaListState.filter(media => media.active === true);
  // console.log(componentName, "mediaList", mediaList);

  // mediaList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);
  // * Sort the list alphabetically instead of by sortID
  mediaList.sort((a, b) => (a.media > b.media) ? 1 : -1);

  // ! This code is causing React to have too many re-renders in this location
  // if (mediaList.length < 1) {
  //     console.log(componentName, "mediaList is empty", mediaList.length);
  //     setErrMediaMessage("mediaList is empty", mediaList.length);
  //     setMediaResultsFound(false);
  // } else {
  //     console.log(componentName, "mediaList.length", mediaList.length);
  //     setMediaMessage("mediaList.length", mediaList.length);
  //     setMediaResultsFound(true);
  // };

  useEffect(() => {
    // console.log(componentName, "useEffect mediaList", mediaList);

    if (mediaList.length < 1) {
      console.log(componentName, "mediaList is empty", mediaList.length);
      setErrMediaMessage("mediaList is empty", mediaList.length);
      setMediaResultsFound(false);
    } else {
      // console.log(componentName, "mediaList.length", mediaList.length);
      // setMediaMessage("mediaList.length", mediaList.length);
      setMediaResultsFound(true);
    };

  }, [mediaList]);

  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, "titleListState", titleListState);

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
    // console.log(componentName, "addEdition");
    // console.log(componentName, "addEdition baseURL", baseURL);
    // console.log(componentName, "addEdition props.titleID", props.titleID);

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

    if (ddMediaID !== undefined) {
      if (ddMediaID !== null) {
        mediaIDValidated = true;
        setErrMediaID("");
        // console.log(componentName, "addEdition Valid mediaID");
        // console.log(componentName, "addEdition mediaIDValidated true", mediaIDValidated);
      } else {
        mediaIDValidated = false;
        setErrMediaID("Please select a media.");
        // console.log(componentName, "addEdition Invalid mediaID");
        // console.log(componentName, "addEdition mediaIDValidated false", mediaIDValidated);
      };
    };

    if (mediaIDValidated === true) {
      formValidated = true;
      // console.log(componentName, "addEdition Valid Form");
      // console.log(componentName, "addEdition formValidated true", formValidated);
    } else {
      formValidated = false;
      // console.log(componentName, "addEdition Invalid Form");
      // console.log(componentName, "addEdition formValidated false", formValidated);
    };

    // console.log(componentName, "addEdition titleIDValidated", titleIDValidated);
    // console.log(componentName, "addEdition mediaIDValidated", mediaIDValidated);
    // console.log(componentName, "addEdition formValidated", formValidated);

    if (formValidated === true) {

      // console.log(componentName, "addEdition typeof props.titleID", typeof props.titleID);
      // console.log(componentName, "addEdition typeof ddMediaID", typeof ddMediaID);

      // console.log(componentName, "addEdition parseInt(props.titleID)", parseInt(props.titleID));
      // console.log(componentName, "addEdition parseInt(ddMediaID)", parseInt(ddMediaID));

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
      if (txtPublicationDate !== undefined && txtPublicationDate !== null) {
        if (txtPublicationDate.trim().length !== 0) {
          Object.assign(editionObject, { publicationDate: txtPublicationDate.trim() });
        };
      };

      // * If the user doesn't enter an image name, then it isn't added/updated
      if (txtImageName !== undefined && txtImageName !== null) {
        if (txtImageName.trim().length !== 0) {
          Object.assign(editionObject, { imageName: txtImageName.trim() });
        };
      };

      // * If the user doesn't enter an ASIN, then it isn't added/updated
      if (txtASIN !== undefined && txtASIN !== null) {
        if (txtASIN.trim().length !== 0) {
          Object.assign(editionObject, { ASIN: txtASIN.trim() });
        };
      };

      // * If the user doesn't enter a textLinkShort, then it isn't added/updated
      if (txtTextLinkShort !== undefined && txtTextLinkShort !== null) {
        if (txtTextLinkShort.trim().length !== 0) {
          Object.assign(editionObject, { textLinkShort: txtTextLinkShort.trim() });
        };
      };

      // * If the user doesn't enter a textLinkFull, then it isn't added/updated
      if (txtTextLinkFull !== undefined && txtTextLinkFull !== null) {
        if (txtTextLinkFull.trim().length !== 0) {
          Object.assign(editionObject, { textLinkFull: txtTextLinkFull.trim() });
        };
      };

      // * If the user doesn't enter an imageLinkSmall, then it isn't added/updated
      if (txtImageLinkSmall !== undefined && txtImageLinkSmall !== null) {
        if (txtImageLinkSmall.trim().length !== 0) {
          Object.assign(editionObject, { imageLinkSmall: txtImageLinkSmall.trim() });
        };
      };

      // * If the user doesn't enter an imageLinkMedium, then it isn't added/updated
      if (txtImageLinkMedium !== undefined && txtImageLinkMedium !== null) {
        if (txtImageLinkMedium.trim().length !== 0) {
          Object.assign(editionObject, { imageLinkMedium: txtImageLinkMedium.trim() });
        };
      };

      // * If the user doesn't enter an imageLinkLarge, then it isn't added/updated
      if (txtImageLinkLarge !== undefined && txtImageLinkLarge !== null) {
        if (txtImageLinkLarge.trim().length !== 0) {
          Object.assign(editionObject, { imageLinkLarge: txtImageLinkLarge.trim() });
        };
      };

      // * If the user doesn't enter a textImageLink, then it isn't added/updated
      if (txtTextImageLink !== undefined && txtTextImageLink !== null) {
        if (txtTextImageLink.trim().length !== 0) {
          Object.assign(editionObject, { textImageLink: txtTextImageLink.trim() });
        };
      };

      // console.log(componentName, "addEdition editionObject", editionObject);

      let url = baseURL + "editions/";
      // console.log(componentName, "addEdition url", url);

      if (sessionToken !== undefined && sessionToken !== null) {

        fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          }),
          body: JSON.stringify({ edition: editionObject })
        })
          .then(response => {
            // console.log(componentName, "addEdition response", response);
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
            console.log(componentName, "addEdition data", data);

            setEditionRecordAdded(data.recordAdded);
            addMessage(data.message);

            if (data.recordAdded === true) {

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
              // medium: {mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createdAt: mediaItem.createdAt, updatedAt: mediaItem.updatedAt}
              mediaItem = mediaItem[0];

              // console.log(componentName, "addEdition typeof data.mediaID", typeof data.mediaID);
              // console.log(componentName, "addEdition mediaItem", mediaItem);

              let titleItem = titleListState.filter(title => title.titleID === data.titleID);
              // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createdAt: titleItem.createdAt, updatedAt: titleItem.updatedAt}
              titleItem = titleItem[0];

              // console.log(componentName, "addEdition typeof data.titleID", typeof data.titleID);
              // console.log(componentName, "addEdition titleItem", titleItem);

              // ? Would still work if the createdAt and updatedAt were left out?
              dispatch(addStateEdition([{ editionID: data.editionID, titleID: data.titleID, mediaID: data.mediaID, publicationDate: data.publicationDate, imageName: data.imageName, ASIN: data.ASIN, textLinkShort: data.textLinkShort, textLinkFull: data.textLinkFull, imageLinkSmall: data.imageLinkSmall, imageLinkMedium: data.imageLinkMedium, imageLinkLarge: data.imageLinkLarge, textImageLink: data.textImageLink, active: data.active, createdAt: data.createdAt, updatedAt: data.updatedAt, medium: { mediaID: mediaItem.mediaID, media: mediaItem.media, electronic: mediaItem.electronic, sortID: mediaItem.sortID, active: mediaItem.active, createdAt: mediaItem.createdAt, updatedAt: mediaItem.updatedAt }, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createdAt: titleItem.createdAt, updatedAt: titleItem.updatedAt } }]));

              // ? Add to local storage also?

            } else {
              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);
            };

          })
          .catch(error => {
            console.log(componentName, "addEdition error", error);
            // console.log(componentName, "addEdition error.name", error.name);
            // console.log(componentName, "addEdition error.message", error.message);
            addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

  };

  const checkASIN = (ASIN) => {
    // console.log(componentName, "checkASIN");
    // console.log(componentName, "checkASIN baseURL", baseURL);

    setASINMessage("");
    setErrASINMessage("");
    setASINResultsFound(null);

    let url = baseURL + "editions/ASIN/";

    if (ASIN !== undefined && ASIN !== null && ASIN !== "") {
      url = url + ASIN;

      // console.log(componentName, "checkASIN url", url);

      fetch(url)
        .then(response => {
          // console.log(componentName, "checkASIN response", response);
          if (!response.ok) {
            throw Error(response.status + " " + response.statusText + " " + response.url);
          } else {
            return response.json();
          };
        })
        .then(data => {
          console.log(componentName, "checkASIN data", data);

          setASINResultsFound(data.resultsFound);
          setASINMessage(data.message);

          if (data.resultsFound === true) {
            setASINMessage(data.message + "That ASIN already exists in the database. " + data.editions[0].title.titleName + " (" + data.editions[0].medium.media + ") editionID=" + data.editions[0].editionID);

            // console.log(componentName, "checkASIN", data.editions[0].title.titleName);
            // console.log(componentName, "checkASIN", data.editions[0].medium.media);
            // console.log(componentName, "checkASIN", data.editions[0].editionID);

          } else {
            setErrASINMessage(data.message + "That ASIN does not exist in the database");
          };

        })
        .catch(error => {
          console.log(componentName, "checkASIN error", error);
          // console.log(componentName, "checkASIN error.name", error.name);
          // console.log(componentName, "checkASIN error.message", error.message);
          setErrASINMessage(error.name + ": " + error.message);
        });

    };

  };

  const copyTitlePublicationDate = () => {
    // console.log(componentName, "copyTitlePublicationDate props.titlePublicationDate", props.titlePublicationDate);

    if (props.titlePublicationDate !== undefined && props.titlePublicationDate !== null) {
      setTxtPublicationDate(props.titlePublicationDate.toString().substring(0, 10));
    } else {
      setTxtPublicationDate(undefined);
    };

  };

  useEffect(() => {
    // console.log(componentName, "useEffect editionRecordAdded", editionRecordAdded);
    if (editionRecordAdded !== undefined && editionRecordAdded !== null && editionRecordAdded === true) {
      clearMessages();
      setErrMediaID("");
      setEditionRecordAdded(null);
      // setModal(false);
      toggle();
    };

  }, [editionRecordAdded]);

  useEffect(() => {
    // console.log(componentName, "useEffect check for admin", admin);

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

      {appAllowUserInteractions === true && admin !== undefined && admin !== null && admin === true && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Edition</Button></span> : null}

      {appAllowUserInteractions === true && admin !== undefined && admin !== null && admin === true && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Add Edition</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
              {mediaMessage !== undefined && mediaMessage !== null && mediaMessage !== "" ? <Alert color="info">{mediaMessage}</Alert> : null}
              {errMediaMessage !== undefined && errMediaMessage !== null && errMediaMessage !== "" ? <Alert color="danger">{errMediaMessage}</Alert> : null}
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
                {errMediaID !== undefined && errMediaID !== null && errMediaID !== "" ? <Alert color="danger">{errMediaID}</Alert> : null}

              </Col>
              <Col>

                <Label for="txtPublicationDate">Publication Date</Label> {props.titlePublicationDate !== undefined && props.titlePublicationDate !== null ? <Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={copyTitlePublicationDate}>Copy Title Publication Date</Button> : null}
                <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => {/*console.log(event.target.value);*/ setTxtPublicationDate(event.target.value); }} />

              </Col>

            </FormGroup>

            <FormGroup>

              <Label for="txtImageName">Image Name</Label>
              <Input type="text" id="txtImageName" value={txtImageName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtImageName(event.target.value); }} />
              {txtImageName !== undefined && txtImageName !== null && txtImageName !== "" ? <img src={txtImageName} alt="" /> : <Image size="150" className="noImageIcon" />}

            </FormGroup>
            <FormGroup>

              {txtTextLinkFull !== undefined && txtTextLinkFull !== null && txtTextLinkFull !== "" ? <Alert color="info">{getASIN(txtTextLinkFull)}</Alert> : null}
              {ASINMessage !== undefined && ASINMessage !== null && ASINMessage !== "" ? <Alert color="info">{ASINMessage}</Alert> : null}
              {errASINMessage !== undefined && errASINMessage !== null && errASINMessage !== "" ? <Alert color="danger">{errASINMessage}</Alert> : null}
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
