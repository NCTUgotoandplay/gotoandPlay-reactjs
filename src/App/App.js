// /src/App.js
// Description:
// "App.js" is the entry point of the project.
// Copyright 2018-2019 NOOXY. All Rights Reserved.

// React
import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"

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

// Css
import "../All.min.css"

//dirty code
let ab_not_finished = 1;
let au_not_finished = 1;

class App extends Component {
  constructor(props){
    super(props);
    this.controller = new Flux(this.setState.bind(this));
    this.controller.importNoServiceClientModule(props.NoServiceClient);
    this.controller.enqueueSnackbar = this.props.enqueueSnackbar;
    this.actions = this.controller.Actions;
    this.state = {
      lang : Constants.settings.default_lang,
      lang2string : {
        zh: "中文",
        en: "english",
        jp: "日本語",
        zhuyin: "ㄓㄨˋㄧㄣ"
      },
      playing: false,
      log: false,
      programs: null,
      audio_display: "交大網路電台",
      localize: {},
      news: [],
      album_cards: [],
      album_decks: []
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
      <BrowserRouter>
        <Header
          localize={this.state.localize[this.state.lang]?this.state.localize[this.state.lang]:{}}
          lang={this.state.lang}
          lang2string = {this.state.lang2string}
          actions={this.actions}
          playing={this.state.playing}
          log={this.state.log}
        />
        <Route exact path="/" render={props=> {
          return(
            <HomePage
            news={this.state.news}
            cards={this.state.album_cards}
            programs = {this.state.programs}
            localize={this.state.localize[this.state.lang]?this.state.localize[this.state.lang]:{}}
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
              localize={this.state.localize[this.state.lang]?this.state.localize[this.state.lang]:{}}
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
            return(<AboutUsPage localize={this.state.localize[this.state.lang]?this.state.localize[this.state.lang]:{}} />);
          }} />
        <Footer localize={this.state.localize[this.state.lang]?this.state.localize[this.state.lang]:{}} version={Constants.version}/>
        <TalkRoom />
      </BrowserRouter>
    );
  }
}

export default App;
