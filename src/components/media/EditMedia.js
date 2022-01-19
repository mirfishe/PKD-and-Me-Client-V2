import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Plus } from 'react-bootstrap-icons';
import applicationSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, FormatTrim } from "../../utilities/SharedFunctions";
import { encodeURL, LogError } from "../../utilities/ApplicationFunctions";
import { addStateMedia } from "../../app/mediaSlice";
import { addStateURL } from "../../app/urlsSlice";

const EditMedia = (props) => {

  const componentName = "EditMedia.js";

  const dispatch = useDispatch();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

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
  const [mediaRecordAdded, setMediaRecordAdded] = useState(null);
  const [mediaRecordUpdated, setMediaRecordUpdated] = useState(null);
  const [mediaRecordDeleted, setMediaRecordDeleted] = useState(null);

  const [txtMedia, setTxtMedia] = useState("");
  const [cbxElectronic, setCbxElectronic] = useState(false);

  const [errMedia, setErrMedia] = useState("");

  const [mediaItem, setMediaItem] = useState(null);
  // const [mediaID, setMediaID] = useState(null);
  // const [media, setMedia] = useState(null);
  // const [electronic, setElectronic] = useState(null);
  // const [sortID, setSortID] = useState(null);
  const [active, setActive] = useState(null);


  const addMedia = () => {
    // console.log(componentName, GetDateTime(), "addMedia baseURL", baseURL);

    clearMessages();
    setMediaRecordAdded(null);

    // setMediaItem(null);
    // setMediaID(null);
    // setMedia(null);
    // setElectronic(null);
    // setSortID(null);
    setActive(null);

    let mediaValidated = false;
    let formValidated = false;

    if (IsEmpty(txtMedia) === false) {

      if (FormatTrim(txtMedia).length > 0) {

        mediaValidated = true;
        setErrMedia("");
        // console.log(componentName, GetDateTime(), "addMedia Valid Media");
        // console.log(componentName, GetDateTime(), "addMedia mediaValidated true", mediaValidated);

      } else {

        mediaValidated = false;
        setErrMedia("Please enter a media.");
        // console.log(componentName, GetDateTime(), "addMedia Invalid Media");
        // console.log(componentName, GetDateTime(), "addMedia mediaValidated false", mediaValidated);

      };

    };

    if (mediaValidated === true) {

      formValidated = true;
      // console.log(componentName, GetDateTime(), "addMedia Valid Form");
      // console.log(componentName, GetDateTime(), "addMedia formValidated true", formValidated);

    } else {

      formValidated = false;
      // console.log(componentName, GetDateTime(), "addMedia Invalid Form");
      // console.log(componentName, GetDateTime(), "addMedia formValidated false", formValidated);

    };

    // console.log(componentName, GetDateTime(), "addMedia mediaValidated", mediaValidated);
    // console.log(componentName, GetDateTime(), "addMedia formValidated", formValidated);

    if (formValidated === true) {

      if (IsEmpty(txtMedia) === false) {

        let recordObject = {
          media: FormatTrim(txtMedia),
          electronic: cbxElectronic
        };

        // console.log(componentName, GetDateTime(), "addMedia recordObject", recordObject);

        let url = baseURL + "media/";
        // console.log(componentName, GetDateTime(), "addMedia url", url);

        if (IsEmpty(sessionToken) === false) {

          fetch(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": sessionToken
            }),
            body: JSON.stringify({ media: recordObject })
          })
            .then(response => {
              // console.log(componentName, GetDateTime(), "addMedia response", response);

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
              // console.log(componentName, GetDateTime(), "addMedia data", data);

              setMediaRecordAdded(data.transactionSuccess);
              addMessage(data.message);

              if (data.transactionSuccess === true) {

                // setMediaItem(data.records[0]);

                // setMediaID(data.records[0].mediaID);
                // setMedia(data.records[0].media);
                // setElectronic(data.records[0].electronic);
                // setSortID(data.records[0].sortID);
                setActive(data.records[0].active);

                // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
                dispatch(addStateMedia([{ mediaID: data.records[0].mediaID, media: data.records[0].media, electronic: data.records[0].electronic, sortID: data.records[0].sortID, active: data.records[0].active, mediaActive: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate }]));

                // ? Add to local storage also? -- 03/06/2021 MF

                dispatch(addStateURL([{ linkName: encodeURL(data.records[0].media), linkType: "media", linkID: data.records[0].mediaID }]));

              } else {

                // addErrorMessage(data.error);
                addErrorMessage(data.errorMessages);

              };

            })
            .catch((error) => {
              console.error(componentName, GetDateTime(), "addMedia error", error);
              // console.error(componentName, GetDateTime(), "addMedia error.name", error.name);
              // console.error(componentName, GetDateTime(), "addMedia error.message", error.message);

              addErrorMessage(error.name + ": " + error.message);

              // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

            });

        };

      };

    };

  };


  const updateMedia = (deleteMedia) => {
    // console.log(componentName, GetDateTime(), "updateMedia deleteMedia", deleteMedia);


  };


  const deleteMedia = () => {
    // console.log(componentName, GetDateTime(), "deleteMedia baseURL", baseURL);


  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect mediaRecordAdded", mediaRecordAdded);

    if (IsEmpty(mediaRecordAdded) === false && mediaRecordAdded === true) {

      clearMessages();
      setMediaRecordAdded(null);

      setTxtMedia("");
      setCbxElectronic(false);

      setModal(!modal);

    };

  }, [mediaRecordAdded]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect mediaRecordUpdated", mediaRecordUpdated);
    // console.log(componentName, GetDateTime(), "useEffect mediaRecordDeleted", mediaRecordDeleted);

    if (IsEmpty(mediaRecordUpdated) === false && mediaRecordUpdated === true) {

      clearMessages();
      setMediaRecordUpdated(null);

      setTxtMedia("");
      setCbxElectronic(false);

      setModal(!modal);

    };

    if (IsEmpty(mediaRecordDeleted) === false && mediaRecordDeleted === true) {

      clearMessages();
      setMediaRecordDeleted(null);

      setTxtMedia("");
      setCbxElectronic(false);

      setModal(!modal);

    };

  }, [mediaRecordUpdated, mediaRecordDeleted]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect check for admin", admin);

    if (admin !== true) {

      // return <Redirect to="/" />;
      setModal(false);

    };

  }, [admin]);


  return (
    <React.Fragment>

      {applicationAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayButton === true ? <span className="ps-3"><Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Add Media</Button></span> : null}

      {applicationAllowUserInteractions === true && IsEmpty(admin) === false && admin === true && props.displayIcon === true ? <Plus className="add-edit-icon" onClick={(event) => { setModal(!modal); }} /> : null}

      <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="md">
        <ModalHeader toggle={(event) => { setModal(!modal); }}>Add Media</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>

            <FormGroup>
              <Label for="txtMedia">Media</Label>
              <Input type="text" id="txtMedia" value={txtMedia} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtMedia(event.target.value); }} />
              {IsEmpty(errMedia) === false ? <Alert color="danger">{errMedia}</Alert> : null}
            </FormGroup>

            <FormGroup className="ms-4">
              <Label for="cbxElectronic"><Input type="checkbox" id="cbxElectronic" checked={cbxElectronic} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setCbxElectronic(!cbxElectronic); }} />Electronic</Label>
            </FormGroup>

            <ModalFooter>

              {IsEmpty(mediaItem) === true ?

                <Button outline size="lg" color="primary" onClick={addMedia}>Add Media</Button>

                :

                <React.Fragment>

                  <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateMedia(false); }}>Update Media</Button>

                  {IsEmpty(active) === false && (active === false || active === 0) ?

                    <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateMedia(false); }}>Undelete/Restore Media</Button>

                    : null}

                  {IsEmpty(active) === false && (active === true || active === 1) ?

                    <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateMedia(true); }}>Delete Media</Button>

                    : null}

                  <Button outline size="lg" color="warning" onClick={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ deleteMedia(); }}>Hard Delete Media</Button>
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

export default EditMedia;
