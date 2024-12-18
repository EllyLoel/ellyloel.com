// @see {@link https://developers.cloudflare.com/pages/functions/api-reference/}
export const onRequest = async () => {
	try {
		const res = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USER}&api_key=${process.env.LASTFM_API_KEY}&format=json&limit=1`
		);
		const data = await res.json();
		return {
			body: JSON.stringify(data),
			statusCode: 200,
		};
	} catch (error) {
		return {
			body: error.toString(),
			statusCode: 500,
		};
	}
};
