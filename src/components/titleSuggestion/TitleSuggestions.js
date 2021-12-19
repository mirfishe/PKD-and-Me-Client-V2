import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Col, Row, Alert } from "reactstrap";
import { IsEmpty, DisplayValue, GetDateTime, DisplayDate } from "../../utilities/SharedFunctions";

// ! The coding on this component is not finished. -- 03/06/2021 MF

const TitleSuggestions = (props) => {

  const componentName = "TitleSuggestions.js";

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  const [titleSuggestionMessage, setTitleSuggestionMessage] = useState("");
  const [errTitleSuggestionMessage, setErrTitleSuggestionMessage] = useState("");
  const [titleSuggestionResultsFound, setTitleSuggestionResultsFound] = useState(null);

  const titleSuggestionsState = useSelector(state => state.titleSuggestions.arraytitleSuggestions);
  // console.log(componentName, GetDateTime(), "titleSuggestionsState", titleSuggestionsState);

  let titleSuggestions = [...titleSuggestionsState];

  // * Sort the list by createDate. -- 03/06/2021 MF
  titleSuggestions.sort((a, b) => (a.createDate > b.createDate) ? 1 : -1);

  // * Sort the list by updateDate. -- 03/06/2021 MF
  // titleSuggestions.sort((a, b) => (a.updateDate > b.updateDate) ? 1 : -1);


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

          <h5 className="text-center">Title Suggestions</h5>

        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs="12">

          {IsEmpty(errTitleSuggestionMessage) === false ? <Alert color="danger">{errTitleSuggestionMessage}</Alert> : null}

        </Col>
      </Row>
      <Row>

        {titleSuggestions.map((titleSuggestion) => {

          return (
            <Col key={titleSuggestion.titleSuggestionID} className="my-4" xs="12">

              <Row>
                <Col xs="12">

                  <h6>{titleSuggestion.titleName}
                    {IsEmpty(titleSuggestion.publicationDate) === false ? <span className="ml-2 smallerText"> ({DisplayDate(titleSuggestion.publicationDate)})</span> : null}
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

                  {IsEmpty(titleSuggestion.shortDescription) === false ? <p className="displayParagraphs">{titleSuggestion.shortDescription}</p> : null}

                </Col>
              </Row>

              <Row>
                <Col xs="12">

                  {IsEmpty(titleSuggestion.titleURL) === false ? <p>{titleSuggestion.titleURL}</p> : null}

                </Col>
              </Row>

              <Row>
                <Col xs="12">

                  <p>Suggested by {IsEmpty(titleSuggestion.firstName) === false ? titleSuggestion.firstName : null} {IsEmpty(titleSuggestion.lastName) === false ? titleSuggestion.lastName : null} {IsEmpty(titleSuggestion.emailAddress) === false ? titleSuggestion.emailAddress : null} {IsEmpty(titleSuggestion.updateDate) === false ? <small>on {DisplayDate(titleSuggestion.updateDate)}</small> : null}</p>

                </Col>
              </Row>

            </Col>
          );
        })}

      </Row>
    </Container>
  );
};

export default TitleSuggestions;
