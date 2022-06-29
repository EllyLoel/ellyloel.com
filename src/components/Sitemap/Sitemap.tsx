import React from "react";
import NextLink from "next/link";

import { styled } from "../../../stitches.config";
import Link from "../Link";

const Container = styled("div", {
  gridArea: "sitemap",
  display: "grid",
  gap: "$size3",
});

const Heading = styled("h3", {
  fontSize: "$fontSize7",
});

const List = styled("ul", {
  listStyle: "none",
  padding: 0,

  "& li": {
    padding: 0,
  },
});

const Sitemap = () => {
  return (
    <Container>
      <Heading>Sitemap</Heading>
      <nav>
        <List>
          <li>
            <NextLink href="/" passHref>
              <Link>Home</Link>
            </NextLink>
          </li>
          <li>
            <NextLink href="/about" passHref>
              <Link>About</Link>
            </NextLink>
          </li>
          <li>
            <NextLink href="/garden" passHref>
              <Link>Digital garden</Link>
            </NextLink>
          </li>
          <li>
            <NextLink href="/sitemap-0.xml" passHref>
              <Link>Sitemap.xml</Link>
            </NextLink>
          </li>
        </List>
      </nav>
    </Container>
  );
};

export default Sitemap;
