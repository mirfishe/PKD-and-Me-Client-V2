import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row} from "reactstrap";
import {setLocalPath, setLocalImagePath} from "../app/sharedFunctions";
import {setPageURL} from "../app/urlsSlice";
import TitleCard from "../components/titles/TitleCard";

const New = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const siteName = useSelector(state => state.app.siteName);
    const appName = useSelector(state => state.app.appName);
    document.title = "New To Philip K. Dick? | " + appName + " | " + siteName;

    const redirectPage = (linkName) => {
        // console.log("New.js redirectPage", linkName);
        dispatch(setPageURL(linkName.replaceAll("/", "")));
        history.push("/" + linkName);
    };

    return (
        <Container className="mt-4">
            <Row>
            <Col xs="12">
            <h4 className="text-center">New To Philip K. Dick?</h4>

            <h6 className="text-center">Recommended First Reads</h6>
            </Col>
            </Row>

            <Row>
            <Col xs="12" className="mb-4">
            <TitleCard linkItem={{linkName: "Do-Androids-Dream-Of-Electric-Sheep"}} imageSide="right" additionalText="His most famous novel which inspired Blade Runner. A chilling futuristic story that demonstrates his creative genius. The most common gateway book for new readers of Philip K. Dick, I believe." />
            </Col>
            </Row>

            <Row>
            <Col xs="12" className="mb-4">
            <TitleCard linkItem={{linkName: "Ubik"}} imageSide="left" additionalText="A great story of corporate intrigue where time moves backwards. Intensely psychological with unpredictable plot twists." />
            </Col>
            </Row>

            <Row>
            <Col xs="12" className="mb-4">
            <TitleCard linkItem={{linkName: "The-Man-In-The-High-Castle"}} imageSide="right" additionalText="Dick’s masterpiece which won the Hugo Award in 1963. A mind-bending novel which takes place in an America occupied by Axis forces. These are some of his strongest characters." />
            </Col>
            </Row>

            <Row>
            <Col xs="12" className="mb-4">
            <TitleCard linkItem={{linkName: "Four-Novels-Of-The-1960s"}} imageSide="left" additionalText="Or instead if you are more daring and think you would like to read more than one of these books, this Library of America press book is a bargain, containing all three of these recommended books plus another excellent novel." />
            </Col>
            </Row>

            <Row>
            <Col xs="12" className="mb-4">
            <p className="text-center">If you would like further recommendations, visit <a href={setLocalPath("https://philipdick.com/biography/the-connoisseurs-choice/")} target="_blank" rel="noopener noreferrer">The Connoisseurs’ Choice</a> collated by Umberto Rossi.</p>
            </Col>
            </Row>

            <Row>
            <Col xs="12" className="mb-4">
            <p className="text-center"><a href={setLocalPath("https://philipdick.com/mirror/misc/sf_book_reviews.pdf")} target="_blank" rel="noopener noreferrer">Book Reviews From The SF Press</a></p>
            </Col>
            </Row>

        </Container>
    );
};

export default New;
