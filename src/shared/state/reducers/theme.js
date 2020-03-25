
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

  if(id === 'all'){
    const allTrue = Object.values(themeState.activeElements).every( (val, i, arr) => val === true );

    Object.keys(themeState.activeElements).forEach( key => {
      themeState.activeElements[key] = !allTrue;
    });
  }
  else if(themeState.activeElements[id]) {
    themeState.activeElements[id] = false;
  } else {
    themeState.activeElements[id] = true;
  }

  newState = {
    ...newState,
    ...themeState,
  }

  return newState;
}

export const registerElement = (id, state) => {

  let newState = {...state};
  const themeState = get(newState, path);

  themeState.activeElements[id] = false;

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
