import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "reactstrap";
import AppSettings from "../../app/environment";
import UserReviewData from "../../bibliographyData/UserReviews.json";
import {loadArrayUserReviews, setUserReviewsDataOffline} from "../../bibliographyData/userReviewsSlice";

function LoadUserReviews() {

  const componentName = "LoadUserReviews.js";

  const dispatch = useDispatch();

  // Loading the baseURL from the state store here is too slow
  // Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, "baseURL", baseURL);

  // Loading the appOffline from the state store here is too slow
  // Always pulling it from environment.js
  // const appOffline = useSelector(state => state.app.appOffline);
  const appOffline = AppSettings.appOffline;
  // console.log(componentName, "appOffline", appOffline);

  // Load settings from Redux slices
  const userReviewsLoaded = useSelector(state => state.userReviews.userReviewsLoaded);

  const [userReviewMessage, setUserReviewMessage] = useState("");
  const [errUserReviewMessage, setErrUserReviewMessage] = useState("");

  const loadDataStore = (data, source) => {

    if (source === "userReview") {
      // console.log(componentName, "loadDataStore data", data);
      dispatch(loadArrayUserReviews(data));
    };

  };

  const getUserReviews = () => {
    // console.log(componentName, "getUserReviews");
    // console.log(componentName, "getUserReviews baseURL", baseURL);

    setUserReviewMessage("");
    setErrUserReviewMessage("");

    let url = baseURL + "userreview/";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getUserReviews response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          dispatch(setUserReviewsDataOffline(true));
          return {resultsFound: false, message: "Offline User Reviews data fetch used."};
        } else {
          dispatch(setUserReviewsDataOffline(false));
          return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getUserReviews data", data);
        // setUserReviewMessage(data.message);

        if (data.resultsFound === true) {
          loadDataStore(data.userReviews, "userReview");
        } else {
          console.log(componentName, "getUserReviews resultsFound error", data.message);
          // setErrUserReviewMessage(data.message);
          dispatch(setUserReviewsDataOffline(true));
          fetchLocalDataUserReviews();
        };

    })
    .catch(error => {
        console.log(componentName, "getUserReviews error", error);
        // console.log(componentName, "getUserReviews error.name", error.name);
        // console.log(componentName, "getUserReviews error.message", error.message);
        // setErrUserReviewMessage(error.name + ": " + error.message);
        dispatch(setUserReviewsDataOffline(true));
        fetchLocalDataUserReviews();
    });

  };

  const fetchLocalDataUserReviews = () => {
    // console.log(componentName, "fetchLocalDataUserReviews");

    let url = "./bibliographyData/UserReviews.json";

    fetch(url)
    .then(response => {
        // console.log(componentName, "fetchLocalDataUserReviews response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          dispatch(setUserReviewsDataOffline(true));
          // return {resultsFound: true, message: "Offline User Reviews data used.", userReviews: UserReviewData};
          return {resultsFound: false, message: "Offline User Reviews data fetch failed."};
        } else {
          dispatch(setUserReviewsDataOffline(true));
          return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "fetchLocalDataUserReviews data", data);

        if (data.resultsFound === true) {
          loadDataStore(data.userReviews, "userReview");
        } else {
          console.log(componentName, "fetchLocalDataUserReviews resultsFound error", data.message);
          // setErrUserReviewMessage(data.message);
          dispatch(setUserReviewsDataOffline(true));
          loadDataStore(UserReviewData, "userReview");
        };

    })
    .catch(error => {
        console.log(componentName, "fetchLocalDataUserReviews error", error);
        // console.log(componentName, "fetchLocalDataUserReviews error.name", error.name);
        // console.log(componentName, "fetchLocalDataUserReviews error.message", error.message);
        // setErrUserReviewMessage(error.name + ": " + error.message);
        dispatch(setUserReviewsDataOffline(true));
        loadDataStore(UserReviewData, "userReview");
    });

  };

  useEffect(() => {
    // console.log(componentName, "useEffect");

    // Only load the bibliography data once per session unless the data is changed
    if (appOffline) {

      if(!userReviewsLoaded) {
        dispatch(setUserReviewsDataOffline(true));
        fetchLocalDataUserReviews();
      };

    } else {

      if(!userReviewsLoaded) {
        getUserReviews();
      };

    };

  }, []);

  return (
    <React.Fragment>
        {userReviewMessage !== "" ? <Alert color="info">{userReviewMessage}</Alert> : null}
        {errUserReviewMessage !== "" ? <Alert color="danger">{errUserReviewMessage}</Alert> : null}
    </React.Fragment>
  );
}

export default LoadUserReviews;
