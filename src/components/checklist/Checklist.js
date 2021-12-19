import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert, Container, Col, Row, ListGroup, ListGroupItem, Button, Input } from "reactstrap";
import { Drawer } from "@material-ui/core";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty, DisplayYear, encodeURL, decodeURL } from "../../utilities/SharedFunctions";
import { setTitleSortBy } from "../../app/titlesSlice";
import { setEditionSortBy } from "../../app/editionsSlice";
import { setPageURL } from "../../app/urlsSlice";
import { addStateUserReview, updateStateUserReview } from "../../app/userReviewsSlice";
import { updateStateChecklist } from "../../app/userSlice";

const Checklist = (props) => {

  const componentName = "Checklist.js";

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  // const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.app.baseURL);
  const baseURL = AppSettings.baseURL;
  // console.log(componentName, GetDateTime(), "baseURL", baseURL);

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
  // console.log(componentName, GetDateTime(), "linkItem", linkItem);

  const titleListState = useSelector(state => state.titles.arrayTitles);
  // console.log(componentName, GetDateTime(), "titleListState", titleListState);

  // const userReviewListState = useSelector(state => state.userReviews.arrayUserReviews);
  // console.log(componentName, GetDateTime(), "userReviewListState", userReviewListState);

  const userState = { userID: useSelector(state => state.user.userID), firstName: useSelector(state => state.user.firstName), lastName: useSelector(state => state.user.lastName), email: useSelector(state => state.user.email), updatedBy: useSelector(state => state.user.updatedBy), admin: useSelector(state => state.user.admin), active: useSelector(state => state.user.active) };
  // console.log(componentName, GetDateTime(), "userState", userState);

  // const editionListState = useSelector(state => state.editions.arrayEditions);
  // console.log(componentName, GetDateTime(), "editionListState", editionListState);

  // let editionList = [...editionListState];
  // console.log(componentName, GetDateTime(), "editionList", editionList);


  const sortChecklistList = (sortBy) => {
    // console.log(componentName, GetDateTime(), "sortTitles sortBy", sortBy);

    if (IsEmpty(checklistList) === false && checklistList.length > 0) {

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
        // console.log(componentName, GetDateTime(), "titleListPublicationDate", titleListPublicationDate);

        let titleListNoPublicationDate = checklistList.filter(title => title.titlePublicationDate === undefined || title.titlePublicationDate === null);
        titleListNoPublicationDate.sort((a, b) => (a.titleSort > b.titleSort) ? 1 : -1);
        // console.log(componentName, GetDateTime(), "titleListNoPublicationDate", titleListNoPublicationDate);

        let newtitleList = [...titleListPublicationDate];
        newtitleList.push(...titleListNoPublicationDate);
        // console.log(componentName, GetDateTime(), "newtitleList", newtitleList);

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
  // console.log(componentName, GetDateTime(), "checklistListState", checklistListState);

  let checklistList = [...checklistListState];
  // console.log(componentName, GetDateTime(), "checklistList", checklistList);

  // * Filter by category
  if (IsEmpty(linkItem) === false && HasNonEmptyProperty(linkItem, "linkType") === true) {

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
  // console.log(componentName, GetDateTime(), "titleSortBy", titleSortBy);
  // console.log(componentName, GetDateTime(), "titleList", titleList);


  const updateChecklist = (titleID, reviewID, read, owned) => {

    // console.log(componentName, GetDateTime(), "updateChecklist titleID", titleID);
    // console.log(componentName, GetDateTime(), "updateChecklist read", read);
    // console.log(componentName, GetDateTime(), "updateChecklist reviewID", reviewID);

    clearMessages();
    setChecklistRecordUpdated(null);

    // ? If read is false and there are no other values in the userReviews table, should the record be deleted?
    let userReviewObject = {
      titleID: titleID,
      read: read,
      owned: owned,
      active: true // ? always true?
    };

    // console.log(componentName, GetDateTime(), "updateChecklist userReviewObject", userReviewObject);

    let url = baseURL + "userreviews/";
    let updateChecklistMethod = "";

    if (IsEmpty(reviewID) === false) {

      url = url + reviewID;
      updateChecklistMethod = "PUT";

    } else {

      updateChecklistMethod = "POST";

    };

    // console.log(componentName, GetDateTime(), "updateChecklist url", url);
    // console.log(componentName, GetDateTime(), "updateChecklist updateChecklistMethod", updateChecklistMethod);

    if (IsEmpty(sessionToken) === false) {

      fetch(url, {
        method: updateChecklistMethod,
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": sessionToken
        }),
        body: JSON.stringify({ userReview: userReviewObject })
      })
        .then(response => {
          // console.log(componentName, GetDateTime(), "updateChecklist response", response);

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
          // console.log(componentName, GetDateTime(), "updateChecklist data", data);

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

          addMessage(data.message);

          if (recordChanged === true) {

            // ! Need to update this component after this function runs
            // ? Need to update the state to do it?
            // updateChecklistItemRead(titleID);

            // ! Need to update the other components after this function runs
            // this.props.userReviewUpdated();

            // const checklistListItem = checklistList.find(title => title.titleID === titleID);
            // console.log(componentName, GetDateTime(), "updateChecklist checklistListItem", checklistListItem);

            // const checklistListIndex = checklistList.findIndex(title => title.titleID === titleID);
            // console.log(componentName, GetDateTime(), "updateChecklist checklistListIndex", checklistListIndex);

            if (updateChecklistMethod === "PUT") {

              dispatch(updateStateChecklist({ /*checklistListIndex: checklistListIndex,*/ reviewID: reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, owned: data.records[0].owned, datePurchased: data.records[0].datePurchased, userReviewActive: data.records[0].active, userReviewUpdateDate: GetDateTime()
              }));

            } else if (updateChecklistMethod === "POST") {

              dispatch(updateStateChecklist({ /*checklistListIndex: checklistListIndex,*/ reviewID: data.records[0].reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, owned: data.records[0].owned, datePurchased: data.records[0].datePurchased, userReviewActive: data.records[0].active, userReviewUpdateDate: data.records[0].updateDate
              }));

            };

            // const userReviewListIndex = userReviewListState.findIndex(userReview => userReview.reviewID === reviewID);
            // console.log(componentName, GetDateTime(), "updateChecklist checklistListIndex", checklistListIndex);

            if (updateChecklistMethod === "PUT") {

              dispatch(updateStateUserReview({ /*userReviewListIndex: userReviewListIndex,*/ reviewID: reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, owned: data.records[0].owned, datePurchased: data.records[0].datePurchased, active: data.records[0].active, userReviewActive: data.records[0].active, updateDate: data.records[0].updateDate }));

            } else if (updateChecklistMethod === "POST") {

              let titleItem = titleListState.filter(title => title.titleID === titleID);
              // title: {titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate}
              titleItem = titleItem[0];

              dispatch(addStateUserReview([{ reviewID: data.records[0].reviewID, userID: data.records[0].userID, updatedBy: data.records[0].updatedBy, titleID: data.records[0].titleID, read: data.records[0].read, dateRead: data.records[0].dateRead, rating: data.records[0].rating, shortReview: data.records[0].shortReview, longReview: data.records[0].longReview, owned: data.records[0].owned, datePurchased: data.records[0].datePurchased, active: data.records[0].active, userReviewActive: data.records[0].active, createDate: data.records[0].createDate, updateDate: data.records[0].updateDate/*, title: { titleID: titleItem.titleID, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, active: titleItem.active, createDate: titleItem.createDate, updateDate: titleItem.updateDate }*/, titleName: titleItem.titleName, titleSort: titleItem.titleSort, titleURL: titleItem.titleURL, authorFirstName: titleItem.authorFirstName, authorLastName: titleItem.authorLastName, publicationDate: titleItem.publicationDate, imageName: titleItem.imageName, categoryID: titleItem.categoryID, shortDescription: titleItem.shortDescription, urlPKDWeb: titleItem.urlPKDWeb, titleActive: titleItem.active, titleCreateDate: titleItem.createDate, titleUpdatedDate: titleItem.updateDate/*, user: { userID: userState.userID, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, updatedBy: userState.updatedBy, admin: userState.admin, active: userState.active }*/, firstName: userState.firstName, lastName: userState.lastName, email: userState.email, userUpdatedBy: userState.updatedBy, admin: userState.admin, userActive: userState.active }]));

            };

          } else {

            console.log(componentName, GetDateTime(), "updateChecklist resultsFound error", data.message);
            addErrorMessage(data.message);

          };

        })
        .catch(error => {
          console.error(componentName, GetDateTime(), "updateChecklist error", error);
          // console.error(componentName, GetDateTime(), "updateChecklist error.name", error.name);
          // console.error(componentName, GetDateTime(), "updateChecklist error.message", error.message);

          addErrorMessage(error.name + ": " + error.message);

        });

    };

  };


  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);

    // setModal(!modal);

  };


  return (
    <React.Fragment>

      {/* {IsEmpty(checklistLoaded) === false && checklistLoaded === true && props.displayButton === true ? <Button outline className="my-2" size="sm" color="info" onClick={(event) => { setModal(!modal); }}>Checklist</Button> : null}

        <Modal isOpen={modal} toggle={(event) => { setModal(!modal); }} size="lg">
           <ModalHeader toggle={(event) => { setModal(!modal); }}>Checklist</ModalHeader>
           <ModalBody> */}

      {IsEmpty(checklistLoaded) === false && checklistLoaded === true && props.displayButton === true ? <Button outline className="my-2" size="sm" color="info" onClick={(event) => { setDrawer(!drawer); }}>Checklist</Button> : null}

      <Drawer anchor="right" open={drawer} onClose={(event) => { setDrawer(!drawer); }}>

        <Container className="checklistDrawer mx-3">
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

          {IsEmpty(linkItem) === false && HasNonEmptyProperty(linkItem, "linkTypeName") === true ?

            <Row className="justify-content-center">
              <Col xs="8">

                {/* <ListGroupItem> */}

                <h6 className="text-center mb-2">{linkItem.linkTypeName}
                  <br />

                  <span className="text-muted ml-2 smallText">Sort By&nbsp;

                    {titleSortBy !== "publicationDate" ?

                      <a href="#" className="text-decoration-none" onClick={(event) => { event.preventDefault(); sortChecklistList("publicationDate"); dispatch(setTitleSortBy("publicationDate")); dispatch(setEditionSortBy("publicationDate")); }}>Publication Date</a>

                      : null}

                    {titleSortBy !== "titleName" ?

                      <a href="#" className="text-decoration-none" onClick={(event) => { event.preventDefault(); sortChecklistList("titleName"); dispatch(setTitleSortBy("titleName")); dispatch(setEditionSortBy("titleName")); }}>Title</a>

                      : null}

                  </span>

                </h6>

                {/* </ListGroupItem> */}

              </Col>
            </Row>

            : null}

          {checklistList.map((title) => {

            return (
              <Row /*ListGroupItem*/ key={title.titleID}>
                <Col className="mx-3">

                  {readOrOwned === "read" ? <Input type="checkbox" id={"cbxRead" + title.titleID} checked={title.read}  /*value={title.read}*/ onChange={(event) => { /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateChecklist(title.titleID, title.reviewID, !title.read, title.owned); }} /> : null}

                  {readOrOwned === "owned" ? <Input type="checkbox" id={"cbxOwn" + title.titleID} checked={title.owned} /*value={title.owned}*/ onChange={(event) => {/*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ updateChecklist(title.titleID, title.reviewID, title.read, !title.owned); }} /> : null}

                  <p><Link to={title.titleURL} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(title.titleURL); }}>{title.titleName}</Link>
                    {IsEmpty(title.publicationDate) === false ? <span className="ml-1 smallerText">({DisplayYear(title.publicationDate)})</span> : null}
                  </p>

                  {/* </ListGroupItem> */}

                </Col>
              </Row>
            );

          })}

          {/* </ListGroup> */}

        </Container>

      </Drawer>

      {/* <ModalFooter>
    
        <Button outline size="lg" color="secondary" onClick={(event) => { setModal(!modal); }}>Cancel</Button>
    </ModalFooter>
    </ModalBody>
    </Modal> */}

    </React.Fragment>
  );
};

export default Checklist;
