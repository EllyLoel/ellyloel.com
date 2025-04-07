// Copyright 2018-2020 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/disjoint-force-directed-graph

// Copyright 2018-2023 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/disjoint-force-directed-graph/2

// Somewhat heavily modified

import * as d3 from "d3";

export function ForceGraph(
	{
		nodes,
		links,
	},
	{
		getNodeId,
		getNodeGroup,
		getNodeTitle,
		nodeFill = "currentColor",
		nodeStroke = "CanvasText",
		nodeStrokeWidth = 0.5, // in pixels
		nodeRadius = 5, // in pixels
		linkStroke = "CanvasText",
		linkStrokeWidth = 1.5, // in pixels
		linkStrokeLinecap = "round",
		colors = d3.schemeTableau10, // an array of color strings, for the node groups
		symbols = d3.symbolsFill, // an array of symbol types for the node groups
		width = 640, // outer width, in pixels
		height = 400, // outer height, in pixels
		enableZoom = true,
		zoomExtent = [0.1, 10], // zoom scale extent [min, max]
		hasBeenZoomed = false,
		hasBeenDragged = false,
	} = {}
) {
	let nodeGroups = d3
		.map(nodes, getNodeGroup)
		.map((nodeGroup) => (
			nodeGroup !== null && typeof nodeGroup === "object"
				? nodeGroup.valueOf()
				: nodeGroup
		));
	nodeGroups = d3.sort(nodeGroups);

	// The force simulation mutates links and nodes, so create a copy
	// so that re-evaluating this cell produces the same result
	nodes = d3.map(nodes, (d) => ({...d}));
	links = d3.map(links, (d) => ({...d}));

	// Construct the scales
	const colorScale = d3.scaleOrdinal(nodeGroups, colors);
	const symbolScale = d3.scaleOrdinal(nodeGroups, symbols);

	// Create a simulation with several forces
	const simulation = d3
		.forceSimulation(nodes)
		.force("link", d3.forceLink(links).id(getNodeId).strength(0.5))
		.force("charge", d3.forceManyBody().strength(-75))
		.force("x", d3.forceX())
		.force("y", d3.forceY());

	// Create the SVG container
	const svg = d3
		.create("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", [-width / 2, -height / 2, width, height]);

	// Give the SVG an accessible name
	svg
		.append("title")
		.text("Force-directed pages and links graph");

	// Create a container group for all elements that will be transformed by zoom
	const container = svg.append("g");

	// Create the link container and the links
	const link = container
		.append("g")
		.attr("aria-hidden", "true")
		.attr("stroke", linkStroke)
		.attr("stroke-width", linkStrokeWidth)
		.attr("stroke-linecap", linkStrokeLinecap)
		.attr("stroke-opacity", "0.6")
		.selectAll("line")
		.data(links)
		.join("line");

	// Create the node container and the nodes
	const nodeContainer = container
		.append("g")
		.attr("fill", nodeFill)
		.attr("stroke", nodeStroke)
		.attr("stroke-width", nodeStrokeWidth)

	const node = nodeContainer
		.selectAll("g")
		.data(nodes)
		.join("g");

	const button = node
		.append("foreignObject")
		.attr("class", "[ block ]")
		.attr("width", 0) // Initial width, will be updated
		.attr("height", 0) // Initial height, will be updated
		.attr("x", 0) // Center the foreignObject
		.attr("y", 0)
		.append("xhtml:button")
		.attr("id", (d) => `graph-${d.id.replace("https://", "").replaceAll(/[^a-zA-Z0-9_-]/g, "")}`)
		.attr("class", "[ button-reset ][ block ]")
		.on("click", (event, node) => {
			const graphDialog = d3.select("#graph-dialog");

			graphDialog.selectAll("h2 a").remove();

			graphDialog
				.select("h2")
				.append("a")
				.text(node.group && node.name.toLowerCase() !== node.group.toLowerCase() ? `${node.name} (${node.group})` : node.name)
				.attr("href", node.id);

			graphDialog.selectAll("details :is(ul, p)").remove();

			if (node?.backlinks?.length) {
				graphDialog.select("details.incoming-links")
					.append("ul")
					.selectAll("li")
					.data(node.backlinks)
					.join("li")
					.append("a")
					.text((d) => d.name)
					.attr("href", (d) => `#graph-${d.url.replace("https://", "").replaceAll(/[^a-zA-Z0-9_-]/g, "")}`)
					.on("click", (event, node) => {
						graphDialog.node().close();
						document.querySelector(event.target.getAttribute("href")).focus();
					});
			} else {
				graphDialog.select("details.incoming-links")
					.append("p")
					.text("None");
			}

			if (node?.links?.length) {
				graphDialog.select("details.outgoing-links")
					.append("ul")
					.selectAll("li")
					.data(node.links)
					.join("li")
					.append("a")
					.text((d) => d.name)
					.attr("href", (d) => `#graph-${d.url.replace("https://", "").replaceAll(/[^a-zA-Z0-9_-]/g, "")}`)
					.on("click", (event, node) => {
						graphDialog.node().close();
						document.querySelector(event.target.getAttribute("href")).focus();
					});
			} else {
				graphDialog.select("details.outgoing-links")
					.append("p")
					.text("None");
			}

			graphDialog
				.node()
				.showModal();

			event.stopPropagation();
		});

	button
		.append("span")
		.attr("class", "[ visually-hidden ]")
		.text(getNodeTitle)

	const path = button
		.append("svg:svg")
		.attr("aria-hidden", "true")
		.attr("width", 0) // Initial width, will be updated
		.attr("height", 0) // Initial height, will be updated
		.append("path")
		.attr("fill", (node) => colorScale(node.group))
		.attr("d", (node) => {
			const linksLength = node?.links?.length || 0;
			const backlinksLength = node?.backlinks?.length || 0;
			const val = linksLength > 0 || backlinksLength > 0 ? Math.log(linksLength + backlinksLength) + 1 : 1;
			const symbolType = symbolScale(node.group);
			const symbolGen = d3
				.symbol()
				.type(symbolType)
				.size(nodeRadius * val * 20);
			return symbolGen();
		});

	path
		.append("title")
		.text(getNodeTitle);

	// Add zoom behavior if enabled
	if (enableZoom) {
		const zoom = d3
			.zoom()
			.scaleExtent(zoomExtent)
			.on("zoom", (event) => {
				hasBeenZoomed = true;
				container.attr("transform", event.transform);
			});

		svg.call(zoom);

		// Wait for simulation to cool down before zooming to fit
		simulation.on("end", () => {
			if (hasBeenZoomed || hasBeenDragged) return;

			// Calculate bounds from actual node positions
			const xExtent = d3.extent(nodes, d => d.x);
			const yExtent = d3.extent(nodes, d => d.y);
			const graphWidth = xExtent[1] - xExtent[0];
			const graphHeight = yExtent[1] - yExtent[0];
			const midX = (xExtent[0] + xExtent[1]) / 2;
			const midY = (yExtent[0] + yExtent[1]) / 2;

			// Calculate the scale needed to fit the graph with some padding
			const scale = 0.8 / Math.max(graphWidth / width, graphHeight / height);

			const transform = d3.zoomIdentity
				.translate(-midX * scale, -midY * scale)
				.scale(scale);

			// Apply the zoom transform
			svg.transition().duration(750).call(zoom.transform, transform);
		});

		button.on("focus", (event, node) => {
			const transform = d3.zoomIdentity
				.translate(-node.x, -node.y);

			svg.transition().duration(145).call(zoom.transform, transform);
		});
	}

	// Add drag behaviour
	node.call(d3.drag()
		.on("start", dragStarted)
		.on("drag", dragged)
		.on("end", dragEnded)
	);

	// Set the position attributes of links and nodes each time the simulation ticks
	simulation.on("tick", () => {
		path
			.each(function() {
				// Get the path's bounding box
				const bbox = this.getBBox();
				const padding = 2;
				const width = bbox.width + padding * 2;
				const height = bbox.height + padding * 2;

				d3.select(this.parentNode) // svg
					.attr("width", width)
					.attr("height", height)
					.attr("viewBox", `${bbox.x - padding} ${bbox.y - padding} ${width} ${height}`);
	
				d3.select(this.parentNode.parentNode.parentNode) // foreignObject
					.attr("width", width)
					.attr("height", height)
					.attr("x", -width / 2)
					.attr("y", -height / 2);
			});

		link
			.attr("x1", (d) => d.source.x)
			.attr("y1", (d) => d.source.y)
			.attr("x2", (d) => d.target.x)
			.attr("y2", (d) => d.target.y);

		node
			.attr("transform", (d) => `translate(${d.x},${d.y})`);
	});

	// Reheat the simulation when drag starts, and fix the subject position
	function dragStarted(event) {
		hasBeenDragged = true;
		if (!event.active) simulation.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	}

	// Update the subject (dragged node) position during drag
	function dragged(event) {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	}

	// Restore the target alpha so the simulation cools after dragging ends
  // Unfix the subject position now that it's no longer being dragged
	function dragEnded(event) {
		if (!event.active) simulation.alphaTarget(0);
		event.subject.fx = null;
		event.subject.fy = null;
	}

	return Object.assign(svg.node(), { scales: { color: colorScale, symbol: symbolScale } });
}
