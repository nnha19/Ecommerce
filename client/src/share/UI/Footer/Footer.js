import React from "react";

import "./Footer.css";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer-list-wrapper">
        <div>
          <ul className="footer_list">
            <li>Phone Number</li>
            <li>Another</li>
            <li>Email</li>
            <li>Address</li>
          </ul>
        </div>
        <div>
          <ul className="footer_list">
            <li>Careers</li>
            <li>Blog</li>
            <li>Help And Support</li>
            <li>Affiliate</li>
          </ul>
        </div>
        <div>
          <ul className="footer_list">
            <li>Return Policy</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
