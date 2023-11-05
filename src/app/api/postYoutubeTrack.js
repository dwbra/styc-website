let backoff_time = 1000; //seconds
let counter = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * A recursive function that accepts a single track and makes repeated calls to the endpoint until the response is successful.
 * @param {String} accessToken The Google Auth Access Token required to make POST requests.
 * @param {Object} resourceId The Youtube track to POST into the Youtube playlist.
 * @param {String} playlistId The playlistId of what playlist to POST the tracks to.
 */
const postYoutubeTrack = async (accessToken, singleResourceId, playlistId) => {
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

  if (request.ok) {
    const response = await request.json();
    // backoff_time = 1000;
    return response;
  }

  counter += 1;
  console.log(`Adding track failed. Attempt ${counter}. Trying again!`);
  await sleep(3000);
  // backoff_time *= 2; // Exponential backoff
  postYoutubeTrack(accessToken, singleResourceId, playlistId);
};

export default postYoutubeTrack;
