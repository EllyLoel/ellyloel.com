import { LitElement } from 'lit';
export default class SlResizeObserver extends LitElement {
    static styles: import("lit").CSSResult;
    private resizeObserver;
    private observedElements;
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleSlotChange(): void;
    startObserver(): void;
    stopObserver(): void;
    handleDisabledChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-resize-observer': SlResizeObserver;
    }
}
