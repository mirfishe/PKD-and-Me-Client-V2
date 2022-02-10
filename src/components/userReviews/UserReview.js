import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Alert } from "reactstrap";
import { Rating } from "@material-ui/lab/";
import { isEmpty, displayValue, getDateTime, displayDate } from "../../utilities/SharedFunctions";
// import AddUserReview from "../userReviews/AddUserReview";
import EditUserReview from "../userReviews/EditUserReview";

const UserReview = (props) => {

  const componentName = "UserReview";

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, getDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, getDateTime(), "admin", admin);
  const userID = useSelector(state => state.user.userID);
  // console.log(componentName, getDateTime(), "userID", userID);

  // const [userReviewMessage, setUserReviewMessage] = useState("");
  const [errUserReviewMessage, setErrUserReviewMessage] = useState("");
  // const [userReviewResultsFound, setUserReviewResultsFound] = useState(null);

  // const [userReviewDisplayCount, setUserReviewDisplayCount] = useState(0);

  const userReviewsState = useSelector(state => state.userReviews.arrayUserReviews);
  // console.log(componentName, getDateTime(), "userReviewsState", userReviewsState);

  let userReviews = [...userReviewsState];

  if (isEmpty(props.titleID) === false && !isNaN(props.titleID)) {

    userReviews = userReviews.filter(userReview => userReview.titleID === props.titleID);

  };

  // console.log(componentName, getDateTime(), "props.titleID", props.titleID);

  if (isEmpty(admin) === false && admin === true) {

    userReviews = [...userReviews];

  } else {

    userReviews = userReviews.filter(userReview => userReview.userReview === true);

  };

  // console.log(componentName, getDateTime(), "userReviews", userReviews);

  // * Sort the list by createDate. -- 03/06/2021 MF
  userReviews.sort((a, b) => (a.createDate > b.createDate) ? 1 : -1);

  // * Sort the list by updateDate. -- 03/06/2021 MF
  // userReviews.sort((a, b) => (a.updateDate > b.updateDate) ? 1 : -1);

  let userReviewItem = {};

  if (isEmpty(userID) === false && !isNaN(userID)) {

    userReviewItem = userReviews.filter(userReview => userReview.userID === userID);
    userReviewItem = userReviewItem[0];

  };

  // console.log(componentName, getDateTime(), "userReviewItem", userReviewItem);
  // console.log(componentName, getDateTime(), "typeof userReviewItem.read", typeof userReviewItem.read);
  // console.log(componentName, getDateTime(), "userReviewItem.read", userReviewItem.read);
  // console.log(componentName, getDateTime(), "typeof userReviewItem.dateRead", typeof userReviewItem.dateRead);
  // console.log(componentName, getDateTime(), "userReviewItem.dateRead", userReviewItem.dateRead);
  // console.log(componentName, getDateTime(), "typeof userReviewItem[0].read", typeof userReviewItem[0].read);
  // console.log(componentName, getDateTime(), "userReviewItem[0].read", userReviewItem[0].read);
  // console.log(componentName, getDateTime(), "typeof userReviewItem[0].dateRead", typeof userReviewItem[0].dateRead);
  // console.log(componentName, getDateTime(), "userReviewItem[0].dateRead", userReviewItem[0].dateRead);


  useEffect(() => {
    // console.log(componentName, getDateTime(), "useEffect userReviews", userReviews);

    if (userReviews.length > 0) {

      let displayCount = 0;

      for (let i = 0; i < userReviews.length; i++) {

        if ((isEmpty(userReviews[i].rating) === false) || (isEmpty(userReviews[i].shortReview) === false) || (isEmpty(userReviews[i].longReview) === false)) {

          displayCount++;

        };

      };

      // console.log(componentName, getDateTime(), "useEffect displayCount", displayCount);

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
            {userReviews.length > 0 ? */}

      <Row>
        <Col xs="12">

          <h5 className="text-center">User Reviews
            {/* {isEmpty(sessionToken) === false && (isEmpty(userReviewItem) === true) ? <AddUserReview titleID={props.titleID} displayButton={true} /> : null} */}
            {isEmpty(sessionToken) === false && (isEmpty(userReviewItem) === true) ? <EditUserReview titleID={props.titleID} displayButton={true} /> : null}
          </h5>

        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs="12">

          {isEmpty(errUserReviewMessage) === false ? <Alert color="danger">{errUserReviewMessage}</Alert> : null}

        </Col>
      </Row>

      {/* : null} */}

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

                <Col className="my-4" xs="12" key={userReview.reviewID}>

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

                        <h6>{userReview.shortReview}
                          {/* {props.userID === userReview.userID || props.isAdmin === true ? <UpdateUserReview userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} reviewID={userReview.reviewID} displayIcon={true} /> : null} */}
                        </h6>

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

                      {isEmpty(userReview.rating) === false ? <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={userReview.rating} /> : null}

                    </Col>
                    <Col xs="7">

                      <p>Reviewed by {userReview.firstName} {isEmpty(userReview.updateDate) === false ? <small>on {displayDate(userReview.updateDate)}</small> : null}</p>

                    </Col>
                  </Row>

                  <Row>
                    <Col xs="12">

                      {isEmpty(sessionToken) === false && ((isEmpty(userID) === false && userID === userReview.userID) || (isEmpty(admin) === false && admin === true)) ?

                        <EditUserReview reviewID={userReview.reviewID} displayButton={true} />

                        : null}

                    </Col>
                  </Row>

                </Col>

                : null}

            </React.Fragment>

          );
        })}

      </Row>
    </Container>
  );
};

export default UserReview;
