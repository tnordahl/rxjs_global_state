import { get } from 'lodash';
import preloadImage from '../../libs/preloadImage';
import { IState } from '../globalStore';

export interface ICatsState {
  imageLoading: boolean;
  currentCatUrl: string;
  newDataCount: number;
}

export const initialState: ICatsState = {
  imageLoading: false,
  currentCatUrl: null,
  newDataCount: 0,
};

const path = 'data.cats';

export const setImageLoading = (isLoading: boolean, state: IState) => {
  const newState = {
    ...state
  }

  get(newState, path).imageLoading = isLoading;

  return newState;
};

export const resetCatImage = (state: IState) => {
  const newState = {
    ...state
  }

  get(newState, path).currentCatUrl = null;
  get(newState, path).newDataCount = get(newState, path).newDataCount + 1;

  return newState;
};

export const getCatImage = async (state: IState) => {
  const newState = {...state};

  const response = await fetch('https://api.thecatapi.com/v1/images/search?size=full');
  const data = await response.json();
  const { url } = data[0];

  await preloadImage(url);

  get(newState, path).currentCatUrl = url;

  return newState

};