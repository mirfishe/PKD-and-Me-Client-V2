import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { PencilSquare } from 'react-bootstrap-icons';
import { Rating } from "@material-ui/lab/";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";
import { updateStateUserReview, deleteStateUserReview } from "../../bibliographyData/userReviewsSlice";
import { updateStateTitleRating } from "../../bibliographyData/titlesSlice";
import { updateStateChecklist } from "../../app/userSlice";

const EditUserReview = (props) => {

  const componentName = "EditUserReview.js";

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

  // ? Not needed?
  const userState = { userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active) };
  // console.log(componentName, GetDateTime(), "userState", userState);

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
  const [userReviewRecordUpdated, setUserReviewRecordUpdated] = useState(null);
  const [userReviewRecordDeleted, setUserReviewRecordDeleted] = useState(null);

  const [cbxRead, setCbxRead] = useState(false);
  const [txtDateRead, setTxtDateRead] = useState("");
  const [rdoRating, setRdoRating] = useState(null);
  const [txtRanking, setTxtRanking] = useState("");
  const [txtShortReview, setTxtShortReview] = useState("");
  const [txtLongReview, setTxtLongReview] = useState("");

  const [userReviewItemIndex, setUserReviewItemIndex] = useState(null);
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

  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect userReviewListState", userReviewListState);

    if (props.reviewID !== undefined && props.reviewID !== null) {

      let userReviewObject = userReviewListState.find(userReview => userReview.reviewID === props.reviewID);
      // console.log(componentName, GetDateTime(), "useEffect userReviewObject", userReviewObject);
      // console.log(componentName, GetDateTime(), "useEffect typeof userReviewObject", typeof userReviewObject);

      setUserReviewItemIndex(userReviewListState.findIndex(userReview => userReview.reviewID === userReviewObject.reviewID));
      // console.log(componentName, GetDateTime(), "useEffect userReviewItemIndex", userReviewItemIndex);

      if (userReviewObject !== undefined) {

        setUserReviewItem(userReviewObject);

        setReviewID(userReviewObject.reviewID);
        setUserID(userReviewObject.userID);
        setUpdatedBy(userReviewObject.updatedBy);
        setTitleID(userReviewObject.titleID);
        setRead(userReviewObject.read);
        setDateRead(userReviewObject.dateRead);
        setRating(userReviewObject.rating);
        setRanking(userReviewObject.ranking);
        setShortReview(userReviewObject.shortReview);
        setLongReview(userReviewObject.longReview);
        setActive(userReviewObject.active);

        setCbxRead(userReviewObject.read);

        if (userReviewObject.dateRead !== undefined && userReviewObject.dateRead !== null) {
          setTxtDateRead(userReviewObject.dateRead.toString().substring(0, 10));
        } else {
          setTxtDateRead("");
        };

        setRdoRating(userReviewObject.rating);
        setTxtRanking(userReviewObject.ranking);
        setTxtShortReview(userReviewObject.shortReview);
        setTxtLongReview(userReviewObject.longReview);

      };

    };

  }, [props.reviewID, userReviewListState]);

  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect userReviewListState", userReviewListState);

    if (props.reviewID !== undefined && props.reviewID !== null) {

      let userReviewObject = userReviewListState.find(userReview => userReview.reviewID === props.reviewID);
      // console.log(componentName, GetDateTime(), "useEffect userReviewObject", userReviewObject);
      // console.log(componentName, GetDateTime(), "useEffect typeof userReviewObject", typeof userReviewObject);

      setUserReviewItemIndex(userReviewListState.findIndex(userReview => userReview.reviewID === userReviewObject.reviewID));
      // console.log(componentName, GetDateTime(), "useEffect userReviewItemIndex", userReviewItemIndex);

      if (userReviewObject !== undefined) {

        setUserReviewItem(userReviewObject);

        setReviewID(userReviewObject.reviewID);
        setUserID(userReviewObject.userID);
        setUpdatedBy(userReviewObject.updatedBy);
        setTitleID(userReviewObject.titleID);
        setRead(userReviewObject.read);
        setDateRead(userReviewObject.dateRead);
        setRating(userReviewObject.rating);
        setRanking(userReviewObject.ranking);
        setShortReview(userReviewObject.shortReview);
        setLongReview(userReviewObject.longReview);
        setActive(userReviewObject.active);

        setCbxRead(userReviewObject.read);

        if (userReviewObject.dateRead !== undefined && userReviewObject.dateRead !== null) {
          setTxtDateRead(userReviewObject.dateRead.toString().substring(0, 10));
        } else {
          setTxtDateRead("");
        };

        setRdoRating(userReviewObject.rating);
        setTxtRanking(userReviewObject.ranking);
        setTxtShortReview(userReviewObject.shortReview);
        setTxtLongReview(userReviewObject.longReview);

      };

    };

  }, [props.reviewID, userReviewListState]);

  // useEffect(() => {
  //     // console.log(componentName, GetDateTime(), "useEffect titleListState", titleListState);
  //     // console.log(componentName, GetDateTime(), "useEffect titleID", titleID);

  //     if (titleID !== undefined && titleID !== null) {

  //         let titleObject = titleListState.filter(title => title.titleID === titleID);
  //         // console.log(componentName, GetDateTime(), "useEffect titleObject", titleObject);
  //         // console.log(componentName, GetDateTime(), "useEffect typeof titleObject", typeof titleObject);

  //         setTitleItemIndex(titleListState.findIndex(title => title.titleID === titleObject.titleID));
  //         // console.log(componentName, GetDateTime(), "useEffect titleItemIndex", titleItemIndex);

  //         if (titleObject !== undefined) {

  //             setTitleItem(titleObject);

  //         };

  //     };

  // }, [titleID, titleListState]);

  const updateUserReview = (deleteUserReview) => {
    // console.log(componentName, GetDateTime(), "updateUserReview");
    // console.log(componentName, GetDateTime(), "updateUserReview baseURL", baseURL);

    clearMessages();
    setUserReviewRecordUpdated(null);

    setUserReviewItem(null);
    setReviewID(null);
    setUserID(null);
    setUpdatedBy(null);
    // setTitleID(null);
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

    // console.log(componentName, GetDateTime(), "addUserReview typeof titleID", typeof titleID);

    // console.log(componentName, GetDateTime(), "addUserReview parseInt(titleID)", parseInt(titleID));

    let userReviewObject = {
      titleID: parseInt(titleID),
      read: cbxRead,
      // dateRead: txtDateRead.trim(),
      rating: rdoRating,
      // shortReview: txtShortReview.trim(),
      // longReview: txtLongReview.trim(),
      active: !deleteUserReview
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

    // console.log(componentName, GetDateTime(), "updateUserReview userReviewObject", userReviewObject);

    let url = baseURL + "userreviews/";

    if (props.reviewID !== undefined && props.reviewID !== null && sessionToken !== undefined && sessionToken !== null) {

      // ? Does it matter if the user is updating their own review as an admin or not?
      if (admin !== undefined && admin !== null && admin === true) {
        url = url + "admin/";
      };

      url = url + props.reviewID;
      // console.log(componentName, GetDateTime(), "updateUserReview url", url);

      fetch(url, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        }),
        body: JSON.stringify({ userReview: userReviewObject })
      })
        .then(response => {
          // console.log(componentName, GetDateTime(), "updateUserReview response", response);
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
          console.log(componentName, GetDateTime(), "updateUserReview data", data);

          setUserReviewRecordUpdated(data.recordUpdated);
          addMessage(data.message);

          if (data.recordUpdated === true) {

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
            // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}
            titleItem = titleItem[0];

            // console.log(componentName, GetDateTime(), "updateUserReview titleItem", titleItem);
            // console.log(componentName, GetDateTime(), "updateUserReview typeof data.titleID", typeof data.titleID);

            let titleItemIndex = titleListState.findIndex(title => title.titleID === data.titleID);

            // user: {userID: userID, firstName: firstName, lastName: lastName, email: email, updatedBy: updatedBy,  admin: admin, active: userActive}

            // ? Would still work if the createDate and updateDate were left out?
            dispatch(updateStateUserReview({ userReviewItemIndex: userReviewItemIndex, reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, rating: data.rating, ranking: data.ranking, shortReview: data.shortReview, longReview: data.longReview, active: data.active, updateDate: new Date().toISOString(), title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active } }));
            // ? Add to local storage also?

            // * Recalculate ratings
            let userReviewsList = userReviewListState.filter(userReview => userReview.titleID === data.titleID && userReview.active === true);
            let userReviews = [];
            for (let i = 0; i < userReviewsList.length; i++) {
              userReviews.push({ reviewID: userReviewsList[i].reviewID, userID: userReviewsList[i].userID, updatedBy: userReviewsList[i].updatedBy, rating: userReviewsList[i].rating });
            };

            const userReviewsIndex = userReviews.findIndex(userReview => userReview.reviewID === userReview.reviewID);
            // console.log(componentName, GetDateTime(), "updateUserReview userReviewsIndex", userReviewsIndex);

            // console.log(componentName, GetDateTime(), "updateUserReview userReviews", userReviews);
            // * Get all reviews for the title
            // ? Get the latest from state?
            // ? Update the state user review array?
            // * TypeError: Cannot assign to read only property 'rating' of object '#<Object>'
            // console.log(componentName, GetDateTime(), "updateUserReview userReviews[userReviewsIndex].rating", userReviews[userReviewsIndex].rating);
            // userReviews[userReviewsIndex].rating = data.rating;
            userReviews.splice(userReviewsIndex, 1);
            // userReviews.push({reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, rating: data.rating, shortReview: data.shortReview, longReview: data.longReview, active: data.active, createDate: data.createDate, updateDate: data.updateDate, title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}, user: {userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active}});

            // console.log(componentName, GetDateTime(), "updateUserReview data.active", data.active);

            if (data.active === true) {
              // console.log(componentName, GetDateTime(), "updateUserReview data.reviewID", data.reviewID);
              // console.log(componentName, GetDateTime(), "updateUserReview data.userID", data.userID);
              // console.log(componentName, GetDateTime(), "updateUserReview data.updatedBy", data.updatedBy);
              // console.log(componentName, GetDateTime(), "updateUserReview data.rating", data.rating);

              // ! This line of code is not working for some reason
              userReviews.push({ reviewID: parseInt(data.reviewID), userID: data.userID, updatedBy: data.updatedBy, rating: data.rating, ranking: data.ranking });

              // console.log(componentName, GetDateTime(), "updateUserReview userReviews", userReviews);
            };

            // console.log(componentName, GetDateTime(), "updateUserReview userReviews", userReviews);
            // * Recompute the average
            let userReviewCount = userReviews.length;
            // console.log(componentName, GetDateTime(), "updateUserReview userReviewCount", userReviewCount);
            let userReviewSum = 0;
            for (let i = 0; i < userReviews.length; i++) {
              userReviewSum += userReviews[i].rating;
            };
            // console.log(componentName, GetDateTime(), "updateUserReview userReviewSum", userReviewSum);
            let userReviewAverage = 0;
            if (userReviewCount > 0) {
              // ? Check for division by zero?
              // let userReviewAverage: number = userReviewSum/0;
              userReviewAverage = userReviewSum / userReviewCount;
            };
            // console.log(componentName, GetDateTime(), "updateUserReview userReviewAverage", userReviewAverage);
            // * Update the title ratings
            // console.log(componentName, GetDateTime(), "updateUserReview titleItemIndex", titleItemIndex);
            dispatch(updateStateTitleRating({ titleItemIndex: titleItemIndex, userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage }));

            const checklistListIndex = checklistListState.findIndex(userReview => userReview.titleID === data.titleID);

            if (data.active === true) {
              dispatch(updateStateChecklist({ checklistListIndex: checklistListIndex, reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, userReviewActive: data.active, userReviewUpdateDate: new Date().toISOString() }));
            } else {
              dispatch(updateStateChecklist({ checklistListIndex: checklistListIndex, reviewID: null, userID: null, updatedBy: null, titleID: data.titleID, read: null, dateRead: null, userReviewActive: null, userReviewCreatedDate: null, userReviewUpdateDate: null }));
            };

          } else {
            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);
          };

        })
        .catch(error => {
          console.log(componentName, GetDateTime(), "updateUserReview error", error);
          // console.log(componentName, GetDateTime(), "updateUserReview error.name", error.name);
          // console.log(componentName, GetDateTime(), "updateUserReview error.message", error.message);
          addErrorMessage(error.name + ": " + error.message);
        });

    };

    // };

  };

  const deleteUserReview = () => {
    // console.log(componentName, GetDateTime(), "deleteUserReview");
    // console.log(componentName, GetDateTime(), "deleteUserReview baseURL", baseURL);

    clearMessages();
    setUserReviewRecordDeleted(null);

    let url = baseURL + "userreviews/";

    if (props.reviewID !== undefined && props.reviewID !== null) {

      url = url + props.reviewID;

      // console.log(componentName, GetDateTime(), "deleteUserReview url", url);

      if (sessionToken !== undefined && sessionToken !== null) {

        fetch(url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          })
        })
          .then(response => {
            // console.log(componentName, GetDateTime(), "deleteUserReview response", response);
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
            console.log(componentName, GetDateTime(), "deleteUserReview data", data);

            setUserReviewRecordDeleted(data.recordDeleted);

            addMessage(data.message); // Never seen by the user if the delete was successful

            if (data.recordDeleted === true) {

              dispatch(deleteStateUserReview(userReviewItemIndex));
              // ? Update local storage also?

              let titleItem = titleListState.filter(title => title.titleID === data.titleID);
              // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDweb: titleItem.urlPKDweb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}
              titleItem = titleItem[0];
              // console.log(componentName, GetDateTime(), "deleteUserReview titleItem", titleItem);

              let titleItemIndex = titleListState.findIndex(title => title.titleID === data.titleID);

              // * Recalculate ratings
              let userReviews = userReviewListState.filter(userReview => userReview.titleID === data.titleID && userReview.active === true);

              const userReviewsIndex = userReviews.findIndex(userReview => userReview.reviewID === userReview.reviewID);

              // console.log(componentName, GetDateTime(), "deleteUserReview userReviews", userReviews);
              // * Get all reviews for the title
              // ? Get the latest from state?
              // ? Update the state user review array?
              // * TypeError: Cannot assign to read only property 'rating' of object '#<Object>'
              // console.log(componentName, GetDateTime(), "deleteUserReview userReviews[userReviewsIndex].rating", userReviews[userReviewsIndex].rating);
              // userReviews[userReviewsIndex].rating = data.rating;
              userReviews.splice(userReviewsIndex, 1);
              // console.log(componentName, GetDateTime(), "deleteUserReview userReviews", userReviews);
              // * Recompute the average
              let userReviewCount = userReviews.length;
              let userReviewSum = 0;
              for (let i = 0; i < userReviews.length; i++) {
                userReviewSum += userReviews[i].rating;
              };
              // console.log(componentName, GetDateTime(), "deleteUserReview userReviewSum", userReviewSum);
              let userReviewAverage = 0;
              if (userReviewCount > 0) {
                // ? Check for division by zero?
                // let userReviewAverage: number = userReviewSum/0;
                userReviewAverage = userReviewSum / userReviewCount;
              };
              // console.log(componentName, GetDateTime(), "deleteUserReview userReviewAverage", userReviewAverage);
              // * Update the title ratings
              dispatch(updateStateTitleRating({ titleItemIndex: titleItemIndex, userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage }));

            } else {
              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);
            };

          })
          .catch(error => {
            console.log(componentName, GetDateTime(), "deleteUserReview error", error);
            // console.log(componentName, GetDateTime(), "deleteUserReview error.name", error.name);
            // console.log(componentName, GetDateTime(), "deleteUserReview error.message", error.message);
            addErrorMessage(error.name + ": " + error.message);
          });

      };

    };

  };

  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect userReviewRecordUpdated", userReviewRecordUpdated);
    // console.log(componentName, GetDateTime(), "useEffect userReviewRecordDeleted", userReviewRecordDeleted);
    if (userReviewRecordUpdated !== undefined && userReviewRecordUpdated !== null && userReviewRecordUpdated === true) {
      clearMessages();
      setUserReviewRecordUpdated(null);
      // setModal(false);
      toggle();
    };

    if (userReviewRecordDeleted !== undefined && userReviewRecordDeleted !== null && userReviewRecordDeleted === true) {
      clearMessages();
      setUserReviewRecordDeleted(null);
      // setModal(false);
      toggle();
    };

  }, [userReviewRecordUpdated, userReviewRecordDeleted]);

  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect check for sessionToken", sessionToken);

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

      {appAllowUserInteractions === true && sessionToken !== undefined && sessionToken !== null && sessionToken !== "" && ((userID !== undefined && userID !== null && userID === userReviewItem.userID) || (admin !== undefined && admin !== null && admin === true)) && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Update Review</Button></span> : null}

      {appAllowUserInteractions === true && sessionToken !== undefined && sessionToken !== null && sessionToken !== "" && ((userID !== undefined && userID !== null && userID === userReviewItem.userID) || (admin !== undefined && admin !== null && admin === true)) && props.displayIcon === true ? <PencilSquare className="addEditIcon" onClick={toggle} /> : null}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Update Review</ModalHeader>
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

              <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(event.target.value);*/ updateUserReview(false); }}>Update Review</Button>
              <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(event.target.value);*/ updateUserReview(true); }}>Delete Review</Button>
              {admin !== undefined && admin !== null && admin === true ? <Button outline size="lg" color="warning" onClick={(event) => {/*console.log(event.target.value);*/ deleteUserReview(); }}>Hard Delete Review</Button> : null}
              <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

};

export default EditUserReview;
