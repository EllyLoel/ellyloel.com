import type { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Head from "next/head";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { getNoteFromSlug, getSlugs, NoteMeta } from "../../src/api";
import YouTube from "../../src/components/YouTube";
import "highlight.js/styles/atom-one-dark.css";

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
      <h1>{note.meta.title}</h1>
      <MDXRemote {...note.source} components={{ YouTube, Image }} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const { content, meta } = getNoteFromSlug(slug);
  const mdxSource = await serialize(content, {
    mdxOptions: {
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
