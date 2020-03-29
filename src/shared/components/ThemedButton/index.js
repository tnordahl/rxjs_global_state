import React, { useEffect, useState } from 'react';
import globalStore from '../../state/globalStore';

const ThemedButton = () => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [primary, setPrimary] = useState(globalState.data.theme.inactiveColor);
  const [all, setAll] = useState(false);

  useEffect(()=> {
    globalStore.subscribe(setGlobalState);
  },[]);

  useEffect(() => {
    const allChecked = Object.values(globalState.data.theme.activeElements).every( (val, i, arr) => val === true );

    if(allChecked) {
      setPrimary(globalState.data.theme.activeColor);
    } else {
      setPrimary(globalState.data.theme.inactiveColor);
    }

    setAll(allChecked);

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
        all
        ? 'All inactive!'
        : 'All active!'
      }
    </button>
  );
};

export default ThemedButton;
