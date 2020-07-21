import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import Root from './Root';

import globalStore from './state/globalStore';
import { Link } from "@reach/router"

const App = () => {
    useEffect(()=> {
      globalStore.init();
    },[]);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/cryptobot">CryptoBot</Link>
      </nav>
      <Root />
    </div>
    
  );
}

export default hot(App);
