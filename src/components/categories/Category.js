import React, {useState}  from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Nav, NavItem, Collapse, Card} from "reactstrap";
import {encodeURL} from "../../app/constants";

const Category = (props) => {

    const [isOpen, setIsOpen] = useState(true);

    const categoryListState = useSelector(state => state.categories.arrayCategories);
    // console.log("Category.js categoryListState", categoryListState);
    
    // console.log("Category.js props.categoryList", props.categoryList);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return(
        <React.Fragment>
        <Card onClick={toggle} color="light" className="mt-2 p-2">Categories</Card>
        <Collapse isOpen={isOpen}>
        <Nav vertical>
        {categoryListState.map((category) => {
          return (
            <NavItem key={category.categoryID}>
                {/* <a href="#" onClick={(event) => {event.preventDefault(); console.log(event.target.value); props.getTitles(category.categoryID)}}>{category.category}</a> */}
                {/* <Link to={`/titles/${category.categoryID}`}>{category.categoryID}</Link>
                <Link to={`/titles/${category.category.replaceAll("-", "|").replaceAll("-", "|").replaceAll(" ", "-")}`}>{category.category}</Link>
                <Link to={"/titles/" + category.categoryID}>{category.categoryID}</Link> */}
                <Link to={"/titles/" + encodeURL(category.category)}>{category.category}</Link>
            </NavItem>
            )
        })}
        </Nav>
        </Collapse>
        </React.Fragment>
    );

};

export default Category;
