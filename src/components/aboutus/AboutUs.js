import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class AboutUs extends React.Component {
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
            <TextField label={this.props.text["nickname"]} margin="dense"/>
            <TextField label={this.props.text["e-mail"]} margin="dense"/>
            <TextField label={this.props.text["message"]} margin="dense"/>
            <Button variant="contained"  color="primary">
              送出
            </Button>
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

export default AboutUs;
