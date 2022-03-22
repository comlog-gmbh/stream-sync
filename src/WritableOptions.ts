import stream from "stream";

interface WritableOptions extends stream.WritableOptions {
	encoding?: BufferEncoding
}

export default WritableOptions;