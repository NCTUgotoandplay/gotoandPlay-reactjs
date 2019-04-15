// /src/flux/actions.js
// Description:
// "actions.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.
import Dispatcher from './lib/dispatcher';

function generateDispatcher(setState) {
  let _dispatcher = new Dispatcher();

  let id1 = _dispatcher.register((payload)=> {
    if(payload.type === 'updateLang') {
      setState( { lan: payload.data } );
    }
    else if(payload.type === 'reverseLang') {
      setState(prevstate=>{
        const lan = (prevstate.lang === "zh")? "en": "zh";
        return ({ lang: lan })
      });
    }
    else if (payload.type === 'reverseStreamStaus') {
      setState(prevstate=>{
        return({ playing: !prevstate.playing });
      })
    }
    else if (payload.type === 'updateStreamStaus') {
      setState(prevstate=>{
        return({ playing: payload.data });
      })
    }
  });

  return _dispatcher;
}

export default {generateDispatcher: generateDispatcher};
