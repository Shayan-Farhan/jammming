import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

function SearchResults (props) {
    return (
        <section className = "SearchResults">
            <h2>
                Search SearchResults
            </h2>
            <TrackList
              tracks={props.SearchResults}
              onAdd = {props.onAdd}
              />
        </section>
    )
}

export default SearchResults;