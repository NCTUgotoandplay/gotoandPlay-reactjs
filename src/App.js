import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './imgs/cover.png';
import cover from './imgs/cover.png';
import cover2 from './imgs/cover2.jpg';
import mixer from './imgs/mixer.jpg';
import people from './imgs/people.jpg';
import './App.css';

class Header extends Component {
  renderURLs = () => {
    let pages = this.props.header_urls;
    return pages.map(page=> {
      return <a href={page[1]} key={page[1]}><h2 className="Header-link">{page[0]}</h2></a>
    });
  }

  render() {
    return (
        <header className="Header">
          <img height="150" weight="150" src={logo}></img>
          <h1 className="App-title">{this.props.title}</h1>
          <div className="App-links">
            {this.renderURLs()}
          </div>
        </header>
    );
  }
}

class Footer extends Component {
  constructor(props) {
    super(props);
    this.renderLinks = ()=> {
      let linksblocks = this.props.links;
      let result = [];
      for(let blockname in this.props.links) {
        result.push(
          <div className="FooterBlock">
            <h2>{blockname}</h2>
            <ul>
              {linksblocks[blockname].map(link=><li><a href={link[1]}>{link[0]}</a></li>)}
            </ul>
          </div>
        );
      }
      return(
        result
      );
    }
  }
  render() {
    return(
      <footer className="Footer">
        <div className="FooterLinks">
          {this.renderLinks()}
        </div>
        <div className="FooterCopyright">
            copyright©2018 gotoandPlay, 交大網路電台.<br/> 保留一切權利.
        </div>
      </footer>
    )
  }
};

class HorizonPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      audio: new Audio(this.props.source)
    };
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    this.setState({ playing: !this.state.playing });
    this.state.playing ? this.state.audio.pause() : this.state.audio.play();
  }

  render() {
    return (
        <div className="HorizonPlayer">
          <div className="HorizonPlayerControl">
            <span className="HorizonPlayerText"> <i className="material-icons">radio</i> {this.props.display}</span>
          </div>
          <button onClick={this.togglePlay} className="HorizonPlayerControl"><i className="material-icons">{this.state.playing ? 'pause' : 'play_arrow'}</i></button>
        </div>
    );
  }
}

class TextBlock extends Component {
  constructor(props) {
    super(props);
    this.style = {
      'backgroundPosition': 'center',
      'backgroundSize': 'cover',
      'backgroundImage': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+this.props.background+')',
      'minHeight': this.props.height,
      'textAlign': this.props.right? 'right': 'left'
    };
  }

  render() {
    return (
      <a href={this.props.link}>
        <div style={this.style} className="TextBlock">
          <div>
            <h2>{this.props.title}</h2>
            <p>{this.props.contain}</p>
          </div>
        </div>
      </a>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <TextBlock
          link="/about"
          title="We are still building our site."

          contain="This site is still under construction. In order to provide better experience. Please be patient and wait for our update. :)"
          background="https://78.media.tumblr.com/793329ad53c0c6527a75da62435137cc/tumblr_pdoabfMWHI1uwz0gbo1_1280.gif" height="100px"
          height="500px"
        />
        <TextBlock link="/about" title="電台一家親，強檔上映" contain="內容" background={people} height="100px"/>
        <TextBlock title="goto&Play" right={true} contain="內容" background={cover} height="300px"/>
        <TextBlock title="酷炫mixer，等你來摸"  contain="內容" background={mixer} height="500px"/>
      </div>
    )
  }
}

class About extends Component {
  render() {
    return <p>about</p>;
  }
}

class Library extends Component {
  render() {
    return <p>library</p>;
  }
}

class App extends Component {
  state = {
    title: "gotoandPlay 交大網路電台",
    pages: [
      ['首頁', '/'],
      ['蒐藏', '/library'],
      ['臉書', 'https://www.facebook.com/gotoandplay.nctu'],
      ['關於', '/about']
    ],
    audio_display: "交大網路電台",
    audio_source: "http://140.113.52.126:8000/;",
    footer_links: {
      '深入了解':[
        ['gotoandPlay?', '/'],
        ['在tunein收聽', '/'],

      ],
      '關於我們':[
        ['所有成員', '/'],
        ['網頁人員', 'https://nooxy.org'],
        ['網頁開源原始碼', 'https://github.com/magneticchen/gotoandPlay-reactjs']
      ],
      '社交連結':[
        ['推特', 'https://nooxy.org'],
        ['臉書', 'https://www.facebook.com/gotoandplay.nctu'],
        ['tunein', '/']
      ]
    }
  };

  render() {
    return (
      <div className="App">
        <Header title={this.state.title} header_urls={this.state.pages}/>
        <HorizonPlayer display={this.state.audio_display} source={this.state.audio_source}/>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/library/' component={Library} />
            <Route path='/about/' component={About} />
          </div>
        </Router>
        <Footer links={this.state.footer_links}/>
      </div>
    );
  }
}

export default App;
