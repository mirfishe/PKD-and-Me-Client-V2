import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Label, Input, Alert, Button } from "reactstrap";
// import { Rating } from "@mui/lab/";
import { isEmpty, getDateTime, isNonEmptyArray, getFirstItem, displayValue, formatTrim, formatToString, addErrorLog } from "shared-functions";
// import { addStateUserReview, updateStateUserReview, deleteStateUserReview } from "../../app/userReviewsSlice";
// import { updateStateTitleRating } from "../../app/titlesSlice";
// import { updateStateChecklist } from "../../app/userSlice";

const EditUserReview = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: reviewID, titleID -- 10/21/2022 MF

  const componentName = "EditUserReview";

  // const dispatch = useDispatch();

  const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);
  // const userID = useSelector(state => state.user.userID);

  // const titleListState = useSelector(state => state.titles.arrayTitles);

  // const checklistListState = useSelector(state => state.user.arrayChecklist);

  const userReviewListState = useSelector(state => state.userReviews.arrayUserReviews);

  let reviewID = isEmpty(props) === false && isEmpty(props.reviewID) === false ? props.reviewID : null;
  let titleID = isEmpty(props) === false && isEmpty(props.titleID) === false ? props.titleID : null;

  const userState = { userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active) };

  const [showForm, setShowForm] = useState(false);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [userReviewRecordAdded, setUserReviewRecordAdded] = useState(null);
  const [userReviewRecordUpdated, setUserReviewRecordUpdated] = useState(null);
  const [userReviewRecordDeleted, setUserReviewRecordDeleted] = useState(null);

  const [cbxRead, setCbxRead] = useState(false);
  const [txtDateRead, setTxtDateRead] = useState("");
  const [rdoRating, setRdoRating] = useState(null);
  const [txtRanking, setTxtRanking] = useState("");
  const [txtShortReview, setTxtShortReview] = useState("");
  const [txtLongReview, setTxtLongReview] = useState("");
  const [cbxOwned, setCbxOwned] = useState(false);
  const [txtDatePurchased, setTxtDatePurchased] = useState("");

  // const [userReviewItemIndex, setUserReviewItemIndex] = useState(null);
  const [userReviewItem, setUserReviewItem] = useState(null);
  // const [reviewID, setReviewID] = useState(null);
  const [userID, setUserID] = useState(null);
  // const [updatedBy, setUpdatedBy] = useState(null);
  // const [titleID, setTitleID] = useState(null);
  // const [read, setRead] = useState(null);
  // const [dateRead, setDateRead] = useState(null);
  const [rating, setRating] = useState(null);
  // const [ranking, setRanking] = useState(null);
  // const [shortReview, setShortReview] = useState(null);
  // const [longReview, setLongReview] = useState(null);
  // const [owned, setOwned] = useState(null);
  // const [datePurchased, setDatePurchased] = useState(null);
  const [active, setActive] = useState(null);

  // const [titleItemIndex, setTitleItemIndex] = useState(null);
  // const [titleItem, setTitleItem] = useState(null);


  useEffect(() => {

    if (isEmpty(reviewID) === false) {

      let userReviewObject = userReviewListState.find(userReview => userReview.reviewID === reviewID);

      // setUserReviewItemIndex(userReviewListState.findIndex(userReview => userReview.reviewID === userReviewObject.reviewID));

      if (isEmpty(userReviewObject) === false) {

        setUserReviewItem(userReviewObject);

        // setReviewID(userReviewObject.reviewID);
        setUserID(userReviewObject.userID);
        // setUpdatedBy(userReviewObject.updatedBy);
        // setTitleID(userReviewObject.titleID);
        // setRead(userReviewObject.read);
        // setDateRead(userReviewObject.dateRead);
        setRating(userReviewObject.rating);
        // setRanking(userReviewObject.ranking);
        // setShortReview(userReviewObject.shortReview);
        // setLongReview(userReviewObject.longReview);
        // setOwned(userReviewObject.owned);
        // setDatePurchased(userReviewObject.datePurchased);
        setActive(userReviewObject.active);

        setCbxRead(userReviewObject.read);

        if (isEmpty(userReviewObject.dateRead) === false) {

          setTxtDateRead(formatToString(userReviewObject.dateRead).substring(0, 10));

        } else {

          setTxtDateRead("");

        };

        setRdoRating(userReviewObject.rating);
        setTxtRanking(userReviewObject.ranking);
        setTxtShortReview(userReviewObject.shortReview);
        setTxtLongReview(userReviewObject.longReview);

        setCbxOwned(userReviewObject.owned);

        if (isEmpty(userReviewObject.datePurchased) === false) {

          setTxtDatePurchased(formatToString(userReviewObject.datePurchased).substring(0, 10));

        } else {

          setTxtDatePurchased("");

        };

      };

    };

  }, [reviewID, userReviewListState]);


  // useEffect(() => {

  //     if (isEmpty(titleID) === false) {

  //         let titleObject = titleListState.filter(title => title.titleID === titleID);

  //         setTitleItemIndex(titleListState.findIndex(title => title.titleID === titleObject.titleID));

  //         if (isEmpty(titleObject) === false) {

  //             setTitleItem(titleObject);

  //         };

  //     };

  // }, [titleID, titleListState]);


  // useEffect(() => {

  //     if (isEmpty(titleID) === false) {

  //         let titleObject = titleListState.filter(title => title.titleID === titleID);

  //         setTitleItemIndex(titleListState.findIndex(title => title.titleID === titleObject.titleID));

  //         if (isEmpty(titleObject) === false) {

  //             setTitleItem(titleObject);

  //         };

  //     };

  // }, [titleID, titleListState]);


  useEffect(() => {

    if (isEmpty(userReviewRecordAdded) === false && userReviewRecordAdded === true) {

      clearMessages();
      setUserReviewRecordAdded(null);

      setCbxRead("");
      setTxtDateRead("");
      setRdoRating("");
      setTxtRanking("");
      setTxtShortReview("");
      setTxtLongReview("");
      setCbxOwned("");
      setTxtDatePurchased("");

      // setModal(!modal);

    };

  }, [userReviewRecordAdded]);


  useEffect(() => {

    if (isEmpty(userReviewRecordUpdated) === false && userReviewRecordUpdated === true) {

      clearMessages();
      setUserReviewRecordUpdated(null);

      setCbxRead("");
      setTxtDateRead("");
      setRdoRating("");
      setTxtRanking("");
      setTxtShortReview("");
      setTxtLongReview("");
      setCbxOwned("");
      setTxtDatePurchased("");

      // setModal(!modal);

    };

    if (isEmpty(userReviewRecordDeleted) === false && userReviewRecordDeleted === true) {

      clearMessages();
      setUserReviewRecordDeleted(null);

      setCbxRead("");
      setTxtDateRead("");
      setRdoRating("");
      setTxtRanking("");
      setTxtShortReview("");
      setTxtLongReview("");
      setCbxOwned("");
      setTxtDatePurchased("");

      // setModal(!modal);

    };

  }, [userReviewRecordUpdated, userReviewRecordDeleted]);


  // useEffect(() => {

  //   if (isEmpty(sessionToken) === true) {

  //     // return <Redirect to="/" />;
  //     setModal(false);

  //   };

  // }, [sessionToken]);


  const addUserReview = () => {

    clearMessages();
    setUserReviewRecordAdded(null);

    setUserReviewItem(null);
    // setReviewID(null);
    setUserID(null);
    // setUpdatedBy(null);
    // setTitleID(null);
    // setRead(null);
    // setDateRead(null);
    setRating(null);
    // setRanking(null);
    // setShortReview(null);
    // setLongReview(null);
    // setOwned(null);
    // setDatePurchased(null);
    setActive(null);

    // ? Check to make sure that txtDateRead) is a date?
    // ? Check to make sure that titleID is a number?
    // * txtDateRead is expecting a date and rdoRating is expecting a number
    // if (isEmpty(txtDateRead) === false && isEmpty(rdoRating) === false) {

    let recordObject = {
      titleID: parseInt(titleID),
      read: cbxRead,
      // dateRead: formatTrim(txtDateRead),
      rating: rdoRating,
      // ranking: request.body.userReview.ranking,
      // shortReview: formatTrim(txtShortReview),
      // longReview: formatTrim(txtLongReview),
      owned: cbxOwned
      // datePurchased: formatTrim(txtDatePurchased)
    };

    // * If the user doesn't enter a date read, then it isn't added/updated
    if (isEmpty(txtDateRead) === false) {

      if (formatTrim(txtDateRead).length !== 0) {

        Object.assign(recordObject, { dateRead: formatTrim(txtDateRead) });

      };

    };

    // * If the user doesn't enter a ranking, then it isn't added/updated
    if (isEmpty(txtRanking) === false) {

      if (formatTrim(txtRanking).length !== 0) {

        Object.assign(recordObject, { ranking: formatTrim(txtRanking) });

      };

    };

    // * If the user doesn't enter a short review, then it isn't added/updated
    if (isEmpty(txtShortReview) === false) {

      if (formatTrim(txtShortReview).length !== 0) {

        Object.assign(recordObject, { shortReview: formatTrim(txtShortReview) });

      };

    };

    // * If the user doesn't enter a long review, then it isn't added/updated
    if (isEmpty(txtLongReview) === false) {

      if (formatTrim(txtLongReview).length !== 0) {

        Object.assign(recordObject, { longReview: formatTrim(txtLongReview) });

      };

    };

    // * If the user doesn't enter a date purchased, then it isn't added/updated
    if (isEmpty(txtDatePurchased) === false) {

      if (formatTrim(txtDatePurchased).length !== 0) {

        Object.assign(recordObject, { datePurchased: formatTrim(txtDatePurchased) });

      };

    };

    let url = baseURL + "userreviews/";

    if (isEmpty(sessionToken) === false) {

      fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        }),
        body: JSON.stringify({ userReview: recordObject })
      })
        .then(results => {

          // if (results.ok !== true) {

          //     throw Error(results.status + " " + results.statusText + " " + results.url);

          // } else {

          // if (results.status === 200) {

          return results.json();

          // } else {

          //     return results.status;

          // };

          // };

        })
        .then(data => {

          setUserReviewRecordAdded(data.transactionSuccess);
          addMessage(data.message);

          if (data.transactionSuccess === true) {

            let dataRecord = getFirstItem(data.records);

            setUserReviewItem(dataRecord);
            // setReviewID(dataRecord.reviewID);
            setUserID(dataRecord.userID);
            // setUpdatedBy(dataRecord.updatedBy);
            // setTitleID(dataRecord.titleID);
            // setRead(dataRecord.read);
            // setDateRead(dataRecord.dateRead);
            setRating(dataRecord.rating);
            // setRanking(dataRecord.ranking);
            // setShortReview(dataRecord.shortReview);
            // setLongReview(dataRecord.longReview);
            // setOwned(dataRecord.owned);
            // setDatePurchased(dataRecord.datePurchased);
            setActive(dataRecord.active);

            // let titleItem = getFirstItem(titleListState.filter(title => title.titleID === dataRecord.titleID));
            // // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}


            // // let titleItemIndex = titleListState.findIndex(title => title.titleID === dataRecord.titleID);

            // // user: {userID: userID, firstName: firstName, lastName: lastName, email: email, updatedBy: updatedBy,  admin: admin, active: userActive}

            // // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
            // dispatch(addStateUserReview([{ reviewID: dataRecord.reviewID, userID: dataRecord.userID, updatedBy: dataRecord.updatedBy, titleID: dataRecord.titleID, read: dataRecord.read, dateRead: dataRecord.dateRead, rating: dataRecord.rating, ranking: dataRecord.ranking, shortReview: dataRecord.shortReview, longReview: dataRecord.longReview, owned: dataRecord.owned, datePurchased: dataRecord.datePurchased, active: dataRecord.active, userReviewActive: dataRecord.active, createDate: dataRecord.createDate, updateDate: dataRecord.updateDate/*, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }*/, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, submissionDate: titleItem.submissionDate, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, titleActive: titleItem.active, titleCreateDate: titleItem.createDate, titleUpdatedDate: titleItem.updateDate/*, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active }*/, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, userUpdatedBy: userState.updatedBy, admin: userState.admin, userActive: userState.active }]));

            // // ? Add to local storage also? -- 03/06/2021 MF

            // // * Recalculate ratings
            // let userReviewsList = userReviewListState.filter(userReview => userReview.titleID === /*dataRecord.*/titleID && (userReview.userReviewActive === true || userReview.userReviewActive === 1) && isEmpty(rating) === false);

            // let userReviews = [];

            // if (isNonEmptyArray(userReviewsList) === true) {

            //   for (let i = 0; i < userReviewsList.length; i++) {

            //     userReviews.push({ reviewID: userReviewsList[i].reviewID, userID: userReviewsList[i].userID, updatedBy: userReviewsList[i].updatedBy, rating: userReviewsList[i].rating });

            //   };

            // };

            // // let userReviews = userReviewListState.filter(userReview => userReview.titleID === dataRecord.titleID && (userReview.userReviewActive === true || userReview.userReviewActive === 1) && isEmpty(rating) === false);

            // // * Get all reviews for the title. -- 03/06/2021 MF
            // // ? Get the latest from state? -- 03/06/2021 MF
            // // ? Update the state user review array? -- 03/06/2021 MF
            // if (isEmpty(dataRecord.rating) === false) {
            //   // userReviews.push({ reviewID: dataRecord.reviewID, userID: dataRecord.userID, updatedBy: dataRecord.updatedBy, titleID: dataRecord.titleID, read: dataRecord.read, dateRead: dataRecord.dateRead, rating: dataRecord.rating, ranking: dataRecord.ranking, shortReview: dataRecord.shortReview, longReview: dataRecord.longReview, active: dataRecord.active, userReviewActive: dataRecord.active, createDate: dataRecord.createDate, updateDate: dataRecord.updateDate/*, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }*/, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, titleActive: titleItem.active, titleCreateDate: titleItem.createDate, titleUpdatedDate: titleItem.updateDate/*, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active }*/, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, userUpdatedBy: userState.updatedBy, admin: userState.admin, userActive: userState.active });
            //   userReviews.push({ reviewID: dataRecord.reviewID, userID: dataRecord.userID, updatedBy: dataRecord.updatedBy, titleID: dataRecord.titleID, rating: dataRecord.rating });
            // };

            // // * Recompute the average. -- 03/06/2021 MF
            // let userReviewCount = userReviews.length;

            // let userReviewSum = 0;

            // if (isNonEmptyArray(userReviews) === true) {

            //   for (let i = 0; i < userReviews.length; i++) {

            //     userReviewSum += userReviews[i].rating;

            //   };

            // };

            // let userReviewAverage = 0;

            // if (userReviewCount > 0) {

            //   // ? Check for division by zero? -- 03/06/2021 MF
            //   // let userReviewAverage: number = userReviewSum/0;
            //   userReviewAverage = userReviewSum / userReviewCount;

            // };

            // // * Update the title ratings. -- 03/06/2021 MF
            // dispatch(updateStateTitleRating({ /*titleItemIndex: titleItemIndex,*/ titleID: titleItem.titleID, userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage }));

            // // const checklistListIndex = checklistListState.findIndex(userReview => userReview.titleID === dataRecord.titleID);

            // if (dataRecord.active === true || dataRecord.active === 1) {

            //   dispatch(updateStateChecklist({ /*checklistListIndex: checklistListIndex,*/ reviewID: dataRecord.reviewID, userID: dataRecord.userID, updatedBy: dataRecord.updatedBy, titleID: dataRecord.titleID, read: dataRecord.read, dateRead: dataRecord.dateRead, userReviewActive: dataRecord.active, userReviewUpdateDate: getDateTime() }));

            // };

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {
          console.error(componentName, getDateTime(), "addUserReview error", error);
          // console.error(componentName, getDateTime(), "addUserReview error.name", error.name);
          // console.error(componentName, getDateTime(), "addUserReview error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

    // };

  };


  const updateUserReview = (deleteUserReview) => {

    clearMessages();
    setUserReviewRecordUpdated(null);

    setUserReviewItem(null);
    // setReviewID(null);
    // setUserID(null);
    // setUpdatedBy(null);
    // setTitleID(null);
    // setRead(null);
    // setDateRead(null);
    setRating(null);
    // setRanking(null);
    // setShortReview(null);
    // setLongReview(null);
    // setOwned(null);
    // setDatePurchased(null);
    setActive(null);

    // ? Check to make sure that txtDateRead) is a date? -- 03/06/2021 MF
    // ? Check to make sure that titleID is a number? -- 03/06/2021 MF
    // * txtDateRead is expecting a date and rdoRating is expecting a number. -- 03/06/2021 MF
    // if (isEmpty(txtDateRead) === false && isEmpty(rdoRating) === false) {

    let recordObject = {
      read: cbxRead,
      // dateRead: formatTrim(txtDateRead),
      rating: rdoRating,
      // ranking: request.body.userReview.ranking,
      // shortReview: formatTrim(txtShortReview),
      // longReview: formatTrim(txtLongReview),
      owned: cbxOwned,
      // datePurchased: formatTrim(txtDatePurchased)
      active: !deleteUserReview
    };

    // * If the user doesn't enter a date read, then it isn't added/updated
    if (isEmpty(txtDateRead) === false) {

      if (formatTrim(txtDateRead).length !== 0) {

        Object.assign(recordObject, { dateRead: formatTrim(txtDateRead) });

      };

    };

    // * If the user doesn't enter a ranking, then it isn't added/updated
    if (isEmpty(txtRanking) === false) {

      if (formatTrim(txtRanking).length !== 0) {

        Object.assign(recordObject, { ranking: formatTrim(txtRanking) });

      };

    };

    // * If the user doesn't enter a short review, then it isn't added/updated
    if (isEmpty(txtShortReview) === false) {

      if (formatTrim(txtShortReview).length !== 0) {

        Object.assign(recordObject, { shortReview: formatTrim(txtShortReview) });

      };

    };

    // * If the user doesn't enter a long review, then it isn't added/updated
    if (isEmpty(txtLongReview) === false) {

      if (formatTrim(txtLongReview).length !== 0) {

        Object.assign(recordObject, { longReview: formatTrim(txtLongReview) });

      };

    };

    // * If the user doesn't enter a date purchased, then it isn't added/updated
    if (isEmpty(txtDatePurchased) === false) {

      if (formatTrim(txtDatePurchased).length !== 0) {

        Object.assign(recordObject, { datePurchased: formatTrim(txtDatePurchased) });

      };

    };

    let url = baseURL + "userreviews/";

    if (isEmpty(reviewID) === false && isEmpty(sessionToken) === false) {

      // ? Does it matter if the user is updating their own review as an admin or not? -- 03/06/2021 MF
      if (isEmpty(admin) === false && admin === true) {

        url = url + "admin/";

        Object.assign(recordObject, { userID: userID });

      };

      url = url + reviewID;

      fetch(url, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        }),
        body: JSON.stringify({ userReview: recordObject })
      })
        .then(results => {

          // if (results.ok !== true) {

          //     throw Error(results.status + " " + results.statusText + " " + results.url);

          // } else {

          // if (results.status === 200) {

          return results.json();

          // } else {

          //     return results.status;

          // };

          // };

        })
        .then(data => {

          setUserReviewRecordUpdated(data.transactionSuccess);
          addMessage(data.message);

          if (data.transactionSuccess === true) {

            let dataRecord = getFirstItem(data.records);

            setUserReviewItem(dataRecord);
            // setReviewID(dataRecord.reviewID);
            setUserID(dataRecord.userID);
            // setUpdatedBy(dataRecord.updatedBy);
            // setTitleID(dataRecord.titleID);
            // setRead(dataRecord.read);
            // setDateRead(dataRecord.dateRead);
            setRating(dataRecord.rating);
            // setRanking(dataRecord.ranking);
            // setShortReview(dataRecord.shortReview);
            // setLongReview(dataRecord.longReview);
            setActive(dataRecord.active);

            // let titleItem = getFirstItem(titleListState.filter(title => title.titleID === /*dataRecord.*/titleID));
            // // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}



            // // let titleItemIndex = titleListState.findIndex(title => title.titleID === /*dataRecord.*/titleID);

            // // user: {userID: userID, firstName: firstName, lastName: lastName, email: email, updatedBy: updatedBy,  admin: admin, active: userActive}

            // // ? Would still work if the createDate and updateDate were left out? -- 03/06/2021 MF
            // dispatch(updateStateUserReview({ /*userReviewItemIndex: userReviewItemIndex,*/ reviewID: reviewID, userID: dataRecord.userID, updatedBy: dataRecord.updatedBy, titleID: /*dataRecord.*/titleID, read: dataRecord.read, dateRead: dataRecord.dateRead, rating: dataRecord.rating, ranking: dataRecord.ranking, shortReview: dataRecord.shortReview, longReview: dataRecord.longReview, owned: dataRecord.owned, datePurchased: dataRecord.datePurchased, active: dataRecord.active, userReviewActive: dataRecord.active, updateDate: getDateTime()/*, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active }*/ }));

            // // ? Add to local storage also? -- 03/06/2021 MF

            // // * Recalculate ratings
            // let userReviewsList = userReviewListState.filter(userReview => userReview.titleID === /*dataRecord.*/titleID && (userReview.userReviewActive === true || userReview.userReviewActive === 1) && isEmpty(rating) === false);

            // let userReviews = [];

            // if (isNonEmptyArray(userReviewsList) === true) {

            //   for (let i = 0; i < userReviewsList.length; i++) {

            //     userReviews.push({ reviewID: userReviewsList[i].reviewID, userID: userReviewsList[i].userID, updatedBy: userReviewsList[i].updatedBy, titleID: userReviewsList[i].titleID, rating: userReviewsList[i].rating });

            //   };

            // };

            // const userReviewsIndex = userReviews.findIndex(userReview => userReview.reviewID === reviewID);

            // // * Get all reviews for the title. -- 03/06/2021 MF
            // // ? Get the latest from state? -- 03/06/2021 MF
            // // ? Update the state user review array? -- 03/06/2021 MF
            // // * TypeError: Cannot assign to read only property 'rating' of object '#<Object>' -- 03/06/2021 MF
            // // userReviews[userReviewsIndex].rating = dataRecord.rating;

            // if (userReviewsIndex > -1) {

            //   userReviews.splice(userReviewsIndex, 1);

            // };

            // // userReviews.push({ reviewID: reviewID, userID: dataRecord.userID, updatedBy: dataRecord.updatedBy, titleID: /*dataRecord.*/titleID, read: dataRecord.read, dateRead: dataRecord.dateRead, rating: dataRecord.rating, shortReview: dataRecord.shortReview, longReview: dataRecord.longReview, active: dataRecord.active, userReviewActive: dataRecord.active, createDate: dataRecord.createDate, updateDate: dataRecord.updateDate/*, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active }*/ });

            // if (dataRecord.active === true || dataRecord.active === 1 && isEmpty(dataRecord.rating) === false) {

            //   userReviews.push({ reviewID: parseInt(reviewID), userID: dataRecord.userID, updatedBy: dataRecord.updatedBy, titleID: /*dataRecord.*/titleID, rating: dataRecord.rating });

            // };

            // // * Recompute the average. -- 03/06/2021 MF
            // let userReviewCount = userReviews.length;

            // let userReviewSum = 0;

            // if (isNonEmptyArray(userReviews) === true) {

            //   for (let i = 0; i < userReviews.length; i++) {

            //     userReviewSum += userReviews[i].rating;

            //   };

            // };

            // let userReviewAverage = 0;

            // if (userReviewCount > 0) {

            //   // ? Check for division by zero? -- 03/06/2021 MF
            //   // let userReviewAverage: number = userReviewSum/0;
            //   userReviewAverage = userReviewSum / userReviewCount;

            // };

            // // * Update the title ratings. -- 03/06/2021 MF
            // dispatch(updateStateTitleRating({ /*titleItemIndex: titleItemIndex,*/ titleID: titleItem.titleID, userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage }));

            // // const checklistListIndex = checklistListState.findIndex(userReview => userReview.titleID === /*dataRecord.*/titleID);

            // if (dataRecord.active === true || dataRecord.active === 1) {

            //   dispatch(updateStateChecklist({ /*checklistListIndex: checklistListIndex,*/ reviewID: reviewID, userID: dataRecord.userID, updatedBy: dataRecord.updatedBy, titleID: /*dataRecord.*/titleID, read: dataRecord.read, dateRead: dataRecord.dateRead, userReviewActive: dataRecord.active, userReviewUpdateDate: getDateTime() }));

            // } else {

            //   dispatch(updateStateChecklist({ /*checklistListIndex: checklistListIndex,*/ reviewID: null, userID: null, updatedBy: null, titleID: /*dataRecord.*/titleID, read: null, dateRead: null, userReviewActive: null, userReviewCreatedDate: null, userReviewUpdateDate: null }));

            // };

          } else {

            // addErrorMessage(data.error);
            addErrorMessage(data.errorMessages);

          };

        })
        .catch((error) => {
          console.error(componentName, getDateTime(), "updateUserReview error", error);
          // console.error(componentName, getDateTime(), "updateUserReview error.name", error.name);
          // console.error(componentName, getDateTime(), "updateUserReview error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

    // };

  };


  const deleteUserReview = () => {

    clearMessages();
    setUserReviewRecordDeleted(null);

    let url = baseURL + "userreviews/";

    if (isEmpty(reviewID) === false) {

      url = url + reviewID;

      if (isEmpty(sessionToken) === false) {

        fetch(url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": sessionToken
          })
        })
          .then(results => {

            // if (results.ok !== true) {

            //     throw Error(results.status + " " + results.statusText + " " + results.url);

            // } else {

            // if (results.status === 200) {

            return results.json();

            // } else {

            //     return results.status;

            // };

            // };

          })
          .then(data => {

            setUserReviewRecordDeleted(data.transactionSuccess);

            addMessage(data.message); // * Never seen by the user if the delete was successful. -- 03/06/2021 MF

            if (data.transactionSuccess === true) {

              // // dispatch(deleteStateUserReview(userReviewItemIndex));
              // dispatch(deleteStateUserReview(data.reviewID));
              // // ? Update local storage also? -- 03/06/2021 MF

              // // let titleItem = getFirstItem(titleListState.filter(title => title.titleID === data.titleID));
              // // // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}

              // let userReviewItem = getFirstItem(userReviewListState.filter(userReview => userReview.reviewID === data.reviewID));

              // // let titleItemIndex = titleListState.findIndex(title => title.titleID === userReviewItem.titleID);

              // // * Recalculate ratings. -- 03/06/2021 MF
              // let userReviews = userReviewListState.filter(userReview => userReview.titleID === userReviewItem.titleID && (userReview.userReviewActive === true || userReview.userReviewActive === 1) && isEmpty(rating) === false);

              // const userReviewsIndex = userReviews.findIndex(userReview => userReview.reviewID === data.reviewID);

              // // * Get all reviews for the title. -- 03/06/2021 MF
              // // ? Get the latest from state? -- 03/06/2021 MF
              // // ? Update the state user review array? -- 03/06/2021 MF
              // // * TypeError: Cannot assign to read only property 'rating' of object '#<Object>' -- 03/06/2021 MF
              // // userReviews[userReviewsIndex].rating = data.rating;

              // if (userReviewsIndex > -1) {

              //   userReviews.splice(userReviewsIndex, 1);

              // };

              // // * Recompute the average. -- 03/06/2021 MF
              // let userReviewCount = userReviews.length;

              // let userReviewSum = 0;

              // if (isNonEmptyArray(userReviews) === true) {

              //   for (let i = 0; i < userReviews.length; i++) {

              //     userReviewSum += userReviews[i].rating;

              //   };

              // };

              // let userReviewAverage = 0;

              // if (userReviewCount > 0) {

              //   // ? Check for division by zero? -- 03/06/2021 MF
              //   // let userReviewAverage: number = userReviewSum/0;
              //   userReviewAverage = userReviewSum / userReviewCount;

              // };

              // // * Update the title ratings. -- 03/06/2021 MF
              // dispatch(updateStateTitleRating({ /*titleItemIndex: titleItemIndex,*/ titleID: userReviewItem.titleID, userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage }));

            } else {

              // addErrorMessage(data.error);
              addErrorMessage(data.errorMessages);

            };

          })
          .catch((error) => {
            console.error(componentName, getDateTime(), "deleteUserReview error", error);
            // console.error(componentName, getDateTime(), "deleteUserReview error.name", error.name);
            // console.error(componentName, getDateTime(), "deleteUserReview error.message", error.message);

            addErrorMessage(error.name + ": " + error.message);

            // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

          });

      };

    };

  };


  return (
    <React.Fragment>

      {applicationAllowUserInteractions === true && isEmpty(sessionToken) === false && (isEmpty(userReviewItem) === true || ((isEmpty(userReviewItem) === false && isEmpty(userState.userID) === false && userState.userID === userReviewItem.userID) || (isEmpty(userReviewItem) === false && isEmpty(admin) === false && admin === true))) ?

        <React.Fragment>

          <button aria-label={showForm === false ? "expand" : "collapse"} onClick={() => { setShowForm(!showForm); }}>

            <div>
              {isEmpty(userReviewItem) === true ? <React.Fragment>Add</React.Fragment> : <React.Fragment>Update</React.Fragment>} Review

              {showForm === false ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-up"></i>}
            </div>

            {showForm === true ?

              <span onClick={() => { setShowForm(!showForm); }}>

                <FormGroup className="text-center">
                  <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
                  <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>
                </FormGroup>

                <FormGroup row>

                  <Col>

                    <FormGroup className="ms-4">
                      <Label for="cbxRead"><Input type="checkbox" id="cbxRead" checked={cbxRead} onChange={(event) => { setCbxRead(!cbxRead); }} />Read</Label>
                    </FormGroup>

                    <FormGroup>
                      <Label for="rdoRating" className="me-4">Rating</Label>
                      {/* <Rating name="rdoRating" defaultValue={0} max={10} value={rdoRating} onChange={(event, newValue) => { setRdoRating(newValue); }} /> */}
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
                      <Input type="date" id="txtDateRead" value={txtDateRead} onChange={(event) => { setTxtDateRead(event.target.value); }} />
                    </FormGroup>

                  </Col>

                </FormGroup>
                <FormGroup>

                  <Label for="txtRanking">Ranking</Label>
                  <Input type="text" id="txtRanking" value={txtRanking} onChange={(event) => { setTxtRanking(event.target.value); }} />

                </FormGroup>
                <FormGroup row>

                  <Col>

                    <FormGroup className="ms-4">
                      <Label for="cbxOwned"><Input type="checkbox" id="cbxOwned" checked={cbxOwned} onChange={(event) => { setCbxOwned(!cbxOwned); }} />Owned</Label>
                    </FormGroup>

                  </Col>

                  <Col>

                    <FormGroup>
                      <Label for="txtDatePurchased">Date Purchased</Label>
                      <Input type="date" id="txtDatePurchased" value={txtDatePurchased} onChange={(event) => { setTxtDatePurchased(event.target.value); }} />
                    </FormGroup>

                  </Col>

                </FormGroup>

                <FormGroup>
                  <Label for="txtShortReview">Short Review</Label>
                  <Input type="text" id="txtShortReview" value={txtShortReview} onChange={(event) => { setTxtShortReview(event.target.value); }} />
                </FormGroup>

                <FormGroup>
                  <Label for="txtLongReview">Long Review</Label>
                  <Input type="textarea" id="txtLongReview" rows={10} value={txtLongReview} onChange={(event) => { setTxtLongReview(event.target.value); }} />
                </FormGroup>

                {isEmpty(userReviewItem) === true ?

                  <Button outline size="lg" color="primary" onClick={addUserReview}>Add Review</Button>

                  :

                  <React.Fragment>

                    <Button outline size="lg" color="primary" onClick={(event) => { updateUserReview(false); }}>Update Review</Button>
                    <Button outline size="lg" color="danger" onClick={(event) => { updateUserReview(true); }}>Delete Review</Button>
                    {isEmpty(admin) === false && admin === true ? <Button outline size="lg" color="warning" onClick={(event) => { deleteUserReview(); }}>Hard Delete Review</Button> : null}

                  </React.Fragment>

                }

                {/* <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button> */}

              </span>

              : null}

          </button>

        </React.Fragment>

        : null}

    </React.Fragment>
  );
};

export default EditUserReview;
