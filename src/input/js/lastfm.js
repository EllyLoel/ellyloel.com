(async () => {
	const res = await fetch(`/api/lastfm`);
	const data = await res.json();

	const song = data.recenttracks.track[0].name;
	const artist = data.recenttracks.track[0].artist["#text"];
	const url = data.recenttracks.track[0].url;

	const linkEl = document.querySelector(".lastfm-playing > .song");
	const songEl = document.querySelector(".lastfm-playing > .song > span");
	const artistEl = document.querySelector(".lastfm-playing > .artist");

	linkEl.setAttribute("href", url);
	songEl.innerHTML = song;
	artistEl.innerHTML = artist;
})();
