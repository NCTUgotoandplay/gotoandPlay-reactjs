import React from 'react';
import Cards from './Cards'
import Decks from './Decks'

class Albums extends React.Component {
  render () {
    return (
      <div className="albumpage">
        <h1>{this.props.localize.highlighted_albums}</h1>
        <Cards cards={this.props.cards} />
        <hr />
        <h1>{this.props.localize.album_collections}</h1>
        <Decks decks={this.props.decks} />
      </div>
    );
  }
}

export default Albums;
