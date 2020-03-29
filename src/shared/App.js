import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import DebugBoxContainer from "./components/DebugBoxContainer";
import globalStore from './state/globalStore';


const App = () => {

    useEffect(()=> {
      globalStore.init();
    },[]);

  return (
    <DebugBoxContainer />
  );
}

export default hot(App);
