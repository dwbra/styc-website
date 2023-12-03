'use client';

import React, { useEffect } from 'react';

export default function Adsense({ styles, slot, format }) {
  const loadAds = () => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('adsense error', error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-8692686668487136"
      data-ad-slot="6685209722"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
