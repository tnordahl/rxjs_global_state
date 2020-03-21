export const initialState = {
  primary: 'green',
};

export const setBackgroundColor = (color, id, state) => {
  let newState = state;
  if(!newState.data.theme[id]) {
    newState.data.theme[id] = {};
  }
  newState.data.theme[id].primary = color;
  newState = {
    ...newState,
    newDataCount: state.newDataCount + 1
  };

  console.log('st:', state);

  return newState;


  // SEE if we can pipe and update state after api call

  // setTimeout(() => {
  //   newState.data.theme[id].primary = 'pink';
  //   state = {
  //     ...newState,
  //     newDataCount: state.newDataCount + 1
  //   };
  //
  //   subject.next(state);
  // }, 1000)

};
