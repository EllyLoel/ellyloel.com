import React, { useState } from "react";

import { styled } from "../stitches.config";
import { getAllNotes, NoteMeta } from "../src/api";
import Notes from "../src/components/Notes";
import Graph from "../src/components/Graph";

const NotesContainer = styled("div", {
  display: "grid",
  gap: "$size6",
});

export default function Garden({ notes }: { notes: NoteMeta[] }) {
  const [activeTagFilter, setActiveTagFilter] = useState([]);
  const [activeStageFilter, setActiveStageFilter] = useState("");

  const tagsSet = new Set();
  let stages = ["seedling", "budding", "evergreen"];

  for (const note of notes) {
    for (const tag of note.tags) {
      tagsSet.add(tag);
    }
  }

  const tagsArr = Array.from(tagsSet.values()).sort();

  return (
    <NotesContainer>
      <h1>
        My digital garden <i className="twa twa-leaf-fluttering-in-wind"></i>
      </h1>
      <Notes notes={notes} />
      {/* <Graph location="home" data={notes} width={100} /> */}
    </NotesContainer>
  );
}

export async function getStaticProps() {
  const notes = getAllNotes().map((note) => note.meta);

  return { props: { notes } };
}
