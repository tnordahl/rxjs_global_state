import React, { Component } from 'react';
import globalStore from '../../state/globalStore';
import ThemedButton from '../ThemedButton';
import DebugUpdateBox from '../DebugUpdateBox';
import DebugCatBox from '../DebugCatBox';
import ColorPicker from '../ColorPicker';

let sub: any = {};

type DebugBoxState = {
  data: any,
};

type DebugBoxTypes = {
  sub?: any,
}

class DebugBoxContainer extends Component<DebugBoxTypes, DebugBoxState> {
  constructor(props:any) {
    super(props);
  }

  tick() {
    this.setState({
      ...globalStore.state
    });
  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.tick();
  }

  componentDidMount() {
    sub = globalStore.subscribe(() => {
      this.setState({
        ...globalStore.state
      })
    });
  }

  render() {
    const Box0 = <ColorPicker />;
    const Box1 = <DebugCatBox />;

    return (
      <div className={`App`} style={{backgroundColor: 'blue'}}>
        <div className='color-header'>{this.state.data.theme.activeColor}</div>
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
