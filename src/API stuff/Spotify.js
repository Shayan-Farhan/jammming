/**
 * Make the function name that searches spotify "search"
 * make sure that the track has a .url property
 * Make sure the function that save a playlist to spotify is called
 * "savePlaylist" and has two parameters: playlistName and trackUrls. 
 * Remember to do App.css --- this wasn't completed with App.js!
 */

const clientId = '6eb43fe6e09d40c4a4048b6a095e468a';
const redirectUri = 'http://localhost:3000' //I don't have a redirect uri yet
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        /**
         * I got the next two const terms with Codecademy forums help
         */
        const matchAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const checkNotExpired = window.location.href.match(/expires_in=([^&]*)/);

        if (matchAccessToken && checkNotExpired) {
            accessToken = matchAccessToken[1];
            const expiresIn = Number(checkNotExpired[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            /**
             * Allows new Access Token when old one expires
             */
            window.history.pushState('AccessToken', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(search) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${search}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist[0].name,
                album: track.album.name,
                uri: track.uri,
            }));
        });
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${this.getAccessToken}` };
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }).then(response => response.json()).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name }),
            }).then(response => response.json()).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris }),
                });
            });
        });
    }
};

export default Spotify;

function Spotify() {
    const clientId = '6eb43fe6e09d40c4a4048b6a095e468a';
    const redirectUri = 'http://localhost:3000';

    function getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        /**
         * I got the next two const terms with Codecademy forums help
         */
        const matchAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const checkNotExpired = window.location.href.match(/expires_in=([^&]*)/);

        if (matchAccessToken && checkNotExpired) {
            accessToken = matchAccessToken[1];
            const expiresIn = Number(checkNotExpired[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            /**
             * Allows new Access Token when old one expires
             */
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }

    }

     let accessToken = getAccessToken();

    async function fetchFromSpotify(path, method, bodyObj) {
        if (!accessToken) {
            return;
        } else {
            const response = await fetch(`https://api.spotify.com/v1/${path}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                method: method,
                body: bodyObj ? JSON.stringify(bodyObj) : undefined,
            });
            const jsonResponse = response.json();
            return jsonResponse();
        }
    }

    function getFromSpotify(path) {
        return fetchFromSpotify(path, "GET")
    }

    function postToSpotify(path) {
        return fetchFromSpotify(path, "POST", bodyObj);

    }

    function search (searchTerm) {
        return getFromSpotify(`search?type=track&q=${searchTerm}`).then(response => {
            if (!response.tracks) {
                return [];
            } else {
                return response.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artist[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }))
            }
        })
    }
}