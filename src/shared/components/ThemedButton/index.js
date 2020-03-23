import React, { useEffect, useState } from 'react';
import globalStore from '../../state/globalStore';

const ThemedButton = () => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [primary, setPrimary] = useState(globalState.data.theme.inactiveColor);

  useEffect(()=> {
    globalStore.subscribe(setGlobalState);
    globalStore.init();
  },[]);

  useEffect(() => {
    if(globalState.data.theme.activeElements.all) {
      setPrimary(globalState.data.theme.activeColor);
    } else {
      setPrimary(globalState.data.theme.inactiveColor);
    }

  }, [Object.keys(globalState.data.theme.activeElements)])

  return (
    <button
      type='button'
      style={{ backgroundColor: primary, color: 'white' }}
      onClick={(e) => {
        e.stopPropagation();
        return globalStore.setElementActive('all');
      }}
    >
      {
        globalState.data.theme.activeElements.all
        ? 'All inactive!'
        : 'All active!'
      }
    </button>
  );
};

export default ThemedButton;
