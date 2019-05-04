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
    else if (payload.type === 'updateMessages') {
      setState(prevstate=>{
        return({ messages: payload.data });
      })
    }
    else if (payload.type === 'appendMessage') {
      setState(prevstate=>{
        prevstate.messages.push(payload.data);
        return prevstate;
      })
    }
    else if (payload.type === 'updateLatestReadline') {
      setState(prevstate=>{
        prevstate.messages_latest_readline = payload.data;
        return prevstate;
      })
    }
    else if (payload.type === 'updateLatestLine') {
      setState(prevstate=>{
        prevstate.messages_latest_line = payload.data;
        return prevstate;
      })
    }
    else if (payload.type === 'readLatestLine') {
      setState(prevstate=>{
        prevstate.messages_latest_line = prevstate.messages_latest_readline;
        return prevstate;
      })
    }
    else if (payload.type === 'addLatestLine') {
      setState(prevstate=>{
        prevstate.messages_latest_line = prevstate.messages_latest_line+1;
        return prevstate;
      })
    }
    else if (payload.type === 'toggleChatRoom') {
      setState(prevstate=>{
        prevstate.open_chat_room = (prevstate.open_chat_room+1)%2;
        return prevstate;
      })
    }
    else if (payload.type === 'updateChatroomSettings') {
      setState(prevstate=>{
        prevstate.chat_room = payload.data;
        return prevstate;
      })
    }
    else if (payload.type === 'updateChatroomMeta') {
      setState(prevstate=>{
        prevstate.chat_room_meta = payload.data;
        return prevstate;
      })
    }
    else if (payload.type === 'updateInfomationCards') {
      setState(prevstate=>{
        prevstate.information_cards = payload.data;
        return prevstate;
      })
    }
    else if (payload.type === 'updateInformationCard') {
      setState(prevstate=>{
        console.log(payload.data, prevstate.information_cards);
        prevstate.information_cards[payload.data.CardId] = payload.data;
        return prevstate;
      }, payload.callback)
    }
    else if (payload.type === 'updateSuggestedInformationCards') {
      setState(prevstate=>{
        prevstate.suggested_information_cards = payload.data;
        return prevstate;
      }, payload.callback)
    }
    else if (payload.type === 'addSuggestedInformationCards') {
      setState(prevstate=>{
        if(!prevstate.suggested_information_cards.includes(payload.data)&&Object.keys(prevstate.information_cards).includes(payload.data))
          prevstate.suggested_information_cards.push(payload.data);
        return prevstate;
      }, payload.callback)
    }
    else if (payload.type === 'deleteSuggestedInformationCards') {
      setState(prevstate=>{
        let index = prevstate.suggested_information_cards.indexOf(payload.data);
        if (index > -1) {
          prevstate.suggested_information_cards.splice(index, 1);
        }
        return prevstate;
      }, payload.callback)
    }
  });

  return _dispatcher;
}

export default {generateDispatcher: generateDispatcher};
