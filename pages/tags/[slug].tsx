import type { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { getAllNotes, NoteMeta } from "../../src/api";
import Notes from "../../src/components/Notes";

export default function TagPage({
  slug,
  notes,
}: {
  slug: string;
  notes: NoteMeta[];
}) {
  return (
    <>
      <Head>
        <title>Tag: {slug}</title>
      </Head>
      <h1>Tag: {slug}</h1>
      <Notes notes={notes} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const notes = getAllNotes().filter((note) => note.meta.tags.includes(slug));

  return {
    props: {
      slug,
      notes: notes.map((note) => note.meta),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const notes = getAllNotes();
  const tags = new Set(notes.map((note) => note.meta.tags).flat());
  const paths = Array.from(tags).map((tag) => ({ params: { slug: tag } }));

  return {
    paths,
    fallback: false,
  };
};
