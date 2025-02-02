export default (content, feed) => `
		<section class="[ ${feed.title
			.replace(/\s/gm, "-")
			.toLowerCase()} ] [ h-feed ] [ feed-block flow ]">
			<h2 class="[ p-name ]">
				${feed?.url ? `<a href="${feed.url}">${feed.title}</a>` : feed.title}
			</h2>
			<ul class="[ feed ]">
				${content}
			</ul>
		</section>
`.trim();
