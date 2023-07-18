import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

function SearchResults (props) {
    return (
        <section className = "SearchResults">
            <h2>
                Search Results
            </h2>
            <TrackList
              tracks={props.searchResults}
              onAdd = {props.onAdd}
              />
        </section>
    )
}

export default SearchResults;
