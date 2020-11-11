import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, Alert, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Image} from "react-bootstrap-icons";
import {displayDate, displayYear, encodeURL, decodeURL, displayParagraphs, removeOnePixelImage, setLocalPath, setLocalImagePath} from "../../app/sharedFunctions";
import {setPageURL} from "../../app/urlsSlice";

const Title = (props) => {

    const componentName = "Title.js";

    const dispatch = useDispatch();
    const history = useHistory();

    const siteName = useSelector(state => state.app.siteName);
    const appName = useSelector(state => state.app.appName);

    const electronicOnly = useSelector(state => state.app.electronicOnly);
    const electronicOnlyMessage = useSelector(state => state.app.electronicOnlyMessage);
    const physicalOnly = useSelector(state => state.app.physicalOnly);
    const physicalOnlyMessage = useSelector(state => state.app.physicalOnlyMessage);

    const [errTitleMessage, setErrTitleMessage] = useState("");
    const [errEditionMessage, setErrEditionMessage] = useState("");

    const titleListState = useSelector(state => state.titles.arrayTitles);
    // console.log(componentName, "titleListState", titleListState);
    const editionListState = useSelector(state => state.editions.arrayEditions);
    // console.log(componentName, "editionListState", editionListState);

    // console.log(componentName, "props.match.params", props.match.params);
    const titleParam = props.linkItem.linkName; // props.match.params.title;
    // console.log(componentName, "typeof titleParam", typeof titleParam);
    // console.log(componentName, "titleParam", titleParam);

    let titleNameBreadCrumb = "";

    let titleList = [];
    let editionList = [];
    if (!isNaN(titleParam)) {
        // If titleParam is a number, then it's the titleID
        document.title = titleList[0].title.titleName + " | " + appName + " | " + siteName;
        titleList = titleListState.filter(title => title.titleID === parseInt(titleParam));

        if (electronicOnly) {
            editionList = editionListState.filter(edition => edition.titleID === parseInt(titleParam) && edition.medium.electronic === true);
        } else if (physicalOnly) {
            editionList = editionListState.filter(edition => edition.titleID === parseInt(titleParam) && edition.medium.electronic === false);
        } else {
            editionList = editionListState.filter(edition => edition.titleID === parseInt(titleParam));
        };

    } else if (titleParam !== undefined) {
        // If titleParam is not a number, then it's the title name
        titleList = titleListState.filter(title => title.titleURL === titleParam);
        const title = titleListState.find(title => title.titleURL === titleParam);
        // console.log(componentName, "typeof title", typeof title);
        // console.log(componentName, "title", title);

        if (title !== undefined) {
            document.title = title.titleName + " | " + appName + " | " + siteName;
            titleNameBreadCrumb = title.titleName;

            if (electronicOnly) {
                editionList = editionListState.filter(edition => edition.titleID === parseInt(title.titleID) && edition.medium.electronic === true);
            } else if (physicalOnly) {
                editionList = editionListState.filter(edition => edition.titleID === parseInt(title.titleID) && edition.medium.electronic === false);
            } else {
                editionList = editionListState.filter(edition => edition.titleID === parseInt(title.titleID));
            };

        } else {
            document.title = "Title Not Found | " + appName + " | " + siteName;
            console.log("Title not found.");
            // // Display all titles
            // titleList = titleListState;
            // // Display all editions
            // editionList = editionListState;
            // setErrTitleMessage("Title not found.")
        };

    } else {
        document.title = "All Titles | " + appName + " | " + siteName;
        // Display all titles
        titleList = [...titleListState];
        // Display all editions
        editionList = [...editionListState];
    };

    // Sort the titleList array by title.titleSort
    // Really not needed here since there should only be one item in the array
    titleList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

    // Sort the editionList array by media.sortID
    editionList.sort((a, b) => (a.medium.sortID > b.medium.sortID) ? 1 : -1);

    // console.log(componentName, "editionList", editionList);

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

    useEffect(() => {
        // console.log(componentName, "useEffect editionList", editionList);
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
                <Col xs="12">   
                    {errTitleMessage !== "" ? <Alert color="danger">{errTitleMessage}</Alert> : null}
                </Col>
            </Row>
            {titleList.map((title) => {
            return (
                <React.Fragment>
                <Row>
                    <Col xs="12">
                        <h4>{title.titleName}

                            {title.publicationDate !== null ? <span className="ml-2 smallerText"> ({displayYear(title.publicationDate)})</span> : null}

                            {/* {title.category.category !== null && title.category.category !== "" ? <span className="ml-4 smallerText"><Link to={encodeURL(title.category.category)}>{title.category.category}</Link>
                            </span> : null} */}
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
                        {title.imageName !== null && title.imageName !== undefined && title.imageName !== "" ? <img src={setLocalImagePath(title.imageName)} alt={title.titleName} className="coverDisplay" /> : <Image className="noImageIcon"/>}
                    </Col>
                    <Col xs="8">
                        {title.shortDescription !== "" && title.shortDescription !== null ? <div dangerouslySetInnerHTML={{"__html": displayParagraphs(title.shortDescription)}} /> : null}
                        {title.urlPKDweb !== "" && title.urlPKDweb !== null ? <p><a href={title.urlPKDweb} target="_blank" rel="noopener noreferrer">Encyclopedia Dickiana</a></p> : null}
                    </Col>
                </Row>

                </React.Fragment>
                )
            })}

            <Row>
                <Col xs="12">
                {errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
                {electronicOnly ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}
                {physicalOnly ? <Alert color="info">{physicalOnlyMessage}</Alert> : null}
                </Col>
            </Row>
            {editionList.length > 0 ?
            <Row>
                <Col xs="12">
                    <h5 className="text-center">Find A Copy</h5>
                </Col>
            </Row>
            : null}
            <Row>
            {editionList.map((edition) => {
            return (
                <Col key={edition.editionID} xs="6" className="mb-4">

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

                    <Card key={edition.editionID}>
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
                            </CardBody>
                        </Col>
                    </Row>
                    <CardFooter className="cardFooter">
                        <CardText><Link to={encodeURL(edition.medium.media)} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(edition.medium.media));}}>{edition.medium.media}</Link></CardText>
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
