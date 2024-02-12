import "@shoelace-style/shoelace/dist/components/animated-image/animated-image.js";
import "@shoelace-style/shoelace/dist/components/avatar/avatar.js";
import "@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js";
import "@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js";
import "@shoelace-style/shoelace/dist/components/drawer/drawer.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/option/option.js";
import "@shoelace-style/shoelace/dist/components/radio-button/radio-button.js";
import "@shoelace-style/shoelace/dist/components/radio-group/radio-group.js";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";

import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";

setBasePath(
	"https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.6.0/dist/"
);

registerIconLibrary("fa", {
	mutator: (svg) => svg.setAttribute("fill", "currentColor"),
	resolver: (name) => {
		const filename = name.replace(/^fa[rbs]-/, "");
		let folder = "regular";
		if (name.substring(0, 4) === "fas-") folder = "solid";
		if (name.substring(0, 4) === "fab-") folder = "brands";
		return `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/svgs/${folder}/${filename}.svg`;
	},
});
