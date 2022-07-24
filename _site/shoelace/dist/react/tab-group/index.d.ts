import * as React from 'react';
import Component from '../../components/tab-group/tab-group';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlTabShow: (e: Event) => void;
    onSlTabHide: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlTabShow" | "onSlTabHide"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
