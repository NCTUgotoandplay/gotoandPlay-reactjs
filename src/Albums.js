import React, { Component } from 'react';

class Card extends React.Component {
  render () {
    return (
      <div className="card">
        <img src={this.props.img} alt=""/>
        <div className="rightpart">
          <h3>{this.props.title}</h3>
          <p>{this.props.p}</p>
        </div>
      </div>
    );
  }
}
class Cards extends React.Component {
  render () {
    const listItems = this.props.cards.map((oj) =>
      <Card title={oj["title"]} img={oj["img"]} p={oj["p"]}/>
    )
    return (
      <div className="cards">
        {listItems}
      </div>
    );
  }
}
class Deck extends React.Component {
  render () {
    return (
      <div className="deck">
        <img src={this.props.img} alt=""/>
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}
class Decks extends React.Component {
  render () {
    const listItems = this.props.decks.map((oj) =>
      <Deck title={oj["title"]} img={oj["img"]}/>
    )
    return (
      <div className="decks">
        {listItems}
      </div>
    );
  }
}

class Albums extends React.Component {
  constructor(props){
  super(props);
  this.state = {
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
        },
      ],
      decks: [
        {
          "title": "2018 Autumn",
          "img": "",
          "link": ""
        },
          {
            "title": "2018 Spring",
            "img": "",
            "link": ""
          },
      ]
    };
  }
  render () {
    return (
        <div className="albumpage">
          <div className="intro">
            <div className="pframe">
              <div className="p p1">隨選</div>
              <div className="p p2">即播</div>
            </div>
            <img src="" alt="" />
          </div>
          <Cards cards={this.state.cards}/>
          <hr/>
          <Decks decks={this.state.decks}/>
        </div>
    );
  }
}

export default Albums;
