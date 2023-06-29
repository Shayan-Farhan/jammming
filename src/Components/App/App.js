
import React, { useState, useCallback } from "react";
import "./App.css";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../API stuff/Spotify";

/**
 * Note: running npm start will throw an error until Spotify.js is built.
 * @returns the app that is rendered in index.js
 */

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState('New Playlist');
    const [playlistTracks, setPlaylistTracks] = useState([]);

    function search(search) {
        Spotify.search(search).then(setSearchResults);
    }

    const addTrack = useCallback(
        (track) => {
            if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
                return true;
            }
            setPlaylistTracks((prevTracks) => [...prevTracks, track]);
        }, [playlistTracks]
    );

    const removeTrack = useCallback((track) => {
        setPlaylistTracks((prevTracks) => prevTracks.filter((currentTrack) => currentTrack.id !== track.id));
    });

    const changePlaylistName = useCallback((name) => {
        setPlaylistName(name);
    }, [playlistName]);

    const savePlaylist = useCallback(() => {
        const trackUris = playlistTracks.map((track) => track.uri);
        Spotify.savePlaylist(playlistName, trackUris).then(() => {
            setPlaylistName("New Playlist");
            setPlaylistTracks([]);
            /**
             * The above resets the playlist after every save
             * Come back to this, I'm not sure if this is right.
             */
        });
    }, [playlistName, playlistTracks]);

    return (
        <section>
            <h1>
                Ja<span className="emphasis">mmm</span>ing
            </h1>
            <section className="app">
                <SearchBar
                    onSearch={search}
                />
                <section className="playlist">
                    <SearchResults 
                        searchResults={searchResults}
                        onAdd={addTrack}
                    />
                    <Playlist 
                        onNameChange={changePlaylistName}
                        playlistTracks={playlistTracks}
                        playlistName={playlistName}
                        onRemove={removeTrack}
                        onAdd={addTrack}
                        onSave={savePlaylist}
                    />
                </section>
            </section>
        </section>
    );
}

export default App;