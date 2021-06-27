import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Alert } from "reactstrap";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";

function UserReviewList() {

  const componentName = "UserReviewList.js";

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  document.title = "User Review List | " + appName + " | " + siteName;

  const [userReviewMessage, setUserReviewMessage] = useState("");
  const [errUserReviewMessage, setErrUserReviewMessage] = useState("");
  const [userReviewResultsFound, setUserReviewResultsFound] = useState(null);
  const [userReviewList, setUserReviewList] = useState([]);


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
          throw Error(response.status + " " + response.statusText + " " + response.url);
        } else {
          return response.json();
        };
      })
      .then(data => {
        // console.log(componentName, GetDateTime(), "getUserReviews data", data);

        setUserReviewResultsFound(data.resultsFound);
        setUserReviewMessage(data.message);

        if (data.resultsFound === true) {
          setUserReviewList(data.records);
        } else {
          setErrUserReviewMessage(data.message);
        };

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "getUserReviews error", error);
        // console.log(componentName, GetDateTime(), "getUserReviews error.name", error.name);
        // console.log(componentName, GetDateTime(), "getUserReviews error.message", error.message);
        setErrUserReviewMessage(error.name + ": " + error.message);
      });

  };


  useEffect(() => {
    getUserReviews();
  }, []);


  return (
    <Container className="mt-4">
      <Row className="text-center">
        {IsEmpty(userReviewMessage) === false ? <Alert color="info">{userReviewMessage}</Alert> : null}
        {IsEmpty(errUserReviewMessage) === false ? <Alert color="danger">{errUserReviewMessage}</Alert> : null}
      </Row>
      {userReviewResultsFound !== null ?
        <Row>
          {/* <pre>
                {JSON.stringify(userReviewList)}
            </pre> */}
          <span>
            {JSON.stringify({ "resultsFound": true, "message": "Offline User Reviews data used.", "records": userReviewList })}
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
