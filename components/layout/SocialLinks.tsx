import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function SocialLinks() {
  return (
    <div className="social-links">
      <a href="https://github.com/ElevenMou" target="_blank" rel="noreferrer">
        <FaGithub />
        /ElevenMou
      </a>
      <a
        href="https://www.linkedin.com/in/moussasaidi/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin />
        /in/moussasaidi
      </a>
    </div>
  );
}

export default SocialLinks;
