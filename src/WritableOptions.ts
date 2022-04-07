import stream from "stream";

export interface WritableOptions extends stream.WritableOptions {
	encoding?: BufferEncoding
}