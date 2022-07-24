import * as React from 'react';
import Component from '../../components/menu/menu';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlSelect: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlSelect"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
