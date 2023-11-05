/**
 * A function to fetch all of the playlist tracks.
 * @param {String} bearerToken Token required to make API calls.
 * @param {String} playlistId Playlist that you wish to retrieve.
 * @returns {Promise}
 */
const fetchPlaylistTracks = async (bearerToken, playlistId) => {
  const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/`;
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const body = await response.json();
    return body;
  } catch (err) {
    console.log(err);
  }
};

export default fetchPlaylistTracks;
