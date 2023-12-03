/**
 * A function that uses the modified spotify data to retrieve Youtube video Ids. These Ids are needed to POST the tracks into the Youtube playlist.
 * @param {String} accessToken The Google Auth Access Token required to make requests.
 * @param {Array} spotifyPlaylistData The formatted Spotify data to make the Youtube Search queries.
 * @returns {Promise}
 */
const getYoutubeVideoId = async (accessToken, spotifyTrack) => {
  try {
    const endpoint = `https://www.googleapis.com/youtube/v3/search/?order=relevance&type=video&maxResults=5&q=${encodeURIComponent(
      spotifyTrack
    )}&part=snippet`;

    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const response = await res.json();
      return response;
    } else {
      return {
        status: res.status,
        statusText: res.statusText,
        message: 'Id failed to be retrieved.',
        error: true,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

export default getYoutubeVideoId;
