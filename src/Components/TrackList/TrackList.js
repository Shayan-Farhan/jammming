import React from "react"
import "./TrackList.css";
import Track from "../Track/Track";

function TrackList (props) {
    return (
        <section className = "TrackList">
            {props.tracks.map(
                (track) => {
                    return (
                        <Track
                          track={track}
                          key={track.id}
                          onAdd={props.onAdd}
                          isInPlaylist = {props.isInPlaylist}
                          onRemove = {props.onRemove}
                          />
                    );
                }
            )};
        </section>
    );
;}

export default TrackList;