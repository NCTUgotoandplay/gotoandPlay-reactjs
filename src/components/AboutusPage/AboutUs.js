import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom"

class AboutUs extends React.Component {
  render () {
    return (
      <div className="aboutpage">
        <h2>{this.props.localize.about_title}</h2>
        <p>Loading...</p>
      </div>
    );
  }
}

export default AboutUs;
