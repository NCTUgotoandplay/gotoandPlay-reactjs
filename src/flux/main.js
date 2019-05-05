// /src/flux/main.js
// Description:
// "main.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.
import Constants from './constants.json';
import Dispatcher from './dispatcher';
import Service from './service';

function Flux(setState) {
  let _noservice_client;

  this.Dispatcher = Dispatcher.generateDispatcher(setState);

  this.importNoServiceClientModule = (NoServiceClient)=> {
    _noservice_client = new NoServiceClient(Constants.settings.noservice.host, Constants.settings.noservice.conn);
    this.NoService = _noservice_client;
    this.Service = new Service(_noservice_client, this.Dispatcher);
    this.Service.enqueueSnackbar = this.enqueueSnackbar;
    this.Actions = this.Service.Actions;
  };

  this.start = (next)=> {
    this.Service.start(next);
  };
};

export default Flux;
