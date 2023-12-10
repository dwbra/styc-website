/**
 * A function to help make offset fetch requests if the Spotify playlist contains over 100 tracks which is the API call limit.
 * @param {String} bearerToken Token required to make API calls.
 * @param {String} endpoint The paginated next endpoint.
 */
const fetchOffsetTracks = async (bearerToken, endpoint) => {
  // Ensure endpoint doesn't equal false.
  if (!!endpoint) {
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
      console.warn(err);
    }
  }
};

export default fetchOffsetTracks;
