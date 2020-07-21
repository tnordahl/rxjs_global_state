import { BehaviorSubject } from 'rxjs';

import { initialState as theme, IThemeState, setBackgroundColor, setElementActive, registerElement } from './reducers/theme';
import { initialState as cats, ICatsState, setImageLoading, getCatImage, resetCatImage} from './reducers/cats';
import { initialState as cryptobot, ICryptoBotState, setCoinBuy, setCoinSell} from './reducers/cryptobot';

// STATE
const subject = new BehaviorSubject(null);

export interface IState {
  data: {
    theme: IThemeState,
    cats: ICatsState
    cryptobot: ICryptoBotState
  };
}

const initialState: IState = {
  data: {
    theme,
    cats,
    cryptobot,
  },
};

let state = initialState;

const globalStore = {
  init: () => {
    state = {...state}
    subject.next(state)
  },

  subscribe: (setState:any) => subject.subscribe(setState),
  unsubscribe: () => subject.unsubscribe(),

  /*

  THEME

  */

  registerElement: (id: number) => {
    state = registerElement(id, state)
    subject.next(state);
  },

  setElementActive: (id:number | string) => {
    state = setElementActive(id, state)
    subject.next(state);
  },

  setBackgroundColor: (color:string) => {
    state = setBackgroundColor(color, state)
    subject.next(state);
  },

 /*

  CATS

  */

  updateCatImage: async () => {
    let newState  = {...state}
    newState = setImageLoading(true, newState);
    subject.next(newState);

    newState = resetCatImage(newState);
    subject.next(newState);

    newState = await getCatImage(newState);
    newState = setImageLoading(false, newState);

    subject.next(newState);
  },

 /*

  CRYPTO BOT

  */

  updateCoinBuy: (coin:string) => {
    state = setCoinBuy(coin, state)
    subject.next(state);
  },
  
  updateCoinSell: (coin:string) => {
    state = setCoinSell(coin, state)
    subject.next(state);
  },


 /*

  RESET

  */
  clearGlobalState: () => {
    state = initialState;
    subject.next(state);
  },

  

  // STATE
  initialState,
  state
};

export default globalStore;
