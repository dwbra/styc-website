'use client';
import { useState, useEffect } from 'react';
import { Stack, Link } from '@mui/material';
import styles from '../page.module.scss';
export default function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div className={styles.footer}>
        <Stack spacing={1}>
          <div>
            <p>Copyright© Daniel Workman</p>
          </div>
          <div className={styles.footerSocials}>
            <Link href="">linkedin</Link>
            <Link href="">Github</Link>
          </div>
        </Stack>
      </div>
    )
  );
}
