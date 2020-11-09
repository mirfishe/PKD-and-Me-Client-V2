import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row} from "reactstrap";
import {setPageURL} from "../app/urlsSlice";

const New = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const siteName = useSelector(state => state.app.siteName);
    document.title = "New To Philip K. Dick? | " + siteName;

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
            <Col xs="12">
            https://philipdick.com/biography/new-to-philip-k-dick/

            <p><Link to="/Do-Androids-Dream-Of-Electric-Sheep" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage("Do-Androids-Dream-Of-Electric-Sheep");}}>Do Androids Dream of Electric Sheep?</Link><br />
            His most famous novel which inspired Blade Runner. A chilling futuristic story that demonstrates his creative genius. The most common gateway book for new readers of Philip K. Dick, I believe.</p>

            <p><Link to="/Ubik" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage("Ubik");}}>Ubik</Link><br />
            A great story of corporate intrigue where time moves backwards. Intensely psychological with unpredictable plot twists.</p>

            <p><Link to="/The-Man-In-The-High-Castle" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage("The-Man-In-The-High-Castle");}}>The Man in the High Castle</Link><br />
            Dick’s masterpiece which won the Hugo Award in 1963. A mind-bending novel which takes place in an America occupied by Axis forces. These are some of his strongest characters.</p>

            <p>Or instead if you are more daring and think you would like to read more than one of these books,<br />
            this Library of America press book is a bargain, containing all three of these recommended books plus another excellent novel.</p>

            If you would like further recommendations, visit The Connoisseurs’ Choice collated by Umberto Rossi.
            https://philipdick.com/biography/the-connoisseurs-choice/

            </Col>
            </Row>

    

        </Container>
    );
};

export default New;
