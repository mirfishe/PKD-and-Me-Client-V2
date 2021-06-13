import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Nav, NavItem, Collapse, Card } from "reactstrap";
import { IsEmpty, DisplayValue, GetDateTime, encodeURL } from "../../app/sharedFunctions";
import { setPageURL } from "../../app/urlsSlice";
import AddMedia from "./AddMedia";

const Media = (props) => {

  const componentName = "Media.js";

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  const electronicOnly = useSelector(state => state.app.electronicOnly);
  const userElectronicOnly = useSelector(state => state.app.userElectronicOnly);
  const physicalOnly = useSelector(state => state.app.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.app.userPhysicalOnly);

  const mediaListState = useSelector(state => state.media.arrayMedia);
  // console.log(componentName, GetDateTime(), "mediaListState", mediaListState);

  const [isOpen, setIsOpen] = useState(true);

  let mediaList = [];

  if (electronicOnly === true || userElectronicOnly === true) {
    mediaList = mediaListState.filter(media => media.electronic === true);
  } else if (physicalOnly === true || userPhysicalOnly === true) {
    mediaList = mediaListState.filter(media => media.electronic === false);
  } else {
    mediaList = [...mediaListState];
    // mediaList = mediaListState.filter(media => media.active === true || media.active === 1);
  };

  if (IsEmpty(admin) === false && admin === true) {
    mediaList = [...mediaList];
  } else {
    mediaList = mediaList.filter(media => media.active === true || media.active === 1);
  };
  // console.log(componentName, GetDateTime(), "mediaList", mediaList);

  mediaList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);


  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);
    dispatch(setPageURL(linkName.replaceAll("/", "")));
    history.push("/" + linkName);
  };


  const toggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <React.Fragment>
      <Card onClick={toggle} color="light" className="mt-2 p-2"><h5>Media</h5></Card>
      <Collapse isOpen={isOpen}>
        <Nav vertical>
          {mediaList.map((media) => {

            let activeString = "";
            if (media.active === true || media.active === 1) {
              // activeString = "Active";
              activeString = "";
            } else {
              activeString = "Inactive";
            };

            return (
              <NavItem key={media.mediaID} className="mt-2 pl-3">
                {/* <a href="#" onClick={(event) => {event.preventDefault(); console.log(event.target.value); props.getTitles(media.mediaID)}}>{media.media}</a> */}
                {/* <Link to={`/editions/${media.mediaID}`}>{media.mediaID}</Link>
                <Link to={`/editions/${media.replaceAll("-", "|").replaceAll(" ", "-")}`}>{media.media}</Link>
                <Link to={"/editions/" + media.mediaID}>{media.mediaID}</Link> */}
                {/* <Link to={"/editions/" + encodeURL(media.media)}>{media.media}</Link> */}
                {/* <Link to={encodeURL(media.media)}>{media.media}</Link> */}
                <Link to={encodeURL(media.media)} onClick={(event) => { event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(media.media)); }}>{media.media}
                  {IsEmpty(activeString) === false ? <span className="ml-2 inactiveItem">({activeString})</span> : null}
                </Link>
              </NavItem>
            );
          })}
        </Nav>
      </Collapse>
      {IsEmpty(admin) === false && admin === true ? <AddMedia displayButton={true} /> : null}
    </React.Fragment>
  );

};

export default Media;
