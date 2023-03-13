const { EleventyRenderPlugin } = require("@11ty/eleventy");

/**
 * @see https://github.com/photogabble/website/blob/main/utils/interlink-plugin/index.js
 */
module.exports = function (eleventyConfig, options = {}) {
	const opts = Object.assign(
		{
			defaultLayout: null,
			layoutKey: "embedLayout",
			unableToLocateEmbedFn: () => "[UNABLE TO LOCATE EMBED]",
			slugifyFn: (input) => {
				const slugify = eleventyConfig.getFilter("slugify");
				if (typeof slugify !== "function")
					throw new Error("Unable to load slugify filter.");

				return slugify(input);
			},
		},
		options
	);

	const rm = new EleventyRenderPlugin.RenderManager();

	// This regex finds all WikiLink style links: [[id|optional text]] as well as WikiLink style embeds: ![[id]]
	const wikiLinkRegExp = /(?<!!)(!?)\[\[([^|]+?)(\|([\s\S]+?))?\]\]/g;

	const parseWikiLink = (link) => {
		const isEmbed = link.startsWith("!");
		const parts = link
			.slice(isEmbed ? 3 : 2, -2)
			.split("|")
			.map((part) => part.trim());
		const slug = opts.slugifyFn(
			parts[0].replace(/.(md|markdown)\s?$/i, "").trim()
		);

		return {
			isEmbed,
			link,
			name: parts[0],
			slug,
			title: parts.length === 2 ? parts[1] : null,
		};
	};

	const parseWikiLinks = (arr) => arr.map((link) => parseWikiLink(link));

	const compileTemplate = async (data) => {
		if (compiledEmbeds.has(data.inputPath)) return;

		const frontMatter = data.template.frontMatter;

		const layout = data.data.hasOwnProperty(opts.layoutKey)
			? data.data[opts.layoutKey]
			: opts.defaultLayout;

		const tpl =
			layout === null
				? frontMatter.content
				: `{% layout "${layout}" %} {% block content %} ${frontMatter.content} {% endblock %}`;

		const fn = await rm.compile(tpl, data.page.templateSyntax, {
			templateConfig,
			extensionMap,
		});
		const result = await fn(data.data);

		compiledEmbeds.set(data.inputPath, result);
	};

	let templateConfig;
	eleventyConfig.on("eleventy.config", (cfg) => {
		templateConfig = cfg;
	});

	let extensionMap;
	eleventyConfig.on("eleventy.extensionmap", (map) => {
		extensionMap = map;
	});

	// Set of WikiLinks pointing to non-existent pages
	const deadWikiLinks = new Set();

	// Map of what WikiLinks to what
	const linkMapCache = new Map();

	// Map of WikiLinks that have triggered an embed compile
	const compiledEmbeds = new Map();

	eleventyConfig.on("eleventy.after", () => {
		deadWikiLinks.forEach((slug) =>
			console.warn(
				"[@photogabble/wikilinks]",
				"WARNING",
				`WikiLink found pointing to non-existent [${slug}], has been set to default stub.`
			)
		);
	});

	// Teach Markdown-It how to display MediaWiki Links.
	eleventyConfig.amendLibrary("md", (md) => {
		// WikiLink Embed
		md.inline.ruler.push("inline_wikilink_embed", (state, silent) => {
			// Have we found the start of a WikiLink Embed `![[`
			if (
				state.src.charAt(state.pos) === "!" &&
				state.src.substring(state.pos, state.pos + 3) === "![["
			) {
				if (!silent) {
					const token = state.push("inline_wikilink_embed", "", 0);
					const wikiLink = parseWikiLink(state.src);
					token.content = wikiLink.slug;
					state.pos = state.posMax;
				}
				return true;
			}
		});

		md.renderer.rules.inline_wikilink_embed = (tokens, idx) => {
			const token = tokens[idx];
			const link = linkMapCache.get(token.content);
			if (!link) {
				console.error(
					"[@photogabble/wikilinks]",
					"ERROR",
					`WikiLink Embed found pointing to non-existent [${token.content}], doesn't exist.`
				);
				return typeof opts.unableToLocateEmbedFn === "function"
					? opts.unableToLocateEmbedFn(token.content)
					: "";
			}

			const templateContent = compiledEmbeds.get(link.page.inputPath);
			if (!templateContent)
				throw new Error(
					`WikiLink Embed found pointing to [${token.content}], has no compiled template.`
				);

			return compiledEmbeds.get(link.page.inputPath);
		};

		// WikiLink via linkify
		md.linkify.add("[[", {
			validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
			normalize: (match) => {
				const wikiLink = parseWikiLink(match.raw);
				const found = linkMapCache.get(wikiLink.slug);

				if (!found) {
					deadWikiLinks.add(wikiLink.slug);
					match.text = wikiLink.title ?? wikiLink.name;
					match.url = "/stubs";
					return;
				}

				match.text = wikiLink.title ?? found.title;
				match.url = found.page.url;
			},
		});
	});

	// Add backlinks computed global data, this is executed before the templates are compiled and thus markdown parsed.
	eleventyConfig.addGlobalData("eleventyComputed", {
		backlinks: async (data) => {
			// @see https://www.11ty.dev/docs/data-computed/#declaring-your-dependencies
			const dependencies = [data.title, data.page, data.collections.all];
			if (
				dependencies[0] === undefined ||
				!dependencies[1].fileSlug ||
				dependencies[2].length === 0
			)
				return [];

			const compilePromises = [];
			const allPages = data.collections.all;
			const currentSlug = opts.slugifyFn(data.title);
			let backlinks = [];
			let currentSlugs = new Set([currentSlug, data.page.fileSlug]);
			const currentPage = allPages.find(
				(page) => page.inputPath === data.page.inputPath
			);

			// Populate our link map for use later in replacing WikiLinks with page permalinks.
			// Pages can list aliases in their front matter, if those exist we should map them
			// as well.

			linkMapCache.set(currentSlug, {
				page: data.collections.all.find(
					(page) => page.inputPath === data.page.inputPath
				),
				title: data.title,
			});

			// If a page has defined aliases, then add those to the link map. These must be unique.

			if (data.aliases) {
				for (const alias of data.aliases) {
					const aliasSlug = opts.slugifyFn(alias);
					linkMapCache.set(aliasSlug, {
						page: currentPage,
						title: alias,
					});
					currentSlugs.add(aliasSlug);
				}
			}

			// Loop over all pages and build their outbound links if they have not already been parsed.
			allPages.forEach((page) => {
				if (!page.data.outboundLinks) {
					const pageContent = page.template.frontMatter.content;
					const outboundLinks = pageContent.match(wikiLinkRegExp) || [];
					page.data.outboundLinks = parseWikiLinks(outboundLinks);

					page.data.outboundLinks
						.filter(
							(link) => link.isEmbed && compiledEmbeds.has(link.slug) === false
						)
						.map((link) =>
							allPages.find((page) => {
								const found =
									page.fileSlug === link.slug ||
									(page.data.title &&
										opts.slugifyFn(page.data.title) === link.slug);
								if (found) return true;

								const aliases = (page.aliases ?? []).reduce(function (
									set,
									alias
								) {
									set.add(opts.slugifyFn(alias));
									return set;
								},
								new Set());

								return aliases.has(link.slug);
							})
						)
						.filter((link) => typeof link !== undefined)
						.forEach((link) => compilePromises.push(compileTemplate(link)));
				}

				// If the page links to our current page either by its title or by its aliases then
				// add that page to our current page's backlinks.
				if (
					page.data.outboundLinks.some((link) => currentSlugs.has(link.slug))
				) {
					backlinks.push({
						url: page.url,
						title: page.data.title,
					});
				}
			});

			// Block iteration until compilation complete.
			if (compilePromises.length > 0) await Promise.all(compilePromises);

			// The backlinks for the current page.
			return backlinks;
		},
	});
};
