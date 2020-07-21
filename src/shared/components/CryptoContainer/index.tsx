import React, { Component } from 'react';
import DebugCatBox from '../DebugCatBox';
import { RouteComponentProps } from "@reach/router"

class CryptoContainer extends Component<RouteComponentProps> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <div className={`crypto-container`} style={{backgroundColor: 'blue'}}>
        <DebugCatBox />
      </div>
    );
  }
}

export default CryptoContainer;
