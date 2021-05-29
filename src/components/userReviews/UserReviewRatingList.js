import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Alert } from "reactstrap";
import AppSettings from "../../app/environment";

function UserReviewRatingList() {

  const componentName = "UserReviewRatingList.js";

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, "baseURL", baseURL);

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  document.title = "User Review Rating List | " + appName + " | " + siteName;

  const [userReviewRatingMessage, setUserReviewRatingMessage] = useState("");
  const [errUserReviewRatingMessage, setErrUserReviewRatingMessage] = useState("");
  const [userReviewRatingResultsFound, setUserReviewRatingResultsFound] = useState(null);
  const [userReviewRatingList, setUserReviewRatingList] = useState([]);

  const getUserReviewRatings = () => {
    // console.log(componentName, "getUserReviewRatings");
    // console.log(componentName, "getUserReviewRatings baseURL", baseURL);

    setUserReviewRatingMessage("");
    setErrUserReviewRatingMessage("");

    let url = baseURL + "userreviews/rating/list";

    fetch(url)
      .then(response => {
        // console.log(componentName, "getUserReviewRatings response", response);
        if (!response.ok) {
          throw Error(response.status + " " + response.statusText + " " + response.url);
        } else {
          return response.json();
        };
      })
      .then(data => {
        console.log(componentName, "getUserReviewRatings data", data);

        setUserReviewRatingResultsFound(data.resultsFound);
        setUserReviewRatingMessage(data.message);

        if (data.resultsFound === true) {

          let userReviewsRatings = data.userReviews;

          for (let i = 0; i < userReviewsRatings.length; i++) {

            let userReviewCount = userReviewsRatings[i].userReviewCount;
            let userReviewSum = userReviewsRatings[i].userReviewSum;
            let userReviewAverage = 0;

            if (userReviewCount > 0) {
              // ? Check for division by zero?
              // let userReviewAverage: number = userReviewSum/0;
              userReviewAverage = userReviewSum / userReviewCount;

              Object.assign(userReviewsRatings[i], { userReviewAverage: userReviewAverage });
            };

            // console.log(componentName, "getTitleRating userReviewCount", userReviewCount);
            // console.log(componentName, "getTitleRating userReviewSum", userReviewSum);
            // console.log(componentName, "getTitleRating userReviewAverage", userReviewAverage);

          };

          // console.log(componentName, "getTitleRating userReviewsRatings", userReviewsRatings);

          setUserReviewRatingList(userReviewsRatings);

        } else {
          setErrUserReviewRatingMessage(data.message);
        };

      })
      .catch(error => {
        console.log(componentName, "getUserReviewRatings error", error);
        // console.log(componentName, "getUserReviewRatings error.name", error.name);
        // console.log(componentName, "getUserReviewRatings error.message", error.message);
        setErrUserReviewRatingMessage(error.name + ": " + error.message);
      });

  };

  useEffect(() => {
    getUserReviewRatings();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="text-center">
        {userReviewRatingMessage !== undefined && userReviewRatingMessage !== null && userReviewRatingMessage !== "" ? <Alert color="info">{userReviewRatingMessage}</Alert> : null}
        {errUserReviewRatingMessage !== undefined && errUserReviewRatingMessage !== null && errUserReviewRatingMessage !== "" ? <Alert color="danger">{errUserReviewRatingMessage}</Alert> : null}
      </Row>
      {userReviewRatingResultsFound !== null ?
        <Row>
          {/* <pre>
                {JSON.stringify(userReviewRatingList)}
            </pre> */}
          <span>
            {JSON.stringify({ "resultsFound": true, "message": "Offline User Reviews Ratings data used.", "userReviews": userReviewRatingList })}
          </span>
        </Row>
        : null}

      <Row>
        {/* {userReviewRatingMResultsFound !== null ? <UserReviewRating userReviewRatingList={userReviewRatingList} /> : null} */}
        {/* <UserReviewRating userReviewRatingList={userReviewList} /> */}
      </Row>
    </Container>
  );
}

export default UserReviewRatingList;
