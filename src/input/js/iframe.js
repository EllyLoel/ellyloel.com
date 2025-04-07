const codepenIframes = document.querySelectorAll('iframe[src*="codepen.io"]');

codepenIframes.forEach((codepenIframe) => {
	if (/dark/.test(document.documentElement.classList[0])) {
		codepenIframe.setAttribute(
			"src",
			codepenIframe.src.replace(/theme-id=light/gm, "theme-id=dark")
		);
	}
});
