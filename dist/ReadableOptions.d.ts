/// <reference types="node" />
import stream from "stream";
interface ReadableOptions extends stream.ReadableOptions {
    buffer?: null | any;
}
export default ReadableOptions;
