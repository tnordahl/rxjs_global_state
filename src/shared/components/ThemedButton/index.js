import React from 'react';

const ThemedButton = () => {

  return (
    <button
      type='button'
      style={{ backgroundColor: 'pink' }}
      onClick={(e) => {
        e.stopPropagation();
        // return dispatch({
        //   type: constants.CHANGE_TEAM,
        //   newTheme: { primary: theme.primary !== 'blue' ? 'blue' : 'green', debugBoxId: 'all' },
        // });
      }}
    >
      Make me blue!
    </button>
  );
};

export default ThemedButton;
