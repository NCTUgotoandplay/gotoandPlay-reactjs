// /src/flux/service.js
// Description:
// "service.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.
import Constants from './constants.json';
import Localize from './data/localize.json';
const audio_source = Constants.settings.audio_source;

const setCookie = (cname, cvalue, exdays)=> {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const getCookie = (cname)=> {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
};

function Service(NoService, Dispatcher) {
  let Services = {
    NoTalk: null,
    gotoandplay: null
  };

  let lang = getCookie('lang');
  if(!lang) {
    lang = Constants.settings.default_lang;
    setCookie('lang', lang, 360);
  }
  let gotoandplay_audio = new Audio(audio_source);
  let gotoandplay_audio_playing = false;

  this.Actions = {
    importLocalize: (data)=> {
      Dispatcher.dispatch({type: 'updateLocalize', data: data});
    },
    updateNews: (data)=> {
      Dispatcher.dispatch({type: 'updateNews', data: data});
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
      setCookie('lang', lang, 360);
      this.enqueueSnackbar(Localize[lang].switch_this_lang);
      Dispatcher.dispatch({type: 'updateLang', data: lang});
    },
    updateLang: (l)=> {
      lang = l
      setCookie('lang', lang, 360);
      this.enqueueSnackbar(Localize[lang].switch_this_lang);
      Dispatcher.dispatch({type: 'updateLang', data: lang});
    },
    initLang: (l)=> {
      lang = l
      setCookie('lang', lang, 360);
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
    this.Actions.initLang(lang);
    this.Actions.updatePrograms(require('./data/programs.json'));
    this.Actions.updateAlbumCards(require('./data/albumcards.json'));
    this.Actions.updateAlbumDecks(require('./data/albumdecks.json'));
    this.Actions.updateNews(require('./data/news.json'));
    this.Actions.importLocalize(Localize);

    if(lang === 'zh') {
      this.enqueueSnackbar('我們還在建構這個網站!', {variant: 'error'});
    }
    else {
      this.enqueueSnackbar('We are still constructing the site!', {variant: 'error'});
    }

    this.enqueueSnackbar('Initialized.', {variant: 'succeess'});
    next();
  };
}

export default Service;
