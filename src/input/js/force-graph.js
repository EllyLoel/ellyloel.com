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
		.attr("viewBox", [-width / 2, -height / 2, width, height])
		.attr("style", "max-width: 100%; height: auto;");

	// Give the SVG an accessible name
	svg
		.append("title")
		.text("Force directed graph of all the pages and links on this site.");

	// Create a container group for all elements that will be transformed by zoom
	const container = svg.append("g");

	// Create the link container and the links
	const link = container
		.append("g")
		.attr("stroke", linkStroke)
		.attr("stroke-width", linkStrokeWidth)
		.attr("stroke-linecap", linkStrokeLinecap)
		.attr("stroke-opacity", "0.6")
		.selectAll("line")
		.data(links)
		.join("line");

	// Create the node container
	const nodeContainer = container
		.append("g")
		.attr("fill", nodeFill)
		.attr("stroke", nodeStroke)
		.attr("stroke-width", nodeStrokeWidth)

	// Create the nodes
	const node = nodeContainer
		.selectAll("path")
		.data(nodes)
		.join("g");

	// Create text
	// const text = node
	// 	.append("text")
		// .attr("text-anchor", "middle")
		// .attr("dominant-baseline", "hanging")
		// .attr("y", 10)
		// .style("font-size", "0.5em");

	// Create link
	node
		.append("a")
		.attr("fill", "CanvasText")
		.attr("stroke", "Canvas")
		.attr("paint-order", "stroke")
		.attr("href", (node) => node.id)
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
		})
		.append("title")
		.text(getNodeTitle);

	// Add zoom behavior if enabled
	if (enableZoom) {
		const zoom = d3
			.zoom()
			.scaleExtent(zoomExtent)
			.on("zoom", (event) => {
				container.attr("transform", event.transform);
			});

		svg.call(zoom);

		// Wait for simulation to cool down before zooming to fit
		simulation.on("end", () => {
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
	}

	// Add drag behaviour
	node.call(d3.drag()
		.on("start", dragStarted)
		.on("drag", dragged)
		.on("end", dragEnded)
	);

	// Set the position attributes of links and nodes each time the simulation ticks
	simulation.on("tick", () => {
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
