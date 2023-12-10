import React from 'react';
import Adsense from '@/app/components/global/_AdSense';
import { Media } from '../../components/tools/MediaQuery';
import styles from '../../page.module.scss';
import { Link } from '@mui/material';

const SpotifyGuidePage = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  return (
    <div className={styles.spotifyGuidePage}>
      <h1>Spotify API Guide</h1>
      <h3>Follow the step by step instructions below to get your spotify API keys.</h3>
      <ol>
        <li>
          Visit <Link href="https://developer.spotify.com/">Spotify Developers.</Link>
        </li>
        <li>Log in using any of the available methods.</li>
        <li>In the top right hand corner, click on your name and select dashboard.</li>
        <li>Click on the create app button.</li>
        <li>
          Fill in the various required fields with whatever terminology you would like. The redirect URI does not matter
          in this instance. You can use something like http://localhost:9000/spotify/callback. Also select the Web API
          as the API/SDK we plan to use.
        </li>
        <li>
          Once you save that, it should redirect you to the basic information page under the settings for your newly
          created app. Here you will see your clientID and a link below to view your client secret. You have now got the
          required API keys from Spotify!
        </li>
      </ol>
      <Media at="xs">
        <Adsense shape="square" />
      </Media>
      <Media greaterThan="xs">
        <Adsense shape="horizontal" />
      </Media>
    </div>
  );
};

export default SpotifyGuidePage;
