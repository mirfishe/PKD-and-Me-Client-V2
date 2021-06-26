import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { Plus } from 'react-bootstrap-icons';
import { Rating } from "@material-ui/lab/";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";
import { addStateUserReview } from "../../bibliographyData/userReviewsSlice";
import { updateStateTitleRating } from "../../bibliographyData/titlesSlice";
import { updateStateChecklist } from "../../app/userSlice";

const AddUserReview = (props) => {

  const componentName = "AddUserReview.js";

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

  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, GetDateTime(), "titleListState", titleListState);

  const checklistListState = useSelector(state => state.user.arrayChecklist);
  // console.log(componentName, GetDateTime(), "checklistListState", checklistListState);

  const userReviewListState = useSelector(state => state.userReviews.arrayUserReviews);
  // console.log(componentName, GetDateTime(), "userReviewListState", userReviewListState);

  const userState = { userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active) };
  // console.log(componentName, GetDateTime(), "userState", userState);

  // console.log(componentName, GetDateTime(), "props.titleID", props.titleID);

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
  const [cbxOwned, setCbxOwned] = useState(false);
  const [txtDatePurchased, setTxtDatePurchased] = useState("");

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
  const [owned, setOwned] = useState(null);
  const [datePurchased, setDatePurchased] = useState(null);
  const [active, setActive] = useState(null);

  // const [titleItemIndex, setTitleItemIndex] = useState(null);
  // const [titleItem, setTitleItem] = useState(null);

  // useEffect(() => {
  //     // console.log(componentName, GetDateTime(), "useEffect userReviewListState", userReviewListState);

  //     if (IsEmpty(props.titleID) === false) {

  //         let titleObject = titleListState.filter(title => title.titleID === props.titleID);
  //         // console.log(componentName, GetDateTime(), "useEffect titleObject", titleObject);
  //         // console.log(componentName, GetDateTime(), "useEffect typeof titleObject", typeof titleObject);

  //         setTitleItemIndex(titleListState.findIndex(title => title.titleID === titleObject.titleID));
  //         // console.log(componentName, GetDateTime(), "useEffect titleItemIndex", titleItemIndex);

  //         if (IsEmpty(titleObject) === false) {

  //             setTitleItem(titleObject);

  //         };

  //     };

  // }, [props.titleID, titleListState]);


  const addUserReview = () => {
    // console.log(componentName, GetDateTime(), "addUserReview");
    // console.log(componentName, GetDateTime(), "addUserReview baseURL", baseURL);
    // console.log(componentName, GetDateTime(), "addUserReview props.titleID", props.titleID);

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
    setOwned(null);
    setDatePurchased(null);
    setActive(null);

    // ? Check to make sure that txtDateRead) is a date?
    // ? Check to make sure that props.titleID is a number?
    // * txtDateRead is expecting a date and rdoRating is expecting a number
    // if (IsEmpty(txtDateRead) === false && IsEmpty(rdoRating) === false) {

    // console.log(componentName, GetDateTime(), "addUserReview typeof props.titleID", typeof props.titleID);

    // console.log(componentName, GetDateTime(), "addUserReview parseInt(props.titleID)", parseInt(props.titleID));

    let userReviewObject = {
      titleID: parseInt(props.titleID),
      read: cbxRead,
      // dateRead: txtDateRead.trim(),
      rating: rdoRating,
      // ranking: req.body.userReview.ranking,
      // shortReview: txtShortReview.trim(),
      // longReview: txtLongReview.trim(),
      owned: cbxOwned
      // datePurchased: txtDatePurchased.trim()
    };

    // * If the user doesn't enter a date read, then it isn't added/updated
    if (IsEmpty(txtDateRead) === false) {
      if (txtDateRead.trim().length !== 0) {
        Object.assign(userReviewObject, { dateRead: txtDateRead.trim() });
      };
    };

    // * If the user doesn't enter a ranking, then it isn't added/updated
    if (IsEmpty(txtRanking) === false) {
      if (txtRanking.trim().length !== 0) {
        Object.assign(userReviewObject, { ranking: txtRanking.trim() });
      };
    };

    // * If the user doesn't enter a short review, then it isn't added/updated
    if (IsEmpty(txtShortReview) === false) {
      if (txtShortReview.trim().length !== 0) {
        Object.assign(userReviewObject, { shortReview: txtShortReview.trim() });
      };
    };

    // * If the user doesn't enter a long review, then it isn't added/updated
    if (IsEmpty(txtLongReview) === false) {
      if (txtLongReview.trim().length !== 0) {
        Object.assign(userReviewObject, { longReview: txtLongReview.trim() });
      };
    };

    // * If the user doesn't enter a date purchased, then it isn't added/updated
    if (IsEmpty(txtDatePurchased) === false) {
      if (txtDatePurchased.trim().length !== 0) {
        Object.assign(userReviewObject, { datePurchased: txtDatePurchased.trim() });
      };
    };

    // console.log(componentName, GetDateTime(), "addUserReview userReviewObject", userReviewObject);

    let url = baseURL + "userreviews/";
    // console.log(componentName, GetDateTime(), "addUserReview url", url);

    if (IsEmpty(sessionToken) === false) {

      fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        }),
        body: JSON.stringify({ userReview: userReviewObject })
      })
        .then(response => {
          // console.log(componentName, GetDateTime(), "addUserReview response", response);
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
          console.log(componentName, GetDateTime(), "addUserReview data", data);

          setUserReviewRecordAdded(data.recordAdded);
          addMessage(data.message);

          if (data.recordAdded === true) {

            setUserReviewItem(data.records[0]);
            setReviewID(data.records[0].reviewID);
            setUserID(data.records[0].userID);
            setUpdatedBy(data.records[0].updatedBy);
            setTitleID(data.records[0].titleID);
            setRead(data.records[0].read);
            setDateRead(data.records[0].dateRead);
            setRating(data.records[0].rating);
            setRanking(data.records[0].ranking);
            setShortReview(data.records[0].shortReview);
            setLongReview(data.records[0].longReview);
            setOwned(data.records[0].owned);
            setDatePurchased(data.records[0].datePurchased);
            setActive(data.records[0].active);

            let titleItem = titleListState.filter(title => title.titleID === data.records[0].titleID);
            // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}
            titleItem = titleItem[0];

            // console.log(componentName, GetDateTime(), "addUserReview titleItem", titleItem);
            // console.log(componentName, GetDateTime(), "addUserReview typeof data.records[0].titleID", typeof data.records[0].titleID);

            let titleItemIndex = titleListState.findIndex(title => title.titleID === data.records[0].titleID);

            // user: {userID: userID, firstName: firstName, lastName: lastName, email: email, updatedBy: updatedBy,  admin: admin, active: userActive}

            // ? Would still work if the createDate and updateDate were left out?
            dispatch(addStateUserReview([{ reviewID: data.records[0].reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, rating: data.records[0].rating, ranking: data.records[0].ranking, shortReview: data.records[0].shortReview, longReview: data.records[0].longReview, owned: data.records[0].owned, datePurchased: data.records[0].datePurchased, active: data.records[0].active, userReviewActive: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate/*, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }*/, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, titleActive: titleItem.active, titleCreateDate: titleItem.createDate, titleUpdatedDate: titleItem.updateDate/*, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active }*/, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, userUpdatedBy: userState.updatedBy, admin: userState.admin, userActive: userState.active }]));
            // ? Add to local storage also?

            // * Recalculate ratings
            let userReviews = userReviewListState.filter(userReview => userReview.titleID === data.records[0].titleID);

            // console.log(componentName, GetDateTime(), "addUserReview userReviews", userReviews);

            // * Get all reviews for the title
            // ? Get the latest from state?
            // ? Update the state user review array?
            userReviews.push({ reviewID: data.records[0].reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, rating: data.records[0].rating, ranking: data.records[0].ranking, shortReview: data.records[0].shortReview, longReview: data.records[0].longReview, active: data.records[0].active, userReviewActive: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate/*, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }*/, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, titleActive: titleItem.active, titleCreateDate: titleItem.createDate, titleUpdatedDate: titleItem.updateDate/*, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active }*/, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, userUpdatedBy: userState.updatedBy, admin: userState.admin, userActive: userState.active });
            // console.log(componentName, GetDateTime(), "addUserReview userReviews", userReviews);
            // * Recompute the average
            let userReviewCount = userReviews.length;
            let userReviewSum = 0;
            for (let i = 0; i < userReviews.length; i++) {
              userReviewSum += userReviews[i].rating;
            };
            // console.log(componentName, GetDateTime(), "addUserReview userReviewSum", userReviewSum);
            let userReviewAverage = 0;
            if (userReviewCount > 0) {
              // ? Check for division by zero?
              // let userReviewAverage: number = userReviewSum/0;
              userReviewAverage = userReviewSum / userReviewCount;
            };
            // console.log(componentName, GetDateTime(), "addUserReview userReviewAverage", userReviewAverage);
            // * Update the title ratings
            dispatch(updateStateTitleRating({ titleItemIndex: titleItemIndex, userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage }));

            // const checklistListIndex = checklistListState.findIndex(userReview => userReview.titleID === data.records[0].titleID);

            // console.log(componentName, GetDateTime(), "addUserReview checklistListIndex", checklistListIndex);

            if (data.records[0].active === true || data.records[0].active === 1) {
              dispatch(updateStateChecklist({ /*checklistListIndex: checklistListIndex,*/ reviewID: data.records[0].reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, userReviewActive: data.records[0].active, userReviewUpdateDate: GetDateTime() }));
            };

          } else {
            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);
          };

        })
        .catch(error => {
          console.log(componentName, GetDateTime(), "addUserReview error", error);
          // console.log(componentName, GetDateTime(), "addUserReview error.name", error.name);
          // console.log(componentName, GetDateTime(), "addUserReview error.message", error.message);
          addErrorMessage(error.name + ": " + error.message);
        });

    };

    // };

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect userReviewRecordAdded", userReviewRecordAdded);
    if (IsEmpty(userReviewRecordAdded) === false && userReviewRecordAdded === true) {
      clearMessages();
      setUserReviewRecordAdded(null);
      // setModal(false);
      toggle();
    };

  }, [userReviewRecordAdded]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect check for sessionToken", sessionToken);

    if (IsEmpty(sessionToken) === true) {
      // return <Redirect to="/" />;
      setModal(false);
    };

  }, [sessionToken]);


  const toggle = () => {
    setModal(!modal);
  };


  return (
    <React.Fragment>

      {appAllowUserInteractions === true && IsEmpty(sessionToken) === false && (IsEmpty(userReviewItem) === true) && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Add Review</Button></span> : null}

      {appAllowUserInteractions === true && IsEmpty(sessionToken) === false && (IsEmpty(userReviewItem) === true) && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

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

                  <Input type="checkbox" id="cbxRead" checked={cbxRead} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setCbxRead(!cbxRead); }} />
                  <Label for="cbxRead">Read</Label>

                </FormGroup>

                <FormGroup>
                  <Label for="rdoRating" className="mr-4">Rating</Label>
                  <Rating name="rdoRating" defaultValue={0} max={10} value={rdoRating} onChange={(event, newValue) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setRdoRating(newValue); }} />
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
                  <Input type="date" id="txtDateRead" value={txtDateRead} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtDateRead(event.target.value); }} />
                </FormGroup>
              </Col>

            </FormGroup>
            <FormGroup>

              <Label for="txtRanking">Ranking</Label>
              <Input type="text" id="txtRanking" value={txtRanking} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtRanking(event.target.value); }} />

            </FormGroup>
            <FormGroup row>

              <Col>
                <FormGroup className="ml-4">

                  <Input type="checkbox" id="cbxOwned" checked={cbxOwned} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setCbxOwned(!cbxOwned); }} />
                  <Label for="cbxOwned">Owned</Label>

                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="txtDatePurchased">Date Purchased</Label>
                  <Input type="date" id="txtDatePurchased" value={txtDatePurchased} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtDatePurchased(event.target.value); }} />
                </FormGroup>
              </Col>

            </FormGroup>
            <FormGroup>

              <Label for="txtShortReview">Short Review</Label>
              <Input type="text" id="txtShortReview" value={txtShortReview} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtShortReview(event.target.value); }} />

            </FormGroup>
            <FormGroup>

              <Label for="txtLongReview">Long Review</Label>
              <Input type="textarea" id="txtLongReview" rows={10} value={txtLongReview} onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ setTxtLongReview(event.target.value); }} />

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
