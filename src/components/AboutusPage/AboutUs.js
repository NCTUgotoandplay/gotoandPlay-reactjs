import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class AboutUs extends React.Component {
  render () {
    return (
      <div className="aboutpage">
      <div className="container">
        <div className="grid">
          <div className="top">
          </div>
          <div className="item-b">
          </div>
          <div className="mail">
            <h2>{this.props.localize.about_contact}</h2>
            <TextField label={this.props.localize.about_nickname} margin="dense"/>
            <TextField label={this.props.localize.about_email} margin="dense"/>
            <TextField label={this.props.localize.about_message} margin="dense"/>
            <Button variant="contained"  color="primary">
              送出
            </Button>
          </div>
          <div className="about">
            <h2>{this.props.localize.about_title}</h2>
            <p>{this.props.localize.about_p}</p>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default AboutUs;
