
import { get } from 'lodash';

export const initialState = {
  activeColor: 'green',
  inactiveColor: 'blue',
  activeElements: {}
};

const path = 'data.theme';

export const setElementActive = (id, state) => {

  let newState = {...state};
  const themeState = get(newState, path);

  if(themeState.activeElements[id]) {
    delete themeState.activeElements[id];
  } else if(id === 'all'){
    themeState.activeElements = {
      all: 'active',
    };
  }
  else {
    themeState.activeElements[id] = 'active';
  }

  newState = {
    ...newState,
    ...themeState,
  }

  return newState;
}

export const setBackgroundColor = (color, state) => {
  let newState = {...state};
  const themeState = get(newState, path);

  themeState.activeColor = color;

  newState = {
    ...newState,
    ...themeState,
  }

  return newState;
};
