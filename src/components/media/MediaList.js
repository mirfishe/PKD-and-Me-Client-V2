import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Container, Col, Row, Alert} from "reactstrap";
// import Media from "./Media";

const MediaList = (props) => {

    const componentName = "MediaList.js";

    const baseURL = useSelector(state => state.app.baseURL);

    const siteName = useSelector(state => state.app.siteName);
    const appName = useSelector(state => state.app.appName);
    document.title = "Media List | " + appName + " | " + siteName;

    // const mediaListState = useSelector(state => state.media);
    // console.log(componentName, "mediaListState", mediaListState);

    // const [url, setUrl] = useState("");
    const [mediaMessage, setMediaMessage] = useState("");
    const [errMediaMessage, setErrMediaMessage] = useState("");
    const [mediaResultsFound, setMediaResultsFound] = useState(null);
    const [mediaList, setMediaList] = useState([]);

    const getMedia = () => {
        // console.log(componentName, "getMedia");
        // console.log(componentName, "getMedia baseURL", baseURL);

        setMediaMessage("");
        setErrMediaMessage("");
        setMediaResultsFound(null);
        setMediaList([]);

        // console.log(componentName, "getMedia this.props.mediaID", this.props.mediaID);
        // this.props.setMediaID(null);
        // console.log(componentName, "getMedia this.props.titleID", this.props.titleID);
        // this.props.setTitleID(null);

        let url = baseURL + "media/";

        fetch(url)
        .then(response => {
            // console.log(componentName, "getMedia response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log(componentName, "getMedia data", data);

            setMediaResultsFound(data.resultsFound);
            setMediaMessage(data.message);

            if (data.resultsFound === true) {
                setMediaList(data.media);
            } else {
                setErrMediaMessage(data.message);
            };

        })
        .catch(error => {
            console.log(componentName, "getMedia error", error);
            // console.log(componentName, "getMedia error.name", error.name);
            // console.log(componentName, "getMedia error.message", error.message);
            setErrMediaMessage(error.name + ": " + error.message);
        });

    };

    useEffect(() => {
        getMedia();
    }, []);

    return(
        <Container className="mt-4">
        <Row>
            {mediaMessage !== "" ? <Alert color="info">{mediaMessage}</Alert> : null}
            {errMediaMessage !== "" ? <Alert color="danger">{errMediaMessage}</Alert> : null}
        </Row>
        {mediaResultsFound !== null ? 
            <Row>
                {/* <pre>
                    {JSON.stringify(mediaList)}
                </pre> */}
                <span>
                    {JSON.stringify(mediaList)}
                </span>
            </Row>
        : null}

        <Row>
           {/* {mediaResultsFound !== null ? <Media mediaList={mediaList} /> : null} */}
           {/* <Media mediaList={mediaListState} /> */}
        </Row>
        </Container>
    );
};

export default MediaList;
