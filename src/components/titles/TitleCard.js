import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, DisplayYear, TruncateText } from "../../utilities/SharedFunctions";
import { encodeURL, decodeURL, setLocalPath, setLocalImagePath } from "../../utilities/AppFunctions";
import { setPageURL } from "../../app/urlsSlice";
// import AddTitle from "./AddTitle";
// import EditTitle from "./EditTitle";
// import AddEdition from "../editions/AddEdition";
// import EditEdition from "../editions/EditEdition";

const TitleCard = (props) => {

  const componentName = "TitleCard.js";

  const dispatch = useDispatch();
  const history = useHistory();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

  // const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  // const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  const [errTitleMessage, setErrTitleMessage] = useState("");

  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, GetDateTime(), "titleListState", titleListState);

  let imageSide = "left";

  if (IsEmpty(props.imageSide) === false) {

    imageSide = props.imageSide;

  } else {

    imageSide = "left";

  };

  // console.log(componentName, GetDateTime(), "props.imageSide", props.imageSide);
  // console.log(componentName, GetDateTime(), "imageSide", imageSide);

  const showShortDescription = props.showShortDescription;
  // console.log(componentName, GetDateTime(), "props.showShortDescription", props.showShortDescription);
  // console.log(componentName, GetDateTime(), "typeof props.showShortDescription", typeof props.showShortDescription);

  const headerText = props.headerText;
  // console.log(componentName, GetDateTime(), "props.headerText", props.headerText);

  const additionalText = props.additionalText;
  // console.log(componentName, GetDateTime(), "props.additionalText", props.additionalText);

  let titleParam = props.linkName;
  // console.log(componentName, GetDateTime(), "typeof titleParam", typeof titleParam);
  // console.log(componentName, GetDateTime(), "titleParam", titleParam);

  const randomTitle = props.randomTitle;
  // console.log(componentName, GetDateTime(), "props.randomTitle", props.randomTitle);
  // console.log(componentName, GetDateTime(), "typeof props.randomTitle", typeof props.randomTitle);

  // * Only show title in certain categories or by certain authors
  // const randomTitleList = titleListState.filter(title => title.authorLastName === "Dick" && title.authorFirstName === "Philip K." && (title.category === "Novels" || title.category === "Short Story Collections" || title.category === "Non Fiction"));
  const randomTitleList = titleListState.filter(title => (title.titleActive === true || title.titleActive === 1) && title.authorLastName === "Dick" && title.authorFirstName === "Philip K.");

  if (randomTitle) {

    titleParam = Math.floor(Math.random() * randomTitleList.length);

  };

  let titleList = [];

  if (!isNaN(titleParam)) {

    // * If titleParam is a number, then it's the titleID

    if (randomTitle) {

      // * Active titles were filtered out above
      titleList = randomTitleList.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleID === parseInt(titleParam));
      // console.log(componentName, GetDateTime(), "randomTitle titleParam", titleParam);
      // console.log(componentName, GetDateTime(), "randomTitle titleList", titleList);

    } else {

      titleList = titleListState.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleID === parseInt(titleParam));

    };

  } else if (IsEmpty(titleParam) === false) {

    // * If titleParam is not a number, then it's the title name
    titleList = titleListState.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleURL === titleParam);

  } else {

    // console.error("Title not found.");
    // * Display all active titles
    // titleList = [...titleListState];

  };


  const redirectPage = (linkName) => {

    // console.log(componentName, GetDateTime(), "redirectPage", linkName);
    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);

  };


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect titleList", titleList);

    if (titleList.length > 0) {

      setErrTitleMessage("");

    } else {

      // setErrTitleMessage("Title not found.");

    };

  }, [titleList]);


  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col className="text-center" xs="12">

          {IsEmpty(errTitleMessage) === false ? <Alert color="danger">{errTitleMessage}</Alert> : null}
          {IsEmpty(headerText) === false ? <h4 className="text-center">{headerText}</h4> : null}

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

                      <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(title.titleURL); }}>
                        {IsEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="noImageIcon" />}
                      </Link>

                    </Col>

                    : null}

                  <Col className="col-md-8">
                    <CardBody>

                      {/* <CardText><Link to={title.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category}</Link></CardText> */}

                      <CardText><Link to={title.titleURL} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(title.titleURL); }}>{title.titleName}</Link>

                        {IsEmpty(title.publicationDate) === false ? <span className="ml-1 smallerText">({DisplayYear(title.publicationDate)})</span> : null}</CardText>

                      <CardText className="smallerText">{title.authorFirstName} {title.authorLastName}</CardText>

                      {IsEmpty(additionalText) === false ? <CardText className="my-4">{additionalText}</CardText> : null}

                      {showShortDescription && IsEmpty(title.shortDescription) === false ? <p className="my-4 displayParagraphs">{TruncateText(title.shortDescription, 250)}</p> : null}

                      {/* {IsEmpty(admin) === false && admin === true ? <AddTitle displayButton={true} /> : null}
                                {IsEmpty(admin) === false && admin === true ? <EditTitle titleID={title.titleID} displayButton={true} /> : null}
                                {IsEmpty(admin) === false && admin === true ? <EditEdition titleID={title.titleID} titlePublicationDate={title.publicationDate} titleImageName={title.imageName} displayButton={true} /> : null} */}

                    </CardBody>
                  </Col>

                  {imageSide === "right" ?

                    <Col className="col-md-4">

                      <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(title.titleURL); }}>
                        {IsEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="noImageIcon" />}
                      </Link>

                    </Col>

                    : null}

                </Row>
                <CardFooter className="cardFooter">

                  <CardText><Link to={encodeURL(titleList[0].category)} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(encodeURL(titleList[0].category)); }}>{titleList[0].category}</Link></CardText>

                </CardFooter>
              </Card>

            </Col>
          );
        })}

      </Row>
    </Container>
  );
};

export default TitleCard;
