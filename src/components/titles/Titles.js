import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Image} from "react-bootstrap-icons";
import {displayYear, encodeURL, decodeURL, setLocalPath, setLocalImagePath} from "../../app/sharedFunctions";
import {setTitleSortBy} from "../../bibliographyData/titlesSlice";
import {setEditionSortBy} from "../../bibliographyData/editionsSlice";
import {setPageURL} from "../../app/urlsSlice";
import AddTitle from "./AddTitle";
import EditTitle from "./EditTitle";
import AddEdition from "../editions/AddEdition";

const Titles = (props) => {

    const componentName = "Titles.js";

    const dispatch = useDispatch();
    const history = useHistory();

    const siteName = useSelector(state => state.app.siteName);
    const appName = useSelector(state => state.app.appName);

    const sessionToken = useSelector(state => state.user.sessionToken);
    // console.log(componentName, "sessionToken", sessionToken);
    const admin = useSelector(state => state.user.admin);
    // console.log(componentName, "admin", admin);

    const titleSortBy = useSelector(state => state.titles.titleSortBy);

    // const [errCategoryMessage, setErrCategoryMessage] = useState("");
    const [errTitleMessage, setErrTitleMessage] = useState("");

    const titleListState = useSelector(state => state.titles.arrayTitles);
    // console.log(componentName, "titleListState", titleListState);
    const categoryListState = useSelector(state => state.categories.arrayCategories);
    // console.log(componentName, "categoryListState", categoryListState);

    let categoryParam;
    if (props.linkItem !== undefined && props.linkItem !== null && props.linkItem.hasOwnProperty("linkName")) {
        // console.log(componentName, "props.match.params", props.match.params);
        categoryParam = props.linkItem.linkName; // props.match.params.category;
        // console.log(componentName, "typeof categoryParam", typeof categoryParam);
        // console.log(componentName, "categoryParam", categoryParam);
    };

    const sortTitles = (sortBy) => {
        // console.log(componentName, "sortTitles sortBy", sortBy);
        if (titleList !== undefined && titleList !== null && titleList.length > 0) {
            if (sortBy === "publicationDate") {
                // Sort the titleList array by title.publicationDate
                // Doesn't handle null values well; treats them as "null"
                // titleList.sort((a, b) => (a.publicationDate > b.publicationDate) ? 1 : -1);

                // Sort by titleSort first to order the items with a null value for publicationDate?
                // titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
                // Doesn't sort at all
                // https://stackoverflow.com/questions/29829205/sort-an-array-so-that-null-values-always-come-last
                // https://stackoverflow.com/questions/2328562/javascript-sorting-array-of-mixed-strings-and-null-values
                // titleList.sort((a, b) => ((b.publicationDate !== null) - (a.publicationDate !== null) || a.publicationDate - b.publicationDate));

                // Doesn't sort correctly
                // https://stackoverflow.com/questions/29829205/sort-an-array-so-that-null-values-always-come-last
                // https://stackoverflow.com/questions/2328562/javascript-sorting-array-of-mixed-strings-and-null-values
                // titleList.sort(function(a, b) {
                //     if (a.publicationDate === b.publicationDate) {
                //         // titleSort is only important when publicationDates are the same
                //         return b.titleSort - a.titleSort;
                //      };
                //     return ((b.publicationDate != null) - (a.publicationDate != null) || a.publicationDate - b.publicationDate);
                // });

                // Separate the array items with undefined/null values, sort them appropriately and then concatenate them back together
                let titleListPublicationDate = titleList.filter(title => title.publicationDate !== undefined && title.publicationDate !== null);
                titleListPublicationDate.sort((a, b) => (a.publicationDate > b.publicationDate) ? 1 : -1);
                // console.log(componentName, "titleListPublicationDate", titleListPublicationDate);

                let titleListNoPublicationDate = titleList.filter(title => title.publicationDate === undefined || title.publicationDate === null);
                titleListNoPublicationDate.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
                // console.log(componentName, "titleListNoPublicationDate", titleListNoPublicationDate);

                let newTitleList = [...titleListPublicationDate];
                newTitleList.push(...titleListNoPublicationDate);
                // console.log(componentName, "newTitleList", newTitleList);

                titleList = [...newTitleList];

            } else if (sortBy === "titleName") {
                // Sort the titleList array by title.titleSort
                titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
            } else {
                // Sort the titleList array by title.titleSort
                titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
            };
        };
    };

    let titleList = [];
    if (!isNaN(categoryParam)) {
        // This code no longer works with the current URL setup
        // If categoryParam is a number, then it's the categoryID
        document.title = titleList[0].category.category + " | " + appName + " | " + siteName;
        titleList = titleListState.filter(title => title.categoryID === parseInt(categoryParam));
    } else if (categoryParam !== undefined && categoryParam !== null) {
        // If categoryParam is not a number, then it's the category name
        const category = categoryListState.find(category => category.category === decodeURL(categoryParam));
        // console.log(componentName, "typeof category", typeof category);
        // console.log(componentName, "category", category);

        if (category !== undefined && category !== null) {
            document.title = category.category + " | " + appName + " | " + siteName;
            titleList = titleListState.filter(title => title.categoryID === parseInt(category.categoryID));
        } else {
            document.title = "Category Not Found | " + appName + " | " + siteName;
            console.log("Category not found.");
            // // Display all active titles
            // titleList = titleListState;
            // // Display all editions
            // editionList = editionListState;
            // setErrCategoryMessage("Category not found.")
        };

    } else {
        document.title = "All Titles | " + appName + " | " + siteName;
        // Display all active titles
        titleList = [...titleListState];
        // titleList = titleListState.filter(title => title.active === true);
    };

    if (admin !== undefined && admin !== null && admin === true) {
        titleList = [...titleList];
    } else {
        titleList = titleList.filter(title => title.active === true && title.category.active === true);
    };

    sortTitles(titleSortBy);
    // console.log(componentName, "titleSortBy", titleSortBy);
    // console.log(componentName, "titleList", titleList);

    const redirectPage = (linkName) => {
        // console.log(componentName, "redirectPage", linkName);
        dispatch(setPageURL(linkName.replaceAll("/", "")));
        history.push("/" + linkName);
    };

    useEffect(() => {
        // console.log(componentName, "useEffect titleList", titleList);
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
                        <BreadcrumbItem active><Link to={categoryParam} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(categoryParam);}}>{decodeURL(categoryParam)}</Link></BreadcrumbItem>
                        :
                        <BreadcrumbItem active><Link to={"/titles/"} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage("/titles/");}}>All Titles</Link></BreadcrumbItem>
                        }
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <h4 className="text-center mb-4">{categoryParam !== undefined && isNaN(categoryParam) ? decodeURL(categoryParam) : "All Titles"}
                    {admin !== undefined && admin !== null && admin === true ? <AddTitle categoryName={decodeURL(categoryParam)} displayButton={true} /> : null}
                    <span className="text-muted ml-2 smallText">Sort By&nbsp;
                        {titleSortBy !== "publicationDate" ? 
                        <a href="#" className="text-decoration-none" onClick={(event) => {event.preventDefault(); sortTitles("publicationDate"); dispatch(setTitleSortBy("publicationDate")); dispatch(setEditionSortBy("publicationDate"));}}>Publication Date</a>
                        : null}
                        {titleSortBy !== "titleName" ? 
                        <a href="#" className="text-decoration-none" onClick={(event) => {event.preventDefault(); sortTitles("titleName"); dispatch(setTitleSortBy("titleName")); dispatch(setEditionSortBy("titleName"));}}>Title</a>
                        : null}
                    </span>
                 </h4>
                </Col>
            </Row>
            <Row>
                <Col className="text-center" xs="12">
                    {/* {errCategoryMessage !== "" ? <Alert color="danger">{errCategoryMessage}</Alert> : null} */}
                    {errTitleMessage !== "" ? <Alert color="danger">{errTitleMessage}</Alert> : null}
                </Col>
            </Row>
            <Row>
            {titleList.map((title) => {

                let activeString = "";
                if (title.active === true) {
                    // activeString = "Active";
                    activeString = "";
                } else {
                    activeString = "Inactive";
                };

            return (
                <Col key={title.titleID} xs="4" className="mb-4">

                    {/* <Link to={`${title.titleID}`}>{title.titleID}</Link>
                    <Link to={`${title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}`}>{title.titleName}</Link>
                    <Link to={ftitle.titleID}>{title.titleID}</Link>
                    <Link to={title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>

                    <Link to={`/editions/${title.titleID}`}>{title.titleID}</Link>
                    <Link to={`/editions/${title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}`}>{title.titleName}</Link>
                    <Link to={title.titleID}>{title.titleID}</Link>
                    <Link to={title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link> */}

                    {/* <Card key={title.titleID}>

                    {categoryParam === undefined ?
                    <CardHeader>
                        <Link to={encodeURL(title.category.category)}>{title.category.category}</Link> */}
                        {/* <Link to={title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>
                        {title.publicationDate !== null ? <span> <small>({displayYear(title.publicationDate)})</small></span> : null} */}
                    {/* </CardHeader>  
                    : null} */}

                    {/* <CardBody>
                        <Link to={title.titleURL}>
                        {title.imageName !== null && title.imageName !== undefined && title.imageName !== "" ? <CardImg src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="noImageIcon" />}
                        </Link>
                        <CardText>{title.authorFirstName} {title.authorLastName}</CardText>
                    </CardBody>
                    <CardFooter> */}
                        {/* <Link to={title.category.category.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category.category}</Link> */}
                        {/* <Link to={title.titleURL}>{title.titleName}</Link>
                        {title.publicationDate !== null ? <span> <small>({displayYear(title.publicationDate)})</small></span> : null}
                    </CardFooter>
                    </Card> */}

                    <Card key={title.titleID}>
                    {activeString !== undefined && activeString !== null && activeString !== "" ?
                        <CardHeader className="cardHeader inactiveItem">
                            ({activeString})
                        </CardHeader>
                    : null}
                    <Row className="no-gutters">
                        <Col className="col-md-4">
                            <Link to={title.titleURL} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(title.titleURL);}}>
                            {title.imageName !== null && title.imageName !== undefined && title.imageName !== "" ? <CardImg src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="noImageIcon" />}
                            </Link>
                        </Col>
                        <Col className="col-md-8">
                            <CardBody>
                                {/* <CardText><Link to={title.category.category.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category.category}</Link></CardText> */}
                                <CardText><Link to={title.titleURL} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(title.titleURL);}}>{title.titleName}</Link>
                                {title.publicationDate !== null ? <span className="ml-1 smallerText">({displayYear(title.publicationDate)})</span> : null}</CardText>
                                <CardText className="smallerText">{title.authorFirstName} {title.authorLastName}</CardText>
                                {admin !== undefined && admin !== null && admin === true ? <EditTitle titleID={title.titleID} displayButton={true} /> : null}
                                {admin !== undefined && admin !== null && admin === true ? <AddEdition titleID={title.titleID} titlePublicationDate={title.publicationDate} displayButton={true} /> : null}
                            </CardBody>
                        </Col>
                    </Row>
                    {categoryParam === undefined ?
                    <CardFooter className="cardFooter">
                        <CardText><Link to={encodeURL(title.category.category)} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(title.category.category));}}>{title.category.category}</Link></CardText>
                        {/* <Link to={title.titleName.replaceAll("-", "|").replaceAll(" ", "-")}>{title.titleName}</Link>
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
