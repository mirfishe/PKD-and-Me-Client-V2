import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Container, Col, Row, Alert} from "reactstrap";
import {Rating} from "@material-ui/lab/";
import {displayDate} from "../../app/sharedFunctions";
import AddUserReview from "../userReviews/AddUserReview";

const UserReview = (props) => {

    const componentName = "UserReview.js";

    const sessionToken = useSelector(state => state.user.sessionToken);
    // console.log(componentName, "sessionToken", sessionToken);
    const admin = useSelector(state => state.user.admin);
    // console.log(componentName, "admin", admin);
    const userID = useSelector(state => state.user.userID);
    // console.log(componentName, "userID", userID);

    const [userReviewMessage, setUserReviewMessage] = useState("");
    const [errUserReviewMessage, setErrUserReviewMessage] = useState("");
    const [userReviewResultsFound, setUserReviewResultsFound] = useState(null);

    const userReviewsState = useSelector(state => state.userReviews.arrayUserReviews);
    // console.log(componentName, "userReviewsState", userReviewsState);

    let userReviews = [...userReviewsState];

    if (props.titleID !== undefined && props.titleID !== null && !isNaN(props.titleID)) {
        userReviews = userReviews.filter(userReview => userReview.titleID === props.titleID);
    };

    if (admin !== undefined && admin !== null && admin === true) {
        userReviews = [...userReviews];
    } else {
        userReviews = userReviews.filter(userReview => userReview.active === true);
    };
    // console.log(componentName, "userReviews", userReviews);

    // userReviews.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);
    // Sort the list alphabetically instead of by sortID
    // userReviews.sort((a, b) => (a.userReview > b.userReview) ? 1 : -1);

    let userReviewItem = {};

    if (userID !== undefined && userID !== null && !isNaN(userID)) {
        userReviewItem = userReviews.filter(userReview => userReview.userID === userID);
        userReviewItem = userReviewItem[0];
    };
    // console.log(componentName, "userReviewItem", userReviewItem);
    // console.log(componentName, "typeof userReviewItem.read", typeof userReviewItem.read);
    // console.log(componentName, "userReviewItem.read", userReviewItem.read);
    // console.log(componentName, "typeof userReviewItem.dateRead", typeof userReviewItem.dateRead);
    // console.log(componentName, "userReviewItem.dateRead", userReviewItem.dateRead);
    // console.log(componentName, "typeof userReviewItem[0].read", typeof userReviewItem[0].read);
    // console.log(componentName, "userReviewItem[0].read", userReviewItem[0].read);
    // console.log(componentName, "typeof userReviewItem[0].dateRead", typeof userReviewItem[0].dateRead);
    // console.log(componentName, "userReviewItem[0].dateRead", userReviewItem[0].dateRead);

    useEffect(() => {
        // console.log(componentName, "useEffect userReviews", userReviews);
        if (userReviews.length > 0) {
            setErrUserReviewMessage("");
        } else {
            setErrUserReviewMessage("No user reviews found.");
        };
    }, [userReviews]);

    return(
        <Container className="my-4">
             <Row className="my-4">
                <Col xs="12">
                {errUserReviewMessage !== "" ? <Alert color="danger">{errUserReviewMessage}</Alert> : null}
                </Col>
            </Row>
            {/* This is not filtering correctly if there are reviews with no text or ratings in them; only read and dateRead reviews
            {userReviews.length > 0 ? */}
            <Row>
                <Col xs="12">
                <h5 className="text-center">User Reviews
                {sessionToken !== undefined && sessionToken !== null && sessionToken !== "" && (userReviewItem === undefined || userReviewItem === null) ? <AddUserReview titleID={props.titleID} displayButton={true} /> : null}
                </h5>
                </Col>
            </Row>
            {/* : null} */}
            <Row>
        {userReviews.map((userReview) => {

            let activeString = "";
            if (userReview.active === true) {
                // activeString = "Active";
                activeString = "";
            } else {
                activeString = "Inactive";
            };

          return (
            <Col xs="12" key={userReview.reviewID}>

            {(userReview.rating !== undefined && userReview.rating !== null) || (userReview.shortReview !== undefined && userReview.shortReview !== null && userReview.shortReview !== "") || (userReview.longReview !== undefined && userReview.longReview !== null && userReview.longReview !== "") ? 

            <React.Fragment>

            {activeString !== undefined && activeString !== null && activeString !== "" ?
                <Row className="cardHeader inactiveItem">
                    <Col xs="12">
                    ({activeString})
                    </Col>
                </Row>
            : null}
            <Row>
                <Col xs="12">
                {userReview.shortReview !== undefined && userReview.shortReview !== null && userReview.shortReview !== "" ? <h6>{userReview.shortReview}
                {/* {props.userID === userReview.userID || props.isAdmin === true ? <UpdateUserReview userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} reviewID={userReview.reviewID} displayIcon={true} /> : null} */}
                </h6> : null}
                </Col>
            </Row>

            <Row>
                <Col xs="12">
                {userReview.longReview !== undefined && userReview.longReview !== null && userReview.longReview !== "" ? <p>{userReview.longReview}</p> : null}
                </Col>
            </Row>

            <Row>
            <Col xs="5">
                {userReview.rating !== undefined && userReview.rating !== null ? <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={userReview.rating} /> : null}
            </Col>
            <Col xs="7">
                <p>
                Reviewed by {userReview.user.firstName} {userReview.updatedAt !== undefined && userReview.updatedAt !== null ? <small>on {displayDate(userReview.updatedAt)}</small> : null}
                </p>
            </Col>
            </Row>

            </React.Fragment>
            
            : null}

            </Col>
            )
        })}
            </Row>
        </Container>
    );

};

export default UserReview;
