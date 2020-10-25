import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import {ListGroup, ListGroupItem} from "reactstrap";
// import AddCategory from "./AddCategory";

const Category = (props) => {

    const categoryListState = useSelector(state => state.categories);
    // console.log("Category.js categoryListState", categoryListState);
    
    // console.log("Category.js props.categoryList", props.categoryList);

    return(
        <ListGroup flush>
        {categoryListState.map((category) => {
          return (
            <ListGroupItem key={category.categoryID}>
                {/* <a href="#" onClick={(event) => {event.preventDefault(); console.log(event.target.value); props.getTitles(category.categoryID)}}>{category.category}</a> */}
                <Link to={`/titles/${category.categoryID}`}>{category.categoryID}</Link>
                <Link to={`/titles/${category.category.replaceAll(" ", "-")}`}>{category.category}</Link>
                </ListGroupItem>
            )
        })}

        {/* <ListGroupItem key="addCategory"><AddCategory userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayButton={true} /></ListGroupItem> */}

        </ListGroup>
    );

};

export default Category;
