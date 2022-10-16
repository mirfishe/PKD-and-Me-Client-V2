import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, isNonEmptyArray, displayValue, displayYear, truncateText } from "shared-functions";
import { encodeURL, decodeURL, setLocalPath, setLocalImagePath } from "../../utilities/ApplicationFunctions";
import { setPageURL } from "../../app/urlsSlice";
// import AddTitle from "./AddTitle";
// import EditTitle from "./EditTitle";
// import AddEdition from "../editions/AddEdition";
// import EditEdition from "../editions/EditEdition";

const TitleCard = (props) => {

  const componentName = "TitleCard";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  // const sessionToken = useSelector(state => state.user.sessionToken);
  // const admin = useSelector(state => state.user.admin);

  const [errTitleMessage, setErrTitleMessage] = useState("");

  const titleListState = useSelector(state => state.titles.arrayTitles);

  let imageSide = "left";

  if (isEmpty(props.imageSide) === false) {

    imageSide = props.imageSide;

  } else {

    imageSide = "left";

  };

  const showShortDescription = props.showShortDescription;

  const headerText = props.headerText;

  const additionalText = props.additionalText;

  let titleParam = props.linkName;

  const randomTitle = props.randomTitle;

  // * Only show title in certain categories or by certain authors
  // const randomTitleList = titleListState.filter(title => title.authorLastName === "Dick" && title.authorFirstName === "Philip K." && (title.category === "Novels" || title.category === "Short Story Collections" || title.category === "Non Fiction"));
  const randomTitleList = titleListState.filter(title => (title.titleActive === true || title.titleActive === 1) && title.authorLastName === "Dick" && title.authorFirstName === "Philip K.");

  if (randomTitle) {

    titleParam = Math.floor(Math.random() * randomTitleList.length);

  };

  let titleList = [];

  if (isNaN(titleParam) === false) {

    // * If titleParam is a number, then it's the titleID

    if (randomTitle) {

      // * Active titles were filtered out above
      titleList = randomTitleList.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleID === parseInt(titleParam));

    } else {

      titleList = titleListState.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleID === parseInt(titleParam));

    };

  } else if (isEmpty(titleParam) === false) {

    // * If titleParam is not a number, then it's the title name
    titleList = titleListState.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleURL === titleParam);

  } else {

    // console.error("Title not found.");
    // * Display all active titles
    // titleList = [...titleListState];

  };


  useEffect(() => {

    if (titleList.length > 0) {

      setErrTitleMessage("");

    } else {

      // setErrTitleMessage("Title not found.");

    };

  }, [titleList]);


  const redirectPage = (linkName) => {

    // * Scroll to top of the page after clicking the link. -- 08/05/2021 MF
    window.scrollTo(0, 0);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

  };


  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col className="text-center" xs="12">

          {isEmpty(errTitleMessage) === false ? <Alert color="danger">{errTitleMessage}</Alert> : null}
          {isEmpty(headerText) === false ? <h4 className="text-center">{headerText}</h4> : null}

        </Col>
      </Row>

      {isNonEmptyArray(titleList) === true ?

        <Row className="justify-content-center">

          {titleList.map((title) => {

            return (
              <Col key={title.titleID} xs="8" className="mb-4">
                <Card>
                  <Row className="no-gutters">

                    {imageSide === "left" ?

                      <Col className="col-md-4">

                        <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>
                          {isEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="no-image-icon" />}
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

                        {showShortDescription && isEmpty(title.shortDescription) === false ? <p className="my-4 display-paragraphs">{truncateText(title.shortDescription, 250)}</p> : null}

                        {/* {isEmpty(admin) === false && admin === true ? <AddTitle displayButton={true} /> : null}
                                {isEmpty(admin) === false && admin === true ? <EditTitle titleID={title.titleID} displayButton={true} /> : null}
                                {isEmpty(admin) === false && admin === true ? <EditEdition titleID={title.titleID} titlePublicationDate={title.publicationDate} titleImageName={title.imageName} displayButton={true} /> : null} */}

                      </CardBody>
                    </Col>

                    {imageSide === "right" ?

                      <Col className="col-md-4">

                        <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>
                          {isEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="no-image-icon" />}
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

        : null}

    </Container>
  );
};

export default TitleCard;
