import ReadableOptions from "./ReadableOptions";
import stream from "stream";

class Readable extends stream.Readable {
	destroyed: boolean = false;
	readable: boolean = false;
	_readableState: ReadableOptions = {
		encoding: undefined,
		emitClose: true,
		autoDestroy: true,
		buffer: null
	};

	constructor(opts?: ReadableOptions) {
		super();
		this._readableState = Object.assign({}, this._readableState, opts || {});
		this.destroyed = false;
		this.readable = true;
	}

	setEncoding(encoding: BufferEncoding): this {
		this._readableState.encoding = encoding;
		try { super.setEncoding(encoding); } catch (e) {};
		return this;
	}

	_read(size: number, encoding?: BufferEncoding) {
		this.push(null, encoding);
	}

	push(chunk: any, encoding?: BufferEncoding): boolean {
		this._readableState.buffer = {chunk: chunk, encoding: encoding};
		if (chunk !== null) this.emit('data', chunk, encoding);
		else {
			this.emit('end');

			if (this._readableState.emitClose) {
				this.emit('close');
			}

			if (this._readableState.autoDestroy) {
				this.destroy();
			}
		}

		return true;
	}

	read(size?: number): string|Buffer|null {
		if (!size) size = 4096;
		this._readableState.buffer = null;
		this._read(size, this._readableState.encoding);
		let buffer = this._readableState.buffer;
		let data = buffer && buffer.chunk ? buffer.chunk : null;
		if (data && buffer.encoding) data = data.toString(buffer.encoding);
		return data;
	}

	pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean | undefined }): T {
		let buf: Buffer|string|null;
		while ((buf = this.read()) !== null) {
			destination.write(buf);
		}

		return destination;
	}

	_destroy() {}

	destroy(): this {
		delete this._readableState.buffer;
		this.destroyed = true;
		this.readable = false;
		if (!this.destroyed) this._destroy();
		return this;
	}
}

export default Readable;