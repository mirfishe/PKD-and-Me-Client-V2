import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import {ListGroup, ListGroupItem} from "reactstrap";
// import AddMedia from "./AddMedia";

const Media = (props) => {

    const mediaListState = useSelector(state => state.media);
    // console.log("Media.js mediaListState", mediaListState);
    
    // console.log("Media.js props.mediaList", props.mediaList);

    return(
        <ListGroup flush>
        {mediaListState.map((media) => {
          return (
            <ListGroupItem key={media.mediaID}>
                {/* <a href="#" onClick={(event) => {event.preventDefault(); console.log(event.target.value); props.getTitles(media.mediaID)}}>{media.media}</a> */}
                <Link to={`/editions/${media.mediaID}`}>{media.mediaID}</Link>
                <Link to={`/editions/${media.media.replaceAll(" ", "-")}`}>{media.media}</Link>
                </ListGroupItem>
            )
        })}

        {/* <ListGroupItem key="addMedia"><AddMedia userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayButton={true} /></ListGroupItem> */}

        </ListGroup>
    );

};

export default Media;
