/// <reference types="node" />
import Readable from "./Readable";
import * as fs from "fs";
import ReadableOptions from "./ReadableOptions";
interface FileReadableOptions extends ReadableOptions {
    flags?: string;
    encoding?: BufferEncoding;
    mode?: number;
}
declare class FileReadStreamSync extends Readable {
    fd?: number | null;
    pos: number;
    size: number;
    destroyed: boolean;
    readable: boolean;
    flags: string;
    mode: number;
    filepath: string | fs.PathLike;
    constructor(filepath: string | fs.PathLike, options?: FileReadableOptions);
    private _autoclose;
    _destroy(): void;
    /**
     * Sync read line
     * @param [br] line break
     */
    readLine(br?: Buffer | string): Buffer | string | null;
    /**
     * Sync read
     * @param size
     */
    _read(size?: number, encoding?: BufferEncoding): string | Buffer | null;
}
export default FileReadStreamSync;
