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
