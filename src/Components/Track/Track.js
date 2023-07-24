import React, { useCallback } from "react";
import "./Track.css";

function Track (props) {
    function renderAction () {
        if (props.isInPlaylist) {
            return (
                <button className = "Track-removal" onClick = {removeTrack}>
                    -
                </button>
            );
        } else {
            return (
                <button className = "Track-add" onClick = {addTrack}>
                    +
                </button>
            );
        }
    }

    const addTrack = useCallback(
        () => {
            props.onAdd(props.track);
        }, [props.onAdd, props.track]
    );

    const removeTrack = useCallback (
        () => {
            props.onRemove(props.track);
        }, [props.onRemove, props.track]
    );

    return (
        <section className = "Track">
            <article className = "Track-info">
                <h3>
                    {props.track.name}
                </h3>
                <p>
                    {props.track.artist} | {props.track.album}
                </p>
            </article>
            {renderAction()}
        </section>
    );
}

export default Track;
