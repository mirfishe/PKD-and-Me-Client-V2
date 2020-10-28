import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter} from "reactstrap";
import {Image} from "react-bootstrap-icons";

const Title = (props) => {

    // console.log("Title.js props.titleList", props.titleList);

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
        titleList = titleListState.filter(title => title.titleName === titleParam.replaceAll("-", " ").replaceAll("|", "-")); // .replaceAll("%20", " "));
        const title = titleListState.find(title => title.titleName === titleParam.replaceAll("-", " ").replaceAll("|", "-"));
        // console.log("Title.js typeof title", typeof title);
        // console.log("Title.js title", title);
        editionList = editionListState.filter(edition => edition.titleID === parseInt(title.titleID));
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

    // console.log("Title.js titleList", titleList);
    // console.log("Title.js editionList", editionList);

    return(
        <Container className="mt-4">
            {titleList.map((title) => {
            return (
                <React.Fragment>
                <Row className="mb-4">
                <Col xs="12">
                    <h5>{title.titleName}

                        {title.publicationDate !== null ? <span className="ml-2"> ({title.publicationDate.toString().substring(0, 4)})</span> : null}

                        {title.category.category !== null && title.category.category !== "" ? <span className="ml-4"><Link to={"/titles/" + title.category.category.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category.category}</Link>
                        </span> : null}
                    </h5>
                </Col>
                </Row>

                <Row className="mb-4">
                <Col xs="4">
                        {title.imageName !== null && title.imageName !== "" ? <img src={title.imageName} alt={title.titleName} /> : <Image size="150" className="noImageIcon"/>}
                </Col>
                <Col xs="8">
                    <p>{title.authorFirstName} {title.authorLastName}</p>
                </Col>
                </Row>
                <Row className="mb-4">
                <Col xs="12">
                    {title.shortDescription !== "" && title.shortDescription !== null ? <p>{title.shortDescription}</p> : null}
                    {title.urlPKDweb !== "" && title.urlPKDweb !== null ? <p><a href={title.urlPKDweb} target="_blank">Encyclopedia Dickiana</a></p> : null}
                </Col>
                </Row>

                </React.Fragment>
                )
            })}

            <Row>
            {editionList.map((edition) => {
            return (
                <Col key={edition.editionID} xs="4" className="mb-4">

                    {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                    <Card key={edition.editionID}>
                    <CardHeader>
                        <Link to={"/editions/" + edition.medium.media.replaceAll("-", "|").replaceAll(" ", "-")}>{edition.medium.media}</Link>
                    </CardHeader>
                    <CardBody className="editionImage">
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />
                    </CardBody>
                    <CardFooter>
                        {edition.publicationDate !== null ? <CardText>{edition.publicationDate.toString().substring(0, 10)}</CardText> : null}
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

export default Title;
