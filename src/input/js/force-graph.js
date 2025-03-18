import * as d3 from "d3";
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/disjoint-force-directed-graph
export function ForceGraph(
	{
		nodes, // an iterable of node objects (typically [{id}, …])
		links, // an iterable of link objects (typically [{source, target}, …])
	},
	{
		nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
		nodeGroup, // given d in nodes, returns an (ordinal) value for symbol
		nodeGroups, // an array of ordinal values representing the node groups
		nodeTitle, // given d in nodes, a title string
		nodeFill = "currentColor", // node fill color
		nodeStroke = "CanvasText", // node stroke color
		nodeStrokeWidth = 0.5, // node stroke width, in pixels
		nodeStrokeOpacity = 1, // node stroke opacity
		nodeRadius = 5, // node radius, in pixels
		nodeStrength,
		linkSource = ({ source }) => source, // given d in links, returns a node identifier string
		linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
		linkStroke = "CanvasText", // link stroke color
		linkStrokeOpacity = 1, // link stroke opacity
		linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
		linkStrokeLinecap = "round", // link stroke linecap
		linkStrength,
		colors = d3.schemeTableau10, // an array of color strings, for the node groups
		symbols = d3.symbolsFill, // an array of symbol types for node groups
		width = 640, // outer width, in pixels
		height = 400, // outer height, in pixels
		invalidation, // when this promise resolves, stop the simulation
		enableZoom = true, // whether to enable zoom behavior
		zoomExtent = [0.1, 10], // zoom scale extent [min, max]
	} = {}
) {
	// Compute values.
	const N = d3.map(nodes, nodeId).map(intern);
	const LS = d3.map(links, linkSource).map(intern);
	const LT = d3.map(links, linkTarget).map(intern);
	if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
	const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
	const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
	const W =
		typeof linkStrokeWidth !== "function"
			? null
			: d3.map(links, linkStrokeWidth);

	// Replace the input nodes and links with mutable objects for the simulation.
	// Create copies to avoid mutating the original data
	nodes = d3.map(nodes, (d, i) => ({...d, id: N[i]}));
	links = d3.map(links, (d, i) => ({...d, source: LS[i], target: LT[i]}));

	// Compute default domains.
	if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

	// Construct the scales.
	const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);
	const symbol = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, symbols);

	// Construct the forces.
	const forceNode = d3.forceManyBody();
	const forceLink = d3.forceLink(links).id(d => d.id);
	if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
	if (linkStrength !== undefined) forceLink.strength(linkStrength);

	const simulation = d3
		.forceSimulation(nodes)
		.force("link", forceLink)
		.force("charge", forceNode)
		.force("x", d3.forceX())
		.force("y", d3.forceY());

	const svg = d3
		.create("svg")
		.attr("aria-label", "Force directed graph of posts")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", [-width / 2, -height / 2, width, height])
		.attr("style", "max-width: 100%; height: auto;");

	// Create a container group for all elements that will be transformed by zoom
	const container = svg.append("g");

	// Add zoom behavior if enabled
	if (enableZoom) {
		const zoom = d3.zoom()
			.scaleExtent(zoomExtent)
			.on("zoom", (event) => {
				container.attr("transform", event.transform);
			});

		svg.call(zoom);
	}

	const link = container
		.append("g")
		.attr("stroke", linkStroke)
		.attr("stroke-opacity", linkStrokeOpacity)
		.attr(
			"stroke-width",
			typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
		)
		.attr("stroke-linecap", linkStrokeLinecap)
		.selectAll("line")
		.data(links)
		.join("line");

	if (W) link.attr("stroke-width", (d, i) => W[i]);

	const node = container
		.append("g")
		.attr("fill", nodeFill)
		.attr("stroke", nodeStroke)
		.attr("stroke-opacity", nodeStrokeOpacity)
		.attr("stroke-width", nodeStrokeWidth)
		.selectAll("path")
		.data(nodes)
		.join("a")
		.attr("href", (node) => node.id)
		.append("path")
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	if (G) {
		node.attr("d", ({ val = 1 }, i) => {
			console.log(val);
			const symbolType = symbol(G[i]);
			const symbolGen = d3.symbol().type(symbolType).size(nodeRadius * val * 20);
			return symbolGen();
		});
		
		node.attr("fill", (d, i) => color(G[i]));
	} else {
		node.attr("d", ({ val = 1 }, i) => d3.symbol().type(d3.symbolCircle).size(nodeRadius * val * 20));
	}
	
	if (T) node.append("title").text((d, i) => T[i]);

	// Set up the simulation
	simulation.on("tick", ticked);

	// Handle invalidation.
	if (invalidation != null) invalidation.then(() => simulation.stop());

	function intern(value) {
		return value !== null && typeof value === "object"
			? value.valueOf()
			: value;
	}

	function ticked() {
		link
			.attr("x1", d => d.source.x)
			.attr("y1", d => d.source.y)
			.attr("x2", d => d.target.x)
			.attr("y2", d => d.target.y);

		node.attr("transform", d => `translate(${d.x},${d.y})`);
	}

	// Drag functions from the newer version
	function dragstarted(event) {
		if (!event.active) simulation.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	}

	function dragged(event) {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	}

	function dragended(event) {
		if (!event.active) simulation.alphaTarget(0);
		event.subject.fx = null;
		event.subject.fy = null;
	}

	return Object.assign(svg.node(), { scales: { color, symbol } });
}
