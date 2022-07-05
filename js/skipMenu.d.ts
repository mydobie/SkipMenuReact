import { SkipMenuConfig, SkipMenuConfigFull } from './skipMenuTypes';
export type { SkipMenuConfigFull, SkipMenuConfig } from './skipMenuTypes';
export declare class SkipMenu {
    config: SkipMenuConfigFull;
    constructor(config: SkipMenuConfig);
    static version: string;
    getConfig(): SkipMenuConfigFull;
    init(): void;
    _add(): void | null;
    update(): void;
    open(): void;
    close(): void;
    _remove(): void;
    remove(): void;
}
