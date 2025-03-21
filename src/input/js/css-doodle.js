import "css-doodle";

const updateDoodleButton = document.querySelector("#update-doodle");
const doodle = document.querySelector("css-doodle");

updateDoodleButton.addEventListener("click", () => {
	doodle.update();
});
