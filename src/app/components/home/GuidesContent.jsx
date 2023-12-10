import { Stack, Link } from '@mui/material';
import InfoToolTip from '../tools/InfoToolTip';
import styles from '../../page.module.scss';

export default function GuidesContent() {
  return (
    <div className={styles.homeGuides}>
      <h3>
        API Guides
        <InfoToolTip text="You need to get your own API keys as Google places daily limits on usage. Therefore if I were to use my api keys only one user per day would be able to use this application." />
      </h3>
      <p>
        These are guides to help you get the required API keys. You need these as each keyset has usage limitations.
      </p>
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
