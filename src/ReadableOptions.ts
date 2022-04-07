import stream from "stream";

export interface ReadableOptions extends stream.ReadableOptions {
	buffer?: null|any
}