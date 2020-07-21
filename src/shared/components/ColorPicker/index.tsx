import React, { useEffect, useState } from 'react';
import { SliderPicker } from 'react-color';
import globalStore from '../../state/globalStore';

let sub:any;
let mounted = false;

const ColorPicker = () => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [primary, setPrimary] = useState(globalState.data.theme.activeColor);

  useEffect(()=> {
    sub = globalStore.subscribe(setGlobalState);
    mounted = true;
    return function cleanup() {
      mounted = false
      sub.unsubscribe();
      sub = null;
    };
  },[]);

  useEffect(() => {
      setPrimary(globalState.data.theme.activeColor);
  }, [globalState.data.theme.activeColor])

  return (
    <div
      className='Color-Picker'
      style={{backgroundColor: primary, border: `1px solid pink`}}
    >
      <SliderPicker
        color={ primary }
        onChange={
          (color:any, e:any) => {
            return globalStore.setBackgroundColor(color.hex);
          }
        }
      />
    </div>
  );
}

export default ColorPicker;
