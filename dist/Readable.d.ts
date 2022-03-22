/// <reference types="node" />
import { EventEmitter } from "events";
import ReadableOptions from "./ReadableOptions";
declare class Readable extends EventEmitter {
    destroyed: boolean;
    readable: boolean;
    _readableState: ReadableOptions;
    constructor(opts?: ReadableOptions);
    _read(size: number, encoding?: BufferEncoding): void;
    push(chunk: any, encoding?: BufferEncoding): boolean;
    read(size?: number): string | Buffer | null;
    pipe<T extends NodeJS.WritableStream>(destination: T, options?: {
        end?: boolean | undefined;
    }): T;
    _destroy(): void;
    destroy(): this;
}
export default Readable;
