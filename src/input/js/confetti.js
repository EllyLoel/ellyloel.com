import confetti from "canvas-confetti";

const newsletterForm = document.querySelector("form.newsletter");

if (newsletterForm) {
	newsletterForm.addEventListener("submit", (e) => {
		const newsletterButton = e.target.querySelector("button");
		confetti({
			disableForReducedMotion: true,
			origin: {
				x: 0.5,
				y:
					newsletterButton.getBoundingClientRect().top /
					document.documentElement.clientHeight,
			},
			particleCount: 100,
			spread: 70,
		});
	});
}
