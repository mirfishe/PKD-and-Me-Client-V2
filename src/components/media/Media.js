import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row, Nav, NavItem, NavLink } from "reactstrap";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";
import { encodeURL } from "../../utilities/ApplicationFunctions";
// import EditMedia from "./EditMedia";

const Media = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "Media";

  // const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const electronicOnly = useSelector(state => state.applicationSettings.electronicOnly);
  const userElectronicOnly = useSelector(state => state.applicationSettings.userElectronicOnly);
  const physicalOnly = useSelector(state => state.applicationSettings.physicalOnly);
  const userPhysicalOnly = useSelector(state => state.applicationSettings.userPhysicalOnly);

  const arrayMedia = useSelector(state => state.media.arrayMedia);

  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  const [mediaList, setMediaList] = useState([]);


  useEffect(() => {

    let newMediaList = [];

    if (isEmpty(arrayMedia) === false) {

      if (electronicOnly === true || userElectronicOnly === true) {

        newMediaList = arrayMedia.filter(media => media.electronic === true);

      } else if (physicalOnly === true || userPhysicalOnly === true) {

        newMediaList = arrayMedia.filter(media => media.electronic === false);

      } else {

        newMediaList = [...arrayMedia];

      };

      if (isEmpty(admin) === false && admin === true) {

        newMediaList = [...newMediaList];

      } else {

        newMediaList = newMediaList.filter(media => media.active === true || media.active === 1);

      };

      newMediaList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

      setMediaList(newMediaList);

    };

  }, [arrayMedia]);


  return (
    <Container>
      <Row>
        <Col>

          <h5 className="mt-2 p-2">Media</h5>

          {isNonEmptyArray(mediaList) === true ?

            <Nav vertical>

              {mediaList.map((media) => {

                let activeString = "";

                if (media.active === true || media.active === 1) {

                  activeString = "";

                } else {

                  activeString = "Inactive";

                };

                return (
                  <NavItem key={media.mediaID}>

                    <NavLink tag={Link} to={encodeURL(media.media)} className="mt-1 p-0" onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(media.media)); }}>{media.media}
                      {isEmpty(activeString) === false ? <span className="ms-2 inactive-item">({activeString})</span> : null}
                    </NavLink>

                  </NavItem>
                );
              })}

            </Nav>

            : null}

          { /* {isEmpty(admin) === false && admin === true ? <EditMedia displayButton={true} /> : null} */}

        </Col>
      </Row>
    </Container>
  );
};

export default Media;
