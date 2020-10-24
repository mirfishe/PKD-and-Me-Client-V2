import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {ListGroup, ListGroupItem} from "reactstrap";
// import AddCategory from "./AddCategory";

const Category = (props) => {

    // console.log("Category.js props.categoryList", props.categoryList);

    return(
        <ListGroup flush>
        {props.categoryList.map((category) => {
          return (
            <ListGroupItem key={category.categoryID}>
                <a href="#" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ props.getTitles(category.categoryID)}}>{category.category}</a>
                </ListGroupItem>
            )
        })}

        {/* <ListGroupItem key="addCategory"><AddCategory userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayButton={true} /></ListGroupItem> */}

        </ListGroup>
    );

};

export default Category;
