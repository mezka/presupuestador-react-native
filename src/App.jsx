import React from 'react';
import Routes from './Routes';
import { Provider as PaperProvider } from 'react-native-paper';
import log from 'loglevel';

log.setLevel("info");

export default function App() {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
}