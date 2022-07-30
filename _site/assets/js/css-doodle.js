import "css-doodle";

Array.from(document.querySelectorAll("css-doodle")).forEach((doodle) => {
  doodle.addEventListener("click", (e) => {
    doodle.update();
  });
});
