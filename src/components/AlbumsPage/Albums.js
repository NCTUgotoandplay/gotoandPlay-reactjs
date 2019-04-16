import React from 'react';
import Cards from './Cards'
import Decks from './Decks'
import AlbumIntro from './AlbumIntro'

import alb_icon from "../../imgs/cover2.jpg"

class Albums extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="albumpage">
        <h1>{this.props.localize.hightlight_albums}</h1>
        <Cards cards={this.props.cards} />
        <hr />
        <h1>{this.props.localize.album_collections}</h1>
        <Decks decks={this.props.decks} />
      </div>
    );
  }
}

export default Albums;
