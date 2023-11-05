import React from 'react';
import getYoutubeVideoIds from '@/app/api/getYoutubeVideoIds';
import postYoutubeTrack from '@/app/api/postYoutubeTrack';
import { youtubeSearchModifier } from '@/app/helpers/youtubeHelpers';

const YoutubeHandler = async youtubePlaylist => {
  const { googleAccessToken, modifiedSpotifyData } = useContext(StycContext);

  const youtubeVideoIds = await getYoutubeVideoIds(googleAccessToken.access_token, modifiedSpotifyData);

  if (youtubeVideoIds[0].error) {
    console.log(youtubeVideoIds[0].error);
    return;
  }

  const sanitizedIds = youtubeSearchModifier(youtubeVideoIds);

  const results = sanitizedIds.map(async track => {
    return await postYoutubeTrack(googleAccessToken.access_token, track, youtubePlaylist);
  });

  return results;
};

export default YoutubeHandler;
