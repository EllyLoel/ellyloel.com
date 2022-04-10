import Link from "next/link";
import type { NoteMeta } from "@/src/api";

export default function Notes({ notes }: { notes: NoteMeta[] }) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.slug}>
          <div>
            <Link href={`/notes/${note.slug}`}>{note.title}</Link>
          </div>
          <p>{note.excerpt}</p>
          <p>
            {note.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                {tag}
              </Link>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}
