import { BehaviorSubject } from 'rxjs';

import { initialState as theme, setBackgroundColor } from './reducers/theme';
import { initialState as cats, setImageLoading, getCatImage, resetCatImage} from './reducers/cats';

// STATE
const subject = new BehaviorSubject();

const initialState = {
  data: {
    theme,
    cats
  },
  newDataCount: 0,
};

let state = initialState;

const globalStore = {
  init: () => {
    state = {...state, newDataCount: 0}
    subject.next(state)
  },
  subscribe: setState => subject.subscribe(setState),

  // ACTIONS
  setBackgroundColor: (color, id) => {
    state = setBackgroundColor(color, id, state)
    subject.next(state);
  },

  updateCatImage: async () => {
    let newState  = {...state, newDataCount: state.newDataCount + 1}
    newState = setImageLoading(true, newState);
    subject.next(newState);

    newState = resetCatImage(newState);
    subject.next(newState);

    newState = await getCatImage(newState);
    newState = setImageLoading(false, newState);

    subject.next(newState);
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
