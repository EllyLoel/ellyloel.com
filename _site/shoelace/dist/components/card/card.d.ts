import { LitElement } from 'lit';
export default class SlCard extends LitElement {
    static styles: import("lit").CSSResult;
    private readonly hasSlotController;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-card': SlCard;
    }
}
