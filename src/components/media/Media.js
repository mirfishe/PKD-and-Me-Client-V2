import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Nav, NavItem, NavLink, Collapse, Card } from "reactstrap";
import { noFunctionAvailable, isEmpty, getDateTime, displayValue, isNonEmptyArray } from "shared-functions";
import { encodeURL } from "../../utilities/ApplicationFunctions";
import { setPageURL } from "../../app/urlsSlice";
// import EditMedia from "./EditMedia";

const Media = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: -- 10/21/2022 MF
  // * Functions: redirectPage, getTitles -- 10/21/2022 MF

  const componentName = "Media";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const electronicOnly = useSelector(state => state.applicationSettings.electronicOnly);
  const userElectronicOnly = useSelector(state => state.applicationSettings.userElectronicOnly);
  const physicalOnly = useSelector(state => state.applicationSettings.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.applicationSettings.userPhysicalOnly);

  const mediaListState = useSelector(state => state.media.arrayMedia);

  // let getTitles = isEmpty(props) === false && isEmpty(props.getTitles) === false ? props.getTitles : noFunctionAvailable;
  // let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  const [isOpen, setIsOpen] = useState(true);

  const [mediaList, setMediaList] = useState([]);


  useEffect(() => {

    let newMediaList = [];

    if (isEmpty(mediaListState) === false) {

      if (electronicOnly === true || userElectronicOnly === true) {

        newMediaList = mediaListState.filter(media => media.electronic === true);

      } else if (physicalOnly === true || userPhysicalOnly === true) {

        newMediaList = mediaListState.filter(media => media.electronic === false);

      } else {

        newMediaList = [...mediaListState];
        // newMediaList = mediaListState.filter(media => media.active === true || media.active === 1);
        // newMediaList = mediaListState.filter(media => media.mediaActive === true || media.mediaActive === 1);

      };

      if (isEmpty(admin) === false && admin === true) {

        newMediaList = [...newMediaList];

      } else {

        newMediaList = newMediaList.filter(media => media.active === true || media.active === 1);
        // newMediaList = newMediaList.filter(media => media.mediaActive === true || media.mediaActive === 1);

      };

      newMediaList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

      setMediaList(newMediaList);

    };

  }, [mediaListState]);


  const redirectPage = (linkName) => {

    // * Scroll to top of the page after clicking the link. -- 08/05/2021 MF
    window.scrollTo(0, 0);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

  };


  return (
    <React.Fragment>

      <Card onClick={(event) => { setIsOpen(!isOpen); }} color="light" className="mt-2 p-2"><h5>Media</h5></Card>

      <Collapse isOpen={isOpen}>

        {isNonEmptyArray(mediaList) === true ?

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

                  {/* <a href="#" onClick={(event) => {event.preventDefault(); getTitles(media.mediaID)}}>{media.media}</a> */}

                  {/* <<NavLink tag={Link} to={`/editions/${media.mediaID}`}>{media.mediaID}</NavLink>
                <<NavLink tag={Link} to={`/editions/${media.replaceAll("-", "|").replaceAll(" ", "-")}`}>{media.media}</NavLink>
                <<NavLink tag={Link} to={"/editions/" + media.mediaID}>{media.mediaID}</NavLink> */}

                  {/* <<NavLink tag={Link} to={"/editions/" + encodeURL(media.media)}>{media.media}</NavLink> */}

                  {/* <<NavLink tag={Link} to={encodeURL(media.media)}>{media.media}</NavLink> */}

                  <NavLink tag={Link} to={encodeURL(media.media)} onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(media.media)); }}>{media.media}
                    {isEmpty(activeString) === false ? <span className="ms-2 inactive-item">({activeString})</span> : null}
                  </NavLink>

                </NavItem>
              );
            })}

          </Nav>

          : null}

      </Collapse>

      {/* {isEmpty(admin) === false && admin === true ? <EditMedia displayButton={true} /> : null} */}

    </React.Fragment>
  );
};

export default Media;
