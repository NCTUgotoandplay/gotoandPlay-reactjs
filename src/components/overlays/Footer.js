import React from "react"

const Footer = (props) => (
  <div className="footer">
    <div className="container">
      <h5> {props.localize.copyright} </h5>
    </div>
  </div>
)

export default Footer;
