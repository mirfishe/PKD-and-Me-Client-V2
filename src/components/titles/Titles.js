import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Image} from "react-bootstrap-icons";
import {displayYear, encodeURL, decodeURL, setLocalImagePath} from "../../app/sharedFunctions";
import {setTitleSort} from "../../bibliographyData/titlesSlice";

const Titles = (props) => {

    const dispatch = useDispatch();

    const siteName = useSelector(state => state.app.siteName);
    const titleSort = useSelector(state => state.titles.titleSort);

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

    const sortTitles = (sortBy) => {
        // console.log("Titles.js sortTitles sortBy", sortBy);
        if (sortBy === "publicationDate") {
            // Sort the titleList array by title.publicationDate
            titleList.sort((a, b) => (a.publicationDate > b.publicationDate) ? 1 : -1);
        } else if (sortBy === "titleName") {
            // Sort the titleList array by title.titleSort
            titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
        } else {
            // Sort the titleList array by title.titleSort
            titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
        };
    };

    let titleList = [];
    if (!isNaN(categoryParam)) {
        // If categoryParam is a number, then it's the categoryID
        titleList = titleListState.filter(title => title.categoryID === parseInt(categoryParam));
        document.title = titleList[0].category.category + " | " + siteName;
    } else if (categoryParam !== undefined) {
        // If categoryParam is not a number, then it's the category name
        const category = categoryListState.find(category => category.category === decodeURL(categoryParam));
        // console.log("Titles.js typeof category", typeof category);
        // console.log("Titles.js category", category);

        if (category !== undefined) {
            document.title = category.category + " | " + siteName;
            titleList = titleListState.filter(title => title.categoryID === parseInt(category.categoryID));
        } else {
            document.title = "Category Not Found | " + siteName;
            console.log("Category not found.");
            // // Display all titles
            // titleList = titleListState;
            // // Display all editions
            // editionList = editionListState;
            // setErrCategoryMessage("Category not found.")
        };

    } else {
        document.title = "All Titles | " + siteName;
        // Display all titles
        titleList = [...titleListState];
    };

    sortTitles(titleSort);

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
                <Breadcrumb className="breadcrumb mb-2">
                        <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                        {categoryParam !== undefined && isNaN(categoryParam) ? 
                        <BreadcrumbItem active><Link to={"/titles/" + categoryParam}>{decodeURL(categoryParam)}</Link></BreadcrumbItem>
                        :
                        <BreadcrumbItem active><Link to={"/titles/"}>All Titles</Link></BreadcrumbItem>
                        }
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <h4 className="text-center mb-4">{categoryParam !== undefined && isNaN(categoryParam) ? decodeURL(categoryParam) : "All Titles"}
                    {/* <span className="text-muted ml-2 smallText">Sort By&nbsp;
                        {titleSort !== "publicationDate" ? 
                        <a href="#" className="text-decoration-none" onClick={(event) => {event.preventDefault(); sortTitles("publicationDate"); dispatch(setTitleSort("publicationDate"));}}>Publication Date</a>
                        : null}
                        {titleSort !== "titleName" ? 
                        <a href="#" className="text-decoration-none" onClick={(event) => {event.preventDefault(); sortTitles("titleName"); dispatch(setTitleSort("titleName"));}}>Title</a>
                        : null}
                    </span> */}
                 </h4>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    {/* {errCategoryMessage !== "" ? <Alert color="danger">{errCategoryMessage}</Alert> : null} */}
                    {errTitleMessage !== "" ? <Alert color="danger">{errTitleMessage}</Alert> : null}
                </Col>
            </Row>
            <Row>
            {titleList.map((title) => {
            return (
                <Col key={title.titleID} xs="4" className="mb-4">

                    {/* <Link to={`/title/${title.titleID}`}>{title.titleID}</Link>
                    <Link to={`/title/${title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}`}>{title.titleName}</Link>
                    <Link to={"/title/" + title.titleID}>{title.titleID}</Link>
                    <Link to={"/title/" + title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>

                    <Link to={`/editions/${title.titleID}`}>{title.titleID}</Link>
                    <Link to={`/editions/${title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}`}>{title.titleName}</Link>
                    <Link to={"/editions/" + title.titleID}>{title.titleID}</Link>
                    <Link to={"/editions/" + title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link> */}

                    {/* <Card key={title.titleID}>

                    {categoryParam === undefined ?
                    <CardHeader>
                        <Link to={"/titles/" + encodeURL(title.category.category)}>{title.category.category}</Link> */}
                        {/* <Link to={"/title/" + title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>
                        {title.publicationDate !== null ? <span> <small>({displayYear(title.publicationDate)})</small></span> : null} */}
                    {/* </CardHeader>  
                    : null} */}

                    {/* <CardBody>
                        <Link to={"/title/" + title.titleURL}>
                        {title.imageName !== null && title.imageName !== undefined && title.imageName !== "" ? <CardImg src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="noImageIcon" />}
                        </Link>
                        <CardText>{title.authorFirstName} {title.authorLastName}</CardText>
                    </CardBody>
                    <CardFooter> */}
                        {/* <Link to={"/titles/" + title.category.category.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category.category}</Link> */}
                        {/* <Link to={"/title/" + title.titleURL}>{title.titleName}</Link>
                        {title.publicationDate !== null ? <span> <small>({displayYear(title.publicationDate)})</small></span> : null}
                    </CardFooter>
                    </Card> */}

                    <Card key={title.titleID}>
                    <Row className="no-gutters">
                        <Col className="col-md-4">
                            <Link to={"/title/" + title.titleURL}>
                            {title.imageName !== null && title.imageName !== undefined && title.imageName !== "" ? <CardImg src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="noImageIcon" />}
                            </Link>
                        </Col>
                        <Col className="col-md-8">
                            <CardBody>
                                {/* <CardText><Link to={"/titles/" + title.category.category.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category.category}</Link></CardText> */}
                                <CardText><Link to={"/title/" + title.titleURL}>{title.titleName}</Link>
                                {title.publicationDate !== null ? <span className="ml-1 smallerText">({displayYear(title.publicationDate)})</span> : null}</CardText>
                                <CardText className="smallerText">{title.authorFirstName} {title.authorLastName}</CardText>
                            </CardBody>
                        </Col>
                    </Row>
                    {categoryParam === undefined ?
                    <CardFooter className="cardFooter">
                        <CardText><Link to={"/titles/" + encodeURL(title.category.category)}>{title.category.category}</Link></CardText>
                        {/* <Link to={"/title/" + title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>
                        {title.publicationDate !== null ? <span> <small>({displayYear(title.publicationDate)})</small></span> : null} */}
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

export default Titles;
