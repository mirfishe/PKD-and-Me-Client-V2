import React from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { noFunctionAvailable, isEmpty, getDateTime, displayValue } from "shared-functions";
// import { setLocalPath, setLocalImagePath } from "../utilities/ApplicationFunctions";
import FromTheHomeopape from "../components/fromTheHomeopape/FromTheHomeopape";

const Updates = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "Updates";

  const profileType = useSelector(state => state.applicationSettings.profileType);
  const siteName = useSelector(state => state.applicationSettings.siteName);
  const applicationName = useSelector(state => state.applicationSettings.applicationName);

  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  document.title = "From the Homeopape | " + applicationName + " | " + siteName;


  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12">

          <h3 className="text-center">From the Homeopape</h3>

          <h6 className="text-center">Updates from the world of Philip K. Dick.</h6>

        </Col>
      </Row>

      <Row className="my-4">
        <Col xs="12">

          <FromTheHomeopape topNumber="50" />

        </Col>
      </Row>

    </Container>
  );
};

export default Updates;
