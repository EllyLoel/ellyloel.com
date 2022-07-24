import { LitElement } from 'lit';
export default class SlFormatBytes extends LitElement {
    private readonly localize;
    value: number;
    unit: 'byte' | 'bit';
    display: 'long' | 'short' | 'narrow';
    lang: string;
    render(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-format-bytes': SlFormatBytes;
    }
}
