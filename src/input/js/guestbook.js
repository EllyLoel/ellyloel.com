const form = document.querySelector(`form[name="guestbook"]`);

const errorSummary = form.querySelector(".error-summary");
const errorSummaryMessage = errorSummary.querySelector("#error-summary-message");
const errorSummaryScribble = errorSummary.querySelector("#error-summary-scribble");
const errorSummaryScribbleAlt = errorSummary.querySelector("#error-summary-scribble-alt");
const errorSummaryName = errorSummary.querySelector("#error-summary-name");

const whichRadioScribble = form.querySelector("#scribble-radio");
const whichRadioMessage = form.querySelector("#message-radio");
const whichRadioBoth = form.querySelector("#both-radio");

const messageTextarea = form.querySelector("textarea#message");
const messageInputGroup = messageTextarea.closest(".input-group");
const messageError = messageInputGroup.querySelector("#message-error");

const scribbleFieldset = form.querySelector("#scribble-input-group");
const scribbler = scribbleFieldset.querySelector("#drawingCanvas");
const scribbleError = form.querySelector("#scribble-error");

const scribbleAltTextarea = form.querySelector("textarea#scribble-alt");
const scribbleAltInputGroup = scribbleAltTextarea.closest(".input-group");
const scribbleAltError = scribbleAltInputGroup.querySelector("#alt-error");

const nameInput = form.querySelector("input#name");
const nameError = form.querySelector("#name-error");

form.setAttribute("novalidate", "");
form.classList.add("js");
whichRadioBoth.checked = true;

whichRadioScribble.addEventListener("change", (event) => {
	messageInputGroup.setAttribute("hidden", "");
	messageTextarea.removeAttribute("required");

	scribbleFieldset.removeAttribute("hidden");
	scribbleFieldset.setAttribute("aria-required", "true");

	scribbleAltInputGroup.removeAttribute("hidden");
	scribbleAltTextarea.setAttribute("required", "");
});

whichRadioMessage.addEventListener("change", (event) => {
	scribbleFieldset.setAttribute("hidden", "");
	scribbleFieldset.removeAttribute("aria-required");

	scribbleAltInputGroup.setAttribute("hidden", "");
	scribbleAltTextarea.removeAttribute("required");

	messageInputGroup.removeAttribute("hidden");
	messageTextarea.setAttribute("required", "");
});

whichRadioBoth.addEventListener("change", (event) => {
	scribbleFieldset.removeAttribute("hidden");
	scribbleFieldset.setAttribute("aria-required", "true");

	scribbleAltInputGroup.removeAttribute("hidden");
	scribbleAltTextarea.setAttribute("required", "");

	messageInputGroup.removeAttribute("hidden");
	messageTextarea.setAttribute("required", "");
});

form.addEventListener("submit", (event) => {
	let hasError = false;

	messageError.setAttribute("hidden", "");
	scribbleError.setAttribute("hidden", "");
	scribbleAltError.setAttribute("hidden", "");
	nameError.setAttribute("hidden", "");

	errorSummary.setAttribute("hidden", "");
	errorSummaryMessage.setAttribute("hidden", "");
	errorSummaryScribble.setAttribute("hidden", "");
	errorSummaryScribbleAlt.setAttribute("hidden", "");
	errorSummaryName.setAttribute("hidden", "");

	messageTextarea.removeAttribute("aria-invalid");
	scribbleFieldset.removeAttribute("aria-invalid");
	scribbleAltTextarea.removeAttribute("aria-invalid");
	nameInput.removeAttribute("aria-invalid");

	if (!messageTextarea.value && (whichRadioMessage.checked || whichRadioBoth.checked)) {
		messageError.textContent = "Please include your message";
		messageError.removeAttribute("hidden");
		errorSummaryMessage.removeAttribute("hidden");
		messageTextarea.setAttribute("aria-invalid", "true");
		hasError = true;
	}

	if (whichRadioScribble.checked || whichRadioBoth.checked) {
		const ctx = scribbler.getContext("2d", { alpha: false });

		removeAlpha(ctx, scribbler);
		const scribbleInput = 
			document.querySelector(`input[type="hidden"][name="scribble"]`)
			|| document.createElement("input");
		scribbleInput.type = "hidden";
		scribbleInput.name = "scribble";
		scribbleInput.value = scribbler.toDataURL();
		scribbleFieldset.append(scribbleInput);

		if (!scribbleInput || isCanvasBlank(scribbleInput.value, scribbler.width, scribbler.height)) {
			scribbleError.textContent = "Please include your scribble";
			scribbleError.removeAttribute("hidden");
			errorSummaryScribble.removeAttribute("hidden");
			scribbleFieldset.setAttribute("aria-invalid", "true");
			hasError = true;
		};
	
		if (!scribbleAltTextarea.value) {
			scribbleAltError.textContent = "Please include a description of your scribble";
			scribbleAltError.removeAttribute("hidden");
			errorSummaryScribbleAlt.removeAttribute("hidden");
			scribbleAltTextarea.setAttribute("aria-invalid", "true");
			hasError = true;
		}
	} else {
		document.querySelector(`input[type="hidden"][name="scribble"]`)?.remove();
	}

	if (!nameInput.value) {
		nameError.textContent = "Please include your name";
		nameError.removeAttribute("hidden");
		errorSummaryName.removeAttribute("hidden");
		nameInput.setAttribute("aria-invalid", "true");
		hasError = true;
	}

	if (hasError) {
		event.preventDefault();
		errorSummary.removeAttribute("hidden");
		errorSummary.querySelector("h3").focus();
	}
});

function removeAlpha(ctx, canvas) {
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	const threshold = 128;

	// Process every pixel (RGBA)
	for (let i = 0; i < data.length; i += 4) {
		// Calculate grayscale value (using standard luminance formula)
		const gray = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);

		// Set RGB to either black (0) or white (255) based on threshold
		const value = gray > threshold ? 255 : 0;
		data[i] = value;			// R
		data[i + 1] = value;	// G
		data[i + 2] = value;	// B
	}

	ctx.putImageData(imageData, 0, 0);
}

function isCanvasBlank(canvasDataURL, canvasWidth, canvasHeight) {
	const blankCanvas = document.createElement("canvas");
	blankCanvas.width = canvasWidth;
	blankCanvas.height = canvasHeight;
	const ctx = blankCanvas.getContext("2d", { alpha: false });
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	return canvasDataURL === blankCanvas.toDataURL();
}
