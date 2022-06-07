import React from "react";

import FooterComponent from "./";

export default {
  title: "Layout/Footer",
  component: FooterComponent,
};

export const Footer = () => <FooterComponent />;

Footer.story = {
  parameters: {
    nextRouter: {
      path: "/",
      asPath: "/",
      query: {},
    },
  },
};
