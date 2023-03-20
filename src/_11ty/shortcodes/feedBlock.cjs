module.exports = (content, feed) =>
	`
		<section class="[ ${feed.title
			.replace(/\s/gm, "-")
			.toLowerCase()} ] [ feed-block flow ]">
			<h2>
				${feed?.url ? `<a href="${feed.url}">${feed.title}</a>` : feed.title}
			</h2>
			<ul class="[ feed ]">
				${content}
			</ul>
		</section>
	`.trim();
