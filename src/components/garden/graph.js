import React, { useRef } from 'react';
import { navigate } from 'gatsby';
import loadable from '@loadable/component';
import styled from 'styled-components';

const ForceGraph = loadable(() => import('./forceGraph'));

const primaryNodeColor = '#bcd05f';
const secondaryNodeColor = '#8da130';
const backgroundColor = 'var(--color-background)';

const GraphStyled = styled.div`
  grid-area: graph;

  canvas {
    border: 2px solid rgba(52, 61, 68, 0.05);
    border-radius: 1rem;
    box-shadow: 0px 1px 2px rgba(52, 61, 68, 0.1);
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover,
    &:focus {
      border: 2px solid var(--color-primary);
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
    }
  }
`;

const Graph = ({ location, data, width }) => {
  const fgRef = useRef();

  return (
    <GraphStyled>
      <ForceGraph
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
        onEngineStop={() =>
          data.length ? fgRef.current.zoomToFit(400, 25) : null
        }
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
        frontmatter: { slug, title },
        outboundReferences,
        inboundReferences,
      } = edge.node;

      nodes.push({
        id: slug,
        name: title,
        val: 3,
        color: primaryNodeColor,
      });

      for (const outboundReference of outboundReferences) {
        links.push({
          source: slug,
          target: outboundReference.frontmatter.slug,
        });
      }

      for (const inboundReference of inboundReferences) {
        links.push({
          source: inboundReference.frontmatter.slug,
          target: slug,
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
  frontmatter: { slug, title },
  inboundReferences,
  outboundReferences,
}) => {
  const nodes = [];
  const links = [];

  nodes.push({
    id: slug,
    name: title,
    val: 2,
    color: secondaryNodeColor,
  });

  for (const inboundReference of inboundReferences) {
    nodes.push({
      id: inboundReference.frontmatter.slug,
      name: inboundReference.frontmatter.title,
      val: 1,
      color: primaryNodeColor,
    });

    links.push({
      source: inboundReference.frontmatter.slug,
      target: slug,
    });
  }

  for (const outboundReference of outboundReferences) {
    if (!nodes.find((node) => node.id === outboundReference.frontmatter.slug)) {
      nodes.push({
        id: outboundReference.frontmatter.slug,
        name: outboundReference.frontmatter.title,
        val: 1,
        color: primaryNodeColor,
      });
    }

    links.push({
      source: slug,
      target: outboundReference.frontmatter.slug,
    });
  }

  const graphData = { nodes, links };

  return graphData;
};

const onClickNode = (node) => {
  navigate(`/notes/${node.id}`);
};

export default Graph;
