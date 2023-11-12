const googleFetchUrl = 'http://localhost:3000/api/google-auth-url';
const googleRedirectURI = 'http://localhost:5000/api/google-auth-url';

/**
 * A function to POST data to our serverless function and return Google auth tokens.
 * @param {String} googleClientId
 * @param {String} googleClientSecret
 */
export default async function getGoogleTokens(googleClientId, googleClientSecret) {
  try {
    const request = await fetch(googleFetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleClientId, googleClientSecret, googleRedirectURI }),
    });

    if (request.ok) {
      const response = await request.json();
      return response.body;
    } else {
      throw request;
    }
  } catch (err) {
    // console.log(err);
    return err;
  }
}
