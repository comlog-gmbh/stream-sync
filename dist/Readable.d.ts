/// <reference types="node" />
import ReadableOptions from "./ReadableOptions";
import stream from "stream";
declare class Readable extends stream.Readable {
    destroyed: boolean;
    readable: boolean;
    _readableState: ReadableOptions;
    constructor(opts?: ReadableOptions);
    setEncoding(encoding: BufferEncoding): this;
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
