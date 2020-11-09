import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, Alert, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Image} from 'react-bootstrap-icons';
import {displayDate, displayYear, encodeURL, decodeURL, removeOnePixelImage, setLocalImagePath} from "../../app/sharedFunctions";
import {setEditionSort} from "../../bibliographyData/editionsSlice";
import {setPageURL} from "../../app/urlsSlice";

const Editions = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const siteName = useSelector(state => state.app.siteName);
    const editionSort = useSelector(state => state.editions.editionSort);
    const electronicOnly = useSelector(state => state.app.electronicOnly);
    const electronicOnlyMessage = useSelector(state => state.app.electronicOnlyMessage);

    const [errEditionMessage, setErrEditionMessage] = useState("");

    const editionListState = useSelector(state => state.editions.arrayEditions);
    // console.log("Editions.js editionListState", editionListState);
    const mediaListState = useSelector(state => state.media.arrayMedia);
    // console.log("Editions.js mediaListState", mediaListState);

    // console.log("Editions.js props.match.params", props.match.params);
    const mediaParam = props.linkItem.linkName; // props.match.params.media;
    // console.log("Editions.js typeof mediaParam", typeof mediaParam);
    // console.log("Editions.js mediaParam", mediaParam);

    const sortEditions = (sortBy) => {
        // console.log("Titles.js sortTitles sortBy", sortBy);
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

    let editionList = [];
    if (!isNaN(mediaParam)) {
        // If mediaParam is a number, then it"s the mediaID
        editionList = editionListState.filter(edition => edition.mediaID === parseInt(mediaParam));
        document.title = editionList[0].medium.media + " | " + siteName;
    } else if (mediaParam !== undefined) {
        // If mediaParam is not a number, then it"s the media name
        const media = mediaListState.find(media => media.media === decodeURL(mediaParam));
        // console.log("Editions.js typeof media", typeof media);
        // console.log("Editions.js media", media);

        if (media !== undefined) {
            document.title = media.media + " | " + siteName;
            editionList = editionListState.filter(edition => edition.mediaID === parseInt(media.mediaID));
        } else {
            document.title = "Media Not Found | " + siteName;
            console.log("Media not found.");
            // Display all editions
            // editionList = editionListState;
            // setErrTitleMessage("Media not found.")
        };

    } else {
        document.title = "All Editions | " + siteName;
        // Display all editions
        editionList = [...editionListState];
    };

    if (electronicOnly) {
        editionList = editionListState.filter(edition => edition.medium.electronic === true);
    };

    sortEditions(editionSort);

    const redirectPage = (linkName) => {
        // console.log("Editions.js redirectPage", linkName);
        dispatch(setPageURL(linkName));
        history.push("/" + linkName);
    };

    useEffect(() => {
        // console.log("Editions.js useEffect editionList", editionList);
        if (editionList.length > 0) {
            setErrEditionMessage("");
        } else {
            setErrEditionMessage("No editions for purchase found.");
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
                <Col xs="12">
                    {errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
                    {electronicOnly ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}
                </Col>
            </Row>
            <Row>
            {editionList.map((edition) => {
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
                    <Row className="no-gutters">
                        <Col className="col-md-6">
                        {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                            <div dangerouslySetInnerHTML={{"__html": removeOnePixelImage(edition.imageLinkLarge, edition.ASIN)}} />
                        :
                            <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                            {edition.imageName !== null && edition.imageName !== undefined && edition.imageName !== "" ? <img src={setLocalImagePath(edition.imageName)} alt="" className="coverDisplay" /> : <Image className="noImageIcon"/>}
                            </a>
                        }
                        </Col>
                        <Col className="col-md-6">
                            <CardBody>
                                <CardText><Link to={edition.title.titleURL} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(edition.title.titleURL);}}>{edition.title.titleName}</Link>
                                {edition.title.publicationDate !== null ? <span className="ml-1 smallerText">({displayYear(edition.title.publicationDate)})</span> : null}
                                </CardText>
                                {edition.publicationDate !== null ? <CardText className="smallerText">Released: {displayDate(edition.publicationDate)}</CardText> : null}
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
