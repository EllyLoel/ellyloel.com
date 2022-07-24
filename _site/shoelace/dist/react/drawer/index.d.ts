import * as React from 'react';
import Component from '../../components/drawer/drawer';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlShow: (e: Event) => void;
    onSlAfterShow: (e: Event) => void;
    onSlHide: (e: Event) => void;
    onSlAfterHide: (e: Event) => void;
    onSlInitialFocus: (e: Event) => void;
    onSlRequestClose: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlShow" | "onSlAfterShow" | "onSlHide" | "onSlAfterHide" | "onSlInitialFocus" | "onSlRequestClose"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
