const markdownItAnchor = require("markdown-it-anchor");
const twemoji = require("twemoji");
const EleventyPluginImage = require("@11ty/eleventy-img");
const path = require("path");

// Customize Markdown library and settings:
module.exports = (eleventyConfig) => {
  let markdownLibrary = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(require("markdown-it-ins-del"))
    .disable("strikethrough")
    .use(require("markdown-it-sup"))
    .use(require("markdown-it-footnote"))
    .use(require("markdown-it-mark"))
    .use(require("markdown-it-abbr"))
    .use(require("markdown-it-emoji"))
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "direct-link",
        symbol: "🔗",
        level: [1, 2, 3, 4],
      }),
      slugify: eleventyConfig.getFilter("slugify"),
    })
    .use(
      require("markdown-it-wikilinks")({
        baseURL: "/",
        relativeBaseURL: "../",
        suffix: "",
        uriSuffix: "",
      })
    );

  markdownLibrary.renderer.rules.emoji = (token, idx) => {
    return twemoji.parse(token[idx].content);
  };

  markdownLibrary.renderer.rules.image = function (tokens, idx) {
    // responsive images with 11ty image
    // this overrides the default image renderer

    function figure(html, caption) {
      return `<figure>${html}<figcaption>${caption}</figcaption></figure>`;
    }

    const token = tokens[idx];
    let src = token.attrGet("src");
    const alt = token.content;
    let caption = "";
    for (let i = 1; i < tokens.length; i++) {
      if (tokens[i].type === "em_open") {
        tokens[i].hidden = true;
      }
      if (tokens[i].type === "text") {
        caption += tokens[i].content;
        tokens[i].content = "";
        tokens[i].hidden = true;
      }
      if (tokens[i].type === "link_open") {
        caption += `<a href="${tokens[i].attrs[0]}">`;
        tokens[i].hidden = true;
      }
      if (tokens[i].type === "link_close") {
        caption += `</a>`;
        tokens[i].hidden = true;
      }
      if (tokens[i].type === "em_close" || tokens[i].type === "softbreak") {
        tokens[i].hidden = true;
        break;
      }
    }

    const imageAttributes = {
      class: "[ image ]",
      alt,
      sizes: "(max-width: 768px) 100vw, 768px",
      loading: "lazy",
      decoding: "async",
    };

    if (src.startsWith("http")) {
      const metadata = { jpeg: [{ url: src }] };

      const generated = EleventyPluginImage.generateHTML(
        metadata,
        imageAttributes,
        { whitespaceMode: "inline" }
      );

      if (caption) {
        return figure(generated, caption);
      }
      return generated;
    }

    const widths = [250, 316, 426, 460, 580, 768];
    const options = {
      widths: widths
        .concat(widths.map((w) => w * 2)) // generate 2x sizes
        .filter((v, i, s) => s.indexOf(v) === i), // dedupe
      formats: ["avif", "webp", "jpeg"],
      outputDir: path.join("_site", "img"),
    };

    EleventyPluginImage(src, options);

    const metadata = EleventyPluginImage.statsSync(src, options);

    const generated = EleventyPluginImage.generateHTML(
      metadata,
      imageAttributes,
      { whitespaceMode: "inline" }
    );

    if (caption) {
      return figure(generated, caption);
    }
    return generated;
  };

  return markdownLibrary;
};
