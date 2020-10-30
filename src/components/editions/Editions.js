import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, Alert, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Image} from 'react-bootstrap-icons';
import {displayDate, displayYear, encodeURL, decodeURL} from "../../app/constants";

const Editions = (props) => {

    // console.log("Editions.js props.editionList", props.editionList);

    const [errEditionMessage, setErrEditionMessage] = useState("");

    const editionListState = useSelector(state => state.editions);
    // console.log("Editions.js editionListState", editionListState);
    const mediaListState = useSelector(state => state.media);
    // console.log("Editions.js mediaListState", mediaListState);

    // console.log("Editions.js props.match.params", props.match.params);
    const mediaParam = props.match.params.media;
    // console.log("Editions.js typeof mediaParam", typeof mediaParam);
    // console.log("Editions.js mediaParam", mediaParam);

    let editionList = [];
    if (!isNaN(mediaParam)) {
        // If mediaParam is a number, then it"s the mediaID
        editionList = editionListState.filter(edition => edition.mediaID === parseInt(mediaParam));
    } else if (mediaParam !== undefined) {
        // If mediaParam is not a number, then it"s the media name
        const media = mediaListState.find(media => media.media === decodeURL(mediaParam));
        // console.log("Editions.js typeof media", typeof media);
        // console.log("Editions.js media", media);

        if (media !== undefined) {
            editionList = editionListState.filter(edition => edition.mediaID === parseInt(media.mediaID));
        } else {
            console.log("Media not found.");
            // Display all editions
            // editionList = editionListState;
            // setErrTitleMessage("Media not found.")
        };

    } else {
        // Display all editions
        editionList = editionListState;
    };

    // Sort the editionList array by title.titleSort, media.sortID
    editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.medium.sortID > b.medium.sortID) ? 1 : -1) : -1 )

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
            <Breadcrumb>
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                {mediaParam !== undefined && isNaN(mediaParam) ? 
                <BreadcrumbItem active>{decodeURL(mediaParam)}</BreadcrumbItem>
                :
                <BreadcrumbItem active>All Editions</BreadcrumbItem>
                }
            </Breadcrumb>
            </Col>
            </Row>
            {mediaParam !== undefined && isNaN(mediaParam) ? 
            <Row>
            <Col xs="12">
            <h4 className="text-center mb-4">{decodeURL(mediaParam)}</h4>
            </Col>
            </Row>
            : null}
            <Row>
            {errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
            {editionList.map((edition) => {
            return (
                <Col key={edition.editionID} xs="3" className="mb-4">

                    <Card key={edition.editionID}>

                    {mediaParam === undefined ?
                    <CardHeader>
                        <Link to={"/editions/" + encodeURL(edition.medium.media)}>{edition.medium.media}</Link>
                    </CardHeader>
                    : null}

                    <CardBody className="editionImage">
                    {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />
                    :
                    <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                    {edition.imageName !== null && edition.imageName !== undefined && edition.imageName !== "" ? <img src={edition.imageName} alt="" className="coverDisplay" /> : <Image size="150" className="noImageIcon"/>}
                    </a>
                    }
                    {edition.publicationDate !== null ? <CardText>Released: {displayDate(edition.publicationDate)}</CardText> : null}
                    </CardBody>
                    <CardFooter>
                        <Link to={"/title/" + encodeURL(edition.title.titleName)}>{edition.title.titleName}</Link>
                        {edition.title.publicationDate !== null ? <span> <small>({displayYear(edition.title.publicationDate)})</small></span> : null}
                    </CardFooter>
                    </Card>

                </Col>
                )
            })}
            </Row>
        </Container>
    );

};

export default Editions;
