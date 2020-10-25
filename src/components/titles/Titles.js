import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import {Container, Col, Row} from "reactstrap";

const Titles = (props) => {

    // console.log("Titles.js props.titleList", props.titleList);

    const titleListState = useSelector(state => state.titles);
    // console.log("Titles.js titleListState", titleListState);
    const categoryListState = useSelector(state => state.categories);
    // console.log("Titles.js categoryListState", categoryListState);

    // console.log("Titles.js props.match.params", props.match.params);
    const categoryID = props.match.params.categoryID;
    // console.log("Titles.js typeof categoryID", typeof categoryID);
    // console.log("Titles.js categoryID", categoryID);

    let titleList = [];
    if (!isNaN(categoryID)) {
        titleList = titleListState.filter(title => title.categoryID === parseInt(categoryID));
    } else if (categoryID !== undefined) {
        const category = categoryListState.find(category => category.category === categoryID.replaceAll("-", " "));
        // console.log("Titles.js typeof category", typeof category);
        // console.log("Titles.js category", category);
        titleList = titleListState.filter(title => title.categoryID === parseInt(category.categoryID));
    } else {
        titleList = titleListState;
    };
    // console.log("Titles.js titleList", titleList);

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

export default Titles;
