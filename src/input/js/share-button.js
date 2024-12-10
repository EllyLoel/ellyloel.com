class ShareButton extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "share-button", ShareButton);
		}
	}

	#shareInner = `<svg aria-hidden="true" class="icon icon-share-from-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
  <path d="M352 224H305.5c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8h-2.5c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144h80V34.7C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2H384c-17.7 0-32-14.3-32-32V224zM80 96c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16H400c8.8 0 16-7.2 16-16V384c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V112C0 67.8 35.8 32 80 32h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H80z"></path>
</svg>
<span class="[ visually-hidden ]">Share</span>`;

	#copyInner = `<svg aria-hidden="true" class="icon icon-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
  <path fill="currentColor" d="M0 256C0 167.6 71.6 96 160 96l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96 43-96 96s43 96 96 96l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0C71.6 416 0 344.4 0 256zm576 0c0 88.4-71.6 160-160 160l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96-43 96-96s-43-96-96-96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c88.4 0 160 71.6 160 160zM192 224l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
</svg>
<span class="[ visually-hidden ]">Copy link</span>`;

	constructor() {
		super();

		if ("share" in navigator) {
			this.shareButton = document.createElement("button");
			this.shareButton.setAttribute("type", "button");

			this.shareButton.innerHTML = this.#shareInner;

			this.appendChild(this.shareButton);

			this.shareButton.addEventListener("click", async (event) => {
				try {
					await navigator.share({
						text: document.querySelector(`meta[name="description"]`)?.content,
						title: document.title,
						url: window.location.href,
					});
				} catch (error) {
					console.error(error);
				}
			});
		}

		if ("clipboard" in navigator) {
			this.copyButton = document.createElement("button");
			this.copyButton.setAttribute("type", "button");

			this.copyButton.innerHTML = this.#copyInner;

			this.appendChild(this.copyButton);

			this.copyButton.addEventListener("click", async (event) => {
				try {
					await navigator.clipboard.writeText(
						`${document.title}\n${window.location.href}\n${
							document.querySelector(`meta[name="description"]`)?.content
						}`.trim()
					);
				} catch (error) {
					console.error(error);
				}
			});
		}
	}
}

ShareButton.register();
