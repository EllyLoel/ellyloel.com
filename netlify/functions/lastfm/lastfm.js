const fetch = require("node-fetch");

const handler = async (event) => {
	try {
		const res = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USER}&api_key=${process.env.LASTFM_API_KEY}&format=json&limit=1`
		);
		const data = await res.json();
		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};

module.exports = { handler };
