import React, { useRef } from "react";
import { useRouter } from "next/router";
import { ForceGraph2D as ForceGraph } from "react-force-graph";

import { styled, theme } from "../../stitches.config";
import { NoteMeta } from "../api";

const primaryNodeColor = theme.colors.accentSolid.value;
const secondaryNodeColor = theme.colors.accentSolidHover.value;

const GraphStyled = styled("div", {
  gridArea: "graph",

  "& canvas": {
    border: "2px solid $accentLine",
    borderRadius: "$radius3",
    boxShadow: "var(--shadow-elevation-low)",
    transition: "border box-shadow 200ms cubic-bezier(0.075, 0.82, 0.165, 1)",

    "&:hover, &:focus": {
      border: "2px solid $accentBorder",
      boxShadow: "var(--shadow-elevation-medium)",
    },
  },
});

type GraphProps = {
  location?: string;
  data: NoteMeta[];
  width: number;
};

const Graph = ({ location, data, width }: GraphProps) => {
  const forceGraphRef: React.MutableRefObject<any> = useRef(null);
  const router = useRouter();

  return (
    <GraphStyled>
      {/* <ForceGraph
        ref={forceGraphRef}
        graphData={
          location === "home" ? getHomeGraphData(data) : getNoteGraphData(data)
        }
        // width={width}
        // height={location === "home" ? 350 : 200}
        backgroundColor={theme.colors.accentBg.value}
        nodeLabel="name"
        linkWidth={3}
        onNodeClick={(node) => router.push(`/notes/${node.id}`)}
        cooldownTicks={100}
        onEngineStop={() =>
          data.length && forceGraphRef.current
            ? forceGraphRef["current"].zoomToFit(400, 25)
            : null
        }
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
      /> */}
    </GraphStyled>
  );
};

const getHomeGraphData = (edges: NoteMeta[]) => {
  const nodes = [];
  const links = [];

  if (edges.length) {
    for (const edge of edges) {
      const { slug, title, outboundReferences, inboundReferences } = edge;

      nodes.push({
        id: slug,
        name: title,
        val: 3,
        color: primaryNodeColor,
      });

      for (const outboundReference of outboundReferences) {
        links.push({
          source: slug,
          target: outboundReference.slug,
        });
      }

      for (const inboundReference of inboundReferences) {
        links.push({
          source: inboundReference.slug,
          target: slug,
        });
      }
    }
  } else {
    nodes.push({
      id: "no-notes",
      name: "No notes",
      val: 3,
      color: primaryNodeColor,
    });
  }

  const graphData = { nodes, links };

  return graphData;
};

const getNoteGraphData = (data: NoteMeta[]) => {
  const {
    slug,
    title,
    // inboundReferences,
    // outboundReferences,
  } = data[0];

  const nodes = [];
  const links = [];

  nodes.push({
    id: slug,
    name: title,
    val: 2,
    color: secondaryNodeColor,
  });

  // for (const inboundReference of inboundReferences) {
  //   nodes.push({
  //     id: inboundReference.slug,
  //     name: inboundReference.title,
  //     val: 1,
  //     color: primaryNodeColor,
  //   });

  //   links.push({
  //     source: inboundReference.slug,
  //     target: slug,
  //   });
  // }

  // for (const outboundReference of outboundReferences) {
  //   if (!nodes.find((node) => node.id === outboundReference.slug)) {
  //     nodes.push({
  //       id: outboundReference.slug,
  //       name: outboundReference.title,
  //       val: 1,
  //       color: primaryNodeColor,
  //     });
  //   }

  //   links.push({
  //     source: slug,
  //     target: outboundReference.slug,
  //   });
  // }

  const graphData = {
    nodes,
    // links,
  };

  return graphData;
};

export default Graph;
