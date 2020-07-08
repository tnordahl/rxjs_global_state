import { BehaviorSubject } from 'rxjs';

import { initialState as theme, ThemeState, setBackgroundColor, setElementActive, registerElement } from './reducers/theme';
import { initialState as cats, CatsState, setImageLoading, getCatImage, resetCatImage} from './reducers/cats';

// STATE
const subject = new BehaviorSubject(null);

export interface State {
  data: {
    theme: ThemeState,
    cats: CatsState
  };
}

const initialState: State = {
  data: {
    theme,
    cats
  },
};

let state = initialState;

const globalStore = {
  init: () => {
    state = {...state}
    subject.next(state)
  },

  subscribe: (setState:any) => subject.subscribe(setState),

  // ACTIONS
  setBackgroundColor: (color:string) => {
    state = setBackgroundColor(color, state)
    subject.next(state);
  },

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

  registerElement: (id: number) => {
    state = registerElement(id, state)
    subject.next(state);
  },

  setElementActive: (id:number | string) => {
    state = setElementActive(id, state)
    subject.next(state);
  },

  clearGlobalState: () => {
    state = initialState;
    subject.next(state);
  },

  // STATE
  initialState,
  state
};

export default globalStore;
