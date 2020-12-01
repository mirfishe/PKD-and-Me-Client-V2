import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {Plus} from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";

const AddComment = (props) => {

    const componentName = "AddComment.js";

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
    const [commentRecordAdded, setCommentRecordAdded] = useState(null);

    const [txtComment, setTxtComment] = useState("");
    const [txtEmailAddress, setTxtEmailAddress] = useState("");

    const [errComment, setErrComment] = useState("");
    const [errEmailAddress, setErrEmailAddress] = useState("");

    const [commentItem, setCommentItem] = useState(null);
    const [commentID, setCommentID] = useState(null);
    const [commentUserID, setCommentUserID] = useState(null);
    const [comment, setComment] = useState(null);
    const [commentEmailAddress, setCommentEmailAddress] = useState(null);

    const addComment = () => {
        // console.log(componentName, "addComment");
        // console.log(componentName, "addComment baseURL", baseURL);

        setMessage("");
        setErrMessage("");
        setCommentRecordAdded(null);
        setErrComment("");
        setErrEmailAddress("");

        setCommentItem(null);
        setCommentID(null);
        setCommentUserID(null);
        setComment(null);
        setCommentEmailAddress(null);

        let commentValidated = false;
        let emailAddressValidated = false;
        let formValidated = false;

        if (txtComment !== undefined && txtComment !== null) {
            if (txtComment.trim().length > 0) {
                commentValidated = true;
                setErrEmailAddress("");
                // console.log(componentName, "addComment Valid emailAddress");
                // console.log(componentName, "addComment emailAddressValidated true", emailAddressValidated);
            } else {
                commentValidated = false;
                setErrEmailAddress("Please enter a comment.");
                // console.log(componentName, "addComment Invalid emailAddress");
                // console.log(componentName, "addComment emailAddressValidated false", emailAddressValidated);
            };
        };

        if (txtEmailAddress !== undefined && txtEmailAddress !== null) {
            if (txtEmailAddress.trim().length > 0 || requireUserLogin === false) {
                emailAddressValidated = true;
                setErrEmailAddress("");
                // console.log(componentName, "addComment Valid emailAddress");
                // console.log(componentName, "addComment emailAddressValidated true", emailAddressValidated);
            } else {
                emailAddressValidated = false;
                setErrEmailAddress("Please enter an email address.");
                // console.log(componentName, "addComment Invalid emailAddress");
                // console.log(componentName, "addComment emailAddressValidated false", emailAddressValidated);
            };
        };

        if (commentValidated === true && emailAddressValidated === true) {
            formValidated = true;
            // console.log(componentName, "addComment Valid Form");
            // console.log(componentName, "addComment formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log(componentName, "addComment Invalid Form");
            // console.log(componentName, "addComment formValidated false", formValidated);
        };

        // console.log(componentName, "addComment emailAddressValidated", emailAddressValidated);
        // console.log(componentName, "addComment categoryIDValidated", categoryIDValidated);
        // console.log(componentName, "addComment formValidated", formValidated);

        if (formValidated === true) {

            if (txtComment !== undefined && txtComment !== null && txtEmailAddress !== undefined && txtEmailAddress !== null) {

                let commentObject = {
                    comment: txtComment.trim(),
                    emailAddress: txtEmailAddress.trim()
                };

                // console.log(componentName, "addComment commentObject", commentObject);

                let url = baseURL + "title/";
                // console.log(componentName, "addComment url", url);

                if ((sessionToken !== undefined && sessionToken !== null && sessionToken !== "") || requireUserLogin === false) {

                    let headerObject = new Headers({"Content-Type": "application/json"});

                    // If the user isn't logged in and user login isn't required, then it isn't added to the Authorization header
                    if (sessionToken !== undefined && sessionToken !== null && sessionToken !== "") {
                        Object.assign(headerObject, {"Authorization": sessionToken});
                    };

                    fetch(url, {
                        method: "POST",
                        headers: headerObject,
                        body: JSON.stringify({comment: commentObject})
                    })
                    .then(response => {
                        // console.log(componentName, "addComment response", response);
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
                        // console.log(componentName, "addComment data", data);

                        setCommentRecordAdded(data.recordAdded);
                        setMessage(data.message);

                        if (data.recordAdded === true) {

                            setCommentItem(data);
                            setCommentID(data.CommentID);
                            setCommentUserID(data.userID);
                            setComment(data.Comment);
                            setCommentEmailAddress(data.emailAddress);

                            // Would still work if the createdAt and updatedAt were left out?
                            // dispatch(addStateTitle([{titleID: data.titleID, emailAddress: data.EmailAddress, titleSort: data.titleSort, titleURL: data.titleURL, authorFirstName: data.authorFirstName, authorLastName: data.authorLastName, publicationDate: data.publicationDate, imageName: data.imageName, categoryID: data.categoryID, Comment: data.Comment, urlPKDweb: data.urlPKDweb, active: data.active, createdAt: data.createdAt, updatedAt: data.updatedAt}]));
                            // Add to local storage also?

                        } else {
                            // setErrMessage(data.error);
                            setErrMessage(data.errorMessages);
                        };

                    })
                    .catch(error => {
                        console.log(componentName, "addComment error", error);
                        // console.log(componentName, "addComment error.name", error.name);
                        // console.log(componentName, "addComment error.message", error.message);
                        setErrMessage(error.name + ": " + error.message);
                    });

                };

            };

        };
    };

    useEffect(() => {
        // console.log(componentName, "useEffect commentRecordAdded", commentRecordAdded);
        if (commentRecordAdded !== undefined && commentRecordAdded !== null && commentRecordAdded === true) {
            setMessage("");
            setErrMessage("");
            setErrComment("");
            setErrEmailAddress("");
            setCommentRecordAdded(null);
            // setModal(false);
            toggle();
        };
        
    }, [commentRecordAdded]);

    useEffect(() => {
        // console.log(componentName, "useEffect check for sessionToken", sessionToken);

        if ((sessionToken !== undefined && sessionToken !== null && sessionToken !== "") || requireUserLogin === false) {
            // return <Redirect to="/" />;
            setModal(false);
        };
        
    }, [sessionToken]);

    const toggle = () => {
        setModal(!modal);
    };

    return(
        <React.Fragment>

            {appAllowUserInteractions === true && ((sessionToken !== undefined && sessionToken !== null && sessionToken !== "") || requireUserLogin === false) && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Comment</Button></span> : null}

            {appAllowUserInteractions === true && ((sessionToken !== undefined && sessionToken !== null && sessionToken !== "") || requireUserLogin === false) && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

        <Modal isOpen={modal} toggle={toggle} size="lg">
           <ModalHeader toggle={toggle}>Add Comment</ModalHeader>
           <ModalBody>
           <Form>
           <FormGroup className="text-center">
                {message !== undefined && message !== null && message !== "" ? <Alert color="info">{message}</Alert> : null}
                {errMessage !== undefined && errMessage !== null && errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : null}
            </FormGroup>
            <FormGroup>
                
            <Label for="txtComment">Comment</Label>
            <Input type="textarea" id="txtComment" rows={10} value={txtComment} onChange={(event) => {/*console.log(event.target.value);*/ setTxtComment(event.target.value);}} />
            {errComment !== undefined && errComment !== null && errComment !== "" ? <Alert color="danger">{errComment}</Alert> : null}

            </FormGroup>
            <FormGroup>

            <Label for="txtEmailAddress">Email Address</Label>
            <Input type="text" id="txtEmailAddress" value={txtEmailAddress} onChange={(event) => {/*console.log(event.target.value);*/ setTxtEmailAddress(event.target.value);}} />
            {errEmailAddress !== undefined && errEmailAddress !== null && errEmailAddress !== "" ? <Alert color="danger">{errEmailAddress}</Alert> : null}

            </FormGroup>

                <ModalFooter>
    
                 <Button outline size="lg" color="primary" onClick={addComment}>Add Comment</Button>
                 <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
       </ModalBody>
     </Modal>
   </React.Fragment>
    );

};

export default AddComment;
