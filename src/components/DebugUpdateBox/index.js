import React, { useEffect, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import globalStore from '../../state/globalStore';

import './DebugBox.module';

const DebugUpdateBox = ({ children, boxId }) => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [primary, setPrimary] = useState(globalState.data.theme.primary);

  useLayoutEffect(()=> {
    globalStore.subscribe(setGlobalState);
    globalStore.init();
  },[]);

  console.log('globalState:::', globalState);
  console.log('primary:::', primary);

  useEffect(() => {
    console.log('update')
    if(globalState.data.theme[boxId]) {
      setPrimary(globalState.data.theme[boxId].primary);
    }
  })

  return (
    <div
      role='button'
      className='Debug_Box'
      tabIndex='0'
      onKeyDown={() => null}
      style={{backgroundColor: primary, border: `1px solid pink`, zIndex: boxId}}
      onClick={(e) => {
        e.stopPropagation();
        return globalStore.setBackgroundColor(primary === 'green' ? 'blue' : 'green', boxId);
      }
    }
    >
      { children }
    </div>
  );
}

DebugUpdateBox.propTypes = {
  boxId: PropTypes.number.isRequired,
  children: PropTypes.node,
};

DebugUpdateBox.defaultProps = {
  children: null,
};

export default DebugUpdateBox;
