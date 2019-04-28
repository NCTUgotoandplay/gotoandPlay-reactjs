// /src/flux/actions.js
// Description:
// "actions.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.
import Dispatcher from './lib/dispatcher';

function generateDispatcher(setState) {
  let _dispatcher = new Dispatcher();

  let id1 = _dispatcher.register((payload)=> {
    if(payload.type === 'updateLang') {
      setState( { lang: payload.data } );
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
    else if (payload.type === 'updateProgramsTable') {
      setState(prevstate=>{
        return({ programs: payload.data });
      })
    }
    else if (payload.type === 'updateAlbumCards') {
      setState(prevstate=>{
        return({ album_cards: payload.data });
      })
    }
    else if (payload.type === 'updateAlbumDecks') {
      setState(prevstate=>{
        return({ album_decks: payload.data });
      })
    }
    else if (payload.type === 'updateLocalizes') {
      setState(prevstate=>{
        let lang2string = {};
        for(let lang in payload.data) {
          lang2string[lang] = payload.data[lang].lang2string;
        }
        return({ localizes: payload.data, lang2string: lang2string});
      })
    }
    else if (payload.type === 'updateLang') {
      setState(prevstate=>{
        return({ lang: payload.data });
      })
    }
    else if (payload.type === 'updateNews') {
      setState(prevstate=>{
        return({ news: payload.data });
      })
    }
    else if (payload.type === 'updateInfos') {
      setState(prevstate=>{
        return({ more_info: payload.data });
      })
    }
    else if (payload.type === 'updateOnlineCount') {
      setState(prevstate=>{
        return({ online_count: payload.data });
      })
    }
    else if (payload.type === 'updatePrograms') {
      setState(prevstate=>{
        return({ programs: payload.data });
      })
    }
  });

  return _dispatcher;
}

export default {generateDispatcher: generateDispatcher};
