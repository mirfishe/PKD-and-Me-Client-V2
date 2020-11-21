import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Container, Col, Row, Alert, Button} from "reactstrap";
import AppSettings from "../../app/environment";

const URLList = (props) => {

    const componentName = "URLList.js";

    // Loading the baseURL from the state store here is too slow
    // Always pulling it from environment.js
    // const baseURL = useSelector(state => state.app.baseURL);
    const baseURL = AppSettings.baseURL;
    
    const siteName = useSelector(state => state.app.siteName);
    const appName = useSelector(state => state.app.appName);
    document.title = "URL List | " + appName + " | " + siteName;

    const [urlMessage, setUrlMessage] = useState("");
    const [errUrlMessage, setErrUrlMessage] = useState("");
    const [urlResultsFound, setUrlResultsFound] = useState(null);

    const urlList = useSelector(state => state.urls.arrayURLs);
    // console.log(componentName, "urlList", urlList);

    return(
        <Container className="mt-4">
            <Row className="text-center">
            {urlMessage !== "" ? <Alert color="info">{urlMessage}</Alert> : null}
            {errUrlMessage !== "" ? <Alert color="danger">{errUrlMessage}</Alert> : null}
            </Row>
            {/* <Row>
            <Col xs="2">
                <Button onClick={copyText}>Copy</Button>
            </Col>
            </Row> */}
            <Row>
                {/* <pre>
                    {JSON.stringify(urlList)}
                </pre> */}
                <span>
                    {JSON.stringify({"resultsFound": true, "message": "Offline URL data used.", "urls": urlList})}
                </span>
            </Row>
        <Row>
            {/* {urlResultsFound !== null ? <Url urlList={urlList} /> : null} */}
            {/* <Url urlList={urlListState} /> */}
        </Row>
        </Container>
    );
};

export default URLList;
