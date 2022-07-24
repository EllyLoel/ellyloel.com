import { LitElement } from 'lit';
import '../../components/icon/icon';
export default class SlIconButton extends LitElement {
    static styles: import("lit").CSSResult;
    private hasFocus;
    button: HTMLButtonElement | HTMLLinkElement;
    name?: string;
    library?: string;
    src?: string;
    href?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    download?: string;
    label: string;
    disabled: boolean;
    click(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    handleBlur(): void;
    handleFocus(): void;
    handleClick(event: MouseEvent): void;
    render(): import("lit-html").TemplateResult<2 | 1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-icon-button': SlIconButton;
    }
}
