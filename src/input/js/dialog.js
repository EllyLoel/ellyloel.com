const closedBySupported = (
	typeof HTMLDialogElement !== "undefined" &&
	typeof HTMLDialogElement.prototype === "object" &&
	"closedBy" in HTMLDialogElement.prototype
);

// click outside the dialog handler
const lightDismiss = ({ target }) => {
	if (
		!closedBySupported &&
		target.getAttribute("closedby") === "any" &&
		target.nodeName === "DIALOG" &&
		target.childElementCount === 1 &&
		target.children[0].classList.contains("container")
	) {
		target.close("dismiss");
	}
};

for (const dialog of document.querySelectorAll("dialog")) {
	dialog.addEventListener("click", lightDismiss);
}
