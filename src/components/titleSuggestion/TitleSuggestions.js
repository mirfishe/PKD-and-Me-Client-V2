import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Col, Row, Alert } from "reactstrap";
import { DisplayDate } from "../../app/sharedFunctions";

const TitleSuggestions = (props) => {

  const componentName = "TitleSuggestions.js";

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, "admin", admin);

  const [titleSuggestionMessage, setTitleSuggestionMessage] = useState("");
  const [errTitleSuggestionMessage, setErrTitleSuggestionMessage] = useState("");
  const [titleSuggestionResultsFound, setTitleSuggestionResultsFound] = useState(null);

  const titleSuggestionsState = useSelector(state => state.titleSuggestions.arraytitleSuggestions);
  // console.log(componentName, "titleSuggestionsState", titleSuggestionsState);

  let titleSuggestions = [...titleSuggestionsState];

  // * Sort the list by createdAt
  titleSuggestions.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
  // * Sort the list by updatedAt
  // titleSuggestions.sort((a, b) => (a.updatedAt > b.updatedAt) ? 1 : -1);

  useEffect(() => {
    // console.log(componentName, "useEffect check for admin", admin);

    if (admin !== true) {
      return <Redirect to="/" />;
    };

  }, [admin]);

  return (
    <Container className="my-4">
      <Row>
        <Col xs="12">
          <h5 className="text-center">Title Suggestions</h5>
        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs="12">
          {errTitleSuggestionMessage !== undefined && errTitleSuggestionMessage !== null && errTitleSuggestionMessage !== "" ? <Alert color="danger">{errTitleSuggestionMessage}</Alert> : null}
        </Col>
      </Row>
      <Row>
        {titleSuggestions.map((titleSuggestion) => {

          return (
            <Col className="my-4" xs="12" key={titleSuggestion.titleSuggestionID}>

              <Row>
                <Col xs="12">
                  <h6>{titleSuggestion.titleName}
                    {titleSuggestion.publicationDate !== undefined && titleSuggestion.publicationDate !== null ? <span className="ml-2 smallerText"> ({DisplayDate(titleSuggestion.publicationDate)})</span> : null}
                  </h6>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col xs="12">
                  <p>{titleSuggestion.authorFirstName} {titleSuggestion.authorLastName}</p>
                </Col>
              </Row>

              <Row>
                <Col xs="12">
                  {titleSuggestion.shortDescription !== undefined && titleSuggestion.shortDescription !== null && titleSuggestion.shortDescription !== "" ? <p className="displayParagraphs">{titleSuggestion.shortDescription}</p> : null}
                </Col>
              </Row>

              <Row>
                <Col xs="12">
                  {titleSuggestion.titleURL !== undefined && titleSuggestion.titleURL !== null && titleSuggestion.titleURL !== "" ? <p>{titleSuggestion.titleURL}</p> : null}
                </Col>
              </Row>

              <Row>
                <Col xs="12">
                  <p>
                    Suggested by {titleSuggestion.user.firstName !== undefined && titleSuggestion.user.firstName !== null ? titleSuggestion.user.firstName : null} {titleSuggestion.user.lastName !== undefined && titleSuggestion.user.lastName !== null ? titleSuggestion.user.lastName : null} {titleSuggestion.emailAddress !== undefined && titleSuggestion.emailAddress !== null ? titleSuggestion.emailAddress : null} {titleSuggestion.updatedAt !== undefined && titleSuggestion.updatedAt !== null ? <small>on {DisplayDate(titleSuggestion.updatedAt)}</small> : null}
                  </p>
                </Col>
              </Row>

            </Col>
          )
        })}
      </Row>
    </Container>
  );

};

export default TitleSuggestions;
