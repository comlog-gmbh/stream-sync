import {EventEmitter} from 'events';
import WritableOptions from './WritableOptions';
import stream from "stream";

class Writable extends stream.Writable {
	destroyed = true;
	writable = false;
	_writableState: WritableOptions = {
		encoding: undefined,
		emitClose: true,
		autoDestroy: true
	};

	constructor(opts?: WritableOptions) {
		super();
		this._writableState = Object.assign({}, this._writableState, opts || {});
		this.destroyed = false;
		this.writable = true;
	}

	destroy(): this {
        this.destroyed = true;
		this.writable = false;
		return this;
    }

    end(): this {
        this.emit('finish');
		if (this._writableState.emitClose) this.emit('close');
		if (this._writableState.autoDestroy) this.destroy();

		return this;
    }

	write(chunk: any): boolean {
		this._write(chunk, this._writableState.encoding);
		return true;
	}

	_write(chunk: any, encoding?: BufferEncoding) {
		console.info("Append _write function to class!");
	}

	setDefaultEncoding(encoding: BufferEncoding) {
		this._writableState.encoding = encoding;
		return this;
	}
}

export default Writable;