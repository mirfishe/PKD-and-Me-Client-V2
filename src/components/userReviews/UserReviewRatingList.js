import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Alert } from "reactstrap";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";

function UserReviewRatingList() {

  const componentName = "UserReviewRatingList.js";

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  document.title = "User Review Rating List | " + appName + " | " + siteName;

  const [userReviewRatingMessage, setUserReviewRatingMessage] = useState("");
  const [errUserReviewRatingMessage, setErrUserReviewRatingMessage] = useState("");
  const [userReviewRatingResultsFound, setUserReviewRatingResultsFound] = useState(null);
  const [userReviewRatingList, setUserReviewRatingList] = useState([]);


  const getUserReviewRatings = () => {
    // console.log(componentName, GetDateTime(), "getUserReviewRatings");
    // console.log(componentName, GetDateTime(), "getUserReviewRatings baseURL", baseURL);

    setUserReviewRatingMessage("");
    setErrUserReviewRatingMessage("");

    let url = baseURL + "userreviews/rating";

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getUserReviewRatings response", response);
        if (!response.ok) {
          throw Error(response.status + " " + response.statusText + " " + response.url);
        } else {
          return response.json();
        };
      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getUserReviewRatings results", results);

        setUserReviewRatingResultsFound(results.resultsFound);
        setUserReviewRatingMessage(results.message);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          let userReviewsRatings = results.records;

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

            // console.log(componentName, GetDateTime(), "getTitleRating userReviewCount", userReviewCount);
            // console.log(componentName, GetDateTime(), "getTitleRating userReviewSum", userReviewSum);
            // console.log(componentName, GetDateTime(), "getTitleRating userReviewAverage", userReviewAverage);

          };

          // console.log(componentName, GetDateTime(), "getTitleRating userReviewsRatings", userReviewsRatings);

          setUserReviewRatingList(userReviewsRatings);

        } else {
          setErrUserReviewRatingMessage(results.message);
        };

      })
      .catch(error => {
        console.error(componentName, GetDateTime(), "getUserReviewRatings error", error);
        // console.error(componentName, GetDateTime(), "getUserReviewRatings error.name", error.name);
        // console.error(componentName, GetDateTime(), "getUserReviewRatings error.message", error.message);
        setErrUserReviewRatingMessage(error.name + ": " + error.message);
      });

  };


  useEffect(() => {
    getUserReviewRatings();
  }, []);


  return (
    <Container className="mt-4">
      <Row className="text-center">
        {IsEmpty(userReviewRatingMessage) === false ? <Alert color="info">{userReviewRatingMessage}</Alert> : null}
        {IsEmpty(errUserReviewRatingMessage) === false ? <Alert color="danger">{errUserReviewRatingMessage}</Alert> : null}
      </Row>
      {userReviewRatingResultsFound !== null ?
        <Row>
          {/* <pre>
                {JSON.stringify(userReviewRatingList)}
            </pre> */}
          <span>
            {JSON.stringify({ "resultsFound": true, "message": "Offline User Reviews Ratings data used.", "records": userReviewRatingList })}
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
