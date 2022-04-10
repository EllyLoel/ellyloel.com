import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon and PWA tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="hsl(162deg 82% 40%)" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/icons/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/images/icons/safari-pinned-tab.svg"
          color="hsl(162deg 82% 40%)"
        />
        <link rel="shortcut icon" href="/images/icons/favicon.ico" />
        <meta name="msapplication-TileColor" content="hsl(162deg 82% 40%)" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Stitches styles tag */}
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />

        {/* Google fonts tags */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
