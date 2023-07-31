function createSpotify() {
    const clientId = '6eb43fe6e09d40c4a4048b6a095e468a';
    const redirectUri = 'http://localhost:3000';
    
    function saveAccessToken(accessToken) {
        sessionStorage.setItem('spotify-access-token', accessToken);
    }

    function getAccessToken() {
        let accessToken = localStorage.getItem('spotify-access-token');
        if (accessToken) {
            return accessToken;
        }

        const matchAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const checkNotExpired = window.location.href.match(/expires_in=([^&]*)/);

        if (matchAccessToken && checkNotExpired) {
            accessToken = matchAccessToken[1];
            const expiresIn = Number(checkNotExpired[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            saveAccessToken(accessToken);
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }

    }

     function fetchFromSpotify(path, method, bodyObj) {
        const accessToken = getAccessToken();
        if (!accessToken) {
            return Promise.reject();
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
                    artist: track.artists[0].name,
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
        return postToSpotify (`users/${userId}/playlists`, { name });
    }

    function addTracks (playlistId, trackUris) {
        return postToSpotify (`playlists/${playlistId}/tracks`, { uris: trackUris })
    }

    function saveNewPlaylist (name, trackUris) {
        return getUser().then(user => createPlaylist(user.id, name)).then(playlist => addTracks(playlist.id, trackUris))
    }

    getAccessToken();

    return {
        search,
        saveNewPlaylist,
    };
}

const Spotify = createSpotify();
export default Spotify;