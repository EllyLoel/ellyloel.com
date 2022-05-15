import React from "react";
import * as NextImage from "next/image";
import { RouterContext } from "next/dist/shared/lib/router-context";

import { globalStyles } from "../src/components/globalStyles";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  layout: "fullscreen",
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "hsl(165, 60%, 98.8%)",
      },
      {
        name: "dark",
        value: "hsl(168 48.0% 6.5%)",
      },
    ],
  },
};

export const decorators = [
  (Story) => {
    globalStyles();
    return (
      <>
        <Story />
      </>
    );
  },
];
