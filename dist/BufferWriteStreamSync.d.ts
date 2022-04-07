/// <reference types="node" />
import { Writable } from "./Writable";
export declare class BufferWriteStreamSync extends Writable {
    private data;
    length: number;
    constructor(data?: string | Buffer);
    writeJSON(obj: any): void;
    _write(chunk: any, encoding?: BufferEncoding): boolean;
    toString(encoding?: BufferEncoding | undefined, start?: number, end?: number): string;
    toBuffer(): Buffer;
    clear(): void;
    splice(start: number, deleteCount?: number, ...items: Buffer[] | String[] | number[]): Buffer;
    sliceBuffer(start: number, end?: number): Buffer;
    byteAt(pos: number): number | null;
    writeError(err: Error): void;
}
