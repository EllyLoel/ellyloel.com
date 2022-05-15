import React from "react";

import { getAllNotes, NoteMeta } from "@/src/api";
import Notes from "../src/components/Notes";

export default function Home({ notes }: { notes: NoteMeta[] }) {
  return (
    <>
      <h1>Notes</h1>
      <Notes notes={notes} />
    </>
  );
}

export async function getStaticProps() {
  const notes = getAllNotes()
    .slice(0, 9)
    .map((note) => note.meta);

  return { props: { notes } };
}
