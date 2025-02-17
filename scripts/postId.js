#!/usr/bin/env node

// https://github.com/bobmonsour/rssid/

import crypto from "crypto";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// Display the help message
function displayHelp() {
	console.log(`
Usage: postId [options]

Options:
  -h, -help      Display this help message
  -a, -add       Add the postId item to the front matter
  -r, -remove    Remove the postId item from the front matter
  -e=<ext>       Process all files with this extension (.md if not specified)
  -f=<filename>  Process the specified file (.md extension if not specified)
  -d=<dir>       Specify the directory to process (current directory if not specified)

Either -a or -r (or -add or -remove) MUST be specified. In the absence of
the -e=<ext> or the -f=<filename> option, all .md files will be processed.

This command operates on files in the specified directory (or current directory
if not specified). It adds or removes a YAML front matter item named "id" that
is the md5 hash of the full filename (including the extension) for the file(s)
processed. If the file(s) contain no YAML front matter, an error is noted, yet
other files will still be processed as needed.`);
}

// Variables to store command line options
let addOption = false;
let removeOption = false;
let specifiedExtension = ".md";
let specifiedFilename = null;
let targetDirectory = process.cwd(); // Default to current directory

// Process command line options
process.argv.slice(2).forEach((arg) => {
	switch (true) {
		case arg.toLowerCase() === "-h" || arg.toLowerCase() === "-help":
			displayHelp();
			process.exit(0);
			break;
		case arg.toLowerCase() === "-a" || arg.toLowerCase() === "-add":
			addOption = true;
			break;
		case arg.toLowerCase() === "-r" || arg.toLowerCase() === "-remove":
			removeOption = true;
			break;
		case arg.startsWith("-e="):
			specifiedExtension = arg.split("=")[1];
			if (!specifiedExtension.startsWith(".")) {
				specifiedExtension = `.${specifiedExtension}`;
			}
			break;
		case arg.startsWith("-f="):
			specifiedFilename = arg.split("=")[1];
			if (!path.extname(specifiedFilename)) {
				specifiedFilename += ".md";
			}
			break;
		case arg.startsWith("-d="):
			targetDirectory = arg.split("=")[1];
			// Resolve relative paths
			if (!path.isAbsolute(targetDirectory)) {
				targetDirectory = path.resolve(process.cwd(), targetDirectory);
			}
			break;
		default:
			console.error(`Error: Invalid option '${arg}'`);
			displayHelp();
			process.exit(1);
			break;
	}
});

// Ensure either -a, -add, -r, or -rremove is present
if (!addOption && !removeOption) {
	console.error("Error: One or more command line options must be specified.");
	console.log("Here is the -help output to provide guidance.");
	displayHelp();
	process.exit(1);
}

// Generate MD5 hash of a string (the filename)
function generateMD5Hash(str) {
	return crypto.createHash("md5").update(str).digest("hex");
}

// Process a single file
function processFile(filename) {
	const filePath = path.join(targetDirectory, filename);
	const fileContent = fs.readFileSync(filePath, "utf-8");

	// Extract existing front matter
	const frontMatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n/);
	let frontMatter = {};
	let content = fileContent;

	if (frontMatterMatch) {
		frontMatter = yaml.load(frontMatterMatch[1], { schema: yaml.JSON_SCHEMA });
		content = fileContent.slice(frontMatterMatch[0].length);
	} else {
		console.error(`Error: No front matter found in file: ${filename}`);
		return false;
	}

	// Add or remove id based on the option
	if (addOption && !frontMatter.id) {
		// Generate an MD5 hash of the filename, including the extension
		const id = generateMD5Hash(filename);
		console.log(`Adding id to file: ${filename}`);
		frontMatter.id = id;
	} else if (removeOption && frontMatter.id) {
		console.log(`Removing id from file: ${filename}`);
		delete frontMatter.id;
	}

	// Reconstruct the file content with updated front matter
	const newFrontMatter = yaml.dump(frontMatter, {
		lineWidth: -1,
		schema: yaml.JSON_SCHEMA,
	});
	const newFileContent = `---\n${newFrontMatter}---\n${content}`;
	fs.writeFileSync(filePath, newFileContent, "utf-8");
	return true; // Return true if processed successfully, false otherwise
}

if (specifiedFilename) {
	processFile(specifiedFilename);
} else {
	// Read the directory contents
	fs.readdir(targetDirectory, (err, files) => {
		if (err) {
			console.error("Unable to read directory:", err);
			process.exit(1);
		}

		// Filter files by the specified extension
		const filteredFiles = files.filter(
			(file) => path.extname(file) === specifiedExtension
		);
		// Process each file with the specified extension
		let allProcessedSuccessfully = true;
		filteredFiles.forEach((filename) => {
			const result = processFile(filename);
			if (!result) {
				allProcessedSuccessfully = false;
			}
		});

		if (allProcessedSuccessfully) {
			console.log(`Processed all files with extension: ${specifiedExtension}`);
		}
	});
}
