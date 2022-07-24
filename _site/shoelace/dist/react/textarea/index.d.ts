import * as React from 'react';
import Component from '../../components/textarea/textarea';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlChange: (e: Event) => void;
    onSlInput: (e: Event) => void;
    onSlFocus: (e: Event) => void;
    onSlBlur: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlBlur" | "onSlFocus" | "onSlChange" | "onSlInput"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
