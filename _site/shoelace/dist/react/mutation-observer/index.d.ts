import * as React from 'react';
import Component from '../../components/mutation-observer/mutation-observer';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & Partial<{
    onSlMutation: (e: Event) => void;
}> & Omit<React.HTMLAttributes<HTMLElement>, "onSlMutation"> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
