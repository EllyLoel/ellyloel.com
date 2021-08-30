import React, { useRef } from 'react';
import { navigate } from 'gatsby';
import { ForceGraph2D } from 'react-force-graph';
import { useWindowWidth } from '@react-hook/window-size';
import styled from 'styled-components';

const primaryNodeColor = '#bcd05f';
const secondaryNodeColor = '#8da130';
const backgroundColor = '#FFF';

const GraphStyled = styled.div`
  grid-area: graph;

  canvas {
    border: 2px solid rgba(52, 61, 68, 0.05);
    border-radius: 1rem;
    box-shadow: 0px 1px 2px rgba(52, 61, 68, 0.1);
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover,
    &:focus {
      border: 2px solid var(--accent);
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
    }
  }
`;

const Graph = ({ location, data }) => {
  const fgRef = useRef();
  let width = useWindowWidth();

  if (location === 'home') {
    if (width < 1216) {
      width -= 48;
    } else if (width < 1440) {
      width = width / 3 - 74;
    } else {
      width = width / 5;
    }
  } else {
    if (width < 768) {
      width -= 48;
    } else if (width < 1024) {
      width = width / 2 - 24;
    } else if (width < 1200) {
      width = (width * 0.75) / 2 - 24;
    } else if (width < 1440) {
      width = (width * 0.65) / 2.5 - 24;
    } else {
      width = (width * 0.55) / 2.75 - 48;
    }
  }

  return (
    <GraphStyled>
      <ForceGraph2D
        ref={fgRef}
        graphData={
          location === 'home' ? getHomeGraphData(data) : getNoteGraphData(data)
        }
        width={width}
        height={location === 'home' ? 350 : 200}
        backgroundColor={backgroundColor}
        nodeLabel="name"
        linkWidth={3}
        onNodeClick={onClickNode}
        cooldownTicks={100}
        onEngineStop={() => fgRef.current.zoomToFit(400, 25)}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
      />
    </GraphStyled>
  );
};

const getHomeGraphData = (edges) => {
  const nodes = [];
  const links = [];

  if (edges.length) {
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
  } else {
    nodes.push({
      id: 'no-notes',
      name: 'No notes',
      val: 3,
      color: primaryNodeColor,
    });
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
