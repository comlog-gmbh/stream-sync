import {Readable} from "./Readable";
import fs from "fs";
import {ReadableOptions} from "./ReadableOptions";

export interface FileReadableOptions extends ReadableOptions {
	flags? : string; // See support of file system flags. Default: 'r'.
	encoding?: BufferEncoding; // Default: undefined
	mode?: number; // Default: 0o666
}

const defaults = {
	encoding: undefined,
	autoClose: true
} as FileReadableOptions;

export class FileReadStreamSync extends Readable {
	fd?: number|null;
	pos = 0;
	size: number;
	destroyed = false;
	readable = false;
	flags = 'r';
	mode = 0o666;
	filepath : string|fs.PathLike;

	constructor(filepath: string|fs.PathLike, options?: FileReadableOptions) {
		super(Object.assign({}, defaults, options || {}));
		this.filepath = filepath;

		if (options) {
			if (options.flags) this.flags = options.flags;
			if (options.mode) this.mode = options.mode;
		}

		this.fd = fs.openSync(filepath, this.flags, this.mode);
		let stat = fs.statSync(filepath);
		this.size = stat.size;
		this.readable = true;
	}

	private _autoclose() {
		if (this.fd && this.pos >= this.size) {
			if (this._readableState.autoDestroy) this.destroy();
			return true;
		}
		return false;
	}

	_destroy() {
		if (this.fd) fs.closeSync(this.fd);
		this.fd = null;
		super._destroy();
	}

	/**
	 * Sync read line
	 * @param [br] line break
	 */
	readLine(br?: Buffer|string): Buffer|string|null {
		let size = 1;
		if (!this.fd) {
			if (this.destroyed) throw Error('File handler destroyed!');
			else throw Error('File handler not found!');
		}
		if (this._autoclose()) {
			this.emit('close', null);
			return null;
		}

		if (typeof br == 'undefined') br = "\n";

		let line = Buffer.alloc(0);
		let br_found = false;
		let file_end = false;
		let buf: Buffer;
		do {
			if (this.pos + size > this.size) size = this.size - this.pos;
			buf = Buffer.alloc(size);
			if (this.pos >= this.size) {
				file_end = true;
				continue;
			}

			fs.readSync(this.fd, buf, {offset: 0, position: this.pos});
			this.pos += size;
			if (buf.indexOf(br) > -1) {
				br_found = true
			}
			line = Buffer.concat([line, buf]);
		} while (!br_found && !file_end)

		if (line.length < 1) return null;

		if (this._readableState.encoding)
			return line.toString(this._readableState.encoding);

		return line;
	}

	/**
	 * Sync read
	 * @param size
	 */
	_read(size?: number, encoding?: BufferEncoding) {
		if (!size) size = 4096;

		if (this.fd && this.pos >= this.size) {
			this.push(null);
			return null;
		}

		if (!this.fd) {
			this.push(null, encoding);
			//if (this.destroyed) throw Error('File handler destroyed!');
			//else throw Error('File handler not found!');
			return null;
		}

		if (this.pos + size > this.size) size = this.size - this.pos;
		let buf : Buffer|string = Buffer.alloc(size);
		let cnt = fs.readSync(this.fd, buf, {offset: 0, position: this.pos});
		this.pos += cnt;
		buf = buf.slice(0, cnt);

		if (encoding) buf = buf.toString(encoding);

		this.push(buf, encoding);

		return buf;
	}
}