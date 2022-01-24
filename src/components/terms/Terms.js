import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem, NavLink } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import applicationSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty, DisplayYear } from "../../utilities/SharedFunctions";
import { encodeURL, decodeURL, setLocalPath, setLocalImagePath, LogError } from "../../utilities/ApplicationFunctions";
import { setPageURL } from "../../app/urlsSlice";
import TitleCard from "../titles/TitleCard";

const Terms = (props) => {

  const componentName = "Terms.js";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [terms, setTerms] = useState([]);
  const [term, setTerm] = useState({});
  const [termCategories, setTermCategories] = useState([]);
  const [termSynonyms, setTermSynonyms] = useState([]);
  const [termAlternateForms, setTermAlternateForms] = useState([]);
  const [termTitles, setTermTitles] = useState([]);

  let previousCategoryID = 0;
  let previousSynonymID = 0;
  let previousAlternateFormID = 0;

  const getTerms = () => {

    let url = baseURL + "terms/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        // console.log(componentName, GetDateTime(), "getTerms response", response);

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getTerms results", results);

        if (IsEmpty(results) === false && results.transactionSuccess === true) {

          // console.log(componentName, GetDateTime(), "getTerms results.records[0]", results.records[0]);

          setTerms(results.records);
          // setTerms(results.records[0]);

        };

      })
      .catch((error) => {
        // console.error(componentName, GetDateTime(), "getTerms error", error);

        setErrorMessage(error.name + ": " + error.message);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const getTerm = (termID) => {

    let url = baseURL + `terms/${termID}`;

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        // console.log(componentName, GetDateTime(), "getTerm response", response);

        if (!response.ok) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getTerm results", results);

        if (IsEmpty(results) === false && results.transactionSuccess === true) {

          // console.log(componentName, GetDateTime(), "getTerm results.records[0]", results.records[0]);

          // setTerm(results.records);
          setTerm(results.records[0]);

          setTermCategories(results.records.sort());
          setTermSynonyms(results.records.sort());
          setTermAlternateForms(results.records.sort());

          setTermTitles(results.records);


        };

      })
      .catch((error) => {
        // console.error(componentName, GetDateTime(), "getTerm error", error);

        setErrorMessage(error.name + ": " + error.message);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

    getTerms();

  }, []);


  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);

    // * Scroll to top of the page after clicking the link. -- 08/05/2021 MF
    window.scrollTo(0, 0);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

  };


  // useEffect(() => {
  //   // console.log(componentName, GetDateTime(), "useEffect check for admin", admin);

  //   if (admin !== true) {

  //     navigate("/");

  //   };

  // }, [admin]);


  return (
    <Container className="mt-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      <Row>
        <Col xs="12">

          <h4 className="text-center mb-4">Terms</h4>

          {terms.map((term, index) => {

            return (
              <React.Fragment key={index}>

                {index !== 0 ?

                  <React.Fragment>,&nbsp;</React.Fragment>

                  : null}

                <a href="#" onClick={(event) => { event.preventDefault(); getTerm(term.termID); }}>{term.term}</a>

              </React.Fragment>
            );
          })}

        </Col>
      </Row>

      {IsEmpty(term) === false ?

        <React.Fragment>

          <Row className="mt-3">
            <Col xs="12">

              <h4>{term.term}</h4>
              <p>({term.partOfSpeech}) {term.definition}</p>

              {IsEmpty(term.parentTermID) === false ?

                <p>Parent Term: <a href="#" onClick={(event) => { event.preventDefault(); getTerm(term.parentTermID); }}>{term.termParent}</a></p>

                : null}

              <h5>Categories:</h5>

              <p>

                {termCategories.map((termCategory, index) => {

                  let newCategory = previousCategoryID !== termCategory.termCategoryID ? true : false;

                  previousCategoryID = termCategory.termCategoryID;

                  return (
                    <React.Fragment key={index}>

                      {IsEmpty(termCategory.termCategory) === false && newCategory === true ?

                        <React.Fragment>

                          {index !== 0 ?

                            <React.Fragment>,&nbsp;</React.Fragment>

                            : null}

                          {termCategory.termCategory}

                        </React.Fragment>

                        : null}

                    </React.Fragment>
                  );
                })}

              </p>

              <h5>Alternate Forms:</h5>

              <p>

                {termAlternateForms.map((alternateForm, index) => {

                  let newAlternateForm = previousAlternateFormID !== alternateForm.alternateFormID ? true : false;

                  previousAlternateFormID = alternateForm.alternateFormID;

                  return (
                    <React.Fragment key={index}>

                      {IsEmpty(alternateForm.alternateFormID) === false && newAlternateForm === true ?

                        <React.Fragment>

                          {index !== 0 ?

                            <React.Fragment>,&nbsp;</React.Fragment>

                            : null}

                          <a href="#" onClick={(event) => { event.preventDefault(); getTerm(alternateForm.alternateFormID); }}>{alternateForm.termsAlternateForm}</a>

                        </React.Fragment>

                        : null}

                    </React.Fragment>
                  );
                })}

              </p>
              <h5>Synonyms:</h5>

              <p>

                {termSynonyms.map((termSynonym, index) => {

                  let newSynonym = previousSynonymID !== termSynonym.synonymID ? true : false;

                  previousSynonymID = termSynonym.synonymID;

                  return (
                    <React.Fragment key={index}>

                      {IsEmpty(termSynonym.synonymID) === false && newSynonym === true ?

                        <React.Fragment>

                          {index !== 0 ?

                            <React.Fragment>,&nbsp;</React.Fragment>

                            : null}

                          <a href="#" onClick={(event) => { event.preventDefault(); getTerm(termSynonym.synonymID); }}>{termSynonym.termsSynonym}</a>

                        </React.Fragment>

                        : null}

                    </React.Fragment>
                  );
                })}

              </p>

            </Col>
          </Row>

          <Row className="mt-3">

            {termTitles.map((termTitle, index) => {

              return (
                <React.Fragment>

                  <TitleCard linkName={termTitle.titleURL} imageSide="right" />

                  {/* <Col key={termTitle.titleID} xs="6" className="mb-4">

                    <Link to={termTitle.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(termTitle.titleURL); }}>{termTitle.titleName}</Link>

                    {IsEmpty(termTitle.publicationDate) === false ? <span className="ms-1 smaller-text">({DisplayYear(termTitle.publicationDate)})</span> : null}

                    <Link to={termTitle.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(termTitle.titleURL); }}>

                      {IsEmpty(termTitle.imageName) === false ? <Image onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + termTitle.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(termTitle.imageName)} alt={termTitle.titleName} /> : <Image className="no-image-icon" />}

                    </Link>

                  </Col> */}

                </React.Fragment>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

    </Container >
  );
};

export default Terms;