import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Nav, NavItem, NavLink, Collapse, Card } from "reactstrap";
import { IsEmpty, DisplayValue, GetDateTime } from "../../utilities/SharedFunctions";
import { encodeURL } from "../../utilities/ApplicationFunctions";
import { setPageURL } from "../../app/urlsSlice";
import EditMedia from "./EditMedia";

const Media = (props) => {

  const componentName = "Media.js";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionToken = useSelector(state => state.user.sessionToken);
  // console.log(componentName, GetDateTime(), "sessionToken", sessionToken);
  const admin = useSelector(state => state.user.admin);
  // console.log(componentName, GetDateTime(), "admin", admin);

  const electronicOnly = useSelector(state => state.applicationSettings.electronicOnly);
  const userElectronicOnly = useSelector(state => state.applicationSettings.userElectronicOnly);
  const physicalOnly = useSelector(state => state.applicationSettings.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.applicationSettings.userPhysicalOnly);

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
    // mediaList = mediaListState.filter(media => media.mediaActive === true || media.mediaActive === 1);

  };

  if (IsEmpty(admin) === false && admin === true) {

    mediaList = [...mediaList];

  } else {

    mediaList = mediaList.filter(media => media.active === true || media.active === 1);
    // mediaList = mediaList.filter(media => media.mediaActive === true || media.mediaActive === 1);

  };

  // console.log(componentName, GetDateTime(), "mediaList", mediaList);

  mediaList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);


  const redirectPage = (linkName) => {
    // console.log(componentName, GetDateTime(), "redirectPage", linkName);

    // * Scroll to top of the page after clicking the link. -- 08/05/2021 MF
    window.scrollTo(0, 0);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

  };


  return (
    <React.Fragment>

      <Card onClick={(event) => { setIsOpen(!isOpen); }} color="light" className="mt-2 p-2"><h5>Media</h5></Card>

      <Collapse isOpen={isOpen}>

        <Nav vertical>

          {mediaList.map((media) => {

            let activeString = "";

            if (media.active === true || media.active === 1) {
              // if (media.mediaActive === true || media.mediaActive === 1) {

              // activeString = "Active";
              activeString = "";

            } else {

              activeString = "Inactive";

            };

            return (
              <NavItem key={media.mediaID}>

                {/* <a href="#" onClick={(event) => {event.preventDefault(); console.log(componentName, GetDateTime(), "event.target.value", event.target.value); props.getTitles(media.mediaID)}}>{media.media}</a> */}

                {/* <<NavLink tag={Link} to={`/editions/${media.mediaID}`}>{media.mediaID}</NavLink>
                <<NavLink tag={Link} to={`/editions/${media.replaceAll("-", "|").replaceAll(" ", "-")}`}>{media.media}</NavLink>
                <<NavLink tag={Link} to={"/editions/" + media.mediaID}>{media.mediaID}</NavLink> */}

                {/* <<NavLink tag={Link} to={"/editions/" + encodeURL(media.media)}>{media.media}</NavLink> */}

                {/* <<NavLink tag={Link} to={encodeURL(media.media)}>{media.media}</NavLink> */}

                <NavLink tag={Link} to={encodeURL(media.media)} onClick={(event) => { event.preventDefault(); /*console.log(componentName, GetDateTime(), "event.target.value", event.target.value);*/ redirectPage(encodeURL(media.media)); }}>{media.media}
                  {IsEmpty(activeString) === false ? <span className="ms-2 inactive-item">({activeString})</span> : null}
                </NavLink>

              </NavItem>
            );
          })}

        </Nav>

      </Collapse>

      {IsEmpty(admin) === false && admin === true ? <EditMedia displayButton={true} /> : null}

    </React.Fragment>
  );
};

export default Media;
