import { LitElement } from 'lit';
import '../../components/icon/icon';
export default class SlMenuItem extends LitElement {
    static styles: import("lit").CSSResult;
    private cachedTextLabel;
    defaultSlot: HTMLSlotElement;
    menuItem: HTMLElement;
    checked: boolean;
    value: string;
    disabled: boolean;
    firstUpdated(): void;
    getTextLabel(): string;
    handleCheckedChange(): void;
    handleDisabledChange(): void;
    handleDefaultSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-menu-item': SlMenuItem;
    }
}
