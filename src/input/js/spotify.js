(async () => {
	const res = await fetch(`/lastfm`);
	const data = await res.json();

	const song = data.recenttracks.track[0].name;
	const artist = data.recenttracks.track[0].artist["#text"];
	const url = data.recenttracks.track[0].url;

	const songEl = document.querySelector(".spotify-playing > .song");
	const artistEl = document.querySelector(".spotify-playing > .artist");

	songEl.innerHTML = song;
	songEl.setAttribute("href", url);
	artistEl.innerHTML = artist;
})();
