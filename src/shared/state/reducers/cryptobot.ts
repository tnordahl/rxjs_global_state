import { get } from 'lodash';
import preloadImage from '../../libs/preloadImage';
import { IState } from '../globalStore';

export interface ICryptoBotState {
  coinBuy: string;
  coinSell: string;
}

export const initialState: ICryptoBotState = {
    coinBuy: 'MIOTA',
    coinSell: 'BTC',
};

const path = 'data.cryptobot';

export const setCoinBuy = (coinName: string, state: IState) => {
  const newState = {
    ...state
  }

  get(newState, path).coinBuy = coinName;

  return newState;
};

export const setCoinSell = (coinName: string, state: IState) => {
    const newState = {
      ...state
    }
  
    get(newState, path).coinSell = coinName;
  
    return newState;
  };
