const browserslist = require("browserslist");
const path = require("node:path");
const sass = require("sass");
const parcelcss = require("@parcel/css");
// Use sane defaults from browserslist, see: https://github.com/browserslist/browserslist#best-practices
let targets = parcelcss.browserslistToTargets(browserslist("defaults"));

const isProduction = process.env.ELEVENTY_ENV === "production";

module.exports = class {
  async data() {
    return {
      // Permalink in output directory
      permalink: "assets/styles/default.css",
      eleventyExcludeFromCollections: true,
    };
  }

  async render() {
    // Compile from default.scss in the same path as this styles.11ty.js file
    let css = sass.compile(path.join(__dirname, "default.scss")).css;
    // Parcel CSS for vendor prefixing, syntax lowering and minification
    let { code } = parcelcss.transform({
      filename: "", // Won't be used, but is required
      code: Buffer.from(css),
      minify: isProduction, // Minify in production context, otherwise don't
      sourceMap: false,
      targets: targets, // targets form browserslist
    });
    return code;
  }
};
