import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Nav, NavItem, Collapse, Card} from "reactstrap";
import {encodeURL} from "../../app/sharedFunctions";
import {setPageURL} from "../../app/urlsSlice";

const Media = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(true);

    const mediaListState = useSelector(state => state.media.arrayMedia);
    // console.log("Media.js mediaListState", mediaListState);
    
    // console.log("Media.js props.mediaList", props.mediaList);

    const redirectPage = (linkName) => {
        // console.log("Media.js redirectPage", linkName);
        dispatch(setPageURL(linkName));
        history.push("/" + linkName);
    };

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return(
        <React.Fragment>
        <Card onClick={toggle} color="light" className="mt-2 p-2">Media</Card>
        <Collapse isOpen={isOpen}>
        <Nav vertical>
        {mediaListState.map((media) => {
          return (
            <NavItem key={media.mediaID}>
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
        </React.Fragment>
    );

};

export default Media;
