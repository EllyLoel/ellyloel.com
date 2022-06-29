import type { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Head from "next/head";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
// @ts-ignore
import wikiLinkPlugin from "remark-wiki-link";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { getNoteFromSlug, getSlugs, NoteMeta } from "../../src/api";
import YouTube from "../../src/components/YouTube";
import StillGrowing from "../../src/components/StillGrowing";
import "highlight.js/styles/atom-one-dark.css";
import { styled } from "../../stitches.config";

const Note = styled("article", {
  display: "grid",
  gap: "$size5",

  "& > h1": {
    marginBlockEnd: "$size8",
    fontVariationSettings: "'wght' 700",
  },
});

interface MDXNote {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: NoteMeta;
}

export default function NotePage({ note }: { note: MDXNote }) {
  return (
    <>
      <Head>
        <title>{note.meta.title}</title>
      </Head>
      <Note>
        <h1>{note.meta.title}</h1>
        <MDXRemote
          {...note.source}
          components={{ YouTube, Image, StillGrowing }}
        />
      </Note>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const { content, meta } = getNoteFromSlug(slug);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [wikiLinkPlugin],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight,
      ],
    },
  });

  return { props: { note: { source: mdxSource, meta } } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs().map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
