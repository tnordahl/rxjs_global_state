
import { get } from 'lodash';

export const initialState = {
  primary: 'green',
};

const path = 'data.theme';

export const setBackgroundColor = (color, id, state) => {
  let newState = {...state};
  const themeState = get(newState, path);

  if(id !== 'all') {
    if(!get(newState, path)[id]) {
      themeState[id] = {};
    }
    themeState[id].primary = color;
  } else {
    for (let [key, value] of Object.entries(themeState)) {
      if(key === 'primary') {
        themeState[key] = color;
      } else {
        themeState[key].primary = color;
      }
    }
  }

  newState = {
    ...newState,
    ...themeState,
  }
  
  return newState;
};
