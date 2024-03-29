import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, Alert } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray, displayDate, getFirstItem, parse } from "shared-functions";
import { encodeURL, setLocalImagePath } from "../../utilities/ApplicationFunctions";
import EditEdition from "../editions/EditEdition";
import amazonLogo from "../../assets/images/available_at_amazon_en_vertical.png";

const Edition = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: titleID -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "Edition";

  const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const profileType = useSelector(state => state.applicationSettings.profileType);

  // const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const electronicOnly = useSelector(state => state.applicationSettings.electronicOnly);
  const userElectronicOnly = useSelector(state => state.applicationSettings.userElectronicOnly);
  const electronicOnlyMessage = useSelector(state => state.applicationSettings.electronicOnlyMessage);
  const physicalOnly = useSelector(state => state.applicationSettings.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.applicationSettings.userPhysicalOnly);
  const physicalOnlyMessage = useSelector(state => state.applicationSettings.physicalOnlyMessage);

  const arrayEditions = useSelector(state => state.editions.arrayEditions);
  const arrayTitles = useSelector(state => state.titles.arrayTitles);

  let titleID = isEmpty(props) === false && isEmpty(props.titleID) === false ? props.titleID : null;

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

  const [titleItem, setTitleItem] = useState({});
  const [editionList, setEditionList] = useState([]);


  useEffect(() => {

    let newEditionList = [...arrayEditions];

    let titleItemArray = [];
    let newTitleItem = {};

    if (isEmpty(titleID) === false && !isNaN(titleID) === true) {

      newEditionList = newEditionList.filter(edition => edition.titleID === titleID);
      titleItemArray = arrayTitles.filter(title => title.titleID === titleID);
      newTitleItem = getFirstItem(titleItemArray);

    };

    if (electronicOnly === true || userElectronicOnly === true) {

      // newEditionList = newEditionList.filter(edition => edition.medium.electronic === true);
      newEditionList = newEditionList.filter(edition => edition.electronic === true || edition.electronic === 1);

    } else if (physicalOnly === true || userPhysicalOnly === true) {

      // newEditionList = newEditionList.filter(edition => edition.medium.electronic === false);
      newEditionList = newEditionList.filter(edition => edition.electronic === false || edition.electronic === 0);

    } else {

      newEditionList = [...newEditionList];

    };

    if (isEmpty(admin) === false && admin === true) {

      newEditionList = [...newEditionList];

    } else {

      newEditionList = newEditionList.filter(edition => edition.editionActive === true || edition.editionActive === 1);

    };

    // * Sort the newEditionList array by media.sortID
    // newEditionList.sort((a, b) => (a.medium.sortID > b.medium.sortID) ? 1 : -1);
    newEditionList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

    setTitleItem(newTitleItem);

    setEditionList(newEditionList);

  }, [arrayTitles, arrayEditions, titleID, admin]);


  useEffect(() => {

    if (isEmpty(editionList) === false) {

      clearMessages();

    } else {

      addErrorMessage("No editions found.");

    };

  }, [editionList]);


  // ! This doesn't work. The function needs to stay contained within the img tag. -- 03/06/2021 MF
  // const onLoadError = () => {

  //   console.error(componentName, getDateTime(), "onLoadError");

  // };


  return (
    <Container className="my-4">

      {/* {isEmpty(editionList) === false ? */}

      <Row className="my-4">
        <Col xs="12">

          <h5 className="text-center">Find A Copy</h5>

        </Col>
      </Row>
      <Row className="my-4">
        <Col className="text-center" xs="12">

          <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

          {electronicOnly === true || userElectronicOnly === true ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}
          {physicalOnly === true || userPhysicalOnly === true ? <Alert color="info">{physicalOnlyMessage}</Alert> : null}

        </Col>
      </Row>

      {/* : null} */}

      {isNonEmptyArray(editionList) === true ?

        <Row>
          {editionList.map((edition) => {

            // * let newWindow = window.open("http://localhost:4000/editions/broken"); newWindow.close();
            // * let newWindow = window.open('http://localhost:4000/editions/broken'); newWindow.close();

            // * fetch('http://localhost:4000/editions/broken', {method: 'GET', headers: new Headers({'Content-Type': 'application/json'})});

            // let brokenURLText = "fetch('" + baseURL + "editions/broken/" + edition.editionID + "', {method: 'GET', headers: new Headers({'Content-Type': 'application/json'})});";
            // let brokenURLReplaceText = "<img onError=\"console.error('Edition image not loaded!'); " + brokenURLText + "\" ";

            let activeString = "";

            if (edition.editionActive === true || edition.editionActive === 1) {

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

                    {isEmpty(edition.imageLinkLarge) === false ? 
                    
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />

                    :
                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer nofollow">

                        {isEmpty(edition.imageName) === false ? <img src={setLocalImagePath(edition.imageName, profileType)} alt={titleItem.titleName + " is available for purchase at Amazon.com"} className="edition-image" /> : <Image className="no-image-icon"/>}

                        </a>

                    }

                    </CardBody>
                    <CardFooter>

                        {isEmpty(edition.editionPublicationDate) === false ? <CardText>Released: {displayDate(editionPublicationDate)}</CardText> : null}

                    </CardFooter>
                    </Card> */ }

                <Card key={edition.editionID}>

                  {isEmpty(activeString) === false ?

                    <CardHeader className="card-header inactive-item">
                      ({activeString})
                    </CardHeader>

                    : null}

                  <Row className="no-gutters">
                    <Col className="col-md-6">

                      {edition.editionActive === true || edition.editionActive === 1 ?

                        <React.Fragment>

                          {isEmpty(edition.imageNameAPI) === false && isEmpty(edition.textLinkFullAPI) === false /* isEmpty(edition.imageLinkLarge) === false */ ?

                            <React.Fragment>

                              {/* <div dangerouslySetInnerHTML={{ "__html": removeOnePixelImage(edition.imageLinkLarge, edition.ASIN).replaceAll("<img ", brokenURLReplaceText) }} /> */}
                              {/* {parse(removeOnePixelImage(edition.imageLinkLarge, edition.ASIN).replaceAll("<img ", brokenURLReplaceText))} */}

                              <a href={edition.textLinkFullAPI} target="_blank" rel="noopener noreferrer nofollow">
                                {isEmpty(edition.imageNameAPI) === false ? <img src={edition.imageNameAPI} alt={titleItem.titleName + " is available for purchase."} className="edition-image" onError={(event) => { console.error("Edition image not loaded!"); fetch(baseURL + "editions/broken/" + edition.editionID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} /> : <Image className="no-image-icon" />}
                              </a>

                            </React.Fragment>

                            :

                            <React.Fragment>

                              {isEmpty(edition.imageName) === false && isEmpty(edition.textLinkFull) === false ?

                                <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer nofollow">
                                  {isEmpty(edition.imageName) === false ? <img src={setLocalImagePath(edition.imageName, profileType)} alt={titleItem.titleName + " is available for purchase."} className="edition-image" /> : <Image className="no-image-icon" />}
                                </a>

                                : null}

                            </React.Fragment>

                          }

                        </React.Fragment>

                        : null}

                    </Col>
                    <Col className="col-md-6">
                      <CardBody>

                        {isEmpty(edition.editionPublicationDate) === false ? <CardText className="smaller-text">Released: {displayDate(edition.editionPublicationDate)}</CardText> : null}

                        {/* {isEmpty(edition.textLinkFull) === false && (edition.textLinkFull.includes("amzn.to") === true || edition.textLinkFull.includes("amazon.com") === true || edition.textLinkFull.includes("ws-na.amazon-adsystem.com") === true) ?

                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer nofollow">
                          <img src={amazonLogo} alt={titleItem.titleName + " is available for purchase at Amazon.com."} className="purchase-image my-2" /><br />
                        </a>

                        :

                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer nofollow">
                          <p className="my-2">Find Copy</p>
                        </a>

                      } */ }

                        {isEmpty(edition.textLinkFullAPI) === false ?

                          <a href={edition.textLinkFullAPI} target="_blank" rel="noopener noreferrer nofollow">
                            <img src={amazonLogo} alt={titleItem.titleName + " is available for purchase at Amazon.com."} className="purchase-image my-2" /><br />
                          </a>

                          :

                          <React.Fragment>

                            {isEmpty(edition.textLinkFullAPI) === false ?

                              <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer nofollow">
                                <p className="my-2">Find Copy</p>
                              </a>

                              : null}

                          </React.Fragment>

                        }

                      </CardBody>
                    </Col>
                  </Row>

                  {isEmpty(admin) === false && admin === true ?

                    <Row>

                      <EditEdition editionID={edition.editionID} titlePublicationDate={edition.titlePublicationDate} titleImageName={edition.titleImageName} />

                    </Row>

                    : null}

                  <CardFooter className="card-footer">

                    <CardText><Link to={encodeURL(edition.media)} onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(edition.media)); }}>{edition.media}</Link></CardText>

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

export default Edition;
