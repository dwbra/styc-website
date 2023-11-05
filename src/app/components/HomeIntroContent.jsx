import Adsense from './_AdSense';
export default function IntroContent() {
  return (
    <>
      <h1>Spotify Playlist to Youtube Playlist Converter</h1>
      <Adsense styles={{ display: 'block', width: '1200px', height: '280px' }} slot="xyz" />
      <h3>Convert your spotify playlists into a new Youtube Playlist in seconds!</h3>
      <p>
        Not a software developer? No problem! We have written helpful guides that will help you get everything you need
        from Spotify and Youtube.
      </p>
    </>
  );
}
