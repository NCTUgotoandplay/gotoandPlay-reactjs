// /src/App.js
// Description:
// "App.js" is the entry point of the project.
// Copyright 2018-2019 NOOXY. All Rights Reserved.

// React
import React, { Component } from "react"
import { Route } from "react-router-dom"

// Controller
import Controller from './controller'

// Components
import TalkRoom from "./commons/TalkRoom"
import Home from "./home"
import Albums from "./albums"
import AboutUs from "./aboutus"
import Header from "./commons/Header"
import Footer from "./commons/Footer"

// Sources
import logo from "./imgs/favicon.png"
import hom_icon from "./imgs/home.png"
import hom_tri from "./imgs/home_triggered.png"
import alb_icon from "./imgs/playlist.png"
import alb_tri from "./imgs/playlist_triggered.png"
import com_icon from "./imgs/fb.png"
import com_tri from "./imgs/fb_triggered.png"
import abu_icon from "./imgs/us.png"
import abu_tri from "./imgs/us_triggered.png"
import alb_intro from "./imgs/cover2.jpg"

// Css
import "./All.min.css"

class App extends Component {
  constructor(props){
    super(props);
    this.controller = new Controller(this.setState);
    this.controller.importNoServiceClientModule(props.NoServiceClient);
    this.actions = this.controller.Actions;
    this.state = {
      lan : "zh",
      title: "goto & Play",
      logo: logo,
      playing: false,
      log: false,
      audio_display: "交大網路電台",
      audio_source: "http://140.113.52.126:8000/;",
      picsrc: {
        "Home": [hom_icon, hom_tri],
        "Albums": [alb_icon, alb_tri],
        "Community": [com_icon, com_tri],
        "AboutUs": [abu_icon, abu_tri],
        "AlbumIntro": alb_intro
      },
      text: {
        "zh": {
          "header": {
            "Home": "首頁",
            "Albums": "隨選即播",
            "Community": "臉書",
            "AboutUs": "關於我們"
          },
          "about": {
            "title": "關於電台",
            "p": "交大網路電台goto&Play自開播以來，\n" +
                 "就一直是系上熱門的話題組織，\n" +
                 "直到今日電台組織架構及人數持續增長茁壯，\n" +
                 "相信未來交大網路電台goto&Play也將會持續為聽眾獻上\n" +
                 "最不一樣的好聲音。",
            "contact": "聯絡我們",
            "nickname": "暱稱",
            "e-mail": "e-mail",
            "message": "訊息"
          }
        },
        "en": {
          "header": {
            "Home": "Home",
            "Albums": "Albums",
            "Community": "Facebook",
            "AboutUs": "About us"
          },
          "about": {
            "title": "About US",
            "p": "We're goto&Play @ NCTU :))",
            "contact": "Contact Us",
            "nickname": "Nickname",
            "e-mail": "e-mail",
            "message": "message"
          }
        }
      },
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
      
    });
  }

  selectLanguage() {
    const lan = this.state.lan === "zh"? "en": "zh"
    this.setState( { lan: lan } )
  }

  clickMainStream() {
    this.setState( { playing: !this.state.playing } )
  }

  render() {
    return (
      [
        <Header
          lan={this.state.lan}
          title={this.state.title}
          logo={this.state.logo}
          playing={this.state.playing}
          log={this.state.log}
          picsrc={this.state.picsrc}
          text={this.state.text[this.state.lan]["header"]}
          selectLanguage={ () => this.selectLanguage() }
          clickMainStream={ () => this.clickMainStream() }
        />,
        <Route exact path="/" component={Home} />,
        <Route path="/Albums" render={
          props => <Albums picsrc={this.state.picsrc["AlbumIntro"]}
          cards={this.state.cards}
          decks={this.state.decks} />} />,
        <Route path="/AboutUs" render={
          props => <AboutUs text={this.state.text[this.state.lan]["about"]} />} />,
        <Footer />,
        <TalkRoom />
      ]
    );
  }
}

export default App;
