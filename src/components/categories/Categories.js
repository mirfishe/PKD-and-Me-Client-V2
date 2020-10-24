import React, {useState, useEffect} from "react";
import {Container, Col, Row, Alert} from "reactstrap";
import {baseURL} from "../../app/constants";
import Category from "./Category";

const Categories = (props) => {

    // const [url, setUrl] = useState("");
    const [categoryMessage, setCategoryMessage] = useState("");
    const [errCategoryMessage, setErrCategoryMessage] = useState("");
    const [categoryResultsFound, setCategoryResultsFound] = useState(null);
    const [categoryList, setCategoryList] = useState([]);


    const getCategories = () => {
        // console.log("Categories.js getCategories");
        console.log("Categories.js getCategories baseURL", baseURL);

        setCategoryMessage("");
        setErrCategoryMessage("");
        setCategoryResultsFound(null);
        setCategoryList([]);

        // console.log("Categories.js getCategories this.props.categoryID", this.props.categoryID);
        // this.props.setCategoryID(null);
        // console.log("Categories.js getCategories this.props.titleID", this.props.titleID);
        // this.props.setTitleID(null);

        let url = baseURL + "category/";

        fetch(url)
        .then(response => {
            // console.log("Categories.js getCategories response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            console.log("Categories.js getCategories data", data);

            setCategoryResultsFound(data.resultsFound);
            setCategoryMessage(data.message);

            if (data.resultsFound === true) {
                // Would like to remove categories that don't have titles associated with them
                // if (data.categories.titles.length > 0) {
                    setCategoryList(data.categories);
                // };
            } else {
                setErrCategoryMessage(data.message);
            };

        })
        .catch(error => {
            console.log("Categories.js getCategories error", error);
            // console.log("Categories.js getCategories error.name", error.name);
            // console.log("Categories.js getCategories error.message", error.message);
            setErrCategoryMessage(error.name + ": " + error.message);
        });

    };

    useEffect(() => {
        getCategories();
    }, []);

    return(
        <Container>
        <Row>

           <Col xs="2">
           {categoryMessage !== "" ? <Alert severity="info">{categoryMessage}</Alert> : null}
           {errCategoryMessage !== "" ? <Alert severity="error">{errCategoryMessage}</Alert> : null}
           {categoryResultsFound !== null ? <Category categoryList={categoryList} /> : null}
           </Col>

           </Row>
          </Container>
    );
};

export default Categories;
