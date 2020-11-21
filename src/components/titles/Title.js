import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, Alert, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Image} from "react-bootstrap-icons";
import {Rating} from "@material-ui/lab/";
import AppSettings from "../../app/environment";
import {displayDate, displayYear, encodeURL, decodeURL, displayParagraphs, removeOnePixelImage, setLocalPath, setLocalImagePath} from "../../app/sharedFunctions";
import {setPageURL} from "../../app/urlsSlice";
import AddTitle from "./AddTitle";
import EditTitle from "./EditTitle";
import Edition from "../editions/Edition";
import AddEdition from "../editions/AddEdition";
import EditEdition from "../editions/EditEdition";
import UserReview from "../userReviews/UserReview";
import AddUserReview from "../userReviews/AddUserReview";
import EditUserReview from "../userReviews/EditUserReview";

const Title = (props) => {

    const componentName = "Title.js";

    const dispatch = useDispatch();
    const history = useHistory();

    const siteName = useSelector(state => state.app.siteName);
    const appName = useSelector(state => state.app.appName);

    const sessionToken = useSelector(state => state.user.sessionToken);
    // console.log(componentName, "sessionToken", sessionToken);
    const admin = useSelector(state => state.user.admin);
    // console.log(componentName, "admin", admin);
    const userID = useSelector(state => state.user.userID);
    // console.log(componentName, "userID", userID);

    // Loading the baseURL from the state store here is too slow
    // Always pulling it from environment.js
    // const baseURL = useSelector(state => state.app.baseURL);
    const baseURL = AppSettings.baseURL;
    // console.log(componentName, "baseURL", baseURL);

    // const electronicOnly = useSelector(state => state.app.electronicOnly);
    // const electronicOnlyMessage = useSelector(state => state.app.electronicOnlyMessage);
    // const physicalOnly = useSelector(state => state.app.physicalOnly);
    // const physicalOnlyMessage = useSelector(state => state.app.physicalOnlyMessage);

    const [errTitleMessage, setErrTitleMessage] = useState("");
    const [errEditionMessage, setErrEditionMessage] = useState("");

    const titleListState = useSelector(state => state.titles.arrayTitles);
    // console.log(componentName, "titleListState", titleListState);
    // const editionListState = useSelector(state => state.editions.arrayEditions);
    // console.log(componentName, "editionListState", editionListState);

    // console.log(componentName, "props.match.params", props.match.params);
    const titleParam = props.linkItem.linkName; // props.match.params.title;
    // console.log(componentName, "typeof titleParam", typeof titleParam);
    // console.log(componentName, "titleParam", titleParam);

    let titleNameBreadCrumb = "";
    let titleID = "";
    let titlePublicationDate = "";
    // This code is causing React to have too many re-renders in this location
    // const [titleID, setTitleID] = useState("");
    // const [titlePublicationDate, setTitlePublicationDate] = useState("");

    let titleList = [];
    // let editionList = [];
    if (!isNaN(titleParam)) {
        // This code no longer works with the current URL setup
        // If titleParam is a number, then it's the titleID
        document.title = titleList[0].title.titleName + " | " + appName + " | " + siteName;
        titleNameBreadCrumb = titleList[0].title.titleName;
        titleID = titleList[0].title.titleID;
        titlePublicationDate = titleList[0].title.publicationDate;
        // setTitleID(titleList[0].title.titleID);
        // setTitlePublicationDate(titleList[0].title.publicationDate);

        titleList = titleListState.filter(title => title.titleID === parseInt(titleParam));

        // editionList = editionListState.filter(edition => edition.titleID === parseInt(titleParam));

    } else if (titleParam !== undefined && titleParam !== null) {
        // If titleParam is not a number, then it's the title name
        titleList = titleListState.filter(title => title.titleURL === titleParam);
        const title = titleListState.find(title => title.titleURL === titleParam);
        // console.log(componentName, "typeof title", typeof title);
        // console.log(componentName, "title", title);

        if (title !== undefined && title !== null) {
            document.title = title.titleName + " | " + appName + " | " + siteName;
            titleNameBreadCrumb = title.titleName;
            titleID = title.titleID;
            titlePublicationDate = title.publicationDate;
            // setTitleID(title.titleID);
            // setTitlePublicationDate(title.publicationDate);

            // editionList = editionListState.filter(edition => edition.titleID === parseInt(title.titleID));

        } else {
            document.title = "Title Not Found | " + appName + " | " + siteName;
            console.log("Title not found.");
            // console.log(componentName, "titleParam", titleParam);
            // // Display all active titles
            // titleList = titleListState;
            // // Display all active editions
            // editionList = editionListState;
            // setErrTitleMessage("Title not found.")
        };

    } else {
        document.title = "All Titles | " + appName + " | " + siteName;
        // Display all active titles
        // titleList = [...titleListState];
        titleList = titleListState.filter(title => title.active === true);
        // Display all active editions
        // editionList = [...editionListState];
        // editionList = editionListState.filter(edition => edition.active === true);
    };

    // if (electronicOnly === true) {
    //     editionList = editionList.filter(edition => edition.medium.electronic === true);
    // } else if (physicalOnly === true) {
    //     editionList = editionList.filter(edition =>  edition.medium.electronic === false);
    // } else {
    //     editionList = [...editionList];
    // };

    if (admin !== undefined && admin !== null && admin === true) {
        titleList = [...titleList];
        // editionList = [...editionList];
    } else {
        titleList = titleList.filter(title => title.active === true);
        // editionList = editionList.filter(edition => edition.active === true);
    };
    // console.log(componentName, "titleList", titleList);

    // Sort the titleList array by title.titleSort
    // Really not needed here since there should only be one item in the array
    titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
    // console.log(componentName, "titleList", titleList);

    // Sort the editionList array by media.sortID
    // console.log(componentName, "editionList", editionList);
    // editionList.sort((a, b) => (a.medium.sortID > b.medium.sortID) ? 1 : -1);
    // console.log(componentName, "editionList", editionList);

    const userReviewsState = useSelector(state => state.userReviews.arrayUserReviews);
    // console.log(componentName, "userReviewsState", userReviewsState);

    let userReviews = userReviewsState.filter(userReview => userReview.titleID === titleID);

    let userReviewItem = {};

    if (userID !== undefined && userID !== null && !isNaN(userID)) {
        userReviewItem = userReviews.filter(userReview => userReview.userID === userID);
        userReviewItem = userReviewItem[0];
    };
    // console.log(componentName, "userReviewItem", userReviewItem);
    // console.log(componentName, "typeof userReviewItem.read", typeof userReviewItem.read);
    // console.log(componentName, "userReviewItem.read", userReviewItem.read);
    // console.log(componentName, "typeof userReviewItem.dateRead", typeof userReviewItem.dateRead);
    // console.log(componentName, "userReviewItem.dateRead", userReviewItem.dateRead);
    // console.log(componentName, "typeof userReviewItem[0].read", typeof userReviewItem[0].read);
    // console.log(componentName, "userReviewItem[0].read", userReviewItem[0].read);
    // console.log(componentName, "typeof userReviewItem[0].dateRead", typeof userReviewItem[0].dateRead);
    // console.log(componentName, "userReviewItem[0].dateRead", userReviewItem[0].dateRead);

    // const userReviewsRatingsState = useSelector(state => state.userReviews.arrayUserReviewsRatings);
    // // console.log(componentName, "userReviewsState", userReviewsState);

    // let userReviewRatingItem = {};
    // // console.log(componentName, "userReviewRatingItem", userReviewRatingItem);

    // if (titleID !== undefined && titleID !== null && !isNaN(titleID)) {
    //     userReviewRatingItem = userReviewsRatingsState.filter(userReview => userReview.titleID === titleID);
    //     userReviewRatingItem = userReviewRatingItem[0];
    // };

    // let overallTitleRatingCount = 0;
    // let overallTitleRating = 0;

    // if (userReviewRatingItem !== undefined && userReviewRatingItem !== null) {
    //     if (userReviewRatingItem.hasOwnProperty("userReviewAverage")) {
    //         overallTitleRating = userReviewRatingItem.userReviewAverage;
    //     };
    
    //     if (userReviewRatingItem.hasOwnProperty("userReviewCount")) {
    //         overallTitleRatingCount = userReviewRatingItem.userReviewCount;
    //     };
    // };

    // const [overallTitleRatingMessage, setOverallTitleRatingMessage] = useState("");
    // const [errOverallTitleRatingMessage, setErrOverallTitleRatingMessage] = useState("");
    // const [overallTitleRatingResultsFound, setOverallTitleRatingResultsFound] = useState(null);
    // const [overallTitleRating, setOverallTitleRating] = useState(null);
    // const [overallTitleRatingCount, setOverallTitleRatingCount] = useState(0);

    // const getTitleRating = () => {
    //     // console.log(componentName, "getTitleRating");
    //     // console.log(componentName, "getTitleRating baseURL", baseURL);

    //     setOverallTitleRatingMessage("");
    //     setErrOverallTitleRatingMessage("");
    //     setOverallTitleRatingResultsFound(null);
    //     setOverallTitleRating(null);
    //     setOverallTitleRatingCount(0);

    //     let url = baseURL + "userreview/";

    //     if (titleID !== null) {
    //         url = url + "rating/" + titleID;

    //         // console.log(componentName, "getTitleRating url", url);

    //         fetch(url)
    //         .then(response => {
    //             // console.log(componentName, "getTitleRating response", response);
    //             if (!response.ok) {
    //                 // throw Error(response.status + " " + response.statusText + " " + response.url);
    //                 return {resultsFound: false, message: "Offline User Reviews Rating data fetch used."};
    //             } else {
    //                 return response.json();
    //             };
    //         })
    //         .then(data => {
    //             // console.log(componentName, "getTitleRating data", data);

    //             setOverallTitleRatingResultsFound(data.resultsFound);
    //             setOverallTitleRatingMessage(data.message);

    //             if (data.resultsFound === true) {
    //                 // console.log(componentName, "getTitleRating data.userReviews[0].userReviewCount", data.userReviews[0].userReviewCount);
    //                 // console.log(componentName, "getTitleRating data.userReviews[0].userReviewSum", data.userReviews[0].userReviewSum);

    //                 setOverallTitleRatingCount(data.userReviews[0].userReviewCount);
    //                 let userReviewCount = data.userReviews[0].userReviewCount;

    //                 if (userReviewCount > 0) {

    //                     let userReviewSum = data.userReviews[0].userReviewSum;
    //                     // Check for division by zero?
    //                     // let userReviewAverage: number = userReviewSum/0;
    //                     let userReviewAverage = userReviewSum/userReviewCount;

    //                     // console.log(componentName, "getTitleRating userReviewCount", userReviewCount);
    //                     // console.log(componentName, "getTitleRating state.overallTitleRatingCount", state.overallTitleRatingCount);
    //                     // console.log(componentName, "getTitleRating userReviewSum", userReviewSum);
    //                     // console.log(componentName, "getTitleRating userReviewAverage", userReviewAverage);

    //                     setOverallTitleRating(userReviewAverage);
    //                 };

    //             } else {
    //                 console.log(componentName, "getEditions resultsFound error", data.message);
    //                 setErrOverallTitleRatingMessage(data.message);
    //             };

    //         })
    //         .catch(error => {
    //             console.log(componentName, "getTitleRating error", error);
    //             // console.log(componentName, "getTitleRating error.name", error.name);
    //             // console.log(componentName, "getTitleRating error.message", error.message);
    //             setErrOverallTitleRatingMessage(error.name + ": " + error.message);
    //         });

    //     };

    // };

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
            setErrTitleMessage("Title not found.");
        };

    }, [titleList]);

    // useEffect(() => {
    //     // console.log(componentName, "useEffect titleID", titleID);

    //     if (titleID !== undefined && titleID !== null && titleID !== "" && overallTitleRatingResultsFound === null) {
    //         getTitleRating();
    //     };

    // }, [titleID]);

    // useEffect(() => {
    //     // console.log(componentName, "useEffect editionList", editionList);
    //     if (editionList.length > 0) {
    //         setErrEditionMessage("");
    //     } else {
    //         setErrEditionMessage("No editions found.");
    //     };
    // }, [editionList]);

    return(
        <Container className="mt-4"> 
            <Row>
                <Col xs="12">
                    <Breadcrumb className="breadcrumb mb-2">
                        <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                        {titleList[0] !== undefined && titleList[0].category !== undefined && titleList[0].category.category !== undefined && isNaN(titleList[0].category.category) ? 
                        <BreadcrumbItem><Link to={encodeURL(titleList[0].category.category)} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(titleList[0].category.category));}}>{titleList[0].category.category}</Link></BreadcrumbItem>
                        :
                        <BreadcrumbItem><Link to={"/titles/"} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage("/titles/");}}>All Titles</Link></BreadcrumbItem>
                        }
                        <BreadcrumbItem active>{titleNameBreadCrumb}</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col className="text-center" xs="12">   
                    {errTitleMessage !== "" ? <Alert color="danger">{errTitleMessage}</Alert> : null}
                </Col>
            </Row>
            {titleList.map((title) => {

                let activeString = "";
                if (title.active === true) {
                    // activeString = "Active";
                    activeString = "";
                } else {
                    activeString = "Inactive";
                };

            return (
                <React.Fragment key={title.titleID}>
                <Row>
                    <Col xs="12">
                        <h4>{title.titleName}

                            {title.publicationDate !== undefined && title.publicationDate !== null ? <span className="ml-2 smallerText"> ({displayYear(title.publicationDate)})</span> : null}

                            {/* {title.category.category !== null && title.category.category !== "" ? <span className="ml-4 smallerText"><Link to={encodeURL(title.category.category)}>{title.category.category}</Link>
                            </span> : null} */}
                            {activeString !== undefined && activeString !== null && activeString !== "" ? <span className="ml-2 inactiveItem">({activeString})</span> : null}
                            {admin !== undefined && admin !== null && admin === true ? <AddTitle displayButton={true} /> : null}
                            {admin !== undefined && admin !== null && admin === true ? <EditTitle titleID={title.titleID} displayButton={true} /> : null}
                        </h4>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col xs="12">
                        <p>{title.authorFirstName} {title.authorLastName}</p>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col xs="4">
                        {title.imageName !== undefined && title.imageName !== null && title.imageName !== "" ? <img src={setLocalImagePath(title.imageName)} alt={title.titleName} className="coverDisplay" /> : <Image className="noImageIcon"/>}
                    </Col>
                    <Col xs="8">

                        {title.userReviewCount !== undefined && title.userReviewCount !== null && title.userReviewCount > 0 ? 
                        <React.Fragment>
                        <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={title.userReviewAverage} />
                        <p><small>out of {title.userReviewCount} review(s)</small></p>
                        </React.Fragment>
                        : null}

                        {userReviewItem !== undefined && userReviewItem !== null ? 
                        <React.Fragment>
                            {userReviewItem.read !== undefined && userReviewItem.read !== null && userReviewItem.read === true && (userReviewItem.dateRead === undefined || userReviewItem.dateRead === null || userReviewItem.dateRead === "") ? <p>Read</p> : null}
                            {userReviewItem.dateRead !== undefined && userReviewItem.dateRead !== null && userReviewItem.dateRead !== "" ? <p>Read on {displayDate(userReviewItem.dateRead)}</p> : null}
                        </React.Fragment>
                        : null}

                        {sessionToken !== undefined && sessionToken !== null && sessionToken !== "" && (userReviewItem === undefined || userReviewItem === null) ? <AddUserReview titleID={title.titleID} displayButton={true} /> : null}
                        {sessionToken !== undefined && sessionToken !== null && sessionToken !== "" && userReviewItem !== undefined && userReviewItem !== null ? <EditUserReview reviewID={userReviewItem.reviewID} displayButton={true} /> : null}

                        {title.shortDescription !== "" && title.shortDescription !== null ? <div dangerouslySetInnerHTML={{"__html": displayParagraphs(title.shortDescription)}} /> : null}
                        {title.urlPKDweb !== "" && title.urlPKDweb !== null ? <p><a href={title.urlPKDweb} target="_blank" rel="noopener noreferrer">Encyclopedia Dickiana</a></p> : null}
                        {admin !== undefined && admin !== null && admin === true ? <AddEdition titleID={title.titleID} titlePublicationDate={title.publicationDate} displayButton={true} /> : null}
                    </Col>
                </Row>

                </React.Fragment>
                )
            })}

            {/* <Row className="my-4">
                <Col className="text-center" xs="12">
                {errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
                {electronicOnly ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}
                {physicalOnly ? <Alert color="info">{physicalOnlyMessage}</Alert> : null}
                </Col>
            </Row>
            {editionList.length > 0 ?
            <Row className="my-4">
                <Col xs="12">
                    <h5 className="text-center">Find A Copy 
                    {admin !== undefined && admin !== null && admin === true ? <AddEdition titleID={titleID} titlePublicationDate={titlePublicationDate} displayButton={true} /> : null}
                    </h5>
                </Col>
            </Row>
            : null}
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
                <Col key={edition.editionID} xs="6" className="mb-4"> */}

                    {/* <Card key={edition.editionID}>
                    <CardHeader>
                        <Link to={encodeURL(edition.medium.media)}>{edition.medium.media}</Link>
                    </CardHeader>
                    <CardBody>
                    {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />
                    :
                        <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                        {edition.imageName !== null && edition.imageName !== undefined && edition.imageName !== "" ? <img src={setLocalImagePath(edition.imageName)} alt="" className="editionImage" /> : <Image className="noImageIcon"/>}
                        </a>
                    }
                    </CardBody>
                    <CardFooter>
                        {edition.publicationDate !== null ? <CardText>Released: {displayDate(edition.publicationDate)}</CardText> : null}
                    </CardFooter>
                    </Card> */}

                    {/* <Card key={edition.editionID}>
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
                            {edition.imageName !== null && edition.imageName !== undefined && edition.imageName !== "" ? <img src={setLocalImagePath(edition.imageName)} alt="" className="editionImage" /> : <Image className="noImageIcon"/>}
                            </a>
                        }
                        </Col>
                        <Col className="col-md-6">
                            <CardBody>
                                {edition.publicationDate !== null ? <CardText className="smallerText">Released: {displayDate(edition.publicationDate)}</CardText> : null}
                                {admin !== undefined && admin !== null && admin === true ? <EditEdition editionID={edition.editionID} titlePublicationDate={titlePublicationDate} displayButton={true} /> : null}
                            </CardBody>
                        </Col>
                    </Row>
                    <CardFooter className="cardFooter">
                        <CardText><Link to={encodeURL(edition.medium.media)} onClick={(event) => {event.preventDefault(); redirectPage(encodeURL(edition.medium.media));}}>{edition.medium.media}</Link></CardText>
                    </CardFooter>
                    </Card>

                </Col>
                )
            })}
            </Row> */}

            <Row>
                <Edition titleID={titleID} titlePublicationDate={titlePublicationDate} />
            </Row>

            <Row>
                <UserReview titleID={titleID} />
            </Row>
        </Container>
    );

};

export default Title;
