import { BehaviorSubject } from 'rxjs';

import { initialState as theme, setBackgroundColor } from './reducers/theme';
import { initialState as appState} from './reducers/appState';

// STATE
const subject = new BehaviorSubject();

const initialState = {
  data: {
    theme,
    appState
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

  clearGlobalStatt: () => {
    state = initialState;
    subject.next(state);
  },

  // STATE
  initialState,
  state
};

export default globalStore;
