/**
 * A function to fetch all of the playlist tracks.
 * @param {String} bearerToken Token required to make API calls.
 * @param {String} playlistId Playlist that you wish to retrieve.
 * @returns {Promise}
 */
const fetchPlaylistTracks = async (bearerToken, playlistId) => {
  const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/`;
  try {
    const request = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (request.ok) {
      const response = await request.json();
      return response;
    } else {
      return {
        status: request.status,
        statusText: request.statusText,
        message: 'Fetching all tracks in Spotify has failed. Please try again.',
        error: true,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

export default fetchPlaylistTracks;
