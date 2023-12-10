import Adsense from '../components/global/_AdSense';
import { Stack, Link } from '@mui/material';
import styles from '../page.module.scss';

export default function GuidesPage() {
  return (
    <div className={styles.guidesComponent}>
      <h1>Guides</h1>
      <h3>Check out some helpful guides below to easily complete the conversion form.</h3>
      <Stack>
        <div>
          <Link href="/guides/spotify">Get Spotify API Credentials</Link>
        </div>
        <div>
          <Link href="/guides/youtube">Get Youtube API Credentials</Link>
        </div>
      </Stack>
    </div>
  );
}
