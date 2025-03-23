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
		const skipLinkText = document.createTextNode("Skip force directed graph of posts");
		skipLink.appendChild(skipLinkText);
		skipLink.setAttribute("href", "#skip-graph");

		const skipLinkAnchor = document.createElement("a");
		skipLinkAnchor.setAttribute("id", "skip-graph");
		skipLinkAnchor.className = "[ visually-hidden ]";

		const graphEl = document.querySelector("#graph");

		graphEl.previousElementSibling.removeAttribute("hidden");
		graphEl.append(skipLink, graph, skipLinkAnchor);
	});
