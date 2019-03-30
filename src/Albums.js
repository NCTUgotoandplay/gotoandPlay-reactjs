import React from 'react';
import Cards from './Cards'
import Decks from './Decks'
import AlbumIntro from './AlbumIntro'

class Albums extends React.Component {
  render () {
    return (
      <div className="albumpage">
        <AlbumIntro bgisrc={this.props.picsrc}/>
        <Cards cards={this.props.cards} />
        <hr />
        <Decks decks={this.props.decks} />
      </div>
    );
  }
}

export default Albums;
