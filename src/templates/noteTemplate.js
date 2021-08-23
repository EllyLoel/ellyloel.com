import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export default function noteTemplate({ data }) {
	const { mdx } = data;

	return (
		<article>
			<MDXRenderer>{mdx.body}</MDXRenderer>
			{mdx.inboundReferences.length > 0 ? <p>Referenced in:</p> : ''}
			<ul>
				{mdx.inboundReferences.map(ref => (
					<li>
						<Link to={`/notes/${ref.slug}`}>
							{ref.frontmatter.title}
						</Link>
					</li>
				))}
			</ul>
			<Link to='/'>Back Home</Link>
		</article>
	);
}

export const query = graphql`
	query ($slug: String!) {
		mdx(slug: { eq: $slug }) {
			body
			inboundReferences {
				... on Mdx {
					frontmatter {
						title
					}
					slug
				}
			}
		}
	}
`;
