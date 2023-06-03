import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray, displayYear, truncateText } from "shared-functions";
import { encodeURL, decodeURL, setLocalPath, setLocalImagePath } from "../../utilities/ApplicationFunctions";

const TitleCard = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: additionalText, headerText, imageSide, linkName, randomTitle, showShortDescription -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "TitleCard";

  const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const profileType = useSelector(state => state.applicationSettings.profileType);

  // const sessionToken = useSelector(state => state.user.sessionToken);
  // const admin = useSelector(state => state.user.admin);

  const arrayTitles = useSelector(state => state.titles.arrayTitles);

  let additionalText = isEmpty(props) === false && isEmpty(props.additionalText) === false ? props.additionalText : "";
  let headerText = isEmpty(props) === false && isEmpty(props.headerText) === false ? props.headerText : "";
  let imageSide = isEmpty(props) === false && isEmpty(props.imageSide) === false ? props.imageSide : "left";
  let linkName = isEmpty(props) === false && isEmpty(props.linkName) === false ? props.linkName : "";
  let randomTitle = isEmpty(props) === false && isEmpty(props.randomTitle) === false ? props.randomTitle : false;
  let showShortDescription = isEmpty(props) === false && isEmpty(props.showShortDescription) === false ? props.showShortDescription : "";

  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  // const [titleParam, setTitleParam] = useState(null);
  const [titleList, setTitleList] = useState([]);


  useEffect(() => {

    let newTitleParam = null;

    if (isEmpty(linkName) === false) {

      newTitleParam = linkName;

    };

    // * Only show title in certain categories or by certain authors
    // const randomTitleList = arrayTitles.filter(title => title.authorLastName === "Dick" && title.authorFirstName === "Philip K." && (title.category === "Novels" || title.category === "Short Story Collections" || title.category === "Non Fiction"));
    const randomTitleList = arrayTitles.filter(title => (title.titleActive === true || title.titleActive === 1) && title.authorLastName === "Dick" && title.authorFirstName === "Philip K.");

    if (randomTitle === true) {

      newTitleParam = Math.floor(Math.random() * randomTitleList.length);

    };

    let newTitleList = [];

    // * If newTitleParam is a number, then it's the titleID
    if (isNaN(newTitleParam) === false) {

      if (randomTitle === true) {

        // * Active titles were filtered out above
        newTitleList = randomTitleList.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleID === parseInt(newTitleParam));

      } else {

        newTitleList = arrayTitles.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleID === parseInt(newTitleParam));

      };

    } else if (isEmpty(newTitleParam) === false) {

      // * If newTitleParam is not a number, then it's the title name
      newTitleList = arrayTitles.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleURL === newTitleParam);

    } else {

      // console.error("Title not found.");
      // * Display all active titles
      // newTitleList = [...arrayTitles];

    };

    // setTitleParam(newTitleParam);

    setTitleList(newTitleList);

  }, [linkName, arrayTitles, randomTitle]);


  useEffect(() => {

    if (isEmpty(titleList) === false) {

      clearMessages();

    } else {

      // addErrorMessage("Title not found.");

    };

  }, [titleList]);


  return (
    <Container className="mt-4">

      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      {isNonEmptyArray(titleList) === true ?

        <React.Fragment>

          <Row className="justify-content-center">
            <Col className="text-center" xs="12">

              {isEmpty(headerText) === false ? <h4 className="text-center">{headerText}</h4> : null}

            </Col>
          </Row>

          <Row className="justify-content-center">

            {titleList.map((title) => {

              return (
                <Col key={title.titleID} xs="8" className="mb-4">
                  <Card>
                    <Row className="no-gutters">

                      {imageSide === "left" ?

                        <Col className="col-md-4">

                          <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>
                            {isEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName, profileType)} alt={title.titleName} /> : <Image className="no-image-icon" />}
                          </Link>

                        </Col>

                        : null}

                      <Col className="col-md-8">
                        <CardBody>

                          {/* <CardText><Link to={title.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category}</Link></CardText> */}

                          <CardText><Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>{title.titleName}</Link>

                            {isEmpty(title.publicationDate) === false ? <span className="ms-1 smaller-text">({displayYear(title.publicationDate)})</span> : null}</CardText>

                          <CardText className="smaller-text">{title.authorFirstName} {title.authorLastName}</CardText>

                          {isEmpty(additionalText) === false ? <CardText className="my-4">{additionalText}</CardText> : null}

                          {showShortDescription === true && isEmpty(title.shortDescription) === false ? <p className="my-4 display-paragraphs">{truncateText(title.shortDescription, 250)}</p> : null}

                        </CardBody>
                      </Col>

                      {imageSide === "right" ?

                        <Col className="col-md-4">

                          <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>
                            {isEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName, profileType)} alt={title.titleName} /> : <Image className="no-image-icon" />}
                          </Link>

                        </Col>

                        : null}

                    </Row>
                    <CardFooter className="card-footer">

                      <CardText><Link to={encodeURL(titleList[0].category)} onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(titleList[0].category)); }}>{titleList[0].category}</Link></CardText>

                    </CardFooter>
                  </Card>

                </Col>
              );
            })}

          </Row>

        </React.Fragment>

        : null}

    </Container>
  );
};

export default TitleCard;
