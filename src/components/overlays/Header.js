import React, { Component } from "react"
import { Link } from "react-router-dom"
import Stream from "./Stream"

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

class NavPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 0
    };
  }
  render() {
    return(<>
      <img className="navicon" src={this.props.src[this.state.hover]}
      onMouseOver={()=> {this.setState({hover:1})}}
      onMouseOut={()=>{this.setState({hover:0})}}
      alt="" />
      <p>{this.props.text}</p>
    </>)
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header">
        <>
          <div className="lan_select"
            onClick={(e) => this.props.actions.switchLang(e)}>
            TW / EN
          </div>
          <a className="log_select"
            href={process.env.PUBLIC_URL+"/noservice/login.html?conn_method=WebSocketSecure&remote_ip=nooxy.org&port=43581&redirect=/"}>
            {this.props.log?"Logout":"Login"}
          </a>
        </>
        <div className="container">
          <Link className="key" to="/">
            <img className="logo" src={logo} alt="" />
            <h4> - {this.props.localize.header.title} - </h4>
          </Link>

          <div className="navbar">
            <Link className="btn" to="/">
              <NavPic src={[hom_icon, hom_tri]} text={this.props.localize.header.Home}/>
            </Link>
            <a className="btn"
              href="https://www.facebook.com/gotoandplay.nctu/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <NavPic src={[fb_icon, fb_tri]} text={this.props.localize.header.Community}/>
            </a>
            <Link className="btn" to="/Albums">
              <NavPic src={[hom_icon, hom_tri]} text={this.props.localize.header.Albums}/>
            </Link>
            <Link className="btn" to="/AboutUs">
              <NavPic src={[abu_icon, abu_tri]} text={this.props.localize.header.AboutUs}/>
            </Link>
          </div>
        </div>
        <Stream playing={this.props.playing}
          activeBar={1}
          onClick={(e) => this.props.actions.switchMainStream(e)} />
      </div>
    );
  }
}

export default Header;
