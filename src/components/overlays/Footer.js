import React from "react"
import Logo from "../../imgs/cover.png"

const Footer = (props) => (
  <div className="footer">
    <div className="container">
      <div className="footer-information">
        <img className="logo" src={Logo}/>
        <h2>goto&Play</h2>
        <p>We play, we work, we create.</p>
        <p>Email: gotoandplaynctu@gmail.com</p>
      </div>
      <p className="copyright">
        <span>{props.localize.copyright}</span>
        <br/>
        <a href="https://nooxy.org" target="_blank"><span>{'2019- site powered by NOOXY NoService.'}</span></a>
      </p>
    </div>
  </div>
)

export default Footer;
