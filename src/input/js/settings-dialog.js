const settingsDialogOpenButton = document.querySelector("#settings-dialog-open-button");
const settingsDialog = document.querySelector(".settings-dialog");

settingsDialogOpenButton.addEventListener("click", (event) => {
	settingsDialog.showModal();
});
