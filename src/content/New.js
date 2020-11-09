import React from "react";
import {useSelector} from "react-redux";
import {Container, Col, Row} from "reactstrap";

const New = () => {

    const siteName = useSelector(state => state.app.siteName);
    document.title = "New To Philip K. Dick? | " + siteName;

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

            <p>Do Androids Dream of Electric Sheep?<br />
            His most famous novel which inspired Blade Runner. A chilling futuristic story that demonstrates his creative genius. The most common gateway book for new readers of Philip K. Dick, I believe.</p>

            <p>Ubik<br />
            A great story of corporate intrigue where time moves backwards. Intensely psychological with unpredictable plot twists.</p>

            <p>The Man in the High Castle<br />
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
