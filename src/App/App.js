// /src/App.js
// Description:
// "App.js" is the entry point of the project.
// Copyright 2018-2019 NOOXY. All Rights Reserved.

// React
import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import {Launcher} from 'react-chat-window'

import Constants from '../flux/constants.json';

// Flux
import Flux from '../flux'

// Components
import {Footer, Header} from "../components/overlays"
import TalkRoom from "../components/TalkRoom"

// Pages
import HomePage from "../components/HomePage";
import AlbumsPage from "../components/AlbumsPage";
import AboutUsPage from "../components/AboutusPage";
import AdminPage from "../components/AdminPage";
import InformationCardPage from "../components/InformationCardPage";


import Button from '@material-ui/core/Button';
// Css
import "../All.min.css"
// color
import blue from '@material-ui/core/colors/blue';

import Tooltip from '@material-ui/core/Tooltip';

//
import LinearProgress from '@material-ui/core/LinearProgress';



//dirty code
let ab_not_finished = 1;
let au_not_finished = 1;

class App extends Component {
  constructor(props){
    // let url = window.location.href;
    // url = url + "?id=13734151";
    // document.write()
    super(props);
    this.controller = new Flux(this.setState.bind(this), this.props.dark_theme_state);
    this.controller.enqueueSnackbar = this.props.enqueueSnackbar;
    this.controller.importNoServiceClientModule(props.NoServiceClient);
    this.actions = this.controller.Actions;
    this.state = {
      lang : Constants.settings.default_lang,
      lang2string : {},
      open_chat_room: false,
      messages: [],
      messages_latest_readline: 0,
      messages_latest_line: 0,
      chat_room: {
        channel_id: null,
        welcome_message: null
      },
      slogan: 'We play, we work, we create.',
      chat_room_meta: {},
      isadmin: false,
      online_count: 0,
      playing: false,
      log: false,
      programs: {
        loading: true,
        "show_days": [
          true,
          true,
          true,
          false,
          false,
          false,
          false
        ],
        "show_segments": [
          "Loading..."
        ],
        "segments": {
          "Loading...": [
            {
              "title": "Fetching data from NoService...",
              "url": "https://nooxy.org",
              "description": "Fetching"
            },
            null,
            null,
            null,
            null,
            null,
            null
          ]
        }
      },
      audio_display: "交大網路電台",
      localizes: {},
      news: [],
      album_cards: [],
      album_decks: [],
      suggested_information_cards: [],
      information_cards: {},
      dark_theme: true,
      loading_status: {
        determinate: true,
        show: true,
        progress_percent: 0,
      },
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
    let localize = this.state.localizes[this.state.lang];

    return ([
        (this.state.loading_status.show)?(this.state.loading_status.determinate?<LinearProgress variant="determinate" value={this.state.loading_status.progress_percent}/>: <LinearProgress />):null
        ,
        <Header
          localize={localize?localize:{}}
          lang={this.state.lang}
          lang2string = {this.state.lang2string}
          username = {this.controller.NoService.returnUsername()}
          actions={this.actions}
          playing={this.state.playing}
          login_link={Constants.settings.noservice.host}
          show_admin={this.state.isadmin}
          dark_theme={this.props.dark_theme}
        />
        ,
        <Switch>
          <Route exact path="/" render={props=> {
            return(
              <HomePage
                dark_theme={this.props.dark_theme}
                slogan={this.state.slogan}
                actions={this.actions}
                online_count={this.state.online_count}
                pinned_info={this.state.suggested_information_cards.map(card_id=> {
                  let card = this.state.information_cards[card_id];
                  if(card)
                    return([card.Title, '/InformationCards/'+card_id]);
                })}
                news={this.state.news}
                suggested_cards={this.state.suggested_information_cards}
                cards={this.state.information_cards}
                programs = {this.state.programs}
                localize={localize?localize:{}}
              />
            );
          }} />

          <Route path="/InformationCards/:card_id" render={props=> {
            let card = this.state.information_cards[props.match.params.card_id];
            if(card) {
              if(this.state.loading_status.show)
                this.actions.updateLoadingStatus({type: 'updateLoadingStatus', data: {determinate: false, show: false}});
              card.card_id = props.match.params.card_id;
              return(
                <InformationCardPage
                  dark_theme={this.props.dark_theme}
                  actions={this.actions}
                  localize={localize?localize:{}}
                  card={card}
                />
              );
            }
            else {
              if(!this.state.loading_status.show)
                this.actions.updateLoadingStatus({type: 'updateLoadingStatus', data: {determinate: false, show: true}});
              this.actions.loadInformationCard(props.match.params.card_id);
            }
          }} />

          <Route path="/Admin" render={props=> {
            return(
              <AdminPage
                dark_theme={this.props.dark_theme}
                talksy_link={Constants.settings.talksy_link}
                push_notification_cache = {this.state.push_notification_cache}
                actions={this.actions}
                app_state={this.state}
                localize={localize?localize:{}}
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
                dark_theme={this.props.dark_theme}
                localize={localize?localize:{}}
                cards={this.state.album_cards}
                decks={this.state.album_decks} />
              )
            }} />

          <Route path="/AboutUs" render={
            props => {
              let card = this.state.information_cards[this.state.about_us_info_card_id];
              if(!this.state.loading_status.show)
                // this.actions.updateLoadingStatus({type: 'updateLoadingStatus', data: {determinate: false, show: true}});
              if(card) {
                card.card_id = this.state.about_us_info_card_id;
                return(
                  <InformationCardPage
                    dark_theme={this.props.dark_theme}
                    actions={this.actions}
                    localize={localize?localize:{}}
                    card={card}
                  />
                );
              }
              else {
                this.actions.loadInformationCard(this.state.about_us_info_card_id);
                return(<AboutUsPage localize={localize?localize:{}} />);
              }
            }} />
            <Route path=':badurl(.*)' render={(props)=>{
              return(
                <div className="aboutpage" style={{color: 'white', padding: '150px 0'}}>
                    <h3>{'The requested URL "'+props.match.params.badurl+'" does not exist.'}</h3>
                    <p>Please check your link is a valid link.</p>
                </div>
              );
            }}/>
        </Switch>
        ,
        <Footer localize={localize?localize:{}} version={Constants.version}/>
        ,
        <div style={{zIndex: 999}}>
          <Tooltip title={localize?localize.chat_room:'chat room'}>
            <Launcher
              agentProfile={{
                teamName: (localize?localize:{}).chat_room+': '+this.state.chat_room_meta.Displayname,
                imageUrl: this.state.chat_room_meta.Thumbnail
              }}
              isOpen={this.state.open_chat_room}
              handleClick={this.actions.readLine}
              onMessageWasSent={this.actions.sendMessage}
              messageList={this.state.messages}
              newMessagesCount={this.state.messages_latest_line - this.state.messages_latest_readline}
              showEmoji
            />
          </Tooltip>
        </div>
    ]);
  }
}

export default App;
