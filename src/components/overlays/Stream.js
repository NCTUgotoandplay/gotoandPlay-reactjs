import React, { Component } from "react"
import PlayCircleFilledIcon from '@material-ui/icons/PlayArrow';
import PauseCircleFilledIcon from '@material-ui/icons/Pause';
import Fab from '@material-ui/core/Fab';

import IconButton from '@material-ui/core/IconButton';

class Stream extends Component {
  render () {
    return (
      <div className="stream">
        <div className="bar">收聽串流</div>
        <Fab size="large" color="white" onClick={this.props.onClick}>
          {this.props.playing?<PauseCircleFilledIcon />:<PlayCircleFilledIcon />}
        </Fab>
      </div>
    );
  }
}

export default Stream;
