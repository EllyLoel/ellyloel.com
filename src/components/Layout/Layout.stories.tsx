import React from "react";

import LayoutComponent from "./";

export default {
  title: "Layout/Layout",
  component: LayoutComponent,
};

export const Layout = () => (
  <LayoutComponent>
    <div>Test</div>
  </LayoutComponent>
);

Layout.story = {
  parameters: {
    nextRouter: {
      path: "/",
      asPath: "/",
      query: {},
    },
  },
};
