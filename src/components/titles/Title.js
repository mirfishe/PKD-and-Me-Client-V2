import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, Alert} from "reactstrap";
import {Image} from "react-bootstrap-icons";
import {displayDate, displayYear, encodeURL, decodeURL} from "../../app/constants";

const Title = (props) => {

    // console.log("Title.js props.titleList", props.titleList);

    const [errTitleMessage, setErrTitleMessage] = useState("");
    const [errEditionMessage, setErrEditionMessage] = useState("");

    const titleListState = useSelector(state => state.titles);
    // console.log("Title.js titleListState", titleListState);
    const editionListState = useSelector(state => state.editions);
    // console.log("Title.js editionListState", editionListState);

    // console.log("Title.js props.match.params", props.match.params);
    const titleParam = props.match.params.title;
    // console.log("Title.js typeof titleParam", typeof titleParam);
    // console.log("Title.js titleParam", titleParam);

    let titleList = [];
    let editionList = [];
    if (!isNaN(titleParam)) {
        // If titleParam is a number, then it"s the titleID
        titleList = titleListState.filter(title => title.titleID === parseInt(titleParam));
        editionList = editionListState.filter(edition => edition.titleID === parseInt(titleParam));
    } else if (titleParam !== undefined) {
        // If titleParam is not a number, then it"s the title name
        titleList = titleListState.filter(title => title.titleName === decodeURL(titleParam));
        const title = titleListState.find(title => title.titleName === decodeURL(titleParam));
        // console.log("Title.js typeof title", typeof title);
        // console.log("Title.js title", title);

        if (title !== undefined) {
            editionList = editionListState.filter(edition => edition.titleID === parseInt(title.titleID));
        } else {
            console.log("Title not found.");
            // // Display all titles
            // titleList = titleListState;
            // // Display all editions
            // editionList = editionListState;
            // setErrTitleMessage("Title not found.")
        };

    } else {
        // Display all titles
        titleList = titleListState;
        // Display all editions
        editionList = editionListState;
    };

    // Sort the titleList array by title.titleSort
    // Really not needed here since there should only be one item in the array
    titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

    // Sort the editionList array by media.sortID
    editionList.sort((a, b) => (a.medium.sortID > b.medium.sortID) ? 1 : -1);

    // console.log("Title.js editionList", editionList);

    useEffect(() => {
        // console.log("Title.js useEffect titleList", titleList);
        if (titleList.length > 0) {
            setErrTitleMessage("");
        } else {
            setErrTitleMessage("Title not found.");
        };
    }, [titleList]);

    useEffect(() => {
        // console.log("Title.js useEffect editionList", editionList);
        if (editionList.length > 0) {
            setErrEditionMessage("");
        } else {
            setErrEditionMessage("No editions for purchase found.");
        };
    }, [editionList]);

    return(
        <Container className="mt-4">
            {errTitleMessage !== "" ? <Alert severity="error">{errTitleMessage}</Alert> : null}
            {titleList.map((title) => {
            return (
                <React.Fragment>
                <Row className="mb-4">
                <Col xs="12">
                    <h5>{title.titleName}

                        {title.publicationDate !== null ? <span className="ml-2"> ({displayYear(title.publicationDate)})</span> : null}

                        {title.category.category !== null && title.category.category !== "" ? <span className="ml-4"><Link to={"/titles/" + encodeURL(title.category.category)}>{title.category.category}</Link>
                        </span> : null}
                    </h5>
                </Col>
                </Row>

                <Row className="mb-4">
                <Col xs="4">
                        {title.imageName !== null && title.imageName !== "" ? <img src={title.imageName} alt={title.titleName} className="coverDisplay" /> : <Image size="150" className="noImageIcon"/>}
                </Col>
                <Col xs="8">
                    <p>{title.authorFirstName} {title.authorLastName}</p>
                </Col>
                </Row>
                <Row className="mb-4">
                <Col xs="12">
                    {title.shortDescription !== "" && title.shortDescription !== null ? <p>{title.shortDescription}</p> : null}
                    {title.urlPKDweb !== "" && title.urlPKDweb !== null ? <p><a href={title.urlPKDweb} target="_blank" rel="noreferrer">Encyclopedia Dickiana</a></p> : null}
                </Col>
                </Row>

                </React.Fragment>
                )
            })}

            {errEditionMessage !== "" ? <Alert severity="error">{errEditionMessage}</Alert> : null}
            {editionList.length > 0 ?
            <Row>
                <Col xs="12">
                    <h5 className="text-center">Purchase</h5>
                </Col>
            </Row>
            : null}
            <Row>
            {editionList.map((edition) => {
            return (
                <Col key={edition.editionID} xs="4" className="mb-4">

                    <Card key={edition.editionID}>
                    <CardHeader>
                        <Link to={"/editions/" + encodeURL(edition.medium.media)}>{edition.medium.media}</Link>
                    </CardHeader>
                    <CardBody className="editionImage">
                    {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />
                    :
                        <a href={edition.textLinkFull} target="_blank" rel="noreferrer">
                        {edition.imageName !== null && edition.imageName !== undefined && edition.imageName !== "" ? <img src={edition.imageName} alt="" /> : <Image size="150" className="noImageIcon"/>}
                        </a>
                    }
                    </CardBody>
                    <CardFooter>
                        {edition.publicationDate !== null ? <CardText>Released: {displayDate(edition.publicationDate)}</CardText> : null}
                    </CardFooter>
                    </Card>

                </Col>
                )
            })}
            </Row>
        </Container>
    );

};

export default Title;
