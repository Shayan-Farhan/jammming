import React, { useCallback } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
/**
*Send a tracklist to spotify as a playlist and change the playlists name.
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
