'use client';

import React, { useEffect } from 'react';

export default function AdsenseHorizontal() {
  const loadAds = () => {};

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-8692686668487136"
      data-ad-slot="6685209722"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
