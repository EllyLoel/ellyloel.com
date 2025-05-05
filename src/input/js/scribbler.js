/* eslint-disable sort-keys */

// Canvas configuration
const CANVAS_CONFIG = {
	fillStyle: "white",
	lineJoin: "round",
	lineCap: "round",
};

// Tool types
const TOOL_TYPES = {
	PENCIL: "pencil",
	ERASER: "eraser",
};

// Tool colors
const TOOL_COLORS = {
	[TOOL_TYPES.PENCIL]: "black",
	[TOOL_TYPES.ERASER]: "white",
};

function setupPaint() {
	const canvas = document.querySelector("canvas");
	if (!canvas) return;

	// Initialize canvas contexts
	const options = {
		alpha: false,
	};
	const ctx = canvas.getContext("2d", options);
	const memoryCanvas = createMemoryCanvas(canvas);
	const memoryCtx = memoryCanvas.getContext("2d", options);

	// Initialize canvas state
	initializeCanvas(canvas, ctx, memoryCtx);

	// Initialize drawing state
	const state = {
		points: [],
		started: false,
		baseStrokeWidth: getInitialStrokeWidth(),
		currentTool: TOOL_TYPES.PENCIL,
	};

	// Initialize history
	const history = createHistoryManager(canvas, ctx, memoryCtx);

	// Setup event listeners
	setupEventListeners(canvas, ctx, memoryCanvas, memoryCtx, state, history);

	// Initialize controls
	const controls = initializeControls(canvas, ctx, state);
	setupControlListeners(controls, canvas, ctx, memoryCtx, state, history);

	// Set initial state
	setTool(ctx, canvas, controls, TOOL_TYPES.PENCIL);
	setStrokeWidth(controls.medium, canvas, state);

	// Put the blank canvas into the undo list so the first stroke can be undone
	history.saveState();
}

function createMemoryCanvas(canvas) {
	const memoryCanvas = document.createElement("canvas");
	memoryCanvas.width = canvas.width;
	memoryCanvas.height = canvas.height;
	const ctx = memoryCanvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	ctx.fillStyle = CANVAS_CONFIG.fillStyle;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.lineJoin = CANVAS_CONFIG.lineJoin;
	ctx.lineCap = CANVAS_CONFIG.lineCap;
	return memoryCanvas;
}

function initializeCanvas(canvas, ctx) {
	ctx.imageSmoothingEnabled = false;
	ctx.fillStyle = CANVAS_CONFIG.fillStyle;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.lineJoin = CANVAS_CONFIG.lineJoin;
	ctx.lineCap = CANVAS_CONFIG.lineCap;
}

function setupEventListeners(canvas, ctx, memoryCanvas, memoryCtx, state, history) {
	// Mouse events
	canvas.addEventListener("mousedown", (event) => handleMouseDown(event, canvas, state, history));
	canvas.addEventListener("mousemove", (event) => handleMouseMove(event, canvas, ctx, memoryCtx, state));
	document.body.addEventListener("mouseup", () => handleMouseUp(canvas, ctx, memoryCanvas, memoryCtx, state));

	// Touch events
	canvas.addEventListener("touchstart", (event) => handleTouch(event, "mousedown", canvas));
	canvas.addEventListener("touchmove", (event) => handleTouch(event, "mousemove", canvas));
	canvas.addEventListener("touchend", (event) => handleTouch(event, "mouseup", canvas));

	// Prevent touch scrolling on the canvas
	["touchstart", "touchmove", "touchend"].forEach((eventType) => {
		canvas.addEventListener(eventType, (event) => {
			event.preventDefault();
		}, { passive: false });
	});
}

function initializeControls() {
	return {
		pencil: document.getElementById("pencil"),
		eraser: document.getElementById("eraser"),
		small: document.getElementById("small"),
		medium: document.getElementById("medium"),
		large: document.getElementById("large"),
		undo: document.getElementById("undo"),
		redo: document.getElementById("redo"),
		clear: document.getElementById("clear"),
	};
}

function setupControlListeners(controls, canvas, ctx, memoryCtx, state, history) {
	controls.pencil.addEventListener("click", () => setTool(ctx, canvas, controls, TOOL_TYPES.PENCIL));
	controls.eraser.addEventListener("click", () => setTool(ctx, canvas, controls, TOOL_TYPES.ERASER));
	
	[controls.small, controls.medium, controls.large].forEach(control => {
		control.addEventListener("click", () => setStrokeWidth(control, canvas, state));
	});

	controls.undo.addEventListener("click", () => history.undo());
	controls.redo.addEventListener("click", () => history.redo());
	controls.clear.addEventListener("click", () => {
		history.saveState();
		clearCanvas(ctx, memoryCtx);
	});
}

function getInitialStrokeWidth() {
	return parseInt(document.querySelector(`button[data-width][data-size][aria-pressed="true"]`).dataset.size);
}

function setTool(ctx, canvas, controls, tool) {
	ctx.strokeStyle = TOOL_COLORS[tool];
	ctx.fillStyle = TOOL_COLORS[tool];
	canvas.dataset.tool = tool;
	controls.pencil.setAttribute("aria-pressed", tool === TOOL_TYPES.PENCIL);
	controls.eraser.setAttribute("aria-pressed", tool === TOOL_TYPES.ERASER);
}

function setStrokeWidth(control, canvas, state) {
	document.querySelectorAll("button[data-width]").forEach(btn => {
		btn.setAttribute("aria-pressed", "false");
	});
	control.setAttribute("aria-pressed", "true");
	state.baseStrokeWidth = control.dataset.width;
	canvas.dataset.size = control.dataset.size;
}

function handleMouseDown(event, canvas, state, history) {
	const mouse = getMousePosition(event, canvas);
	state.points.push({ x: mouse.x, y: mouse.y });
	state.started = true;
	history.saveState();
}

function handleMouseMove(event, canvas, ctx, memoryCtx, state) {
	if (!state.started) return;

	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(memoryCtx.canvas, 0, 0);
	
	const mouse = getMousePosition(event, canvas);
	state.points.push({ x: mouse.x, y: mouse.y });
	drawPoints(ctx, state.points, state.baseStrokeWidth);
}

function handleMouseUp(canvas, ctx, memoryCanvas, memoryCtx, state) {
	if (!state.started) return;
	state.started = false;

	if (state.points.length === 1) {
		drawCircle(ctx, state.points[0]);
	}

	memoryCtx.fillRect(0, 0, memoryCtx.canvas.width, memoryCtx.canvas.height);
	memoryCtx.drawImage(ctx.canvas, 0, 0);

	state.points.length = 0;
}

function handleTouch(event, mouseEventType, canvas) {
	const options = mouseEventType === "mouseup" 
		? { bubbles: true }
		: {
			clientX: event.touches[0].pageX,
			clientY: event.touches[0].pageY,
		};
	canvas.dispatchEvent(new MouseEvent(mouseEventType, options));
}

function getMousePosition(event, canvas) {
	let element = canvas;
	let offsetX = 0;
	let offsetY = 0;

	while (element.offsetParent) {
		offsetX += element.offsetLeft;
		offsetY += element.offsetTop;
		element = element.offsetParent;
	}

	const scaleX = canvas.width / canvas.offsetWidth;
	const scaleY = canvas.height / canvas.offsetHeight;

	return {
		x: (event.pageX - offsetX) * scaleX,
		y: (event.pageY - offsetY) * scaleY,
	};
}

function drawPoints(ctx, points, strokeWidth) {
	if (points.length < 6) {
		drawCircle(ctx, points[0]);
		return;
	}

	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	
	for (let i = 1; i < points.length - 2; i++) {
		const c = (points[i].x + points[i + 1].x) / 2;
		const d = (points[i].y + points[i + 1].y) / 2;
		ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
		ctx.lineWidth = strokeWidth;
	}

	const last = points.length - 1;
	ctx.quadraticCurveTo(points[last - 1].x, points[last - 1].y, points[last].x, points[last].y);
	ctx.stroke();
}

function drawCircle(ctx, point) {
	ctx.beginPath();
	ctx.arc(point.x, point.y, ctx.lineWidth / 2, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
}

function clearCanvas(ctx, memoryCtx) {
	const previousFillStyle = ctx.fillStyle;
	ctx.fillStyle = CANVAS_CONFIG.fillStyle;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	memoryCtx.fillRect(0, 0, memoryCtx.canvas.width, memoryCtx.canvas.height);
	ctx.fillStyle = previousFillStyle;
}

function createHistoryManager(canvas, ctx, memoryCtx) {
	const history = {
		redoList: [],
		undoList: [],
		saveState(list, keepRedo = false) {
			if (!keepRedo) this.redoList = [];
			(list || this.undoList).push(canvas.toDataURL());
		},
		undo() {
			this.restoreState(this.undoList, this.redoList);
		},
		redo() {
			this.restoreState(this.redoList, this.undoList);
		},
		restoreState(pop, push) {
			if (!pop.length) return;
			this.saveState(push, true);
			const img = new Image(canvas.width, canvas.height);
			img.src = pop.pop();
			img.onload = () => {
				clearCanvas(ctx, memoryCtx);
				ctx.drawImage(img, 0, 0);
				memoryCtx.drawImage(img, 0, 0);
			};
		},
	};
	return history;
}

document.addEventListener("DOMContentLoaded", setupPaint);
