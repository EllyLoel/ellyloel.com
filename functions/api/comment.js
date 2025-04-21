import { Octokit } from "octokit";
import markdownit from "markdown-it";

const REPO_OWNER = "EllyLoel";
const REPO_NAME = "ellyloel.com";
const MAIN_BRANCH_NAME = "main";

/**
 * POST /api/comment
 */
export async function onRequestPost(context) {
	try {
		const input = await context.request.formData();
		const referrer = context.request.headers.get("referer");

		// Convert FormData to JSON
		// NOTE: Allows multiple values per key
		let output = {};
		for (let [key, value] of input) {
			let tmp = output[key];
			if (tmp === undefined) {
				output[key] = value;
			} else {
				output[key] = [].concat(tmp, value);
			}
		}

		// If the output contains data in the honeypot field then return early
		if (output.email) return Response.redirect(`${referrer}#success`);

		const postName = new URL(referrer).pathname.replaceAll("/", "");
		const octokit = new Octokit({ auth: context.env.GITHUB_COMMENT_PRS_TOKEN });

		const { sha, postData } = await getPostData(octokit, postName);

		const now = Date.now();
		const dateObj = new Date();
		// Add Melbourne's UTC offset (during both standard and daylight saving time)
		const melbourneOffset = dateObj.toLocaleString("en-AU", { hour12: false, timeZone: "Australia/Melbourne" }).split(", ")[1].split(":")[0] - dateObj.getUTCHours();
		const melbourneDate = new Date(dateObj.getTime() + (melbourneOffset * 60 * 60 * 1000));

		/* eslint-disable sort-keys */
		postData.comments.push({
			id: now,
			date: melbourneDate.toISOString(),
			createdBy: output.name.trim(),
			website: new URL(
					/^https?:\/\//.test(output.website)
						? output.website
						: `https://${output.website}`
				).toString(),
			html: markdownit({
					breaks: true,
					html: true,
					linkify: true,
					typographer: true,
				}).render(output.comment).trim(),
		});
		/* eslint-enable sort-keys */

		const mainBranch = await octokit.rest.repos.getBranch({
			branch: MAIN_BRANCH_NAME,
			owner: REPO_OWNER,
			repo: REPO_NAME,
		});

		const commentBranchName = `add-comment_${now}`;
		await octokit.rest.git.createRef({
			owner: REPO_OWNER,
			ref: `refs/heads/${commentBranchName}`,
			repo: REPO_NAME,
			sha: mainBranch.data.commit.sha,
		});

		// create a new commit for the comment. The "sha" is required if the file already exists,
		// otherwise it'll be undefined (which is expected for new files)
		await octokit.rest.repos.createOrUpdateFileContents({
			branch: commentBranchName,
			content: Buffer.from(JSON.stringify(postData, null, 2), "utf8").toString("base64"),
			message: `Comment from ${output.name} on ${postName}`,
			owner: REPO_OWNER,
			path: `src/content/blog/${postName}.11tydata.json`,
			repo: REPO_NAME,
			sha,
		});

		// create the pull request from the latest commit on the new branch
		// and compare it against the main branch.
		await octokit.rest.pulls.create({
			base: MAIN_BRANCH_NAME,
			body: `Comment from ${output.name} on ${postName}`,
			head: commentBranchName,
			owner: REPO_OWNER,
			repo: REPO_NAME,
			title: `Comment from ${output.name} on ${postName}`,
		});

		return Response.redirect(`${referrer}#success`);
	} catch (error) {
		console.error(`An unexpected error occurred: ${JSON.stringify(error)}`);

		return new Response(error.toString(), {
			status: 500,
		});
	}
}

async function getPostData(octokit, postName) {
	let content;

	try {
		const { data: fileData } = await octokit.rest.repos.getContent({
			headers: {
				accept: "application/vnd.github+json",
			},
			owner: REPO_OWNER,
			path: `src/input/content/garden/${postName}.11tydata.json`,
			repo: REPO_NAME,
		});

		content = JSON.parse(
			Buffer.from(fileData.content.toString(), "base64").toString("utf8")
		);

		return {
			postData: content,
			sha: fileData.sha,
		};
	} catch (error) {
		console.error(`No post data found for ${postName}: ${error.toString()}`);

		content = {
			comments: [],
		};
	}

	return {
		postData: content,
		sha: undefined, // sha is undefined for things that don't exist (yet)
	};
}
