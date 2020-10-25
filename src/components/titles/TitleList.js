import React, {useState, useEffect} from "react";
// import { useSelector } from 'react-redux'
import {Container, Col, Row, Alert} from "reactstrap";
import {baseURL} from "../../app/constants";
// import Title from "./Title";

const TitleList = (props) => {

    // const titleListState = useSelector(state => state.title);
    // console.log("TitleList.js titleListState", titleListState);

    // const [url, setUrl] = useState("");
    const [titleMessage, setTitleMessage] = useState("");
    const [errTitleMessage, setErrTitleMessage] = useState("");
    const [titleResultsFound, setTitleResultsFound] = useState(null);
    const [titleList, setTitleList] = useState([]);

    const getTitles = () => {
        // console.log("TitleList.js getTitle");
        // console.log("TitleList.js getTitle baseURL", baseURL);

        setTitleMessage("");
        setErrTitleMessage("");
        setTitleResultsFound(null);
        setTitleList([]);

        // console.log("TitleList.js getTitle this.props.titleID", this.props.titleID);
        // this.props.setTitleID(null);
        // console.log("TitleList.js getTitle this.props.titleID", this.props.titleID);
        // this.props.setTitleID(null);

        let url = baseURL + "title/";

        fetch(url)
        .then(response => {
            // console.log("TitleList.js getTitle response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("TitleList.js getTitle data", data);

            setTitleResultsFound(data.resultsFound);
            setTitleMessage(data.message);

            if (data.resultsFound === true) {
                setTitleList(data.titles);
            } else {
                setErrTitleMessage(data.message);
            };

        })
        .catch(error => {
            console.log("TitleList.js getTitle error", error);
            // console.log("TitleList.js getTitle error.name", error.name);
            // console.log("TitleList.js getTitle error.message", error.message);
            setErrTitleMessage(error.name + ": " + error.message);
        });

    };

    useEffect(() => {
        getTitles();
    }, []);

    return(
        <Container>
        <Row>

        {titleResultsFound !== null ?
            <pre>
                {JSON.stringify(titleList)}
            </pre>
        : null} 
        
           <Col xs="2">
           {titleMessage !== "" ? <Alert severity="info">{titleMessage}</Alert> : null}
           {errTitleMessage !== "" ? <Alert severity="error">{errTitleMessage}</Alert> : null}
           {/* {titleResultsFound !== null ? <Title titleList={titleList} /> : null} */}
           {/* <Title titleList={titleListState} /> */}
           </Col>

           </Row>
          </Container>
    );
};

export default TitleList;
