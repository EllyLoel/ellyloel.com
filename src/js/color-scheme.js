const SELECTORS = {
  container: ".theme-switcher",
  radioGroup: ".theme-switcher-radio-group",
  radioButton: "sl-radio-button[name=color-scheme]",
  openButton: "#theme-switcher-open-button",
};

const THEME_STORAGE_KEY = "color-scheme";

class ThemePicker {
  constructor() {
    this.isOpen = false;
    this.activeTheme = "auto";
    this.hasLocalStorage = typeof Storage !== "undefined";
    this.hasThemeColorMeta =
      !!document.querySelector('meta[name="theme-color"]') && window.metaColors;

    this.root = document.documentElement;
    this.container = document.querySelector(SELECTORS.container);
    this.radioGroup = document.querySelector(SELECTORS.radioGroup);
    this.radioButtons = Array.from(
      this.radioGroup.querySelectorAll(SELECTORS.radioButton)
    );
    this.openButton = document.querySelector(SELECTORS.openButton);

    this.mutationObserver = new MutationObserver((entries) => {
      if (entries[0].target.children?.[1]?.nodeName === "SL-BUTTON-GROUP")
        entries[0].target.children[1].setAttribute(
          "exportparts",
          "base: button-group__base"
        );
    });

    this.init();
  }

  init() {
    const storedPreference = this.getStoredPreference();

    if (storedPreference) {
      this.activeTheme = storedPreference;
    }

    this.setActiveItem();
    this.bindEvents();
  }

  bindEvents() {
    this.mutationObserver.observe(this.radioGroup.shadowRoot, {
      childList: true,
      subtree: true,
    });

    this.openButton.addEventListener("click", () => this.container.show());

    this.radioButtons.forEach((radioButton) => {
      radioButton.addEventListener("click", (e) => {
        if (this.radioGroup.value !== e.target.value)
          this.setTheme(e.target.value);
      });
    });
  }

  getStoredPreference() {
    if (this.hasLocalStorage) {
      return localStorage.getItem(THEME_STORAGE_KEY);
    }
    return false;
  }

  setActiveItem() {
    // Set the theme switchers value to the documents theme
    const prevChecked = this.radioGroup.querySelector(`[data-checked=true]`);
    if (prevChecked) prevChecked.dataset.checked = false;

    this.radioGroup.querySelector(
      `[value=${this.activeTheme}]`
    ).dataset.checked = true;

    this.radioGroup.value = this.activeTheme;
  }

  setTheme(newTheme) {
    this.activeTheme = newTheme;
    this.root.setAttribute("color-scheme", newTheme);
    this.root.setAttribute(
      "class",
      `${
        newTheme.includes("light")
          ? "sl-theme-light"
          : newTheme.includes("dark")
          ? "sl-theme-dark"
          : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "sl-theme-light"
          : "sl-theme-dark"
      }`
    );

    if (this.hasLocalStorage) {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }

    if (this.hasThemeColorMeta) {
      const metaColor = window.metaColors[newTheme];
      const metaTag = document.querySelector('meta[name="theme-color"]');
      metaTag.setAttribute("content", metaColor);
    }

    this.setActiveItem();
  }
}

new ThemePicker();
