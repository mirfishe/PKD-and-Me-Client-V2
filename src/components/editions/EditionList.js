import React, {useState, useEffect} from "react";
// import {useSelector} from "react-redux";
import {Container, Col, Row, Alert} from "reactstrap";
import {baseURL} from "../../app/constants";
// import Edition from "./Edition";

const EditionList = (props) => {

    // const editionListState = useSelector(state => state.edition);
    // console.log("EditionList.js editionListState", editionListState);

    // const [url, setUrl] = useState("");
    const [editionMessage, setEditionMessage] = useState("");
    const [errEditionMessage, setErrEditionMessage] = useState("");
    const [editionResultsFound, setEditionResultsFound] = useState(null);
    const [editionList, setEditionList] = useState([]);

    const getEditions = () => {
        // console.log("EditionList.js getEdition");
        // console.log("EditionList.js getEdition baseURL", baseURL);

        setEditionMessage("");
        setErrEditionMessage("");
        setEditionResultsFound(null);
        setEditionList([]);

        // console.log("EditionList.js getEdition this.props.editionID", this.props.editionID);
        // this.props.setEditionID(null);
        // console.log("EditionList.js getEdition this.props.titleID", this.props.titleID);
        // this.props.setTitleID(null);

        let url = baseURL + "edition/list";

        fetch(url)
        .then(response => {
            // console.log("EditionList.js getEdition response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("EditionList.js getEdition data", data);

            setEditionResultsFound(data.resultsFound);
            setEditionMessage(data.message);

            if (data.resultsFound === true) {
                setEditionList(data.editions);
            } else {
                setErrEditionMessage(data.message);
            };

        })
        .catch(error => {
            console.log("EditionList.js getEdition error", error);
            // console.log("EditionList.js getEdition error.name", error.name);
            // console.log("EditionList.js getEdition error.message", error.message);
            setErrEditionMessage(error.name + ": " + error.message);
        });

    };

    useEffect(() => {
        getEditions();
    }, []);

    return(
        <Container className="mt-4">
        <Row>
            {editionMessage !== "" ? <Alert color="info">{editionMessage}</Alert> : null}
            {errEditionMessage !== "" ? <Alert color="danger">{errEditionMessage}</Alert> : null}
        </Row>
        {editionResultsFound !== null ?
            <Row>
                {/* <pre>
                    {JSON.stringify(editionList)}
                </pre> */}
                <span>
                    {JSON.stringify(editionList)}
                </span>
            </Row>
        : null}

        <Row>
           {/* {editionResultsFound !== null ? <Edition editionList={editionList} /> : null} */}
           {/* <Edition editionList={editionListState} /> */}
        </Row>
          </Container>
    );
};

export default EditionList;
