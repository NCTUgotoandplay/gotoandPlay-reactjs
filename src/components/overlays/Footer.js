import React from "react"

const Footer = (props) => (
  <div className="footer">
    <div className="container">
      <div className="footer-information">
        <h2>goto&Play</h2>
        <p>We play, we work, we create.</p>
      </div>
      <p className="copyright"> {props.localize.copyright} </p>
    </div>
  </div>
)

export default Footer;
