import React from 'react';
import StackNavigation from './src/screens/stackNavigation'

global.URL_API = "http://192.168.0.102:3000/"

export default function App() {
  return (
    <StackNavigation/>
  );
}
