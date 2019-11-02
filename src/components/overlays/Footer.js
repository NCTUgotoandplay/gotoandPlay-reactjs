import React from "react"
import Logo from "../../imgs/cover.png"

const Footer = (props) => (
  <div className="footer">
    <div className="container">
      <div className="footer-information">
        <img className="logo" src={Logo}/>
        <h2>{props.localize.header_title}</h2>
        <p>{props.slogan}</p>
        <p>{props.localize.email+': gotoandplaynctu@gmail.com'}</p>
        <p>{props.localize.address+': 台灣新竹縣竹北市六家五路一段一號30272'}</p>
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
