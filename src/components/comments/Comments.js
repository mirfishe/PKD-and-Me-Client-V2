import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Col, Row, Alert } from "reactstrap";
import { IsEmpty, DisplayValue, GetDateTime, DisplayDate } from "../../utilities/SharedFunctions";

// ! The coding on this component is not finished. -- 03/06/2021 MF

const Comments = (props) => {

  const componentName = "Comments.js";

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  const [commentMessage, setCommentMessage] = useState("");
  const [errCommentMessage, setErrCommentMessage] = useState("");
  const [commentResultsFound, setCommentResultsFound] = useState(null);

  const commentsState = useSelector(state => state.comments.arrayComments);
  // console.log(componentName, GetDateTime(), "commentsState", commentsState);

  let comments = [...commentsState];

  // * Sort the list by createDate
  comments.sort((a, b) => (a.createDate > b.createDate) ? 1 : -1);
  // * Sort the list by updateDate
  // comments.sort((a, b) => (a.updateDate > b.updateDate) ? 1 : -1);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect check for admin", admin);

    if (admin !== true) {
      return <Redirect to="/" />;
    };

  }, [admin]);


  return (
    <Container className="my-4">
      <Row>
        <Col xs="12">

          <h5 className="text-center">Comments</h5>

        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs="12">

          {IsEmpty(errCommentMessage) === false ? <Alert color="danger">{errCommentMessage}</Alert> : null}

        </Col>
      </Row>
      <Row>

        {comments.map((comment) => {

          return (
            <Col className="my-4" xs="12" key={comment.commentID}>

              <Row>
                <Col xs="12">

                  {IsEmpty(comment.comment) === false ? <p className="displayParagraphs">{comment.comment}</p> : null}

                </Col>
              </Row>

              <Row>
                <Col xs="12">

                  <p>Submitted by {IsEmpty(comment.firstName) === false ? comment.firstName : null} {IsEmpty(comment.lastName) === false ? comment.lastName : null} {IsEmpty(comment.emailAddress) === false ? comment.emailAddress : null} {IsEmpty(comment.updateDate) === false ? <small>on {DisplayDate(comment.updateDate)}</small> : null}</p>

                </Col>
              </Row>

            </Col>
          );
        })}

      </Row>
    </Container>
  );
};

export default Comments;
