
import { get } from 'lodash';
import { string, number } from 'prop-types';
import { IState } from '../globalStore';

export interface IThemeState {
    activeColor: string,
    inactiveColor: string;
    activeElements: {
      [key: number]:  boolean,
    };
}

export const initialState: IThemeState = {
  activeColor: 'green',
  inactiveColor: 'indigo',
  activeElements: {},
};

const path = 'data.theme';

export const setElementActive = (id: string | number, state: IState) => {

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

export const registerElement = (id: number, state: IState) => {

  let newState = {...state};
  const themeState = get(newState, path);

  themeState.activeElements[id] = false;

  newState = {
    ...newState,
    ...themeState,
  }

  return newState;
}

export const setBackgroundColor = (color: string, state: IState) => {
  let newState = {...state};
  const themeState = get(newState, path);

  themeState.activeColor = color;

  newState = {
    ...newState,
    ...themeState,
  }

  return newState;
};
