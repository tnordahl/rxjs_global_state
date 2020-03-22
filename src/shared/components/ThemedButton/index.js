import React, { useEffect, useState } from 'react';
import globalStore from '../../state/globalStore';

const ThemedButton = () => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [primary, setPrimary] = useState(globalState.data.theme.primary);

  useEffect(()=> {
    globalStore.subscribe(setGlobalState);
    globalStore.init();
  },[]);

  useEffect(() => {
    if(globalState.data.theme) {
      setPrimary(globalState.data.theme.primary);
    }
  })

  return (
    <button
      type='button'
      style={{ backgroundColor: primary, color: primary === 'green' ? 'white' : 'pink' }}
      onClick={(e) => {
        e.stopPropagation();
        return globalStore.setBackgroundColor(primary === 'green' ? 'blue' : 'green', 'all');
      }}
    >
      {
        primary === 'green'
        ? 'All blue!'
        : 'All green!'
      }
    </button>
  );
};

export default ThemedButton;
