import React, { useContext } from 'react';

/**
 * This function would handle large spotify playlists if Youtube allowed larger daily Quota limits.
 * @param {Promise} callback A callback function that returns a promise.
 * @returns {Void}
 */
const SpotifyRecursive = async callback => {
  const { spotifyNext, setSpotifyNext, spotifyStore, setSpotifyStore } = useContext(StycContext);

  const getPlaylist = await callback;

  if (!!spotifyNext) {
    setSpotifyStore([...spotifyStore, ...getPlaylist?.items]);
    setSpotifyNext(getPlaylist?.tracks?.next);
    SpotifyRecursive();
  }

  return;
};

export default SpotifyRecursive;
