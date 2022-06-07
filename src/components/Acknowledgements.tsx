import React from "react";
import { styled } from "../../stitches.config";

export const Container = styled("div", {
  gridArea: "acknowledgements",
  display: "grid",
  gap: "$size3",
});

const StillGrowing = () => (
  <Container>
    <img
      src="https://portable.com.au/static/indigenous-flags-cdab0e2d645921452f52214d287a6ad8.svg"
      alt="Australian Aboriginal flag and Torres Straight Islands flag"
    />
    <p>
      In the spirit of reconciliation I acknowledge the Traditional Custodians
      of country throughout Australia and their connections to land, sea and
      community. I pay my respect to their Elders past and present and extend
      that respect to all Aboriginal and Torres Strait Islander peoples today.
    </p>
    <img
      src="https://portable.com.au/static/lgbtqi-flag-f5bb55633eb9994536e59f6927a37cbb.svg"
      alt="LGBTQI+ flag"
    />
    <p>I am a proud member of the queer community.</p>
  </Container>
);

export default StillGrowing;
