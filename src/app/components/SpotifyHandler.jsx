import React, { useContext } from 'react';
import fetchPlaylistTracks from '@/app/api/spotifyFetchTracks';
import fetchOffsetTracks from '@/app/api/spotifyFetchOffsetTracks';
import { spotifyDataModifier } from '../helpers/spotifyHelpers';

const SpotifyHandler = async (spotifyPlaylistId, recursiveCallback) => {
  const {
    spotifyAccessToken,
    spotifyStore,
    spotifyNext,
    setSpotifyNext,
    setSpotifyStore,
    modifiedSpotifyData,
    setModifiedSpotifyData,
  } = useContext(StycContext);

  const getSpotifyPlaylistTracks = await fetchPlaylistTracks(spotifyAccessToken, spotifyPlaylistId);

  setSpotifyNext(getSpotifyPlaylistTracks?.tracks?.next);

  setSpotifyStore([...getSpotifyPlaylistTracks?.tracks?.items]);

  setModifiedSpotifyData(spotifyDataModifier(spotifyStore));

  if (!!spotifyNext) {
    await recursiveCallback(fetchOffsetTracks(spotifyAccessToken, spotifyNext));
  }

  if (modifiedSpotifyData.length < 10) {
    return;
  }

  //Modify array length due to youtubes API limits.
  setModifiedSpotifyData((modifiedSpotifyData.length = 10));
};

export default SpotifyHandler;
