import ForceGraph from "force-graph";

const graphEl = document.getElementById("graph");

const color = getComputedStyle(graphEl).getPropertyValue("color");
const borderColor = getComputedStyle(graphEl).getPropertyValue("border-color");

fetch("/api/graph.json")
  .then((res) => res.json())
  .then((data) => {
    const Graph = ForceGraph()(graphEl)
      .graphData(data)
      .nodeColor((node) =>
        location.pathname.includes(node.group) ? color : "#bbb"
      )
      .linkColor((link) =>
        location.pathname.includes(link.source.group) ? borderColor : "#ddd"
      )
      .width(300)
      .height(300)
      .nodeVal(2)
      .cooldownTicks(100)
      .linkWidth(() => 3)
      .linkDirectionalParticles("value")
      .linkDirectionalParticleSpeed((d) => d.value * 0.001)
      .linkDirectionalParticleWidth(1)
      .onNodeClick((node) => {
        location.pathname = node.id;
      });

    Graph.d3Force("link").strength(0.075);
    Graph.d3Force("charge").strength(-1.5);
    Graph.d3Force("center").strength(1);

    // fit to canvas when engine stops
    Graph.onEngineStop(() => Graph.zoomToFit(400));
  });
