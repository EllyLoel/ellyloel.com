import * as React from 'react';
import Component from '../../components/tag/tag';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlRemove: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlRemove"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
