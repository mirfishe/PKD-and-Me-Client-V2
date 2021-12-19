import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Nav, NavItem, Collapse, Card } from "reactstrap";
import { IsEmpty, DisplayValue, GetDateTime, encodeURL, ConvertBitTrueFalse } from "../../utilities/SharedFunctions";
import { setPageURL } from "../../app/urlsSlice";
import AddCategory from "./AddCategory";
import EditCategories from "./EditCategories";

const Category = (props) => {

  const componentName = "Category.js";

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  const categoryListState = useSelector(state => state.categories.arrayCategories);
  // console.log(componentName, GetDateTime(), "categoryListState", categoryListState);

  const [isOpen, setIsOpen] = useState(true);

  const [categoryList, setCategoryList] = useState([]);


  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect categoryListState", categoryListState);

    let categoryListSort = [];

    if (IsEmpty(categoryListState) === false) {

      if (IsEmpty(admin) === false && admin === true) {

        categoryListSort = [...categoryListState];

      } else {

        categoryListSort = categoryListState.filter(category => category.active === true || category.active === 1);
        // categoryListSort = categoryListState.filter(category => category.categoryActive === true || category.categoryActive === 1);

      };

      // console.log(componentName, GetDateTime(), "useEffect categoryListSort", categoryListSort);

      categoryListSort.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

      setCategoryList(categoryListSort);

    };

  }, [categoryListState]);


  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);

  };


  return (
    <React.Fragment>

      <Card onClick={(event) => { setIsOpen(!isOpen); }} color="light" className="mt-2 p-2"><h5>Categories</h5></Card>

      <Collapse isOpen={isOpen}>

        <Nav vertical>

          {categoryList.map((category) => {

            let activeString = "";

            if (category.active === true || category.active === 1) {
              // if (category.categoryActive === true || category.categoryActive === 1) {

              // activeString = "Active";
              activeString = "";

            } else {

              activeString = "Inactive";

            };

            return (
              <NavItem key={category.categoryID} className="mt-2 pl-3">

                {/* <a href="#" onClick={(event) => {event.preventDefault(); console.log(componentName, GetDateTime(), "event.target.value", event.target.value); props.getTitles(category.categoryID)}}>{category.category}</a> */}

                {/* <Link to={`/titles/${category.categoryID}`}>{category.categoryID}</Link>
                <Link to={`/titles/${category.category.replaceAll("-", "|").replaceAll("-", "|").replaceAll(" ", "-")}`}>{category.category}</Link>
                <Link to={"/titles/" + category.categoryID}>{category.categoryID}</Link> */}

                {/* <Link to={"/titles/" + encodeURL(category.category)}>{category.category}</Link> */}

                <Link to={encodeURL(category.category)} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(encodeURL(category.category)); }}>{category.category}
                  {IsEmpty(activeString) === false ? <span className="ml-2 inactiveItem">({activeString})</span> : null}
                </Link>

              </NavItem>
            );
          })}

        </Nav>

      </Collapse>

      {IsEmpty(admin) === false && admin === true ? <AddCategory displayButton={true} /> : null}
      {IsEmpty(admin) === false && admin === true ? <EditCategories displayButton={true} /> : null}

    </React.Fragment>
  );
};

export default Category;
