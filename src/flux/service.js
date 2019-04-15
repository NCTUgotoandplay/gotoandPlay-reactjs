// /src/flux/service.js
// Description:
// "service.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.
import Constants from './constants.json';
import Localize from '../App/localize.json';
const audio_source = Constants.settings.audio_source;

function Service(NoService, Dispatcher) {
  let Services = {
    NoTalk: null,
    gotoandplay: null
  };

  let gotoandplay_audio = new Audio(audio_source);
  let gotoandplay_audio_playing = false;

  this.Actions = {
    emitSignin: ()=> {
      Dispatcher.dispatch({});
    },
    switchLang: ()=> {
      this.enqueueSnackbar('Switched language.');
      Dispatcher.dispatch({type: 'reverseLang', data: null});
    },
    switchMainStream: ()=> {
      if(gotoandplay_audio_playing) {
        gotoandplay_audio_playing = false;
        gotoandplay_audio.pause();
        this.enqueueSnackbar(Localize.en.pause_playing);
      }
      else {
        gotoandplay_audio_playing = true;
        gotoandplay_audio.play();
        this.enqueueSnackbar(Localize.en.continue_playing);
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
    next();
  };
}

export default Service;
