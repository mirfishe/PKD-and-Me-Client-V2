import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import {Container, Col, Row} from "reactstrap";

const Title = (props) => {

    // console.log("Title.js props.titleList", props.titleList);

    const titleListState = useSelector(state => state.titles);
    // console.log("Title.js titleListState", titleListState);

    // console.log("Title.js props.match.params", props.match.params);
    const titleID = props.match.params.titleID;
    console.log("Title.js typeof titleID", typeof titleID);
    console.log("Title.js titleID", titleID);

    let titleList = [];
    if (!isNaN(titleID)) {
        titleList = titleListState.filter(title => title.titleID === parseInt(titleID));
    } else if (titleID !== undefined) {
        titleList = titleListState.filter(title => title.titleName === titleID.replaceAll("-", " ")); // .replaceAll("%20", " "));
    } else {
        titleList = titleListState;
    };
    console.log("Title.js titleList", titleList);

    return(
        <Container>
            <Row>
            {titleList.map((title) => {
            return (
                <Col key={title.titleID}>
                    <img src={title.imageName} alt={title.titleName} className="coverImage" />
                    {title.titleName}
                    <Link to={`/title/${title.titleID}`}>{title.titleID}</Link>
                    <Link to={`/title/${title.titleName.replaceAll(" ", "-")}`}>{title.titleName}</Link>
                    <Link to={`/editions/${title.titleID}`}>{title.titleID}</Link>
                    <Link to={`/editions/${title.titleName.replaceAll(" ", "-")}`}>{title.titleName}</Link>
                </Col>
                )
            })}
            </Row>
        </Container>
    );

};

export default Title;
