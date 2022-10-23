import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Nav, NavItem, NavLink, Collapse, Card } from "reactstrap";
import { noFunctionAvailable, isEmpty, getDateTime, displayValue, isNonEmptyArray } from "shared-functions";
import { encodeURL, convertBitTrueFalse } from "../../utilities/ApplicationFunctions";
import { setPageURL } from "../../app/urlsSlice";
// import EditCategory from "./EditCategory";
// import EditCategories from "./EditCategories";

const Category = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: -- 10/21/2022 MF
  // * Functions: redirectPage, getTitles -- 10/21/2022 MF

  const componentName = "Category";

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const categoryListState = useSelector(state => state.categories.arrayCategories);

  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;
  let getTitles = isEmpty(props) === false && isEmpty(props.getTitles) === false ? props.getTitles : noFunctionAvailable;

  const [isOpen, setIsOpen] = useState(true);

  const [categoryList, setCategoryList] = useState([]);


  useEffect(() => {

    let categoryListSort = [];

    if (isEmpty(categoryListState) === false) {

      if (isEmpty(admin) === false && admin === true) {

        categoryListSort = [...categoryListState];

      } else {

        categoryListSort = categoryListState.filter(category => category.active === true || category.active === 1);
        // categoryListSort = categoryListState.filter(category => category.categoryActive === true || category.categoryActive === 1);

      };


      categoryListSort.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

      setCategoryList(categoryListSort);

    };

  }, [categoryListState]);


  return (
    <React.Fragment>

      <Card onClick={(event) => { setIsOpen(!isOpen); }} color="light" className="mt-2 p-2"><h5>Categories</h5></Card>

      <Collapse isOpen={isOpen}>

        {isNonEmptyArray(categoryList) === true ?

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
                <NavItem key={category.categoryID}>

                  {/* <a href="#" onClick={(event) => {event.preventDefault(); getTitles(category.categoryID)}}>{category.category}</a> */}

                  {/* <NavLink tag={Link} to={`/titles/${category.categoryID}`}>{category.categoryID}</NavLink>
                <NavLink tag={Link} to={`/titles/${category.category.replaceAll("-", "|").replaceAll("-", "|").replaceAll(" ", "-")}`}>{category.category}</NavLink>
                <NavLink tag={Link} to={"/titles/" + category.categoryID}>{category.categoryID}</NavLink> */}

                  {/* <NavLink tag={Link} to={"/titles/" + encodeURL(category.category)}>{category.category}</NavLink> */}

                  <NavLink tag={Link} to={encodeURL(category.category)} onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(category.category)); }}>{category.category}
                    {isEmpty(activeString) === false ? <span className="ms-2 inactive-item">({activeString})</span> : null}
                  </NavLink>

                </NavItem>
              );
            })}

          </Nav>

          : null}

      </Collapse>

      {/* {isEmpty(admin) === false && admin === true ? <EditCategory displayButton={true} /> : null} */}
      {/* {isEmpty(admin) === false && admin === true ? <EditCategories displayButton={true} /> : null} */}

    </React.Fragment>
  );
};

export default Category;
