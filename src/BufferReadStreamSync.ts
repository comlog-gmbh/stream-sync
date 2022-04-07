import {Readable} from "./Readable";
import {ReadableOptions} from "./ReadableOptions";

export class BufferReadStreamSync extends Readable {
	private data : Buffer
	destroyed = false;
	readable = false;

	constructor(data: string|Buffer, options?: ReadableOptions) {
		super(options);
		this.data = Buffer.from(data);
		this.readable = true;
	}

	private _autoclose() {
		if (this.data && this.data.length < 1) {
			if (this._readableState.autoDestroy) this.destroy();
			return true;
		}
		return false;
	}

	destroy() : this {
		if (this.data) this.data = Buffer.alloc(0);
		this.destroyed = true;
		this.readable = false;
		return this;
	}

	read(size?: number): Buffer|string|null {
		if (this.data.length < 1) {
			if (this.destroyed) throw Error('Buffer data destroyed!');
			else return null;
		}

		if (!size) size = 4096;
		if (size > this.data.length) size = this.data.length;
		if (this._autoclose()) {
			this.emit('end');
			return null;
		}

		let res = this.data.slice(0, size);
		this.data = this.data.slice(size);
		return res;
	}

	toString(encoding? : BufferEncoding | undefined, start?: number, end?: number) {
		return this.data.toString(encoding, start, end);
	}

	toBuffer() { return this.data; }
}