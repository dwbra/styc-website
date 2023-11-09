'use client';

// import { useState } from 'react';
import StycContext from './_Context';
import ResponsiveAppBar from '@/app/components/ResponsiveAppBar';

export default function MyProvider({ children }) {
  const ContextValues = {};

  return (
    <StycContext.Provider value={ContextValues}>
      <ResponsiveAppBar />
      {children}
    </StycContext.Provider>
  );
}
