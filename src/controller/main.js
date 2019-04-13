// /src/controller/main.js
// Description:
// "main.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.
import Constants from '../constants.json';
import Dispatcher from './dispatcher';
import Service from './service';

function Controller(setState) {
  let _noservice_client;
  let Services = {};

  this.importNoServiceClientModule = (NoServiceClient)=> {
    _noservice_client = new NoServiceClient(Constants.settings.noservice.host, 'WebSocket');
  };

  this.Dispatcher = Dispatcher.generateDispatcher(setState);
  this.Service = new Service(_noservice_client, this.Dispatcher);
  this.Actions = this.Service.Actions;

  this.start = (next)=> {
    this.Service.start(next);
  };
};

export default Controller;
