import { LitElement } from 'lit';
import '../../components/button-group/button-group';
import type SlRadio from '../../components/radio/radio';
export default class SlRadioGroup extends LitElement {
    static styles: import("lit").CSSResult;
    defaultSlot: HTMLSlotElement;
    hasButtonGroup: boolean;
    label: string;
    fieldset: boolean;
    required: boolean;
    connectedCallback(): void;
    getAllRadios(): SlRadio[];
    handleRadioClick(event: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-radio-group': SlRadioGroup;
    }
}
