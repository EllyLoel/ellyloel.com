import Image from "next/image";
import React from "react";

import { styled } from "../../../../stitches.config";
import Newsletter from "../../Newsletter";
import Sitemap from "../../Sitemap";
import SocialLinks from "../../SocialLinks";
import Acknowledgements from "../../Acknowledgements";

const FooterStyled = styled("footer", {
  backgroundColor: "$accentSolid",
  color: "$accentBase",
  gridRow: "3 / 4",
  paddingInline: "$size3",
  paddingBlock: "$size10",
  paddingBlockEnd: "calc($size10 + 6.5rem)", // clearance for mobile nav

  "@laptopAndUp": {
    paddingBlockEnd: "$size10",
  },
});

const Container = styled("div", {
  marginInline: "auto",
  maxInlineSize: "$sizeContent3",
  display: "grid",
  gap: "$size8",
  gridTemplateColumns: "1fr",
  gridTemplateAreas: `
  "newsletter"
  "sitemap"
  "acknowledgements"
  "social-links"`,

  "& > img": {
    display: "none",
  },

  "@laptopAndUp": {
    maxInlineSize: "calc(1000rem / 16)",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: `
      "newsletter lego"
      "sitemap acknowledgements"
      "social-links acknowledgements"`,

    "& > img": {
      display: "revert",
    },
  },
});

const Footer = () => {
  return (
    <FooterStyled className="full-bleed">
      <Container>
        <Newsletter />
        <Sitemap />
        <Acknowledgements />
        <SocialLinks />
        <img src="/images/ClubPenguin.png" alt="" />
      </Container>
    </FooterStyled>
  );
};

export default Footer;
