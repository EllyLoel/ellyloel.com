module.exports = (page) => {
	const inputPath = page.inputPath.replace(/^\.\//, "").replace(/\s/g, "%20");
	return `
      <a href="https://github.com/ellyloel/ellyloel.com/edit/main/${inputPath}">
        <sl-icon library="fa" name="fas-pen-to-square" class="[ icon ]"></sl-icon> Edit this page
      </a>
    `;
};
