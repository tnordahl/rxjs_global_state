import React, { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';

import { Router, RouteComponentProps } from "@reach/router"

const Root = () => {
    return (
        <Router>
            <Home path="/" />
            <About path="/about" />
        </Router>
  );
}

export default Root;
