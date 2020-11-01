import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Image} from "react-bootstrap-icons";
import {displayYear, encodeURL, decodeURL} from "../../app/constants";

const Titles = (props) => {

    // console.log("Titles.js props.titleList", props.titleList);

    // const [errCategoryMessage, setErrCategoryMessage] = useState("");
    const [errTitleMessage, setErrTitleMessage] = useState("");

    const titleListState = useSelector(state => state.titles.arrayTitles);
    // console.log("Titles.js titleListState", titleListState);
    const categoryListState = useSelector(state => state.categories.arrayCategories);
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
        const category = categoryListState.find(category => category.category === decodeURL(categoryParam));
        // console.log("Titles.js typeof category", typeof category);
        // console.log("Titles.js category", category);

        if (category !== undefined) {
            titleList = titleListState.filter(title => title.categoryID === parseInt(category.categoryID));
        } else {
            console.log("Category not found.");
            // // Display all titles
            // titleList = titleListState;
            // // Display all editions
            // editionList = editionListState;
            // setErrCategoryMessage("Category not found.")
        };

    } else {
        // Display all titles
        titleList = titleListState;
    };

    // Sort the titleList array by title.titleSort
    titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

    useEffect(() => {
        // console.log("Titles.js useEffect titleList", titleList);
        if (titleList.length > 0) {
            setErrTitleMessage("");
        } else {
            setErrTitleMessage("No titles found.");
        };
    }, [titleList]);

    return(
        <Container className="mt-4">
            <Row>
            <Col xs="12">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                {categoryParam !== undefined && isNaN(categoryParam) ? 
                <BreadcrumbItem active><Link to={"/titles/" + categoryParam}>{decodeURL(categoryParam)}</Link></BreadcrumbItem>
                :
                <BreadcrumbItem active><Link to={"/titles/"}>All Titles</Link></BreadcrumbItem>
                }
            </Breadcrumb>
            </Col>
            </Row>
            {categoryParam !== undefined && isNaN(categoryParam) ? 
            <Row>
            <Col xs="12">
            <h4 className="text-center mb-4">{decodeURL(categoryParam)}</h4>
            </Col>
            </Row>
            : null}
            <Row>
            {/* {errCategoryMessage !== "" ? <Alert color="danger">{errCategoryMessage}</Alert> : null} */}
            {errTitleMessage !== "" ? <Alert color="danger">{errTitleMessage}</Alert> : null}
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
                        <Link to={"/titles/" + encodeURL(title.category.category)}>{title.category.category}</Link>
                        {/* <Link to={"/title/" + title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>
                        {title.publicationDate !== null ? <span> <small>({displayYear(title.publicationDate)})</small></span> : null} */}
                    </CardHeader>  
                    : null}

                    <CardBody>
                        <Link to={"/title/" + encodeURL(title.titleName)}>
                        {title.imageName !== null && title.imageName !== "" ? <CardImg src={title.imageName} alt={title.titleName} /> : <Image size="150" className="noImageIcon" />}
                        </Link>
                        <CardText>{title.authorFirstName} {title.authorLastName}</CardText>
                    </CardBody>
                    <CardFooter>
                        {/* <Link to={"/titles/" + title.category.category.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category.category}</Link> */}
                        <Link to={"/title/" + encodeURL(title.titleName)}>{title.titleName}</Link>
                        {title.publicationDate !== null ? <span> <small>({displayYear(title.publicationDate)})</small></span> : null}
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
