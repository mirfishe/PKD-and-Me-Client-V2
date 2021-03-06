import React, { useState } from "react";
import { Container, Col, Row, Form, FormGroup, Label, Input, Alert, Button } from "reactstrap";
import { IsEmpty } from "../../app/sharedFunctions";

const FormatPost = () => {

  const componentName = "FormatPost.js";

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

  const toTitleCase = (title) => {
    // * https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    let i, j, str, lowers, uppers;
    str = title.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // * Certain minor words should be left lowercase unless 
    // * they are the first or last words in the string
    lowers = ["A", "An", "The", "And", "But", "Or", "For", "Nor", "As", "At",
      "By", "For", "From", "In", "Into", "Near", "Of", "On", "Onto", "To", "With"];
    for (i = 0, j = lowers.length; i < j; i++)
      str = str.replace(new RegExp("\\s" + lowers[i] + "\\s", "g"),
        function (txt) {
          return txt.toLowerCase();
        });

    // * Certain words such as initialisms or acronyms should be left uppercase
    uppers = ["Id", "Tv", "Pkd"];
    for (i = 0, j = uppers.length; i < j; i++)
      str = str.replace(new RegExp("\\b" + uppers[i] + "\\b", "g"),
        uppers[i].toUpperCase());

    return str;
  };

  const formatPost = () => {
    // console.log(componentName, "formatPost");

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


    // * Remove fbclid=
    // * Removes everything after the fbclid=
    // * https://gist.github.com/hehe24h/acfa46c57bc4f37a5ca6814cb1652537
    let param = "fbclid";
    let regExp = new RegExp("[?&]" + param + "=.*$");
    let newURL = txtArticleURL.replace(regExp, "");

    post = post + newURL;

    // setFormattedPost(post);

    let formattedPostsArray = [...formattedPosts];

    formattedPostsArray.push(post);

    setFormattedPosts(formattedPostsArray);


  };


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
              <Input type="text" id="txtArticleTitle" value={txtArticleTitle} onChange={(event) => {/*console.log(event.target.value);*/ setTxtArticleTitle(event.target.value); }} />
            </FormGroup>

            <FormGroup>
              <Label for="txtArticleURL">Article URL</Label>
              <Input type="text" id="txtArticleURL" value={txtArticleURL} onChange={(event) => {/*console.log(event.target.value);*/ setTxtArticleURL(event.target.value); }} />
            </FormGroup>

            <FormGroup row>

              <Col>

                <FormGroup className="ml-4">
                  <Input type="checkbox" id="cbxPhilipKDickFestival" checked={cbxPhilipKDickFestival} onChange={(event) => {/*console.log(event.target.value);*/ setCbxPhilipKDickFestival(!cbxPhilipKDickFestival); }} />
                  <Label for="cbxPhilipKDickFestival">Philip K Dick Festival</Label>
                </FormGroup>

                <FormGroup className="ml-4">
                  <Input type="checkbox" id="cbxDickian" checked={cbxDickian} onChange={(event) => {/*console.log(event.target.value);*/ setCbxDickian(!cbxDickian); }} />
                  <Label for="cbxDickian">Dickian</Label>
                </FormGroup>

                <FormGroup className="ml-4">
                  <Input type="checkbox" id="cbxBladeRunner" checked={cbxBladeRunner} onChange={(event) => {/*console.log(event.target.value);*/ setCbxBladeRunner(!cbxBladeRunner); }} />
                  <Label for="cbxBladeRunner">Blade Runner</Label>
                </FormGroup>

                <FormGroup className="ml-4">
                  <Input type="checkbox" id="cbxBladeRunner2049" checked={cbxBladeRunner2049} onChange={(event) => {/*console.log(event.target.value);*/ setCbxBladeRunner2049(!cbxBladeRunner2049); }} />
                  <Label for="cbxBladeRunner2049">Blade Runner 2049</Label>
                </FormGroup>

              </Col>

              <Col>

                <FormGroup className="ml-4">
                  <Input type="checkbox" id="cbxTotalRecall" checked={cbxTotalRecall} onChange={(event) => {/*console.log(event.target.value);*/ setCbxTotalRecall(!cbxTotalRecall); }} />
                  <Label for="cbxTotalRecall">Total Recall</Label>
                </FormGroup>

                <FormGroup className="ml-4">
                  <Input type="checkbox" id="cbxElectricDreams" checked={cbxElectricDreams} onChange={(event) => {/*console.log(event.target.value);*/ setCbxElectricDreams(!cbxElectricDreams); }} />
                  <Label for="cbxElectricDreams">Electric Dreams</Label>
                </FormGroup>

                <FormGroup className="ml-4">
                  <Input type="checkbox" id="cbxTMITHC" checked={cbxTMITHC} onChange={(event) => {/*console.log(event.target.value);*/ setCbxTMITHC(!cbxTMITHC); }} />
                  <Label for="cbxTMITHC">TMITHC</Label>
                </FormGroup>

                <FormGroup className="ml-4">
                  <Input type="checkbox" id="cbxMinorityReport" checked={cbxMinorityReport} onChange={(event) => {/*console.log(event.target.value);*/ setCbxMinorityReport(!cbxMinorityReport); }} />
                  <Label for="cbxMinorityReport">Minority Report</Label>
                </FormGroup>

              </Col>

            </FormGroup>

            <Button outline size="lg" color="primary" onClick={formatPost}>Format Post</Button>
            <Button outline size="lg" color="secondary">Reset</Button>
            <Button outline size="lg" color="secondary">Cancel</Button>

            {/* <FormGroup className="text-center">
                            {IsEmpty(formattedPost) === false ? <Alert color="info">{formattedPost}</Alert> : null}
                        </FormGroup> */}

            {formattedPosts.map((formattedPost) => {

              return (
                <FormGroup className="text-center">
                  <Alert color="info">{formattedPost}</Alert>
                </FormGroup>
              )
            })}

          </Form>
        </Col>
      </Row>
    </Container>
  );

};

export default FormatPost;
