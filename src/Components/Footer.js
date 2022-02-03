import React from "react";

import { ReactComponent as Dogs } from "../Assets/dogs.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <Dogs />
        </div>
        <p>Dogs. Alguns direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
