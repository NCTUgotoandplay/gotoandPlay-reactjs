import React, { Component } from "react"
import { Link } from "react-router-dom"
import Stream from "./Stream"

const NavPic = (props) => (
  <>
    <img className="navicon" src={props.src[0]} alt="" />
    <img className="navicon overlay" src={props.src[1]} alt="" />
    <p>{props.text}</p>
  </>
)

class Header extends Component {
  renderNav(i) {
    if ( i === "Home" ) {
      return (
        <Link className="btn" to="">
          <NavPic src={this.props.picsrc[i]} text={this.props.text[i]}/>
        </Link>
      );
    }
    else if ( i === "Community") {
      return (
        <a className="btn"
          href="https://www.facebook.com/gotoandplay.nctu/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <NavPic src={this.props.picsrc[i]} text={this.props.text[i]}/>
        </a>
      );
    }
    else {
      return (
        <Link className="btn" to={i}>
          <NavPic src={this.props.picsrc[i]} text={this.props.text[i]}/>
        </Link>
      );
    }
  }
  render() {
    return (
      <div className="header">
        <>
          <div className="lan_select"
            onClick={(e) => this.props.selectLanguage(e)}>
            TW / EN
          </div>
          <a className="log_select"
            href={process.env.PUBLIC_URL+"/noservice/login.html?conn_method=WebSocketSecure&remote_ip=nooxy.org&port=43581&redirect=/"}>
            {this.props.log?"Logout":"Login"}
          </a>
        </>
        <div className="container">
          <Link className="key" to="/">
            <img className="logo" src={this.props.logo} alt="" />
            <h4> - {this.props.title} - </h4>
          </Link>
          <div className="navbar">
            {this.renderNav("Home")}
            {this.renderNav("Albums")}
            {this.renderNav("Community")}
            {this.renderNav("AboutUs")}
          </div>
        </div>
        <Stream playing={this.props.playing}
          activeBar={1}
          onClick={(e) => this.props.clickMainStream(e)} />
      </div>
    );
  }
}

export default Header;
