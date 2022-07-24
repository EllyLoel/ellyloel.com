import * as React from 'react';
import Component from '../../components/animation/animation';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlCancel: (e: Event) => void;
    onSlFinish: (e: Event) => void;
    onSlStart: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlCancel" | "onSlFinish" | "onSlStart"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
