import React, { Component } from "react"

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

export default Stream;
