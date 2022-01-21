import React, { useState, useEffect, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { window } from 'browser-monads';
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/shift-away.css';

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
      background: var(--color-green300);
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
    'graphrefs';
  gap: 2em;

  a {
    text-decoration: underline;
    text-underline-offset: 1px;
    color: var(--color-green500);
    font-weight: 600;
  }

  @media (min-width: 64em) {
    margin: 4em auto;
    width: 75%;

    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      'header header'
      'content graphrefs';
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
  color: var(--color-text);

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
  background: var(--color-background);
  border: 1px solid var(--color-gray300);
  border-radius: 1rem;
  box-shadow: var(--shadow-elevation-low);

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

  border: 2px solid var(--color-green500);
  border-radius: 9999px;
  transition: all 0.3s ease-in-out;
  background: var(--color-background);

  p {
    transition: all 0.3s ease-in-out;
    color: var(--color-green300);
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
  color: var(--color-background);
  background: var(--color-green500);
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
      background-color: var(--color-green500);
      border-radius: 2px;
    }
  }
`;

const Tooltip = styled.div`
  background-color: var(--color-background);
  padding: 1em 1.5em;
  line-height: 1.5;
  border: 1px solid var(--color-gray300);
  border-radius: 1rem;
  box-shadow: var(--shadow-elevation-medium);
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  & > * {
    margin: 0;
  }

  & h1 {
    line-height: 1;
    margin-bottom: 0.25em;
  }

  &:hover,
  &:focus {
    transform: scale(1.015);
    border: 1px solid var(--color-primary);
    box-shadow: var(--shadow-elevation-high);
  }
`;

const References = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  width: 100%;
  height: fit-content;
  max-height: max-content;
  padding: 1.5em 2em;

  line-height: 1.5;
  background: var(--color-background);
  border: 1px solid var(--color-gray300);
  border-radius: 1rem;
  box-shadow: var(--shadow-elevation-low);
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover,
  &:focus {
    transform: scale(1.015);
    border: 1px solid var(--color-primary);
    box-shadow: var(--shadow-elevation-medium);
  }

  h2 {
    margin: 0;
    margin-bottom: 0.25em;
    font-weight: 600;
    line-height: 1;
  }
  ul {
    padding-left: 1.6em;
    margin: 0;
    margin-top: 0.25em;

    li::marker {
      content: '→  ';
    }
  }

  @media (min-width: 48em) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    height: 100%;
  }

  @media (min-width: 64em) {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    height: fit-content;
  }
`;

const GraphStyled = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
`;

const GraphRefsContainer = styled.div`
  grid-area: graphrefs;
  height: fit-content;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr;
  gap: 2em;

  @media (min-width: 48em) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }

  @media (min-width: 64em) {
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr;
    /* align-self: start; */
  }
`;

const FooterStyled = styled.div`
  height: 4rem;
  position: relative;

  footer small,
  footer small a,
  footer ul a {
    color: var(--color-text);
  }

  footer small a::before,
  footer small a::after,
  footer ul li::before,
  footer ul li::after {
    background: var(--color-green300);
  }
`;

const NoteTemplate = ({
  data: {
    mdx,
    file: { modifiedTime },
  },
}) => {
  const ref = useRef(null);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current ? ref.current.offsetWidth : 0);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} />
      <NavStyled>
        <Nav
          siteTitle="<e//y>"
          color="var(--color-green500)"
          navColor="var(--color-green500)"
        />
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
                  <i className="twa twa-seedling"></i> Sprouted on{' '}
                  {formatDate(mdx.frontmatter.date)}
                </CreatedTime>
              )}
              <ModifiedTime>
                <i className="twa twa-cloud-with-rain"></i> Last watered on{' '}
                {formatDate(modifiedTime)}
              </ModifiedTime>
            </TimeContainer>
          </Metadata>
        </Header>
        <Content>
          <MDXProvider
            components={{
              a: (props) => (
                <Tippy
                  interactive={true}
                  placement="auto"
                  animation="shift-away"
                  inertia={true}
                  content={
                    <Tooltip>
                      {mdx.inboundReferences &&
                      mdx.inboundReferences.find(
                        (inRef) => inRef.frontmatter.title === props.title
                      ) ? (
                        <>
                          <h1>{props.title}</h1>
                          <p>
                            {mdx.inboundReferences
                              .find(
                                (inRef) =>
                                  inRef.frontmatter.title === props.title
                              )
                              .excerpt.replace(/\[ /g, '')
                              .replace(/ \]/g, '')}
                          </p>
                        </>
                      ) : mdx.outboundReferences &&
                        mdx.outboundReferences.find(
                          (outRef) => outRef.frontmatter.title === props.title
                        ) ? (
                        <>
                          <h1>{props.title}</h1>
                          <p>
                            {mdx.outboundReferences
                              .find(
                                (inRef) =>
                                  inRef.frontmatter.title === props.title
                              )
                              .excerpt.replace(/\[ /g, '')
                              .replace(/ \]/g, '')}
                          </p>
                        </>
                      ) : props.href.match(
                          // eslint-disable-next-line no-useless-escape
                          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                        ) ? (
                        <p>
                          This is an external link{' '}
                          <i className="twa twa-globe-with-meridians"></i>
                        </p>
                      ) : (
                        <>
                          <p>
                            <em>
                              {/* eslint-disable-next-line react/no-unescaped-entities */}
                              This note doesn't exist yet
                            </em>{' '}
                            <i className="twa twa-exploding-head"></i>
                          </p>
                          <p>
                            <i className="twa twa-bird"></i>{' '}
                            <a
                              href={`https://twitter.com/intent/tweet?text=Hey%20%40ellyloel!%20You%20should%20write%20a%20note%20about%20${props.title}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              tweet
                            </a>{' '}
                            <em>at me to add it!</em>
                          </p>
                        </>
                      )}
                    </Tooltip>
                  }
                >
                  {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                  <a {...props} />
                </Tippy>
              ),
            }}
          >
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </Content>
        <GraphRefsContainer>
          <References ref={ref}>
            {mdx.inboundReferences.length > 0 ? (
              <>
                <h2>Referenced in:</h2>
                <ul>
                  {mdx.inboundReferences.map((ref, index) => (
                    <li key={index}>
                      <Tippy
                        interactive={true}
                        placement="auto"
                        animation="shift-away"
                        inertia={true}
                        content={
                          <Tooltip>
                            {mdx.inboundReferences &&
                            mdx.inboundReferences.find(
                              (inRef) =>
                                inRef.frontmatter.title ===
                                ref.frontmatter.title
                            ) ? (
                              <>
                                <h1>{ref.frontmatter.title}</h1>
                                <p>
                                  {mdx.inboundReferences
                                    .find(
                                      (inRef) =>
                                        inRef.frontmatter.title ===
                                        ref.frontmatter.title
                                    )
                                    .excerpt.replace(/\[ /g, '')
                                    .replace(/ \]/g, '')}
                                </p>
                              </>
                            ) : (
                              <>
                                <h1>{ref.frontmatter.title}</h1>
                                <p>
                                  {mdx.outboundReferences
                                    .find(
                                      (inRef) =>
                                        inRef.frontmatter.title ===
                                        ref.frontmatter.title
                                    )
                                    .excerpt.replace(/\[ /g, '')
                                    .replace(/ \]/g, '')}
                                </p>
                              </>
                            )}
                          </Tooltip>
                        }
                      >
                        <Link to={`/notes/${ref.frontmatter.slug}`}>
                          {ref.frontmatter.title}
                        </Link>
                      </Tippy>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <h2 style={{ marginBottom: 0 }}>No references</h2>
            )}
          </References>
          <GraphStyled>
            <Graph location={'note'} data={mdx} width={width} />
          </GraphStyled>
        </GraphRefsContainer>
      </Container>
      <FooterStyled>
        <Footer />
      </FooterStyled>
    </Layout>
  );
};

export default NoteTemplate;

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
          excerpt
        }
      }
      outboundReferences {
        ... on Mdx {
          frontmatter {
            title
            slug
          }
          excerpt
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
