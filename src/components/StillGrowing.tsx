import React from "react";
import { styled } from "../../stitches.config";
import Link from "./Link";

export const Container = styled("div", {
  position: "relative",
  padding: "$size3 $size4",
  background: "$tealA9",
  borderRadius: "$radius3",
  color: "$accentBg",
  letterSpacing: "$fontLetterspacing1",
  textAlign: "center",

  "& strong": {
    fontSize: "1.5rem",
  },
});

const StillGrowing = () => (
  <Container>
    <em>
      <strong>
        <i className="twa twa-seedling"></i> Still Growing{" "}
        <i className="twa twa-evergreen-tree"></i>
      </strong>
      <br />
      <Link
        href={`https://twitter.com/intent/tweet?text=Hey%20%40ellyloel!%20You%20should%20finish%20writing%20your%20note%20about%20`}
      >
        Tweet
      </Link>{" "}
      at me to finish writing this!
    </em>
  </Container>
);

export default StillGrowing;
