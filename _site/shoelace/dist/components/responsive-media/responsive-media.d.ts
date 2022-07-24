import { LitElement } from 'lit';
export default class SlResponsiveMedia extends LitElement {
    static styles: import("lit").CSSResult;
    aspectRatio: string;
    fit: 'cover' | 'contain';
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-responsive-media': SlResponsiveMedia;
    }
}
