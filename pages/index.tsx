import React from "react";

import { styled } from "../stitches.config";
import { getAllNotes, NoteMeta } from "../src/api";
import Notes from "../src/components/Notes";
import Logo from "../src/components/Logo";
import AccessibleIcon from "../src/components/AccessibleIcon";

const Grid = styled("div", {
  display: "grid",
  gap: "$size12",
});

const HeroContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$size5",
  alignItems: "center",
});

const NotesContainer = styled("div", { display: "grid", gap: "$size6" });

const Small = styled("small", {
  display: "block",
  fontFamily: "$body",
  fontWeight: "$fontWeight7",

  "& span[aria-hidden='true']": {
    color: "$accentSolid",
  },
});

export default function Home({ notes }: { notes: NoteMeta[] }) {
  return (
    <Grid>
      <HeroContainer>
        <h1>
          <Small>
            <span>Hi, I'm </span>
            <AccessibleIcon label="Elly">
              <Logo />
            </AccessibleIcon>
          </Small>
          I like creating delightful, magical, and accessible art with code.
        </h1>
        <img src="/images/ClubPenguin.png" alt="Elly" />
      </HeroContainer>
      <NotesContainer>
        <h2>Notes from my digital garden</h2>
        <Notes notes={notes} />
      </NotesContainer>
    </Grid>
  );
}

export async function getStaticProps() {
  const notes = getAllNotes()
    .slice(0, 9)
    .map((note) => note.meta);

  return { props: { notes } };
}
