import React from "react";
import { SocialIcon } from "react-social-icons";

const socials = [
  "https://www.instagram.com/denounceddisgraced/",
  "https://www.youtube.com/@DenouncedDisgraced",
  "https://www.facebook.com/denounceddisgracedband",
];

export const SocialIcons = () => {
  return (
    <div className="social-icons">
      {socials.map((url) => (
        <SocialIcon url={url} bgColor="#e4e6eb" />
      ))}
    </div>
  );
};
