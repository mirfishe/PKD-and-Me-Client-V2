import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { isEmpty, displayValue, getDateTime } from "../../utilities/SharedFunctions";
import { encodeURL, toTitleCase, addErrorLog } from "../../utilities/ApplicationFunctions";

const FormatPost = () => {

  const componentName = "FormatPost";

  const navigate = useNavigate();

  // const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const [txtArticleTitle, setTxtArticleTitle] = useState("");
  const [txtArticleURL, setTxtArticleURL] = useState("");

  const [cbxPhilipKDickFestival, setCbxPhilipKDickFestival] = useState(false);
  const [cbxDickian, setCbxDickian] = useState(false);
  const [cbxBladeRunner, setCbxBladeRunner] = useState(false);
  const [cbxBladeRunner2049, setCbxBladeRunner2049] = useState(false);
  const [cbxTotalRecall, setCbxTotalRecall] = useState(false);
  const [cbxElectricDreams, setCbxElectricDreams] = useState(false);
  const [cbxTMITHC, setCbxTMITHC] = useState(false);
  const [cbxMinorityReport, setCbxMinorityReport] = useState(false);

  // const [formattedPost, setFormattedPost] = useState("");
  const [formattedPosts, setFormattedPosts] = useState([]);


  const formatPost = () => {

    let post = toTitleCase(txtArticleTitle) + " #PhilipDick #PhilipKDick ";

    if (cbxPhilipKDickFestival === true) {

      post = post + " #PhilipKDickFestival ";

    };

    if (cbxDickian === true) {

      post = post + " #Dickian ";

    };

    if (cbxBladeRunner === true) {

      post = post + " #BladeRunner ";

    };

    if (cbxBladeRunner2049 === true) {

      post = post + " #BladeRunner2049 ";

    };

    if (cbxTotalRecall === true) {

      post = post + " #TotalRecall ";

    };

    if (cbxElectricDreams === true) {

      post = post + " #ElectricDreams ";

    };

    if (cbxTMITHC === true) {

      post = post + " #TMITHC #HighCastle ";

    };

    if (cbxMinorityReport === true) {

      post = post + " #MinorityReport ";

    };

    let param = "";
    let regExp = "";
    let newURL = txtArticleURL;

    // * Remove fbclid=
    // * FaceBook analytics and tracking
    // * Removes everything after the fbclid=
    // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537
    param = "fbclid";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");

    // * Remove utm_medium=
    // * Google Analytics and tracking
    // * Removes everything after the utm_medium=
    param = "utm_medium";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");

    // * Remove utm_campaign=
    // * Google Analytics and tracking
    // * Removes everything after the utm_campaign=
    param = "utm_campaign";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");

    // * Remove utm_source=
    // * Google Analytics and tracking
    // * Removes everything after the utm_source=
    param = "utm_source";
    regExp = new RegExp("[?&]" + param + "=.*$");
    newURL = newURL.replace(regExp, "");

    post = post + newURL;

    // setFormattedPost(post);

    let formattedPostsArray = [...formattedPosts];

    formattedPostsArray.push(post);

    setFormattedPosts(formattedPostsArray);

  };


  useEffect(() => {

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);


  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12">

          <h4 className="text-center">Format Social Media Post</h4>

        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Form>

            <FormGroup>
              <Label for="txtImageName">Article Title</Label>
              <Input type="text" id="txtArticleTitle" value={txtArticleTitle} onChange={(event) => { setTxtArticleTitle(event.target.value); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtArticleURL">Article URL</Label>
              <Input type="text" id="txtArticleURL" value={txtArticleURL} onChange={(event) => { setTxtArticleURL(event.target.value); }} />
            </FormGroup>

            <FormGroup row>
              <Col>

                <FormGroup className="ms-4">
                  <Label for="cbxPhilipKDickFestival"><Input type="checkbox" id="cbxPhilipKDickFestival" checked={cbxPhilipKDickFestival} onChange={(event) => { setCbxPhilipKDickFestival(!cbxPhilipKDickFestival); }} /> Philip K. Dick Festival</Label>
                </FormGroup>

                <FormGroup className="ms-4">
                  <Label for="cbxDickian"><Input type="checkbox" id="cbxDickian" checked={cbxDickian} onChange={(event) => { setCbxDickian(!cbxDickian); }} /> Dickian</Label>
                </FormGroup>

                <FormGroup className="ms-4">
                  <Label for="cbxBladeRunner"><Input type="checkbox" id="cbxBladeRunner" checked={cbxBladeRunner} onChange={(event) => { setCbxBladeRunner(!cbxBladeRunner); }} /> Blade Runner</Label>
                </FormGroup>

                <FormGroup className="ms-4">
                  <Label for="cbxBladeRunner2049"><Input type="checkbox" id="cbxBladeRunner2049" checked={cbxBladeRunner2049} onChange={(event) => { setCbxBladeRunner2049(!cbxBladeRunner2049); }} /> Blade Runner 2049</Label>
                </FormGroup>

              </Col>
              <Col>

                <FormGroup className="ms-4">
                  <Label for="cbxTotalRecall"><Input type="checkbox" id="cbxTotalRecall" checked={cbxTotalRecall} onChange={(event) => { setCbxTotalRecall(!cbxTotalRecall); }} /> Total Recall</Label>
                </FormGroup>

                <FormGroup className="ms-4">
                  <Label for="cbxElectricDreams"><Input type="checkbox" id="cbxElectricDreams" checked={cbxElectricDreams} onChange={(event) => { setCbxElectricDreams(!cbxElectricDreams); }} /> Electric Dreams</Label>
                </FormGroup>

                <FormGroup className="ms-4">
                  <Label for="cbxTMITHC"><Input type="checkbox" id="cbxTMITHC" checked={cbxTMITHC} onChange={(event) => { setCbxTMITHC(!cbxTMITHC); }} /> TMITHC</Label>
                </FormGroup>

                <FormGroup className="ms-4">
                  <Label for="cbxMinorityReport"><Input type="checkbox" id="cbxMinorityReport" checked={cbxMinorityReport} onChange={(event) => { setCbxMinorityReport(!cbxMinorityReport); }} /> Minority Report</Label>
                </FormGroup>

              </Col>
            </FormGroup>

            <Button outline size="lg" color="primary" onClick={formatPost}>Format Post</Button>
            <Button outline size="lg" color="secondary">Reset</Button>
            <Button outline size="lg" color="secondary">Cancel</Button>

            {/* <FormGroup className="text-center">
                            {isEmpty(formattedPost) === false ? <Alert color="info">{formattedPost}</Alert> : null}
                        </FormGroup> */}

            {Array.isArray(formattedPosts) === true ?

              <React.Fragment>

                {formattedPosts.map((formattedPost, index) => {

                  return (
                    <FormGroup key={index} className="text-center">
                      <Alert color="info">{formattedPost}</Alert>
                    </FormGroup>
                  );
                })}

              </React.Fragment>

              : null}

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormatPost;
