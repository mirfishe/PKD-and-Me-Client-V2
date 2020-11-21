import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Container, Col, Row, Alert, Button, Link} from "reactstrap";
import {encodeURL} from "../../app/sharedFunctions";
import {setPageURL} from "../../app/urlsSlice";


const Checklist = (props) => {

    const componentName = "Checklist.js";

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionToken = useSelector(state => state.user.sessionToken);
    // console.log(componentName, "sessionToken", sessionToken);
    const admin = useSelector(state => state.user.admin);
    // console.log(componentName, "admin", admin);

    const [isOpen, setIsOpen] = useState(true);

    const categoryListState = useSelector(state => state.categories.arrayCategories);
    // console.log(componentName, "categoryListState", categoryListState);

    let categoryList = [];

    if (admin !== undefined && admin !== null && admin === true) {
        categoryList = [...categoryListState];
    } else {
        categoryList = categoryListState.filter(category => category.active === true);
    };
    // console.log(componentName, "categoryList", categoryList);

    categoryList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

    const redirectPage = (linkName) => {
        // console.log(componentName, "redirectPage", linkName);
        dispatch(setPageURL(linkName.replaceAll("/", "")));
        history.push("/" + linkName);
    };

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return(
        <React.Fragment>
        <Nav vertical>
        {categoryList.map((category) => {

          return (
            <Col key={category.categoryID} className="mt-2 pl-3">
                {/* <a href="#" onClick={(event) => {event.preventDefault(); console.log(event.target.value); props.getTitles(category.categoryID)}}>{category.category}</a> */}
                {/* <Link to={`/titles/${category.categoryID}`}>{category.categoryID}</Link>
                <Link to={`/titles/${category.category.replaceAll("-", "|").replaceAll("-", "|").replaceAll(" ", "-")}`}>{category.category}</Link>
                <Link to={"/titles/" + category.categoryID}>{category.categoryID}</Link> */}
                {/* <Link to={"/titles/" + encodeURL(category.category)}>{category.category}</Link> */}
                <Link to={encodeURL(category.category)} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(category.category));}}>{category.category} 
                {activeString !== undefined && activeString !== null && activeString !== "" ? <span className="ml-2 inactiveItem">({activeString})</span> : null}
                </Link>
            </Col>
            )
        })}
        </Nav>
        </React.Fragment>
    );

};

export default Checklist;
