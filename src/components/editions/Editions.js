import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import {Container, Col, Row} from "reactstrap";

const Editions = (props) => {

    // console.log("Editions.js props.editionList", props.editionList);

    const editionListState = useSelector(state => state.editions);
    // console.log("Editions.js editionListState", editionListState);
    const titleListState = useSelector(state => state.titles);
    // console.log("Editions.js titleListState", titleListState);

    console.log("Editions.js props.match.params", props.match.params);
    const titleID = props.match.params.titleID;
    console.log("Editions.js typeof titleID", typeof titleID);
    console.log("Editions.js titleID", titleID);

    // Will never work because the URL doesn't specify which value is coming to the page
    const mediaID = props.match.params.mediaID;
    console.log("Editions.js typeof mediaID", typeof mediaID);
    console.log("Editions.js mediaID", mediaID);

    let editionList = [];
    if (!isNaN(titleID)) {
        editionList = editionListState.filter(edition => edition.titleID === parseInt(titleID));
    } else if (titleID !== undefined) {
        const title = titleListState.find(title => title.titleName === titleID.replaceAll("-", " "));
        // console.log("Editions.js typeof category", typeof category);
        // console.log("Editions.js category", category);
        editionList = editionListState.filter(edition => edition.titleID === parseInt(title.titleID));
    } else {
        editionList = editionListState;
    };
    // console.log("Editions.js editionList", editionList);

    return(
        <Container>
            <Row>
            {editionList.map((edition) => {
            return (
                <Col key={edition.editionID}>
                    <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} className="coverImage" />
                </Col>
                )
            })}
            </Row>
        </Container>
    );

};

export default Editions;
