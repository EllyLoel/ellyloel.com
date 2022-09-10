import { Application } from "@splinetool/runtime";

if (window.matchMedia("(min-width: 768px)").matches) {
  const lego = document.getElementById("lego");
  const picture = document.querySelector("#lego > picture");
  const image = document.querySelector("#lego > picture > img");
  const canvas = document.createElement("canvas");
  const paragraph = (document.createElement("p").innerText =
    "A 3D modeled Lego Minifigure designed to look like myself.");
  const spline = new Application(canvas);

  spline
    .load("https://prod.spline.design/uA4Ruk690NPZEunt/scene.splinecode")
    .then(() => {
      spline.setZoom(0.6);
    });

  const observer = new MutationObserver(() => {
    setTimeout(() => {
      picture.style.display = "none";
      canvas.style.visibility = "visible";
    }, 100);
  });

  canvas.append(paragraph);
  lego.append(canvas);
  observer.observe(canvas, { attributes: true });
}
