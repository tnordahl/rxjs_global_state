import React, { Component } from 'react';
import globalStore from '../../state/globalStore';
import ThemedButton from '../ThemedButton';
import DebugUpdateBox from '../DebugUpdateBox';
import DebugCatBox from '../DebugCatBox';
import ColorPicker from '../ColorPicker';
import { RouteComponentProps } from "@reach/router"

let sub: any = {};

type DebugBoxState = {
  data: any,
};

type DebugBoxTypes = {
  sub?: any,
}

class DebugBoxContainer extends Component<DebugBoxTypes, DebugBoxState, RouteComponentProps> {
  constructor(props:any) {
    super(props);
  }

  componentDidMount = () => {
    sub = globalStore.subscribe(() => {
      this.setState({
        ...globalStore.state
      })
    });
  }

  componentWillUnmount = () => {
    sub.unsubscribe();
    sub = null;
  }

  render() {
    const Box0 = <ColorPicker />;
    const Box1 = <DebugCatBox />;

    const colorCode = this.state ? this.state.data.theme.activeColor : 'Loading';

    return (
      <div className={`App debug-container`} style={{backgroundColor: 'blue'}}>
        <div className='color-header'>{colorCode}</div>
        {
          Box0
        }
        {
          Box1
        }

      <DebugUpdateBox boxId={0}>
        <DebugUpdateBox boxId={1}>
          <DebugUpdateBox boxId={2}>
            <DebugUpdateBox boxId={3}>
              <ThemedButton />
            </DebugUpdateBox>
            </DebugUpdateBox>
          </DebugUpdateBox>
        </DebugUpdateBox>

      </div>
    );
  }
}

export default DebugBoxContainer;
