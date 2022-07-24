import { LitElement } from 'lit';
import '../../components/icon/icon';
export default class SlBreadcrumb extends LitElement {
    static styles: import("lit").CSSResult;
    defaultSlot: HTMLSlotElement;
    separatorSlot: HTMLSlotElement;
    private readonly localize;
    private separatorDir;
    label: string;
    private getSeparator;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-breadcrumb': SlBreadcrumb;
    }
}
