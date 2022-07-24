import { LitElement } from 'lit';
import '../../components/icon/icon';
export default class SlAnimatedImage extends LitElement {
    static styles: import("lit").CSSResult;
    frozenFrame: string;
    isLoaded: boolean;
    animatedImage: HTMLImageElement;
    src: string;
    alt: string;
    play: boolean;
    handleClick(): void;
    handleLoad(): void;
    handleError(): void;
    handlePlayChange(): void;
    handleSrcChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-animated-image': SlAnimatedImage;
    }
}
