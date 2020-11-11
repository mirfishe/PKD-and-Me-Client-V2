import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row} from "reactstrap";
import {setLocalPath, setLocalImagePath} from "../app/sharedFunctions";
import {setPageURL} from "../app/urlsSlice";
import TitleCard from "../components/titles/TitleCard";

const Home = () => {

    const componentName = "Home.js";

    const dispatch = useDispatch();
    const history = useHistory();

    const siteName = useSelector(state => state.app.siteName);
    const appName = useSelector(state => state.app.appName);
    document.title = "Home | " + appName + " | " + siteName;

    const redirectPage = (linkName) => {
        // console.log(componentName, "redirectPage", linkName);
        dispatch(setPageURL(linkName.replaceAll("/", "")));
        history.push("/" + linkName);
    };

    return (
        <Container className="mt-4">
            <Row>
            <Col xs="12">
            <h4 className="text-center">PKD and Me</h4>

            <h6 className="text-center">A personal journey into the works of Philip K. Dick.</h6>
            </Col>
            </Row>

            <Row>
            <Col xs="10">

                {/* add contact method
                    for suggestions of items to add
                    site issues
                    anything else
                description of what's here */}

            <p>When someone discovers the work of Philip K. Dick and becomes fascinated by it, there is a phenomenon in which they must read all of his work as fast as possible. Sometimes the plots and incidents blur together into one mega-novel. And there are a lot of novels.</p>

            <p>View resources such as publication dates, covers and links to more information for an even deeper dive into the work.</p>

            </Col>
            <Col xs="2">
            <img src={setLocalPath("https://philipdick.com/images/PKD/Philip_Dick2.jpg")} alt="Philip K. Dick" />
            </Col>
            </Row>

            <Row className="mx-4">
            <Col xs="12">
            <TitleCard randomTitle={true} showShortDescription={true} headerText="From the Bibliography" />
            </Col>
            </Row>

        </Container>
    );
};

export default Home;
