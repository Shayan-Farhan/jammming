import React, { useState, useCallback } from "react";
import "./SearchBar.css";

function SearchBar (props) {
    const [song, setSong] = useState('');

    function handleNewSearh (event) {
        setSong(event.target.value);
    },

    const search = useCallback (
        (event) => {
            props.onSearch(song);
        }, [props.onSearch, song]
    );

    return (
        <section className = 'Search'>
            <input className="SearchBar" placeholder="Enter a Song" onChange = {handleNewSearch} />
            <button className = "SearchButton" onClick = {search}>
                Search
            </button>
        </section>
    );
}

export default SearchBar;
