// let backoff_time = 1000; //seconds
// let counter = 0;

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

/**
 * A recursive function that accepts a single track and makes repeated calls to the endpoint until the response is successful.
 * @param {String} accessToken The Google Auth Access Token required to make POST requests.
 * @param {Object} resourceId The Youtube track to POST into the Youtube playlist.
 * @param {String} playlistId The playlistId of what playlist to POST the tracks to.
 */
const postYoutubeTrack = async (accessToken, singleResourceId, playlistId) => {
  let max_retries = 5;
  let retry_count = 0;
  let backoff_time = 1000; // In seconds

  while (retry_count < max_retries) {
    try {
      const request = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          snippet: {
            playlistId: playlistId,
            resourceId: {
              kind: singleResourceId.kind,
              videoId: singleResourceId.videoId,
            },
          },
        }),
      });

      // If the request is ok we return the valid json and update retry_count to exit loop.
      if (request.ok) {
        const response = await request.json();
        console.log({ successfulResponse: response });
        retry_count = 5;
        return response;
      }

      const failedResponse = await request.json();
      throw failedResponse;
    } catch (err) {
      console.log(err?.error);
      retry_count += 1;
      console.log(`Attempt ${retry_count} failed. Retrying in ${backoff_time} seconds...`);
      await new Promise(r => setTimeout(r, backoff_time));
      backoff_time *= 2; // Exponential backoff
    }
  }
};

export default postYoutubeTrack;
