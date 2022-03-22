import Writable from "./Writable";
import * as fs from "fs";
import stream from "stream";

interface Options extends stream.WritableOptions {
	flags : string; // See support of file system flags. Default: 'r'.
	encoding?: BufferEncoding; // Default: undefined
	mode: number; // Default: 0o666
	autoClose: boolean; // Default: true
	//fs: any|null; // Default: null
}

const defaults = {
	flags : 'w',
	encoding: undefined,
	mode: 0o666,
	autoClose: true
} as Options;

class FileWriteStreamSync extends Writable {
	fd?: number;
	pos = 0;
	size: number;
	destroyed = false;
	readable = false;
	options = defaults;

	constructor(filepath: string|fs.PathLike, options: Options) {
		super(Object.assign({}, defaults, options));
		this.fd = fs.openSync(filepath, this.options.flags, this.options.mode);
		let stat = fs.statSync(filepath);
		this.size = stat.size;
		this.readable = true;
	}

	destroy(): this {
		if (this.fd) fs.closeSync(this.fd);
		this.fd = undefined;
		return super.destroy();
	}

	write(chunk: any): boolean {
		if (!this.fd) {
			if (this.destroyed) throw Error('File handler destroyed!');
			else throw Error('File handler not found!');
		}
		if (typeof chunk == 'string') chunk = Buffer.from(chunk);
		return fs.writeSync(this.fd, chunk) > 0;
		//return super.write(chunk, callback);
	}
}

export default FileWriteStreamSync;