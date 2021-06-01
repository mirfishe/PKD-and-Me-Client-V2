import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Plus } from 'react-bootstrap-icons';
import { Rating } from "@material-ui/lab/";
import AppSettings from "../../app/environment";
import { addStateUserReview } from "../../bibliographyData/userReviewsSlice";
import { updateStateTitleRating } from "../../bibliographyData/titlesSlice";
import { updateStateChecklist } from "../../app/userSlice";

const AddUserReview = (props) => {

  const componentName = "AddUserReview.js";

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

  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, "titleListState", titleListState);

  const checklistListState = useSelector(state => state.user.arrayChecklist);
  // console.log(componentName, "checklistListState", checklistListState);

  const userReviewListState = useSelector(state => state.userReviews.arrayUserReviews);
  // console.log(componentName, "userReviewListState", userReviewListState);

  const userState = { userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active) };
  // console.log(componentName, "userState", userState);

  // console.log(componentName, "props.titleID", props.titleID);

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
  const [userReviewRecordAdded, setUserReviewRecordAdded] = useState(null);

  const [cbxRead, setCbxRead] = useState(false);
  const [txtDateRead, setTxtDateRead] = useState("");
  const [rdoRating, setRdoRating] = useState(null);
  const [txtRanking, setTxtRanking] = useState("");
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
  const [ranking, setRanking] = useState(null);
  const [shortReview, setShortReview] = useState(null);
  const [longReview, setLongReview] = useState(null);
  const [active, setActive] = useState(null);

  // const [titleItemIndex, setTitleItemIndex] = useState(null);
  // const [titleItem, setTitleItem] = useState(null);

  // useEffect(() => {
  //     // console.log(componentName, "useEffect userReviewListState", userReviewListState);

  //     if (props.titleID !== undefined && props.titleID !== null) {

  //         let titleObject = titleListState.filter(title => title.titleID === props.titleID);
  //         // console.log(componentName, "useEffect titleObject", titleObject);
  //         // console.log(componentName, "useEffect typeof titleObject", typeof titleObject);

  //         setTitleItemIndex(titleListState.findIndex(title => title.titleID === titleObject.titleID));
  //         // console.log(componentName, "useEffect titleItemIndex", titleItemIndex);

  //         if (titleObject !== undefined) {

  //             setTitleItem(titleObject);

  //         };

  //     };

  // }, [props.titleID, titleListState]);

  const addUserReview = () => {
    // console.log(componentName, "addUserReview");
    // console.log(componentName, "addUserReview baseURL", baseURL);
    // console.log(componentName, "addUserReview props.titleID", props.titleID);

    clearMessages();
    setUserReviewRecordAdded(null);

    setUserReviewItem(null);
    setReviewID(null);
    setUserID(null);
    setUpdatedBy(null);
    setTitleID(null);
    setRead(null);
    setDateRead(null);
    setRating(null);
    setRanking(null);
    setShortReview(null);
    setLongReview(null);
    setActive(null);

    // ? Check to make sure that txtDateRead) is a date?
    // ? Check to make sure that props.titleID is a number?
    // * txtDateRead is expecting a date and rdoRating is expecting a number
    // if (txtDateRead !== null && rdoRating !== null) {

    // console.log(componentName, "addUserReview typeof props.titleID", typeof props.titleID);

    // console.log(componentName, "addUserReview parseInt(props.titleID)", parseInt(props.titleID));

    let userReviewObject = {
      titleID: parseInt(props.titleID),
      read: cbxRead,
      // dateRead: txtDateRead.trim(),
      rating: rdoRating
      // shortReview: txtShortReview.trim(),
      // longReview: txtLongReview.trim()
    };

    // * If the user doesn't enter a date read, then it isn't added/updated
    if (txtDateRead !== null && txtDateRead !== undefined) {
      if (txtDateRead.trim().length !== 0) {
        Object.assign(userReviewObject, { dateRead: txtDateRead.trim() });
      };
    };

    // * If the user doesn't enter a ranking, then it isn't added/updated
    if (txtRanking !== null && txtRanking !== undefined) {
      if (txtRanking.trim().length !== 0) {
        Object.assign(userReviewObject, { ranking: txtRanking.trim() });
      };
    };

    // * If the user doesn't enter a short review, then it isn't added/updated
    if (txtShortReview !== null && txtShortReview !== undefined) {
      if (txtShortReview.trim().length !== 0) {
        Object.assign(userReviewObject, { shortReview: txtShortReview.trim() });
      };
    };

    // * If the user doesn't enter a long review, then it isn't added/updated
    if (txtLongReview !== null && txtLongReview !== undefined) {
      if (txtLongReview.trim().length !== 0) {
        Object.assign(userReviewObject, { longReview: txtLongReview.trim() });
      };
    };

    // console.log(componentName, "addUserReview userReviewObject", userReviewObject);

    let url = baseURL + "userreviews/";
    // console.log(componentName, "addUserReview url", url);

    if (sessionToken !== undefined && sessionToken !== null) {

      fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        }),
        body: JSON.stringify({ userReview: userReviewObject })
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
          console.log(componentName, "addUserReview data", data);

          setUserReviewRecordAdded(data.recordAdded);
          addMessage(data.message);

          if (data.recordAdded === true) {

            setUserReviewItem(data);
            setReviewID(data.reviewID);
            setUserID(data.userID);
            setUpdatedBy(data.updatedBy);
            setTitleID(data.titleID);
            setRead(data.read);
            setDateRead(data.dateRead);
            setRating(data.rating);
            setRanking(data.ranking);
            setShortReview(data.shortReview);
            setLongReview(data.longReview);
            setActive(data.active);

            let titleItem = titleListState.filter(title => title.titleID === data.titleID);
            // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createdAt: titleItem.createdAt, updatedAt: titleItem.updatedAt}
            titleItem = titleItem[0];

            // console.log(componentName, "addUserReview titleItem", titleItem);
            // console.log(componentName, "addUserReview typeof data.titleID", typeof data.titleID);

            let titleItemIndex = titleListState.findIndex(title => title.titleID === data.titleID);

            // user: {userID: userID, firstName: firstName, lastName: lastName, email: email, updatedBy: updatedBy,  admin: admin, active: userActive}

            // ? Would still work if the createdAt and updatedAt were left out?
            dispatch(addStateUserReview([{ reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, rating: data.rating, ranking: data.ranking, shortReview: data.shortReview, longReview: data.longReview, active: data.active, createdAt: data.createdAt, updatedAt: data.updatedAt, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createdAt: titleItem.createdAt, updatedAt: titleItem.updatedAt }, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active } }]));
            // ? Add to local storage also?

            // * Recalculate ratings
            let userReviews = userReviewListState.filter(userReview => userReview.titleID === data.titleID);

            // console.log(componentName, "addUserReview userReviews", userReviews);
            // * Get all reviews for the title
            // ? Get the latest from state?
            // ? Update the state user review array?
            userReviews.push({ reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, rating: data.rating, ranking: data.ranking, shortReview: data.shortReview, longReview: data.longReview, active: data.active, createdAt: data.createdAt, updatedAt: data.updatedAt, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createdAt: titleItem.createdAt, updatedAt: titleItem.updatedAt }, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active } });
            // console.log(componentName, "addUserReview userReviews", userReviews);
            // * Recompute the average
            let userReviewCount = userReviews.length;
            let userReviewSum = 0;
            for (let i = 0; i < userReviews.length; i++) {
              userReviewSum += userReviews[i].rating;
            };
            // console.log(componentName, "addUserReview userReviewSum", userReviewSum);
            let userReviewAverage = 0;
            if (userReviewCount > 0) {
              // ? Check for division by zero?
              // let userReviewAverage: number = userReviewSum/0;
              userReviewAverage = userReviewSum / userReviewCount;
            };
            // console.log(componentName, "addUserReview userReviewAverage", userReviewAverage);
            // * Update the title ratings
            dispatch(updateStateTitleRating({ titleItemIndex: titleItemIndex, userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage }));

            const checklistListIndex = checklistListState.findIndex(userReview => userReview.titleID === data.titleID);

            if (data.active === true) {
              dispatch(updateStateChecklist({ checklistListIndex: checklistListIndex, reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, userReviewActive: data.active, userReviewUpdatedAt: new Date().toISOString() }));
            };

          } else {
            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);
          };

        })
        .catch(error => {
          console.log(componentName, "addUserReview error", error);
          // console.log(componentName, "addUserReview error.name", error.name);
          // console.log(componentName, "addUserReview error.message", error.message);
          addErrorMessage(error.name + ": " + error.message);
        });

    };

    // };

  };

  useEffect(() => {
    // console.log(componentName, "useEffect userReviewRecordAdded", userReviewRecordAdded);
    if (userReviewRecordAdded !== undefined && userReviewRecordAdded !== null && userReviewRecordAdded === true) {
      clearMessages();
      setUserReviewRecordAdded(null);
      // setModal(false);
      toggle();
    };

  }, [userReviewRecordAdded]);

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

  return (
    <React.Fragment>

      {appAllowUserInteractions === true && sessionToken !== undefined && sessionToken !== null && sessionToken !== "" && (userReviewItem === undefined || userReviewItem === null) && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Review</Button></span> : null}

      {appAllowUserInteractions === true && sessionToken !== undefined && sessionToken !== null && sessionToken !== "" && (userReviewItem === undefined || userReviewItem === null) && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Add Review</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="text-center">
              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
            </FormGroup>
            <FormGroup row>

              <Col>
                <FormGroup className="ml-4">

                  <Input type="checkbox" id="cbxRead" checked={cbxRead} onChange={(event) => {/*console.log(event.target.value);*/ setCbxRead(!cbxRead); }} />
                  <Label for="cbxRead">Read</Label>

                </FormGroup>

                <FormGroup>
                  <Label for="rdoRating" className="mr-4">Rating</Label>
                  <Rating name="rdoRating" defaultValue={0} max={10} value={rdoRating} onChange={(event, newValue) => {/*console.log(event.target.value);*/ setRdoRating(newValue); }} />
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

              <Col>
                <FormGroup>
                  <Label for="txtDateRead">Date Read</Label>
                  <Input type="date" id="txtDateRead" value={txtDateRead} onChange={(event) => {/*console.log(event.target.value);*/ setTxtDateRead(event.target.value); }} />
                </FormGroup>
              </Col>

            </FormGroup>
            <FormGroup>

              <Label for="txtRanking">Ranking</Label>
              <Input type="text" id="txtRanking" value={txtRanking} onChange={(event) => {/*console.log(event.target.value);*/ setTxtRanking(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtShortReview">Short Review</Label>
              <Input type="text" id="txtShortReview" value={txtShortReview} onChange={(event) => {/*console.log(event.target.value);*/ setTxtShortReview(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtLongReview">Long Review</Label>
              <Input type="textarea" id="txtLongReview" rows={10} value={txtLongReview} onChange={(event) => {/*console.log(event.target.value);*/ setTxtLongReview(event.target.value); }} />

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
