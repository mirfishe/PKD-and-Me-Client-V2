import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Alert } from "reactstrap";
// import { Rating } from "@mui/lab/";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray, displayDate, getFirstItem } from "shared-functions";
import EditUserReview from "../userReviews/EditUserReview";

const UserReview = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: titleID, userReviewUpdated -- 10/21/2022 MF
  // * Functions: redirectPage, userReviewUpdated -- 10/21/2022 MF

  const componentName = "UserReview";

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);
  const userID = useSelector(state => state.user.userID);

  const arrayUserReviews = useSelector(state => state.userReviews.arrayUserReviews);

  let titleID = isEmpty(props) === false && isEmpty(props.titleID) === false ? props.titleID : null;
  // let userReviewUpdated = isEmpty(props) === false && isEmpty(props.userReviewUpdated) === false ? props.userReviewUpdated : noFunctionAvailable;
  // let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  const [userReviews, setUserReviews] = useState([]);

  // const [userReviewMessage, setUserReviewMessage] = useState("");
  const [errUserReviewMessage, setErrUserReviewMessage] = useState("");
  // const [userReviewResultsFound, setUserReviewResultsFound] = useState(null);

  // const [userReviewDisplayCount, setUserReviewDisplayCount] = useState(0);


  useEffect(() => {

    if (isEmpty(titleID) === false && !isNaN(titleID) === true) {

      let newUserReviews = [...arrayUserReviews];

      newUserReviews = newUserReviews.filter(userReview => userReview.titleID === titleID);

      if (isEmpty(admin) === false && admin === true) {

        // newUserReviews = [...newUserReviews];

      } else {

        newUserReviews = newUserReviews.filter(userReview => userReview.userReviewActive === true || userReview.userReviewActive === 1);

      };

      // * Sort the list by createDate. -- 03/06/2021 MF
      newUserReviews.sort((a, b) => (a.createDate > b.createDate) ? 1 : -1);

      // * Sort the list by updateDate. -- 03/06/2021 MF
      // newUserReviews.sort((a, b) => (a.updateDate > b.updateDate) ? 1 : -1);

      let userReviewItem = {};

      if (isEmpty(userID) === false && !isNaN(userID) === true) {

        userReviewItem = getFirstItem(newUserReviews.filter(userReview => userReview.userID === userID));

      };

      setUserReviews(newUserReviews);

    };

  }, [titleID, arrayUserReviews]);


  useEffect(() => {

    if (isEmpty(userReviews) === false) {

      let displayCount = 0;

      if (isNonEmptyArray(userReviews) === true) {

        for (let i = 0; i < userReviews.length; i++) {

          if ((isEmpty(userReviews[i].rating) === false) || (isEmpty(userReviews[i].shortReview) === false) || (isEmpty(userReviews[i].longReview) === false)) {

            displayCount++;

          };

        };

      };

      if (displayCount > 0) {

        setErrUserReviewMessage("");

      } else {

        setErrUserReviewMessage("No user reviews found.");

      };

    } else {

      setErrUserReviewMessage("No user reviews found.");

    };

  }, [userReviews]);


  return (
    <Container className="my-4">

      {/* // * This is not filtering correctly if there are reviews with no text or ratings in them; only read and dateRead reviews
            {isEmpty(userReviews) === false ? */ }

      <Row>
        <Col xs="12">

          <h5 className="text-center">User Reviews</h5>

        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs="12">

          {isEmpty(errUserReviewMessage) === false ? <Alert color="danger">{errUserReviewMessage}</Alert> : null}

        </Col>
      </Row>

      {/* : null} */}

      {isNonEmptyArray(userReviews) === true ?

        <Row>

          {userReviews.map((userReview) => {

            let activeString = "";

            if (userReview.userReviewActive === true || userReview.userReviewActive === 1) {

              // activeString = "Active";
              activeString = "";

            } else {

              activeString = "Inactive";

            };

            return (
              <React.Fragment key={userReview.reviewID}>

                {isEmpty(userReview.rating) === false || isEmpty(userReview.shortReview) === false || isEmpty(userReview.longReview) === false ?

                  <Col className="my-4" xs="12">

                    {isEmpty(activeString) === false ?

                      <Row className="card-header inactive-item">
                        <Col xs="12">

                          ({activeString})

                        </Col>
                      </Row>

                      : null}

                    <Row>
                      <Col xs="12">

                        {isEmpty(userReview.shortReview) === false ?

                          <h6>{userReview.shortReview}</h6>

                          : null}

                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12">

                        {isEmpty(userReview.longReview) === false ? <p className="display-paragraphs">{userReview.longReview}</p> : null}

                      </Col>
                    </Row>

                    <Row>
                      <Col xs="5">

                        {/* {isEmpty(userReview.rating) === false ? <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={userReview.rating} /> : null} */}

                      </Col>
                      <Col xs="7">

                        <p>Reviewed by {userReview.firstName} {isEmpty(userReview.updateDate) === false ? <small>on {displayDate(userReview.updateDate)}</small> : null}</p>

                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12">

                        {isEmpty(sessionToken) === false && ((isEmpty(userID) === false && userID === userReview.userID) || (isEmpty(admin) === false && admin === true)) ?

                          <EditUserReview reviewID={userReview.reviewID} />

                          : null}

                      </Col>
                    </Row>

                  </Col>

                  : null}

              </React.Fragment>

            );
          })}

        </Row>

        : null}

    </Container>
  );
};

export default UserReview;
