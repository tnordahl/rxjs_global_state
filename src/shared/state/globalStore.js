import { BehaviorSubject } from 'rxjs';

import { initialState as theme, setBackgroundColor, setElementActive, registerElement } from './reducers/theme';
import { initialState as cats, setImageLoading, getCatImage, resetCatImage} from './reducers/cats';

// STATE
const subject = new BehaviorSubject();

const initialState = {
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
 
  subscribe: setState => subject.subscribe(setState),

  // ACTIONS
  setBackgroundColor: (color) => {
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

  registerElement: (id) => {
    state = registerElement(id, state)
    subject.next(state);
  },

  setElementActive: (id) => {
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
