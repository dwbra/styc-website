import Adsense from '../global/_AdSense';
import { Media } from '../tools/MediaQuery';

export default function IntroContent() {
  return (
    <>
      <h1>Spotify Playlist to Youtube Playlist Converter</h1>
      <Media at="xs">
        <Adsense shape="square" />
      </Media>
      <Media greaterThan="xs">
        <Adsense shape="horizontal" />
      </Media>
      <h3>Convert your spotify playlists into a new Youtube Playlist in seconds!</h3>
      <p>
        Not a software developer? No problem! We have written helpful guides that will help you get everything you need
        from Spotify and Youtube.
      </p>
    </>
  );
}
