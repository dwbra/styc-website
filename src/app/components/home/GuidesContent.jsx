import { Stack, Link } from '@mui/material';
import styles from '../../page.module.scss';

export default function GuidesContent() {
  return (
    <div className={styles.homeGuides}>
      <h3>API Guides</h3>
      <p>
        These are guides to help you get the required API keys. You need these as each keyset has usage limitations.
      </p>
      <Stack>
        <div>
          <Link href="/guides/spotifyGuide">Get Spotify API Credentials</Link>
        </div>
        <div>
          <Link href="/guides/youtubeGuide">Get Youtube API Credentials</Link>
        </div>
      </Stack>
    </div>
  );
}
