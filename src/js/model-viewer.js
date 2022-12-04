import "@google/model-viewer";

const modelViewerEl = document.querySelector("model-viewer");
const poster = modelViewerEl.querySelector("#poster");

// I wanna keep the wiggle prompt but not the little prompt icon.
modelViewerEl.shadowRoot.querySelector("#prompt").remove();

modelViewerEl.addEventListener("model-visibility", () => {
  poster.animate([{ opacity: "100%" }, { opacity: "0%" }], {
    fill: "forwards",
    easing: "ease",
    duration: 500,
  });
  poster.onfinish = () => {
    poster.style.display = "none";
  };
});
