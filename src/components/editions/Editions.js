import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Image } from 'react-bootstrap-icons';
import { IsEmpty, DisplayValue, GetDateTime, DisplayDate, DisplayYear, encodeURL, decodeURL, removeOnePixelImage, setLocalPath, setLocalImagePath } from "../../app/sharedFunctions";
import { setTitleSortBy } from "../../bibliographyData/titlesSlice";
import { setEditionSortBy } from "../../bibliographyData/editionsSlice";
import { setPageURL } from "../../app/urlsSlice";
import AddEdition from "../editions/AddEdition";
import EditEdition from "../editions/EditEdition";

const Editions = (props) => {

  const componentName = "Editions.js";

  const dispatch = useDispatch();
  const history = useHistory();

  const siteName = useSelector(state => state.app.siteName);
  const appName = useSelector(state => state.app.appName);

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  const editionSortBy = useSelector(state => state.editions.editionSortBy);

  const electronicOnly = useSelector(state => state.app.electronicOnly);
  const userElectronicOnly = useSelector(state => state.app.userElectronicOnly);
  const electronicOnlyMessage = useSelector(state => state.app.electronicOnlyMessage);
  const physicalOnly = useSelector(state => state.app.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.app.userPhysicalOnly);
  const physicalOnlyMessage = useSelector(state => state.app.physicalOnlyMessage);

  const [errEditionMessage, setErrEditionMessage] = useState("");

  const editionListState = useSelector(state => state.editions.arrayEditions);
  // console.log(componentName, GetDateTime(), "editionListState", editionListState);
  const mediaListState = useSelector(state => state.media.arrayMedia);
  // console.log(componentName, GetDateTime(), "mediaListState", mediaListState);

  let mediaParam;
  if (IsEmpty(props.linkItem) === false && props.linkItem.hasOwnProperty("linkName")) {
    // console.log(componentName, GetDateTime(), "props.match.params", props.match.params);
    mediaParam = props.linkItem.linkName; // props.match.params.media;
    // console.log(componentName, GetDateTime(), "typeof mediaParam", typeof mediaParam);
    // console.log(componentName, GetDateTime(), "mediaParam", mediaParam);
  };

  const sortEditions = (sortBy) => {
    // console.log("componentName, sortTitles sortBy", sortBy);
    if (IsEmpty(editionList) === false && editionList.length > 0) {
      if (sortBy === "releaseDate") {
        // * Sort the editionList array by editionPublicationDate, title.titleSort, (would like to add media.sortID)
        // ! Doesn't handle null values well; treats them as "null"
        // editionList.sort((a, b) => (a.publicationDate > b.publicationDate) ? 1 : (a.publicationDate > b.publicationDate) ? ((a.title.titleSort > b.title.titleSort) ? 1 : -1) : -1);

        // * Temporary to test the sorting
        // editionList = editionList.filter(edition => edition.title.titleName === "A Scanner Darkly");

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        // editionList.sort(
        //     function(a, b) {
        //        if (a.publicationDate === b.publicationDate) {
        //             if (a.title.titleSort === b.title.titleSort) {
        //                 // * Media is only important when title.titleSort are the same
        //                 return a.medium.sortID - b.medium.sortID;
        //             };
        //             // * titleSort is only important when publicationDate are the same
        //             return a.title.titleSort - b.title.titleSort;
        //        };
        //        return a.publicationDate > b.publicationDate ? 1 : -1;
        //     });

        // * Separate the array items with undefined/null values, sort them appropriately and then concatenate them back together
        let editionListReleaseDate = editionList.filter(edition => edition.editionPublicationDate !== undefined && edition.editionPublicationDate !== null);
        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionListReleaseDate.sort(
          function (a, b) {
            if (a.editionPublicationDate === b.editionPublicationDate) {
              // if (a.title.titleSort === b.title.titleSort) {
              if (a.titleSort === b.titleSort) {
                // * Media is only important when title.titleSort are the same
                // return a.medium.sortID - b.medium.sortID;
                return a.sortID - b.sortID;
              };
              // * titleSort is only important when publicationDate are the same
              // return a.title.titleSort - b.title.titleSort;
              return a.titleSort - b.titleSort;
            };
            return a.editionPublicationDate > b.editionPublicationDate ? 1 : -1;
          });
        // console.log(componentName, GetDateTime(), "editionListReleaseDate", editionListReleaseDate);

        let editionListNoReleaseDate = editionList.filter(edition => edition.editionPublicationDate === undefined || edition.editionPublicationDate === null);
        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionListNoReleaseDate.sort(
          function (a, b) {
            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {
              // * Media is only important when title.titleSort are the same
              // if (a.title.titleName === "A Scanner Darkly" || b.title.titleName === "A Scanner Darkly") {
              //     console.log(componentName, GetDateTime(), "a.title.titleName", a.title.titleName);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID", a.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID", b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID - b.medium.sortID", a.medium.sortID - b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID - a.medium.sortID", b.medium.sortID - a.medium.sortID);
              // };
              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;
            };
            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;
          });
        // console.log(componentName, GetDateTime(), "editionListNoReleaseDate", editionListNoReleaseDate);

        let newEditionList = [...editionListReleaseDate];
        newEditionList.push(...editionListNoReleaseDate);
        // console.log(componentName, GetDateTime(), "newEditionList", newEditionList);

        editionList = [...newEditionList];

      } else if (sortBy === "publicationDate") {
        // * Sort the editionList array by title.publicationDate, title.titleSort, (would like to add media.sortID)
        // ! Doesn't handle null values well; treats them as "null"
        // editionList.sort((a, b) => (a.title.publicationDate > b.title.publicationDate) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.title.titleSort > b.title.titleSort) ? 1 : -1) : -1);

        // * Temporary to test the sorting
        // editionList = editionList.filter(edition => edition.title.titleName === "A Scanner Darkly");

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        // editionList.sort(
        //     function(a, b) {          
        //        if (a.title.publicationDate === b.title.publicationDate) {
        //             if (a.title.titleSort === b.title.titleSort) {
        //                 // * Media is only important when title.titleSort are the same
        //                 return a.medium.sortID - b.medium.sortID;
        //             };
        //             // * titleSort is only important when publicationDate are the same
        //             return a.title.titleSort - b.title.titleSort;
        //        };
        //        return a.title.publicationDate > b.title.publicationDate ? 1 : -1;
        //     });

        // * Separate the array items with undefined/null values, sort them appropriately and then concatenate them back together
        let editionListPublicationDate = editionList.filter(edition => edition.titlePublicationDate === undefined || edition.titlePublicationDate === null);
        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionListPublicationDate.sort(
          function (a, b) {
            // if (a.title.publicationDate === b.title.publicationDate) {
            if (a.titlePublicationDate === b.titlePublicationDate) {
              // if (a.title.titleSort === b.title.titleSort) {
              if (a.titleSort === b.titleSort) {
                // * Media is only important when title.titleSort are the same
                // return a.medium.sortID - b.medium.sortID;
                return a.sortID - b.sortID;
              };
              // * titleSort is only important when publicationDate are the same
              // return a.title.titleSort - b.title.titleSort;
              return a.titleSort - b.titleSort;
            };
            // return a.title.publicationDate > b.title.publicationDate ? 1 : -1;
            return a.titlePublicationDate > b.titlePublicationDate ? 1 : -1;
          });
        // console.log(componentName, GetDateTime(), "editionListPublicationDate", editionListPublicationDate);

        let editionListNoPublicationDate = editionList.filter(edition => edition.titlePublicationDate === undefined || edition.titlePublicationDate === null);
        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionListNoPublicationDate.sort(
          function (a, b) {
            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {
              // * Media is only important when title.titleSort are the same
              // if (a.title.titleName === "A Scanner Darkly" || b.title.titleName === "A Scanner Darkly") {
              //     console.log(componentName, GetDateTime(), "a.title.titleName", a.title.titleName);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID", a.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID", b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID - b.medium.sortID", a.medium.sortID - b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID - a.medium.sortID", b.medium.sortID - a.medium.sortID);
              // };
              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;
            };
            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;
          });
        // console.log(componentName, GetDateTime(), "editionListNoPublicationDate", editionListNoPublicationDate);

        let newEditionList = [...editionListPublicationDate];
        newEditionList.push(...editionListNoPublicationDate);
        // console.log(componentName, GetDateTime(), "newEditionList", newEditionList);

        editionList = [...newEditionList];

      } else if (sortBy === "titleName") {
        // * Sort the editionList array by title.titleSort, media.sortID
        // ! Doesn't sort correctly
        // editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.medium.sortID > b.medium.sortID) ? 1 : -1) : -1);

        // editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : -1);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionList.sort(
          function (a, b) {
            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {
              // * Media is only important when title.titleSort are the same
              // if (a.title.titleName === "A Scanner Darkly" || b.title.titleName === "A Scanner Darkly") {
              //     console.log(componentName, GetDateTime(), "a.title.titleName", a.title.titleName);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID", a.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID", b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID - b.medium.sortID", a.medium.sortID - b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID - a.medium.sortID", b.medium.sortID - a.medium.sortID);
              // };
              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;
            };
            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;
          });

      } else {
        // * Sort the editionList array by title.titleSort, media.sortID
        // ! Doesn't sort correctly
        // editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : (a.title.titleSort > b.title.titleSort) ? ((a.medium.sortID > b.medium.sortID) ? 1 : -1) : -1);

        // editionList.sort((a, b) => (a.title.titleSort > b.title.titleSort) ? 1 : -1);

        // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        editionList.sort(
          function (a, b) {
            // if (a.title.titleSort === b.title.titleSort) {
            if (a.titleSort === b.titleSort) {
              // * Media is only important when title.titleSort are the same
              // if (a.title.titleName === "A Scanner Darkly" || b.title.titleName === "A Scanner Darkly") {
              //     console.log(componentName, GetDateTime(), "a.title.titleName", a.title.titleName);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID", a.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID", b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "a.medium.sortID - b.medium.sortID", a.medium.sortID - b.medium.sortID);
              //     console.log(componentName, GetDateTime(), "b.medium.sortID - a.medium.sortID", b.medium.sortID - a.medium.sortID);
              // };
              // return a.medium.sortID - b.medium.sortID;
              return a.sortID - b.sortID;
            };
            // return a.title.titleSort > b.title.titleSort ? 1 : -1;
            return a.titleSort > b.titleSort ? 1 : -1;
          });

      };
    };
  };

  let editionList = [];
  if (!isNaN(mediaParam)) {
    // ! This code no longer works with the current URL setup
    // * If mediaParam is a number, then it's the mediaID
    document.title = editionList[0].medium.media + " | " + appName + " | " + siteName;
    editionList = editionListState.filter(edition => edition.mediaID === parseInt(mediaParam));
  } else if (IsEmpty(mediaParam) === false) {
    // * If mediaParam is not a number, then it's the media name
    const media = mediaListState.find(media => media.media === decodeURL(mediaParam));
    // console.log(componentName, GetDateTime(), "typeof media", typeof media);
    // console.log(componentName, GetDateTime(), "media", media);

    if (IsEmpty(media) === false) {
      document.title = media.media + " | " + appName + " | " + siteName;
      editionList = editionListState.filter(edition => edition.mediaID === parseInt(media.mediaID));
    } else {
      document.title = "Media Not Found | " + appName + " | " + siteName;
      console.log("Media not found.");
      // * Display all active editions
      // editionList = editionListState;
      // setErrTitleMessage("Media not found.")
    };

  } else {
    document.title = "All Editions | " + appName + " | " + siteName;
    // * Display all active editions
    editionList = [...editionListState];
    // editionList = editionListState.filter(edition => edition.active === true);
  };

  if (electronicOnly === true || userElectronicOnly === true) {
    // editionList = editionList.filter(edition => edition.medium.electronic === true);
    editionList = editionList.filter(edition => edition.electronic === true);
  } else if (physicalOnly === true || userPhysicalOnly === true) {
    // editionList = editionList.filter(edition => edition.medium.electronic === false);
    editionList = editionList.filter(edition => edition.electronic === false);
  } else {
    editionList = [...editionList];
  };

  if (IsEmpty(admin) === false && admin === true) {
    editionList = [...editionList];
  } else {
    // ! How does Knex handle the leftOuterJoin with two columns of the same name?:  active, publicationDate, imageName, sortID, updatedBy, createDate, updateDate
    // editionList = editionList.filter(edition => edition.active === true && edition.medium.active === true);
    editionList = editionList.filter(edition => edition.editionActive === true && edition.mediaActive === true);
  };

  sortEditions(editionSortBy);
  // console.log(componentName, GetDateTime(), "editionList", editionList);

  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);
    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);
  };

  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect editionList", editionList);
    if (editionList.length > 0) {
      setErrEditionMessage("");
    } else {
      setErrEditionMessage("No editions found.");
    };
  }, [editionList]);

  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12">
          <Breadcrumb className="breadcrumb mb-2">
            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
            {IsEmpty(mediaParam) === false && isNaN(mediaParam) ?
              <BreadcrumbItem active><Link to={mediaParam} onClick={(event) => { event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(mediaParam); }}>{decodeURL(mediaParam)}</Link></BreadcrumbItem>
              :
              <BreadcrumbItem active><Link to={"/editions/"} onClick={(event) => { event.preventDefault(); /*console.log(event.target.value);*/ redirectPage("/editions/"); }}>All Editions</Link></BreadcrumbItem>
            }
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <h4 className="text-center mb-4">{IsEmpty(mediaParam) === false && isNaN(mediaParam) ? decodeURL(mediaParam) : "All Editions"}
            <span className="text-muted ml-2 smallText">Sort By
                        {editionSortBy !== "releaseDate" ?
                <a href="#" className="text-decoration-none ml-2" onClick={(event) => { event.preventDefault(); sortEditions("releaseDate"); dispatch(setEditionSortBy("releaseDate")); }}>Release Date</a>
                : null}
              {editionSortBy !== "publicationDate" ?
                <a href="#" className="text-decoration-none ml-2" onClick={(event) => { event.preventDefault(); sortEditions("publicationDate"); dispatch(setEditionSortBy("publicationDate")); dispatch(setTitleSortBy("publicationDate")); }}>Publication Date</a>
                : null}
              {editionSortBy !== "titleName" ?
                <a href="#" className="text-decoration-none ml-2" onClick={(event) => { event.preventDefault(); sortEditions("titleName"); dispatch(setEditionSortBy("titleName")); dispatch(setTitleSortBy("titleName")); }}>Title</a>
                : null}
            </span>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs="12">
          {IsEmpty(errEditionMessage) === false ? <Alert color="danger">{errEditionMessage}</Alert> : null}
          {electronicOnly === true || userElectronicOnly === true ? <Alert color="info">{electronicOnlyMessage}</Alert> : null}
          {physicalOnly === true || userPhysicalOnly === true ? <Alert color="info">{physicalOnlyMessage}</Alert> : null}
        </Col>
      </Row>
      <Row>
        {editionList.map((edition) => {

          let activeString = "";
          if (edition.active === true) {
            // activeString = "Active";
            activeString = "";
          } else {
            activeString = "Inactive";
          };

          return (
            <Col key={edition.editionID} xs="6" className="mb-4">

              {/* <Card key={edition.editionID}>

                    {IsEmpty(mediaParam) === false ?
                    <CardHeader>
                        <Link to={encodeURL(edition.medium.media)}>{edition.medium.media}</Link>
                    </CardHeader>
                    : null}

                    <CardBody className="editionImage">
                    {IsEmpty(edition.imageLinkLarge) === false ? 
                        <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />
                    :
                    <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                    {IsEmpty(edition.imageName) === false ? <img src={setLocalImagePath(edition.imageName)} alt="" className="coverDisplay" /> : <Image className="noImageIcon"/>}
                    </a>
                    }
                    {IsEmpty(edition.editionPublicationDate) === false ? <CardText>Released: {DisplayDate(editionPublicationDate)}</CardText> : null}
                    </CardBody>
                    <CardFooter>
                        <Link to={edition.title.titleURL}>{edition.title.titleName}</Link>
                        {IsEmpty(edition.editionPublicationDate) === false ? <span> <small>({DisplayYear(edition.title.publicationDate)})</small></span> : null}
                    </CardFooter>
                    </Card> */}

              <Card key={edition.editionID}>
                {IsEmpty(activeString) === false ?
                  <CardHeader className="cardHeader inactiveItem">
                    ({activeString})
                        </CardHeader>
                  : null}
                <Row className="no-gutters">
                  <Col className="col-md-6">
                    {IsEmpty(edition.imageLinkLarge) === false ?
                      <div dangerouslySetInnerHTML={{ "__html": removeOnePixelImage(edition.imageLinkLarge, edition.ASIN) }} />
                      :
                      <a href={edition.textLinkFull} target="_blank" rel="noopener noreferrer">
                        {IsEmpty(edition.imageName) === false ? <CardImg src={setLocalImagePath(edition.imageName)} alt="" className="editionImage" /> : <Image className="noImageIcon" />}
                      </a>
                    }
                  </Col>
                  <Col className="col-md-6">
                    <CardBody>
                      <CardText><Link to={edition.titleURL} onClick={(event) => { event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(edition.titleURL); }}>{edition.titleName}</Link>
                        {IsEmpty(edition.editionPublicationDate) === false ? <span className="ml-1 smallerText">({DisplayYear(edition.editionPublicationDate)})</span> : null}
                      </CardText>
                      {IsEmpty(edition.editionPublicationDate) === false ? <CardText className="smallerText">Released: {DisplayDate(edition.editionPublicationDate)}</CardText> : null}
                      {IsEmpty(admin) === false && admin === true ? <AddEdition titleID={edition.titleID} titlePublicationDate={edition.editionPublicationDate} displayButton={true} /> : null}
                      {IsEmpty(admin) === false && admin === true ? <EditEdition editionID={edition.editionID} titlePublicationDate={edition.editionPublicationDate} displayButton={true} /> : null}
                    </CardBody>
                  </Col>
                </Row>
                {IsEmpty(mediaParam) === false ?
                  <CardFooter className="cardFooter">
                    <CardText><Link to={encodeURL(edition.media)} onClick={(event) => { event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(edition.media)); }}>{edition.media}</Link></CardText>
                  </CardFooter>
                  : null}
              </Card>

            </Col>
          );
        })}
      </Row>
    </Container>
  );

};

export default Editions;
