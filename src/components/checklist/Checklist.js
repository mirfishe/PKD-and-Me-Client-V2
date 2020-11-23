import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Button, Input} from "reactstrap";
import AppSettings from "../../app/environment";
import {displayYear, encodeURL} from "../../app/sharedFunctions";
import {setTitleSort} from "../../bibliographyData/titlesSlice";
import {setPageURL} from "../../app/urlsSlice";
import {addStateUserReview, updateStateUserReview} from "../../bibliographyData/userReviewsSlice";
import {updateStateChecklist} from "../../app/userSlice";

const Checklist = (props) => {

    const componentName = "Checklist.js";

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

    const [modal, setModal] = useState(false);

    const checklistLoaded = useSelector(state => state.user.checklistLoaded);

    const [checklistMessage, setChecklistMessage] = useState("");
    const [errChecklistMessage, setErrChecklistMessage] = useState("");
    const [checklistRecordUpdated, setChecklistRecordUpdated] = useState(null);

    const linkItem = useSelector(state => state.urls.linkItem);
    // console.log(componentName, "linkItem", linkItem);

    const userReviewListState = useSelector(state => state.userReviews.arrayUserReviews);
    // console.log(componentName, "userReviewListState", userReviewListState);

    const userState = {userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active)}
    // console.log(componentName, "userState", userState);

    const checklistListState = useSelector(state => state.user.arrayChecklist);
    // console.log(componentName, "checklistListState", checklistListState);

    let checklistList = [...checklistListState];
    // console.log(componentName, "checklistList", checklistList);

    // Filter by category
    if (linkItem !== undefined && linkItem !== null && linkItem.hasOwnProperty("linkType") === true) {

        if (linkItem.linkType === "category") {
            checklistList = checklistList.filter(title => title.categoryID === linkItem.linkID);
        } else if (linkItem.linkType === "media") {
            // This won't work; media is not available
            // checklistList = checklistList.filter(title => title.mediaID === linkItem.linkID);
        };

    };

    checklistList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

    const updateChecklist = (titleID, read, reviewID) => {
        // console.log(componentName, "updateChecklist");

        // console.log(componentName, "updateChecklist titleID", titleID);
        // console.log(componentName, "updateChecklist read", read);
        // console.log(componentName, "updateChecklist reviewID", reviewID);

        setChecklistMessage("");
        setErrChecklistMessage("");
        setChecklistRecordUpdated(null);

        // If read is false and there are no other values in the userReviews table, should the record be deleted?
        let userReviewObject = {
            titleID: titleID,
            read: read,
            active: true // always true?
        };

        // console.log(componentName, "updateChecklist userReviewObject", userReviewObject);

        let url = baseURL + "userreview/";
        let updateChecklistMethod = "";

        if (reviewID !== undefined && reviewID !== null) {
            url = url + reviewID;
            updateChecklistMethod = "PUT";
        } else {
            updateChecklistMethod = "POST";
        };

        // console.log(componentName, "updateChecklist url", url);
        // console.log(componentName, "updateChecklist updateChecklistMethod", updateChecklistMethod);

        if (sessionToken !== undefined && sessionToken !== null) {

            fetch(url, {
                method: updateChecklistMethod,
                headers:    new Headers ({
                    "Content-Type": "application/json",
                    "Authorization": sessionToken
                }),
                body: JSON.stringify({userReview: userReviewObject})
            })
            .then(response => {
                // console.log(componentName, "updateChecklist response", response);
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
                // console.log(componentName, "updateChecklist data", data);

                let recordChanged = null;

                if (updateChecklistMethod === "PUT") {
                    setChecklistRecordUpdated(data.recordUpdated);
                    recordChanged = data.recordUpdated;
                } else if (updateChecklistMethod === "POST") {
                    setChecklistRecordUpdated(data.recordAdded);
                    recordChanged = data.recordAdded;
                } else {
                    setChecklistRecordUpdated(null);
                };

                setChecklistMessage(data.message);

                if (recordChanged === true) {

                    // Need to update this component after this function runs
                    // Need to update the state to do it?
                    // updateChecklistItemRead(titleID);

                    // Need to update the other components after this function runs
                    // this.props.userReviewUpdated();

                    const checklistListItem = checklistList.find(title => title.titleID === titleID);
                    // console.log(componentName, "updateChecklist checklistListIndex", checklistListIndex);

                    const checklistListIndex = checklistList.findIndex(title => title.titleID === titleID);
                    // console.log(componentName, "updateChecklist checklistListIndex", checklistListIndex);

                    if (updateChecklistMethod === "PUT") {
                        dispatch(updateStateChecklist({checklistListIndex: checklistListIndex, reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, userReviewActive: data.active, userReviewUpdatedAt: new Date().toISOString()}));
                    } else if (updateChecklistMethod === "POST") {
                        dispatch(updateStateChecklist({checklistListIndex: checklistListIndex, reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, userReviewActive: data.active, userReviewUpdatedAt: data.updatedAt}));
                    };

                    const userReviewListIndex = userReviewListState.findIndex(userReview => userReview.reviewID === reviewID)
                    // console.log(componentName, "updateChecklist checklistListIndex", checklistListIndex);

                    if (updateChecklistMethod === "PUT") {

                        dispatch(updateStateUserReview({userReviewListIndex: userReviewListIndex, reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, active: data.active, updatedAt: data.updatedAt}));

                    } else if (updateChecklistMethod === "POST") {

                        dispatch(addStateUserReview([{reviewID: data.reviewID, userID: data.userID, updatedBy: data.updatedBy, titleID: data.titleID, read: data.read, dateRead: data.dateRead, rating: data.rating, shortReview: data.shortReview, longReview: data.longReview, active: data.active, createdAt: data.createdAt, updatedAt: data.updatedAt, title: {titleID: checklistListItem.titleID, titleName: checklistListItem.titleName, titleSort: checklistListItem.titleSort, titleURL: checklistListItem.titleURL, authorFirstName: checklistListItem.authorFirstName, authorLastName: checklistListItem.authorLastName, publicationDate: checklistListItem.publicationDate, imageName: checklistListItem.imageName, categoryID: checklistListItem.categoryID, shortDescription: checklistListItem.shortDescription, urlPKDweb: checklistListItem.urlPKDweb, active: checklistListItem.active, createdAt: checklistListItem.createdAt, updatedAt: checklistListItem.updatedAt}, user: {userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active}}]));

                    };

                } else {
                    console.log(componentName, "updateChecklist resultsFound error", data.message);
                    setErrChecklistMessage(data.message);
                };

            })
            .catch(error => {
                console.log(componentName, "updateChecklist error", error);
                // console.log(componentName, "updateChecklist error.name", error.name);
                // console.log(componentName, "updateChecklist error.message", error.message);
                setErrChecklistMessage(error.name + ": " + error.message);
            });

        };

    };

    const redirectPage = (linkName) => {
        // console.log(componentName, "redirectPage", linkName);
        dispatch(setPageURL(linkName.replaceAll("/", "")));
        history.push("/" + linkName);

        // toggle();
    };

    const toggle = () => {
        setModal(!modal);
    };

    return(
        <React.Fragment>

            {checklistLoaded !== undefined && checklistLoaded !== null && checklistLoaded === true && props.displayButton === true ? <Button outline className="my-2" size="sm" color="info" onClick={toggle}>Checklist</Button> : null}

        <Modal isOpen={modal} toggle={toggle} size="lg">
           <ModalHeader toggle={toggle}>Checklist</ModalHeader>
           <ModalBody>

           <ListGroup flush>

           {linkItem !== undefined && linkItem !== null && linkItem.hasOwnProperty("linkType") === true && linkItem.hasOwnProperty("linkName") === true && linkItem.linkType === "category" ? 
            <ListGroupItem> 
            <h6 className="text-center">{linkItem.linkName}
            {/* Fetch runs very slow 
            <p className="ml-2"> <small>Sort By
                {props.titleSort !== "publicationDate" ? 
                <a href="#" onClick={(event) => {event.preventDefault(); props.setTitleSort("publicationDate")}}>Publication Date</a>
                : null}
                {props.titleSort !== null ? 
                <a href="#" onClick={(event) => {event.preventDefault(); props.setTitleSort(null)}}>Title</a>
                : null}
            </small></p> */}
            </h6>
            </ListGroupItem>
            : null}

            {checklistList.map((title) => {
            return (
            <ListGroupItem key={title.titleID}>
                <ListGroupItem key={title.titleID}><Input type="checkbox" id={"cbxRead" + title.titleID} checked={title.read} /*value={title.read}*/ onChange={(event) => {/*console.log(event.target.value);*/ updateChecklist(title.titleID, !title.read, title.reviewID)}} /> <Link to={title.titleURL} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(title.titleURL);}}>{title.titleName}</Link>
                {title.publicationDate !== null ? <span className="ml-1 smallerText">({displayYear(title.publicationDate)})</span> : null}
            </ListGroupItem>
            </ListGroupItem>
            )
            })}
        </ListGroup>

        <ModalFooter>
    
        <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
    </ModalFooter>
    </ModalBody>
    </Modal>
    </React.Fragment>
    );

};

export default Checklist;
