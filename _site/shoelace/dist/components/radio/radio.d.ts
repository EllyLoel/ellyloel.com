import { LitElement } from 'lit';
import { FormSubmitController } from '../../internal/form';
export default class SlRadio extends LitElement {
    static styles: import("lit").CSSResult;
    input: HTMLInputElement;
    protected readonly formSubmitController: FormSubmitController;
    protected hasFocus: boolean;
    name: string;
    value: string;
    disabled: boolean;
    checked: boolean;
    invalid: boolean;
    defaultChecked: boolean;
    connectedCallback(): void;
    click(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    reportValidity(): boolean;
    setCustomValidity(message: string): void;
    handleBlur(): void;
    handleClick(): void;
    handleFocus(): void;
    handleCheckedChange(): void;
    handleDisabledChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-radio': SlRadio;
    }
}
