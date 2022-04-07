import {Writable} from "./Writable";

export class BufferWriteStreamSync extends Writable {
	private data : Buffer = Buffer.alloc(0);
	public length: number = this.data.length;

	constructor(data? : string | Buffer) {
		super();
		if (data) this.write(data);
	}

	writeJSON (obj: any) {
		this.write(JSON.stringify(obj));
	}

	_write(chunk: any, encoding?: BufferEncoding) {
		if (typeof chunk == 'string') chunk = Buffer.from(chunk, encoding);
		this.data = Buffer.concat([this.data, chunk]);
		this.length = this.data.length;
		return chunk.length > 0;
	}

	toString(encoding? : BufferEncoding | undefined, start?: number, end?: number) {
		return this.data.toString(encoding, start, end);
	}

	toBuffer() { return this.data; }

	clear () {
		this.data = Buffer.alloc(0);
		this.length = 0;
	}

	splice(start: number, deleteCount : number = 0, ...items: Buffer[] | String[] | number[]) {
		var append = [];
		append.push(this.data.slice(0, start));
		let res = this.data.slice(start, start+deleteCount);
		if (items.length > 0) {
			items.map((val) => {
				if (typeof val == 'string')
					val = Buffer.from(val);
				else if (typeof val == 'number')
					val = Buffer.from([val]);
				append.push(val);
			});
		}

		append.push(this.data.slice(start+deleteCount));

		this.data = Buffer.concat(append);
		this.length = this.data.length;
		return res;
	}

	sliceBuffer(start: number, end?: number) : Buffer {
		if (!end) end = this.data.length;
		return this.data.slice(start, end);
	}

	byteAt(pos:number) {
		if (pos > this.data.length || pos < 0) return null;
		return this.data[pos];
	}

	writeError (err: Error) {
		this.writeJSON({
			name: err.name,
			message: err.message,
			stack: err.stack
		});
	}
}