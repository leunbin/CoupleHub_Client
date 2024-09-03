import React from 'react';
import { useMediaQuery } from 'react-responsive';

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  return isMobile ? children : null;
};

export const PC = ({ children }) => {
  const isPC = useMediaQuery({ query: '(min-width: 768px)' });
  return isPC ? children : null;
};