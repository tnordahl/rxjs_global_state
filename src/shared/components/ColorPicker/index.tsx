import React, { useEffect, useState } from 'react';
import { SliderPicker } from 'react-color';
import globalStore from '../../state/globalStore';

const ColorPicker = () => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [primary, setPrimary] = useState(globalState.data.theme.activeColor);

  useEffect(()=> {
    globalStore.subscribe(setGlobalState);
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
            // console.log('color:', color);
            // console.log('e:', e);
            return globalStore.setBackgroundColor(color.hex);
          }
        }
      />
    </div>
  );
}

export default ColorPicker;
