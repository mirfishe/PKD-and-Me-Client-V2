import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Alert } from "reactstrap";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";
// import UserReviewData from "../../bibliographyData/userReviews.json";
// import UserReviewRatingData from "../../bibliographyData/UserReviewsRatings.json";
import { loadArrayUserReviews, setUserReviewsDataOffline } from "../../bibliographyData/userReviewsSlice";

function LoadUserReviews() {

  const componentName = "LoadUserReviews.js";

  const dispatch = useDispatch();

  // Loading the baseURL from the state store here is too slow
  // Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  // Loading the appOffline from the state store here is too slow
  // Always pulling it from environment.js
  // const appOffline = useSelector(state => state.app.appOffline);
  const appOffline = AppSettings.appOffline;
  // console.log(componentName, GetDateTime(), "appOffline", appOffline);

  // Load settings from Redux slices
  const userReviewsLoaded = useSelector(state => state.userReviews.userReviewsLoaded);

  const [userReviewMessage, setUserReviewMessage] = useState("");
  const [errUserReviewMessage, setErrUserReviewMessage] = useState("");

  // const [overallTitleRatingMessage, setOverallTitleRatingMessage] = useState("");
  // const [errOverallTitleRatingMessage, setErrOverallTitleRatingMessage] = useState("");


  const loadDataStore = (data, source) => {

    if (source === "userReview") {
      // console.log(componentName, GetDateTime(), "loadDataStore data", data);
      dispatch(loadArrayUserReviews(data));
      // localStorage.setItem("arrayUserReviews", data);
      // localStorage.setItem("lastDatabaseRetrievalUserReviews", GetDateTime());
      // } else if (source === "userReviewRating") {
      //   // console.log(componentName, GetDateTime(), "loadDataStore data", data);

      //   let userReviewsRatings = data;

      //   for (let i = 0; i < userReviewsRatings.length; i++) {

      //       let userReviewCount = userReviewsRatings[i].userReviewCount;
      //       let userReviewSum = userReviewsRatings[i].userReviewSum;
      //       let userReviewAverage = 0;

      //       if (userReviewCount > 0) {
      //           // Check for division by zero?
      //           // let userReviewAverage: number = userReviewSum/0;
      //           userReviewAverage = userReviewSum/userReviewCount;

      //           Object.assign(userReviewsRatings[i], {userReviewAverage: userReviewAverage});
      //       };

      //       // console.log(componentName, GetDateTime(), "getUserReviewsRatings userReviewCount", userReviewCount);
      //       // console.log(componentName, GetDateTime(), "getUserReviewsRatings userReviewSum", userReviewSum);
      //       // console.log(componentName, GetDateTime(), "getUserReviewsRatings userReviewAverage", userReviewAverage);

      //   };

      //   // console.log(componentName, GetDateTime(), "getUserReviewsRatings userReviewsRatings", userReviewsRatings);

      //   // dispatch(loadArrayUserReviewsRatings(data));
      //   dispatch(loadArrayUserReviewsRatings(userReviewsRatings));
      //   // localStorage.setItem("arrayUserReviewsRatings", JSON.stringify(data));
      //   // localStorage.setItem("lastDatabaseRetrievalUserReviewsRatings", GetDateTime());
    };

  };


  const getUserReviews = () => {
    // console.log(componentName, GetDateTime(), "getUserReviews");
    // console.log(componentName, GetDateTime(), "getUserReviews baseURL", baseURL);

    setUserReviewMessage("");
    setErrUserReviewMessage("");

    let url = baseURL + "userreviews";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getUserReviews response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * load offline data
          dispatch(setUserReviewsDataOffline(true));
          return { resultsFound: false, message: "Offline User Reviews data fetch used." };
        } else {
          dispatch(setUserReviewsDataOffline(false));
          return response.json();
        };
      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getUserReviews results", results);
        // setUserReviewMessage(results.message);

        if (IsEmpty(results) === false && results.resultsFound === true) {
          loadDataStore(results.records, "userReview");
        } else {
          console.log(componentName, GetDateTime(), "getUserReviews resultsFound error", results.message);
          // setErrUserReviewMessage(results.message);
          dispatch(setUserReviewsDataOffline(true));
          fetchLocalDataUserReviews();
        };

      })
      .catch(error => {
        console.error(componentName, GetDateTime(), "getUserReviews error", error);
        // console.error(componentName, GetDateTime(), "getUserReviews error.name", error.name);
        // console.error(componentName, GetDateTime(), "getUserReviews error.message", error.message);
        // setErrUserReviewMessage(error.name + ": " + error.message);
        dispatch(setUserReviewsDataOffline(true));
        fetchLocalDataUserReviews();
      });

  };


  //   const getUserReviewsRatings = () => {
  //     // console.log(componentName, GetDateTime(), "getUserReviewsRatings");
  //     // console.log(componentName, GetDateTime(), "getUserReviewsRatings baseURL", baseURL);

  //     setOverallTitleRatingMessage("");
  //     setErrOverallTitleRatingMessage("");

  //     let url = baseURL + "userreviews/";

  //       url = url + "rating";

  //       // console.log(componentName, GetDateTime(), "getUserReviewsRatings url", url);

  //       fetch(url)
  //       .then(response => {
  //           // console.log(componentName, GetDateTime(), "getUserReviewsRatings response", response);
  //           if (!response.ok) {
  //               // throw Error(response.status + " " + response.statusText + " " + response.url);
  //               // * load offline data
  //               dispatch(setUserReviewsRatingsDataOffline(true));
  //               return {resultsFound: false, message: "Offline User Reviews Ratings data fetch used."};
  //           } else {
  //               dispatch(setUserReviewsRatingsDataOffline(false));
  //               return response.json();
  //           };
  //       })
  //       .then(results => {
  //         // console.log(componentName, GetDateTime(), "getUserReviewsRatings results", results);
  //         // setOverallTitleRatingMessage(results.message);

  //         if (IsEmpty(results) === false && results.resultsFound === true) {
  //           loadDataStore(results.userReviews, "userReviewRating");
  //         } else {
  //           console.log(componentName, GetDateTime(), "getUserReviewsRatings resultsFound error", results.message);
  //           // setErrOverallTitleRatingMessage(results.message);
  //           dispatch(setUserReviewsRatingsDataOffline(true));
  //           fetchLocalDataUserReviewsRatings();
  //         };

  //     })
  //       .catch(error => {
  //           console.error(componentName, GetDateTime(), "getUserReviewsRatings error", error);
  //           // console.error(componentName, GetDateTime(), "getUserReviewsRatings error.name", error.name);
  //           // console.error(componentName, GetDateTime(), "getUserReviewsRatings error.message", error.message);
  //           // setErrOverallTitleRatingMessage(error.name + ": " + error.message);
  //           dispatch(setUserReviewsRatingsDataOffline(true));
  //           fetchLocalDataUserReviewsRatings();
  //       });

  // };


  const fetchLocalDataUserReviews = () => {
    // console.log(componentName, GetDateTime(), "fetchLocalDataUserReviews");

    let url = "bibliographyData/userReviews.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataUserReviews response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer.
          // * load offline data
          dispatch(setUserReviewsDataOffline(true));
          // return {resultsFound: true, message: "Offline User Reviews data used.", userReviews: UserReviewData};
          return { resultsFound: false, message: "Offline User Reviews data fetch failed." };
        } else {
          dispatch(setUserReviewsDataOffline(true));
          return response.json();
        };
      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "fetchLocalDataUserReviews results", results);

        if (IsEmpty(results) === false && results.resultsFound === true) {
          loadDataStore(results.records, "userReview");
        } else {
          console.log(componentName, GetDateTime(), "fetchLocalDataUserReviews resultsFound error", results.message);
          // setErrUserReviewMessage(results.message);
          dispatch(setUserReviewsDataOffline(true));
          // * Not going to need to load user reviews from local data.
          // loadDataStore(UserReviewData, "userReview");
        };

      })
      .catch(error => {
        console.error(componentName, GetDateTime(), "fetchLocalDataUserReviews error", error);
        // console.error(componentName, GetDateTime(), "fetchLocalDataUserReviews error.name", error.name);
        // console.error(componentName, GetDateTime(), "fetchLocalDataUserReviews error.message", error.message);
        // setErrUserReviewMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell
        dispatch(setUserReviewsDataOffline(true));
        // * Not going to need to load user reviews from local data.
        // loadDataStore(UserReviewData, "userReview");
      });

  };

  // const fetchLocalDataUserReviewsRatings = () => {
  //   // console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings");

  //   let url = "bibliographyData/userReviewsRatings.json";

  //   fetch(url)
  //   .then(response => {
  //       // console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings response", response);
  //       if (!response.ok) {
  //         // throw Error(response.status + " " + response.statusText + " " + response.url);
  //         // * load offline data
  //         dispatch(setUserReviewsRatingsDataOffline(true));
  //         // return {resultsFound: true, message: "Offline User Reviews data used.", userReviews: UserReviewRatingData};
  //         return {resultsFound: false, message: "Offline User Reviews data fetch failed."};
  //       } else {
  //         dispatch(setUserReviewsRatingsDataOffline(true));
  //         return response.json();
  //       };
  //   })
  //   .then(results => {
  //       console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings results", results);

  //       if (IsEmpty(results) === false && results.resultsFound === true) {
  //         loadDataStore(results.userReviews, "userReviewRating");
  //       } else {
  //         console.log(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings resultsFound error", results.message);
  //         // setErrUserReviewMessage(results.message);
  //         dispatch(setUserReviewsRatingsDataOffline(true));
  //         loadDataStore(UserReviewRatingData, "userReviewRating");
  //       };

  //   })
  //   .catch(error => {
  //       console.error(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings error", error);
  //       // console.error(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings error.name", error.name);
  //       // console.error(componentName, GetDateTime(), "fetchLocalDataUserReviewsRatings error.message", error.message);
  //       // setErrUserReviewMessage(error.name + ": " + error.message);
  //       // ! This doesn't actually run as far as I can tell
  //       dispatch(setUserReviewsRatingsDataOffline(true));
  //       loadDataStore(UserReviewRatingData, "userReviewRating");
  //   });

  // };

  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect");

    // * Only load the bibliography data once per session unless the data is changed
    if (appOffline) {

      if (!userReviewsLoaded) {
        dispatch(setUserReviewsDataOffline(true));
        fetchLocalDataUserReviews();
        // dispatch(setUserReviewsDataOffline(true));
        // fetchLocalDataUserReviews();
      };

    } else {

      if (!userReviewsLoaded) {
        getUserReviews();
        // getUserReviewsRatings();
      };

    };

  }, []);

  return (
    <Row className="text-center">
      {IsEmpty(userReviewMessage) === false ? <Alert color="info">{userReviewMessage}</Alert> : null}
      {IsEmpty(errUserReviewMessage) === false ? <Alert color="danger">{errUserReviewMessage}</Alert> : null}
      {/* {IsEmpty(overallTitleRatingMessage) === false ? <Alert color="info">{overallTitleRatingMessage}</Alert> : null}
        {IsEmpty(errOverallTitleRatingMessage) === false ? <Alert color="danger">{errOverallTitleRatingMessage}</Alert> : null} */}
    </Row>
  );
}

export default LoadUserReviews;
