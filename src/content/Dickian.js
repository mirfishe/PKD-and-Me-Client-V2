import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { IsEmpty, DisplayValue, GetDateTime } from "../utilities/SharedFunctions";
import { setLocalPath, setLocalImagePath } from "../utilities/AppFunctions";
import { setPageURL } from "../app/urlsSlice";

const Dickian = () => {

  const componentName = "Dickian.js";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);

  document.title = "Home | " + appName + " | " + siteName;


  const redirectPage = (linkName) => {

    // console.log(componentName, GetDateTime(), "redirectPage", linkName);
    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

  };


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
