import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Image} from 'react-bootstrap-icons';
import {displayDate, displayYear, encodeURL, decodeURL, removeOnePixelImage, setLocalPath, setLocalImagePath} from "../../app/sharedFunctions";
import {setEditionSort} from "../../bibliographyData/editionsSlice";
import {setPageURL} from "../../app/urlsSlice";
import AddEdition from "../editions/AddEdition";
import EditEdition from "../editions/EditEdition";

const Editions = (props) => {

    const componentName = "Editions.js";

    const dispatch = useDispatch();
    const history = useHistory();

    const siteName = useSelector(state => state.app.siteName);
    const appName = useSelector(state => state.app.appName);

    const sessionToken = useSelector(state => state.user.sessionToken);
    // console.log(componentName, "sessionToken", sessionToken);
    const admin = useSelector(state => state.user.admin);
    // console.log(componentName, "admin", admin);

    const editionSort = useSelector(state => state.editions.editionSort);
    const electronicOnly = useSelector(state => state.app.electronicOnly);
    const userElectronicOnly = useSelector(state => state.app.userElectronicOnly);
    const electronicOnlyMessage = useSelector(state => state.app.electronicOnlyMessage);
    const physicalOnly = useSelector(state => state.app.physicalOnly);
    const userPhysicalOnly = useSelector(state => state.app.userPhysicalOnly);
    const physicalOnlyMessage = useSelector(state => state.app.physicalOnlyMessage);

    const [errEditionMessage, setErrEditionMessage] = useState("");

    const editionListState = useSelector(state => state.editions.arrayEditions);
    // console.log(componentName, "editionListState", editionListState);
    const mediaListState = useSelector(state => state.media.arrayMedia);
    // console.log(componentName, "mediaListState", mediaListState);

    // console.log(componentName, "props.match.params", props.match.params);
    const mediaParam = props.linkItem.linkName; // props.match.params.media;
    // console.log(componentName, "typeof mediaParam", typeof mediaParam);
    // console.log(componentName, "mediaParam", mediaParam);

    const sortEditions = (sortBy) => {
        // console.log("Titles.js sortTitles sortBy", sortBy);
        if (editionList !== undefined && editionList !== null && editionList.length > 0) {
            if (sortBy === "releaseDate") {
                // Sort the editionList array by edition.publicationDate, title.titleSort, (would like to add media.sortID)
                editionList.sort((a, b) => (a.publicationDate > b.publicationDate) ? 1 : (a.publicationDate > b.publicationDate) ? ((a.title.titleSort > b.title.titleSort) ? 1 : -1) : -1);
            } else if (sortBy === "publicationDate") {
                // Sort the editionList array by title.publicationDate, title.titleSort, (would like to add media.sortID)
                editionList.sort((a, b) => (a.title.publicationDate > b.title.publicationDate) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.title.titleSort > b.title.titleSort) ? 1 : -1) : -1);
            } else if (sortBy === "titleName") {
                // Sort the editionList array by title.titleSort, media.sortID
                editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.medium.sortID > b.medium.sortID) ? 1 : -1) : -1);
            } else {
                // Sort the editionList array by title.titleSort, media.sortID
                editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.medium.sortID > b.medium.sortID) ? 1 : -1) : -1);
            };
        };
    };

    let editionList = [];
    if (!isNaN(mediaParam)) {
        // This code no longer works with the current URL setup
        // If mediaParam is a number, then it's the mediaID
        document.title = editionList[0].medium.media + " | " + appName + " | " + siteName;
        editionList = editionListState.filter(edition => edition.mediaID === parseInt(mediaParam));
    } else if (mediaParam !== undefined) {
        // If mediaParam is not a number, then it's the media name
        const media = mediaListState.find(media => media.media === decodeURL(mediaParam));
        // console.log(componentName, "typeof media", typeof media);
        // console.log(componentName, "media", media);

        if (media !== undefined) {
            document.title = media.media + " | " + appName + " | " + siteName;
            editionList = editionListState.filter(edition => edition.mediaID === parseInt(media.mediaID));
        } else {
            document.title = "Media Not Found | " + appName + " | " + siteName;
            console.log("Media not found.");
            // Display all active editions
            // editionList = editionListState;
            // setErrTitleMessage("Media not found.")
        };

    } else {
        document.title = "All Editions | " + appName + " | " + siteName;
        // Display all active editions
        editionList = [...editionListState];
        // editionList = editionListState.filter(edition => edition.active === true);
    };

    if (electronicOnly === true || userElectronicOnly === true) {
        editionList = editionList.filter(edition => edition.medium.electronic === true);
    } else if (physicalOnly === true || userPhysicalOnly === true) {
        editionList = editionList.filter(edition =>  edition.medium.electronic === false);
    } else {
        editionList = [...editionList];
    };

    if (admin !== undefined && admin !== null && admin === true) {
        editionList = [...editionList];
    } else {
        editionList = editionList.filter(edition => edition.active === true && edition.medium.active === true);
    };
    // console.log(componentName, "editionList", editionList);

    sortEditions(editionSort);

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
        <Container className="mt-4">
            <Row>
                <Col xs="12">
                <Breadcrumb className="breadcrumb mb-2">
                        <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                        {mediaParam !== undefined && isNaN(mediaParam) ? 
                        <BreadcrumbItem active><Link to={mediaParam} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(mediaParam);}}>{decodeURL(mediaParam)}</Link></BreadcrumbItem>
                        :
                        <BreadcrumbItem active><Link to={"/editions/"} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage("/editions/");}}>All Editions</Link></BreadcrumbItem>
                        }
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <h4 className="text-center mb-4">{mediaParam !== undefined && isNaN(mediaParam) ? decodeURL(mediaParam) : "All Editions"}
                    {/* <span className="text-muted ml-2 smallText">Sort By
                        {editionSort !== "releaseDate" ? 
                        <a href="#" className="text-decoration-none ml-2" onClick={(event) => {event.preventDefault(); sortEditions("releaseDate"); dispatch(setEditionSort("releaseDate"));}}>Release Date</a>
                        : null}
                        {editionSort !== "publicationDate" ? 
                        <a href="#" className="text-decoration-none ml-2" onClick={(event) => {event.preventDefault(); sortEditions("publicationDate"); dispatch(setEditionSort("publicationDate"));}}>Publication Date</a>
                        : null}
                        {editionSort !== "titleName" ? 
                        <a href="#" className="text-decoration-none ml-2" onClick={(event) => {event.preventDefault(); sortEditions("titleName"); dispatch(setEditionSort("titleName"));}}>Title</a>
                        : null}
                    </span> */}
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col className="text-center" xs="12">
                    {errEditionMessage !== undefined && errEditionMessage !== null && errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
                    {electronicOnly === true || userElectronicOnly === true ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}
                    {physicalOnly === true || userPhysicalOnly === true ? <Alert color="info">{physicalOnlyMessage}</Alert> : null}
                </Col>
            </Row>
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

                    {mediaParam === undefined ?
                    <CardHeader>
                        <Link to={encodeURL(edition.medium.media)}>{edition.medium.media}</Link>
                    </CardHeader>
                    : null}

                    <CardBody className="editionImage">
                    {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />
                    :
                    <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                    {edition.imageName !== null && edition.imageName !== undefined && edition.imageName !== "" ? <img src={setLocalImagePath(edition.imageName)} alt="" className="coverDisplay" /> : <Image className="noImageIcon"/>}
                    </a>
                    }
                    {edition.publicationDate !== null ? <CardText>Released: {displayDate(edition.publicationDate)}</CardText> : null}
                    </CardBody>
                    <CardFooter>
                        <Link to={edition.title.titleURL}>{edition.title.titleName}</Link>
                        {edition.title.publicationDate !== null ? <span> <small>({displayYear(edition.title.publicationDate)})</small></span> : null}
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
                            {edition.imageName !== null && edition.imageName !== undefined && edition.imageName !== "" ? <CardImg src={setLocalImagePath(edition.imageName)} alt="" className="editionImage" /> : <Image className="noImageIcon"/>}
                            </a>
                        }
                        </Col>
                        <Col className="col-md-6">
                            <CardBody>
                                <CardText><Link to={edition.title.titleURL} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(edition.title.titleURL);}}>{edition.title.titleName}</Link>
                                {edition.title.publicationDate !== null ? <span className="ml-1 smallerText">({displayYear(edition.title.publicationDate)})</span> : null}
                                </CardText>
                                {edition.publicationDate !== null ? <CardText className="smallerText">Released: {displayDate(edition.publicationDate)}</CardText> : null}
                                {admin !== undefined && admin !== null && admin === true ? <AddEdition titleID={edition.title.titleID} titlePublicationDate={edition.title.publicationDate} displayButton={true} /> : null}
                                {admin !== undefined && admin !== null && admin === true ? <EditEdition editionID={edition.editionID} titlePublicationDate={edition.title.publicationDate} displayButton={true} /> : null}
                            </CardBody>
                        </Col>
                    </Row>
                    {mediaParam === undefined ?
                    <CardFooter className="cardFooter">
                        <CardText><Link to={encodeURL(edition.medium.media)} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(edition.medium.media));}}>{edition.medium.media}</Link></CardText>
                    </CardFooter>
                    : null}
                    </Card>

                </Col>
                )
            })}
            </Row>
        </Container>
    );

};

export default Editions;
