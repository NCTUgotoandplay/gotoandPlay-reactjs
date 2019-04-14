import React, { Component } from 'react';

class TalkRoom extends Component {
  render() {
    return (
      <div class="chat">
        <div class="chat_room cr2">
          <div class="chat_icon"><i class="material-icons" id="chat_icon">chat</i></div>
        </div>
        <div class="chat_room cr1">
          <div class="head">
            <div id="open_chat"></div><i class="material-icons close" id="close_chat">clear</i>
          </div>
          <iframe title="nxtalk" class="board" src="https://talk.nooxy.org/noservice/signin"></iframe>
        </div>
      </div>
    );
  }
}

export default TalkRoom;
