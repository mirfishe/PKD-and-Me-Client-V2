import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert, Container, Col, Row, NavLink, ListGroup, ListGroupItem, Button, Input, NavItem, NavbarText } from "reactstrap";
// import { Drawer } from "@mui/material";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, isNonEmptyArray, displayValue, hasNonEmptyProperty, displayYear } from "shared-functions";
import { encodeURL, decodeURL, addErrorLog } from "../../utilities/ApplicationFunctions";
import { setTitleSortBy } from "../../app/titlesSlice";
import { setEditionSortBy } from "../../app/editionsSlice";
import { setPageURL } from "../../app/urlsSlice";
// import { addStateUserReview, updateStateUserReview } from "../../app/userReviewsSlice";
// import { updateStateChecklist } from "../../app/userSlice";

const Checklist = (props) => {

  const componentName = "Checklist";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // const admin = useSelector(state => state.user.admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  const titleSortBy = useSelector(state => state.titles.titleSortBy);

  // const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const checklistLoaded = useSelector(state => state.user.checklistLoaded);

  const [checklistRecordUpdated, setChecklistRecordUpdated] = useState(null);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [readOrOwned, setReadOrOwned] = useState("read");

  const linkItem = useSelector(state => state.urls.linkItem);

  const titleListState = useSelector(state => state.titles.arrayTitles);

  // const userReviewListState = useSelector(state => state.userReviews.arrayUserReviews);

  const userState = { userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active) };

  // const editionListState = useSelector(state => state.editions.arrayEditions);

  // let editionList = [...editionListState];


  const sortChecklistList = (sortBy) => {

    if (isEmpty(checklistList) === false && checklistList.length > 0) {

      if (sortBy === "publicationDate") {

        // * Sort the checklistList array by title.publicationDate
        // ! // ! Doesn't handle null values well; treats them as "null"
        // checklistList.sort((a, b) => (a.publicationDate > b.publicationDate) ? 1 : -1);

        // ? Sort by titleSort first to order the items with a null value for publicationDate?
        // checklistList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
        // ! Doesn't sort at all
        // checklistList.sort((a, b) => ((b.publicationDate !== null) - (a.publicationDate !== null) || a.publicationDate - b.publicationDate));

        // ! Doesn't sort correctly
        // checklistList.sort(function(a, b) {

        //     if (a.publicationDate === b.publicationDate) {

        //         // titleSort is only important when publicationDates are the same
        //         return b.titleSort - a.titleSort;

        //      };

        //     return ((b.publicationDate != null) - (a.publicationDate != null) || a.publicationDate - b.publicationDate);

        // });

        // * Separate the array items with undefined/null values, sort them appropriately and then concatenate them back together
        let titleListPublicationDate = checklistList.filter(title => title.titlePublicationDate !== undefined && title.titlePublicationDate !== null);
        titleListPublicationDate.sort((a, b) => (a.titlePublicationDate > b.titlePublicationDate) ? 1 : -1);

        let titleListNoPublicationDate = checklistList.filter(title => title.titlePublicationDate === undefined || title.titlePublicationDate === null);
        titleListNoPublicationDate.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

        let newtitleList = [...titleListPublicationDate];
        newtitleList.push(...titleListNoPublicationDate);

        checklistList = [...newtitleList];

      } else if (sortBy === "titleName") {

        // * Sort the checklistList array by title.titleSort
        checklistList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

      } else {

        // * Sort the checklistList array by title.titleSort
        checklistList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);

      };

    };

  };

  const checklistListState = useSelector(state => state.user.arrayChecklist);

  let checklistList = [...checklistListState];

  // * Filter by category
  if (isEmpty(linkItem) === false && hasNonEmptyProperty(linkItem, "linkType") === true) {

    if (linkItem.linkType === "categories") {

      checklistList = checklistList.filter(title => title.categoryID === linkItem.linkID);

      // } else if (linkItem.linkType === "media") {

      //   // ! This won't work; media is not available
      //   // checklistList = checklistList.filter(title => title.mediaID === linkItem.linkID);

      //   editionList = editionList.filter(edition => edition.mediaID === linkItem.linkID);

      //   checklistList = checklistList.filter((title) => {

      //     return editionList.some((edition) => {

      //       return edition.titleID === title.titleID;

      //     });

      //   });

    } else if (linkItem.linkType === "titles") {

      checklistList = checklistList.filter(title => title.categoryID === linkItem.linkTypeNameID);

    };

  };

  // checklistList.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
  sortChecklistList(titleSortBy);


  const updateChecklist = (titleID, reviewID, read, owned) => {


    clearMessages();
    setChecklistRecordUpdated(null);

    // ? If read is false and there are no other values in the userReviews table, should the record be deleted?
    let recordObject = {
      titleID: titleID,
      read: read,
      owned: owned,
      active: true // ? always true?
    };


    let url = baseURL + "userreviews/";
    let updateChecklistMethod = "";

    if (isEmpty(reviewID) === false) {

      url = url + reviewID;
      updateChecklistMethod = "PUT";

    } else {

      updateChecklistMethod = "POST";

    };


    if (isEmpty(sessionToken) === false) {

      fetch(url, {
        method: updateChecklistMethod,
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        }),
        body: JSON.stringify({ userReview: recordObject })
      })
        .then(response => {

          // if (response.ok !== true) {

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

          let recordChanged = null;

          if (updateChecklistMethod === "PUT") {

            setChecklistRecordUpdated(data.transactionSuccess);
            recordChanged = data.transactionSuccess;

          } else if (updateChecklistMethod === "POST") {

            setChecklistRecordUpdated(data.transactionSuccess);
            recordChanged = data.transactionSuccess;

          } else {

            setChecklistRecordUpdated(null);

          };

          addMessage(data.message);

          if (recordChanged === true) {

            // ! Need to update this component after this function runs
            // ? Need to update the state to do it?
            // updateChecklistItemRead(titleID);

            // ! Need to update the other components after this function runs
            // this.props.userReviewUpdated();

            // const checklistListItem = checklistList.find(title => title.titleID === titleID);

            // const checklistListIndex = checklistList.findIndex(title => title.titleID === titleID);

            // if (updateChecklistMethod === "PUT") {

            //   dispatch(updateStateChecklist({ /*checklistListIndex: checklistListIndex,*/ reviewID: reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, owned: data.records[0].owned, datePurchased: data.records[0].datePurchased, userReviewActive: data.records[0].active, userReviewUpdateDate: getDateTime() }));

            // } else if (updateChecklistMethod === "POST") {

            //   dispatch(updateStateChecklist({ /*checklistListIndex: checklistListIndex,*/ reviewID: data.records[0].reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, owned: data.records[0].owned, datePurchased: data.records[0].datePurchased, userReviewActive: data.records[0].active, userReviewUpdateDate: data.records[0].updateDate }));

            // };

            // // const userReviewListIndex = userReviewListState.findIndex(userReview => userReview.reviewID === reviewID);

            // if (updateChecklistMethod === "PUT") {

            //   dispatch(updateStateUserReview({ /*userReviewListIndex: userReviewListIndex,*/ reviewID: reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, owned: data.records[0].owned, datePurchased: data.records[0].datePurchased, active: data.records[0].active, userReviewActive: data.records[0].active, updateDate: data.records[0].updateDate }));

            // } else if (updateChecklistMethod === "POST") {

            //   let titleItem = titleListState.filter(title => title.titleID === titleID);
            //   // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}
            //   titleItem = titleItem[0];

            //   dispatch(addStateUserReview([{ reviewID: data.records[0].reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, rating: data.records[0].rating, shortReview: data.records[0].shortReview, longReview: data.records[0].longReview, owned: data.records[0].owned, datePurchased: data.records[0].datePurchased, active: data.records[0].active, userReviewActive: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate/*, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }*/, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, titleActive: titleItem.active, titleCreateDate: titleItem.createDate, titleUpdatedDate: titleItem.updateDate/*, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active }*/, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, userUpdatedBy: userState.updatedBy, admin: userState.admin, userActive: userState.active }]));

            // };

          } else {

            console.error(componentName, getDateTime(), "updateChecklist transactionSuccess error", data.message);
            addErrorMessage(data.message);

          };

        })
        .catch((error) => {
          console.error(componentName, getDateTime(), "updateChecklist error", error);
          // console.error(componentName, getDateTime(), "updateChecklist error.name", error.name);
          // console.error(componentName, getDateTime(), "updateChecklist error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

          // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

        });

    };

  };


  const redirectPage = (linkName) => {

    // * Scroll to top of the page after clicking the link. -- 08/05/2021 MF
    window.scrollTo(0, 0);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

    // setModal(!modal);

  };


  return (
    <React.Fragment>

      {/* {isEmpty(checklistLoaded) === false && checklistLoaded === true && props.displayButton === true ? <Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Checklist</Button> : null}

        <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="lg">
           <ModalHeader toggle={(event) => { setModal(!modal); }}>Checklist</ModalHeader>
           <ModalBody> */}

      {/* {isEmpty(checklistLoaded) === false && checklistLoaded === true && props.displayButton === true ? <Button outline className="my-2" size="sm" color="info" onClick={(event) => { setDrawer(!drawer); }}>Checklist</Button> : null} */}

      {isEmpty(checklistLoaded) === false && checklistLoaded === true && props.displayButton === true ?

        <React.Fragment>
          {/* <NavItem> */}
          {/* <NavItem className="mx-3 my-2">
            <a href="#" onClick={(event) => { setDrawer(!drawer); }}><NavbarText>Checklist</NavbarText></a> */}
          <NavLink className="nav_link" onClick={(event) => { setDrawer(!drawer); }}><NavbarText>Checklist</NavbarText></NavLink>
          {/* </NavItem> */}
        </React.Fragment>

        : null}

      {/* <Drawer anchor="right" open={drawer} onClose={(event) => { setDrawer(!drawer); }}> */}

      <Container className="checklist-drawer mx-3">
        <Row className="mb-2">
          <Col>

            <Button outline className="my-2" size="sm" color="info" onClick={(event) => { setDrawer(!drawer); }}>Close</Button>

          </Col>
        </Row>

        <Row className="mb-2">
          <Col className="text-center">

            <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
            <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

          </Col>
        </Row>

        <Row className="mb-2">
          <Col>

            <Button outline className="my-2" size="sm" color="info" onClick={(event) => { event.preventDefault(); setReadOrOwned("read"); }}>Read</Button>
            <Button outline className="my-2" size="sm" color="info" onClick={(event) => { event.preventDefault(); setReadOrOwned("owned"); }}>Own</Button>
            {readOrOwned === "read" ? <p>Read</p> : null}
            {readOrOwned === "owned" ? <p>Owned</p> : null}

          </Col>
        </Row>

        {/* <ListGroup flush> */}

        {isEmpty(linkItem) === false && hasNonEmptyProperty(linkItem, "linkTypeName") === true ?

          <Row className="justify-content-center">
            <Col xs="8">

              {/* <ListGroupItem> */}

              <h6 className="text-center mb-2">{linkItem.linkTypeName}
                <br />

                <span className="text-muted ms-2 small-text">Sort By&nbsp;

                  {titleSortBy !== "publicationDate" ?

                    <a href="#" onClick={(event) => { event.preventDefault(); sortChecklistList("publicationDate"); dispatch(setTitleSortBy("publicationDate")); dispatch(setEditionSortBy("publicationDate")); }}>Publication Date</a>

                    : null}

                  {titleSortBy !== "titleName" ?

                    <a href="#" onClick={(event) => { event.preventDefault(); sortChecklistList("titleName"); dispatch(setTitleSortBy("titleName")); dispatch(setEditionSortBy("titleName")); }}>Title</a>

                    : null}

                </span>

              </h6>

              {/* </ListGroupItem> */}

            </Col>
          </Row>

          : null}

        {isNonEmptyArray(checklistList) === true ?

          <React.Fragment>

            {checklistList.map((title) => {

              return (
                <Row /*ListGroupItem*/ key={title.titleID}>
                  <Col className="mx-3">

                    {readOrOwned === "read" ? <Input type="checkbox" id={"cbxRead" + title.titleID} checked={title.read}  /*value={title.read}*/ onChange={(event) => { updateChecklist(title.titleID, title.reviewID, !title.read, title.owned); }} /> : null}

                    {readOrOwned === "owned" ? <Input type="checkbox" id={"cbxOwn" + title.titleID} checked={title.owned} /*value={title.owned}*/ onChange={(event) => { updateChecklist(title.titleID, title.reviewID, title.read, !title.owned); }} /> : null}

                    <p><Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>{title.titleName}</Link>
                      {isEmpty(title.publicationDate) === false ? <span className="ms-1 smaller-text">({displayYear(title.publicationDate)})</span> : null}
                    </p>

                    {/* </ListGroupItem> */}

                  </Col>
                </Row>
              );

            })}

          </React.Fragment>

          : null}

        {/* </ListGroup> */}

      </Container>

      {/* </Drawer> */}

      {/* <ModalFooter>
    
        <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button>
    </ModalFooter>
    </ModalBody>
    </Modal> */}

    </React.Fragment>
  );
};

export default Checklist;
