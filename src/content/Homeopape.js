import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row} from "reactstrap";
import {setLocalPath, setLocalImagePath} from "../app/sharedFunctions";
import {setPageURL} from "../app/urlsSlice";

const Homeopape = () => {

    const componentName = "Homeopape.js";

    const dispatch = useDispatch();
    const history = useHistory();

    const siteName = useSelector(state => state.app.siteName);
    const appName = useSelector(state => state.app.appName);
    document.title = "Home | " + appName + " | " + siteName;

    const redirectPage = (linkName) => {
        // console.log(componentName, "edirectPage", linkName);
        dispatch(setPageURL(linkName.replaceAll("/", "")));
        history.push("/" + linkName);
    };

    return (
        <Container className="mt-4">
            <Row>
            <Col xs="12">
            <h4 className="text-center">Homeopape</h4>
            </Col>
            </Row>

            <Row>
            <Col xs="8">

            <p>Purchase digital (i.e. not analog) versions of the novels, short stories, and non-fiction of <Link to="/about">Philip K. Dick</Link> or other works related to Philip K. Dick’s life and his writing. For reading, watching or listening on the go with your portable homeopape* device.</p>

            <p>*Homeopape<br />
            A newspaper that filters the news so it only shows what you are interested in- these are beginning to exist now in the form of web robots. Along with many SF predictions, there are anachronisms in the way the thing operates. The homeopape asks you what you want to read about. (the forefront of our technology), and then prints it on paper. It’s obvious that this was written before PCs were common.</p>

            <p>View the <a href={setLocalPath("http://www.philipdick.com/resources/miscellaneous/pkdicktionary/#homeopape")} target="_blank" rel="noopener noreferrer">definition on the Philip K. Dick Fan Site</a>.</p>

            <Container>
                <blockquote className="blockquote-reverse">
                <p>In a corner of the large room a chime sounded and a tinkling mechanical voice called, “I’m your free homeopape machine, a service supplied exclusively by all the fine Rootes hotels throughout Earth and the colonies. Simply dial the classification of news that you wish, and in a matter of seconds I’ll speedily provide you with a fresh, up-to-the-minute homeopape tailored to your individual requirements; and, let me repeat, at no cost to you!”</p>
                <footer>From <Link to="/Ubik" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage("Ubik");}}>Ubik</Link>, by <Link to="/about">Philip K. Dick</Link></footer>
                </blockquote>
            </Container>

            </Col>
            <Col xs="3">
            <img src={setLocalPath("https://www.homeopape.com/images/Portrait_512x340_brushes-crop1-1.jpg")} alt="Philip K. Dick" />
            </Col>
            </Row>

        </Container>
    );
};

export default Homeopape;
