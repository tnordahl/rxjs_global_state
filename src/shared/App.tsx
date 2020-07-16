import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import Root from './Root';

import globalStore from './state/globalStore';
import { Link } from "@reach/router"

const App = () => {
    // let history = useHistory();

    // const goHome = () => {
    //   history.push("/");
    // }
    
    // const goAbout = () => {
    //   history.push("/about");
    // }

    useEffect(()=> {
      globalStore.init();
    },[]);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Root />
    </div>
    
  );
}

export default hot(App);
