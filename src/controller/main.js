// /src/controller/main.js
// Description:
// "main.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.
import Constants from '../constants.json'

function Controller(setState) {
  let _noservice_client;
  let Services = {};

  this.importNoServiceClientModule = (NoServiceClient)=> {
    _noservice_client = new NoServiceClient(Constants.settings.noservice.host, 'WebSocket');
  };

  this.emitSignIn = ()=> {

  };

  this.start = (next)=> {
    // _noservice_client.createActivitySocket('NoTalk', (err, NoTalk)=> {
    //   if(err) {
    //     console.log(err);
    //   }
    //   else {
    //     Services.NoTalk = NoTalk;
    //   }
    // });
  };
};

export default Controller;
