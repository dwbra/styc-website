'use client';
import React, { useEffect } from 'react';

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    <script
      async
      data-name="BMC-Widget"
      data-cfasync="false"
      src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
      data-id="dworkman"
      data-description="Support me on Buy me a coffee!"
      data-message="Feel like being a legend? Shout me a beer and I'll continue to maintain this website so that you can convert your favourite Spotify playlists into Youtube ones and keep the party going! "
      data-color="#5F7FFF"
      data-position="Right"
      data-x_margin="18"
      data-y_margin="18"
    ></script>;
  }, []);
}
