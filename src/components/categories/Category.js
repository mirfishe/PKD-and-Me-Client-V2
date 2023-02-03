import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row, Nav, NavItem, NavLink } from "reactstrap";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";
import { encodeURL, convertBitTrueFalse } from "../../utilities/ApplicationFunctions";
// import EditCategory from "./EditCategory";
// import EditCategories from "./EditCategories";

const Category = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "Category";

  // const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const arrayCategories = useSelector(state => state.categories.arrayCategories);

  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  const [categoryList, setCategoryList] = useState([]);


  useEffect(() => {

    let newCategoryList = [];

    if (isEmpty(arrayCategories) === false) {

      if (isEmpty(admin) === false && admin === true) {

        newCategoryList = [...arrayCategories];

      } else {

        newCategoryList = arrayCategories.filter(category => category.active === true || category.active === 1);

      };

      newCategoryList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

      setCategoryList(newCategoryList);

    };

  }, [arrayCategories]);


  return (
    <Container>
      <Row>
        <Col>

          <h5 className="mt-2 p-2">Categories</h5>

          {isNonEmptyArray(categoryList) === true ?

            <Nav vertical>

              {categoryList.map((category) => {

                let activeString = "";

                if (category.active === true || category.active === 1) {

                  activeString = "";

                } else {

                  activeString = "Inactive";

                };

                return (
                  <NavItem key={category.categoryID}>

                    <NavLink tag={Link} to={encodeURL(category.category)} className="mt-1 p-0" onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(category.category)); }}>{category.category}
                      {isEmpty(activeString) === false ? <span className="ms-2 inactive-item">({activeString})</span> : null}
                    </NavLink>

                  </NavItem>
                );
              })}

            </Nav>

            : null}

          { /* {isEmpty(admin) === false && admin === true ? <EditCategory displayButton={true} /> : null} */}
          { /* {isEmpty(admin) === false && admin === true ? <EditCategories displayButton={true} /> : null} */}

        </Col>
      </Row>
    </Container>
  );
};

export default Category;
