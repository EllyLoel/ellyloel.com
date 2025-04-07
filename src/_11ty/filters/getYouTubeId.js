/* eslint-disable no-useless-escape */
export default (url) => {
	if (!url) return "";

	let ytId = "";

	url = url
		.replace(/(>|<)/gi, "")
		.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

	if (url[2] !== undefined) {
		ytId = url[2].split(/[^0-9a-z_\-]/i);
		ytId = ytId[0];
	} else {
		ytId = url;
	}

	return ytId;
};
