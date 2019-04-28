// /src/flux/service.js
// Description:
// "service.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.
import Constants from './constants.json';
import Localizes from './data/localizes.json';
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
    gotoandPlay: null
  };

  let lang = getCookie('lang');
  if(!lang) {
    lang = Constants.settings.default_lang;
    setCookie('lang', lang, 360);
  }
  let gotoandPlay_audio = new Audio(audio_source);
  let gotoandPlay_audio_playing = false;

  this.Actions = {
    logout: ()=> {
      NoService.logout();
    },
    importLocalizes: (data)=> {
      Dispatcher.dispatch({type: 'updateLocalizes', data: data});
    },
    updateNews: (data)=> {
      Dispatcher.dispatch({type: 'updateNews', data: data});
    },
    updateInfos: (data)=> {
      Dispatcher.dispatch({type: 'updateInfos', data: data});
    },
    updateAlbumCards: (data)=> {
      Dispatcher.dispatch({type: 'updateAlbumCards', data: data});
    },
    updateAlbumDecks: (data)=> {
      Dispatcher.dispatch({type: 'updateAlbumDecks', data: data});
    },
    updatePrograms: (data, callback)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('updatePrograms', data, (err, data)=> {
          // Dispatcher.dispatch({type: 'updatePrograms', data: data});
          callback(false);
        });
      // Dispatcher.dispatch({type: 'updateProgramsTable', data: data});
    },
    emitSignin: ()=> {
      Dispatcher.dispatch({});
    },
    switchLang: ()=> {
      lang = (lang === "zh")? "en": "zh";
      setCookie('lang', lang, 360);
      this.enqueueSnackbar(Localizes[lang].switch_this_lang);
      Dispatcher.dispatch({type: 'updateLang', data: lang});
    },
    updateLang: (l)=> {
      lang = l
      setCookie('lang', lang, 360);
      this.enqueueSnackbar(Localizes[lang].switch_this_lang);
      Dispatcher.dispatch({type: 'updateLang', data: lang});
    },
    initLang: (l)=> {
      lang = l
      setCookie('lang', lang, 360);
      Dispatcher.dispatch({type: 'updateLang', data: lang});
    },
    switchMainStream: ()=> {
      if(gotoandPlay_audio_playing) {
        gotoandPlay_audio_playing = false;
        gotoandPlay_audio.pause();
        this.enqueueSnackbar(Localizes[lang].pause_playing);
      }
      else {
        gotoandPlay_audio_playing = true;
        gotoandPlay_audio.play();
        this.enqueueSnackbar(Localizes[lang].continue_playing);
      }
      Dispatcher.dispatch({type: 'reverseStreamStaus', data: !gotoandPlay_audio_playing});
    },
    pushNotification: (data)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('pushNotification', data, (err, data)=> {
          this.enqueueSnackbar('Notification pushed.', {variant: 'succeess'});
        });
    },
    loadOnlineCount: ()=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('getOnlineCount', null, (err, data)=> {
          Dispatcher.dispatch({type: 'updateOnlineCount', data: data});
        });
    },
    loadPrograms: ()=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('getPrograms', null, (err, data)=> {
          Dispatcher.dispatch({type: 'updatePrograms', data: data});
        });
    }
  };

  this.setupDispatchers = ()=> {
    if(Services.NoTalk) {
      Services.NoTalk.onEvent('whatever', ()=> {
        Dispatcher.dispatch({data_type: 'albums', data: {

        }});
      });
    }
    if(Services.gotoandPlay) {
      Services.gotoandPlay.onEvent('Notification', (err, data)=> {
        this.enqueueSnackbar(data.content, {variant: data.variant});
      });
      Services.gotoandPlay.onEvent('OnlineCountChanged', (err, data)=> {
        Dispatcher.dispatch({type: 'updateOnlineCount', data: data});
      });
      Services.gotoandPlay.onEvent('ProgramsChanged', (err, data)=> {
        Dispatcher.dispatch({type: 'updateProgramsTable', data: data});
      });
    }
  };

  this.start = (next)=> {
    let setupOnline = ()=> {
      NoService.createActivitySocket('NoTalk', (err, NoTalk)=> {
        if(err) {
          console.log(err);
          setTimeout(setupOnline, 5*1000);
        }
        else {
          Services.NoTalk = NoTalk;
          NoService.createActivitySocket('gotoandPlay', (err, gotoandPlay)=> {
            if(err) {
              console.log(err);
              setTimeout(setupOnline, 5*1000);
            }
            else {
              Services.gotoandPlay = gotoandPlay;
              this.enqueueSnackbar('Connected to noservice.', {variant: 'success'});
              Services.gotoandPlay.on('close', ()=> {
                this.enqueueSnackbar('Connection closed!', {variant: 'error'});
                Dispatcher.dispatch({type: 'updateConnectionFail', data: true});
                Services.NoTalk = Services.gotoandPlay = null;
                setTimeout(setupOnline, 5*1000);
              });

              this.setupDispatchers();
              this.Actions.loadOnlineCount();
              this.Actions.loadPrograms();
            }
          });
        }
      });
    };
    setupOnline();

    this.Actions.updateAlbumCards(require('./data/albumcards.json'));
    this.Actions.updateAlbumDecks(require('./data/albumdecks.json'));
    this.Actions.updateNews(require('./data/news.json'));
    this.Actions.updateInfos(require('./data/more_info.json'));

    this.Actions.initLang(lang);
    this.Actions.importLocalizes(Localizes);

    if(lang === 'zh') {
      this.enqueueSnackbar('我們還在建構這個網站!', {variant: 'error'});
    }
    else {
      this.enqueueSnackbar('We are still constructing the site!', {variant: 'error'});
    }

    next();
  };
}

export default Service;
