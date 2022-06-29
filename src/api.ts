import path from "path";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";

const NOTES_PATH = path.join(process.cwd(), "data/notes");

export const getSlugs = (): string[] => {
  const paths = sync(`${NOTES_PATH}/*.mdx`);

  return paths.map((path) => {
    const parts = path.split("/");
    const fileName = parts[parts.length - 1];
    const [slug, _ext] = fileName.split(".");
    return slug;
  });
};

export const getAllNotes = () => {
  const notes = getSlugs()
    .map((slug) => getNoteFromSlug(slug))
    .sort((a, b) => {
      if (a.meta.date > b.meta.date) return 1;
      if (a.meta.date < b.meta.date) return -1;
      return 0;
    })
    .reverse();
  return notes;
};

interface Note {
  content: string;
  meta: NoteMeta;
}

export interface NoteMeta {
  excerpt: string;
  slug: string;
  title: string;
  tags: string[];
  date: string;
  outboundReferences: {
    slug: string;
    title: string;
  }[];
  inboundReferences: {
    slug: string;
    title: string;
  }[];
}

export const getNoteFromSlug = (slug: string): Note => {
  const notePath = path.join(NOTES_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(notePath);
  const { content, data } = matter(source);

  return {
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? "",
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: (data.date ?? new Date()).toString(),
      outboundReferences: data.outboundReferences ?? [],
      inboundReferences: data.outboundReferences ?? [],
    },
  };
};
