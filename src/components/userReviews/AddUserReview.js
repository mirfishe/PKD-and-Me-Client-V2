import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Rating} from "@material-ui/lab/";
import {Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {Plus} from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import {addStateUserReview} from "../../bibliographyData/userReviewsSlice";

const AddUserReview = (props) => {

    const componentName = "AddUserReview.js";

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

    const titleListState = useSelector(state => state.titles.arrayTitles);
    // console.log(componentName, "titleListState", titleListState);

    const userState = {userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active)}
    console.log(componentName, "userState", userState);

    const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [userReviewRecordAdded, setUserReviewRecordAdded] = useState(null);

    const [cbxRead, setCbxRead] = useState(false);
    const [txtDateRead, setTxtDateRead] = useState("");
    const [rdoRating, setRdoRating] = useState(null);
    const [txtShortReview, setTxtShortReview] = useState("");
    const [txtLongReview, setTxtLongReview] = useState("");

    const [userReviewItem, setUserReviewItem] = useState(null);
    const [reviewID, setReviewID] = useState(null);
    const [userID, setUserID] = useState(null);
    const [updatedBy, setUpdatedBy] = useState(null);
    const [titleID, setTitleID] = useState(null);
    const [read, setRead] = useState(null);
    const [dateRead, setDateRead] = useState(null);
    const [rating, setRating] = useState(null);
    const [shortReview, setShortReview] = useState(null);
    const [longReview, setLongReview] = useState(null);
    const [active, setActive] = useState(null);

    const addUserReview = () => {
        // console.log(componentName, "addUserReview");
        // console.log(componentName, "addUserReview baseURL", baseURL);

        setMessage("");
        setErrMessage("");
        setUserReviewRecordAdded(null);

        setUserReviewItem(null);
        setReviewID(null);
        setUserID(null);
        setUpdatedBy(null);
        setTitleID(null);
        setRead(null);
        setDateRead(null);
        setRating(null);
        setShortReview(null);
        setLongReview(null);
        setActive(null);

        // Check to make sure that txtDateRead) is a date?
        // Check to make sure that props.titleID is a number?
        // txtDateRead is expecting a date and rdoRating is expecting a number
        // if (txtDateRead !== null && rdoRating !== null) {

            let userReviewObject = {
                titleID: props.titleID,
                read: cbxRead,
                // dateRead: txtDateRead.trim(),
                rating: rdoRating,
                // shortReview: txtShortReview.trim(),
                // longReview: txtLongReview.trim()
            };

            // If the user doesn't enter a date read, then it isn't added/updated
            if (txtDateRead !== null && txtDateRead !== undefined) {
                if (txtDateRead.trim().length !== 0) {
                    Object.assign(userReviewObject, {dateRead: txtDateRead.trim()});
                };
            };

            // If the user doesn't enter a short review, then it isn't added/updated
            if (txtShortReview !== null && txtShortReview !== undefined) {
                if (txtShortReview.trim().length !== 0) {
                    Object.assign(userReviewObject, {shortReview: txtShortReview.trim()});
                };
            };

            // If the user doesn't enter a long review, then it isn't added/updated
            if (txtLongReview !== null && txtLongReview !== undefined) {
                if (txtLongReview.trim().length !== 0) {
                    Object.assign(userReviewObject, {longReview: txtLongReview.trim()});
                };
            };

            // console.log(componentName, "addUserReview userReviewObject", userReviewObject);

            let url = baseURL + "userreview/";
            // console.log(componentName, "addUserReview url", url);

            if (sessionToken !== undefined && sessionToken !== null) {

                fetch(url, {
                    method: "POST",
                    headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": sessionToken
                    }),
                    body: JSON.stringify({userReview: userReviewObject})
                })
                .then(response => {
                    // console.log(componentName, "addUserReview response", response);
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
                    // console.log(componentName, "addUserReview data", data);

                    setUserReviewRecordAdded(data.recordAdded);
                    setMessage(data.message);

                    if (data.recordAdded === true) {

                        setUserReviewItem(data);
                        setReviewID(data.reviewID);
                        setUserID(data.userID);
                        setUpdatedBy(data.updatedBy);
                        setTitleID(data.titleID);
                        setRead(data.read);
                        setDateRead(data.dateRead);
                        setRating(data.rating);
                        setShortReview(data.shortReview);
                        setLongReview(data.longReview);
                        setActive(data.active);

                        let titleItem = titleListState.filter(title => title.titleID === data.titleID);
                        // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createdAt: titleItem.createdAt, updatedAt: titleItem.updatedAt}

                        // user: {userID: userID, firstName: firstName, lastName: lastName, email: email, updatedBy: updatedBy,  admin: admin, active: userActive}

                        // Would still work if the createdAt and updatedAt were left out?
                        dispatch(addStateUserReview([{reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, rating: data.rating, shortReview: data.shortReview, longReview: data.longReview, active: data.active, createdAt: data.createdAt, updatedAt: data.updatedAt, title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createdAt: titleItem.createdAt, updatedAt: titleItem.updatedAt}, user: {userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy,  admin: userState.admin, active: userState.active}}]));
                        // Add to local storage also?

                    } else {
                        // setErrMessage(data.error);
                        setErrMessage(data.errorMessages);
                    };

                })
                .catch(error => {
                    console.log(componentName, "addUserReview error", error);
                    // console.log(componentName, "addUserReview error.name", error.name);
                    // console.log(componentName, "addUserReview error.message", error.message);
                    setErrMessage(error.name + ": " + error.message);
                });

            };

        // };

    };

    useEffect(() => {
        // console.log(componentName, "useEffect userReviewRecordAdded", userReviewRecordAdded);
        if (userReviewRecordAdded !== undefined && userReviewRecordAdded !== null && userReviewRecordAdded === true) {
            setMessage("");
            setErrMessage("");
            setUserReviewRecordAdded(null);
            setModal(false);
        };
        
    }, [userReviewRecordAdded]);

    useEffect(() => {
        // console.log(componentName, "useEffect check for sessionToken", sessionToken);

        if (sessionToken === undefined || sessionToken === null || sessionToken === "") {
            // return <Redirect to="/" />;
            setModal(false);
        };
        
    }, [admin]);

    const toggle = () => {
        setModal(!modal);
    };

    return(
        <React.Fragment>

            {props.displayButton === true ? <span className="mt-2 pl-3"><Button outline size="sm" color="info" onClick={toggle}>Add Review</Button></span> : null}

            {props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

        <Modal isOpen={modal} toggle={toggle} size="lg">
           <ModalHeader toggle={toggle}>Add Review</ModalHeader>
           <ModalBody>
           <Form>
           <FormGroup>
                {message !== undefined && message !== null && message !== "" ? <Alert color="info">{message}</Alert> : null}
                {errMessage !== undefined && errMessage !== null && errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : null}
            </FormGroup>
           <FormGroup row>

                <Col>
                <FormGroup>
                <Label for="cbxRead">Read</Label>
                <Input type="checkbox" id="cbxRead" checked={cbxRead} onChange={(event) => {/*console.log(event.target.value);*/ setCbxRead(!cbxRead);}} />
                </FormGroup>

                <FormGroup>
                <Label for="rdoRating">Rating</Label>
                <Rating name="rdoRating" defaultValue={0} max={10} value={rdoRating} onChange={(event, newValue) => {/*console.log(event.target.value);*/ setRdoRating(newValue);}} />
                {/* <Label for="rdoRating"><Input type="radio" id="rdoRating" value={rdoRating} onChange={(event) => {setState({rdoRating: event.target.value});}} /> 1</Label>
                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={rdoRating} onChange={(event) => {setState({rdoRating: event.target.value});}} /> 2</Label>
                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={rdoRating} onChange={(event) => {setState({rdoRating: event.target.value});}} /> 3</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={rdoRating} onChange={(event) => {setState({rdoRating: event.target.value});}} /> 4</Label>     

                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={rdoRating} onChange={(event) => {setState({rdoRating: event.target.value});}} /> 5</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={rdoRating} onChange={(event) => {setState({rdoRating: event.target.value});}} /> 6</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={rdoRating} onChange={(event) => {setState({rdoRating: event.target.value});}} /> 7</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={rdoRating} onChange={(event) => {setState({rdoRating: event.target.value});}} /> 8</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={rdoRating} onChange={(event) => {setState({rdoRating: event.target.value});}} /> 9</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={rdoRating} onChange={(event) => {setState({rdoRating: event.target.value});}} /> 10</Label> */}
                </FormGroup>
                </Col>

                <FormGroup>
                <Label for="txtDateRead">Date Read</Label>
                <Input type="date" id="txtDateRead" value={txtDateRead} onChange={(event) => {/*console.log(event.target.value);*/ setTxtDateRead(event.target.value);}} />
                </FormGroup>

                </FormGroup>
                <FormGroup>

                <Label for="txtShortReview">Short Review</Label>
                <Input type="text" id="txtShortReview" value={txtShortReview} onChange={(event) => {/*console.log(event.target.value);*/ setTxtShortReview(event.target.value);}} />

                </FormGroup>
                <FormGroup>

                <Label for="txtLongReview">Long Review</Label>
                <Input type="textarea" id="txtLongReview" rows={10} value={txtLongReview} onChange={(event) => {/*console.log(event.target.value);*/ setTxtLongReview(event.target.value);}} />

                </FormGroup>

                <ModalFooter>
    
                 <Button outline size="lg" color="primary" onClick={addUserReview}>Add Review</Button>
                 <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
       </ModalBody>
     </Modal>
   </React.Fragment>
    );

};

export default AddUserReview;
