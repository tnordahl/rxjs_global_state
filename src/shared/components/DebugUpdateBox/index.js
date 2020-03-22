import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import globalStore from '../../state/globalStore';

const DebugUpdateBox = ({ children, boxId }) => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [primary, setPrimary] = useState(globalState.data.theme.primary);

  useEffect(()=> {
    globalStore.subscribe(setGlobalState);
    globalStore.init();
  },[]);

  useEffect(() => {
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
