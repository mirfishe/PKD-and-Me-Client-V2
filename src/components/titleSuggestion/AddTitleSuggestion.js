import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {Plus} from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";

const AddTitleSuggestion = (props) => {

    const componentName = "AddTitleSuggestion.js";

    const dispatch = useDispatch();

    const sessionToken = useSelector(state => state.user.sessionToken);
    // console.log(componentName, "sessionToken", sessionToken);
    const admin = useSelector(state => state.user.admin);
    // console.log(componentName, "admin", admin);
    const userID = useSelector(state => state.user.userID);
    // console.log(componentName, "userID", userID);

    // Loading the baseURL from the state store here is too slow
    // Always pulling it from environment.js
    // const baseURL = useSelector(state => state.app.baseURL);
    const baseURL = AppSettings.baseURL;
    // console.log(componentName, "baseURL", baseURL);

    const requireUserLogin = useSelector(state => state.app.requireUserLogin);
    // console.log(componentName, "requireUserLogin", requireUserLogin);

    const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

    const userState = {userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active)}
    // console.log(componentName, "userState", userState);

    const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [titleSuggestionRecordAdded, setTitleSuggestionRecordAdded] = useState(null);

    const [txtTitleName, setTxtTitleName] = useState("");
    const [txtAuthorFirstName, setTxtAuthorFirstName] = useState("");
    const [txtAuthorLastName, setTxtAuthorLastName] = useState("");
    const [txtPublicationDate, setTxtPublicationDate] = useState("");
    const [txtShortDescription, setTxtShortDescription] = useState("");
    const [txtTitleURL, setTxtTitleURL] = useState("");

    const [errTitleName, setErrTitleName] = useState("");

    const [titleSuggestionItem, setTitleSuggestionItem] = useState(null);
    const [titleSuggestionID, setTitleSuggestionID] = useState(null);
    const [titleSuggestionUserID, setTitleSuggestionUserID] = useState(null);
    const [titleName, setTitleName] = useState(null);
    const [authorFirstName, setAuthorFirstName] = useState(null);
    const [authorLastName, setAuthorLastName] = useState(null);
    const [publicationDate, setPublicationDate] = useState(null);
    const [shortDescription, setShortDescription] = useState(null);
    const [titleURL, setTitleURL] = useState(null);

    const addTitleSuggestion = () => {
        // console.log(componentName, "addTitleSuggestion");
        // console.log(componentName, "addTitleSuggestion baseURL", baseURL);

        setMessage("");
        setErrMessage("");
        setTitleSuggestionRecordAdded(null);
        setErrTitleName("");

        setTitleSuggestionItem(null);
        setTitleSuggestionID(null);
        setTitleSuggestionUserID(null);
        setTitleName(null);
        setAuthorFirstName(null);
        setAuthorLastName(null);
        setPublicationDate(null);
        setShortDescription(null);
        setTitleURL(null);

        let titleNameValidated = false;
        let formValidated = false;

        if (txtTitleName !== undefined && txtTitleName !== null) {
            if (txtTitleName.trim().length > 0) {
                titleNameValidated = true;
                setErrTitleName("");
                // console.log(componentName, "addTitleSuggestion Valid TitleName");
                // console.log(componentName, "addTitleSuggestion titleNameValidated true", titleNameValidated);
            } else {
                titleNameValidated = false;
                setErrTitleName("Please enter a title.");
                // console.log(componentName, "addTitleSuggestion Invalid TitleName");
                // console.log(componentName, "addTitleSuggestion titleNameValidated false", titleNameValidated);
            };
        };

        if (titleNameValidated === true) {
            formValidated = true;
            // console.log(componentName, "addTitleSuggestion Valid Form");
            // console.log(componentName, "addTitleSuggestion formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log(componentName, "addTitleSuggestion Invalid Form");
            // console.log(componentName, "addTitleSuggestion formValidated false", formValidated);
        };

        // console.log(componentName, "addTitleSuggestion titleNameValidated", titleNameValidated);
        // console.log(componentName, "addTitleSuggestion categoryIDValidated", categoryIDValidated);
        // console.log(componentName, "addTitleSuggestion formValidated", formValidated);

        if (formValidated === true) {

            if (txtTitleName !== undefined && txtTitleName !== null) {

                let titleObject = {
                    titleName: txtTitleName.trim(),
                    // authorFirstName: txtAuthorFirstName.trim(),
                    // authorLastName: txtAuthorLastName.trim(),
                    // shortDescription: txtShortDescription.trim(),
                    // titleURL: txtTitleURL.trim()
                };
                
                // If the user doesn't enter an author first name, then it isn't added/updated
                if (txtAuthorFirstName !== undefined && txtAuthorFirstName !== null) {
                    if (txtAuthorFirstName.trim().length !== 0) {
                        Object.assign(titleObject, {authorFirstName: txtAuthorFirstName.trim()});
                    };
                };

                // If the user doesn't enter an author last name, then it isn't added/updated
                if (txtAuthorLastName !== undefined && txtAuthorLastName !== null) {
                    if (txtAuthorLastName.trim().length !== 0) {
                        Object.assign(titleObject, {authorLastName: txtAuthorLastName.trim()});
                    };
                };

                // If the user doesn't enter a publication date, then it isn't added/updated
                if (txtPublicationDate !== undefined && txtPublicationDate !== null) {
                    if (txtPublicationDate.trim().length !== 0) {
                        Object.assign(titleObject, {publicationDate: txtPublicationDate.trim()});
                    };
                };

                // If the user doesn't enter a short description, then it isn't added/updated
                if (txtShortDescription !== undefined && txtShortDescription !== null) {
                    if (txtShortDescription.trim().length !== 0) {
                        Object.assign(titleObject, {shortDescription: txtShortDescription.trim()});
                    };
                };

                // If the user doesn't enter a title URL, then it isn't added/updated
                if (txtTitleURL !== undefined && txtTitleURL !== null) {
                    if (txtTitleURL.trim().length !== 0) {
                        Object.assign(titleObject, {titleURL: txtTitleURL.trim()});
                    };
                };

                // console.log(componentName, "addTitleSuggestion titleObject", titleObject);

                let url = baseURL + "title/";
                // console.log(componentName, "addTitleSuggestion url", url);

                if (sessionToken !== undefined && sessionToken !== null) {

                    fetch(url, {
                        method: "POST",
                        headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": sessionToken
                        }),
                        body: JSON.stringify({title: titleObject})
                    })
                    .then(response => {
                        // console.log(componentName, "addTitleSuggestion response", response);
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
                        // console.log(componentName, "addTitleSuggestion data", data);

                        titleSuggestionRecordAdded(data.recordAdded);
                        setMessage(data.message);

                        if (data.recordAdded === true) {

                            setTitleSuggestionItem(data);
                            setTitleSuggestionID(data.titleSuggestionID);
                            setTitleSuggestionUserID(data.userID);
                            setTitleName(data.titleName);
                            setAuthorFirstName(data.authorFirstName);
                            setAuthorLastName(data.authorLastName);
                            setPublicationDate(data.publicationDate);
                            setShortDescription(data.shortDescription);
                            setTitleURL(data.titleURL);

                            // Would still work if the createdAt and updatedAt were left out?
                            // dispatch(addStateTitle([{titleID: data.titleID, titleName: data.titleName, titleSort: data.titleSort, titleURL: data.titleURL, authorFirstName: data.authorFirstName, authorLastName: data.authorLastName, publicationDate: data.publicationDate, imageName: data.imageName, categoryID: data.categoryID, shortDescription: data.shortDescription, urlPKDweb: data.urlPKDweb, active: data.active, createdAt: data.createdAt, updatedAt: data.updatedAt}]));
                            // Add to local storage also?

                        } else {
                            // setErrMessage(data.error);
                            setErrMessage(data.errorMessages);
                        };

                    })
                    .catch(error => {
                        console.log(componentName, "addTitleSuggestion error", error);
                        // console.log(componentName, "addTitleSuggestion error.name", error.name);
                        // console.log(componentName, "addTitleSuggestion error.message", error.message);
                        setErrMessage(error.name + ": " + error.message);
                    });

                };

            };

        };
    };

    useEffect(() => {
        // console.log(componentName, "useEffect titleSuggestionRecordAdded", titleSuggestionRecordAdded);
        if (titleSuggestionRecordAdded !== undefined && titleSuggestionRecordAdded !== null && titleSuggestionRecordAdded === true) {
            setMessage("");
            setErrMessage("");
            setErrTitleName("");
            setTitleSuggestionRecordAdded(null);
            // setModal(false);
            toggle();
        };
        
    }, [titleSuggestionRecordAdded]);

    useEffect(() => {
        // console.log(componentName, "useEffect check for sessionToken", sessionToken);

        if (sessionToken === undefined || sessionToken === null || sessionToken === "") {
            // return <Redirect to="/" />;
            setModal(false);
        };
        
    }, [sessionToken]);

    const toggle = () => {
        setModal(!modal);
    };

    return(
        <React.Fragment>

            {appAllowUserInteractions === true && ((sessionToken !== undefined && sessionToken !== null && sessionToken !== "") || requireUserLogin === false) && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Title Suggestion</Button></span> : null}

            {appAllowUserInteractions === true && ((sessionToken !== undefined && sessionToken !== null && sessionToken !== "") || requireUserLogin === false) && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

        <Modal isOpen={modal} toggle={toggle} size="lg">
           <ModalHeader toggle={toggle}>Add Title Suggestion</ModalHeader>
           <ModalBody>
           <Form>
           <FormGroup className="text-center">
                {message !== undefined && message !== null && message !== "" ? <Alert color="info">{message}</Alert> : null}
                {errMessage !== undefined && errMessage !== null && errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : null}
            </FormGroup>
            <FormGroup>

            <Label for="txtTitleName">Title</Label>
            <Input type="text" id="txtTitleName" value={txtTitleName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtTitleName(event.target.value);}} />
            {errTitleName !== undefined && errTitleName !== null && errTitleName !== "" ? <Alert color="danger">{errTitleName}</Alert> : null}

            </FormGroup>
            <FormGroup>

            <Label for="txtAuthorFirstName">Author First Name</Label>
            <Input type="text" id="txtAuthorFirstName" value={txtAuthorFirstName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtAuthorFirstName(event.target.value);}} />

            </FormGroup>
            <FormGroup>
                
            <Label for="txtAuthorLastName">Author Last Name</Label>
            <Input type="text" id="txtAuthorLastName" value={txtAuthorLastName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtAuthorLastName(event.target.value);}} />

            </FormGroup>
            <FormGroup>
                    
            <Label for="txtPublicationDate">Publication Date</Label>
            <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => {/*console.log(event.target.value);*/ setTxtPublicationDate(event.target.value);}} />

            </FormGroup>
            <FormGroup>
                
            <Label for="txtShortDescription">Short Description</Label>
            <Input type="textarea" id="txtShortDescription" rows={10} value={txtShortDescription} onChange={(event) => {/*console.log(event.target.value);*/ setTxtShortDescription(event.target.value);}} />

            </FormGroup>
            <FormGroup>

            <Label for="txtTitleURL">Title URL</Label>
            <Input type="text" id="txtTitleURL" value={txtTitleURL} onChange={(event) => {/*console.log(event.target.value);*/ setTxtTitleURL(event.target.value);}} />

            </FormGroup>

                <ModalFooter>
    
                 <Button outline size="lg" color="primary" onClick={addTitleSuggestion}>Add Title Suggestion</Button>
                 <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
       </ModalBody>
     </Modal>
   </React.Fragment>
    );

};

export default AddTitleSuggestion;
