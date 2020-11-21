import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, Alert} from "reactstrap";
import {Image} from "react-bootstrap-icons";
import {displayDate, displayYear, encodeURL, decodeURL, displayParagraphs, removeOnePixelImage, setLocalPath, setLocalImagePath} from "../../app/sharedFunctions";
import {setPageURL} from "../../app/urlsSlice";
import AddEdition from "../editions/AddEdition";
import EditEdition from "../editions/EditEdition";

const Edition = (props) => {

    const componentName = "Edition.js";

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionToken = useSelector(state => state.user.sessionToken);
    // console.log(componentName, "sessionToken", sessionToken);
    const admin = useSelector(state => state.user.admin);
    // console.log(componentName, "admin", admin);

    const electronicOnly = useSelector(state => state.app.electronicOnly);
    const electronicOnlyMessage = useSelector(state => state.app.electronicOnlyMessage);
    const physicalOnly = useSelector(state => state.app.physicalOnly);
    const physicalOnlyMessage = useSelector(state => state.app.physicalOnlyMessage);

    const [editionMessage, setEditionMessage] = useState("");
    const [errEditionMessage, setErrEditionMessage] = useState("");
    const [editionResultsFound, setEditionResultsFound] = useState(null);

    const editionsState = useSelector(state => state.editions.arrayEditions);
    // console.log(componentName, "editionsState", editionsState);

    let editionList = [...editionsState];

    const titleListState = useSelector(state => state.titles.arrayTitles);
    // console.log(componentName, "titleListState", titleListState);

    let titleItem = {};

    if (props.titleID !== undefined && props.titleID !== null && !isNaN(props.titleID)) {
        editionList = editionList.filter(edition => edition.titleID === props.titleID);
        titleItem = titleListState.filter(title => title.titleID === props.titleID);
    };

    if (electronicOnly === true) {
        editionList = editionList.filter(edition => edition.medium.electronic === true);
    } else if (physicalOnly === true) {
        editionList = editionList.filter(edition =>  edition.medium.electronic === false);
    } else {
        editionList = [...editionList];
    };

    if (admin !== undefined && admin !== null && admin === true) {
        editionList = [...editionList];
    } else {
        editionList = editionList.filter(edition => edition.active === true);
    };
    // console.log(componentName, "editionList", editionList);

    // Sort the editionList array by media.sortID
    // console.log(componentName, "editionList", editionList);
    editionList.sort((a, b) => (a.medium.sortID > b.medium.sortID) ? 1 : -1);
    // console.log(componentName, "editionList", editionList);

    const redirectPage = (linkName) => {
        // console.log(componentName, "redirectPage", linkName);
        dispatch(setPageURL(linkName.replaceAll("/", "")));
        history.push("/" + linkName);
    };

    useEffect(() => {
        // console.log(componentName, "useEffect editionList", editionList);
        if (editionList.length > 0) {
            setErrEditionMessage("");
        } else {
            setErrEditionMessage("No editions found.");
        };
    }, [editionList]);

    return(
        <Container className="my-4">
            {/* {editionList.length > 0 ? */}
            <Row className="my-4">
                <Col xs="12">
                    <h5 className="text-center">Find A Copy 
                    {admin !== undefined && admin !== null && admin === true ? <AddEdition titleID={titleItem.titleID} titlePublicationDate={titleItem.titlePublicationDate} displayButton={true} /> : null}
                    </h5>
                </Col>
            </Row>
                <Row className="my-4">
                <Col className="text-center" xs="12">
                {errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
                {electronicOnly ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}
                {physicalOnly ? <Alert color="info">{physicalOnlyMessage}</Alert> : null}
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
                    {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />
                    :
                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                        {edition.imageName !== null && edition.imageName !== undefined && edition.imageName !== "" ? <img src={setLocalImagePath(edition.imageName)} alt="" className="editionImage" /> : <Image className="noImageIcon"/>}
                        </a>
                    }
                    </CardBody>
                    <CardFooter>
                        {edition.publicationDate !== null ? <CardText>Released: {displayDate(edition.publicationDate)}</CardText> : null}
                    </CardFooter>
                    </Card> */}

                    <Card key={edition.editionID}>
                    {activeString !== undefined && activeString !== null && activeString !== "" ?
                        <CardHeader className="cardHeader inactiveItem">
                            ({activeString})
                        </CardHeader>
                    : null}
                    <Row className="no-gutters">
                        <Col className="col-md-6">
                        {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                            <div dangerouslySetInnerHTML={{"__html": removeOnePixelImage(edition.imageLinkLarge, edition.ASIN)}} />
                        :
                            <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                            {edition.imageName !== null && edition.imageName !== undefined && edition.imageName !== "" ? <img src={setLocalImagePath(edition.imageName)} alt="" className="editionImage" /> : <Image className="noImageIcon"/>}
                            </a>
                        }
                        </Col>
                        <Col className="col-md-6">
                            <CardBody>
                                {edition.publicationDate !== null ? <CardText className="smallerText">Released: {displayDate(edition.publicationDate)}</CardText> : null}
                                {admin !== undefined && admin !== null && admin === true ? <EditEdition editionID={edition.editionID} titlePublicationDate={titleItem.titlePublicationDate} displayButton={true} /> : null}
                            </CardBody>
                        </Col>
                    </Row>
                    <CardFooter className="cardFooter">
                        <CardText><Link to={encodeURL(edition.medium.media)} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(edition.medium.media));}}>{edition.medium.media}</Link></CardText>
                    </CardFooter>
                    </Card>

                </Col>
                )
            })}
            </Row>
        </Container>
    );

};

export default Edition;
