import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {Plus} from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import {addStateCategory} from "../../bibliographyData/categoriesSlice";

const AddCategory = (props) => {

    const componentName = "AddCategory.js";

    const dispatch = useDispatch();

    const sessionToken = useSelector(state => state.user.sessionToken);
    // console.log(componentName, "sessionToken", sessionToken);
    const admin = useSelector(state => state.user.admin);
    // console.log(componentName, "admin", admin);

    // Loading the baseURL from the state store here is too slow
    // Always pulling it from environment.js
    // const baseURL = useSelector(state => state.app.baseURL);
    const baseURL = AppSettings.baseURL;
    // console.log(componentName, "baseURL", baseURL);

    const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [categoryRecordAdded, setCategoryRecordAdded] = useState(null);

    const [txtCategory, setTxtCategory] = useState("");

    const [errCategory, setErrCategory] = useState("");

    // const [categoryItem, setCategoryItem] = useState(null);
    const [categoryID, setCategoryID] = useState(null);
    const [category, setCategory] = useState(null);
    const [sortID, setSortID] = useState(null);
    const [active, setActive] = useState(null);

    const addCategory = () => {
        // console.log(componentName, "addCategory");
        // console.log(componentName, "addCategory baseURL", baseURL);

        setMessage("");
        setErrMessage("");
        setCategoryRecordAdded(null);

        // setCategoryItem(null);
        setCategoryID(null);
        setCategory(null);
        setSortID(null);
        setActive(null);

        let categoryValidated = false;
        let formValidated = false;

        if (txtCategory !== undefined && txtCategory !== null) {
            if (txtCategory.trim().length > 0) {
                categoryValidated = true;
                setErrCategory("");
                // console.log(componentName, "addCategory Valid Category");
                // console.log(componentName, "addCategory categoryValidated true", categoryValidated);
            } else {
                categoryValidated = false;
                setErrCategory("Please enter a category.");
                // console.log(componentName, "addCategory Invalid Category");
                // console.log(componentName, "addCategory categoryValidated false", categoryValidated);
            };
        };

        if (categoryValidated === true) {
            formValidated = true;
            // console.log(componentName, "addCategory Valid Form");
            // console.log(componentName, "addCategory formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log(componentName, "addCategory Invalid Form");
            // console.log(componentName, "addCategory formValidated false", formValidated);
        };

        // console.log(componentName, "addCategory categoryValidated", categoryValidated);
        // console.log(componentName, "addCategory formValidated", formValidated);

        if (formValidated === true) {

            if (txtCategory !== undefined && txtCategory !== null) {

                let categoryObject = {
                    category: txtCategory.trim()
                };

                // console.log(componentName, "addCategory categoryObject", categoryObject);

                let url = baseURL + "category/";
                // console.log(componentName, "addCategory url", url);

                if (sessionToken !== undefined && sessionToken !== null) {

                    fetch(url, {
                        method: "POST",
                        headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": sessionToken
                        }),
                        body: JSON.stringify({category: categoryObject})
                    })
                    .then(response => {
                        // console.log(componentName, "addCategory response", response);
                        // if (!response.ok) {
                        //     throw Error(response.status + " " + response.statusText + " " + response.url);
                        // } else {
                            // if (response.status === 200) {
                                return response.json();
                            // } else {
                            //     return response.status;
                            // };
                        // };
                    })
                    .then(data => {
                        console.log(componentName, "addCategory data", data);

                        setCategoryRecordAdded(data.recordAdded);
                        setMessage(data.message);

                        if (data.recordAdded === true) {

                            // setCategoryItem(data);

                            setCategoryID(data.categoryID);
                            setCategory(data.category);
                            setSortID(data.sortID);
                            setActive(data.active);

                            // Would still work if the createdAt and updatedAt were left out
                            dispatch(addStateCategory([{categoryID: data.categoryID, category: data.category, sortID: data.sortID, active: data.active, createdAt: data.createdAt, updatedAt: data.updatedAt}]));
                            // Add to local storage also

                        } else {
                            // setErrMessage(data.error);
                            setErrMessage(data.errorMessages);
                        };

                    })
                    .catch(error => {
                        console.log(componentName, "addCategory error", error);
                        // console.log(componentName, "addCategory error.name", error.name);
                        // console.log(componentName, "addCategory error.message", error.message);
                        setErrMessage(error.name + ": " + error.message);
                    });

                };

            };

        };

    };

    useEffect(() => {
        // console.log(componentName, "useEffect categoryRecordAdded", categoryRecordAdded);
        if (categoryRecordAdded !== undefined && categoryRecordAdded !== null && categoryRecordAdded === true) {
            setMessage("");
            setErrMessage("");
            setCategoryRecordAdded(null);
            setModal(false);
        };
        
    }, [categoryRecordAdded]);

    useEffect(() => {
        // console.log(componentName, "useEffect check for admin", admin);

        if (admin !== true) {
            // return <Redirect to="/" />;
            setModal(false);
        };
        
    }, [admin]);

    const toggle = () => {
        setModal(!modal);
    };

    return(
        <React.Fragment>

            {admin !== undefined && admin !== null && admin === true && props.displayButton === true ? <span className="mt-2 pl-3"><Button outline size="sm" color="info" onClick={toggle}>Add Category</Button></span> : null}

            {admin !== undefined && admin !== null && admin === true && props.displayIcon === true ? <Plus className="addEditIcon" onClick={toggle} /> : null}

        <Modal isOpen={modal} toggle={toggle} size="md">
           <ModalHeader toggle={toggle}>Add Category</ModalHeader>
           <ModalBody>
           <Form>
                <FormGroup>
                {message !== undefined && message !== null && message !== "" ? <Alert color="info">{message}</Alert> : null}
                {errMessage !== undefined && errMessage !== null && errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : null}
                </FormGroup>
                <FormGroup>

                <Label for="txtCategory">Category</Label>
                <Input type="text" id="txtCategory" value={txtCategory} onChange={(event) => {/*console.log(event.target.value);*/ setTxtCategory(event.target.value);}} />
                {errCategory !== undefined && errCategory !== null && errCategory !== "" ? <Alert color="danger">{errCategory}</Alert> : null}

                </FormGroup>

                <ModalFooter>
                     <Button outline size="lg" color="primary" onClick={addCategory}>Add Category</Button>
                     <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
       </ModalBody>
     </Modal>
   </React.Fragment>
    );

};

export default AddCategory;
