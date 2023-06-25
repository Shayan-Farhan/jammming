import React, { useCallback } from "react";
import "./Track.css";

function Track (props) {
    const addTrack = useCallback(
        (event) => {
            props.onAdd(props.track);
        }, [props.onAdd, props.track]
    );

    const removeTrack = useCallback (
        (event) => {
            props.onRemove(props.track);
        }, [props.onRemove, props.track]
    );

    function renderAction () {
        if (props.isRemoval) {
            return (
                <button className = "Track-removal" onClick = {removeTrack}>
                    -
                </button>
            );
        }
        return (
            <button className = "Track-add" onClick = {addTrack}>
                +
            </button>
        );
    }

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