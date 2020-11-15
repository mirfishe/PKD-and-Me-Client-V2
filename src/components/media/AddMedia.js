import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {Plus} from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import {loadArrayMedia} from "../../bibliographyData/mediaSlice";

const AddMedia = (props) => {

    const componentName = "AddMedia.js";

    const dispatch = useDispatch();

    const sessionToken = useSelector(state => state.user.sessionToken);
    // console.log(componentName, "sessionToken", sessionToken);
    const admin = useSelector(state => state.user.admin);
    // console.log(componentName, "admin", admin);

    // Loading the baseURL from the state store here is too slow
    // Always pulling it from environment.js
    // const baseURL = useSelector(state => state.app.baseURL);
    const baseURL = AppSettings.baseURL;
    // console.log(componentName, "baseURL", baseURL);

    const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [mediaRecordAdded, setMediaRecordAdded] = useState(null);

    const [txtMedia, setTxtMedia] = useState("");
    const [cbxElectronic, setCbxElectronic] = useState(false);

    const [errMedia, setErrMedia] = useState("");

    // const [mediaItem, setMediaItem] = useState(null);
    const [mediaID, setMediaID] = useState(null);
    const [media, setMedia] = useState(null);
    const [electronic, setElectronic] = useState(null);
    const [sortID, setSortID] = useState(null);
    const [active, setActive] = useState(null);


    const addMedia = () => {
        // console.log(componentName, "addMedia");
        // console.log(componentName, "addMedia baseURL", baseURL);

        setMessage("");
        setErrMessage("");
        setMediaRecordAdded(null);

        // setMediaItem(null);
        setMediaID(null);
        setMedia(null);
        setElectronic(null);
        setSortID(null);
        setActive(null);

        let mediaValidated = false;
        let formValidated = false;

        if (txtMedia !== undefined && txtMedia !== null) {
            if (txtMedia.trim().length > 0) {
                mediaValidated = true;
                setErrMedia("");
                // console.log(componentName, "addMedia Valid Media");
                // console.log(componentName, "addMedia mediaValidated true", mediaValidated);
            } else {
                mediaValidated = false;
                setErrMedia("Please enter a media.");
                // console.log(componentName, "addMedia Invalid Media");
                // console.log(componentName, "addMedia mediaValidated false", mediaValidated);
            };
        };

        if (mediaValidated === true) {
            formValidated = true;
            // console.log(componentName, "addMedia Valid Form");
            // console.log(componentName, "addMedia formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log(componentName, "addMedia Invalid Form");
            // console.log(componentName, "addMedia formValidated false", formValidated);
        };

        // console.log(componentName, "addMedia mediaValidated", mediaValidated);
        // console.log(componentName, "addMedia formValidated", formValidated);

        if (formValidated === true) {

            if (txtMedia !== undefined && txtMedia !== null) {

                let mediaObject = {
                    media: txtMedia.trim(),
                    electronic: cbxElectronic
                };

                // console.log(componentName, "addMedia mediaObject", mediaObject);

                let url = baseURL + "media/";
                // console.log(componentName, "addMedia url", url);

                fetch(url, {
                    method: "POST",
                    headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": sessionToken
                    }),
                    body: JSON.stringify({media: mediaObject})
                })
                .then(response => {
                    // console.log(componentName, "addMedia response", response);
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
                    // console.log(componentName, "addMedia data", data);

                    setMediaRecordAdded(data.recordAdded);
                    setMessage(data.message);

                    if (data.recordAdded === true) {

                        // setMediaItem(data);

                        setMediaID(data.mediaID);
                        setMedia(data.media);
                        setElectronic(data.electronic);
                        setSortID(data.sortID);
                        setActive(data.active);

                        // Would still work if the createdAt and updatedAt were left out
                        dispatch(loadArrayMedia([{mediaID: data.mediaID, media: data.media, electronic: data.electronic, sortID: data.sortID, active: data.active, createdAt: data.createdAt, updatedAt: data.updatedAt}]));

                    } else {
                        // setErrMessage(data.error);
                        setErrMessage(data.errorMessages);
                    };

                })
                .catch(error => {
                    console.log(componentName, "addMedia error", error);
                    // console.log(componentName, "addMedia error.name", error.name);
                    // console.log(componentName, "addMedia error.message", error.message);
                    setErrMessage(error.name + ": " + error.message);
                });

            };

        };

    };

    useEffect(() => {
        // console.log(componentName, "useEffect mediaRecordAdded", mediaRecordAdded);
        if (mediaRecordAdded !== undefined && mediaRecordAdded !== null && mediaRecordAdded === true) {
            setMessage("");
            setErrMessage("");
            setMediaRecordAdded(null);
            setModal(false);
        };
        
    }, [mediaRecordAdded]);

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

    return(
        <React.Fragment>
                            
        {admin !== undefined && admin !== null && admin === true && props.displayButton === true ? <Button outline size="sm" color="info" onClick={toggle}>Add Media</Button> : null}

        {admin !== undefined && admin !== null && admin === true && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

        <Modal isOpen={modal} toggle={toggle} size="md">
           <ModalHeader toggle={toggle}>Add Media</ModalHeader>
           <ModalBody>
           <Form>
                <FormGroup>
                {message !== undefined && message !== null && message !== "" ? <Alert color="info">{message}</Alert> : null}
                {errMessage !== undefined && errMessage !== null && errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : null}
                </FormGroup>
                <FormGroup>

                <Label for="txtMedia">Media</Label>
                <Input type="text" id="txtMedia" value={txtMedia} onChange={(event) => {/*console.log(event.target.value);*/ setTxtMedia(event.target.value);}} />
                {errMedia !== undefined && errMedia !== null && errMedia !== "" ? <Alert color="danger">{errMedia}</Alert> : null}

                </FormGroup>
                <FormGroup className="ml-4">

                <Input type="checkbox" id="cbxElectronic" checked={cbxElectronic} onChange={(event) => {/*console.log(event.target.value);*/ setCbxElectronic(!cbxElectronic);}} />
                <Label for="cbxElectronic">Electronic</Label>

                </FormGroup>

                <ModalFooter>
                     <Button outline size="lg" color="primary" onClick={addMedia}>Add Media</Button>
                     <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
       </ModalBody>
     </Modal>
   </React.Fragment>
    );

};

export default AddMedia;
