import React, { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import CryptoBot from './pages/CryptoBot';

import { Router, RouteComponentProps } from "@reach/router"

const Root = () => {
    return (
        <Router>
            <Home path="/" />
            <About path="/about" />
            <CryptoBot path="/cryptobot" />
        </Router>
  );
}

export default Root;
