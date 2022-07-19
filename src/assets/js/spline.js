import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const spline = new Application(canvas);
spline
  .load("https://prod.spline.design/uA4Ruk690NPZEunt/scene.splinecode")
  .then(() => {
    spline.setZoom(0.45);
  });
