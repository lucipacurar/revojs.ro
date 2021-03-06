import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

import Card from "./Card";

import "./cardPhotos.scss";

export default ({ href, img, heading, ...props }) => {
  return (
    <OutboundLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-photos-link"
    >
      <Card img={img} heading={heading} {...props}></Card>
    </OutboundLink>
  );
};
