import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Alert, Button } from "reactstrap";
// import Category from "./Category";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";

const CategoryList = (props) => {

  const componentName = "CategoryList.js";

  // ! Loading the baseURL from the state store here is too slow
  // ! Always pulling it from environment.js
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);
  document.title = "Category List | " + appName + " | " + siteName;

  const [categoryMessage, setCategoryMessage] = useState("");
  const [errCategoryMessage, setErrCategoryMessage] = useState("");
  const [categoryResultsFound, setCategoryResultsFound] = useState(null);
  const [categoryList, setCategoryList] = useState([]);


  const getCategories = () => {
    // console.log(componentName, GetDateTime(), "getCategories");
    // console.log(componentName, GetDateTime(), "getCategories baseURL", baseURL);

    setCategoryMessage("");
    setErrCategoryMessage("");
    setCategoryResultsFound(null);
    setCategoryList([]);

    if (IsEmpty(baseURL) === false) {

      let url = baseURL + "categories";

      fetch(url)
        .then(response => {
          console.log(componentName, GetDateTime(), "getCategories response", response);
          if (!response.ok) {
            throw Error(response.status + " " + response.statusText + " " + response.url);
          } else {
            return response.json();
          };
        })
        .then(data => {
          // console.log(componentName, GetDateTime(), "getCategories data", data);

          setCategoryResultsFound(data.resultsFound);
          setCategoryMessage(data.message);

          if (data.resultsFound === true) {
            // Would like to remove categories that don't have titles associated with them
            // if (data.categories.titles.length > 0) {
            setCategoryList(data.records);
            // };
          } else {
            setErrCategoryMessage(data.message);
          };

        })
        .catch(error => {
          console.log(componentName, GetDateTime(), "getCategories error", error);
          // console.log(componentName, GetDateTime(), "getCategories error.name", error.name);
          // console.log(componentName, GetDateTime(), "getCategories error.message", error.message);
          setErrCategoryMessage(error.name + ": " + error.message);
        });

    };

  };


  useEffect(() => {
    getCategories();
  }, []);


  // const copyText = () => {
  //     txtCategoryList = document.getElementById("txtCategoryList");
  //     txtCategoryList.select();
  //     document.execCommand("copy");
  //     alert("Copied the text: " + copyText.value);

  //     // https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
  //     let dummy = document.createElement("input");
  //     dummy.style.display = 'none';
  //     document.body.appendChild(dummy);

  //     dummy.setAttribute("id", "dummy_id");
  //     document.getElementById("dummy_id").value = JSON.stringify(categoryList);
  //     dummy.select();
  //     document.execCommand("copy");
  //     document.body.removeChild(dummy);

  //     // https://stackoverflow.com/questions/52923771/react-copy-component-state-value-to-clipboard-without-dummy-element
  //     var dummy = document.createElement("pre");
  //     document.body.appendChild(dummy);
  //     dummy.setAttribute('value', JSON.stringify(categoryList));
  //     dummy.select();
  //     document.execCommand("copy");
  //     document.body.removeChild(dummy);

  //     // https://www.npmjs.com/package/react-copy-to-clipboard
  //     // https://reedbarger.com/how-to-create-a-custom-usecopytoclipboard-react-hook/

  // };


  return (
    <Container className="mt-4">
      <Row className="text-center">
        {IsEmpty(categoryMessage) === false ? <Alert color="info">{categoryMessage}</Alert> : null}
        {IsEmpty(errCategoryMessage) === false ? <Alert color="danger">{errCategoryMessage}</Alert> : null}
      </Row>
      {/* <Row>
            <Col xs="2">
                <Button onClick={copyText}>Copy</Button>
            </Col>
            </Row> */}
      {categoryResultsFound !== null ?
        <Row>
          {/* <pre>
                    {JSON.stringify(categoryList)}
                </pre> */}
          <span>
            {JSON.stringify({ "resultsFound": true, "message": "Offline Categories data used.", "records": categoryList })}
          </span>
        </Row>
        : null}
      <Row>
        {/* {categoryResultsFound !== null ? <Category categoryList={categoryList} /> : null} */}
        {/* <Category categoryList={categoryListState} /> */}
      </Row>
    </Container>
  );
};

export default CategoryList;
