import React from 'react';

class AboutUS extends React.Component {
  render () {
    return (
      <div className="section aboutpage">
        <div className="container">
          <div className="top">
          </div>
          <div className="item-b">
          </div>
          <div className="mail">
            <h2>{this.props.text["contact"]}</h2>
            <input id="input_nickname" placeholder={this.props.text["nickname"]} type="text"/>
            <input id="input_email" placeholder={this.props.text["e-mail"]} type="text"/>
            <input id="input_message" placeholder={this.props.text["message"]} type="text"/>
            <button>送出</button>
          </div>
          <div className="about">
            <h2>{this.props.text["title"]}</h2>
            <p>{this.props.text["p"]}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUS;
