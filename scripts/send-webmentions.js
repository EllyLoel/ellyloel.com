import Webmention from "../node_modules/@aciccarello/webmention";

const sendWebmentions = async () => {
	const limit = 10;
	const feedPath = "feed.atom";
	const baseUrl = "https://www.ellyloel.com";
	const feedUrl = new URL(feedPath, baseUrl).toString();

	try {
		await new Promise((resolve, reject) => {
			console.log(
				`Discovering Webmentions in ${feedUrl} with a limit of ${limit} ${
					limit === 1 ? "entry" : "entries"
				}`
			);
			console.log("");

			const wm = new Webmention({ limit, send: true });

			wm.on("error", (e) => reject(e));

			wm.on("endpoints", (res) => {
				if (res.length === 0) {
					if (wm.mentions.length) {
						console.log(
							`No webmention endpoints found on ${wm.mentions.length} entries`
						);
					} else {
						console.log("No webmention endpoints found");
					}
				} else {
					res.forEach(({ source, target }) => {
						console.log(`Found link to ${target} on ${source} page`);
					});
				}
				console.log("");
			});

			wm.on("sent", (res) => {
				console.log(
					`Sent ${res.source} to ${res.endpoint.url} (${res.endpoint.type})`
				);
				if (res.error) {
					console.log(`Error sending to ${res.endpoint.url}: ${res.error}`);
				}
				console.log("");
			});

			wm.on("end", () => {
				resolve();
			});

			wm.fetch(feedUrl);
		});
	} catch (e) {
		console.error(e);
	}
};

await sendWebmentions();
