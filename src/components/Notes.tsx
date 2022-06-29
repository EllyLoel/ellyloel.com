import NextLink from "next/link";

import { styled } from "../../stitches.config";
import type { NoteMeta } from "../api";

const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
});

const List = styled("ul", {
  gridRow: "1 / 2",
  gridColumn: "1 / 2",
  listStyle: "none",
  paddingInlineStart: 0,
  margin: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gridAutoRows: "1fr",
  gap: "$size5",
  $$cardRadius: "$radii$radius3",
  position: "relative",
});

const StyledLink = styled("a", {
  position: "revert",
  fontFamily: "$body",
  bottom: "2px",
  color: "$accentText",
  textDecoration: "none",
  fontVariationSettings: `
    'wght' 400,
    'ital' 0`,
  transition: "font-variation-settings 150ms",

  "&::after": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -6,
    cursor: "pointer",
    borderRadius: "$$cardRadius",
    transition: "border-color 200ms",
  },
});

const Note = styled("li", {
  margin: 0,
  position: "relative",
  isolation: "isolate",
  color: "$accentText",
  backgroundColor: "$accentBg",
  border: "2px solid",
  borderRadius: "$$cardRadius",
  padding: "$size3",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "$size3",
  transform: "translateY(-4px)",
  transition: "transform 500ms",

  "&:hover, &:focus, &:focus-within": {
    transform: "translateY(0px)",
    transition: "transform 150ms",

    [`& ${StyledLink}`]: {
      fontVariationSettings: `
        'wght' 500,
        'ital' 0.5`,
      transition: "font-variation-settings 150ms",
    },
  },
});

const Title = styled("h3", {
  fontSize: "$fontSize5",
});

const CardBackground = styled("div", {
  backgroundColor: "$accentText",
  borderRadius: "$$cardRadius",
  inlineSize: "100%",
  blockSize: "100%",
});

const Tags = styled("div", {
  display: "flex",
  gap: "$size2",
  alignItems: "flex-end",
  flexWrap: "wrap",
});

const Tag = styled("a", {
  fontSize: "$fontSize1",
  backgroundColor: "$accentSolid",
  color: "$accentBase",
  borderRadius: "$radius2",
  padding: "$size1 $size2",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "fit-content",
  fontVariationSettings: `
    'wght' 300,
    'ital' 0`,
});

export default function Notes({ notes }: { notes: NoteMeta[] }) {
  return (
    <Container>
      <List as="div" style={{}}>
        {notes.map((_, index) => (
          <CardBackground key={index} />
        ))}
      </List>

      <List>
        {notes.map((note) => (
          <Note key={note.slug}>
            <Title>
              <NextLink href={`/notes/${note.slug}`} passHref>
                <StyledLink>{note.title}</StyledLink>
              </NextLink>
            </Title>
            {/* <p>{note.excerpt}</p> */}
            <Tags>
              {note.tags.map((tag) => (
                <NextLink key={tag} href={`/tags/${tag}`} passHref>
                  <Tag>{tag}</Tag>
                </NextLink>
              ))}
            </Tags>
          </Note>
        ))}
      </List>
    </Container>
  );
}
