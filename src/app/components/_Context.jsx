'use client';
import React, { createContext } from 'react';

const StycContext = createContext({
  spotifyPlaylistId: '',
  setSpotifyPlaylistId: () => {},
  spotifyClientId: '',
  setSpotifyClientId: () => {},
  spotifyClientSecret: '',
  setSpotifyClientSecret: () => {},
  youtubePlaylistId: '',
  setYoutubePlaylistId: () => {},
  googleClientId: '',
  setGoogleClientId: () => {},
  googleClientSecret: '',
  setGoogleClientSecret: () => {},

  googleAccessToken: {},
  setGoogleAccessToken: () => {},
  spotifyAccessToken: '',
  setSpotifyAccessToken: () => {},

  spotifyNext: '',
  setSpotifyNext: () => {},
  spotifyStore: [],
  setSpotifyStore: () => {},
  modifiedSpotifyData: [],
  setModifiedSpotifyData: () => {},
});

export default StycContext;
