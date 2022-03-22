/// <reference types="node" />
import Writable from "./Writable";
declare class BufferWriteStreamSync extends Writable {
    private data;
    length: number;
    constructor();
    writeJSON(obj: any): void;
    write(chunk: string | Buffer | Uint8Array | any): boolean;
    toString(encoding?: BufferEncoding | undefined, start?: number, end?: number): string;
    toBuffer(): Buffer;
}
export = BufferWriteStreamSync;
