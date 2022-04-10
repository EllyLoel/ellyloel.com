import React from "react";

import { NavMenu } from "./";
import NavigationMenuDemo from "./DocsExample";

export default {
  title: "Navigation Menu",
  component: NavMenu,
};

export const Basic = () => <NavMenu />;

export const RadixDocsExample = (props: object) => (
  <NavigationMenuDemo {...props} />
);
