'use client';
import { useState, useEffect } from 'react';

function useMediaQuery() {
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    // use setTimeout for debouncing.
    let timeout = null;
    let delay = 250;

    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    clearTimeout(timeout);

    window.addEventListener('resize', () => {
      timeout = setTimeout(handleResize, delay);
    });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);

  if (!window) {
    console.log('No window detected. Is this being run on the client?');
    return;
  }

  return windowSize;
}

export default useMediaQuery;
