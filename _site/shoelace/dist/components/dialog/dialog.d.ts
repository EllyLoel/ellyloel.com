import { LitElement } from 'lit';
import '../../components/icon-button/icon-button';
export default class SlDialog extends LitElement {
    static styles: import("lit").CSSResult;
    dialog: HTMLElement;
    panel: HTMLElement;
    overlay: HTMLElement;
    private readonly hasSlotController;
    private readonly localize;
    private modal;
    private originalTrigger;
    open: boolean;
    label: string;
    noHeader: boolean;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    show(): Promise<void>;
    hide(): Promise<void>;
    private requestClose;
    handleKeyDown(event: KeyboardEvent): void;
    handleOpenChange(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-dialog': SlDialog;
    }
}
