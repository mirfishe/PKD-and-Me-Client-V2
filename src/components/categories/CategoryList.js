import React, {useState, useEffect} from "react";
// import {useSelector} from "react-redux";
import {Container, Col, Row, Alert} from "reactstrap";
import {baseURL} from "../../app/constants";
// import Category from "./Category";

const CategoryList = (props) => {

    // const categoryListState = useSelector(state => state.categories);
    // console.log("CategoryList.js categoryListState", categoryListState);

    // const [url, setUrl] = useState("");
    const [categoryMessage, setCategoryMessage] = useState("");
    const [errCategoryMessage, setErrCategoryMessage] = useState("");
    const [categoryResultsFound, setCategoryResultsFound] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    const getCategories = () => {
        // console.log("CategoryList.js getCategories");
        // console.log("CategoryList.js getCategories baseURL", baseURL);

        setCategoryMessage("");
        setErrCategoryMessage("");
        setCategoryResultsFound(null);
        setCategoryList([]);

        // console.log("CategoryList.js getCategories this.props.categoryID", this.props.categoryID);
        // this.props.setCategoryID(null);
        // console.log("CategoryList.js getCategories this.props.titleID", this.props.titleID);
        // this.props.setTitleID(null);

        let url = baseURL + "category/";

        fetch(url)
        .then(response => {
            // console.log("CategoryList.js getCategories response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("CategoryList.js getCategories data", data);

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
            console.log("CategoryList.js getCategories error", error);
            // console.log("CategoryList.js getCategories error.name", error.name);
            // console.log("CategoryList.js getCategories error.message", error.message);
            setErrCategoryMessage(error.name + ": " + error.message);
        });

    };

    useEffect(() => {
        getCategories();
    }, []);

    return(
        <Container className="mt-4">
        <Row>

        {categoryResultsFound !== null ?
            <pre>
                {JSON.stringify(categoryList)}
            </pre>
        : null}

           <Col xs="2">
           {categoryMessage !== "" ? <Alert color="info">{categoryMessage}</Alert> : null}
           {errCategoryMessage !== "" ? <Alert color="danger">{errCategoryMessage}</Alert> : null}
           {/* {categoryResultsFound !== null ? <Category categoryList={categoryList} /> : null} */}
           {/* <Category categoryList={categoryListState} /> */}
           </Col>

           </Row>
          </Container>
    );
};

export default CategoryList;
