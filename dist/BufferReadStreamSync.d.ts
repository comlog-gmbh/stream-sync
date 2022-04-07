/// <reference types="node" />
import { Readable } from "./Readable";
import { ReadableOptions } from "./ReadableOptions";
export declare class BufferReadStreamSync extends Readable {
    private data;
    destroyed: boolean;
    readable: boolean;
    constructor(data: string | Buffer, options?: ReadableOptions);
    private _autoclose;
    destroy(): this;
    read(size?: number): Buffer | string | null;
    toString(encoding?: BufferEncoding | undefined, start?: number, end?: number): string;
    toBuffer(): Buffer;
}
