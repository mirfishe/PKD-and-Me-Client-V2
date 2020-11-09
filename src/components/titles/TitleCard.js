import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert} from "reactstrap";
import {Image} from "react-bootstrap-icons";
import {displayYear, encodeURL, decodeURL, setLocalPath} from "../../app/sharedFunctions";
import {setPageURL} from "../../app/urlsSlice";

const TitleCard = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [errTitleMessage, setErrTitleMessage] = useState("");

    const titleListState = useSelector(state => state.titles.arrayTitles);
    // console.log("TitleCard.js titleListState", titleListState);

    let imageSide = "left";
    if (props.imageSide !== undefined && props.imageSide !== "") {
        imageSide = props.imageSide;
    } else {
        imageSide = "left";
    };
    // console.log("TitleCard.js props.imageSide", props.imageSide);
    // console.log("TitleCard.js imageSide", imageSide);

    const additionalText = props.additionalText;
    // console.log("TitleCard.js props.additionalText", props.additionalText);

    // console.log("TitleCard.js props.match.params", props.match.params);
    const titleParam = props.linkItem.linkName; // props.match.params.title;
    // console.log("TitleCard.js typeof titleParam", typeof titleParam);
    // console.log("TitleCard.js titleParam", titleParam);

    let titleList = [];
    if (!isNaN(titleParam)) {
        // If titleParam is a number, then it"s the titleID
        titleList = titleListState.filter(title => title.titleID === parseInt(titleParam));
    } else if (titleParam !== undefined) {
        // If titleParam is not a number, then it"s the title name
        titleList = titleListState.filter(title => title.titleURL === titleParam);
        const title = titleListState.find(title => title.titleURL === titleParam);
        // console.log("TitleCard.js typeof title", typeof title);
        // console.log("TitleCard.js title", title);
    } else {
        console.log("Title not found.");
        // Display all titles
        // titleList = [...titleListState];
    };

    const redirectPage = (linkName) => {
        // console.log("TitleCard.js redirectPage", linkName);
        dispatch(setPageURL(linkName.replaceAll("/", "")));
        history.push("/" + linkName);
    };

    useEffect(() => {
        // console.log("TitleCard.js useEffect titleList", titleList);
        if (titleList.length > 0) {
            setErrTitleMessage("");
        } else {
            setErrTitleMessage("Title not found.");
        };
    }, [titleList]);

    return(
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs="12">
                    {/* {errCategoryMessage !== "" ? <Alert color="danger">{errCategoryMessage}</Alert> : null} */}
                    {errTitleMessage !== "" ? <Alert color="danger">{errTitleMessage}</Alert> : null}
                </Col>
            </Row>
            <Row className="justify-content-center">
            {titleList.map((title) => {
            return (
                <Col key={title.titleID} xs="8" className="mb-4">
                    <Card key={title.titleID}>
                    <Row className="no-gutters">

                    {imageSide === "left" ?
                        <Col className="col-md-4">
                            <Link to={title.titleURL} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(title.titleURL);}}>
                            {title.imageName !== null && title.imageName !== undefined && title.imageName !== "" ? <CardImg src={setLocalPath(title.imageName)} alt={title.titleName} /> : <Image className="noImageIcon" />}
                            </Link>
                        </Col>
                    : null}

                        <Col className="col-md-8">
                            <CardBody>
                                {/* <CardText><Link to={title.category.category.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category.category}</Link></CardText> */}
                                <CardText><Link to={title.titleURL} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(title.titleURL);}}>{title.titleName}</Link>
                                {title.publicationDate !== null ? <span className="ml-1 smallerText">({displayYear(title.publicationDate)})</span> : null}</CardText>
                                <CardText className="smallerText">{title.authorFirstName} {title.authorLastName}</CardText>
                                {additionalText !== undefined && additionalText !== "" ? <CardText className="my-5">{additionalText}</CardText> : null}
                            </CardBody>
                        </Col>

                        {imageSide === "right" ?
                        <Col className="col-md-4">
                            <Link to={title.titleURL} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(title.titleURL);}}>
                            {title.imageName !== null && title.imageName !== undefined && title.imageName !== "" ? <CardImg src={setLocalPath(title.imageName)} alt={title.titleName} /> : <Image className="noImageIcon" />}
                            </Link>
                        </Col>
                    : null}

                    </Row>
                    <CardFooter className="cardFooter">
                        <CardText><Link to={encodeURL(titleList[0].category.category)} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(titleList[0].category.category));}}>{titleList[0].category.category}</Link></CardText>
                    </CardFooter>  
                    </Card>

                </Col>
                )
            })}
            </Row>
        </Container>
    );

};

export default TitleCard;
