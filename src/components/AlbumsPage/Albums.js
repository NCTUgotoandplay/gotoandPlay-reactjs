import React from 'react';
import Cards from './Cards'
import Decks from './Decks'
import AlbumIntro from './AlbumIntro'

import alb_icon from "../../imgs/cover2.jpg"

class Albums extends React.Component {
  render () {
    return (
      <div className="albumpage">
        <Cards cards={this.props.cards} />
        <hr />
        <Decks decks={this.props.decks} />
      </div>
    );
  }
}

export default Albums;
