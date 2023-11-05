'use client';

import { useState } from 'react';
import StycContext from './_Context';
import ResponsiveAppBar from '@/app/components/ResponsiveAppBar';

export default function MyProvider({ children }) {
  const [spotifyPlaylistId, setSpotifyPlaylistId] = useState('');
  const [spotifyClientId, setSpotifyClientId] = useState('');
  const [spotifyClientSecret, setSpotifyClientSecret] = useState('');
  const [youtubePlaylistId, setYoutubePlaylistId] = useState('');
  const [googleClientId, setGoogleClientId] = useState('');
  const [googleClientSecret, setGoogleClientSecret] = useState('');

  const [googleAccessToken, setGoogleAccessToken] = useState({});
  const [spotifyAccessToken, setSpotifyAccessToken] = useState('');

  const [spotifyNext, setSpotifyNext] = useState(null);
  const [spotifyStore, setSpotifyStore] = useState([]);
  const [modifiedSpotifyData, setModifiedSpotifyData] = useState([]);

  const ContextValues = {
    spotifyPlaylistId,
    setSpotifyPlaylistId,
    spotifyClientId,
    setSpotifyClientId,
    spotifyClientSecret,
    setSpotifyClientSecret,
    youtubePlaylistId,
    setYoutubePlaylistId,
    googleClientId,
    setGoogleClientId,
    googleClientSecret,
    setGoogleClientSecret,

    googleAccessToken,
    setGoogleAccessToken,
    spotifyAccessToken,
    setSpotifyAccessToken,

    spotifyNext,
    setSpotifyNext,
    spotifyStore,
    setSpotifyStore,
    modifiedSpotifyData,
    setModifiedSpotifyData,
  };

  return (
    <StycContext.Provider value={ContextValues}>
      <ResponsiveAppBar />
      {children}
    </StycContext.Provider>
  );
}
