
import { get } from 'lodash';

export const initialState = {
  primary: 'green',
};

const path = 'data.theme';

export const setBackgroundColor = (color, id, state) => {
  let newState = state;
  if(!get(newState, path)[id]) {
    get(newState, path)[id] = {};
  }
  get(newState, path)[id].primary = color;
  newState = {
    ...newState,
  };

  return newState;
};
