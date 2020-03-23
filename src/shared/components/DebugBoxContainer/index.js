import React, { useMemo } from 'react';
import ThemedButton from '../ThemedButton';
import DebugUpdateBox from '../DebugUpdateBox';
import DebugCatBox from '../DebugCatBox';
import ColorPicker from '../ColorPicker';

const DebugBoxContainer = () => {
  const Box0 = useMemo(() => <ColorPicker />);
  const Box1 = useMemo(() => <DebugCatBox />);

  return (
    <div className={`App`} >
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

export default DebugBoxContainer;
