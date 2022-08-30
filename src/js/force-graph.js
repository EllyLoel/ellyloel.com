import ForceGraph from "force-graph";

const rootStyles = getComputedStyle(document.documentElement);

const accentNodeColor = rootStyles.getPropertyValue("--accent-border");
const accentLinkColor = rootStyles.getPropertyValue("--accent-bg-hover");
const neutralNodeColor = rootStyles.getPropertyValue("--neutral-border");
const neutralLinkColor = rootStyles.getPropertyValue("--neutral-bg-hover");

fetch("/api/graph.json")
  .then((res) => res.json())
  .then((data) => {
    const Graph = ForceGraph()(document.getElementById("graph"))
      .graphData(data)
      .nodeColor((node) =>
        location.pathname.includes(node.group)
          ? accentNodeColor
          : neutralNodeColor
      )
      .linkColor((link) =>
        location.pathname.includes(link.source.group)
          ? accentLinkColor
          : neutralLinkColor
      )
      .width(300)
      .height(300)
      .cooldownTicks(100)
      .onNodeClick((node) => {
        location.pathname = node.id;
      })
      .linkWidth(() => 2)
      .linkDirectionalParticles(2)
      .linkDirectionalParticleSpeed(0.005);

    Graph.d3Force("link").strength(0.075);
    Graph.d3Force("charge").strength(-1.5);
    Graph.d3Force("center").strength(1);

    // fit to canvas when engine stops
    Graph.onEngineStop(() => Graph.zoomToFit(400));
  });
