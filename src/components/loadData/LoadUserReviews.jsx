import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Alert } from "reactstrap";
import { isEmpty, getDateTime, displayValue, addErrorLog } from "shared-functions";
import { loadArrayUserReviews, /* setUserReviewsDataOffline */ } from "../../app/userReviewsSlice";

function LoadUserReviews() {

  const componentName = "LoadUserReviews";

  const dispatch = useDispatch();

  const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const applicationOffline = useSelector(state => state.applicationSettings.applicationOffline);
  const applicationSettingsLoaded = useSelector(state => state.applicationSettings.applicationSettingsLoaded);
  const applicationSettingsJsonLoaded = useSelector(state => state.applicationSettings.applicationSettingsJsonLoaded);

  // * Load settings from Redux slices. -- 03/06/2021 MF
  const userReviewsLoaded = useSelector(state => state.userReviews.userReviewsLoaded);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);


  useEffect(() => {

    if (applicationSettingsJsonLoaded === true) {

      // * Only load the bibliography data once per session unless the data is changed. -- 03/06/2021 MF
      if (userReviewsLoaded !== true) {

        getUserReviews();
        // getUserReviewsRatings();

      };

    };

  }, [ /* applicationSettingsLoaded, */ applicationSettingsJsonLoaded]);


  const loadDataStore = (data, source) => {

    if (source === "userReview") {

      dispatch(loadArrayUserReviews(data));
      // localStorage.setItem("arrayUserReviews", data);
      // localStorage.setItem("lastDatabaseRetrievalUserReviews", getDateTime());

    };

  };


  const getUserReviews = () => {

    clearMessages();

    let url = baseURL + "userreviews/";

    fetch(url)
      .then(results => {

        if (results.ok !== true) {

          // throw Error(results.status + " " + results.statusText + " " + results.url);
          // * Load offline data. -- 03/06/2021 MF
          // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          // dispatch(setUserReviewsDataOffline(true));
          return { transactionSuccess: false, errorOccurred: true, message: "Offline User Reviews data fetch used." };

        } else {

          // dispatch(setUserReviewsDataOffline(false));
          return results.json();

        };

      })
      .then(results => {

        // addMessage(results.message);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "userReview");

          // } else {

          //   console.error(componentName, getDateTime(), "getUserReviews error", results.message);
          //   // addErrorMessage(results.message);
          //   dispatch(setUserReviewsDataOffline(true));
          //   // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          //   // fetchLocalDataUserReviews();

        };

      })
      .catch((error) => {

        console.error(componentName, getDateTime(), "getUserReviews error", error);
        // console.error(componentName, getDateTime(), "getUserReviews error.name", error.name);
        // console.error(componentName, getDateTime(), "getUserReviews error.message", error.message);

        // addErrorMessage(error.name + ": " + error.message);
        // dispatch(setUserReviewsDataOffline(true));
        // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
        // fetchLocalDataUserReviews();

        // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <Row className="text-center">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

    </Row>
  );
}

export default LoadUserReviews;
