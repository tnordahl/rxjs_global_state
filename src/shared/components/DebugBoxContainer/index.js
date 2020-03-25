import React, { Component } from 'react';
import ThemedButton from '../ThemedButton';
import DebugUpdateBox from '../DebugUpdateBox';
import DebugCatBox from '../DebugCatBox';
import ColorPicker from '../ColorPicker';

class DebugBoxContainer extends Component {
  render() {
    const Box0 = <ColorPicker />;
    const Box1 = <DebugCatBox />;

    return (
      <div className={`App`} style={{backgroundColor: 'blue'}}>
        {Box0}
        {Box1}

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
