import { LitElement } from 'lit';
import type SlMenuItem from '../../components/menu-item/menu-item';
export interface MenuSelectEventDetail {
    item: SlMenuItem;
}
export default class SlMenu extends LitElement {
    static styles: import("lit").CSSResult;
    menu: HTMLElement;
    defaultSlot: HTMLSlotElement;
    private typeToSelectString;
    private typeToSelectTimeout;
    firstUpdated(): void;
    getAllItems(options?: {
        includeDisabled: boolean;
    }): SlMenuItem[];
    getCurrentItem(): SlMenuItem | undefined;
    setCurrentItem(item: SlMenuItem): void;
    typeToSelect(event: KeyboardEvent): void;
    handleClick(event: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-menu': SlMenu;
    }
}
