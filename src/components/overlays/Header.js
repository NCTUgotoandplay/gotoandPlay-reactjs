import React, { Component } from "react"
import { Link } from "react-router-dom"

import Stream from "./Stream"
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// Sources
import logo from "../../imgs/favicon.png"
import hom_icon from "../../imgs/icons/home.png"
import hom_tri from "../../imgs/icons/home_triggered.png"
import alb_icon from "../../imgs/icons/playlist.png"
import alb_tri from "../../imgs/icons/playlist_triggered.png"
import fb_icon from "../../imgs/icons/fb.png"
import fb_tri from "../../imgs/icons/fb_triggered.png"
import abu_icon from "../../imgs/icons/us.png"
import abu_tri from "../../imgs/icons/us_triggered.png"

function judge_URL(this_URL, stand_URL){
  if(stand_URL == 'Home'){
    if(this_URL == 'Albums' | this_URL == 'AboutUs'){
      return 0;
    }
    else{
      return 1;
    }
  }
  else if(this_URL == stand_URL){
    return 1;
  }
  else{
    return 0;
  }
}

function new_URL(){
  var myURL = window.location.href;
  var myURL_split = myURL.split("/");
  var myURL_least = myURL_split[myURL_split.length-1];
}

class NavPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: this.props.set
    };
  }
  render() {
    return(
      <>
        <IconButton>
          <img className="navicon" src={this.props.src[this.state.hover]}
          onMouseOver={()=> {this.setState({hover:1})}}
          onMouseOut={()=>{this.setState({hover:this.props.set})}}
          alt="" />
        </IconButton>
        <p>{this.props.text}</p>
      </>
    )
  }
}


class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var myURL = window.location.href;
    var myURL_split = myURL.split("/");
    var myURL_least = myURL_split[myURL_split.length-1];
    return (
      <div className="header">
        <div className="tools">

          {!this.props.username?<div className="log_select">
            <a href={process.env.PUBLIC_URL+"/noservice/login.html?conn_method=WebSocketSecure&remote_ip=gotoandplay.nctu.edu.tw&port=43581&redirect=/"}>
              <Button  color="primary">
                {this.props.log?this.props.localize.logout:this.props.localize.login}
              </Button>
            </a>
          </div>:
          <div className="log_select">
            <Button color="primary" onClick={()=> {
              this.props.actions.logout();
            }}>
              {'Logout '+this.props.username}
            </Button>
          </div>
        }

          {this.props.show_admin?
            <div className="log_select">
              <Link to="/admin">
                <Button color="primary">
                  {this.props.localize.admin_page?this.props.localize.admin_page:'admin page'}
                </Button>
              </Link>
            </div>:null
          }
          <div className="lan_select">
            <Select value={this.props.lang} onChange={evt => {
                this.props.actions.updateLang(evt.target.value);
              }}>
              {Object.keys(this.props.lang2string).map(key=><MenuItem key={key} value={key}>{this.props.lang2string[key]}</MenuItem>)}
            </Select>
          </div>

        </div>
        <div className="container">
          <Link to="/">
            <div className="key">
              <img className="logo" src={logo} alt="" />
              <h4>{this.props.localize.header_title}</h4>
            </div>
          </Link>

          <div className="navbar">
          <script>createtable();</script>
            <Link className="btn" to="/">
              <NavPic src={[hom_icon, hom_tri]} text={this.props.localize.header_Home} set={[judge_URL(myURL_least, 'Home')]}/>
            </Link>
            <Link className="btn" to="/Albums">
              <NavPic src={[alb_icon, alb_tri]} text={this.props.localize.header_Albums} set={[judge_URL(myURL_least, 'Albums')]}/>
            </Link>
            <a className="btn"
              href="https://www.facebook.com/gotoandplay.nctu/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <NavPic src={[fb_icon, fb_tri]} text={this.props.localize.header_Community} set={[judge_URL(1, 0)]}/>
            </a>
            <Link className="btn" to="/AboutUs">
              <NavPic src={[abu_icon, abu_tri]} text={this.props.localize.header_AboutUs} set={[judge_URL(myURL_least, 'AboutUs')]}/>
            </Link>
          </div>
        </div>
        <Stream
          localize={this.props.localize}
          playing={this.props.playing}
          activeBar={1}
          onClick={(e) => this.props.actions.switchMainStream(e)} />
      </div>
    );
  }
}

export default Header;
