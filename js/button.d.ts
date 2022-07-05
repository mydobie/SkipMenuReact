import { SkipMenuConfigFull } from './skipMenu';
export declare const openMenu: (config: SkipMenuConfigFull, lastItem?: boolean) => void;
export declare const closeMenu: (config: SkipMenuConfigFull, keepVisibleOnClose?: boolean) => void;
export declare const toggleMenu: (config: SkipMenuConfigFull, keepVisibleOnClose?: boolean) => void;
export declare const createskipMenuButton: (config: SkipMenuConfigFull) => DocumentFragment;
