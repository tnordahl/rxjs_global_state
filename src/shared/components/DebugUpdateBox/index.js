import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import globalStore from '../../state/globalStore';

const DebugUpdateBox = ({ children, boxId }) => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [primary, setPrimary] = useState(globalState.data.theme.inactiveColor);

  useEffect(()=> {
    globalStore.subscribe(setGlobalState);
    globalStore.init();
  },[]);

  useEffect(() => {
    if(globalState.data.theme.activeElements[boxId] || globalState.data.theme.activeElements.all) {
      setPrimary(globalState.data.theme.activeColor);
    } else {
      setPrimary(globalState.data.theme.inactiveColor);
    }
  }, [Object.keys(globalState.data.theme.activeElements)])

  return (
    <div
      role='button'
      className='Debug_Box'
      tabIndex='0'
      onKeyDown={() => null}
      style={
        {
          backgroundColor: primary,
          border: `1px solid pink`,
          zIndex: boxId
        }
      }
      onClick={(e) => {
        e.stopPropagation();
        return globalStore.setElementActive(boxId);
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
