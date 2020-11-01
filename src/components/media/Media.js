import React, {useState}  from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Nav, NavItem, Collapse, Card} from "reactstrap";
import {encodeURL} from "../../app/constants";

const Media = (props) => {

    const [isOpen, setIsOpen] = useState(true);

    const mediaListState = useSelector(state => state.media.arrayMedia);
    // console.log("Media.js mediaListState", mediaListState);
    
    // console.log("Media.js props.mediaList", props.mediaList);

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
                <Link to={"/editions/" + encodeURL(media.media)}>{media.media}</Link>
            </NavItem>
            )
        })}
        </Nav>
        </Collapse>
        </React.Fragment>
    );

};

export default Media;
