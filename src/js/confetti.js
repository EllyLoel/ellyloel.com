import confetti from "canvas-confetti";

const newsletterForm = document.querySelector("form.newsletter");

newsletterForm.addEventListener("submit", (e) => {
  const newsletterButton = e.target.querySelector("button");
  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: 0.5,
      y:
        newsletterButton.getBoundingClientRect().top /
        document.documentElement.clientHeight,
    },
    disableForReducedMotion: true,
  });
});
