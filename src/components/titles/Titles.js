import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg} from "reactstrap";
import {Image} from "react-bootstrap-icons";

const Titles = (props) => {

    // console.log("Titles.js props.titleList", props.titleList);

    const titleListState = useSelector(state => state.titles);
    // console.log("Titles.js titleListState", titleListState);
    const categoryListState = useSelector(state => state.categories);
    // console.log("Titles.js categoryListState", categoryListState);

    // console.log("Titles.js props.match.params", props.match.params);
    const categoryParam = props.match.params.category;
    // console.log("Titles.js typeof categoryParam", typeof categoryParam);
    // console.log("Titles.js categoryParam", categoryParam);

    let titleList = [];
    if (!isNaN(categoryParam)) {
        // If categoryParam is a number, then it's the categoryID
        titleList = titleListState.filter(title => title.categoryID === parseInt(categoryParam));
    } else if (categoryParam !== undefined) {
        // If categoryParam is not a number, then it's the category name
        const category = categoryListState.find(category => category.category === categoryParam.replaceAll("-", " ").replaceAll("|", "-")); // .replaceAll("%20", " "));
        // console.log("Titles.js typeof category", typeof category);
        // console.log("Titles.js category", category);
        titleList = titleListState.filter(title => title.categoryID === parseInt(category.categoryID));
    } else {
        // Display all titles
        titleList = titleListState;
    };

    // Sort the titleList array by title.titleSort
    titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

    // console.log("Titles.js titleList", titleList);

    return(
        <Container className="mt-4">
            {categoryParam !== undefined && isNaN(categoryParam) ? 
            <Row>
            <Col xs="12">
            <h4 className="text-center mb-4">{categoryParam.replaceAll("-", " ").replaceAll("|", "-")}</h4>
            </Col>
            </Row>
            : null}
            <Row>
            {titleList.map((title) => {
            return (
                <Col key={title.titleID} xs="3" className="mb-4">

                    {/* <Link to={`/title/${title.titleID}`}>{title.titleID}</Link>
                    <Link to={`/title/${title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}`}>{title.titleName}</Link>
                    <Link to={"/title/" + title.titleID}>{title.titleID}</Link>
                    <Link to={"/title/" + title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>

                    <Link to={`/editions/${title.titleID}`}>{title.titleID}</Link>
                    <Link to={`/editions/${title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}`}>{title.titleName}</Link>
                    <Link to={"/editions/" + title.titleID}>{title.titleID}</Link>
                    <Link to={"/editions/" + title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link> */}

                    <Card key={title.titleID}>

                    {categoryParam === undefined ?
                    <CardHeader>
                        <Link to={"/titles/" + title.category.category.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category.category}</Link>
                        {/* <Link to={"/title/" + title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>
                        {title.publicationDate !== null ? <span> <small>({title.publicationDate.toString().substring(0, 4)})</small></span> : null} */}
                    </CardHeader>  
                    : null}

                    <CardBody>
                        <Link to={"/title/" + title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>
                        {title.imageName !== null && title.imageName !== "" ? <CardImg src={title.imageName} alt={title.titleName}
                        className="coverImage" /> : <Image size="150" className="noImageIcon" />}
                        </Link>
                        <CardText>{title.authorFirstName} {title.authorLastName}</CardText>
                    </CardBody>
                    <CardFooter>
                        {/* <Link to={"/titles/" + title.category.category.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category.category}</Link> */}
                        <Link to={"/title/" + title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>
                        {title.publicationDate !== null ? <span> <small>({title.publicationDate.toString().substring(0, 4)})</small></span> : null}
                    </CardFooter>
                    </Card>

                </Col>
                )
            })}
            </Row>
        </Container>
    );

};

export default Titles;
