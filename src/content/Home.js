import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { IsEmpty, DisplayValue, GetDateTime, setLocalPath, setLocalImagePath } from "../app/sharedFunctions";
import { setPageURL } from "../app/urlsSlice";
import TitleCard from "../components/titles/TitleCard";
import FromTheHomeopape from "../components/fromTheHomeopape/FromTheHomeopape";

const Home = () => {

  const componentName = "Home.js";

  const dispatch = useDispatch();
  const history = useHistory();

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  document.title = "Home | " + appName + " | " + siteName;


  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);
    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);
  };


  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12">
          <h3 className="text-center">PKD and Me</h3>

          <h6 className="text-center">A personal journey into the works of Philip K. Dick.</h6>
        </Col>
      </Row>

      <Row>
        <Col xs="10">

          <p>When someone discovers the work of Philip K. Dick and becomes fascinated by it, there is a phenomenon in which they must read all of his work as fast as possible. Sometimes the plots and incidents blur together into one mega-novel. And there are a lot of novels.</p>

          <p>View resources such as publication dates, covers and links to more information for an even deeper dive into the works.</p>

          <p>Future improvements are the ability to create an account, review titles and mark which titles have been read.</p>

          <p>An electronic only version is available at <a href={setLocalPath("https://homeopape.com")} target="_blank" rel="noopener noreferrer">Homeopape</a>.</p>

          <p>If you have any comments, questions or suggestions, please email philipkdickfans[at]gmail[dot]com</p>

        </Col>
        <Col xs="2">
          <img src={setLocalImagePath("https://philipdick.com/images/PKD/Philip_Dick2.jpg")} alt="Philip K. Dick" />
        </Col>
      </Row>

      <Row className="mx-4">
        <Col xs="12">
          <TitleCard randomTitle={true} showShortDescription={true} headerText="From the Bibliography" />
        </Col>
      </Row>

      <Row className="my-4">
        <Col xs="12">
          <FromTheHomeopape headerText="From the Homeopape" />
        </Col>
      </Row>

      {/* <Row className="my-4">
        <Col xs="8">
          <TitleCard randomTitle={true} showShortDescription={true} headerText="From the Bibliography" />
        </Col>
        <Col xs="4">
          <FromTheHomeopape headerText="From the Homeopape" />
        </Col>
      </Row> */}

    </Container>
  );
};

export default Home;
