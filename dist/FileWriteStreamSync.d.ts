/// <reference types="node" />
import { Writable } from "./Writable";
import fs from "fs";
import stream from "stream";
export interface Options extends stream.WritableOptions {
    flags: string;
    encoding?: BufferEncoding;
    mode: number;
    autoClose: boolean;
}
export declare class FileWriteStreamSync extends Writable {
    fd?: number;
    pos: number;
    size: number;
    destroyed: boolean;
    readable: boolean;
    options: Options;
    constructor(filepath: string | fs.PathLike, options?: Options);
    destroy(): this;
    write(chunk: any): boolean;
}
