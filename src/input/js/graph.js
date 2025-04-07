import { ForceGraph } from "./force-graph.js";

fetch("/api/graph.json")
	.then((res) => res.json())
	.then((data) => {
		const graph = ForceGraph(data, {
			getNodeGroup: (d) => d.group,
			getNodeId: (d) => d.id,
			getNodeTitle: (d) => d.group && d.name.toLowerCase() !== d.group.toLowerCase() ? `${d.name} (${d.group})` : d.name,
		});

		const skipLink = document.createElement("a");
		const skipLinkText = document.createTextNode("Skip to after graph of posts");
		skipLink.appendChild(skipLinkText);
		skipLink.setAttribute("href", "#after-graph");
		skipLink.setAttribute("id", "before-graph");

		const skipLinkAnchor = document.createElement("a");
		const skipLinkAnchorText = document.createTextNode("Skip to before graph of posts");
		skipLinkAnchor.appendChild(skipLinkAnchorText);
		skipLinkAnchor.setAttribute("href", "#before-graph");
		skipLinkAnchor.setAttribute("id", "after-graph");

		const graphEl = document.querySelector("#graph");

		graphEl.append(skipLink, graph, skipLinkAnchor);
	});
