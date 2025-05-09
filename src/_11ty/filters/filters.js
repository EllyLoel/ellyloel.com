import addNonBreakingSpace from "./addNonBreakingSpace.js";
import arrayFilter from "./arrayFilter.js";
import backlinks from "./backlinks.js";
import dateObj from "./dateObj.js";
import dateToISO from "./dateToISO.js";
import dateToLocale from "./dateToLocale.js";
import dateToRelative from "./dateToRelative.js";
import excerpt from "./excerpt.js";
import filterTagList from "./filterTagList.js";
import getAllTags from "./getAllTags.js";
import getDomain from "./getDomain.js";
import getLatestCollectionItemDate from "./getLatestCollectionItemDate.js";
import getUrlExtension from "./getUrlExtension.js";
import getYouTubeId from "./getYouTubeId.js";
import imageLink from "./imageLink.js";
import includes from "./includes.js";
import limit from "./limit.js";
import md from "./md.js";
import newUrl from "./newUrl.js";
import objKeys from "./objKeys.js";
import removeRandomLink from "./removeRandomLink.js";
import split from "./split.js";
import unique from "./unique.js";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.addFilter("addNonBreakingSpace", addNonBreakingSpace);
	eleventyConfig.addFilter("arrayFilter", arrayFilter);
	eleventyConfig.addFilter("backlinks", backlinks);
	eleventyConfig.addFilter("dateObj", dateObj);
	eleventyConfig.addFilter("dateToISO", dateToISO);
	eleventyConfig.addFilter("dateToLocale", dateToLocale);
	eleventyConfig.addFilter("dateToRelative", dateToRelative);
	eleventyConfig.addFilter("excerpt", excerpt);
	eleventyConfig.addFilter("filterTagList", filterTagList);
	eleventyConfig.addFilter("getAllTags", getAllTags);
	eleventyConfig.addFilter("getDomain", getDomain);
	eleventyConfig.addFilter("getLatestCollectionItemDate", getLatestCollectionItemDate);
	eleventyConfig.addFilter("getUrlExtension", getUrlExtension);
	eleventyConfig.addFilter("getYouTubeId", getYouTubeId);
	eleventyConfig.addFilter("imageLink", imageLink);
	eleventyConfig.addFilter("includes", includes);
	eleventyConfig.addFilter("limit", limit);
	eleventyConfig.addFilter("md", md);
	eleventyConfig.addFilter("newUrl", newUrl);
	eleventyConfig.addFilter("objKeys", objKeys);
	eleventyConfig.addFilter("removeRandomLink", removeRandomLink);
	eleventyConfig.addFilter("split", split);
	eleventyConfig.addFilter("unique", unique);
}
