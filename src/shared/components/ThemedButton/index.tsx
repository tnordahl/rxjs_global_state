import React, { FunctionComponent, useEffect, useState } from 'react';
import globalStore from '../../state/globalStore';

const ThemedButton:FunctionComponent = () => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [primary, setPrimary] = useState(globalState.data.theme.inactiveColor);
  const [all, setAll] = useState(false);

  useEffect(()=> {
    globalStore.subscribe(setGlobalState);
  },[]);

  useEffect(() => {
    const activeElements = Object.values(globalState.data.theme.activeElements)
    const allChecked = activeElements.every( (val) => val === true );

    if(activeElements.length && allChecked) {
      setPrimary(globalState.data.theme.activeColor);
    } else {
      setPrimary(globalState.data.theme.inactiveColor);
    }

    setAll(activeElements.length && allChecked);

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
