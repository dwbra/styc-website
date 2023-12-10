'use client';

import React, { useEffect } from 'react';

export default function Adsense({ shape }) {
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
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-8692686668487136"
      data-ad-slot={
        shape === 'square'
          ? '3129108092'
          : shape === 'horizontal'
          ? '6685209722'
          : shape === 'vertical'
          ? '5695561684'
          : ''
      }
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
