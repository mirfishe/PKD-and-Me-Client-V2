import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem, NavLink } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, isNonEmptyArray, displayValue, hasNonEmptyProperty, displayYear } from "shared-functions";
import { encodeURL, decodeURL, setLocalPath, setLocalImagePath, addErrorLog } from "../../utilities/ApplicationFunctions";
import { setPageURL } from "../../app/urlsSlice";
import TitleCard from "../titles/TitleCard";

const Terms = (props) => {

  const componentName = "Terms";

  const dispatch = useDispatch();
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

        if (response.ok !== true) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {


          setTerms(results.records);
          // setTerms(results.records[0]);

        };

      })
      .catch((error) => {
        // console.error(componentName, getDateTime(), "getTerms error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

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

        if (response.ok !== true) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {


          // setTerm(results.records);
          setTerm(results.records[0]);

          setTermCategories(results.records.sort());
          setTermSynonyms(results.records.sort());
          setTermAlternateForms(results.records.sort());

          setTermTitles(results.records);


        };

      })
      .catch((error) => {
        // console.error(componentName, getDateTime(), "getTerm error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  useEffect(() => {

    getTerms();

  }, []);


  const redirectPage = (linkName) => {

    // * Scroll to top of the page after clicking the link. -- 08/05/2021 MF
    window.scrollTo(0, 0);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

  };


  // useEffect(() => {

  //   if (admin !== true) {

  //     navigate("/");

  //   };

  // }, [admin]);


  return (
    <Container className="mt-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      {isNonEmptyArray(terms) === true ?

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

        : null}

      {isEmpty(term) === false ?

        <React.Fragment>

          <Row className="mt-3">
            <Col xs="12">

              <h4>{term.term}</h4>
              <p>({term.partOfSpeech}) {term.definition}</p>

              {isEmpty(term.parentTermID) === false ?

                <p>Parent Term: <a href="#" onClick={(event) => { event.preventDefault(); getTerm(term.parentTermID); }}>{term.termParent}</a></p>

                : null}

              <h5>Categories:</h5>

              {isNonEmptyArray(termCategories) === true ?

                <p>

                  {termCategories.map((termCategory, index) => {

                    let newCategory = previousCategoryID !== termCategory.termCategoryID ? true : false;

                    previousCategoryID = termCategory.termCategoryID;

                    return (
                      <React.Fragment key={index}>

                        {isEmpty(termCategory.termCategory) === false && newCategory === true ?

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

                : null}

              <h5>Alternate Forms:</h5>

              {isNonEmptyArray(termAlternateForms) === true ?

                <p>

                  {termAlternateForms.map((alternateForm, index) => {

                    let newAlternateForm = previousAlternateFormID !== alternateForm.alternateFormID ? true : false;

                    previousAlternateFormID = alternateForm.alternateFormID;

                    return (
                      <React.Fragment key={index}>

                        {isEmpty(alternateForm.alternateFormID) === false && newAlternateForm === true ?

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

                : null}

              <h5>Synonyms:</h5>

              {isNonEmptyArray(termSynonyms) === true ?

                <p>

                  {termSynonyms.map((termSynonym, index) => {

                    let newSynonym = previousSynonymID !== termSynonym.synonymID ? true : false;

                    previousSynonymID = termSynonym.synonymID;

                    return (
                      <React.Fragment key={index}>

                        {isEmpty(termSynonym.synonymID) === false && newSynonym === true ?

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

                : null}

            </Col>
          </Row>

          {isNonEmptyArray(termTitles) === true ?

            <Row className="mt-3">

              {termTitles.map((termTitle, index) => {

                return (
                  <React.Fragment>

                    <TitleCard linkName={termTitle.titleURL} imageSide="right" />

                    {/* <Col key={termTitle.titleID} xs="6" className="mb-4">

                    <Link to={termTitle.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(termTitle.titleURL); }}>{termTitle.titleName}</Link>

                    {isEmpty(termTitle.publicationDate) === false ? <span className="ms-1 smaller-text">({displayYear(termTitle.publicationDate)})</span> : null}

                    <Link to={termTitle.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(termTitle.titleURL); }}>

                      {isEmpty(termTitle.imageName) === false ? <Image onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + termTitle.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(termTitle.imageName)} alt={termTitle.titleName} /> : <Image className="no-image-icon" />}

                    </Link>

                  </Col> */}

                  </React.Fragment>
                );
              })}

            </Row>

            : null}

        </React.Fragment>

        : null}

    </Container >
  );
};

export default Terms;
