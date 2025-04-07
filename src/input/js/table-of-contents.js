class TableOfContents extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "table-of-contents", TableOfContents);
		}
	}

	get heading() {
		return this.querySelector("h2");
	}

	get toc() {
		return this.querySelector(".toc");
	}

	constructor() {
		super();

		this.button = document.createElement("button");

		this.button.innerHTML = `<svg aria-hidden="true" class="inline-icon icon-play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
  <!--! Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. -->
  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>
</svg> ${this.heading.innerHTML}`;
		this.heading.replaceChildren(this.button);

		this.button.setAttribute("aria-expanded", "false");

		this.button.addEventListener("click", () => this.expanded ? this.close() : this.show());
		this.toc.addEventListener("beforematch", () => !this.expanded && this.show());
	}

	show() {
		this.button.setAttribute("aria-expanded", "true");
		this.toc.removeAttribute("hidden");
		this.expanded = true;
	}

	close() {
		this.button.setAttribute("aria-expanded", "false");
		this.toc.setAttribute("hidden", "until-found");
		this.expanded = false;
	}
}

TableOfContents.register();
