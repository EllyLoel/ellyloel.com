import { LitElement } from 'lit';
import '../../components/icon-button/icon-button';
export default class SlTab extends LitElement {
    static styles: import("lit").CSSResult;
    private readonly localize;
    tab: HTMLElement;
    private readonly attrId;
    private readonly componentId;
    panel: string;
    active: boolean;
    closable: boolean;
    disabled: boolean;
    lang: string;
    focus(options?: FocusOptions): void;
    blur(): void;
    handleCloseClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tab': SlTab;
    }
}
