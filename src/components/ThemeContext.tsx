import React, { createContext, useState, useEffect, useMemo } from "react";

import { COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP } from "../constants";

export type IThemeContext = {
  colorMode: string | undefined;
  setColorMode: (newValue: string | undefined) => void;
};

export const ThemeContext = createContext<IThemeContext>({
  colorMode: undefined,
  setColorMode: (newValue) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, rawSetColorMode] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Because colors matter so much for the initial page view, we're
    // doing a lot of the work in gatsby-ssr. That way it can happen before
    // the React component tree mounts.
    // const initialColorValue =
    //   window.document.documentElement.style.getPropertyValue(
    //     INITIAL_COLOR_MODE_CSS_PROP
    //   );
    // rawSetColorMode(initialColorValue);
    // window.matchMedia("(prefers-color-scheme: dark)").onchange = () => {
    //   if (colorMode === "system") {
    //     rawSetColorMode(undefined);
    //     rawSetColorMode("system");
    //   }
    // };
  }, []);

  const contextValue = useMemo(() => {
    function setColorMode(newValue: string | undefined) {
      newValue === ("system" || undefined)
        ? localStorage.removeItem(COLOR_MODE_KEY)
        : localStorage.setItem(COLOR_MODE_KEY, newValue ?? "");

      rawSetColorMode(newValue);
    }

    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode, rawSetColorMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
