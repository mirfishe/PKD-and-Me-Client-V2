import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Alert } from "reactstrap";
import AppSettings from "../../app/environment";

function UserReviewList() {

  const componentName = "UserReviewList.js";

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, "baseURL", baseURL);

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  document.title = "User Review List | " + appName + " | " + siteName;

  const [userReviewMessage, setUserReviewMessage] = useState("");
  const [errUserReviewMessage, setErrUserReviewMessage] = useState("");
  const [userReviewResultsFound, setUserReviewResultsFound] = useState(null);
  const [userReviewList, setUserReviewList] = useState([]);

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
          throw Error(response.status + " " + response.statusText + " " + response.url);
        } else {
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, "getUserReviews data", data);

        setUserReviewResultsFound(data.resultsFound);
        setUserReviewMessage(data.message);

        if (data.resultsFound === true) {
          setUserReviewList(data.userReviews);
        } else {
          setErrUserReviewMessage(data.message);
        };

      })
      .catch(error => {
        console.log(componentName, "getUserReviews error", error);
        // console.log(componentName, "getUserReviews error.name", error.name);
        // console.log(componentName, "getUserReviews error.message", error.message);
        setErrUserReviewMessage(error.name + ": " + error.message);
      });

  };

  useEffect(() => {
    getUserReviews();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="text-center">
        {userReviewMessage !== undefined && userReviewMessage !== null && userReviewMessage !== "" ? <Alert color="info">{userReviewMessage}</Alert> : null}
        {errUserReviewMessage !== undefined && errUserReviewMessage !== null && errUserReviewMessage !== "" ? <Alert color="danger">{errUserReviewMessage}</Alert> : null}
      </Row>
      {userReviewResultsFound !== null ?
        <Row>
          {/* <pre>
                {JSON.stringify(userReviewList)}
            </pre> */}
          <span>
            {JSON.stringify({ "resultsFound": true, "message": "Offline User Reviews data used.", "userReviews": userReviewList })}
          </span>
        </Row>
        : null}

      <Row>
        {/* {userReviewResultsFound !== null ? <UserReview userReviewList={userReviewList} /> : null} */}
        {/* <UserReview userReviewList={userReviewList} /> */}
      </Row>
    </Container>
  );
}

export default UserReviewList;
