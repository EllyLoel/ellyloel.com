const itemStyles = {
  padding: "8px 12px",
  userSelect: "none",
  borderRadius: 4,
  color: "$brand",

  "&:focus-visible": {
    position: "relative",
    outline: "2px solid hsl($brandHsl / 0.6)",
  },

  "&:hover": {
    backgroundColor: "hsl($brandHsl / 0.125)",
  },
};

export default itemStyles;
