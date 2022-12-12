import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { noFunctionAvailable, isEmpty, getDateTime, displayValue } from "shared-functions";
import { setLocalPath, setLocalImagePath } from "../utilities/ApplicationFunctions";

const Dickian = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "Dickian";

  const siteName = useSelector(state => state.applicationSettings.siteName);
  const applicationName = useSelector(state => state.applicationSettings.applicationName);

  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  document.title = "Home | " + applicationName + " | " + siteName;


  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12">

          <h4 className="text-center">Dickian</h4>

        </Col>
      </Row>

      <Row>
        <Col xs="8">

          Definition.

        </Col>
        <Col xs="3">

          <img src={setLocalImagePath("https://www.homeopape.com/images/Portrait_512x340_brushes-crop1-1.jpg")} alt="Philip K. Dick" />

        </Col>
      </Row>

    </Container>
  );
};

export default Dickian;
