import React from 'react';
import Cards from './Cards'
import Decks from './Decks'

class Albums extends React.Component {
  render () {
    return (
      <div className="albumpage" style={this.props.dark_theme?{'color': 'white'}:{'color': '#232f34', 'background': 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.78) 10px, rgba(235, 248, 253, 0.78) 10px, rgba(235, 249, 255, 0.78) 20px)'}}>
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
