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

// Sources
import logo from "../imgs/favicon.png"
import alb_intro from "../imgs/cover2.jpg"

// Css
import "../All.min.css"

class App extends Component {
  constructor(props){
    super(props);
    this.controller = new Flux(this.setState.bind(this));
    this.controller.importNoServiceClientModule(props.NoServiceClient);
    this.actions = this.controller.Actions;
    this.state = {
      lang : Constants.settings.default_lang,
      logo: logo,
      playing: false,
      log: false,
      audio_display: "交大網路電台",
      audio_source: Constants.settings.audio_source,
      localize: require('./localize.json'),
      cards: [
        {
          "title": "噓韓問暖",
          "img": "https://scontent.ftpe8-3.fna.fbcdn.net/v/t1.0-9/54430364_282023362697265_4573382752757350400_n.jpg?_nc_cat=107&_nc_ht=scontent.ftpe8-3.fna&oh=e6ba38c67e66c2e73bdda24da220a8f4&oe=5D0D9076",
          "p": "噓, 你也在這裡嗎...?",
          "link": ""
        },
        {
          "title": "MC麥卵共",
          "img": "https://scontent.ftpe8-4.fna.fbcdn.net/v/t1.0-9/43632697_308532823277059_5085982675718635520_n.jpg?_nc_cat=111&_nc_ht=scontent.ftpe8-4.fna&oh=9d9a3f679fac19ca5392d6989c867df9&oe=5D048179",
          "p": "從不同的角度看電影\n一起探索MOVIE COSMOS!",
          "link": ""
        },
        {
          "title": "TITLE",
          "img": "",
          "p": "PPPP",
          "link": ""
        }
      ],
      decks: [
        {
          "title": "2018 Autumn",
          "img": "",
          "link": ""
        }
      ]
    };
  }

  componentDidMount() {
    this.controller.start(()=> {
      console.log('background started.');
    });
  }



  render() {
    return (
      <BrowserRouter>
        <Header
          localize={this.state.localize[this.state.lang]}
          actions={this.actions}
          logo={this.state.logo}
          playing={this.state.playing}
          log={this.state.log}
        />
        <Route exact path="/" component={HomePage} />
        <Route path="/Albums" render={
          props =>
          <AlbumsPage
          cards={this.state.cards}
          decks={this.state.decks} />} />
        <Route path="/AboutUs" render={
          props => <AboutUsPage localize={this.state.localize[this.state.lang]} />} />
        <Footer localize={this.state.localize[this.state.lang]}/>
        <TalkRoom />
      </BrowserRouter>
    );
  }
}

export default App;
