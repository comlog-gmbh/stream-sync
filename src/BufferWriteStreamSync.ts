import Writable from "./Writable";

class BufferWriteStreamSync extends Writable {
	private data : Buffer = Buffer.alloc(0);
	length: number = this.data.length;

	constructor() { super(); }

	writeJSON (obj: any) {
		this.write(JSON.stringify(obj));
	}

	write(chunk: string|Buffer|Uint8Array|any): boolean {
		if (typeof chunk == 'string') chunk = Buffer.from(chunk);
		this.data = Buffer.concat([this.data, chunk]);
		this.length = this.data.length;
		return chunk.length > 0;
	}

	toString(encoding? : BufferEncoding | undefined, start?: number, end?: number) {
		return this.data.toString(encoding, start, end);
	}

	toBuffer() { return this.data; }
}

export = BufferWriteStreamSync;