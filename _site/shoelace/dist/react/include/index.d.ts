import * as React from 'react';
import Component from '../../components/include/include';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlLoad: (e: Event) => void;
    onSlError: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlLoad" | "onSlError"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
