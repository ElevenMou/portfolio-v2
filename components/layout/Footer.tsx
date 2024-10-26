import React from "react";
import SocialLinks from "./SocialLinks";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Moussa
          Saidi
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
