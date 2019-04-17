import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom"

class AboutUs extends React.Component {
  render () {
    return (
      <div className="aboutpage">
      <div className="container">
        <div className="grid">
          <div className="top">
          </div>
          <div className="mail">

            <div className="block">
              <h2>{this.props.localize.about_contact}</h2>
              <FormControl>
                <TextField label={this.props.localize.about_nickname} margin="dense"/>
                <TextField label={this.props.localize.about_email} margin="dense"/>
                <TextField label={this.props.localize.about_message} margin="dense"/>
                <Button variant="contained"  color="primary">
                  送出
                </Button>
              </FormControl>
            </div>
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
