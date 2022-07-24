import { LitElement } from 'lit';
import '../../components/icon-button/icon-button';
export default class SlTag extends LitElement {
    static styles: import("lit").CSSResult;
    private readonly localize;
    variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
    size: 'small' | 'medium' | 'large';
    pill: boolean;
    removable: boolean;
    handleRemoveClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tag': SlTag;
    }
}
