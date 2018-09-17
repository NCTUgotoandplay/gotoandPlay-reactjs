import React, { Component } from 'react';
import logo from './logo.svg';
import cover from './cover.png';
import cover2 from './cover2.jpg';
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
          <h1 className="App-title">{this.props.title}</h1>
          {this.renderURLs()}
        </header>
    );
  }
}

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
          <button onClick={this.togglePlay} className="HorizonPlayerControl"><i className="material-icons">{this.state.playing ? 'pause' : 'play_arrow'}</i></button>
          <div className="HorizonPlayerControl">
            <span className="HorizonPlayerText"> <i className="material-icons">radio</i> "{this.props.display}"</span>
          </div>
        </div>
    );
  }
}

class TextBlock extends Component {
  constructor(props) {
    super(props);
    this.style = {
      'background-position': 'center',
      'background-size': 'cover',
      'background-image': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+this.props.background+')',
      'min-height': this.props.height,
      'text-align': this.props.right? 'right': 'left'
    };
  }

  render() {
    return (
        <div style={this.style} className="TextBlock">
          <div>
            <h2>{this.props.title}</h2>
            <p>{this.props.contain}</p>
          </div>
        </div>
    );
  }
}

class App extends Component {
  state = {
    title: "gotoandPlay 交大網路電台",
    pages: [
      ['Home', '/'],
      ['Library', '/library'],
      ['Facebook', 'https://www.facebook.com/gotoandplay.nctu'],
      ['About', '/about']
    ],
    audio_display: "交大網路電台",
    audio_source: "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3"
  };

  render() {
    return (
      <div className="App">
        <Header title={this.state.title} header_urls={this.state.pages}/>
        <HorizonPlayer display={this.state.audio_display} source={this.state.audio_source}/>
        <TextBlock title="電台一家親，強檔上映" contain="內容" background={people} height="100px"/>
        <TextBlock title="goto&Play" right={true} contain="內容" background={cover} height="300px"/>
        <TextBlock title="酷炫mixer，等你來摸"  contain="內容" background={mixer} height="500px"/>
      </div>
    );
  }
}

export default App;
