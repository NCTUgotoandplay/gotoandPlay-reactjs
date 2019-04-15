// /src/flux/service.js
// Description:
// "service.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.

function Service(NoService, Dispatcher) {
  let Services = {
    NoTalk: null,
    gotoandplay: null
  };

  this.Actions = {
    emitSignin: ()=> {
      Dispatcher.dispatch({});
    },
    switchLang: ()=> {
      Dispatcher.dispatch({type: 'reverseLang', data: null});
    },
    switchMainStream: ()=> {
      Dispatcher.dispatch({type: 'reverseStreamStaus', data: null});
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
