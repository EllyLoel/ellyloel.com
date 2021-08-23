import React from 'react';
import { Link, graphql } from 'gatsby';

const Home = ({
	data: {
		allMdx: { edges },
	},
}) => {
	const Notes = edges.map(edge => (
		<article>
			<Link to={`/notes/${edge.node.slug}`}>
				<h1>{edge.node.frontmatter.title}</h1>
			</Link>
			<p>{edge.node.frontmatter.date}</p>
		</article>
	));
	return <section>{Notes}</section>;
};

export default Home;
export const pageQuery = graphql`
	query MyQuery {
		allMdx {
			edges {
				node {
					slug
					frontmatter {
						title
						date
					}
				}
			}
		}
	}
`;
