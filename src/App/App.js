// /src/App.js
// Description:
// "App.js" is the entry point of the project.
// Copyright 2018-2019 NOOXY. All Rights Reserved.

// React
import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import {Launcher} from 'react-chat-window'

import Constants from '../flux/constants.json';

// Flux
import Flux from '../flux'

// Components
import {Footer, Header} from "../components/overlays"
import TalkRoom from "../components/TalkRoom"

// Pages
import HomePage from "../components/HomePage"
import AlbumsPage from "../components/AlbumsPage"
import AboutUsPage from "../components/AboutusPage"
import AdminPage from "../components/AdminPage"

import Button from '@material-ui/core/Button';
// Css
import "../All.min.css"

//
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const Theme = createMuiTheme();

//dirty code
let ab_not_finished = 1;
let au_not_finished = 1;

class App extends Component {
  constructor(props){
    super(props);
    this.controller = new Flux(this.setState.bind(this));
    this.controller.enqueueSnackbar = this.props.enqueueSnackbar;
    this.controller.importNoServiceClientModule(props.NoServiceClient);
    this.actions = this.controller.Actions;
    this.state = {
      lang : Constants.settings.default_lang,
      lang2string : {},
      open_chat_room: 0,
      messages: [],
      messages_latest_readline: 0,
      messages_latest_line: 0,
      chat_room_id: '123',
      chat_room_meta: {},
      isadmin: true,
      online_count: 0,
      playing: false,
      log: false,
      programs: null,
      audio_display: "交大網路電台",
      localizes: {},
      news: [],
      more_info: [],
      album_cards: [],
      album_decks: [],
      push_notification_cache: [
        {id:'123', content: '節目開始', variant:'info'},
        {id:'13', content: '準備抽獎', variant:'warning'},
        {id:'s13', content: '節目結束', variant:'error'}
      ]
    };
  }

  componentDidMount() {
    this.controller.start(()=> {
      console.log('background started.');
    });
  }

  componentDidUpdate() {

  }

  render() {

    return (
      <MuiThemeProvider theme={Theme}>
      <BrowserRouter>
        <Header
          localize={this.state.localizes[this.state.lang]?this.state.localizes[this.state.lang]:{}}
          lang={this.state.lang}
          lang2string = {this.state.lang2string}
          username = {this.controller.NoService.returnUsername()}
          actions={this.actions}
          playing={this.state.playing}
          login_link={Constants.settings.noservice.host}
          show_admin={this.state.isadmin}
        />
        <Route exact path="/" render={props=> {
          return(
            <HomePage
            actions={this.actions}
            online_count={this.state.online_count}
            more_info={this.state.more_info}
            news={this.state.news}
            cards={this.state.album_cards}
            programs = {this.state.programs}
            localize={this.state.localizes[this.state.lang]?this.state.localizes[this.state.lang]:{}}
            />
          );
        }} />
        <Route path="/Admin" render={props=> {
          return(
            <AdminPage
              talksy_link={Constants.settings.talksy_link}
              push_notification_cache = {this.state.push_notification_cache}
              actions={this.actions}
              app_state={this.state}
              localize={this.state.localizes[this.state.lang]?this.state.localizes[this.state.lang]:{}}
            />
          );
        }} />
        <Route path="/Albums" render={
          props => {
            if(ab_not_finished) {
              this.props.enqueueSnackbar('此頁面尚未完成!', {variant: 'warning'});
              ab_not_finished=0;
            }

            return(
              <AlbumsPage
              localize={this.state.localizes[this.state.lang]?this.state.localizes[this.state.lang]:{}}
              cards={this.state.album_cards}
              decks={this.state.album_decks} />
            )
          }} />
        <Route path="/AboutUs" render={
          props => {
            if(au_not_finished) {
              this.props.enqueueSnackbar('此頁面尚未完成!', {variant: 'warning'});
              au_not_finished = 0;
            }
            return(<AboutUsPage localize={this.state.localizes[this.state.lang]?this.state.localizes[this.state.lang]:{}} />);
          }} />
        <Footer localize={this.state.localizes[this.state.lang]?this.state.localizes[this.state.lang]:{}} version={Constants.version}/>
        <TalkRoom />
        <div style={{zIndex: 999}}>
          <Launcher
            agentProfile={{
              teamName: (this.state.localizes[this.state.lang]?this.state.localizes[this.state.lang]:{}).chat_room+': '+this.state.chat_room_meta.Displayname,
              imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            }}
            isOpen={this.state.open_chat_room}
            handleClick={this.actions.readLine}
            onMessageWasSent={this.actions.sendMessage}
            messageList={this.state.messages}
            newMessagesCount={this.state.messages_latest_line - this.state.messages_latest_readline}
            showEmoji
          />
        </div>
      </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
