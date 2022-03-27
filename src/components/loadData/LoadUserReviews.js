import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Alert } from "reactstrap";
import applicationSettings from "../../app/environment";
import { isEmpty, displayValue, getDateTime } from "../../utilities/SharedFunctions";
import { addErrorLog } from "../../utilities/ApplicationFunctions";
import { loadArrayUserReviews, setUserReviewsDataOffline } from "../../app/userReviewsSlice";

function LoadUserReviews() {

  const componentName = "LoadUserReviews";

  const dispatch = useDispatch();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  // * Load settings from Redux slices. -- 03/06/2021 MF
  const userReviewsLoaded = useSelector(state => state.userReviews.userReviewsLoaded);

  const [userReviewMessage, setUserReviewMessage] = useState("");
  const [errUserReviewMessage, setErrUserReviewMessage] = useState("");


  const loadDataStore = (data, source) => {

    if (source === "userReview") {

      dispatch(loadArrayUserReviews(data));
      // localStorage.setItem("arrayUserReviews", data);
      // localStorage.setItem("lastDatabaseRetrievalUserReviews", getDateTime());

    };

  };


  const getUserReviews = () => {

    setUserReviewMessage("");
    setErrUserReviewMessage("");

    let url = baseURL + "userreviews";

    fetch(url)
      .then(response => {

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          // dispatch(setUserReviewsDataOffline(true));
          return { transactionSuccess: false, errorOccurred: true, message: "Offline User Reviews data fetch used." };

        } else {

          dispatch(setUserReviewsDataOffline(false));
          return response.json();

        };

      })
      .then(results => {

        // setUserReviewMessage(results.message);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "userReview");

          // } else {

          //   console.error(componentName, getDateTime(), "getUserReviews error", results.message);
          //   // setErrUserReviewMessage(results.message);
          //   dispatch(setUserReviewsDataOffline(true));
          //   // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          //   // fetchLocalDataUserReviews();

        };

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "getUserReviews error", error);
        // console.error(componentName, getDateTime(), "getUserReviews error.name", error.name);
        // console.error(componentName, getDateTime(), "getUserReviews error.message", error.message);

        // setErrUserReviewMessage(error.name + ": " + error.message);
        // dispatch(setUserReviewsDataOffline(true));
        // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
        // fetchLocalDataUserReviews();

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

    // * Only load the bibliography data once per session unless the data is changed. -- 03/06/2021 MF
    if (!userReviewsLoaded) {

      getUserReviews();
      // getUserReviewsRatings();

    };

  }, []);


  return (
    <Row className="text-center">

      {isEmpty(userReviewMessage) === false ? <Alert color="info">{userReviewMessage}</Alert> : null}
      {isEmpty(errUserReviewMessage) === false ? <Alert color="danger">{errUserReviewMessage}</Alert> : null}

    </Row>
  );
}

export default LoadUserReviews;
