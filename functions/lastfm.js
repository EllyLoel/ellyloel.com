// @see {@link https://developers.cloudflare.com/pages/functions/api-reference/}
export const onRequest = async (context) => {
	try {
		const res = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${context.env.LASTFM_USER}&api_key=${context.env.LASTFM_API_KEY}&format=json&limit=1`
		);
		const data = await res.json();

		return new Response(JSON.stringify(data), {
			status: 200,
		});
	} catch (error) {
		return new Response(error.toString(), {
			status: 500,
		});
	}
};
