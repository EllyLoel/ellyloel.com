import { ForceGraph } from "./force-graph.js";

const rootStyles = getComputedStyle(document.documentElement);

const accentNodeColor = rootStyles.getPropertyValue("--accent-border");
const neutralNodeColor = rootStyles.getPropertyValue("--neutral-border");
const neutralLinkStroke = rootStyles.getPropertyValue("--neutral-bg-hover");
const neutralNodeStroke = rootStyles.getPropertyValue(
  "--neutral-text-contrast"
);

fetch("/api/graph.json")
  .then((res) => res.json())
  .then((data) => {
    const graph = ForceGraph(data, {
      nodeId: (d) => d.id,
      nodeGroup: (d) => d.group,
      nodeTitle: (d) => `${d.name} (${d.group})`,
      colors: [accentNodeColor, neutralNodeColor],
      nodeStroke: neutralNodeStroke,
      linkStroke: neutralLinkStroke,
      linkStrokeWidth: 2.5,
      width: 300,
      height: 300,
    });
    const skipLink = document.createElement("a");
    const skipLinkText = document.createTextNode(
      "Skip force directed graph of posts"
    );
    skipLink.appendChild(skipLinkText);
    skipLink.setAttribute("href", "#skip-graph");

    const skipLinkAnchor = document.createElement("a");
    skipLinkAnchor.setAttribute("id", "skip-graph");

    const graphEl = document.querySelector("#graph");

    graphEl.append(skipLink, graph, skipLinkAnchor);
  });
