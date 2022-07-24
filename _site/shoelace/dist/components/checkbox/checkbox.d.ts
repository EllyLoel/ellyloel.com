import { LitElement } from 'lit';
export default class SlCheckbox extends LitElement {
    static styles: import("lit").CSSResult;
    input: HTMLInputElement;
    private readonly formSubmitController;
    private hasFocus;
    name: string;
    value: string;
    disabled: boolean;
    required: boolean;
    checked: boolean;
    indeterminate: boolean;
    invalid: boolean;
    defaultChecked: boolean;
    firstUpdated(): void;
    click(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    reportValidity(): boolean;
    setCustomValidity(message: string): void;
    handleClick(): void;
    handleBlur(): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleStateChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-checkbox': SlCheckbox;
    }
}
