import React, { useRef } from 'react';
import { navigate } from 'gatsby';
import { ForceGraph2D } from 'react-force-graph';

const primaryNodeColor = '#62b1b3';
const secondaryNodeColor = '#B36462';
const backgroundColor = '#e6e6e6';

const Graph = ({ location, data }) => {
  const fgRef = useRef();

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={
        location === 'home' ? getHomeGraphData(data) : getNoteGraphData(data)
      }
      width={300}
      height={350}
      backgroundColor={backgroundColor}
      nodeLabel="name"
      linkWidth={3}
      onNodeClick={onClickNode}
      cooldownTicks={100}
      onEngineStop={() => fgRef.current.zoomToFit(400, 25)}
      linkDirectionalParticles={2}
      linkDirectionalParticleSpeed={0.005}
    />
  );
};

const getHomeGraphData = (edges) => {
  const nodes = [];
  const links = [];

  for (const edge of edges) {
    const {
      slug,
      frontmatter: { title },
      outboundReferences,
    } = edge.node;

    nodes.push({
      id: slug,
      name: title,
      val: 3,
      color: primaryNodeColor,
    });

    for (const ref of outboundReferences) {
      links.push({
        source: slug,
        target: ref.slug,
      });
    }
  }

  const graphData = { nodes, links };

  return graphData;
};

const getNoteGraphData = ({
  slug,
  frontmatter: { title },
  inboundReferences,
}) => {
  const nodes = [];
  const links = [];

  nodes.push({
    id: slug,
    name: title,
    val: 2,
    color: secondaryNodeColor,
  });

  for (const ref of inboundReferences) {
    nodes.push({
      id: ref.slug,
      name: ref.frontmatter.title,
      val: 1,
      color: primaryNodeColor,
    });

    links.push({
      source: slug,
      target: ref.slug,
    });
  }

  const graphData = { nodes, links };

  return graphData;
};

const onClickNode = (node) => {
  navigate(`/notes/${node.id}`);
};

export default Graph;
