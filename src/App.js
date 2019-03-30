import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import TalkRoom from './TalkRoom'
import logo from './imgs/favicon.png'
import hom_icon from './imgs/home.png'
import hom_tri from './imgs/home_triggered.png'
import alb_icon from './imgs/playlist.png'
import alb_tri from './imgs/playlist_triggered.png'
import com_icon from './imgs/fb.png'
import com_tri from './imgs/fb_triggered.png'
import abu_icon from './imgs/us.png'
import abu_tri from './imgs/us_triggered.png'
import './All.min.css'

const NavPic = (props) => (
  <img className="navicon" src={props.src} alt="" />
)
const TriPic = (props) => (
  <img className="navicon overlay" src={props.src} alt=""
    />
)

class Stream extends Component {
  render () {
    return (
      <div className="stream">
        <div className="bar">TEXT</div>
        <div className="main"
          onClick={this.props.onClick}>
          {this.props.playing?"Pause":"Play"}</div>
      </div>
    );
  }
}

class Header extends Component {
  renderNav(i) {
    if ( i === "Home" ){
      return (
        <IndexLink className="btn" to="/">
          <NavPic src={this.props.picsrc[i][0]}/>
          <TriPic src={this.props.picsrc[i][1]}/>
          <p>{this.props.text[this.props.lan][i]}</p>
        </IndexLink>
      );
    }
    else if ( i === "Community"){
      return (
        <a className="btn"
          href="https://www.facebook.com/gotoandplay.nctu/"
          target="_blank"
          rel='noreferrer noopener'
        >
          <NavPic src={this.props.picsrc[i][0]}/>
          <TriPic src={this.props.picsrc[i][1]}/>
          <p>{this.props.text[this.props.lan][i]}</p>
        </a>
      );
    }
    else{
      return (
        <Link className="btn" to={i}>
          <NavPic src={this.props.picsrc[i][0]}/>
          <TriPic src={this.props.picsrc[i][1]}/>
          <p>{this.props.text[this.props.lan][i]}</p>
        </Link>
      );
    }
  }

  render() {
    return (
      <div className="header">
        <>
          <div className="lan_select"
            onClick={(e) => this.props.selectLanguage(e)}>
            TW / EN
          </div>
          <a className="log_select"
            href="https://nooxy.org/static/NoService/login.html?conn_method=WebSocketSecure&remote_ip=nooxy.org&port=43581&redirect=https://nooxy.org/static/NoService/NoUserSettings.html">
            {this.props.log?"Logout":"Login"}
          </a>
        </>
        <div className="container">
          <IndexLink className="key" to="/">
            <img className="logo" src={logo} alt=""/>
            <h4> - {this.props.title} - </h4>
          </IndexLink>
          <div className="navbar">
            {this.renderNav('Home')}
            {this.renderNav('Albums')}
            {this.renderNav('Community')}
            {this.renderNav('AboutUs')}
          </div>
        </div>
        <Stream playing={this.props.playing}
          activeBar={1}
          onClick={(e) => this.props.clickMainStream(e)}/>
      </div>
    );
  }
}

const Footer = (e) => (
  <div className="footer">
    <div className="container">
      <h5> - Copyright © 2019 - </h5>
    </div>
  </div>
)

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lan : 'zh',
      title: "goto & Play",
      playing: false,
      log: false,
      audio_display: "交大網路電台",
      audio_source: "http://140.113.52.126:8000/;",
      picsrc: {
        'Home': [hom_icon, hom_tri],
        'Albums': [alb_icon, alb_tri],
        'Community': [com_icon, com_tri],
        'AboutUs': [abu_icon, abu_tri]
      },
      text: {
        'zh': {
          'Home': '首頁',
          'Albums': '隨選即播',
          'Community': '臉書',
          'AboutUs': '關於我們'
        },
        'en': {
          'Home': 'Home',
          'Albums': 'Albums',
          'Community': 'Facebook',
          'AboutUs': 'About us'
        }
      }
    };
  }
  selectLanguage() {
    const lan = this.state.lan === "zh"? "en": "zh"
    this.setState({
      lan: lan
    })
  }
  clickMainStream() {
    this.setState({
      playing: !this.state.playing
    })
  }
  render() {
    return (
      [
        <Header
          lan={this.state.lan}
          title={this.state.title}
          playing={this.state.playing}
          log={this.state.log}
          picsrc={this.state.picsrc}
          text={this.state.text}
          selectLanguage={()=>this.selectLanguage()}
          clickMainStream={()=>this.clickMainStream()}
        />,
        <>{this.props.children}</>,
        <Footer />,
        <TalkRoom />
      ]
    );
  }
}

export default App;
