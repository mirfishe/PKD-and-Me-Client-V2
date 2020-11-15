import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Nav, NavItem, Collapse, Card} from "reactstrap";
import {encodeURL} from "../../app/sharedFunctions";
import {setPageURL} from "../../app/urlsSlice";
import AddMedia from "./AddMedia";

const Media = (props) => {

    const componentName = "Media.js";

    const dispatch = useDispatch();
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(true);

    const electronicOnly = useSelector(state => state.app.electronicOnly);
    const physicalOnly = useSelector(state => state.app.physicalOnly);

    const mediaListState = useSelector(state => state.media.arrayMedia);
    // console.log(componentName, "mediaListState", mediaListState);

    let mediaList = [];
    if (electronicOnly) {
        mediaList = mediaListState.filter(media => media.active === true && media.electronic === true);
    } else if (physicalOnly) {
        mediaList = mediaListState.filter(media => media.active === true && media.electronic === false);
    } else {
        // mediaList = [...mediaListState];
        mediaList = mediaListState.filter(media => media.active === true);
    };

    mediaList.sort((a, b) => (a.sortID > b.sortID) ? 1 : -1);

    const redirectPage = (linkName) => {
        // console.log(componentName, "redirectPage", linkName);
        dispatch(setPageURL(linkName.replaceAll("/", "")));
        history.push("/" + linkName);
    };

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return(
        <React.Fragment>
        <Card onClick={toggle} color="light" className="mt-2 p-2"><h5>Media</h5></Card>
        <Collapse isOpen={isOpen}>
        <Nav vertical>
        {mediaList.map((media) => {
          return (
            <NavItem key={media.mediaID} className="mt-2 pl-3">
                {/* <a href="#" onClick={(event) => {event.preventDefault(); console.log(event.target.value); props.getTitles(media.mediaID)}}>{media.media}</a> */}
                {/* <Link to={`/editions/${media.mediaID}`}>{media.mediaID}</Link>
                <Link to={`/editions/${media.media.replaceAll("-", "|").replaceAll(" ", "-")}`}>{media.media}</Link>
                <Link to={"/editions/" + media.mediaID}>{media.mediaID}</Link> */}
                {/* <Link to={"/editions/" + encodeURL(media.media)}>{media.media}</Link> */}
                {/* <Link to={encodeURL(media.media)}>{media.media}</Link> */}
                <Link to={encodeURL(media.media)} onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ redirectPage(encodeURL(media.media));}}>{media.media}</Link>
            </NavItem>
            )
        })}
        </Nav>
        </Collapse>
        <div className="mt-2 pl-3"><AddMedia displayButton={true} /></div>
        </React.Fragment>
    );

};

export default Media;
