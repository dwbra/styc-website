const SpotifyAuth = async (clientId, clientSecret) => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });
    const body = await response.json();
    return body?.access_token;
  } catch (err) {
    console.log(err);
  }
};

export default SpotifyAuth;
