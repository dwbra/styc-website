/**
 * A function to fetch a bearer token from Spotify to make subsequent requests.
 * @param {String} clientId Spotify clientId needed to get a bearer token.
 * @param {String} clientSecret Spotify clientSecret needed to get a bearer token.
 */
const spotifyAuth = async (clientId, clientSecret) => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    if (response.ok) {
      const body = await response.json();
      return body?.access_token;
    } else {
      throw response;
    }
  } catch (err) {
    console.log(err);
  }
};

export default spotifyAuth;
