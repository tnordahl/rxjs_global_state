import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import globalStore from '../../state/globalStore';

let sub: any;
let mounted = false;

const DebugCatBox = () => {
  const [globalState, setGlobalState] = useState(globalStore.state);
  const [catImage, setCatImage] = useState(globalState.data.cats.currentCatUrl);

  useEffect(()=> {
    sub = globalStore.subscribe(setGlobalState);
    mounted = true;
    return function cleanup() {
      mounted = false
      sub.unsubscribe();
      sub = null;
    };
  },[]);

  useEffect(() => {
    if(mounted) {
      setCatImage(globalState.data.cats.currentCatUrl);
    }
  }, [globalState.data.cats.currentCatUrl])

  return (
    <div
      role='button'
      className='debug-cat-box'
      tabIndex={0}
      onKeyDown={() => null}
      style={{backgroundColor: 'orange'}}
      onClick={(e) => {
        e.stopPropagation();
        return globalStore.updateCatImage();
      }
    }
    >
      {
        catImage
        ? <img alt='a cat' src={catImage}/>
      : globalState.data.cats.imageLoading ? 'loading an amazing cat' : 'you want catz!'
      }
    </div>
  );
}

DebugCatBox.propTypes = {
  children: PropTypes.node,
};

DebugCatBox.defaultProps = {
  children: null,
};

export default DebugCatBox;
