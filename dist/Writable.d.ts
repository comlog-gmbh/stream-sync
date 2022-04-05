/// <reference types="node" />
import WritableOptions from './WritableOptions';
import stream from "stream";
declare class Writable extends stream.Writable {
    destroyed: boolean;
    writable: boolean;
    _writableState: WritableOptions;
    constructor(opts?: WritableOptions);
    destroy(): this;
    end(): this;
    write(chunk: any): boolean;
    _write(chunk: any, encoding?: BufferEncoding): void;
    setDefaultEncoding(encoding: BufferEncoding): this;
}
export default Writable;
