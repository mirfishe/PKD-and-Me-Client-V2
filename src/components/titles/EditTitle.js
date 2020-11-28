import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {Image, PencilSquare} from 'react-bootstrap-icons';
import AppSettings from "../../app/environment";
import {createTitleURL, createImageName} from "../../app/sharedFunctions";
import {updateStateTitle, deleteStateTitle} from "../../bibliographyData/titlesSlice";
import {updateStateEdition, deleteStateEdition} from "../../bibliographyData/editionsSlice";
import {addStateURL, updateStateURL, deleteStateURL, setPageURL} from "../../app/urlsSlice";

const EditTitle = (props) => {

    const componentName = "EditTitle.js";

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionToken = useSelector(state => state.user.sessionToken);
    // console.log(componentName, "sessionToken", sessionToken);
    const admin = useSelector(state => state.user.admin);
    // console.log(componentName, "admin", admin);

    // Loading the baseURL from the state store here is too slow
    // Always pulling it from environment.js
    // const baseURL = useSelector(state => state.app.baseURL);
    const baseURL = AppSettings.baseURL;
    // console.log(componentName, "baseURL", baseURL);

    const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

    const [categoryMessage, setCategoryMessage] = useState("");
    const [errCategoryMessage, setErrCategoryMessage] = useState("");
    const [categoryResultsFound, setCategoryResultsFound] = useState(null);

    const categoryListState = useSelector(state => state.categories.arrayCategories);
    // console.log(componentName, "categoryListState", categoryListState);

    const categoryList = categoryListState.filter(category => category.active === true);
    // console.log(componentName, "categoryList", categoryList);

    // categoryList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);
    // Sort the list alphabetically instead of by sortID
    categoryList.sort((a, b) => (a.category > b.category) ? 1 : -1);

    // This code is causing React to have too many re-renders in this location
    // if (categoryList.length < 1) {
    //     console.log(componentName, "categoryList is empty", categoryList.length);
    //     setErrCategoryMessage("categoryList is empty", categoryList.length);
    //     setCategoryResultsFound(false);
    // } else {
    //     console.log(componentName, "categoryList.length", categoryList.length);
    //     setCategoryMessage("categoryList.length", categoryList.length);
    //     setCategoryResultsFound(true);
    // };

    useEffect(() => {
        // console.log(componentName, "useEffect categoryList", categoryList);

        if (categoryList.length < 1) {
            console.log(componentName, "categoryList is empty", categoryList.length);
            setErrCategoryMessage("categoryList is empty", categoryList.length);
            setCategoryResultsFound(false);
        } else {
            // console.log(componentName, "useEffect categoryList.length", categoryList.length);
            // setCategoryMessage("categoryList.length", categoryList.length);
            setCategoryResultsFound(true);
        };

    }, [categoryList]);

    const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [titleRecordUpdated, setTitleRecordUpdated] = useState(null);
    const [titleRecordDeleted, setTitleRecordDeleted] = useState(null);
    const [editionRecordUpdated, setEditionRecordUpdated] = useState(null);
    const [editionRecordDeleted, setEditionRecordDeleted] = useState(null);

    const [txtTitleName, setTxtTitleName] = useState("");
    const [txtTitleURL, setTxtTitleURL] = useState("");
    const [txtAuthorFirstName, setTxtAuthorFirstName] = useState("");
    const [txtAuthorLastName, setTxtAuthorLastName] = useState("");
    const [txtPublicationDate, setTxtPublicationDate] = useState("");
    const [txtImageName, setTxtImageName] = useState("");
    const [ddCategoryID, setDdCategoryID] = useState("");
    const [txtShortDescription, setTxtShortDescription] = useState("");
    const [txtUrlPKDweb, setTxtUrlPKDweb] = useState("");

    const [errTitleName, setErrTitleName] = useState("");
    const [errCategoryID, setErrCategoryID] = useState("");

    const [titleItemIndex, setTitleItemIndex] = useState(null);
    const [titleItem, setTitleItem] = useState(null);
    const [titleID, setTitleID] = useState(null);
    const [titleName, setTitleName] = useState(null);
    const [titleSort, setTitleSort] = useState(null);
    const [titleURL, setTitleURL] = useState(null);
    const [authorFirstName, setAuthorFirstName] = useState(null);
    const [authorLastName, setAuthorLastName] = useState(null);
    const [publicationDate, setPublicationDate] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [categoryID, setCategoryID] = useState(null);
    const [shortDescription, setShortDescription] = useState(null);
    const [urlPKDweb, setUrlPKDweb] = useState(null);
    const [active, setActive] = useState(null);

    const editionListState = useSelector(state => state.editions.arrayEditions);
    // console.log(componentName, "editionListState", editionListState);
    let editionList = [];

    const titleListState = useSelector(state => state.titles.arrayTitles);
    // console.log(componentName, "titleListState", titleListState);

    const urlLookup = useSelector(state => state.urls.arrayURLs);

    const linkItem = useSelector(state => state.urls.linkItem);
    // console.log(componentName, "linkItem", linkItem);
    
    useEffect(() => {
    // console.log(componentName, "useEffect titleListState", titleListState);

    if (props.titleID !== undefined && props.titleID !== null) {

        let titleObject = titleListState.find(title => title.titleID === props.titleID);
        // console.log(componentName, "useEffect titleObject", titleObject);
        // console.log(componentName, "useEffect typeof titleObject", typeof titleObject);

        setTitleItemIndex(titleListState.findIndex(title => title.titleID === titleObject.titleID));
        // console.log(componentName, "useEffect titleItemIndex", titleItemIndex);

        editionList = editionListState.filter(edition => edition.titleID === parseInt(titleObject.titleID));

        if (titleObject !== undefined) {

            setTitleItem(titleObject);

            setTitleID(titleObject.titleID);
            setTitleName(titleObject.titleName);
            setTitleSort(titleObject.titleSort);
            setTitleURL(titleObject.titleURL);
            setAuthorFirstName(titleObject.authorFirstName);
            setAuthorLastName(titleObject.authorLastName);
            setPublicationDate(titleObject.publicationDate);
            setImageName(titleObject.imageName);
            setCategoryID(titleObject.categoryID);
            setShortDescription(titleObject.shortDescription);
            setUrlPKDweb(titleObject.urlPKDweb);
            setActive(titleObject.active);

            setTxtTitleName(titleObject.titleName);
            setTxtTitleURL(titleObject.titleURL);
            setTxtAuthorFirstName(titleObject.authorFirstName);
            setTxtAuthorLastName(titleObject.authorLastName);
            setTxtPublicationDate(titleObject.publicationDate);

            if (titleObject.publicationDate !== undefined && titleObject.publicationDate !== null) {
                setTxtPublicationDate(titleObject.publicationDate.toString().substring(0, 10));
            } else {
                setTxtPublicationDate("");
            };

            setTxtImageName(titleObject.imageName);
            setDdCategoryID(titleObject.categoryID);
            setTxtShortDescription(titleObject.shortDescription);
            setTxtUrlPKDweb(titleObject.urlPKDweb);

        };

    };

    }, [props.titleID, titleListState]);

    const updateTitle = (deleteTitle) => {
        // console.log(componentName, "updateTitle");
        // console.log(componentName, "updateTitle deleteTitle", deleteTitle);
        // console.log(componentName, "updateTitle baseURL", baseURL);

        // console.log(componentName, "titleItemIndex", titleItemIndex);

        setMessage("");
        setErrMessage("");
        setTitleRecordDeleted(null);
        setErrTitleName("");
        setErrCategoryID("");
        
        setTitleItem(null);
        setTitleID(null);
        setTitleName(null);
        setTitleSort(null);
        setTitleURL(null);
        setAuthorFirstName(null);
        setAuthorLastName(null);
        setPublicationDate(null);
        setImageName(null);
        setCategoryID(null);
        setShortDescription(null);
        setUrlPKDweb(null);
        setActive(null);

        let titleNameValidated = false;
        let categoryIDValidated = false;
        let formValidated = false;

        if (txtTitleName !== undefined && txtTitleName !== null) {
            if (txtTitleName.trim().length > 0) {
                titleNameValidated = true;
                setErrTitleName("");
                // console.log(componentName, "updateTitle Valid TitleName");
                // console.log(componentName, "updateTitle titleNameValidated true", titleNameValidated);
            } else {
                titleNameValidated = false;
                setErrTitleName("Please enter a title.");
                // console.log(componentName, "updateTitle Invalid TitleName");
                // console.log(componentName, "updateTitle titleNameValidated false", titleNameValidated);
            };
        };

        if (ddCategoryID !== undefined) {
            if (ddCategoryID !== null) {
                categoryIDValidated = true;
                setErrCategoryID("");
                // console.log(componentName, "updateTitle Valid CategoryID");
                // console.log(componentName, "updateTitle categoryIDValidated true", categoryIDValidated);
            } else {
                categoryIDValidated = false;
                setErrCategoryID("Please select a category.");
                // console.log(componentName, "updateTitle Invalid CategoryID");
                // console.log(componentName, "updateTitle categoryIDValidated false", categoryIDValidated);
            };
        };

        if (titleNameValidated === true && categoryIDValidated === true) {
            formValidated = true;
            // console.log(componentName, "updateTitle Valid Form");
            // console.log(componentName, "updateTitle formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log(componentName, "updateTitle Invalid Form");
            // console.log(componentName, "updateTitle formValidated false", formValidated);
        };

        // console.log(componentName, "updateTitle titleNameValidated", titleNameValidated);
        // console.log(componentName, "updateTitle categoryIDValidated", categoryIDValidated);
        // console.log(componentName, "updateTitle formValidated", formValidated);

        if (formValidated === true) {

            if (txtTitleName !== undefined && txtTitleName !== null) {

                let titleObject = {
                    titleName: txtTitleName.trim(),
                    // authorFirstName: txtAuthorFirstName.trim(),
                    // authorLastName: txtAuthorLastName.trim(),
                    // imageName: txtImageName.trim(),
                    categoryID: ddCategoryID,
                    // shortDescription: txtShortDescription.trim(),
                    // urlPKDweb: txtUrlPKDweb.trim(),
                    active: !deleteTitle
                };

                // If the user doesn't enter a title URL, then it isn't added/updated
                if (txtTitleURL !== undefined && txtTitleURL !== null) {
                    if (txtTitleURL.trim().length !== 0) {
                        Object.assign(titleObject, {titleURL: txtTitleURL.trim()});
                    };
                };
                
                // If the user doesn't enter an author first name, then it isn't added/updated
                if (txtAuthorFirstName !== undefined && txtAuthorFirstName !== null) {
                    if (txtAuthorFirstName.trim().length !== 0) {
                        Object.assign(titleObject, {authorFirstName: txtAuthorFirstName.trim()});
                    };
                };

                // If the user doesn't enter an author last name, then it isn't added/updated
                if (txtAuthorLastName !== undefined && txtAuthorLastName !== null) {
                    if (txtAuthorLastName.trim().length !== 0) {
                        Object.assign(titleObject, {authorLastName: txtAuthorLastName.trim()});
                    };
                };

                // If the user doesn't enter an image name then it isn't added/updated
                if (txtImageName !== undefined && txtImageName !== null) {
                    if (txtImageName.trim().length !== 0) {
                        Object.assign(titleObject, {imageName: txtImageName.trim()});
                    };
                };

                // If the user doesn't enter a publication date, then it isn't added/updated
                if (txtPublicationDate !== undefined && txtPublicationDate !== null) {
                    if (txtPublicationDate.trim().length !== 0) {
                        Object.assign(titleObject, {publicationDate: txtPublicationDate.trim()});
                    };
                };


                // If the user doesn't enter a short description, then it isn't added/updated
                if (txtShortDescription !== undefined && txtShortDescription !== null) {
                    if (txtShortDescription.trim().length !== 0) {
                        Object.assign(titleObject, {shortDescription: txtShortDescription.trim()});
                    };
                };

                // If the user doesn't enter a url for PKDweb, then it isn't added/updated
                if (txtUrlPKDweb !== undefined && txtUrlPKDweb !== null) {
                    if (txtUrlPKDweb.trim().length !== 0) {
                        Object.assign(titleObject, {urlPKDweb: txtUrlPKDweb.trim()});
                    };
                };

                // console.log(componentName, "updateTitle titleObject", titleObject);

                let url = baseURL + "title/";

                if (props.titleID !== undefined && props.titleID !== null && sessionToken !== undefined && sessionToken !== null) {

                    url = url + props.titleID;

                    // console.log(componentName, "updateTitle url", url);

                    fetch(url, {
                        method: "PUT",
                        headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": sessionToken
                        }),
                        body: JSON.stringify({title: titleObject})
                    })
                    .then(response => {
                        // console.log(componentName, "updateTitle response", response);
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
                        // console.log(componentName, "updateTitle data", data);

                        setTitleRecordUpdated(data.recordUpdated);
                        setMessage(data.message);

                        if (data.recordUpdated === true) {

                            setTitleItem(data);
                            setTitleID(data.titleID);
                            setTitleName(data.titleName);
                            setTitleSort(data.titleSort);
                            setTitleURL(data.titleURL);
                            setAuthorFirstName(data.authorFirstName);
                            setAuthorLastName(data.authorLastName);
                            setPublicationDate(data.publicationDate);
                            setImageName(data.imageName);
                            setCategoryID(data.categoryID);
                            setShortDescription(data.shortDescription);
                            setUrlPKDweb(data.urlPKDweb);
                            setActive(data.active);

                            // Would still work if the createdAt and updatedAt were left out?
                            dispatch(updateStateTitle({titleItemIndex: titleItemIndex, titleID: data.titleID, titleName: data.titleName, titleSort: data.titleSort, titleURL: data.titleURL, authorFirstName: data.authorFirstName, authorLastName: data.authorLastName, publicationDate: data.publicationDate, imageName: data.imageName, categoryID: data.categoryID, shortDescription: data.shortDescription, urlPKDweb: data.urlPKDweb, active: data.active, updatedAt: new Date().toISOString()}));
                            // Update local storage also

                            // Update/Delete related editions also if active is set to false
                            if (data.active === false) {
                                for (let i = 0; i < editionList.length; i++) {

                                    let editionItemIndex = editionListState.findIndex(edition => edition.editionID === editionList[i].editionID);

                                    // Would still work if the createdAt and updatedAt were left out?
                                    dispatch(updateStateEdition({editionItemIndex: editionItemIndex, editionID: editionList[i].editionID, titleID: editionList[i].titleID, mediaID: editionList[i].mediaID, publicationDate: editionList[i].publicationDate, imageName: editionList[i].imageName, ASIN: editionList[i].ASIN, textLinkShort: editionList[i].textLinkShort, textLinkFull: editionList[i].textLinkFull, imageLinkSmall: editionList[i].imageLinkSmall, imageLinkMedium: editionList[i].imageLinkMedium, imageLinkLarge: editionList[i].imageLinkLarge, textImageLink: editionList[i].textImageLink, active: false, createdAt: editionList[i].createdAt, updatedAt: editionList[i].updatedAt}));

                                };

                            };

                            let urlListIndex = urlLookup.findIndex(url => url.linkType === "title" && url.linkID === data.titleID);
                            // console.log(componentName, "updateTitle urlListIndex", urlListIndex);

                            // Update/Delete related urls in arrayURLs also
                            if (data.active === false) {
                                dispatch(deleteStateURL(urlListIndex));
                            } else {
                                // console.log(componentName, "updateTitle urlListIndex", urlListIndex);
                                // console.log(componentName, "updateTitle data.titleURL", data.titleURL);
                                // console.log(componentName, "updateTitle data.titleID", data.titleID);
                                // console.log(componentName, "updateTitle data.categoryID", data.categoryID);

                                let categoryName = categoryList.find(category => category.categoryID === data.categoryID);
                                // console.log(componentName, "updateTitle categoryName", categoryName);
                                // console.log(componentName, "updateTitle categoryName.category", categoryName.category);

                                // Doesn't seem to be updating the state for some reason?
                                // dispatch(updateStateURL([{urlListIndex: urlListIndex, linkName: data.titleURL, linkType: "title", linkID: data.titleID, linkTypeNameID: data.categoryID, linkTypeName: categoryName.category}]));

                                dispatch(deleteStateURL(urlListIndex));
                                dispatch(addStateURL([{urlListIndex: urlListIndex, linkName: data.titleURL, linkType: "title", linkID: data.titleID, linkTypeNameID: data.categoryID, linkTypeName: categoryName.category}]));

                            };

                            // Redirect to the new titleURL is that was changed
                            if (linkItem.linkName !== data.titleURL) {
                                redirectPage(data.titleURL);
                            };

                        } else {
                            // setErrMessage(data.error);
                            setErrMessage(data.errorMessages);
                        };

                    })
                    .catch(error => {
                        console.log(componentName, "updateTitle error", error);
                        // console.log(componentName, "updateTitle error.name", error.name);
                        // console.log(componentName, "updateTitle error.message", error.message);
                        setErrMessage(error.name + ": " + error.message);
                    });

                };

            };

        };
        
    };

    const deleteTitle = () => {
        // console.log(componentName, "deleteTitle");
        // console.log(componentName, "deleteTitle baseURL", baseURL);

        setMessage("");
        setErrMessage("");
        setTitleRecordDeleted(null);
        setErrTitleName("");
        setErrCategoryID("");

        let url = baseURL + "title/";

        if (props.titleID !== undefined && props.titleID !== null) {

            url = url + props.titleID;

            // console.log(componentName, "deleteTitle url", url);

            if (sessionToken !== undefined && sessionToken !== null) {
            
                fetch(url, {
                    method: "DELETE",
                    headers:    new Headers ({
                        "Content-Type": "application/json",
                        "Authorization": sessionToken
                    })
                })
                .then(response => {
                    // console.log(componentName, "deleteTitle response", response);
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
                    // console.log(componentName, "deleteTitle data", data);

                    setTitleRecordDeleted(data.recordDeleted);

                    setMessage(data.message); // Never seen by the user if the delete was successful

                    if (data.recordDeleted === true) {

                        // dispatch(deleteStateTitle(props.titleID));
                        dispatch(deleteStateTitle(titleItemIndex));
                        // Update local storage also

                        // Delete related editions also
                        for (let i = 0; i < editionList.length; i++) {

                            let editionItemIndex = editionListState.findIndex(edition => edition.editionID === editionList[i].editionID);

                            deleteEdition = (editionList[i].editionID, editionItemIndex);

                        };

                        let urlListIndex = urlLookup.findIndex(url => url.linkType === "title" && url.linkID === data.titleID);
                        // console.log(componentName, "updateTitle urlListIndex", urlListIndex);

                        // Update/Delete related urls in arrayURLs also
                        dispatch(deleteStateURL(urlListIndex));

                        // Redirect when the title is deleted?

                    } else {
                        // setErrMessage(data.error);
                        setErrMessage(data.errorMessages);
                    };

                })
                .catch(error => {
                    console.log(componentName, "deleteTitle error", error);
                    // console.log(componentName, "deleteTitle error.name", error.name);
                    // console.log(componentName, "deleteTitle error.message", error.message);
                    setErrMessage(error.name + ": " + error.message);
                });
                
            };

        };

    };

    const deleteEdition = (editionID, editionItemIndex) => {
        // console.log(componentName, "deleteEdition");
        // console.log(componentName, "deleteEdition baseURL", baseURL);

        setMessage("");
        setErrMessage("");
        setEditionRecordDeleted(null);

        let url = baseURL + "edition/";

        if (editionID !== undefined && editionID !== null) {
            url = url + editionID;

            // console.log(componentName, "deleteEdition url", url);

            if (sessionToken !== undefined && sessionToken !== null) {

                fetch(url, {
                    method: "DELETE",
                    headers:    new Headers ({
                        "Content-Type": "application/json",
                        "Authorization": sessionToken
                    })
                })
                .then(response => {
                    // console.log(componentName, "deleteEdition response", response);
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
                    // console.log(componentName, "deleteEdition data", data);

                    setEditionRecordDeleted(data.recordDeleted);

                    setMessage(data.message); // Never seen by the user if the delete was successful

                    if (data.recordDeleted === true) {

                        // dispatch(deleteStateEdition(props.editionID));
                        dispatch(deleteStateEdition(editionItemIndex));
                        // Update local storage also

                    } else {
                        // setErrMessage(data.error);
                        setErrMessage(data.errorMessages);
                    };

                })
                .catch(error => {
                    console.log(componentName, "deleteEdition error", error);
                    // console.log(componentName, "deleteEdition error.name", error.name);
                    // console.log(componentName, "deleteEdition error.message", error.message);
                    setErrMessage(error.name + ": " + error.message);
                });
                
            };
        
        };

    };

    useEffect(() => {
        // console.log(componentName, "useEffect titleRecordUpdated", titleRecordUpdated);
        // console.log(componentName, "useEffect titleRecordDeleted", titleRecordDeleted);
        if (titleRecordUpdated !== undefined && titleRecordUpdated !== null && titleRecordUpdated === true) {
            setMessage("");
            setErrMessage("");
            setErrTitleName("");
            setErrCategoryID("");
            setTitleRecordUpdated(null);
            // setModal(false);
            toggle();
        };

        if (titleRecordDeleted !== undefined && titleRecordDeleted !== null && titleRecordDeleted === true) {
            setMessage("");
            setErrMessage("");
            setErrTitleName("");
            setErrCategoryID("");
            setTitleRecordDeleted(null);
            // setModal(false);
            toggle();
        };
        
    }, [titleRecordUpdated, titleRecordDeleted]);

    const redirectPage = (linkName) => {
        // console.log(componentName, "redirectPage", linkName);
        dispatch(setPageURL(linkName.replaceAll("/", "")));
        history.push("/" + linkName);
    };

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

        {appAllowUserInteractions === true && admin !== undefined && admin !== null && admin === true && props.displayButton === true ? <span className="pl-3"><Button outline className="my-2" size="sm" color="info" onClick={toggle}>Update Title</Button></span> : null}

        {appAllowUserInteractions === true && admin !== undefined && admin !== null && admin === true && props.displayIcon === true ? <PencilSquare className="addEditIcon" onClick={toggle} /> : null}

        <Modal isOpen={modal} toggle={toggle} size="lg">
           <ModalHeader toggle={toggle}>Update Title</ModalHeader>
           <ModalBody>
           <Form>
                <FormGroup className="text-center">
                {message !== undefined && message !== null && message !== "" ? <Alert color="info">{message}</Alert> : null}
                {errMessage !== undefined && errMessage !== null && errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : null}
                {categoryMessage !== undefined && categoryMessage !== null && categoryMessage !== "" ? <Alert color="info">{categoryMessage}</Alert> : null}
                {errCategoryMessage !== undefined && errCategoryMessage !== null && errCategoryMessage !== "" ? <Alert color="danger">{errCategoryMessage}</Alert> : null}
                </FormGroup>

                <FormGroup>

                <Label for="txtTitleName">Title</Label>
                <Input type="text" id="txtTitleName" value={txtTitleName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtTitleName(event.target.value);}} />
                {errTitleName !== undefined && errTitleName !== null && errTitleName !== "" ? <Alert color="danger">{errTitleName}</Alert> : null}

                </FormGroup>
                <FormGroup>

                <Label for="txtTitleURL">Title URL</Label>
                <Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(event.target.value);*/ setTxtTitleURL(createTitleURL(txtTitleName));}}>Create Title URL</Button>
                <Input type="text" id="txtTitleURL" value={txtTitleURL} onChange={(event) => {/*console.log(event.target.value);*/ setTxtTitleURL(event.target.value);}} />

                </FormGroup>
                <FormGroup>

                <Label for="txtAuthorFirstName">Author First Name</Label>
                <Input type="text" id="txtAuthorFirstName" value={txtAuthorFirstName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtAuthorFirstName(event.target.value);}} />

                </FormGroup>
                <FormGroup>
                    
                <Label for="txtAuthorLastName">Author Last Name</Label>
                <Input type="text" id="txtAuthorLastName" value={txtAuthorLastName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtAuthorLastName(event.target.value);}} />

                </FormGroup>

                <FormGroup row>
                <Col>

                <Label id="lblCategoryID" for="lblCategoryID">Category</Label>
                <Input type="select" id="ddCategoryID" value={ddCategoryID} onChange={(event) => {/*console.log(event.target.value);*/ setDdCategoryID(event.target.value);}}>
                <option value="">Select a Category</option>
                {categoryList.map((category) => {
                return (
                    <React.Fragment>
                    {/* {getCategoryIDFromCategoryName(props.categoryName) === category.categoryID ? <option selected value={category.categoryID}>{category.category}</option> : <option key={category.categoryID} value={category.categoryID}>{category.category}</option>} */}
                    <option key={category.categoryID} value={category.categoryID}>{category.category}</option>
                    </React.Fragment>
                    )
                })}
                </Input>
                {errCategoryID !== undefined && errCategoryID !== null && errCategoryID !== "" ? <Alert color="danger">{errCategoryID}</Alert> : null}

                </Col>
                <Col>
                        
                <Label for="txtPublicationDate">Publication Date</Label>
                <Input type="date" id="txtPublicationDate" value={txtPublicationDate} onChange={(event) => {/*console.log(event.target.value);*/ setTxtPublicationDate(event.target.value);}} />

                </Col>

                </FormGroup>

                <FormGroup>
                    
                <Label for="txtImageName">Image Name</Label>
                <Button outline size="small" color="secondary" className="ml-3 mb-2" onClick={() => {/*console.log(event.target.value);*/ /*createImageName(txtTitleName);*/ setTxtImageName(createImageName(txtTitleName));}}>Create Image Name</Button>
                <Input type="text" id="txtImageName" value={txtImageName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtImageName(event.target.value);}} />
                {txtImageName !== undefined && txtImageName !== null && txtImageName !== "" ? <img src={txtImageName} alt={txtTitleName} className="coverThumbnail" /> : <Image size="150" className="noImageIcon"/>}

                </FormGroup>
                <FormGroup>
                    
                <Label for="txtShortDescription">Short Description</Label>
                <Input type="textarea" id="txtShortDescription" rows={10} value={txtShortDescription} onChange={(event) => {/*console.log(event.target.value);*/ setTxtShortDescription(event.target.value);}} />
    
                </FormGroup>
                <FormGroup>
                    
                <Label for="txtUrlPKDweb">url PKDweb</Label>
                <Input type="text" id="txtUrlPKDweb" value={txtUrlPKDweb} onChange={(event) => {/*console.log(event.target.value);*/ setTxtUrlPKDweb(event.target.value);}} />

                </FormGroup>

                <ModalFooter>
    
                <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(event.target.value);*/ updateTitle(false);}}>Update Title</Button>
                {active !== undefined && active !== null && active === false ? 
                <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(event.target.value);*/ updateTitle(false);}}>Undelete/Restore Title</Button> 
                : null}
                {active !== undefined && active !== null && active === true ? 
                <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(event.target.value);*/ updateTitle(true);}}>Delete Title</Button> 
                : null}
                <Button outline size="lg" color="warning" onClick={(event) => {/*console.log(event.target.value);*/ deleteTitle();}}>Hard Delete Title</Button>
                <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
       </ModalBody>
     </Modal>
   </React.Fragment>
    );

};

export default EditTitle;
