import { LitElement } from 'lit';
export default class SlDivider extends LitElement {
    static styles: import("lit").CSSResult;
    vertical: boolean;
    firstUpdated(): void;
    handleVerticalChange(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-divider': SlDivider;
    }
}
