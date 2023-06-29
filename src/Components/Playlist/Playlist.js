//Handles saving a tracklist to spotify as a playlist and changing the 
//playlists' name

import React, { useCallback } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

/**
 * Saves a tracklist to spotify as a playlist and handles playlist
 *  name changes.
 */
function Playlist (props) {
    const changeName = useCallback (
        (event) => {
            props.onNameChange(event.target.value);
        }, [props.onNameChange]
    );

    return (
        <section className = "Playlist" >
            <input 
              onChange = {changeName}
              defaultValue = {"New Playlist"}
            />
            <TrackList 
              tracks = {props.playlistTracks}
              isRemoval = {true}
              onRemove={props.onRemove}
            />
            <button className="save" onClick = {props.onSave}>
                Save to Spotify
            </button>
        </section>
    );
}

export default Playlist;