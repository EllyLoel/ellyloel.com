import * as React from 'react';
import Component from '../../components/resize-observer/resize-observer';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlResize: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlResize"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
