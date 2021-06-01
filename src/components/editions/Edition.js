import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, Alert } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import { IsEmpty, DisplayValue, GetDateTime, DisplayDate, DisplayYear, encodeURL, decodeURL, removeOnePixelImage, setLocalPath, setLocalImagePath } from "../../app/sharedFunctions";
import { setPageURL } from "../../app/urlsSlice";
import AddEdition from "../editions/AddEdition";
import EditEdition from "../editions/EditEdition";

const Edition = (props) => {

  const componentName = "Edition.js";

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  const electronicOnly = useSelector(state => state.app.electronicOnly);
  const userElectronicOnly = useSelector(state => state.app.userElectronicOnly);
  const electronicOnlyMessage = useSelector(state => state.app.electronicOnlyMessage);
  const physicalOnly = useSelector(state => state.app.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.app.userPhysicalOnly);
  const physicalOnlyMessage = useSelector(state => state.app.physicalOnlyMessage);

  const [editionMessage, setEditionMessage] = useState("");
  const [errEditionMessage, setErrEditionMessage] = useState("");
  const [editionResultsFound, setEditionResultsFound] = useState(null);

  const editionsState = useSelector(state => state.editions.arrayEditions);
  // console.log(componentName, GetDateTime(), "editionsState", editionsState);

  let editionList = [...editionsState];

  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, GetDateTime(), "titleListState", titleListState);

  let titleItemArray = [];
  let titleItem = {};

  if (IsEmpty(props.titleID) === false && !isNaN(props.titleID)) {
    editionList = editionList.filter(edition => edition.titleID === props.titleID);
    titleItemArray = titleListState.filter(title => title.titleID === props.titleID);
    titleItem = titleItemArray[0];
  };

  // console.log(componentName, GetDateTime(), "props.titleID", props.titleID);
  // console.log(componentName, GetDateTime(), "titleItem", titleItem);

  if (electronicOnly === true || userElectronicOnly === true) {
    // editionList = editionList.filter(edition => edition.medium.electronic === true);
    editionList = editionList.filter(edition => edition.electronic === true);
  } else if (physicalOnly === true || userPhysicalOnly === true) {
    // editionList = editionList.filter(edition => edition.medium.electronic === false);
    editionList = editionList.filter(edition => edition.electronic === false);
  } else {
    editionList = [...editionList];
  };

  if (IsEmpty(admin) === false && admin === true) {
    editionList = [...editionList];
  } else {
    editionList = editionList.filter(edition => edition.active === true);
  };
  // console.log(componentName, GetDateTime(), "editionList", editionList);

  // * Sort the editionList array by media.sortID
  // console.log(componentName, GetDateTime(), "editionList", editionList);
  // editionList.sort((a, b) => (a.medium.sortID > b.medium.sortID) ? 1 : -1);
  editionList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

  // console.log(componentName, GetDateTime(), "editionList", editionList);

  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);
    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);
  };

  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect editionList", editionList);
    if (editionList.length > 0) {
      setErrEditionMessage("");
    } else {
      setErrEditionMessage("No editions found.");
    };
  }, [editionList]);

  return (
    <Container className="my-4">
      {/* {editionList.length > 0 ? */}
      <Row className="my-4">
        <Col xs="12">
          <h5 className="text-center">Find A Copy
                    {IsEmpty(admin) === false && admin === true && IsEmpty(titleItem) === false ? <AddEdition titleID={titleItem.titleID} titlePublicationDate={titleItem.publicationDate} displayButton={true} /> : null}
          </h5>
        </Col>
      </Row>
      <Row className="my-4">
        <Col className="text-center" xs="12">
          {IsEmpty(errEditionMessage) === false ? <Alert color="danger">{errEditionMessage}</Alert> : null}
          {electronicOnly === true || userElectronicOnly === true ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}
          {physicalOnly === true || userPhysicalOnly === true ? <Alert color="info">{physicalOnlyMessage}</Alert> : null}
        </Col>
      </Row>
      {/* : null} */}
      <Row>
        {editionList.map((edition) => {

          let activeString = "";
          if (edition.active === true) {
            // activeString = "Active";
            activeString = "";
          } else {
            activeString = "Inactive";
          };

          return (
            <Col key={edition.editionID} xs="6" className="mb-4">

              {/* <Card key={edition.editionID}>
                    <CardHeader>
                        <Link to={encodeURL(edition.medium.media)}>{edition.medium.media}</Link>
                    </CardHeader>
                    <CardBody>
                    {IsEmpty(edition.imageLinkLarge) === false ? 
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />
                    :
                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                        {IsEmpty(edition.imageName) === false ? <img src={setLocalImagePath(edition.imageName)} alt="" className="editionImage" /> : <Image className="noImageIcon"/>}
                        </a>
                    }
                    </CardBody>
                    <CardFooter>
                        {IsEmpty(edition.editionPublicationDate) === false ? <CardText>Released: {DisplayDate(editionPublicationDate)}</CardText> : null}
                    </CardFooter>
                    </Card> */}

              <Card key={edition.editionID}>
                {IsEmpty(activeString) === false ?
                  <CardHeader className="cardHeader inactiveItem">
                    ({activeString})
                        </CardHeader>
                  : null}
                <Row className="no-gutters">
                  <Col className="col-md-6">
                    {IsEmpty(edition.imageLinkLarge) === false ?
                      <div dangerouslySetInnerHTML={{ "__html": removeOnePixelImage(edition.imageLinkLarge, edition.ASIN) }} />
                      :
                      <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                        {IsEmpty(edition.imageName) === false ? <img src={setLocalImagePath(edition.imageName)} alt="" className="editionImage" /> : <Image className="noImageIcon" />}
                      </a>
                    }
                  </Col>
                  <Col className="col-md-6">
                    <CardBody>
                      {IsEmpty(edition.editionPublicationDate) === false ? <CardText className="smallerText">Released: {DisplayDate(edition.editionPublicationDate)}</CardText> : null}
                      {IsEmpty(admin) === false && admin === true ? <EditEdition editionID={edition.editionID} titlePublicationDate={titleItem.titlePublicationDate} displayButton={true} /> : null}
                    </CardBody>
                  </Col>
                </Row>
                <CardFooter className="cardFooter">
                  <CardText><Link to={encodeURL(edition.media)} onClick={(event) => { event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(edition.media)); }}>{edition.media}</Link></CardText>
                </CardFooter>
              </Card>

            </Col>
          );
        })}
      </Row>
    </Container>
  );

};

export default Edition;
