import * as React from 'react';
import Component from '../../components/checkbox/checkbox';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlBlur: (e: Event) => void;
    onSlChange: (e: Event) => void;
    onSlFocus: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlBlur" | "onSlFocus" | "onSlChange"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
