import * as React from 'react';
import Component from '../../components/select/select';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlClear: (e: Event) => void;
    onSlChange: (e: Event) => void;
    onSlFocus: (e: Event) => void;
    onSlBlur: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlBlur" | "onSlFocus" | "onSlChange" | "onSlClear"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
