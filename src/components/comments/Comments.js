import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Table, } from "reactstrap";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, isNonEmptyArray, displayDate } from "shared-functions";
// import { addErrorLog } from "../../utilities/ApplicationFunctions";

// ! The coding on this component is not finished. -- 03/06/2021 MF

const Comments = () => {

  const componentName = "Comments";

  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [comments, setComments] = useState([]);


  useEffect(() => {

    getComments();

  }, []);


  useEffect(() => {

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);


  const getComments = () => {

    clearMessages();

    let url = baseURL + "comments/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": sessionToken
      }),
    })
      .then(response => {

        if (response.ok !== true) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          setComments(results.records);

        };

      })
      .catch((error) => {

        // console.error(componentName, getDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <Container className="my-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      <Row>
        <Col xs="12">

          <h5 className="text-center">Comments</h5>

        </Col>
      </Row>

      {isNonEmptyArray(comments) === true ?

        <Row>

          {comments.map((comment) => {

            return (
              <Col className="my-4" xs="12" key={comment.commentID}>

                <Row>
                  <Col xs="12">

                    {isEmpty(comment.comment) === false ? <p className="display-paragraphs">{comment.comment}</p> : null}

                  </Col>
                </Row>

                <Row>
                  <Col xs="12">

                    <p>Submitted by {isEmpty(comment.firstName) === false ? comment.firstName : null} {isEmpty(comment.lastName) === false ? comment.lastName : null} {isEmpty(comment.emailAddress) === false ? comment.emailAddress : null} {isEmpty(comment.updateDate) === false ? <small>on {displayDate(comment.updateDate)}</small> : null}</p>

                  </Col>
                </Row>

              </Col>
            );
          })}

        </Row>

        : null}

    </Container>
  );
};

export default Comments;
