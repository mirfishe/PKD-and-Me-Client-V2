import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import { displayYear, encodeURL, decodeURL, truncateText, setLocalPath, setLocalImagePath } from "../../app/sharedFunctions";
import { setPageURL } from "../../app/urlsSlice";
import AddTitle from "./AddTitle";
import EditTitle from "./EditTitle";
import AddEdition from "../editions/AddEdition";

const TitleCard = (props) => {

  const componentName = "TitleCard.js";

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, "admin", admin);

  const [errTitleMessage, setErrTitleMessage] = useState("");

  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, "titleListState", titleListState);

  let imageSide = "left";
  if (props.imageSide !== undefined && props.imageSide !== "") {
    imageSide = props.imageSide;
  } else {
    imageSide = "left";
  };
  // console.log(componentName, "props.imageSide", props.imageSide);
  // console.log(componentName, "imageSide", imageSide);

  const showShortDescription = props.showShortDescription;
  // console.log(componentName, "props.showShortDescription", props.showShortDescription);
  // console.log(componentName, "typeof props.showShortDescription", typeof props.showShortDescription);

  const headerText = props.headerText;
  // console.log(componentName, "props.headerText", props.headerText);

  const additionalText = props.additionalText;
  // console.log(componentName, "props.additionalText", props.additionalText);

  let titleParam = props.linkName;
  // console.log(componentName, "typeof titleParam", typeof titleParam);
  // console.log(componentName, "titleParam", titleParam);

  const randomTitle = props.randomTitle;
  // console.log(componentName, "props.randomTitle", props.randomTitle);
  // console.log(componentName, "typeof props.randomTitle", typeof props.randomTitle);

  // * Only show title in certain categories or by certain authors
  // const randomTitleList = titleListState.filter(title => title.authorLastName === "Dick" && title.authorFirstName === "Philip K." && (title.category.category === "Novels" || title.category.category === "Short Story Collections" || title.category.category === "Non Fiction"));
  const randomTitleList = titleListState.filter(title => title.active === true && title.authorLastName === "Dick" && title.authorFirstName === "Philip K.");

  if (randomTitle) {
    titleParam = Math.floor(Math.random() * randomTitleList.length);
  };

  let titleList = [];
  if (!isNaN(titleParam)) {
    // * If titleParam is a number, then it's the titleID
    if (randomTitle) {
      // * Active titles were filtered out above
      titleList = randomTitleList.filter(title => title.active === true && title.titleID === parseInt(titleParam));
      // console.log(componentName, "randomTitle titleParam", titleParam);
      // console.log(componentName, "randomTitle titleList", titleList);
    } else {
      titleList = titleListState.filter(title => title.active === true && title.titleID === parseInt(titleParam));
    };
  } else if (titleParam !== undefined) {
    // * If titleParam is not a number, then it's the title name
    titleList = titleListState.filter(title => title.active === true && title.titleURL === titleParam);
  } else {
    // console.log("Title not found.");
    // * Display all active titles
    // titleList = [...titleListState];
  };

  const redirectPage = (linkName) => {
    // console.log(componentName, "redirectPage", linkName);
    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);
  };

  useEffect(() => {
    // console.log(componentName, "useEffect titleList", titleList);
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
          {errTitleMessage !== undefined && errTitleMessage !== null && errTitleMessage !== "" ? <Alert color="danger">{errTitleMessage}</Alert> : null}
          {headerText !== undefined && headerText !== null && headerText !== "" ? <h4 className="text-center">{headerText}</h4> : null}
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
                      <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(title.titleURL); }}>
                        {title.imageName !== null && title.imageName !== undefined && title.imageName !== "" ? <CardImg src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="noImageIcon" />}
                      </Link>
                    </Col>
                    : null}

                  <Col className="col-md-8">
                    <CardBody>
                      {/* <CardText><Link to={title.category.category.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category.category}</Link></CardText> */}
                      <CardText><Link to={title.titleURL} onClick={(event) => { event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(title.titleURL); }}>{title.titleName}</Link>
                        {title.publicationDate !== null ? <span className="ml-1 smallerText">({displayYear(title.publicationDate)})</span> : null}</CardText>
                      <CardText className="smallerText">{title.authorFirstName} {title.authorLastName}</CardText>
                      {additionalText !== undefined && additionalText !== "" ? <CardText className="my-4">{additionalText}</CardText> : null}
                      {showShortDescription && title.shortDescription !== "" && title.shortDescription !== null ? <p className="my-4 displayParagraphs">{truncateText(title.shortDescription, 250)}</p> : null}
                      {/* {admin !== undefined && admin !== null && admin === true ? <AddTitle displayButton={true} /> : null}
                                {admin !== undefined && admin !== null && admin === true ? <EditTitle titleID={title.titleID} displayButton={true} /> : null}
                                {admin !== undefined && admin !== null && admin === true ? <AddEdition titleID={title.titleID} titlePublicationDate={title.publicationDate} displayButton={true} /> : null} */}
                    </CardBody>
                  </Col>

                  {imageSide === "right" ?
                    <Col className="col-md-4">
                      <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(title.titleURL); }}>
                        {title.imageName !== null && title.imageName !== undefined && title.imageName !== "" ? <CardImg src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="noImageIcon" />}
                      </Link>
                    </Col>
                    : null}

                </Row>
                <CardFooter className="cardFooter">
                  <CardText><Link to={encodeURL(titleList[0].category.category)} onClick={(event) => { event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(titleList[0].category.category)); }}>{titleList[0].category.category}</Link></CardText>
                </CardFooter>
              </Card>

            </Col>
          )
        })}
      </Row>
    </Container>
  );

};

export default TitleCard;
