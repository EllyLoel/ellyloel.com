import { LitElement } from 'lit';
import '../../components/icon/icon';
export default class SlInput extends LitElement {
    static styles: import("lit").CSSResult;
    input: HTMLInputElement;
    private readonly formSubmitController;
    private readonly hasSlotController;
    private readonly localize;
    private hasFocus;
    private isPasswordVisible;
    type: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
    size: 'small' | 'medium' | 'large';
    name: string;
    value: string;
    defaultValue: string;
    filled: boolean;
    pill: boolean;
    label: string;
    helpText: string;
    clearable: boolean;
    togglePassword: boolean;
    noSpinButtons: boolean;
    placeholder: string;
    disabled: boolean;
    readonly: boolean;
    minlength: number;
    maxlength: number;
    min: number | string;
    max: number | string;
    step: number;
    pattern: string;
    required: boolean;
    invalid: boolean;
    autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    autocorrect: string;
    autocomplete: string;
    autofocus: boolean;
    enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    spellcheck: boolean;
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    get valueAsDate(): Date | null;
    set valueAsDate(newValue: Date | null);
    get valueAsNumber(): number;
    set valueAsNumber(newValue: number);
    firstUpdated(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    select(): void;
    setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): void;
    setRangeText(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): void;
    reportValidity(): boolean;
    setCustomValidity(message: string): void;
    handleBlur(): void;
    handleChange(): void;
    handleClearClick(event: MouseEvent): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleInput(): void;
    handleInvalid(): void;
    handleKeyDown(event: KeyboardEvent): void;
    handlePasswordToggle(): void;
    handleValueChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-input': SlInput;
    }
}
