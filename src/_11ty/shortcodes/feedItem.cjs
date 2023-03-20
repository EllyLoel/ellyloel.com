const { DateTime } = require("luxon");
const path = require("path");
const pluginFetch = require("@11ty/eleventy-fetch");
const pluginImage = require("@11ty/eleventy-img");
const markdown = require("../plugins/markdown.cjs");

module.exports = async (feedItem) => {
	let image = ``;
	if (
		(feedItem?.image && !feedItem?.image?.includes("v1.opengraph.11ty.dev")) ||
		(feedItem?.image?.includes("v1.opengraph.11ty.dev") &&
			Buffer.byteLength(await pluginFetch(feedItem.image)) !== 0)
	) {
		image = `<div slot="image">${pluginImage.generateHTML(
			await pluginImage(feedItem.image, {
				cacheOptions: {
					duration: "4w",
				},
				formats: ["avif", "webp", "jpeg"],
				outputDir: path.join("_site", "img"),
				widths: [300, 600, 1000],
			}),
			{
				alt: "",
				class: "[ image ]",
				decoding: "async",
				loading: "lazy",
				sizes: "450px",
			},
			{
				whiteSpace: "inline",
			}
		)}</div>`;
	}

	const date = feedItem?.created ? feedItem.created : feedItem?.modified;

	const isoDate = date
		? DateTime.fromJSDate(date, { zone: "utc" }).toISODate()
		: ``;

	const fullDate = date
		? DateTime.fromJSDate(date, { zone: "utc" }).toLocaleString(
				DateTime.DATE_FULL
		  )
		: ``;

	const label = feedItem?.created ? `Created` : `Last modified`;

	const stage = feedItem?.stage
		? `<span>
          <sl-tooltip content="${
						feedItem.stage[0].toUpperCase() + feedItem.stage.substring(1)
					}">
            <sl-icon class="[ icon ]" library="fa" name="fas-${
							feedItem.stage === "seedling" ? "seedling" : ""
						}${feedItem.stage === "budding" ? "spa" : ""}${
				feedItem.stage === "evergreen" ? "tree" : ""
		  }${feedItem.stage === "draft" ? "file-pen" : ""}${
				feedItem.stage === "complete" ? "circle-check" : ""
		  }" label="${
				feedItem.stage[0].toUpperCase() + feedItem.stage.substring(1)
		  }"></sl-icon>
          </sl-tooltip>
        </span>`
		: ``;

	return `<li class="${feedItem?.stage || ""}">
        <sl-card class="[ feed-item-card ]">
          ${image}
          <div ${
						feedItem.excerpt ? `slot="header"` : ``
					} class="[ feed-item-card-title ]">
            <p>
              ${stage}
              <a href="${feedItem.url}">${feedItem.title}</a>
            </p>
          </div>
          ${
						feedItem.excerpt
							? markdown.library.render(`${feedItem.excerpt}`)
							: ``
					}
          ${
						date || feedItem?.collection
							? `<div slot="footer" class="[ flex align-center ]">
                  ${
										date
											? `
                          <sl-tooltip content="${label} ${fullDate}">
                            <span class="[ flex align-center gap-1ch ]">
                              <sl-icon class="[ icon ]" library="fa" name="far-calendar${
																feedItem?.created ? `` : `-plus`
															}" label="${label}"></sl-icon>
                              <sl-relative-time class="[ date ]" date="${isoDate}" style="line-height: 1;"></sl-relative-time>
                            </span>
                          </sl-tooltip>
                        `
											: ``
									}
                  ${
										feedItem?.collection
											? `<a href="/${feedItem.collectionUrl.split("/")[1]}/">
                      <sl-badge variant="neutral" pill>
                        ${feedItem.collection}
                      </sl-badge>
                    </a>`
											: ``
									}
                </div>`
							: ``
					}
        </sl-card>
      </li>`;
};
