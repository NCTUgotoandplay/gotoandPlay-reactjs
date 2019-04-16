// /src/flux/service.js
// Description:
// "service.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.
import Constants from './constants.json';
import Localize from './data/localize.json';
const audio_source = Constants.settings.audio_source;

function Service(NoService, Dispatcher) {
  let Services = {
    NoTalk: null,
    gotoandplay: null
  };

  let lang = Constants.default_lang;
  let gotoandplay_audio = new Audio(audio_source);
  let gotoandplay_audio_playing = false;

  this.Actions = {
    importLocalize: (data)=> {
      Dispatcher.dispatch({type: 'updateLocalize', data: data});
    },
    updateAlbumCards: (data)=> {
      Dispatcher.dispatch({type: 'updateAlbumCards', data: data});
    },
    updateAlbumDecks: (data)=> {
      Dispatcher.dispatch({type: 'updateAlbumDecks', data: data});
    },
    updatePrograms: (data)=> {
      Dispatcher.dispatch({type: 'updateProgramsTable', data: data});
    },
    emitSignin: ()=> {
      Dispatcher.dispatch({});
    },
    switchLang: ()=> {
      lang = (lang === "zh")? "en": "zh";
      this.enqueueSnackbar(Localize[lang].switch_this_lang);
      Dispatcher.dispatch({type: 'updateLang', data: lang});
    },
    switchMainStream: ()=> {
      if(gotoandplay_audio_playing) {
        gotoandplay_audio_playing = false;
        gotoandplay_audio.pause();
        this.enqueueSnackbar(Localize[lang].pause_playing);
      }
      else {
        gotoandplay_audio_playing = true;
        gotoandplay_audio.play();
        this.enqueueSnackbar(Localize[lang].continue_playing);
      }
      Dispatcher.dispatch({type: 'reverseStreamStaus', data: !gotoandplay_audio_playing});
    }
  };

  this.setupDispatchers = ()=> {
    if(Service.NoTalk) {
      Services.NoTalk.onEvent('whatever', ()=> {
        Dispatcher.dispatch({data_type: 'albums', data: {

        }});
      });
    }
    if(Service.gotoandplay) {
      Services.gotoandplay.onEvent();
    }
  };

  this.start = (next)=> {
    // NoService.createActivitySocket('NoTalk', (err, NoTalk)=> {
    //   if(err) {
    //     console.log(err);
    //   }
    //   else {
    //     Services.NoTalk = NoTalk;
    //   }
    // });
    this.setupDispatchers();
    this.Actions.updatePrograms(require('./data/programs.json'));
    this.Actions.updateAlbumCards(require('./data/albumcards.json'));
    this.Actions.updateAlbumDecks(require('./data/albumdecks.json'));
    this.Actions.importLocalize(Localize);
    next();
  };
}

export default Service;
