import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import globalStore from '../../state/globalStore';



type DebugUpdateBoxTypes = {
  children:object,
  boxId: number,
}

const DebugUpdateBox = ({ children, boxId }: DebugUpdateBoxTypes) => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [primary, setPrimary] = useState(globalState.data.theme.inactiveColor);
  let sub: any;
  let mounted = false;

  useEffect(()=> {
    
    sub = globalStore.subscribe(setGlobalState);
    globalStore.registerElement(boxId);
    mounted = true;
    return function cleanup() {
      mounted = false
      sub.unsubscribe();
      sub = null;
    };
  },[]);

  useEffect(() => {
    if(globalState.data.theme.activeElements[boxId]) {
      setPrimary(globalState.data.theme.activeColor);
    } else {
      setPrimary(globalState.data.theme.inactiveColor);
    }
  }, [Object.keys(globalState.data.theme.activeElements)])

  return (
    <div
      role='button'
      className='Debug-Box'
      tabIndex={0}
      onKeyDown={() => null}
      style={
        {
          backgroundColor: primary,
          border: '2px solid lightblue',
          zIndex: boxId
        }
      }
      onClick={(e) => {
        e.stopPropagation();
        return globalStore.setElementActive(boxId);
      }
    }
    >
      <div className='Debug-Box__checked-message'>{
          globalState.data.theme.activeElements[boxId] === true
          ? 'active'
          : 'inactive '
        }</div>
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
