import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter} from "reactstrap";

const Editions = (props) => {

    // console.log("Editions.js props.editionList", props.editionList);

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
        const media = mediaListState.find(media => media.media === mediaParam.replaceAll("-", " "));
        // console.log("Editions.js typeof media", typeof media);
        // console.log("Editions.js media", media);
        editionList = editionListState.filter(edition => edition.mediaID === parseInt(media.mediaID));
    } else {
        // Display all editions
        editionList = editionListState;
    };

    // Sort the editionList array by title.titleSort, media.sortID
    editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.medium.sortID > b.medium.sortID) ? 1 : -1) : -1 )

    // console.log("Editions.js editionList", editionList);

    return(
        <Container className="mt-4">
            {mediaParam !== undefined && isNaN(mediaParam) ? 
            <Row>
            <Col xs="12">
            <h4 className="text-center mb-4">{mediaParam.replaceAll("-", " ").replaceAll("|", "-")}</h4>
            </Col>
            </Row>
            : null}
            <Row>
            {editionList.map((edition) => {
            return (
                <Col key={edition.editionID} xs="3" className="mb-4">

                    {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                    <Card key={edition.editionID}>

                    {mediaParam === undefined ?
                    <CardHeader>
                        <Link to={"/editions/" + edition.medium.media.replaceAll("-", "|").replaceAll(" ", "-")}>{edition.medium.media}</Link>
                    </CardHeader>
                    : null}

                    <CardBody className="editionImage">
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />
                        {edition.publicationDate !== null ? <CardText>{edition.publicationDate.toString().substring(0, 10)}</CardText> : null}
                    </CardBody>
                    <CardFooter>
                        <Link to={"/title/" + edition.title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{edition.title.titleName}</Link>
                        {edition.title.publicationDate !== null ? <span> <small>({edition.title.publicationDate.toString().substring(0, 4)})</small></span> : null}
                    </CardFooter>
                    </Card>
                    : null}

                </Col>
                )
            })}
            </Row>
        </Container>
    );

};

export default Editions;
