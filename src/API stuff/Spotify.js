function Spotify() {
    const clientId = '6eb43fe6e09d40c4a4048b6a095e468a';
    const redirectUri = 'http://localhost:3000';
    let accessToken;

    function getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const matchAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const checkNotExpired = window.location.href.match(/expires_in=([^&]*)/);

        if (matchAccessToken && checkNotExpired) {
            accessToken = matchAccessToken[1];
            const expiresIn = Number(checkNotExpired[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }

    }

     function fetchFromSpotify(path, method, bodyObj) {
        if (!accessToken) {
            return;
        } else {
            return fetch(`https://api.spotify.com/v1/${path}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                method: method,
                body: bodyObj ? JSON.stringify(bodyObj) : undefined,
            }).then(response => {
                return response.json()
            });
        }
    }

    function getFromSpotify(path) {
        return fetchFromSpotify(path, "GET")
    }

    function postToSpotify(path, bodyObj) {
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

    function getUser () {
        return getFromSpotify("me");
    }

    function createPlaylist (userId, name) {
        return postToSpotify (`users/${userId}/playlists`, name);
    }

    function addTracks (playlistId, trackUris) {
        return postToSpotify (`/playlists/${playlistId}/tracks`, { uris: trackUris })
    }

    function saveNewPlaylist (name, trackUris) {
        return getUser().then(user => createPlaylist(user.id, name)).then(playlist => addTracks(playlist.id, trackUris))
    }

    return {
        search,
        saveNewPlaylist,
    };
}

export default Spotify;