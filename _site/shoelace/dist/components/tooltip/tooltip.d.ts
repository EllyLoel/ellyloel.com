import { LitElement } from 'lit';
export default class SlTooltip extends LitElement {
    static styles: import("lit").CSSResult;
    positioner: HTMLElement;
    tooltip: HTMLElement;
    arrow: HTMLElement;
    private target;
    private hoverTimeout;
    private readonly localize;
    private positionerCleanup;
    content: string;
    placement: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
    disabled: boolean;
    distance: number;
    open: boolean;
    skidding: number;
    trigger: string;
    hoist: boolean;
    connectedCallback(): void;
    firstUpdated(): Promise<void>;
    disconnectedCallback(): void;
    show(): Promise<void>;
    hide(): Promise<void>;
    getTarget(): HTMLElement;
    handleBlur(): void;
    handleClick(): void;
    handleFocus(): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleMouseOver(): void;
    handleMouseOut(): void;
    handleOpenChange(): Promise<void>;
    handleOptionsChange(): void;
    handleDisabledChange(): void;
    hasTrigger(triggerType: string): boolean;
    private startPositioner;
    private updatePositioner;
    private stopPositioner;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tooltip': SlTooltip;
    }
}
