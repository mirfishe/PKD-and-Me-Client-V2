import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Alert } from "reactstrap";
import AppSettings from "../../app/environment";
import UserReviewData from "../../bibliographyData/UserReviews.json";
// import UserReviewRatingData from "../../bibliographyData/UserReviewsRatings.json";
import { loadArrayUserReviews, setUserReviewsDataOffline } from "../../bibliographyData/userReviewsSlice";

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

  // const [overallTitleRatingMessage, setOverallTitleRatingMessage] = useState("");
  // const [errOverallTitleRatingMessage, setErrOverallTitleRatingMessage] = useState("");

  const loadDataStore = (data, source) => {

    if (source === "userReview") {
      // console.log(componentName, "loadDataStore data", data);
      dispatch(loadArrayUserReviews(data));
      // localStorage.setItem("arrayUserReviews", data);
      // localStorage.setItem("lastDatabaseRetrievalUserReviews", new Date().toISOString());
      // } else if (source === "userReviewRating") {
      //   // console.log(componentName, "loadDataStore data", data);

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

      //       // console.log(componentName, "getUserReviewsRatings userReviewCount", userReviewCount);
      //       // console.log(componentName, "getUserReviewsRatings userReviewSum", userReviewSum);
      //       // console.log(componentName, "getUserReviewsRatings userReviewAverage", userReviewAverage);

      //   };

      //   // console.log(componentName, "getUserReviewsRatings userReviewsRatings", userReviewsRatings);

      //   // dispatch(loadArrayUserReviewsRatings(data));
      //   dispatch(loadArrayUserReviewsRatings(userReviewsRatings));
      //   // localStorage.setItem("arrayUserReviewsRatings", JSON.stringify(data));
      //   // localStorage.setItem("lastDatabaseRetrievalUserReviewsRatings", new Date().toISOString());
    };

  };

  const getUserReviews = () => {
    // console.log(componentName, "getUserReviews");
    // console.log(componentName, "getUserReviews baseURL", baseURL);

    setUserReviewMessage("");
    setErrUserReviewMessage("");

    let url = baseURL + "userreview/list";

    fetch(url)
      .then(response => {
        // console.log(componentName, "getUserReviews response", response);
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
      .then(data => {
        console.log(componentName, "getUserReviews data", data);
        // setUserReviewMessage(data.message);

        if (data.resultsFound === true) {
          loadDataStore(data.records, "userReview");
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

  //   const getUserReviewsRatings = () => {
  //     // console.log(componentName, "getUserReviewsRatings");
  //     // console.log(componentName, "getUserReviewsRatings baseURL", baseURL);

  //     setOverallTitleRatingMessage("");
  //     setErrOverallTitleRatingMessage("");

  //     let url = baseURL + "userreview/";

  //       url = url + "rating/list";

  //       // console.log(componentName, "getUserReviewsRatings url", url);

  //       fetch(url)
  //       .then(response => {
  //           // console.log(componentName, "getUserReviewsRatings response", response);
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
  //       .then(data => {
  //         // console.log(componentName, "getUserReviewsRatings data", data);
  //         // setOverallTitleRatingMessage(data.message);

  //         if (data.resultsFound === true) {
  //           loadDataStore(data.userReviews, "userReviewRating");
  //         } else {
  //           console.log(componentName, "getUserReviewsRatings resultsFound error", data.message);
  //           // setErrOverallTitleRatingMessage(data.message);
  //           dispatch(setUserReviewsRatingsDataOffline(true));
  //           fetchLocalDataUserReviewsRatings();
  //         };

  //     })
  //       .catch(error => {
  //           console.log(componentName, "getUserReviewsRatings error", error);
  //           // console.log(componentName, "getUserReviewsRatings error.name", error.name);
  //           // console.log(componentName, "getUserReviewsRatings error.message", error.message);
  //           // setErrOverallTitleRatingMessage(error.name + ": " + error.message);
  //           dispatch(setUserReviewsRatingsDataOffline(true));
  //           fetchLocalDataUserReviewsRatings();
  //       });

  // };

  const fetchLocalDataUserReviews = () => {
    // console.log(componentName, "fetchLocalDataUserReviews");

    let url = "./bibliographyData/UserReviews.json";

    fetch(url)
      .then(response => {
        // console.log(componentName, "fetchLocalDataUserReviews response", response);
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
        // ! This doesn't actually run as far as I can tell
        dispatch(setUserReviewsDataOffline(true));
        loadDataStore(UserReviewData, "userReview");
      });

  };

  // const fetchLocalDataUserReviewsRatings = () => {
  //   // console.log(componentName, "fetchLocalDataUserReviewsRatings");

  //   let url = "./bibliographyData/UserReviewsRatings.json";

  //   fetch(url)
  //   .then(response => {
  //       // console.log(componentName, "fetchLocalDataUserReviewsRatings response", response);
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
  //   .then(data => {
  //       console.log(componentName, "fetchLocalDataUserReviewsRatings data", data);

  //       if (data.resultsFound === true) {
  //         loadDataStore(data.userReviews, "userReviewRating");
  //       } else {
  //         console.log(componentName, "fetchLocalDataUserReviewsRatings resultsFound error", data.message);
  //         // setErrUserReviewMessage(data.message);
  //         dispatch(setUserReviewsRatingsDataOffline(true));
  //         loadDataStore(UserReviewRatingData, "userReviewRating");
  //       };

  //   })
  //   .catch(error => {
  //       console.log(componentName, "fetchLocalDataUserReviewsRatings error", error);
  //       // console.log(componentName, "fetchLocalDataUserReviewsRatings error.name", error.name);
  //       // console.log(componentName, "fetchLocalDataUserReviewsRatings error.message", error.message);
  //       // setErrUserReviewMessage(error.name + ": " + error.message);
  //       // ! This doesn't actually run as far as I can tell
  //       dispatch(setUserReviewsRatingsDataOffline(true));
  //       loadDataStore(UserReviewRatingData, "userReviewRating");
  //   });

  // };

  useEffect(() => {
    // console.log(componentName, "useEffect");

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
      {userReviewMessage !== undefined && userReviewMessage !== null && userReviewMessage !== "" ? <Alert color="info">{userReviewMessage}</Alert> : null}
      {errUserReviewMessage !== undefined && errUserReviewMessage !== null && errUserReviewMessage !== "" ? <Alert color="danger">{errUserReviewMessage}</Alert> : null}
      {/* {overallTitleRatingMessage !== undefined && overallTitleRatingMessage !== null && overallTitleRatingMessage !== "" ? <Alert color="info">{overallTitleRatingMessage}</Alert> : null}
        {errOverallTitleRatingMessage !== undefined && errOverallTitleRatingMessage !== null && errOverallTitleRatingMessage !== "" ? <Alert color="danger">{errOverallTitleRatingMessage}</Alert> : null} */}
    </Row>
  );
}

export default LoadUserReviews;
