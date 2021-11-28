import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav/nav';
import FormatStage from '../components/garden/format-stage';
import FormatTag from '../components/garden/format-tag';
import Graph from '../components/garden/graph';
import Footer from '../components/footer';

const NavStyled = styled.div`
  @media (min-width: 64em) {
    nav ul li::before,
    nav ul li::after,
    nav h1::before,
    nav h1::after {
      background: rgb(221, 231, 174);
    }
  }
`;

const Container = styled.article`
  margin: 6em 1.5em 1.5em 1.5em;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(3, max-content);
  grid-template-areas:
    'header'
    'content'
    'references'
    'graph';
  gap: 2em;

  a {
    text-decoration: underline;
    text-underline-offset: 1px;
    color: #bcd05f;
    font-weight: 600;
  }

  @media (min-width: 48em) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'header header'
      'content content'
      'graph references';
  }

  @media (min-width: 64em) {
    margin: 4em auto;
    width: 75%;

    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'header header'
      'content graph'
      'content references';
    gap: 3em;
  }

  @media (min-width: 75em) {
    grid-template-columns: 1fr max-content;
    width: 65%;
  }

  @media (min-width: 90em) {
    width: 55%;
  }
`;

const Header = styled.header`
  grid-area: header;
`;

const Title = styled.h1`
  margin: 0;

  font-size: 2.5rem;
  line-height: 1;
  color: var(--dark);

  span {
    margin-left: 3px;
    vertical-align: top;

    font-size: 0.8em;
  }
`;

const Metadata = styled.div`
  width: 100%;
  margin-top: 1em;
  padding: 1em;

  display: flex;
  flex-direction: column;
  gap: 0.5em;

  line-height: 1.5;
  border: 1px solid rgba(52, 61, 68, 0.05);
  border-radius: 1rem;
  box-shadow: 0px 1px 2px rgba(52, 61, 68, 0.1);

  & > div > * {
    margin: 0;
  }

  @media (min-width: 42em) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StageTagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5em;

  @media (min-width: 80em) {
    flex-direction: row;
    align-items: center;
    gap: 1em;
  }
`;

const FormatStageStyled = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 0.25em 0.7em 0.25em 0.65em;

  border: 2px solid #bcd05f;
  border-radius: 9999px;
  transition: all 0.3s ease-in-out;
  background: var(--light);

  p {
    transition: all 0.3s ease-in-out;
    color: #99af33;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
`;

const FormatTagStyled = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 0.2em 0.4em;

  border-radius: 4px;
  color: rgb(101, 116, 34);
  background: rgb(221, 231, 174);
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.5em;

  @media (min-width: 80em) {
    flex-direction: row;
    align-items: center;
    gap: 1em;
  }
`;

const CreatedTime = styled.p`
  @media (min-width: 42em) {
    text-align: right;
  }
`;

const ModifiedTime = styled.p`
  @media (min-width: 42em) {
    text-align: right;
  }
`;

const Content = styled.div`
  grid-area: content;

  line-height: 1.5;

  blockquote {
    position: relative;
    width: fit-content;
    margin-left: 1em;
    padding: 1em 2em;
    background: #bcd05f1a;
    border-top-left-radius: 0;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 0;
    color: #707070;
    font-style: italic;
    letter-spacing: 0.5px;

    p {
      margin: 0;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      display: block;
      width: 4px;
      height: 100%;
      background-color: #bcd05f;
      border-radius: 2px;
    }
  }
`;

const References = styled.div`
  grid-area: references;
  justify-self: end;
  width: 100%;
  height: fit-content;
  max-height: max-content;
  padding: 1.5em 2em;

  line-height: 1.5;
  border: 1px solid rgba(52, 61, 68, 0.05);
  border-radius: 1rem;
  box-shadow: 0px 1px 2px rgba(52, 61, 68, 0.1);
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover,
  &:focus {
    transform: scale(1.015);
    border: 1px solid var(--accent);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
  }

  h2 {
    margin: 0;
    margin-bottom: 0.25em;
    font-weight: 600;
    line-height: 1;
  }
  ul {
    padding-left: 2em;
    margin: 0;
    margin-top: 0.25em;

    li::marker {
      content: '→  ';
    }
  }
`;

const GraphStyled = styled.div`
  grid-area: graph;
  justify-self: end;
`;

const FooterStyled = styled.div`
  height: 4rem;
  position: relative;

  footer small,
  footer small a,
  footer ul a {
    color: var(--dark);
  }

  footer small a::before,
  footer small a::after,
  footer ul li::before,
  footer ul li::after {
    background: rgb(221, 231, 174);
  }
`;

export default function noteTemplate({
  data: {
    mdx,
    file: { modifiedTime },
  },
}) {
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} />
      <NavStyled>
        <Nav siteTitle="<e//y>" color="#99af33" navColor="#99af33" />
      </NavStyled>
      <Container>
        <Header>
          <Title>{mdx.frontmatter.title}</Title>
          <Metadata>
            <StageTagsContainer>
              <FormatStageStyled>
                <FormatStage stage={mdx.frontmatter.stage} />
              </FormatStageStyled>
              <Tags>
                {mdx.frontmatter.tags.map((tag, index) => {
                  return !tag ? null : (
                    <FormatTagStyled key={index}>
                      <FormatTag tag={tag} />
                    </FormatTagStyled>
                  );
                })}
              </Tags>
            </StageTagsContainer>
            <TimeContainer>
              {mdx.frontmatter.slug === 'now' ? null : (
                <CreatedTime>
                  🌱 Sprouted on {formatDate(mdx.frontmatter.date)}
                </CreatedTime>
              )}
              <ModifiedTime>
                🌧️ Last watered on {formatDate(modifiedTime)}
              </ModifiedTime>
            </TimeContainer>
          </Metadata>
        </Header>
        <Content>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Content>
        {mdx.inboundReferences.length > 0 && (
          <References>
            <h2>Referenced in:</h2>
            <ul>
              {mdx.inboundReferences.map((ref, index) => (
                <li key={index}>
                  <Link to={`/notes/${ref.frontmatter.slug}`}>
                    {ref.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </References>
        )}
        <GraphStyled>
          <Graph location={'note'} data={mdx} />
        </GraphStyled>
      </Container>
      <FooterStyled>
        <Footer />
      </FooterStyled>
    </Layout>
  );
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const query = graphql`
  query ($slug: String!, $content: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      inboundReferences {
        ... on Mdx {
          frontmatter {
            title
            slug
          }
        }
      }
      outboundReferences {
        ... on Mdx {
          frontmatter {
            title
            slug
          }
        }
      }
      frontmatter {
        title
        slug
        stage
        tags
        date
      }
    }
    file(internal: { content: { eq: $content } }) {
      modifiedTime
    }
  }
`;
