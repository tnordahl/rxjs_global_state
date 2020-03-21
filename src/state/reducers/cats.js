import { get } from 'lodash';
import preloadImage from '../../libs/preloadImage';

export const initialState = {
  imageLoading: false,
  currentCatUrl: null,
};

const path = 'data.cats';

export const setImageLoading = (isLoading, state) => {
  let newState = {
    ...state
  }

  get(newState, path).imageLoading = isLoading;

  newState = {
    ...newState,
    newDataCount: state.newDataCount + 1
  };

  return newState;
};

export const resetCatImage = (state) => {
  const newState = {
    ...state
  }

  get(newState, path).currentCatUrl = null;
  newState.newDataCount = state.newDataCount + 1;

  return newState;
};

export const getCatImage = async (state) => {
  const newState = {...state};

  const response = await fetch('https://api.thecatapi.com/v1/images/search?size=full');
  const data = await response.json();
  const { url } = data[0];

  await preloadImage(url);

  get(newState, path).currentCatUrl = url;

  return newState

};
