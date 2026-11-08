import { createRequire } from "node:module";
import { createServer } from "node:http";
import { appendFile, mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash, randomUUID } from "node:crypto";
import { request } from "node:https";
import process$1 from "node:process";
import os from "node:os";
import tty from "node:tty";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toCommonJS = (mod) => __hasOwnProp.call(mod, "module.exports") ? mod["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __require = /* @__PURE__ */ createRequire(import.meta.url);
//#endregion
//#region lib/lead-hash.ts
function leadFingerprint(data) {
	return JSON.stringify([
		data.name,
		data.contact,
		data.channel,
		data.service,
		data.details,
		data.consentVersion
	]);
}
//#endregion
//#region node_modules/.pnpm/smart-buffer@4.2.0/node_modules/smart-buffer/build/utils.js
var require_utils = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var buffer_1 = __require("buffer");
	/**
	* Error strings
	*/
	var ERRORS = {
		INVALID_ENCODING: "Invalid encoding provided. Please specify a valid encoding the internal Node.js Buffer supports.",
		INVALID_SMARTBUFFER_SIZE: "Invalid size provided. Size must be a valid integer greater than zero.",
		INVALID_SMARTBUFFER_BUFFER: "Invalid Buffer provided in SmartBufferOptions.",
		INVALID_SMARTBUFFER_OBJECT: "Invalid SmartBufferOptions object supplied to SmartBuffer constructor or factory methods.",
		INVALID_OFFSET: "An invalid offset value was provided.",
		INVALID_OFFSET_NON_NUMBER: "An invalid offset value was provided. A numeric value is required.",
		INVALID_LENGTH: "An invalid length value was provided.",
		INVALID_LENGTH_NON_NUMBER: "An invalid length value was provived. A numeric value is required.",
		INVALID_TARGET_OFFSET: "Target offset is beyond the bounds of the internal SmartBuffer data.",
		INVALID_TARGET_LENGTH: "Specified length value moves cursor beyong the bounds of the internal SmartBuffer data.",
		INVALID_READ_BEYOND_BOUNDS: "Attempted to read beyond the bounds of the managed data.",
		INVALID_WRITE_BEYOND_BOUNDS: "Attempted to write beyond the bounds of the managed data."
	};
	exports.ERRORS = ERRORS;
	/**
	* Checks if a given encoding is a valid Buffer encoding. (Throws an exception if check fails)
	*
	* @param { String } encoding The encoding string to check.
	*/
	function checkEncoding(encoding) {
		if (!buffer_1.Buffer.isEncoding(encoding)) throw new Error(ERRORS.INVALID_ENCODING);
	}
	exports.checkEncoding = checkEncoding;
	/**
	* Checks if a given number is a finite integer. (Throws an exception if check fails)
	*
	* @param { Number } value The number value to check.
	*/
	function isFiniteInteger(value) {
		return typeof value === "number" && isFinite(value) && isInteger(value);
	}
	exports.isFiniteInteger = isFiniteInteger;
	/**
	* Checks if an offset/length value is valid. (Throws an exception if check fails)
	*
	* @param value The value to check.
	* @param offset True if checking an offset, false if checking a length.
	*/
	function checkOffsetOrLengthValue(value, offset) {
		if (typeof value === "number") {
			if (!isFiniteInteger(value) || value < 0) throw new Error(offset ? ERRORS.INVALID_OFFSET : ERRORS.INVALID_LENGTH);
		} else throw new Error(offset ? ERRORS.INVALID_OFFSET_NON_NUMBER : ERRORS.INVALID_LENGTH_NON_NUMBER);
	}
	/**
	* Checks if a length value is valid. (Throws an exception if check fails)
	*
	* @param { Number } length The value to check.
	*/
	function checkLengthValue(length) {
		checkOffsetOrLengthValue(length, false);
	}
	exports.checkLengthValue = checkLengthValue;
	/**
	* Checks if a offset value is valid. (Throws an exception if check fails)
	*
	* @param { Number } offset The value to check.
	*/
	function checkOffsetValue(offset) {
		checkOffsetOrLengthValue(offset, true);
	}
	exports.checkOffsetValue = checkOffsetValue;
	/**
	* Checks if a target offset value is out of bounds. (Throws an exception if check fails)
	*
	* @param { Number } offset The offset value to check.
	* @param { SmartBuffer } buff The SmartBuffer instance to check against.
	*/
	function checkTargetOffset(offset, buff) {
		if (offset < 0 || offset > buff.length) throw new Error(ERRORS.INVALID_TARGET_OFFSET);
	}
	exports.checkTargetOffset = checkTargetOffset;
	/**
	* Determines whether a given number is a integer.
	* @param value The number to check.
	*/
	function isInteger(value) {
		return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
	}
	/**
	* Throws if Node.js version is too low to support bigint
	*/
	function bigIntAndBufferInt64Check(bufferMethod) {
		if (typeof BigInt === "undefined") throw new Error("Platform does not support JS BigInt type.");
		if (typeof buffer_1.Buffer.prototype[bufferMethod] === "undefined") throw new Error(`Platform does not support Buffer.prototype.${bufferMethod}.`);
	}
	exports.bigIntAndBufferInt64Check = bigIntAndBufferInt64Check;
}));
//#endregion
//#region node_modules/.pnpm/smart-buffer@4.2.0/node_modules/smart-buffer/build/smartbuffer.js
var require_smartbuffer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = require_utils();
	var DEFAULT_SMARTBUFFER_SIZE = 4096;
	var DEFAULT_SMARTBUFFER_ENCODING = "utf8";
	exports.SmartBuffer = class SmartBuffer {
		/**
		* Creates a new SmartBuffer instance.
		*
		* @param options { SmartBufferOptions } The SmartBufferOptions to apply to this instance.
		*/
		constructor(options) {
			this.length = 0;
			this._encoding = DEFAULT_SMARTBUFFER_ENCODING;
			this._writeOffset = 0;
			this._readOffset = 0;
			if (SmartBuffer.isSmartBufferOptions(options)) {
				if (options.encoding) {
					utils_1.checkEncoding(options.encoding);
					this._encoding = options.encoding;
				}
				if (options.size) if (utils_1.isFiniteInteger(options.size) && options.size > 0) this._buff = Buffer.allocUnsafe(options.size);
				else throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_SIZE);
				else if (options.buff) if (Buffer.isBuffer(options.buff)) {
					this._buff = options.buff;
					this.length = options.buff.length;
				} else throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_BUFFER);
				else this._buff = Buffer.allocUnsafe(DEFAULT_SMARTBUFFER_SIZE);
			} else {
				if (typeof options !== "undefined") throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_OBJECT);
				this._buff = Buffer.allocUnsafe(DEFAULT_SMARTBUFFER_SIZE);
			}
		}
		/**
		* Creates a new SmartBuffer instance with the provided internal Buffer size and optional encoding.
		*
		* @param size { Number } The size of the internal Buffer.
		* @param encoding { String } The BufferEncoding to use for strings.
		*
		* @return { SmartBuffer }
		*/
		static fromSize(size, encoding) {
			return new this({
				size,
				encoding
			});
		}
		/**
		* Creates a new SmartBuffer instance with the provided Buffer and optional encoding.
		*
		* @param buffer { Buffer } The Buffer to use as the internal Buffer value.
		* @param encoding { String } The BufferEncoding to use for strings.
		*
		* @return { SmartBuffer }
		*/
		static fromBuffer(buff, encoding) {
			return new this({
				buff,
				encoding
			});
		}
		/**
		* Creates a new SmartBuffer instance with the provided SmartBufferOptions options.
		*
		* @param options { SmartBufferOptions } The options to use when creating the SmartBuffer instance.
		*/
		static fromOptions(options) {
			return new this(options);
		}
		/**
		* Type checking function that determines if an object is a SmartBufferOptions object.
		*/
		static isSmartBufferOptions(options) {
			const castOptions = options;
			return castOptions && (castOptions.encoding !== void 0 || castOptions.size !== void 0 || castOptions.buff !== void 0);
		}
		/**
		* Reads an Int8 value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readInt8(offset) {
			return this._readNumberValue(Buffer.prototype.readInt8, 1, offset);
		}
		/**
		* Reads an Int16BE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readInt16BE(offset) {
			return this._readNumberValue(Buffer.prototype.readInt16BE, 2, offset);
		}
		/**
		* Reads an Int16LE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readInt16LE(offset) {
			return this._readNumberValue(Buffer.prototype.readInt16LE, 2, offset);
		}
		/**
		* Reads an Int32BE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readInt32BE(offset) {
			return this._readNumberValue(Buffer.prototype.readInt32BE, 4, offset);
		}
		/**
		* Reads an Int32LE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readInt32LE(offset) {
			return this._readNumberValue(Buffer.prototype.readInt32LE, 4, offset);
		}
		/**
		* Reads a BigInt64BE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { BigInt }
		*/
		readBigInt64BE(offset) {
			utils_1.bigIntAndBufferInt64Check("readBigInt64BE");
			return this._readNumberValue(Buffer.prototype.readBigInt64BE, 8, offset);
		}
		/**
		* Reads a BigInt64LE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { BigInt }
		*/
		readBigInt64LE(offset) {
			utils_1.bigIntAndBufferInt64Check("readBigInt64LE");
			return this._readNumberValue(Buffer.prototype.readBigInt64LE, 8, offset);
		}
		/**
		* Writes an Int8 value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeInt8(value, offset) {
			this._writeNumberValue(Buffer.prototype.writeInt8, 1, value, offset);
			return this;
		}
		/**
		* Inserts an Int8 value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertInt8(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeInt8, 1, value, offset);
		}
		/**
		* Writes an Int16BE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeInt16BE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);
		}
		/**
		* Inserts an Int16BE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertInt16BE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);
		}
		/**
		* Writes an Int16LE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeInt16LE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);
		}
		/**
		* Inserts an Int16LE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertInt16LE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);
		}
		/**
		* Writes an Int32BE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeInt32BE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);
		}
		/**
		* Inserts an Int32BE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertInt32BE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);
		}
		/**
		* Writes an Int32LE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeInt32LE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);
		}
		/**
		* Inserts an Int32LE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertInt32LE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);
		}
		/**
		* Writes a BigInt64BE value to the current write position (or at optional offset).
		*
		* @param value { BigInt } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeBigInt64BE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigInt64BE");
			return this._writeNumberValue(Buffer.prototype.writeBigInt64BE, 8, value, offset);
		}
		/**
		* Inserts a BigInt64BE value at the given offset value.
		*
		* @param value { BigInt } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertBigInt64BE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigInt64BE");
			return this._insertNumberValue(Buffer.prototype.writeBigInt64BE, 8, value, offset);
		}
		/**
		* Writes a BigInt64LE value to the current write position (or at optional offset).
		*
		* @param value { BigInt } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeBigInt64LE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigInt64LE");
			return this._writeNumberValue(Buffer.prototype.writeBigInt64LE, 8, value, offset);
		}
		/**
		* Inserts a Int64LE value at the given offset value.
		*
		* @param value { BigInt } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertBigInt64LE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigInt64LE");
			return this._insertNumberValue(Buffer.prototype.writeBigInt64LE, 8, value, offset);
		}
		/**
		* Reads an UInt8 value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readUInt8(offset) {
			return this._readNumberValue(Buffer.prototype.readUInt8, 1, offset);
		}
		/**
		* Reads an UInt16BE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readUInt16BE(offset) {
			return this._readNumberValue(Buffer.prototype.readUInt16BE, 2, offset);
		}
		/**
		* Reads an UInt16LE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readUInt16LE(offset) {
			return this._readNumberValue(Buffer.prototype.readUInt16LE, 2, offset);
		}
		/**
		* Reads an UInt32BE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readUInt32BE(offset) {
			return this._readNumberValue(Buffer.prototype.readUInt32BE, 4, offset);
		}
		/**
		* Reads an UInt32LE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readUInt32LE(offset) {
			return this._readNumberValue(Buffer.prototype.readUInt32LE, 4, offset);
		}
		/**
		* Reads a BigUInt64BE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { BigInt }
		*/
		readBigUInt64BE(offset) {
			utils_1.bigIntAndBufferInt64Check("readBigUInt64BE");
			return this._readNumberValue(Buffer.prototype.readBigUInt64BE, 8, offset);
		}
		/**
		* Reads a BigUInt64LE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { BigInt }
		*/
		readBigUInt64LE(offset) {
			utils_1.bigIntAndBufferInt64Check("readBigUInt64LE");
			return this._readNumberValue(Buffer.prototype.readBigUInt64LE, 8, offset);
		}
		/**
		* Writes an UInt8 value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeUInt8(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);
		}
		/**
		* Inserts an UInt8 value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertUInt8(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);
		}
		/**
		* Writes an UInt16BE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeUInt16BE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);
		}
		/**
		* Inserts an UInt16BE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertUInt16BE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);
		}
		/**
		* Writes an UInt16LE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeUInt16LE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);
		}
		/**
		* Inserts an UInt16LE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertUInt16LE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);
		}
		/**
		* Writes an UInt32BE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeUInt32BE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);
		}
		/**
		* Inserts an UInt32BE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertUInt32BE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);
		}
		/**
		* Writes an UInt32LE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeUInt32LE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);
		}
		/**
		* Inserts an UInt32LE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertUInt32LE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);
		}
		/**
		* Writes a BigUInt64BE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeBigUInt64BE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigUInt64BE");
			return this._writeNumberValue(Buffer.prototype.writeBigUInt64BE, 8, value, offset);
		}
		/**
		* Inserts a BigUInt64BE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertBigUInt64BE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigUInt64BE");
			return this._insertNumberValue(Buffer.prototype.writeBigUInt64BE, 8, value, offset);
		}
		/**
		* Writes a BigUInt64LE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeBigUInt64LE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigUInt64LE");
			return this._writeNumberValue(Buffer.prototype.writeBigUInt64LE, 8, value, offset);
		}
		/**
		* Inserts a BigUInt64LE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertBigUInt64LE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigUInt64LE");
			return this._insertNumberValue(Buffer.prototype.writeBigUInt64LE, 8, value, offset);
		}
		/**
		* Reads an FloatBE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readFloatBE(offset) {
			return this._readNumberValue(Buffer.prototype.readFloatBE, 4, offset);
		}
		/**
		* Reads an FloatLE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readFloatLE(offset) {
			return this._readNumberValue(Buffer.prototype.readFloatLE, 4, offset);
		}
		/**
		* Writes a FloatBE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeFloatBE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);
		}
		/**
		* Inserts a FloatBE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertFloatBE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);
		}
		/**
		* Writes a FloatLE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeFloatLE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);
		}
		/**
		* Inserts a FloatLE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertFloatLE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);
		}
		/**
		* Reads an DoublEBE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readDoubleBE(offset) {
			return this._readNumberValue(Buffer.prototype.readDoubleBE, 8, offset);
		}
		/**
		* Reads an DoubleLE value from the current read position or an optionally provided offset.
		*
		* @param offset { Number } The offset to read data from (optional)
		* @return { Number }
		*/
		readDoubleLE(offset) {
			return this._readNumberValue(Buffer.prototype.readDoubleLE, 8, offset);
		}
		/**
		* Writes a DoubleBE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeDoubleBE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeDoubleBE, 8, value, offset);
		}
		/**
		* Inserts a DoubleBE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertDoubleBE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeDoubleBE, 8, value, offset);
		}
		/**
		* Writes a DoubleLE value to the current write position (or at optional offset).
		*
		* @param value { Number } The value to write.
		* @param offset { Number } The offset to write the value at.
		*
		* @return this
		*/
		writeDoubleLE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeDoubleLE, 8, value, offset);
		}
		/**
		* Inserts a DoubleLE value at the given offset value.
		*
		* @param value { Number } The value to insert.
		* @param offset { Number } The offset to insert the value at.
		*
		* @return this
		*/
		insertDoubleLE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeDoubleLE, 8, value, offset);
		}
		/**
		* Reads a String from the current read position.
		*
		* @param arg1 { Number | String } The number of bytes to read as a String, or the BufferEncoding to use for
		*             the string (Defaults to instance level encoding).
		* @param encoding { String } The BufferEncoding to use for the string (Defaults to instance level encoding).
		*
		* @return { String }
		*/
		readString(arg1, encoding) {
			let lengthVal;
			if (typeof arg1 === "number") {
				utils_1.checkLengthValue(arg1);
				lengthVal = Math.min(arg1, this.length - this._readOffset);
			} else {
				encoding = arg1;
				lengthVal = this.length - this._readOffset;
			}
			if (typeof encoding !== "undefined") utils_1.checkEncoding(encoding);
			const value = this._buff.slice(this._readOffset, this._readOffset + lengthVal).toString(encoding || this._encoding);
			this._readOffset += lengthVal;
			return value;
		}
		/**
		* Inserts a String
		*
		* @param value { String } The String value to insert.
		* @param offset { Number } The offset to insert the string at.
		* @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
		*
		* @return this
		*/
		insertString(value, offset, encoding) {
			utils_1.checkOffsetValue(offset);
			return this._handleString(value, true, offset, encoding);
		}
		/**
		* Writes a String
		*
		* @param value { String } The String value to write.
		* @param arg2 { Number | String } The offset to write the string at, or the BufferEncoding to use.
		* @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
		*
		* @return this
		*/
		writeString(value, arg2, encoding) {
			return this._handleString(value, false, arg2, encoding);
		}
		/**
		* Reads a null-terminated String from the current read position.
		*
		* @param encoding { String } The BufferEncoding to use for the string (Defaults to instance level encoding).
		*
		* @return { String }
		*/
		readStringNT(encoding) {
			if (typeof encoding !== "undefined") utils_1.checkEncoding(encoding);
			let nullPos = this.length;
			for (let i = this._readOffset; i < this.length; i++) if (this._buff[i] === 0) {
				nullPos = i;
				break;
			}
			const value = this._buff.slice(this._readOffset, nullPos);
			this._readOffset = nullPos + 1;
			return value.toString(encoding || this._encoding);
		}
		/**
		* Inserts a null-terminated String.
		*
		* @param value { String } The String value to write.
		* @param arg2 { Number | String } The offset to write the string to, or the BufferEncoding to use.
		* @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
		*
		* @return this
		*/
		insertStringNT(value, offset, encoding) {
			utils_1.checkOffsetValue(offset);
			this.insertString(value, offset, encoding);
			this.insertUInt8(0, offset + value.length);
			return this;
		}
		/**
		* Writes a null-terminated String.
		*
		* @param value { String } The String value to write.
		* @param arg2 { Number | String } The offset to write the string to, or the BufferEncoding to use.
		* @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
		*
		* @return this
		*/
		writeStringNT(value, arg2, encoding) {
			this.writeString(value, arg2, encoding);
			this.writeUInt8(0, typeof arg2 === "number" ? arg2 + value.length : this.writeOffset);
			return this;
		}
		/**
		* Reads a Buffer from the internal read position.
		*
		* @param length { Number } The length of data to read as a Buffer.
		*
		* @return { Buffer }
		*/
		readBuffer(length) {
			if (typeof length !== "undefined") utils_1.checkLengthValue(length);
			const lengthVal = typeof length === "number" ? length : this.length;
			const endPoint = Math.min(this.length, this._readOffset + lengthVal);
			const value = this._buff.slice(this._readOffset, endPoint);
			this._readOffset = endPoint;
			return value;
		}
		/**
		* Writes a Buffer to the current write position.
		*
		* @param value { Buffer } The Buffer to write.
		* @param offset { Number } The offset to write the Buffer to.
		*
		* @return this
		*/
		insertBuffer(value, offset) {
			utils_1.checkOffsetValue(offset);
			return this._handleBuffer(value, true, offset);
		}
		/**
		* Writes a Buffer to the current write position.
		*
		* @param value { Buffer } The Buffer to write.
		* @param offset { Number } The offset to write the Buffer to.
		*
		* @return this
		*/
		writeBuffer(value, offset) {
			return this._handleBuffer(value, false, offset);
		}
		/**
		* Reads a null-terminated Buffer from the current read poisiton.
		*
		* @return { Buffer }
		*/
		readBufferNT() {
			let nullPos = this.length;
			for (let i = this._readOffset; i < this.length; i++) if (this._buff[i] === 0) {
				nullPos = i;
				break;
			}
			const value = this._buff.slice(this._readOffset, nullPos);
			this._readOffset = nullPos + 1;
			return value;
		}
		/**
		* Inserts a null-terminated Buffer.
		*
		* @param value { Buffer } The Buffer to write.
		* @param offset { Number } The offset to write the Buffer to.
		*
		* @return this
		*/
		insertBufferNT(value, offset) {
			utils_1.checkOffsetValue(offset);
			this.insertBuffer(value, offset);
			this.insertUInt8(0, offset + value.length);
			return this;
		}
		/**
		* Writes a null-terminated Buffer.
		*
		* @param value { Buffer } The Buffer to write.
		* @param offset { Number } The offset to write the Buffer to.
		*
		* @return this
		*/
		writeBufferNT(value, offset) {
			if (typeof offset !== "undefined") utils_1.checkOffsetValue(offset);
			this.writeBuffer(value, offset);
			this.writeUInt8(0, typeof offset === "number" ? offset + value.length : this._writeOffset);
			return this;
		}
		/**
		* Clears the SmartBuffer instance to its original empty state.
		*/
		clear() {
			this._writeOffset = 0;
			this._readOffset = 0;
			this.length = 0;
			return this;
		}
		/**
		* Gets the remaining data left to be read from the SmartBuffer instance.
		*
		* @return { Number }
		*/
		remaining() {
			return this.length - this._readOffset;
		}
		/**
		* Gets the current read offset value of the SmartBuffer instance.
		*
		* @return { Number }
		*/
		get readOffset() {
			return this._readOffset;
		}
		/**
		* Sets the read offset value of the SmartBuffer instance.
		*
		* @param offset { Number } - The offset value to set.
		*/
		set readOffset(offset) {
			utils_1.checkOffsetValue(offset);
			utils_1.checkTargetOffset(offset, this);
			this._readOffset = offset;
		}
		/**
		* Gets the current write offset value of the SmartBuffer instance.
		*
		* @return { Number }
		*/
		get writeOffset() {
			return this._writeOffset;
		}
		/**
		* Sets the write offset value of the SmartBuffer instance.
		*
		* @param offset { Number } - The offset value to set.
		*/
		set writeOffset(offset) {
			utils_1.checkOffsetValue(offset);
			utils_1.checkTargetOffset(offset, this);
			this._writeOffset = offset;
		}
		/**
		* Gets the currently set string encoding of the SmartBuffer instance.
		*
		* @return { BufferEncoding } The string Buffer encoding currently set.
		*/
		get encoding() {
			return this._encoding;
		}
		/**
		* Sets the string encoding of the SmartBuffer instance.
		*
		* @param encoding { BufferEncoding } The string Buffer encoding to set.
		*/
		set encoding(encoding) {
			utils_1.checkEncoding(encoding);
			this._encoding = encoding;
		}
		/**
		* Gets the underlying internal Buffer. (This includes unmanaged data in the Buffer)
		*
		* @return { Buffer } The Buffer value.
		*/
		get internalBuffer() {
			return this._buff;
		}
		/**
		* Gets the value of the internal managed Buffer (Includes managed data only)
		*
		* @param { Buffer }
		*/
		toBuffer() {
			return this._buff.slice(0, this.length);
		}
		/**
		* Gets the String value of the internal managed Buffer
		*
		* @param encoding { String } The BufferEncoding to display the Buffer as (defaults to instance level encoding).
		*/
		toString(encoding) {
			const encodingVal = typeof encoding === "string" ? encoding : this._encoding;
			utils_1.checkEncoding(encodingVal);
			return this._buff.toString(encodingVal, 0, this.length);
		}
		/**
		* Destroys the SmartBuffer instance.
		*/
		destroy() {
			this.clear();
			return this;
		}
		/**
		* Handles inserting and writing strings.
		*
		* @param value { String } The String value to insert.
		* @param isInsert { Boolean } True if inserting a string, false if writing.
		* @param arg2 { Number | String } The offset to insert the string at, or the BufferEncoding to use.
		* @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
		*/
		_handleString(value, isInsert, arg3, encoding) {
			let offsetVal = this._writeOffset;
			let encodingVal = this._encoding;
			if (typeof arg3 === "number") offsetVal = arg3;
			else if (typeof arg3 === "string") {
				utils_1.checkEncoding(arg3);
				encodingVal = arg3;
			}
			if (typeof encoding === "string") {
				utils_1.checkEncoding(encoding);
				encodingVal = encoding;
			}
			const byteLength = Buffer.byteLength(value, encodingVal);
			if (isInsert) this.ensureInsertable(byteLength, offsetVal);
			else this._ensureWriteable(byteLength, offsetVal);
			this._buff.write(value, offsetVal, byteLength, encodingVal);
			if (isInsert) this._writeOffset += byteLength;
			else if (typeof arg3 === "number") this._writeOffset = Math.max(this._writeOffset, offsetVal + byteLength);
			else this._writeOffset += byteLength;
			return this;
		}
		/**
		* Handles writing or insert of a Buffer.
		*
		* @param value { Buffer } The Buffer to write.
		* @param offset { Number } The offset to write the Buffer to.
		*/
		_handleBuffer(value, isInsert, offset) {
			const offsetVal = typeof offset === "number" ? offset : this._writeOffset;
			if (isInsert) this.ensureInsertable(value.length, offsetVal);
			else this._ensureWriteable(value.length, offsetVal);
			value.copy(this._buff, offsetVal);
			if (isInsert) this._writeOffset += value.length;
			else if (typeof offset === "number") this._writeOffset = Math.max(this._writeOffset, offsetVal + value.length);
			else this._writeOffset += value.length;
			return this;
		}
		/**
		* Ensures that the internal Buffer is large enough to read data.
		*
		* @param length { Number } The length of the data that needs to be read.
		* @param offset { Number } The offset of the data that needs to be read.
		*/
		ensureReadable(length, offset) {
			let offsetVal = this._readOffset;
			if (typeof offset !== "undefined") {
				utils_1.checkOffsetValue(offset);
				offsetVal = offset;
			}
			if (offsetVal < 0 || offsetVal + length > this.length) throw new Error(utils_1.ERRORS.INVALID_READ_BEYOND_BOUNDS);
		}
		/**
		* Ensures that the internal Buffer is large enough to insert data.
		*
		* @param dataLength { Number } The length of the data that needs to be written.
		* @param offset { Number } The offset of the data to be written.
		*/
		ensureInsertable(dataLength, offset) {
			utils_1.checkOffsetValue(offset);
			this._ensureCapacity(this.length + dataLength);
			if (offset < this.length) this._buff.copy(this._buff, offset + dataLength, offset, this._buff.length);
			if (offset + dataLength > this.length) this.length = offset + dataLength;
			else this.length += dataLength;
		}
		/**
		* Ensures that the internal Buffer is large enough to write data.
		*
		* @param dataLength { Number } The length of the data that needs to be written.
		* @param offset { Number } The offset of the data to be written (defaults to writeOffset).
		*/
		_ensureWriteable(dataLength, offset) {
			const offsetVal = typeof offset === "number" ? offset : this._writeOffset;
			this._ensureCapacity(offsetVal + dataLength);
			if (offsetVal + dataLength > this.length) this.length = offsetVal + dataLength;
		}
		/**
		* Ensures that the internal Buffer is large enough to write at least the given amount of data.
		*
		* @param minLength { Number } The minimum length of the data needs to be written.
		*/
		_ensureCapacity(minLength) {
			const oldLength = this._buff.length;
			if (minLength > oldLength) {
				let data = this._buff;
				let newLength = oldLength * 3 / 2 + 1;
				if (newLength < minLength) newLength = minLength;
				this._buff = Buffer.allocUnsafe(newLength);
				data.copy(this._buff, 0, 0, oldLength);
			}
		}
		/**
		* Reads a numeric number value using the provided function.
		*
		* @typeparam T { number | bigint } The type of the value to be read
		*
		* @param func { Function(offset: number) => number } The function to read data on the internal Buffer with.
		* @param byteSize { Number } The number of bytes read.
		* @param offset { Number } The offset to read from (optional). When this is not provided, the managed readOffset is used instead.
		*
		* @returns { T } the number value
		*/
		_readNumberValue(func, byteSize, offset) {
			this.ensureReadable(byteSize, offset);
			const value = func.call(this._buff, typeof offset === "number" ? offset : this._readOffset);
			if (typeof offset === "undefined") this._readOffset += byteSize;
			return value;
		}
		/**
		* Inserts a numeric number value based on the given offset and value.
		*
		* @typeparam T { number | bigint } The type of the value to be written
		*
		* @param func { Function(offset: T, offset?) => number} The function to write data on the internal Buffer with.
		* @param byteSize { Number } The number of bytes written.
		* @param value { T } The number value to write.
		* @param offset { Number } the offset to write the number at (REQUIRED).
		*
		* @returns SmartBuffer this buffer
		*/
		_insertNumberValue(func, byteSize, value, offset) {
			utils_1.checkOffsetValue(offset);
			this.ensureInsertable(byteSize, offset);
			func.call(this._buff, value, offset);
			this._writeOffset += byteSize;
			return this;
		}
		/**
		* Writes a numeric number value based on the given offset and value.
		*
		* @typeparam T { number | bigint } The type of the value to be written
		*
		* @param func { Function(offset: T, offset?) => number} The function to write data on the internal Buffer with.
		* @param byteSize { Number } The number of bytes written.
		* @param value { T } The number value to write.
		* @param offset { Number } the offset to write the number at (REQUIRED).
		*
		* @returns SmartBuffer this buffer
		*/
		_writeNumberValue(func, byteSize, value, offset) {
			if (typeof offset === "number") {
				if (offset < 0) throw new Error(utils_1.ERRORS.INVALID_WRITE_BEYOND_BOUNDS);
				utils_1.checkOffsetValue(offset);
			}
			const offsetVal = typeof offset === "number" ? offset : this._writeOffset;
			this._ensureWriteable(byteSize, offsetVal);
			func.call(this._buff, value, offsetVal);
			if (typeof offset === "number") this._writeOffset = Math.max(this._writeOffset, offsetVal + byteSize);
			else this._writeOffset += byteSize;
			return this;
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/socks@2.8.10/node_modules/socks/build/common/constants.js
var require_constants$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SOCKS5_NO_ACCEPTABLE_AUTH = exports.SOCKS5_CUSTOM_AUTH_END = exports.SOCKS5_CUSTOM_AUTH_START = exports.SOCKS_INCOMING_PACKET_SIZES = exports.SocksClientState = exports.Socks5Response = exports.Socks5HostType = exports.Socks5Auth = exports.Socks4Response = exports.SocksCommand = exports.ERRORS = exports.DEFAULT_TIMEOUT = void 0;
	exports.DEFAULT_TIMEOUT = 3e4;
	exports.ERRORS = {
		InvalidSocksCommand: "An invalid SOCKS command was provided. Valid options are connect, bind, and associate.",
		InvalidSocksCommandForOperation: "An invalid SOCKS command was provided. Only a subset of commands are supported for this operation.",
		InvalidSocksCommandChain: "An invalid SOCKS command was provided. Chaining currently only supports the connect command.",
		InvalidSocksClientOptionsDestination: "An invalid destination host was provided.",
		InvalidSocksClientOptionsExistingSocket: "An invalid existing socket was provided. This should be an instance of stream.Duplex.",
		InvalidSocksClientOptionsProxy: "Invalid SOCKS proxy details were provided.",
		InvalidSocksClientOptionsTimeout: "An invalid timeout value was provided. Please enter a value above 0 (in ms).",
		InvalidSocksClientOptionsProxiesLength: "At least two socks proxies must be provided for chaining.",
		InvalidSocksClientOptionsCustomAuthRange: "Custom auth must be a value between 0x80 and 0xFE.",
		InvalidSocksClientOptionsCustomAuthOptions: "When a custom_auth_method is provided, custom_auth_request_handler, custom_auth_response_size, and custom_auth_response_handler must also be provided and valid.",
		NegotiationError: "Negotiation error",
		SocketClosed: "Socket closed",
		ProxyConnectionTimedOut: "Proxy connection timed out",
		InternalError: "SocksClient internal error (this should not happen)",
		InvalidSocks4HandshakeResponse: "Received invalid Socks4 handshake response",
		Socks4ProxyRejectedConnection: "Socks4 Proxy rejected connection",
		InvalidSocks4IncomingConnectionResponse: "Socks4 invalid incoming connection response",
		Socks4ProxyRejectedIncomingBoundConnection: "Socks4 Proxy rejected incoming bound connection",
		InvalidSocks5InitialHandshakeResponse: "Received invalid Socks5 initial handshake response",
		InvalidSocks5IntiailHandshakeSocksVersion: "Received invalid Socks5 initial handshake (invalid socks version)",
		InvalidSocks5InitialHandshakeNoAcceptedAuthType: "Received invalid Socks5 initial handshake (no accepted authentication type)",
		InvalidSocks5InitialHandshakeUnknownAuthType: "Received invalid Socks5 initial handshake (unknown authentication type)",
		Socks5AuthenticationFailed: "Socks5 Authentication failed",
		InvalidSocks5FinalHandshake: "Received invalid Socks5 final handshake response",
		InvalidSocks5FinalHandshakeRejected: "Socks5 proxy rejected connection",
		InvalidSocks5IncomingConnectionResponse: "Received invalid Socks5 incoming connection response",
		Socks5ProxyRejectedIncomingBoundConnection: "Socks5 Proxy rejected incoming bound connection"
	};
	exports.SOCKS_INCOMING_PACKET_SIZES = {
		Socks5InitialHandshakeResponse: 2,
		Socks5UserPassAuthenticationResponse: 2,
		Socks5ResponseHeader: 5,
		Socks5ResponseIPv4: 10,
		Socks5ResponseIPv6: 22,
		Socks5ResponseHostname: (hostNameLength) => hostNameLength + 7,
		Socks4Response: 8
	};
	var SocksCommand;
	(function(SocksCommand) {
		SocksCommand[SocksCommand["connect"] = 1] = "connect";
		SocksCommand[SocksCommand["bind"] = 2] = "bind";
		SocksCommand[SocksCommand["associate"] = 3] = "associate";
	})(SocksCommand || (exports.SocksCommand = SocksCommand = {}));
	var Socks4Response;
	(function(Socks4Response) {
		Socks4Response[Socks4Response["Granted"] = 90] = "Granted";
		Socks4Response[Socks4Response["Failed"] = 91] = "Failed";
		Socks4Response[Socks4Response["Rejected"] = 92] = "Rejected";
		Socks4Response[Socks4Response["RejectedIdent"] = 93] = "RejectedIdent";
	})(Socks4Response || (exports.Socks4Response = Socks4Response = {}));
	var Socks5Auth;
	(function(Socks5Auth) {
		Socks5Auth[Socks5Auth["NoAuth"] = 0] = "NoAuth";
		Socks5Auth[Socks5Auth["GSSApi"] = 1] = "GSSApi";
		Socks5Auth[Socks5Auth["UserPass"] = 2] = "UserPass";
	})(Socks5Auth || (exports.Socks5Auth = Socks5Auth = {}));
	exports.SOCKS5_CUSTOM_AUTH_START = 128;
	exports.SOCKS5_CUSTOM_AUTH_END = 254;
	exports.SOCKS5_NO_ACCEPTABLE_AUTH = 255;
	var Socks5Response;
	(function(Socks5Response) {
		Socks5Response[Socks5Response["Granted"] = 0] = "Granted";
		Socks5Response[Socks5Response["Failure"] = 1] = "Failure";
		Socks5Response[Socks5Response["NotAllowed"] = 2] = "NotAllowed";
		Socks5Response[Socks5Response["NetworkUnreachable"] = 3] = "NetworkUnreachable";
		Socks5Response[Socks5Response["HostUnreachable"] = 4] = "HostUnreachable";
		Socks5Response[Socks5Response["ConnectionRefused"] = 5] = "ConnectionRefused";
		Socks5Response[Socks5Response["TTLExpired"] = 6] = "TTLExpired";
		Socks5Response[Socks5Response["CommandNotSupported"] = 7] = "CommandNotSupported";
		Socks5Response[Socks5Response["AddressNotSupported"] = 8] = "AddressNotSupported";
	})(Socks5Response || (exports.Socks5Response = Socks5Response = {}));
	var Socks5HostType;
	(function(Socks5HostType) {
		Socks5HostType[Socks5HostType["IPv4"] = 1] = "IPv4";
		Socks5HostType[Socks5HostType["Hostname"] = 3] = "Hostname";
		Socks5HostType[Socks5HostType["IPv6"] = 4] = "IPv6";
	})(Socks5HostType || (exports.Socks5HostType = Socks5HostType = {}));
	var SocksClientState;
	(function(SocksClientState) {
		SocksClientState[SocksClientState["Created"] = 0] = "Created";
		SocksClientState[SocksClientState["Connecting"] = 1] = "Connecting";
		SocksClientState[SocksClientState["Connected"] = 2] = "Connected";
		SocksClientState[SocksClientState["SentInitialHandshake"] = 3] = "SentInitialHandshake";
		SocksClientState[SocksClientState["ReceivedInitialHandshakeResponse"] = 4] = "ReceivedInitialHandshakeResponse";
		SocksClientState[SocksClientState["SentAuthentication"] = 5] = "SentAuthentication";
		SocksClientState[SocksClientState["ReceivedAuthenticationResponse"] = 6] = "ReceivedAuthenticationResponse";
		SocksClientState[SocksClientState["SentFinalHandshake"] = 7] = "SentFinalHandshake";
		SocksClientState[SocksClientState["ReceivedFinalResponse"] = 8] = "ReceivedFinalResponse";
		SocksClientState[SocksClientState["BoundWaitingForConnection"] = 9] = "BoundWaitingForConnection";
		SocksClientState[SocksClientState["Established"] = 10] = "Established";
		SocksClientState[SocksClientState["Disconnected"] = 11] = "Disconnected";
		SocksClientState[SocksClientState["Error"] = 99] = "Error";
	})(SocksClientState || (exports.SocksClientState = SocksClientState = {}));
}));
//#endregion
//#region node_modules/.pnpm/socks@2.8.10/node_modules/socks/build/common/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SocksClientError = void 0;
	exports.shuffleArray = shuffleArray;
	/**
	* Error wrapper for SocksClient
	*/
	var SocksClientError = class extends Error {
		constructor(message, options) {
			super(message);
			this.options = options;
		}
	};
	exports.SocksClientError = SocksClientError;
	/**
	* Shuffles a given array.
	* @param array The array to shuffle.
	*/
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
}));
//#endregion
//#region node_modules/.pnpm/ip-address@10.7.5/node_modules/ip-address/dist/address-error.js
var require_address_error = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AddressError = void 0;
	var AddressError = class extends Error {
		constructor(message, parseMessage) {
			super(message);
			this.name = "AddressError";
			this.parseMessage = parseMessage;
		}
	};
	exports.AddressError = AddressError;
}));
//#endregion
//#region node_modules/.pnpm/ip-address@10.7.5/node_modules/ip-address/dist/common.js
var require_common$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isInSubnet = isInSubnet;
	exports.isHostInSubnet = isHostInSubnet;
	exports.isGloballyReachable = isGloballyReachable;
	exports.offsetBigInt = offsetBigInt;
	exports.isCorrect = isCorrect;
	exports.prefixLengthFromMask = prefixLengthFromMask;
	exports.assertByteArray = assertByteArray;
	exports.numberToPaddedHex = numberToPaddedHex;
	exports.stringToPaddedHex = stringToPaddedHex;
	exports.testBit = testBit;
	var address_error_1 = require_address_error();
	/**
	* Returns whether this address's *network* is contained within `address`,
	* i.e. whether every address this one can represent also falls inside
	* `address`. A network wider than `address` is not contained in it, so
	* `10.0.0.0/8` is not in `10.0.0.0/16`.
	*
	* To ask whether the address itself falls inside a range, ignoring any CIDR
	* suffix it was written with, use {@link isHostInSubnet} instead. That is the
	* question the special-use classifiers ask.
	*/
	function isInSubnet(address) {
		if (this.subnetMask < address.subnetMask) return false;
		return isHostInSubnet.call(this, address);
	}
	/**
	* Returns whether this address's host bits fall inside `address`, ignoring
	* this address's own subnet mask.
	*
	* This is the primitive the special-use classifiers (`isLoopback`,
	* `isPrivate`, `isLinkLocal`, `getType`, …) are built on: they answer a
	* question about the address, so the answer must not change with the CIDR
	* suffix the caller happened to write. Use this rather than
	* {@link isInSubnet} when classifying a single address — notably when the
	* address came from untrusted input and the result backs a trust-boundary
	* decision such as an SSRF allow/deny filter.
	*
	* An address of one family is never inside a network of the other, so an
	* `Address4` against an `Address6` (or the reverse) is `false`. To compare
	* across families, convert first: `Address6.fromAddress4()`, `to4()`, or
	* `toAddress4Nat64()`.
	*/
	function isHostInSubnet(address) {
		if (this.binaryZeroPad().length !== address.binaryZeroPad().length) return false;
		return this.mask(address.subnetMask) === address.mask();
	}
	/**
	* Returns whether the registry marks this address globally reachable: the
	* answer of the most specific entry containing it that has one, or `true`
	* when no entry contains it.
	*/
	function isGloballyReachable(entries) {
		let best = null;
		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i];
			if (entry.reachable !== null && isHostInSubnet.call(this, entry.subnet) && (best === null || entry.subnet.subnetMask > best.subnet.subnetMask)) best = entry;
		}
		return best === null ? true : best.reachable;
	}
	/**
	* Adds `n` to `value` and returns the result, throwing `AddressError` unless
	* `n` is an integer and the result stays within `[0, 2**bits - 1]`.
	*/
	function offsetBigInt(value, n, bits, family) {
		if (typeof n === "number" && !Number.isSafeInteger(n)) throw new address_error_1.AddressError(`${family} offset must be an integer`);
		if (typeof n !== "number" && typeof n !== "bigint") throw new address_error_1.AddressError(`${family} offset must be an integer`);
		const result = value + BigInt(n);
		if (result < BigInt(0) || result > (BigInt(1) << BigInt(bits)) - BigInt(1)) throw new address_error_1.AddressError(`${family} offset leaves the address space`);
		return result;
	}
	function isCorrect(defaultBits) {
		return function isCorrectForm() {
			if (this.addressMinusSuffix !== this.correctForm()) return false;
			if (this.subnetMask === defaultBits && !this.parsedSubnet) return true;
			return this.parsedSubnet === String(this.subnetMask);
		};
	}
	/**
	* Returns the prefix length (number of leading 1 bits) of a contiguous
	* subnet mask. Throws `AddressError` if the mask is non-contiguous (e.g.
	* `255.0.255.0`).
	*/
	function prefixLengthFromMask(value, totalBits) {
		const binary = value.toString(2).padStart(totalBits, "0");
		if (binary.length > totalBits) throw new address_error_1.AddressError("Invalid subnet mask.");
		const firstZero = binary.indexOf("0");
		if (firstZero === -1) return totalBits;
		if (binary.slice(firstZero).includes("1")) throw new address_error_1.AddressError("Invalid subnet mask.");
		return firstZero;
	}
	/**
	* Throws `AddressError` unless `bytes` holds exactly `byteCount` integers,
	* each from `minimum` to 255. Pass a `minimum` of `-128` where signed bytes
	* are accepted and folded to unsigned, and `0` where they are not.
	*/
	function assertByteArray(bytes, byteCount, family, minimum) {
		if (bytes.length !== byteCount) throw new address_error_1.AddressError(`${family} addresses require exactly ${byteCount} bytes`);
		for (let i = 0; i < bytes.length; i++) if (!Number.isInteger(bytes[i]) || bytes[i] < minimum || bytes[i] > 255) throw new address_error_1.AddressError(`All bytes must be integers between ${minimum} and 255`);
	}
	function numberToPaddedHex(number) {
		return number.toString(16).padStart(2, "0");
	}
	function stringToPaddedHex(numberString) {
		return numberToPaddedHex(parseInt(numberString, 10));
	}
	/**
	* @param binaryValue Binary representation of a value (e.g. `10`)
	* @param position Byte position, where 0 is the least significant bit
	*/
	function testBit(binaryValue, position) {
		const { length } = binaryValue;
		if (position >= length) return false;
		const positionInString = length - position - 1;
		return binaryValue.substring(positionInString, positionInString + 1) === "1";
	}
}));
//#endregion
//#region node_modules/.pnpm/ip-address@10.7.5/node_modules/ip-address/dist/v4/constants.js
var require_constants$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SPECIAL_PURPOSE = exports.RE_SUBNET_STRING = exports.RE_ADDRESS = exports.GROUPS = exports.BITS = void 0;
	exports.BITS = 32;
	exports.GROUPS = 4;
	exports.RE_ADDRESS = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/g;
	exports.RE_SUBNET_STRING = /\/\d{1,2}$/;
	/**
	* The IANA IPv4 Special-Purpose Address Registry
	* (https://www.iana.org/assignments/iana-ipv4-special-registry/), one entry
	* per block: `[cidr, name, globallyReachable]`. A `null` reachability means
	* the registry leaves the column blank and the block inherits the answer of
	* the block containing it (or is global when nothing contains it).
	*
	* `Address4.isGlobal()` answers from the most specific entry containing the
	* address. `test/data/iana-corpus.json` is generated from the registry's CSV
	* and pins this table to it.
	*/
	exports.SPECIAL_PURPOSE = [
		[
			"0.0.0.0/8",
			"This network",
			false
		],
		[
			"0.0.0.0/32",
			"This host on this network",
			false
		],
		[
			"10.0.0.0/8",
			"Private-Use",
			false
		],
		[
			"100.64.0.0/10",
			"Shared Address Space",
			false
		],
		[
			"127.0.0.0/8",
			"Loopback",
			false
		],
		[
			"169.254.0.0/16",
			"Link Local",
			false
		],
		[
			"172.16.0.0/12",
			"Private-Use",
			false
		],
		[
			"192.0.0.0/24",
			"IETF Protocol Assignments",
			false
		],
		[
			"192.0.0.0/29",
			"IPv4 Service Continuity Prefix",
			false
		],
		[
			"192.0.0.8/32",
			"IPv4 dummy address",
			false
		],
		[
			"192.0.0.9/32",
			"Port Control Protocol Anycast",
			true
		],
		[
			"192.0.0.10/32",
			"Traversal Using Relays around NAT Anycast",
			true
		],
		[
			"192.0.0.170/32",
			"NAT64/DNS64 Discovery",
			false
		],
		[
			"192.0.0.171/32",
			"NAT64/DNS64 Discovery",
			false
		],
		[
			"192.0.2.0/24",
			"Documentation (TEST-NET-1)",
			false
		],
		[
			"192.31.196.0/24",
			"AS112-v4",
			true
		],
		[
			"192.52.193.0/24",
			"AMT",
			true
		],
		[
			"192.88.99.0/24",
			"Deprecated (6to4 Relay Anycast)",
			null
		],
		[
			"192.88.99.2/32",
			"6a44-relay anycast address",
			false
		],
		[
			"192.168.0.0/16",
			"Private-Use",
			false
		],
		[
			"192.175.48.0/24",
			"Direct Delegation AS112 Service",
			true
		],
		[
			"198.18.0.0/15",
			"Benchmarking",
			false
		],
		[
			"198.51.100.0/24",
			"Documentation (TEST-NET-2)",
			false
		],
		[
			"203.0.113.0/24",
			"Documentation (TEST-NET-3)",
			false
		],
		[
			"240.0.0.0/4",
			"Reserved",
			false
		],
		[
			"255.255.255.255/32",
			"Limited Broadcast",
			false
		]
	];
}));
//#endregion
//#region node_modules/.pnpm/ip-address@10.7.5/node_modules/ip-address/dist/ipv4.js
var require_ipv4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Address4 = void 0;
	var common = __importStar(require_common$1());
	var constants = __importStar(require_constants$1());
	var address_error_1 = require_address_error();
	var isCorrect4 = common.isCorrect(constants.BITS);
	/**
	* Represents an IPv4 address
	* @param {string} address - An IPv4 address string
	*/
	var Address4 = class Address4 {
		constructor(address) {
			this.addressMinusSuffix = "";
			this.groups = constants.GROUPS;
			this.parsedAddress = [];
			this.parsedSubnet = "";
			this.subnet = "/32";
			this.subnetMask = 32;
			this.v4 = true;
			/**
			* Returns true if the address is correct, false otherwise
			* @returns {Boolean}
			*/
			this.isCorrect = isCorrect4;
			/**
			* Returns true if the given address is in the subnet of the current address.
			* An `Address6` is never in the subnet of an `Address4`; convert with
			* `to4()` or `Address6.fromAddress4()` to compare across families.
			* @returns {boolean}
			*/
			this.isInSubnet = common.isInSubnet;
			/**
			* Returns true if this address's host bits fall inside the given subnet,
			* ignoring this address's own subnet mask. Prefer this over `isInSubnet`
			* when classifying a single address, so the answer doesn't change with the
			* CIDR suffix the caller happened to write — notably when the address came
			* from untrusted input and the result backs a trust-boundary decision.
			* An `Address6` is never in the subnet of an `Address4`; convert with
			* `to4()` or `Address6.fromAddress4()` to compare across families.
			* @returns {boolean}
			*/
			this.isHostInSubnet = common.isHostInSubnet;
			this.address = address;
			const subnet = constants.RE_SUBNET_STRING.exec(address);
			if (subnet) {
				this.parsedSubnet = subnet[0].replace("/", "");
				this.subnetMask = parseInt(this.parsedSubnet, 10);
				this.subnet = `/${this.subnetMask}`;
				if (this.subnetMask < 0 || this.subnetMask > constants.BITS) throw new address_error_1.AddressError("Invalid subnet mask.");
				address = address.replace(constants.RE_SUBNET_STRING, "");
			}
			const longest = constants.GROUPS * 4 - 1;
			if (address.length > longest) throw new address_error_1.AddressError(`IPv4 addresses are at most ${longest} characters.`);
			this.addressMinusSuffix = address;
			this.parsedAddress = this.parse(address);
		}
		/**
		* Returns true if the given string is a valid IPv4 address (with optional
		* CIDR subnet), false otherwise. Host bits in the subnet portion are
		* allowed (e.g. `192.168.1.5/24` is valid); for strict network-address
		* validation compare `correctForm()` to `startAddress().correctForm()`,
		* or use `networkForm()`.
		*/
		static isValid(address) {
			try {
				new Address4(address);
				return true;
			} catch {
				return false;
			}
		}
		/**
		* Parses an IPv4 address string into its four octet groups and stores the
		* result on `this.parsedAddress`. Called automatically by the constructor;
		* you typically don't need to call it directly. Throws `AddressError` if
		* the input is not a valid IPv4 address.
		*/
		parse(address) {
			const groups = address.split(".");
			if (groups.some((group) => /^0\d/.test(group))) throw new address_error_1.AddressError("IPv4 addresses can't have leading zeroes.");
			if (!address.match(constants.RE_ADDRESS)) throw new address_error_1.AddressError("Invalid IPv4 address.");
			return groups;
		}
		/**
		* Returns the address in correct form: octets joined with `.` and any
		* leading zeros stripped (e.g. `192.168.1.1`). For IPv4 this matches the
		* canonical dotted-decimal representation.
		*/
		correctForm() {
			return this.parsedAddress.map((part) => parseInt(part, 10)).join(".");
		}
		/**
		* Construct an `Address4` from an address and a dotted-decimal subnet
		* mask given as separate strings (e.g. as returned by Node's
		* `os.networkInterfaces()`). Throws `AddressError` if the mask is
		* non-contiguous (e.g. `255.0.255.0`).
		* @example
		* var address = Address4.fromAddressAndMask('192.168.1.1', '255.255.255.0');
		* address.subnetMask; // 24
		*/
		static fromAddressAndMask(address, mask) {
			return new Address4(`${address}/${common.prefixLengthFromMask(new Address4(mask).bigInt(), constants.BITS)}`);
		}
		/**
		* Construct an `Address4` from an address and a Cisco-style wildcard mask
		* given as separate strings (e.g. `0.0.0.255` for a `/24`). The wildcard
		* mask is the bitwise inverse of the subnet mask. Throws `AddressError`
		* if the mask is non-contiguous (e.g. `0.255.0.255`).
		* @example
		* var address = Address4.fromAddressAndWildcardMask('10.0.0.1', '0.0.0.255');
		* address.subnetMask; // 24
		*/
		static fromAddressAndWildcardMask(address, wildcardMask) {
			const mask = new Address4(wildcardMask).bigInt() ^ (BigInt(1) << BigInt(constants.BITS)) - BigInt(1);
			return new Address4(`${address}/${common.prefixLengthFromMask(mask, constants.BITS)}`);
		}
		/**
		* Construct an `Address4` from a wildcard pattern with trailing `*`
		* octets. The number of trailing wildcards determines the prefix
		* length: each `*` represents 8 bits.
		*
		* Only trailing whole-octet wildcards are supported. Partial-octet
		* wildcards (e.g. `192.168.0.1*`) and interior wildcards (e.g.
		* `192.*.0.1`) throw `AddressError`.
		* @example
		* Address4.fromWildcard('192.168.0.*').subnet;   // '/24'
		* Address4.fromWildcard('192.168.*.*').subnet;   // '/16'
		* Address4.fromWildcard('*.*.*.*').subnet;       // '/0'
		*/
		static fromWildcard(input) {
			const groups = input.split(".");
			if (groups.length !== constants.GROUPS) throw new address_error_1.AddressError("Wildcard pattern must have 4 octets");
			let firstWildcard = -1;
			for (let i = 0; i < groups.length; i++) if (groups[i] === "*") {
				if (firstWildcard === -1) firstWildcard = i;
			} else if (firstWildcard !== -1) throw new address_error_1.AddressError("Wildcard `*` must only appear in trailing octets (e.g. `192.168.0.*`)");
			const trailing = firstWildcard === -1 ? 0 : groups.length - firstWildcard;
			const replaced = groups.map((g) => g === "*" ? "0" : g);
			const subnetBits = constants.BITS - trailing * 8;
			return new Address4(`${replaced.join(".")}/${subnetBits}`);
		}
		/**
		* Converts a hex string to an IPv4 address object. Accepts 8 hex digits
		* with optional `:` separators (e.g. `'7f000001'` or `'7f:00:00:01'`).
		* Throws `AddressError` for any other length or for non-hex characters.
		* @param {string} hex - a hex string to convert
		* @returns {Address4}
		*/
		static fromHex(hex) {
			const stripped = hex.replace(/:/g, "");
			if (!/^[0-9a-fA-F]{8}$/.test(stripped)) throw new address_error_1.AddressError("IPv4 hex must be exactly 8 hex digits");
			const groups = [];
			for (let i = 0; i < 8; i += 2) groups.push(parseInt(stripped.slice(i, i + 2), 16));
			return new Address4(groups.join("."));
		}
		/**
		* Converts an integer into a IPv4 address object. The integer must be a
		* non-negative safe integer in the range `[0, 2**32 - 1]`; otherwise
		* `AddressError` is thrown.
		* @param {integer} integer - a number to convert
		* @returns {Address4}
		*/
		static fromInteger(integer) {
			if (!Number.isInteger(integer) || integer < 0 || integer > 4294967295) throw new address_error_1.AddressError("IPv4 integer must be in the range 0 to 2**32 - 1");
			return Address4.fromHex(integer.toString(16).padStart(8, "0"));
		}
		/**
		* Return an address from in-addr.arpa form: the four octets reversed, with
		* or without the `.in-addr.arpa` suffix and root dot, in any case. Throws
		* `AddressError` unless the reversed labels form a valid IPv4 address, so
		* `fromArpa(x.reverseForm())` round-trips {@link reverseForm}.
		* @param {string} arpaFormAddress - an 'in-addr.arpa' form ipv4 address
		* @returns {Adress4}
		* @example
		* var address = Address4.fromArpa('42.2.0.192.in-addr.arpa.')
		* address.correctForm(); // '192.0.2.42'
		*/
		static fromArpa(arpaFormAddress) {
			const longest = constants.GROUPS * 4 - 1 + 3 + 14;
			if (arpaFormAddress.length > longest) throw new address_error_1.AddressError(`in-addr.arpa names are at most ${longest} characters.`);
			return new Address4(arpaFormAddress.replace(/(\.in-addr\.arpa)?\.?$/i, "").split(".").reverse().join("."));
		}
		/**
		* Converts an IPv4 address object to a hex string
		* @returns {String}
		*/
		toHex() {
			return this.parsedAddress.map((part) => common.stringToPaddedHex(part)).join(":");
		}
		/**
		* Converts an IPv4 address object to an array of bytes.
		*
		* To get a Node.js `Buffer`, wrap the result: `Buffer.from(address.toArray())`.
		* @returns {Array}
		*/
		toArray() {
			return this.parsedAddress.map((part) => parseInt(part, 10));
		}
		/**
		* Converts an IPv4 address object to an IPv6 address group
		* @returns {String}
		*/
		toGroup6() {
			const output = [];
			let i;
			for (i = 0; i < constants.GROUPS; i += 2) output.push(`${common.stringToPaddedHex(this.parsedAddress[i])}${common.stringToPaddedHex(this.parsedAddress[i + 1])}`);
			return output.join(":");
		}
		/**
		* Returns the address as a `bigint`
		* @returns {bigint}
		*/
		bigInt() {
			return BigInt(`0x${this.parsedAddress.map((n) => common.stringToPaddedHex(n)).join("")}`);
		}
		/**
		* Helper function getting start address.
		* @returns {bigint}
		*/
		_startAddress() {
			return BigInt(`0b${this.mask() + "0".repeat(constants.BITS - this.subnetMask)}`);
		}
		/**
		* The first address in the range given by this address' subnet.
		* Often referred to as the Network Address.
		* @returns {Address4}
		*/
		startAddress() {
			return Address4.fromBigInt(this._startAddress());
		}
		/**
		* The first host address in the range given by this address's subnet ie
		* the first address after the Network Address
		* @returns {Address4}
		*/
		startAddressExclusive() {
			const adjust = BigInt("1");
			return Address4.fromBigInt(this._startAddress() + adjust);
		}
		/**
		* Returns the address `n` addresses after this one (or before, when `n` is
		* negative), keeping this address's subnet mask. Throws `AddressError` when
		* the result would fall outside the IPv4 address space or `n` is not an
		* integer.
		* @param {number | bigint} n
		* @returns {Address4}
		* @example
		* new Address4('10.0.0.0/24').offset(1).correctForm(); // '10.0.0.1'
		*/
		offset(n) {
			return Address4.fromBigInt(common.offsetBigInt(this.bigInt(), n, constants.BITS, "IPv4")).withSubnetMask(this.subnetMask);
		}
		/**
		* Returns the network that follows this address's network: the address after
		* {@link endAddress}, with the same subnet mask. Throws `AddressError` when
		* this network is the last one in the address space.
		* @returns {Address4}
		* @example
		* new Address4('10.0.0.0/24').nextNetwork().networkForm(); // '10.0.1.0/24'
		*/
		nextNetwork() {
			return Address4.fromBigInt(common.offsetBigInt(this._endAddress(), 1, constants.BITS, "IPv4")).withSubnetMask(this.subnetMask);
		}
		withSubnetMask(subnetMask) {
			return new Address4(`${this.correctForm()}/${subnetMask}`);
		}
		/**
		* Helper function getting end address.
		* @returns {bigint}
		*/
		_endAddress() {
			return BigInt(`0b${this.mask() + "1".repeat(constants.BITS - this.subnetMask)}`);
		}
		/**
		* The last address in the range given by this address' subnet
		* Often referred to as the Broadcast
		* @returns {Address4}
		*/
		endAddress() {
			return Address4.fromBigInt(this._endAddress());
		}
		/**
		* The last host address in the range given by this address's subnet ie
		* the last address prior to the Broadcast Address
		* @returns {Address4}
		*/
		endAddressExclusive() {
			const adjust = BigInt("1");
			return Address4.fromBigInt(this._endAddress() - adjust);
		}
		/**
		* The dotted-decimal form of the subnet mask, e.g. `255.255.240.0` for
		* a `/20`. Returns an `Address4`; call `.correctForm()` for the string.
		* @returns {Address4}
		*/
		subnetMaskAddress() {
			return Address4.fromBigInt(BigInt(`0b${"1".repeat(this.subnetMask)}${"0".repeat(constants.BITS - this.subnetMask)}`));
		}
		/**
		* The Cisco-style wildcard mask, e.g. `0.0.0.255` for a `/24`. This is
		* the bitwise inverse of `subnetMaskAddress()`. Returns an `Address4`;
		* call `.correctForm()` for the string.
		* @returns {Address4}
		*/
		wildcardMask() {
			return Address4.fromBigInt(BigInt(`0b${"0".repeat(this.subnetMask)}${"1".repeat(constants.BITS - this.subnetMask)}`));
		}
		/**
		* The network address in CIDR string form, e.g. `192.168.1.0/24` for
		* `192.168.1.5/24`. For an address with no explicit subnet the prefix is
		* `/32`, e.g. `networkForm()` on `192.168.1.5` returns `192.168.1.5/32`.
		* @returns {string}
		*/
		networkForm() {
			return `${this.startAddress().correctForm()}/${this.subnetMask}`;
		}
		/**
		* Converts a BigInt to a v4 address object. The value must be in the
		* range `[0, 2**32 - 1]`; otherwise `AddressError` is thrown.
		* @param {bigint} bigInt - a BigInt to convert
		* @returns {Address4}
		*/
		static fromBigInt(bigInt) {
			if (bigInt < BigInt(0) || bigInt > BigInt(4294967295)) throw new address_error_1.AddressError("IPv4 BigInt must be in the range 0 to 2**32 - 1");
			return Address4.fromHex(bigInt.toString(16).padStart(8, "0"));
		}
		/**
		* Convert a byte array to an Address4 object. Throws `AddressError` unless
		* given exactly 4 integers from 0 to 255. Signed bytes are rejected, so
		* this differs from `Address6.fromByteArray`, which folds them; the two
		* contracts converge on this stricter form in the next major version.
		*
		* To convert from a Node.js `Buffer`, spread it: `Address4.fromByteArray([...buf])`.
		* @param {Array<number>} bytes - an array of 4 bytes (0-255)
		* @returns {Address4}
		*/
		static fromByteArray(bytes) {
			common.assertByteArray(bytes, 4, "IPv4", 0);
			return this.fromUnsignedByteArray(bytes);
		}
		/**
		* Convert an unsigned byte array to an Address4 object. Throws
		* `AddressError` unless given exactly 4 bytes, and rejects values outside
		* 0 to 255 when parsing the resulting address.
		*
		* To convert from a Node.js `Buffer`, spread it:
		* `Address4.fromUnsignedByteArray([...buf])`.
		* @param {Array<number>} bytes - an array of 4 unsigned bytes (0-255)
		* @returns {Address4}
		*/
		static fromUnsignedByteArray(bytes) {
			if (bytes.length !== 4) throw new address_error_1.AddressError("IPv4 addresses require exactly 4 bytes");
			return new Address4(bytes.join("."));
		}
		/**
		* Returns the first n bits of the address, defaulting to the
		* subnet mask
		* @returns {String}
		*/
		mask(mask) {
			if (mask === void 0) mask = this.subnetMask;
			return this.getBitsBase2(0, mask);
		}
		/**
		* Returns the bits in the given range as a base-2 string
		* @returns {string}
		*/
		getBitsBase2(start, end) {
			return this.binaryZeroPad().slice(start, end);
		}
		/**
		* Return the reversed in-addr.arpa form of the address, e.g.
		* `42.2.0.192.in-addr.arpa.` for `192.0.2.42`.
		* @param {Object} options
		* @param {boolean} options.omitSuffix - omit the "in-addr.arpa" suffix
		* @returns {String}
		*/
		reverseForm(options) {
			if (!options) options = {};
			const reversed = this.correctForm().split(".").reverse().join(".");
			if (options.omitSuffix) return reversed;
			return `${reversed}.in-addr.arpa.`;
		}
		/**
		* Returns true if the given address is a multicast address
		* @returns {boolean}
		*/
		isMulticast() {
			return this.isHostInSubnet(MULTICAST_V4);
		}
		/**
		* Returns true if the address is in one of the [RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918) private address ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`).
		* @returns {boolean}
		*/
		isPrivate() {
			return PRIVATE_V4.some((subnet) => this.isHostInSubnet(subnet));
		}
		/**
		* Returns true if the address is in the loopback range `127.0.0.0/8` ([RFC 1122](https://datatracker.ietf.org/doc/html/rfc1122)).
		* @returns {boolean}
		*/
		isLoopback() {
			return this.isHostInSubnet(LOOPBACK_V4);
		}
		/**
		* Returns true if the address is in the link-local range `169.254.0.0/16` ([RFC 3927](https://datatracker.ietf.org/doc/html/rfc3927)).
		* @returns {boolean}
		*/
		isLinkLocal() {
			return this.isHostInSubnet(LINK_LOCAL_V4);
		}
		/**
		* Returns true if the address is the unspecified address `0.0.0.0`.
		* @returns {boolean}
		*/
		isUnspecified() {
			return this.isHostInSubnet(UNSPECIFIED_V4);
		}
		/**
		* Returns true if the address is the limited broadcast address `255.255.255.255` ([RFC 919](https://datatracker.ietf.org/doc/html/rfc919)).
		* @returns {boolean}
		*/
		isBroadcast() {
			return this.isHostInSubnet(BROADCAST_V4);
		}
		/**
		* Returns true if the address is in the carrier-grade NAT range `100.64.0.0/10` ([RFC 6598](https://datatracker.ietf.org/doc/html/rfc6598)).
		* @returns {boolean}
		*/
		isCGNAT() {
			return this.isHostInSubnet(CGNAT_V4);
		}
		/**
		* Returns true if the address is in one of the documentation ranges
		* `192.0.2.0/24`, `198.51.100.0/24`, or `203.0.113.0/24` ([RFC 5737](https://datatracker.ietf.org/doc/html/rfc5737)).
		* @returns {boolean}
		*/
		isDocumentation() {
			return DOCUMENTATION_V4.some((subnet) => this.isHostInSubnet(subnet));
		}
		/**
		* Returns true if the address is in the benchmarking range `198.18.0.0/15` ([RFC 2544](https://datatracker.ietf.org/doc/html/rfc2544)).
		* @returns {boolean}
		*/
		isBenchmarking() {
			return this.isHostInSubnet(BENCHMARKING_V4);
		}
		/**
		* Returns true if the address is in the reserved range `240.0.0.0/4` ([RFC 1112](https://datatracker.ietf.org/doc/html/rfc1112)),
		* which includes the limited broadcast address.
		* @returns {boolean}
		*/
		isReserved() {
			return this.isHostInSubnet(RESERVED_V4);
		}
		/**
		* Returns true if the address is globally reachable: not multicast, and not
		* in any block the [IANA IPv4 Special-Purpose Address Registry](https://www.iana.org/assignments/iana-ipv4-special-registry/)
		* marks as not globally reachable. That covers everything the individual
		* classifiers name (private, loopback, link-local, CGNAT, unspecified,
		* broadcast, documentation, benchmarking, reserved) and the blocks they do
		* not, such as `0.0.0.0/8` and the IETF protocol assignments in
		* `192.0.0.0/24`. This is the single predicate to use where a request must
		* not reach an internal or special-purpose destination; see SECURITY.md.
		* @returns {boolean}
		*/
		isGlobal() {
			return !this.isMulticast() && common.isGloballyReachable.call(this, SPECIAL_PURPOSE_V4);
		}
		/**
		* Returns a zero-padded base-2 string representation of the address
		* @returns {string}
		*/
		binaryZeroPad() {
			if (this._binaryZeroPad === void 0) this._binaryZeroPad = this.bigInt().toString(2).padStart(constants.BITS, "0");
			return this._binaryZeroPad;
		}
		/**
		* Groups an IPv4 address for inclusion at the end of an IPv6 address.
		*
		* Returns an HTML fragment: each half of the address is wrapped in a
		* `<span>` carrying the group classes an address-inspector UI hovers on.
		* The address content is HTML-escaped; anything you concatenate around it
		* is your responsibility.
		* @returns {String}
		*/
		groupForV6() {
			const segments = this.parsedAddress;
			return this.correctForm().replace(constants.RE_ADDRESS, `<span class="hover-group group-v4 group-6">${segments.slice(0, 2).join(".")}</span>.<span class="hover-group group-v4 group-7">${segments.slice(2, 4).join(".")}</span>`);
		}
	};
	exports.Address4 = Address4;
	var MULTICAST_V4 = new Address4("224.0.0.0/4");
	var PRIVATE_V4 = [
		new Address4("10.0.0.0/8"),
		new Address4("172.16.0.0/12"),
		new Address4("192.168.0.0/16")
	];
	var LOOPBACK_V4 = new Address4("127.0.0.0/8");
	var LINK_LOCAL_V4 = new Address4("169.254.0.0/16");
	var UNSPECIFIED_V4 = new Address4("0.0.0.0/32");
	var BROADCAST_V4 = new Address4("255.255.255.255/32");
	var CGNAT_V4 = new Address4("100.64.0.0/10");
	var DOCUMENTATION_V4 = [
		new Address4("192.0.2.0/24"),
		new Address4("198.51.100.0/24"),
		new Address4("203.0.113.0/24")
	];
	var BENCHMARKING_V4 = new Address4("198.18.0.0/15");
	var RESERVED_V4 = new Address4("240.0.0.0/4");
	var SPECIAL_PURPOSE_V4 = constants.SPECIAL_PURPOSE.map(([cidr, , reachable]) => ({
		subnet: new Address4(cidr),
		reachable
	}));
}));
//#endregion
//#region node_modules/.pnpm/ip-address@10.7.5/node_modules/ip-address/dist/v6/constants.js
var require_constants = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SPECIAL_PURPOSE = exports.RE_URL_WITH_PORT = exports.RE_URL = exports.RE_ZONE_STRING = exports.RE_SUBNET_STRING = exports.RE_BAD_ADDRESS = exports.RE_BAD_CHARACTERS = exports.TYPES = exports.SCOPES = exports.GROUPS = exports.BITS = void 0;
	exports.BITS = 128;
	exports.GROUPS = 8;
	/**
	* Represents IPv6 address scopes
	* @memberof Address6
	* @static
	*/
	exports.SCOPES = {
		0: "Reserved",
		1: "Interface local",
		2: "Link local",
		4: "Admin local",
		5: "Site local",
		8: "Organization local",
		14: "Global",
		15: "Reserved"
	};
	/**
	* Represents IPv6 address types
	* @memberof Address6
	* @static
	*/
	exports.TYPES = {
		"ff01::1/128": "Multicast (All nodes on this interface)",
		"ff01::2/128": "Multicast (All routers on this interface)",
		"ff02::1/128": "Multicast (All nodes on this link)",
		"ff02::2/128": "Multicast (All routers on this link)",
		"ff05::2/128": "Multicast (All routers in this site)",
		"ff02::5/128": "Multicast (OSPFv3 AllSPF routers)",
		"ff02::6/128": "Multicast (OSPFv3 AllDR routers)",
		"ff02::9/128": "Multicast (RIP routers)",
		"ff02::a/128": "Multicast (EIGRP routers)",
		"ff02::d/128": "Multicast (PIM routers)",
		"ff02::16/128": "Multicast (MLDv2 reports)",
		"ff01::fb/128": "Multicast (mDNSv6)",
		"ff02::fb/128": "Multicast (mDNSv6)",
		"ff05::fb/128": "Multicast (mDNSv6)",
		"ff02::1:2/128": "Multicast (All DHCP servers and relay agents on this link)",
		"ff05::1:2/128": "Multicast (All DHCP servers and relay agents in this site)",
		"ff02::1:3/128": "Multicast (All DHCP servers on this link)",
		"ff05::1:3/128": "Multicast (All DHCP servers in this site)",
		"::/128": "Unspecified",
		"::1/128": "Loopback",
		"::ffff:0:0/96": "IPv4-mapped",
		"ff00::/8": "Multicast",
		"fe80::/10": "Link-local unicast",
		"fc00::/7": "Unique local",
		"2001::/32": "Teredo",
		"2001:2::/48": "Benchmarking",
		"2002::/16": "6to4",
		"2001:db8::/32": "Documentation",
		"3fff::/20": "Documentation",
		"100::/64": "Discard-only",
		"fec0::/10": "Site-local unicast (deprecated)",
		"::/96": "IPv4-compatible (deprecated)",
		"64:ff9b::/96": "NAT64 (well-known)",
		"64:ff9b:1::/48": "NAT64 (local-use)"
	};
	/**
	* A regular expression that matches bad characters in an IPv6 address
	* @memberof Address6
	* @static
	*/
	exports.RE_BAD_CHARACTERS = /([^0-9a-f:/%])/gi;
	/**
	* A regular expression that matches an incorrect IPv6 address
	* @memberof Address6
	* @static
	*/
	exports.RE_BAD_ADDRESS = /([0-9a-f]{5,}|:{3,}|[^:]:$|^:[^:]|\/$)/gi;
	/**
	* A regular expression that matches an IPv6 subnet
	* @memberof Address6
	* @static
	*/
	exports.RE_SUBNET_STRING = /\/\d{1,3}(?=%|$)/;
	/**
	* A regular expression that matches an IPv6 zone
	* @memberof Address6
	* @static
	* @deprecated Takes quadratic time on input holding many `%` characters
	* followed by a line terminator. The library finds the zone by index, as
	* `Address6`'s constructor shows, and 11.0.0 removes this export.
	*/
	exports.RE_ZONE_STRING = /%.*$/;
	exports.RE_URL = /^(?:\[([0-9a-f:.]+)\]|([0-9a-f:.]+))(?:[/?#].*)?$/i;
	exports.RE_URL_WITH_PORT = /^\[([0-9a-f:.]+)\]:([0-9]{1,5})(?:[/?#].*)?$/i;
	/**
	* The IANA IPv6 Special-Purpose Address Registry
	* (https://www.iana.org/assignments/iana-ipv6-special-registry/), one entry
	* per block: `[cidr, name, globallyReachable]`. A `null` reachability means
	* the registry says N/A or leaves the column blank; N/A blocks (Teredo, 6to4)
	* are treated as not globally reachable, since a packet to one needs a relay,
	* and blank blocks inherit the answer of the block containing them.
	*
	* `Address6.isGlobal()` answers from the most specific entry containing the
	* address, after delegating IPv4-mapped and NAT64 well-known addresses to the
	* embedded IPv4 address. `test/data/iana-corpus.json` is generated from the
	* registry's CSV and pins this table to it.
	*/
	exports.SPECIAL_PURPOSE = [
		[
			"::1/128",
			"Loopback Address",
			false
		],
		[
			"::/128",
			"Unspecified Address",
			false
		],
		[
			"::ffff:0:0/96",
			"IPv4-mapped Address",
			false
		],
		[
			"64:ff9b::/96",
			"IPv4-IPv6 Translat.",
			true
		],
		[
			"64:ff9b:1::/48",
			"IPv4-IPv6 Translat.",
			false
		],
		[
			"100::/64",
			"Discard-Only Address Block",
			false
		],
		[
			"100:0:0:1::/64",
			"Dummy IPv6 Prefix",
			false
		],
		[
			"2001::/23",
			"IETF Protocol Assignments",
			false
		],
		[
			"2001::/32",
			"TEREDO",
			false
		],
		[
			"2001:1::1/128",
			"Port Control Protocol Anycast",
			true
		],
		[
			"2001:1::2/128",
			"Traversal Using Relays around NAT Anycast",
			true
		],
		[
			"2001:1::3/128",
			"DNS-SD Service Registration Protocol Anycast",
			true
		],
		[
			"2001:2::/48",
			"Benchmarking",
			false
		],
		[
			"2001:3::/32",
			"AMT",
			true
		],
		[
			"2001:4:112::/48",
			"AS112-v6",
			true
		],
		[
			"2001:10::/28",
			"Deprecated (previously ORCHID)",
			null
		],
		[
			"2001:20::/28",
			"ORCHIDv2",
			true
		],
		[
			"2001:30::/28",
			"Drone Remote ID Protocol Entity Tags (DETs) Prefix",
			true
		],
		[
			"2001:db8::/32",
			"Documentation",
			false
		],
		[
			"2002::/16",
			"6to4",
			false
		],
		[
			"2620:4f:8000::/48",
			"Direct Delegation AS112 Service",
			true
		],
		[
			"3fff::/20",
			"Documentation",
			false
		],
		[
			"5f00::/16",
			"Segment Routing (SRv6) SIDs",
			false
		],
		[
			"fc00::/7",
			"Unique-Local",
			false
		],
		[
			"fe80::/10",
			"Link-Local Unicast",
			false
		]
	];
}));
//#endregion
//#region node_modules/.pnpm/ip-address@10.7.5/node_modules/ip-address/dist/v6/helpers.js
var require_helpers$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.escapeHtml = escapeHtml;
	exports.spanAllZeroes = spanAllZeroes;
	exports.spanAll = spanAll;
	exports.spanLeadingZeroes = spanLeadingZeroes;
	exports.simpleGroup = simpleGroup;
	function escapeHtml(s) {
		return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
	}
	/**
	* @returns {String} the string with all zeroes contained in a <span>
	*/
	function spanAllZeroes(s) {
		return escapeHtml(s).replace(/(0+)/g, "<span class=\"zero\">$1</span>");
	}
	/**
	* @returns {String} the string with each character contained in a <span>
	*/
	function spanAll(s, offset = 0) {
		return s.split("").map((n, i) => `<span class="digit value-${escapeHtml(n)} position-${i + offset}">${spanAllZeroes(n)}</span>`).join("");
	}
	function spanLeadingZeroesSimple(group) {
		return escapeHtml(group).replace(/^(0+)/, "<span class=\"zero\">$1</span>");
	}
	/**
	* @returns {String} the string with leading zeroes contained in a <span>
	*/
	function spanLeadingZeroes(address) {
		return address.split(":").map((g) => spanLeadingZeroesSimple(g)).join(":");
	}
	/**
	* Groups an address
	* @returns {String} a grouped address
	*/
	function simpleGroup(addressString, offset = 0) {
		return addressString.split(":").map((g, i) => {
			if (/group-v4/.test(g)) return g;
			return `<span class="hover-group group-${i + offset}">${spanLeadingZeroesSimple(g)}</span>`;
		});
	}
}));
//#endregion
//#region node_modules/.pnpm/ip-address@10.7.5/node_modules/ip-address/dist/v6/regular-expressions.js
var require_regular_expressions = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ADDRESS_BOUNDARY = void 0;
	exports.groupPossibilities = groupPossibilities;
	exports.padGroup = padGroup;
	exports.simpleRegularExpression = simpleRegularExpression;
	exports.possibleElisions = possibleElisions;
	var v6 = __importStar(require_constants());
	function groupPossibilities(possibilities) {
		return `(${possibilities.join("|")})`;
	}
	function padGroup(group) {
		if (group.length < 4) return `0{0,${4 - group.length}}${group}`;
		return group;
	}
	exports.ADDRESS_BOUNDARY = "[^A-Fa-f0-9:]";
	function simpleRegularExpression(groups) {
		const zeroIndexes = [];
		groups.forEach((group, i) => {
			if (parseInt(group, 16) === 0) zeroIndexes.push(i);
		});
		const possibilities = zeroIndexes.map((zeroIndex) => groups.map((group, i) => {
			if (i === zeroIndex) {
				const elision = i === 0 || i === v6.GROUPS - 1 ? ":" : "";
				return groupPossibilities([padGroup(group), elision]);
			}
			return padGroup(group);
		}).join(":"));
		possibilities.push(groups.map(padGroup).join(":"));
		return groupPossibilities(possibilities);
	}
	function possibleElisions(elidedGroups, moreLeft, moreRight) {
		const left = moreLeft ? "" : ":";
		const right = moreRight ? "" : ":";
		const possibilities = [];
		if (!moreLeft && !moreRight) possibilities.push("::");
		if (moreLeft && moreRight) possibilities.push("");
		if (moreRight && !moreLeft || !moreRight && moreLeft) possibilities.push(":");
		possibilities.push(`${left}(:0{1,4}){1,${elidedGroups - 1}}`);
		possibilities.push(`(0{1,4}:){1,${elidedGroups - 1}}${right}`);
		possibilities.push(`(0{1,4}:){${elidedGroups - 1}}0{1,4}`);
		for (let groups = 1; groups < elidedGroups - 1; groups++) for (let position = 1; position < elidedGroups - groups; position++) possibilities.push(`(0{1,4}:){${position}}:(0{1,4}:){${elidedGroups - position - groups - 1}}0{1,4}`);
		return groupPossibilities(possibilities);
	}
}));
//#endregion
//#region node_modules/.pnpm/ip-address@10.7.5/node_modules/ip-address/dist/ipv6.js
var require_ipv6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Address6 = void 0;
	var common = __importStar(require_common$1());
	var constants4 = __importStar(require_constants$1());
	var constants6 = __importStar(require_constants());
	var helpers = __importStar(require_helpers$2());
	var ipv4_1 = require_ipv4();
	var regular_expressions_1 = require_regular_expressions();
	var address_error_1 = require_address_error();
	var common_1 = require_common$1();
	var isCorrect6 = common.isCorrect(constants6.BITS);
	function assert(condition) {
		if (!condition) throw new Error("Assertion failed.");
	}
	function addCommas(number) {
		const r = /(\d+)(\d{3})/;
		while (r.test(number)) number = number.replace(r, "$1,$2");
		return number;
	}
	function spanLeadingZeroes4(n) {
		n = n.replace(/^(0{1,})([1-9]+)$/, "<span class=\"parse-error\">$1</span>$2");
		n = n.replace(/^(0{1,})(0)$/, "<span class=\"parse-error\">$1</span>$2");
		return n;
	}
	function compact(address, slice) {
		const s1 = [];
		const s2 = [];
		let i;
		for (i = 0; i < address.length; i++) if (i < slice[0]) s1.push(address[i]);
		else if (i > slice[1]) s2.push(address[i]);
		return s1.concat(["compact"]).concat(s2);
	}
	function paddedHex(octet) {
		return parseInt(octet, 16).toString(16).padStart(4, "0");
	}
	function unsignByte(b) {
		return b & 255;
	}
	/**
	* Represents an IPv6 address
	* @param {string} address - An IPv6 address string
	* @param {number} [groups=8] - How many octets to parse
	* @example
	* var address = new Address6('2001::/32');
	*/
	var Address6 = class Address6 {
		constructor(address, optionalGroups) {
			this.addressMinusSuffix = "";
			this.parsedSubnet = "";
			this.subnet = "/128";
			this.subnetMask = 128;
			this.v4 = false;
			this.zone = "";
			/**
			* Returns true if the given address is in the subnet of the current address.
			* An `Address4` is never in the subnet of an `Address6`; convert with
			* `Address6.fromAddress4()` or `to4()` to compare across families.
			* @returns {boolean}
			*/
			this.isInSubnet = common.isInSubnet;
			/**
			* Returns true if this address's host bits fall inside the given subnet,
			* ignoring this address's own subnet mask. Prefer this over `isInSubnet`
			* when classifying a single address, so the answer doesn't change with the
			* CIDR suffix the caller happened to write — notably when the address came
			* from untrusted input and the result backs a trust-boundary decision.
			* An `Address4` is never in the subnet of an `Address6`; convert with
			* `Address6.fromAddress4()` or `to4()` to compare across families.
			* @returns {boolean}
			*/
			this.isHostInSubnet = common.isHostInSubnet;
			/**
			* Returns true if the address is correct, false otherwise
			* @returns {boolean}
			*/
			this.isCorrect = isCorrect6;
			if (optionalGroups === void 0) this.groups = constants6.GROUPS;
			else this.groups = optionalGroups;
			this.address = address;
			const subnet = constants6.RE_SUBNET_STRING.exec(address);
			if (subnet) {
				this.parsedSubnet = subnet[0].replace("/", "");
				this.subnetMask = parseInt(this.parsedSubnet, 10);
				this.subnet = `/${this.subnetMask}`;
				if (Number.isNaN(this.subnetMask) || this.subnetMask < 0 || this.subnetMask > constants6.BITS) throw new address_error_1.AddressError("Invalid subnet mask.");
				address = address.replace(constants6.RE_SUBNET_STRING, "");
			}
			if (/\//.test(address)) throw new address_error_1.AddressError("Invalid subnet mask.");
			const zoneStart = address.indexOf("%");
			if (zoneStart !== -1 && /^.*$/.test(address.slice(zoneStart))) {
				this.zone = address.slice(zoneStart);
				address = address.slice(0, zoneStart);
			}
			const longest = this.groups * 5 + 5;
			if (address.length > longest) throw new address_error_1.AddressError(`IPv6 addresses are at most ${longest} characters.`);
			this.addressMinusSuffix = address;
			this.parsedAddress = this.parse(this.addressMinusSuffix);
		}
		/**
		* Returns true if the given string is a valid IPv6 address (with optional
		* CIDR subnet and zone identifier), false otherwise. Host bits in the
		* subnet portion are allowed (e.g. `2001:db8::1/32` is valid); for strict
		* network-address validation compare `correctForm()` to
		* `startAddress().correctForm()`, or use `networkForm()`.
		*/
		static isValid(address) {
			try {
				new Address6(address);
				return true;
			} catch {
				return false;
			}
		}
		/**
		* Convert a BigInt to a v6 address object. The value must be in the
		* range `[0, 2**128 - 1]`; otherwise `AddressError` is thrown.
		* @param {bigint} bigInt - a BigInt to convert
		* @returns {Address6}
		* @example
		* var bigInt = BigInt('1000000000000');
		* var address = Address6.fromBigInt(bigInt);
		* address.correctForm(); // '::e8:d4a5:1000'
		*/
		static fromBigInt(bigInt) {
			if (bigInt < BigInt(0) || bigInt > (BigInt(1) << BigInt(constants6.BITS)) - BigInt(1)) throw new address_error_1.AddressError("IPv6 BigInt must be in the range 0 to 2**128 - 1");
			const hex = bigInt.toString(16).padStart(32, "0");
			const groups = [];
			for (let i = 0; i < constants6.GROUPS; i++) groups.push(hex.slice(i * 4, (i + 1) * 4));
			return new Address6(groups.join(":"));
		}
		/**
		* Parse a URL (with optional bracketed host and port) into an address and
		* port. Returns either `{ address, port }` on success or
		* `{ error, address: null, port: null }` if the URL could not be parsed.
		* Ports are returned as numbers (or `null` if absent or out of range).
		* @example
		* var addressAndPort = Address6.fromURL('http://[ffff::]:8080/foo/');
		* addressAndPort.address.correctForm(); // 'ffff::'
		* addressAndPort.port; // 8080
		*/
		static fromURL(url) {
			var _a;
			let host;
			let port = null;
			let result;
			let error;
			const stripped = url.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "");
			if (stripped.indexOf("[") !== -1 && stripped.indexOf("]:") !== -1) {
				error = "failed to parse address with port";
				result = constants6.RE_URL_WITH_PORT.exec(stripped);
				if (result === null) return {
					error,
					address: null,
					port: null
				};
				host = result[1];
				port = result[2];
			} else {
				error = "failed to parse address from URL";
				result = constants6.RE_URL.exec(stripped);
				if (result === null) return {
					error,
					address: null,
					port: null
				};
				host = (_a = result[1]) !== null && _a !== void 0 ? _a : result[2];
			}
			if (port) {
				port = parseInt(port, 10);
				if (port < 0 || port > 65535) port = null;
			} else port = null;
			let address;
			try {
				address = new Address6(host);
			} catch {
				return {
					error,
					address: null,
					port: null
				};
			}
			return {
				address,
				port
			};
		}
		/**
		* Construct an `Address6` from an address and a hex subnet mask given as
		* separate strings (e.g. as returned by Node's `os.networkInterfaces()`).
		* Throws `AddressError` if the mask is non-contiguous (e.g.
		* `ffff::ffff`).
		* @example
		* var address = Address6.fromAddressAndMask('fe80::1', 'ffff:ffff:ffff:ffff::');
		* address.subnetMask; // 64
		*/
		static fromAddressAndMask(address, mask) {
			return new Address6(`${address}/${common.prefixLengthFromMask(new Address6(mask).bigInt(), constants6.BITS)}`);
		}
		/**
		* Construct an `Address6` from an address and a Cisco-style wildcard mask
		* given as separate strings (e.g. `::ffff:ffff:ffff:ffff` for a `/64`).
		* The wildcard mask is the bitwise inverse of the subnet mask. Throws
		* `AddressError` if the mask is non-contiguous.
		* @example
		* var address = Address6.fromAddressAndWildcardMask('fe80::1', '::ffff:ffff:ffff:ffff');
		* address.subnetMask; // 64
		*/
		static fromAddressAndWildcardMask(address, wildcardMask) {
			const mask = new Address6(wildcardMask).bigInt() ^ (BigInt(1) << BigInt(constants6.BITS)) - BigInt(1);
			return new Address6(`${address}/${common.prefixLengthFromMask(mask, constants6.BITS)}`);
		}
		/**
		* Construct an `Address6` from a wildcard pattern with trailing `*`
		* groups. The number of trailing wildcards determines the prefix
		* length: each `*` represents 16 bits. `::` is expanded to zero groups
		* (not wildcards) before evaluating trailing wildcards.
		*
		* Only trailing whole-group wildcards are supported. Partial-group
		* wildcards (e.g. `2001:db8::0*`) and interior wildcards (e.g.
		* `*::1`) throw `AddressError`.
		* @example
		* Address6.fromWildcard('2001:db8:*:*:*:*:*:*').subnet;  // '/32'
		* Address6.fromWildcard('2001:db8::*').subnet;           // '/112'
		* Address6.fromWildcard('*:*:*:*:*:*:*:*').subnet;       // '/0'
		*/
		static fromWildcard(input) {
			if (input.includes("%") || input.includes("/")) throw new address_error_1.AddressError("Wildcard pattern must not include a zone or CIDR suffix");
			const halves = input.split("::");
			if (halves.length > 2) throw new address_error_1.AddressError("Wildcard pattern cannot contain more than one '::'");
			let groups;
			if (halves.length === 2) {
				const left = halves[0] === "" ? [] : halves[0].split(":");
				const right = halves[1] === "" ? [] : halves[1].split(":");
				const remaining = constants6.GROUPS - left.length - right.length;
				if (remaining < 1) throw new address_error_1.AddressError("Wildcard pattern with '::' has too many groups");
				groups = [
					...left,
					...new Array(remaining).fill("0"),
					...right
				];
			} else groups = input.split(":");
			if (groups.length !== constants6.GROUPS) throw new address_error_1.AddressError("Wildcard pattern must have 8 groups");
			let firstWildcard = -1;
			for (let i = 0; i < groups.length; i++) if (groups[i] === "*") {
				if (firstWildcard === -1) firstWildcard = i;
			} else if (firstWildcard !== -1) throw new address_error_1.AddressError("Wildcard `*` must only appear in trailing groups (e.g. `2001:db8:*:*:*:*:*:*`)");
			const trailing = firstWildcard === -1 ? 0 : groups.length - firstWildcard;
			const replaced = groups.map((g) => g === "*" ? "0" : g);
			const subnetBits = constants6.BITS - trailing * 16;
			return new Address6(`${replaced.join(":")}/${subnetBits}`);
		}
		/**
		* Create an IPv6-mapped address given an IPv4 address
		* @param {string} address - An IPv4 address string
		* @returns {Address6}
		* @example
		* var address = Address6.fromAddress4('192.168.0.1');
		* address.correctForm(); // '::ffff:c0a8:1'
		* address.to4in6(); // '::ffff:192.168.0.1'
		*/
		static fromAddress4(address) {
			const address4 = new ipv4_1.Address4(address);
			const mask6 = constants6.BITS - (constants4.BITS - address4.subnetMask);
			return new Address6(`::ffff:${address4.correctForm()}/${mask6}`);
		}
		/**
		* Return an address from ip6.arpa form. A full 32-nibble name gives a /128
		* address; a shorter name, as used for a delegated reverse zone, gives the
		* network it covers, with a subnet mask of four bits per nibble, so
		* `fromArpa(x.reverseForm())` round-trips {@link reverseForm} for any prefix.
		* @param {string} arpaFormAddress - an 'ip6.arpa' form address
		* @returns {Adress6}
		* @example
		* var address = Address6.fromArpa(e.f.f.f.3.c.2.6.f.f.f.e.6.6.8.e.1.0.6.7.9.4.e.c.0.0.0.0.1.0.0.2.ip6.arpa.)
		* address.correctForm(); // '2001:0:ce49:7601:e866:efff:62c3:fffe'
		* Address6.fromArpa('8.b.d.0.1.0.0.2.ip6.arpa.').networkForm(); // '2001:db8::/32'
		*/
		static fromArpa(arpaFormAddress) {
			const nibbles = arpaFormAddress.replace(/(\.ip6\.arpa)?\.?$/i, "");
			if (!/^[0-9a-f](\.[0-9a-f]){0,31}$/i.test(nibbles)) throw new address_error_1.AddressError("Invalid 'ip6.arpa' form.");
			const reversed = nibbles.split(".").reverse();
			const subnetMask = reversed.length * 4;
			const hex = reversed.join("").padEnd(32, "0");
			const groups = [];
			for (let i = 0; i < constants6.GROUPS; i++) groups.push(hex.slice(i * 4, (i + 1) * 4));
			return new Address6(`${groups.join(":")}/${subnetMask}`);
		}
		/**
		* Return the Microsoft UNC transcription of the address
		* @returns {String} the Microsoft UNC transcription of the address
		*/
		microsoftTranscription() {
			return `${this.correctForm().replace(/:/g, "-")}.ipv6-literal.net`;
		}
		/**
		* Return the first n bits of the address, defaulting to the subnet mask
		* @param {number} [mask=subnet] - the number of bits to mask
		* @returns {String} the first n bits of the address as a string
		*/
		mask(mask = this.subnetMask) {
			return this.getBitsBase2(0, mask);
		}
		/**
		* Return the number of possible subnets of a given size in the address
		* @param {number} [subnetSize=128] - the subnet size
		* @returns {String}
		*/
		possibleSubnets(subnetSize = 128) {
			const subnetPowers = constants6.BITS - this.subnetMask - Math.abs(subnetSize - constants6.BITS);
			if (subnetPowers < 0) return "0";
			return addCommas((BigInt("2") ** BigInt(subnetPowers)).toString(10));
		}
		/**
		* Helper function getting start address.
		* @returns {bigint}
		*/
		_startAddress() {
			return BigInt(`0b${this.mask() + "0".repeat(constants6.BITS - this.subnetMask)}`);
		}
		/**
		* The first address in the range given by this address' subnet
		* Often referred to as the Network Address.
		* @returns {Address6}
		*/
		startAddress() {
			return Address6.fromBigInt(this._startAddress());
		}
		/**
		* The first host address in the range given by this address's subnet ie
		* the first address after the Network Address
		* @returns {Address6}
		*/
		startAddressExclusive() {
			const adjust = BigInt("1");
			return Address6.fromBigInt(this._startAddress() + adjust);
		}
		/**
		* Helper function getting end address.
		* @returns {bigint}
		*/
		_endAddress() {
			return BigInt(`0b${this.mask() + "1".repeat(constants6.BITS - this.subnetMask)}`);
		}
		/**
		* The last address in the range given by this address's subnet. IPv6 has
		* no broadcast address, so this is an ordinary assignable address (in a
		* 64-bit-interface-identifier subnet it falls inside the reserved
		* subnet-anycast block of [RFC 2526](https://datatracker.ietf.org/doc/html/rfc2526)).
		* @returns {Address6}
		*/
		endAddress() {
			return Address6.fromBigInt(this._endAddress());
		}
		/**
		* The address one before {@link endAddress}. This is the IPv6 counterpart
		* of the IPv4 method that skips the broadcast address; IPv6 has no broadcast,
		* so it drops exactly one address and does not model the 128 reserved
		* subnet-anycast identifiers of [RFC 2526](https://datatracker.ietf.org/doc/html/rfc2526).
		* @returns {Address6}
		*/
		endAddressExclusive() {
			const adjust = BigInt("1");
			return Address6.fromBigInt(this._endAddress() - adjust);
		}
		/**
		* Returns the address `n` addresses after this one (or before, when `n` is
		* negative), keeping this address's subnet mask. Throws `AddressError` when
		* the result would fall outside the IPv6 address space or `n` is not an
		* integer.
		* @param {number | bigint} n
		* @returns {Address6}
		* @example
		* new Address6('2001:db8::/64').offset(1).correctForm(); // '2001:db8::1'
		*/
		offset(n) {
			return Address6.fromBigInt(common.offsetBigInt(this.bigInt(), n, constants6.BITS, "IPv6")).withSubnetMask(this.subnetMask);
		}
		/**
		* Returns the network that follows this address's network: the address after
		* {@link endAddress}, with the same subnet mask. Throws `AddressError` when
		* this network is the last one in the address space.
		* @returns {Address6}
		* @example
		* new Address6('2001:db8::/64').nextNetwork().networkForm(); // '2001:db8:0:1::/64'
		*/
		nextNetwork() {
			return Address6.fromBigInt(common.offsetBigInt(this._endAddress(), 1, constants6.BITS, "IPv6")).withSubnetMask(this.subnetMask);
		}
		withSubnetMask(subnetMask) {
			return new Address6(`${this.correctForm()}/${subnetMask}`);
		}
		/**
		* The hex form of the subnet mask, e.g. `ffff:ffff:ffff:ffff::` for a
		* `/64`. Returns an `Address6`; call `.correctForm()` for the string.
		* @returns {Address6}
		*/
		subnetMaskAddress() {
			return Address6.fromBigInt(BigInt(`0b${"1".repeat(this.subnetMask)}${"0".repeat(constants6.BITS - this.subnetMask)}`));
		}
		/**
		* The Cisco-style wildcard mask, e.g. `::ffff:ffff:ffff:ffff` for a
		* `/64`. This is the bitwise inverse of `subnetMaskAddress()`. Returns
		* an `Address6`; call `.correctForm()` for the string.
		* @returns {Address6}
		*/
		wildcardMask() {
			return Address6.fromBigInt(BigInt(`0b${"0".repeat(this.subnetMask)}${"1".repeat(constants6.BITS - this.subnetMask)}`));
		}
		/**
		* The network address in CIDR string form, e.g. `2001:db8::/32` for
		* `2001:db8::1/32`. For an address with no explicit subnet the prefix
		* is `/128`, e.g. `networkForm()` on `2001:db8::1` returns
		* `2001:db8::1/128`.
		* @returns {string}
		*/
		networkForm() {
			return `${this.startAddress().correctForm()}/${this.subnetMask}`;
		}
		/**
		* Return the scope of the address. The 4-bit scope field
		* ([RFC 4291 §2.7](https://datatracker.ietf.org/doc/html/rfc4291#section-2.7))
		* is only defined for multicast addresses; for unicast addresses the scope
		* is derived from the address type per
		* [RFC 4007 §6](https://datatracker.ietf.org/doc/html/rfc4007#section-6).
		* @returns {String}
		*/
		getScope() {
			const type = this.getType();
			if (type === "Multicast" || type.startsWith("Multicast ")) return constants6.SCOPES[parseInt(this.getBits(12, 16).toString(10), 10)] || "Unknown";
			if (type === "Link-local unicast" || type === "Loopback") return "Link local";
			if (type === "Unspecified") return "Unknown";
			return "Global";
		}
		/**
		* Return the type of the address
		* @returns {String}
		*/
		getType() {
			for (let i = 0; i < TYPE_SUBNETS.length; i++) {
				const entry = TYPE_SUBNETS[i];
				if (this.isHostInSubnet(entry[0])) return entry[1];
			}
			return "Global unicast";
		}
		/**
		* Return the bits in the given range as a BigInt
		* @returns {bigint}
		*/
		getBits(start, end) {
			return BigInt(`0b${this.getBitsBase2(start, end)}`);
		}
		/**
		* Return the bits in the given range as a base-2 string
		* @returns {String}
		*/
		getBitsBase2(start, end) {
			return this.binaryZeroPad().slice(start, end);
		}
		/**
		* Return the bits in the given range as a base-16 string
		* @returns {String}
		*/
		getBitsBase16(start, end) {
			const length = end - start;
			if (length % 4 !== 0) throw new Error("Length of bits to retrieve must be divisible by four");
			return this.getBits(start, end).toString(16).padStart(length / 4, "0");
		}
		/**
		* Return the bits that are set past the subnet mask length
		* @returns {String}
		*/
		getBitsPastSubnet() {
			return this.getBitsBase2(this.subnetMask, constants6.BITS);
		}
		/**
		* Return the reversed ip6.arpa form of the address
		* @param {Object} options
		* @param {boolean} options.omitSuffix - omit the "ip6.arpa" suffix
		* @returns {String}
		*/
		reverseForm(options) {
			if (!options) options = {};
			const characters = Math.floor(this.subnetMask / 4);
			const reversed = this.canonicalForm().replace(/:/g, "").split("").slice(0, characters).reverse().join(".");
			if (characters > 0) {
				if (options.omitSuffix) return reversed;
				return `${reversed}.ip6.arpa.`;
			}
			if (options.omitSuffix) return "";
			return "ip6.arpa.";
		}
		/**
		* Returns the address in correct form, per
		* [RFC 5952](https://datatracker.ietf.org/doc/html/rfc5952): leading zeros
		* stripped, the longest run of zero groups collapsed to `::`, and hex digits
		* lowercased (e.g. `2001:db8::1`). This is the recommended form for display.
		*/
		correctForm() {
			let i;
			let groups = [];
			let zeroCounter = 0;
			const zeroes = [];
			for (i = 0; i < this.parsedAddress.length; i++) {
				const value = parseInt(this.parsedAddress[i], 16);
				if (value === 0) zeroCounter++;
				if (value !== 0 && zeroCounter > 0) {
					if (zeroCounter > 1) zeroes.push([i - zeroCounter, i - 1]);
					zeroCounter = 0;
				}
			}
			if (zeroCounter > 1) zeroes.push([this.parsedAddress.length - zeroCounter, this.parsedAddress.length - 1]);
			const zeroLengths = zeroes.map((n) => n[1] - n[0] + 1);
			if (zeroes.length > 0) {
				const index = zeroLengths.indexOf(Math.max(...zeroLengths));
				groups = compact(this.parsedAddress, zeroes[index]);
			} else groups = this.parsedAddress;
			for (i = 0; i < groups.length; i++) if (groups[i] !== "compact") groups[i] = parseInt(groups[i], 16).toString(16);
			let correct = groups.join(":");
			correct = correct.replace(/^compact$/, "::");
			correct = correct.replace(/(^compact)|(compact$)/, ":");
			correct = correct.replace(/compact/, "");
			return correct;
		}
		/**
		* Return a zero-padded base-2 string representation of the address
		* @returns {String}
		* @example
		* var address = new Address6('2001:4860:4001:803::1011');
		* address.binaryZeroPad();
		* // '0010000000000001010010000110000001000000000000010000100000000011
		* //  0000000000000000000000000000000000000000000000000001000000010001'
		*/
		binaryZeroPad() {
			if (this._binaryZeroPad === void 0) this._binaryZeroPad = this.bigInt().toString(2).padStart(constants6.BITS, "0");
			return this._binaryZeroPad;
		}
		/**
		* Parses a v4-in-v6 string (e.g. `::ffff:192.168.0.1`) by extracting the
		* trailing IPv4 address into `this.address4` / `this.parsedAddress4` and
		* returning the address with the v4 portion converted to two v6 groups.
		* Used internally by `parse()`.
		*/
		parse4in6(address) {
			if (address.indexOf(".") === -1) return address;
			const groups = address.split(":");
			const lastGroup = groups.slice(-1)[0];
			const v4Octets = lastGroup.split(".");
			if (v4Octets.length === constants4.GROUPS && v4Octets.every((octet) => /^\d{1,3}$/.test(octet))) {
				if (v4Octets.some((octet) => /^0\d/.test(octet))) {
					const highlighted = v4Octets.map(spanLeadingZeroes4).join(".");
					const prefix = groups.slice(0, -1).map(helpers.escapeHtml).join(":");
					const separator = groups.length > 1 ? ":" : "";
					throw new address_error_1.AddressError("IPv4 addresses can't have leading zeroes.", `${prefix}${separator}${highlighted}`);
				}
			}
			const address4 = lastGroup.match(constants4.RE_ADDRESS);
			if (address4) {
				this.parsedAddress4 = address4[0];
				const v4Suffix = this.subnetMask >= 96 ? `/${this.subnetMask - 96}` : "";
				this.address4 = new ipv4_1.Address4(`${this.parsedAddress4}${v4Suffix}`);
				this.v4 = true;
				groups[groups.length - 1] = this.address4.toGroup6();
				address = groups.join(":");
			}
			return address;
		}
		/**
		* Parses an IPv6 address string into its 8 hexadecimal groups (expanding
		* any `::` elision and any trailing v4-in-v6 portion) and stores the result
		* on `this.parsedAddress`. Called automatically by the constructor; you
		* typically don't need to call it directly. Throws `AddressError` if the
		* input is malformed.
		*/
		parse(address) {
			address = this.parse4in6(address);
			const badCharacters = address.match(constants6.RE_BAD_CHARACTERS);
			if (badCharacters) throw new address_error_1.AddressError(`Bad character${badCharacters.length > 1 ? "s" : ""} detected in address: ${badCharacters.join("")}`, address.replace(constants6.RE_BAD_CHARACTERS, "<span class=\"parse-error\">$1</span>"));
			const badAddress = address.match(constants6.RE_BAD_ADDRESS);
			if (badAddress) throw new address_error_1.AddressError(`Address failed regex: ${badAddress.join("")}`, address.replace(constants6.RE_BAD_ADDRESS, "<span class=\"parse-error\">$1</span>"));
			let groups = [];
			const halves = address.split("::");
			if (halves.length === 2) {
				let first = halves[0].split(":");
				let last = halves[1].split(":");
				if (first.length === 1 && first[0] === "") first = [];
				if (last.length === 1 && last[0] === "") last = [];
				const remaining = this.groups - (first.length + last.length);
				if (!remaining) throw new address_error_1.AddressError("Error parsing groups");
				this.elidedGroups = remaining;
				this.elisionBegin = first.length;
				this.elisionEnd = first.length + this.elidedGroups;
				groups = groups.concat(first);
				for (let i = 0; i < remaining; i++) groups.push("0");
				groups = groups.concat(last);
			} else if (halves.length === 1) {
				groups = address.split(":");
				this.elidedGroups = 0;
			} else throw new address_error_1.AddressError("Too many :: groups found");
			groups = groups.map((group) => parseInt(group, 16).toString(16));
			if (groups.length !== this.groups) throw new address_error_1.AddressError("Incorrect number of groups found");
			return groups;
		}
		/**
		* Returns the canonical (fully expanded) form of the address: all 8 groups,
		* each padded to 4 hex digits, with no `::` collapsing
		* (e.g. `2001:0db8:0000:0000:0000:0000:0000:0001`). Useful for sorting and
		* byte-exact comparison.
		*/
		canonicalForm() {
			return this.parsedAddress.map(paddedHex).join(":");
		}
		/**
		* Return the decimal form of the address
		* @returns {String}
		*/
		decimal() {
			return this.parsedAddress.map((n) => parseInt(n, 16).toString(10).padStart(5, "0")).join(":");
		}
		/**
		* Return the address as a BigInt
		* @returns {bigint}
		*/
		bigInt() {
			return BigInt(`0x${this.parsedAddress.map(paddedHex).join("")}`);
		}
		/**
		* Return the last two groups of this address as an IPv4 address string.
		* If this address carries a CIDR prefix that covers the trailing 32 bits
		* (i.e. `subnetMask >= 96`), the resulting `Address4` inherits the
		* corresponding v4 prefix (`subnetMask - 96`); otherwise it defaults to
		* `/32`.
		* @returns {Address4}
		* @example
		* var address = new Address6('2001:4860:4001::1825:bf11');
		* address.to4().correctForm(); // '24.37.191.17'
		*/
		to4() {
			const binary = this.binaryZeroPad().split("");
			const hex = BigInt(`0b${binary.slice(96, 128).join("")}`).toString(16).padStart(8, "0");
			if (this.subnetMask >= 96) {
				const v4Mask = this.subnetMask - 96;
				const groups = [];
				for (let i = 0; i < 8; i += 2) groups.push(parseInt(hex.slice(i, i + 2), 16));
				return new ipv4_1.Address4(`${groups.join(".")}/${v4Mask}`);
			}
			return ipv4_1.Address4.fromHex(hex);
		}
		/**
		* Return the v4-in-v6 form of the address
		* @returns {String}
		*/
		to4in6() {
			const address4 = this.to4();
			const correct = new Address6(this.parsedAddress.slice(0, 6).join(":"), 6).correctForm();
			let infix = "";
			if (!/:$/.test(correct)) infix = ":";
			return correct + infix + address4.correctForm();
		}
		/**
		* Decodes the Teredo tunneling fields embedded in this address. Returns the
		* Teredo prefix, server IPv4, client IPv4, raw flag bits, cone-NAT flag,
		* UDP port, and Microsoft-format flag breakdown (reserved, universal/local,
		* group/individual, nonce). Only meaningful for addresses in `2001::/32`.
		*/
		inspectTeredo() {
			const prefix = this.getBitsBase16(0, 32);
			const udpPort = (this.getBits(80, 96) ^ BigInt("0xffff")).toString();
			const server4 = ipv4_1.Address4.fromHex(this.getBitsBase16(32, 64));
			const bitsForClient4 = this.getBits(96, 128);
			const client4 = ipv4_1.Address4.fromHex((bitsForClient4 ^ BigInt("0xffffffff")).toString(16).padStart(8, "0"));
			const flagsBase2 = this.getBitsBase2(64, 80);
			const coneNat = (0, common_1.testBit)(flagsBase2, 15);
			const reserved = (0, common_1.testBit)(flagsBase2, 14);
			const groupIndividual = (0, common_1.testBit)(flagsBase2, 8);
			const universalLocal = (0, common_1.testBit)(flagsBase2, 9);
			const nonce = BigInt(`0b${flagsBase2.slice(2, 6) + flagsBase2.slice(8, 16)}`).toString(10);
			return {
				prefix: `${prefix.slice(0, 4)}:${prefix.slice(4, 8)}`,
				server4: server4.address,
				client4: client4.address,
				flags: flagsBase2,
				coneNat,
				microsoft: {
					reserved,
					universalLocal,
					groupIndividual,
					nonce
				},
				udpPort
			};
		}
		/**
		* Decodes the 6to4 tunneling fields embedded in this address. Returns the
		* 6to4 prefix and the embedded IPv4 gateway address. Only meaningful for
		* addresses in `2002::/16`.
		*/
		inspect6to4() {
			const prefix = this.getBitsBase16(0, 16);
			const gateway = ipv4_1.Address4.fromHex(this.getBitsBase16(16, 48));
			return {
				prefix: prefix.slice(0, 4),
				gateway: gateway.address
			};
		}
		/**
		* Return a v6 6to4 address from a v6 v4inv6 address
		* @returns {Address6}
		*/
		to6to4() {
			if (!this.is4()) return null;
			return new Address6([
				"2002",
				this.getBitsBase16(96, 112),
				this.getBitsBase16(112, 128),
				"",
				"/16"
			].join(":"));
		}
		/**
		* Embed an IPv4 address into a NAT64 IPv6 address using the encoding
		* defined by [RFC 6052](https://datatracker.ietf.org/doc/html/rfc6052).
		* The default prefix is the well-known prefix `64:ff9b::/96`. The prefix
		* length must be one of 32, 40, 48, 56, 64, or 96; for prefixes shorter
		* than /64 the IPv4 octets are split around the reserved bits 64–71.
		* @example
		* Address6.fromAddress4Nat64('192.0.2.33').correctForm(); // '64:ff9b::c000:221'
		* Address6.fromAddress4Nat64('192.0.2.33', '2001:db8::/32').correctForm(); // '2001:db8:c000:221::'
		*/
		static fromAddress4Nat64(address, prefix = "64:ff9b::/96") {
			const v4 = new ipv4_1.Address4(address);
			const prefix6 = new Address6(prefix);
			const pl = prefix6.subnetMask;
			if (pl !== 32 && pl !== 40 && pl !== 48 && pl !== 56 && pl !== 64 && pl !== 96) throw new address_error_1.AddressError("NAT64 prefix length must be 32, 40, 48, 56, 64, or 96");
			const prefixBits = prefix6.binaryZeroPad();
			const v4Bits = v4.binaryZeroPad();
			let bits;
			if (pl === 96) bits = prefixBits.slice(0, 96) + v4Bits;
			else {
				const beforeU = 64 - pl;
				bits = [
					prefixBits.slice(0, pl),
					v4Bits.slice(0, beforeU),
					"00000000",
					v4Bits.slice(beforeU),
					"0".repeat(56 - (32 - beforeU))
				].join("");
			}
			const hex = BigInt(`0b${bits}`).toString(16).padStart(32, "0");
			const groups = [];
			for (let i = 0; i < 8; i++) groups.push(hex.slice(i * 4, (i + 1) * 4));
			return new Address6(groups.join(":"));
		}
		/**
		* Extract the embedded IPv4 address from a NAT64 IPv6 address using the
		* encoding defined by [RFC 6052](https://datatracker.ietf.org/doc/html/rfc6052).
		* The default prefix is the well-known prefix `64:ff9b::/96`. Returns
		* `null` if this address is not contained within the given prefix.
		* @example
		* new Address6('64:ff9b::c000:221').toAddress4Nat64()!.correctForm(); // '192.0.2.33'
		*/
		toAddress4Nat64(prefix = "64:ff9b::/96") {
			const prefix6 = new Address6(prefix);
			const pl = prefix6.subnetMask;
			if (pl !== 32 && pl !== 40 && pl !== 48 && pl !== 56 && pl !== 64 && pl !== 96) throw new address_error_1.AddressError("NAT64 prefix length must be 32, 40, 48, 56, 64, or 96");
			if (!this.isHostInSubnet(prefix6)) return null;
			const bits = this.binaryZeroPad();
			let v4Bits;
			if (pl === 96) v4Bits = bits.slice(96, 128);
			else {
				const beforeU = 64 - pl;
				v4Bits = bits.slice(pl, pl + beforeU) + bits.slice(72, 72 + (32 - beforeU));
			}
			const octets = [];
			for (let i = 0; i < 4; i++) octets.push(parseInt(v4Bits.slice(i * 8, (i + 1) * 8), 2).toString());
			return new ipv4_1.Address4(octets.join("."));
		}
		/**
		* Return a byte array.
		*
		* To get a Node.js `Buffer`, wrap the result: `Buffer.from(address.toByteArray())`.
		* @returns {Array}
		*/
		toByteArray() {
			const value = this.bigInt().toString(16).padStart(constants6.BITS / 4, "0");
			const bytes = [];
			for (let i = 0, length = value.length; i < length; i += 2) bytes.push(parseInt(value.substring(i, i + 2), 16));
			return bytes;
		}
		/**
		* Return an unsigned byte array.
		*
		* To get a Node.js `Buffer`, wrap the result: `Buffer.from(address.toUnsignedByteArray())`.
		* @returns {Array}
		*/
		toUnsignedByteArray() {
			return this.toByteArray().map(unsignByte);
		}
		/**
		* Convert a byte array to an Address6 object.
		*
		* Accepts unsigned bytes (0 to 255) or signed bytes (-128 to 127, as an
		* `Int8Array` or a Java `byte[]` holds them), folding signed values to their
		* unsigned equivalent. Throws `AddressError` unless given exactly 16
		* integers from -128 to 255.
		*
		* To convert from a Node.js `Buffer`, spread it: `Address6.fromByteArray([...buf])`.
		* @returns {Address6}
		*/
		static fromByteArray(bytes) {
			common.assertByteArray(bytes, 16, "IPv6", -128);
			return this.fromUnsignedByteArray(bytes.map(unsignByte));
		}
		/**
		* Convert an unsigned byte array to an Address6 object.
		*
		* Throws `AddressError` unless given exactly 16 integers from 0 to 255.
		*
		* To convert from a Node.js `Buffer`, spread it: `Address6.fromUnsignedByteArray([...buf])`.
		* @returns {Address6}
		*/
		static fromUnsignedByteArray(bytes) {
			common.assertByteArray(bytes, 16, "IPv6", 0);
			const BYTE_MAX = BigInt("256");
			let result = BigInt("0");
			let multiplier = BigInt("1");
			for (let i = bytes.length - 1; i >= 0; i--) {
				result += multiplier * BigInt(bytes[i].toString(10));
				multiplier *= BYTE_MAX;
			}
			return Address6.fromBigInt(result);
		}
		/**
		* Returns true if the address is in the canonical form, false otherwise
		* @returns {boolean}
		*/
		isCanonical() {
			return this.addressMinusSuffix === this.canonicalForm();
		}
		/**
		* Returns true if the address is a link-local unicast address in `fe80::/10`
		* ([RFC 4291 §2.4](https://datatracker.ietf.org/doc/html/rfc4291#section-2.4))
		* or an IPv4-mapped / NAT64 address whose embedded IPv4 address is link-local
		* (`169.254.0.0/16`, e.g. `::ffff:169.254.169.254`), false otherwise.
		* @returns {boolean}
		*/
		isLinkLocal() {
			const embedded = this.embeddedIPv4();
			if (embedded) return embedded.isLinkLocal();
			return this.isHostInSubnet(LINK_LOCAL_SUBNET);
		}
		/**
		* Returns true if the address is a multicast address, false otherwise
		* @returns {boolean}
		*/
		isMulticast() {
			const embedded = this.embeddedIPv4();
			if (embedded) return embedded.isMulticast();
			const type = this.getType();
			return type === "Multicast" || type.startsWith("Multicast ");
		}
		/**
		* Returns true if the address was written in v4-in-v6 dotted-quad notation
		* (e.g. `::ffff:127.0.0.1`), false otherwise. This is a notation-level flag
		* and does not reflect whether the address bits lie in the IPv4-mapped
		* (`::ffff:0:0/96`) subnet — for that, see {@link isMapped4}.
		* @returns {boolean}
		*/
		is4() {
			return this.v4;
		}
		/**
		* Returns true if the address is an IPv4-mapped IPv6 address in
		* `::ffff:0:0/96` ([RFC 4291 §2.5.5.2](https://datatracker.ietf.org/doc/html/rfc4291#section-2.5.5.2)),
		* false otherwise. Unlike {@link is4}, this checks the underlying address
		* bits rather than the textual notation, so `::ffff:127.0.0.1` and
		* `::ffff:7f00:1` both return true.
		* @returns {boolean}
		*/
		isMapped4() {
			return this.isHostInSubnet(IPV4_MAPPED_SUBNET);
		}
		/**
		* If this address embeds a routable IPv4 address — i.e. it is IPv4-mapped
		* (`::ffff:0:0/96`) or sits in the NAT64 well-known prefix (`64:ff9b::/96`,
		* [RFC 6052](https://datatracker.ietf.org/doc/html/rfc6052)) — return that
		* embedded address as an {@link Address4}; otherwise return null.
		*
		* The special-property checks (`isLoopback`, `isLinkLocal`, `isMulticast`,
		* `isUnspecified`, `isPrivate`, `isCGNAT`, `isBroadcast`) call this first and
		* delegate to the embedded {@link Address4} when present, so a literal such as
		* `::ffff:127.0.0.1` is classified by what it actually reaches (loopback)
		* rather than by its IPv6 wrapper (which `getType()` reports as IPv4-mapped).
		* This matters wherever the checks back a trust-boundary decision (e.g. an
		* SSRF allow/deny filter): without normalization, `::ffff:10.0.0.1`,
		* `::ffff:169.254.169.254`, `64:ff9b::7f00:1`, etc. would all read as
		* non-internal.
		* @returns {Address4 | null}
		*/
		embeddedIPv4() {
			if (this.isMapped4() || this.isHostInSubnet(NAT64_WELL_KNOWN_SUBNET)) return this.to4();
			return null;
		}
		/**
		* Returns true if the address is a Teredo address, false otherwise
		* @returns {boolean}
		*/
		isTeredo() {
			return this.isHostInSubnet(TEREDO_SUBNET);
		}
		/**
		* Returns true if the address is a 6to4 address, false otherwise
		* @returns {boolean}
		*/
		is6to4() {
			return this.isHostInSubnet(SIX_TO_FOUR_SUBNET);
		}
		/**
		* Returns true if the address is a loopback address, false otherwise
		* @returns {boolean}
		*/
		isLoopback() {
			const embedded = this.embeddedIPv4();
			if (embedded) return embedded.isLoopback();
			return this.getType() === "Loopback";
		}
		/**
		* Returns true if the address is a Unique Local Address in `fc00::/7` ([RFC 4193](https://datatracker.ietf.org/doc/html/rfc4193)). ULAs are the IPv6 equivalent of IPv4 [RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918) private addresses.
		* @returns {boolean}
		*/
		isULA() {
			return this.isHostInSubnet(ULA_SUBNET);
		}
		/**
		* Returns true if the address is private, i.e. a Unique Local Address in
		* `fc00::/7` ([RFC 4193](https://datatracker.ietf.org/doc/html/rfc4193)), an
		* address in the NAT64 local-use range `64:ff9b:1::/48`
		* ([RFC 8215](https://datatracker.ietf.org/doc/html/rfc8215)), or an
		* IPv4-mapped / NAT64 well-known address whose embedded IPv4 address is in
		* one of the [RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918)
		* private ranges (e.g. `::ffff:10.0.0.1`). This is the IPv6 counterpart to
		* {@link Address4.isPrivate}; use it instead of {@link isULA} when you need to
		* catch mapped RFC 1918 addresses as well as native ULAs.
		*
		* The local-use NAT64 range is reported private as a whole rather than by
		* its embedded IPv4 address: an operator may carve a prefix of any RFC 6052
		* length out of `64:ff9b:1::/48`, so the same bits decode to different IPv4
		* addresses under different deployments and no single decoding is correct.
		* Use {@link toAddress4Nat64} with the deployment's prefix to decode one.
		* @returns {boolean}
		*/
		isPrivate() {
			const embedded = this.embeddedIPv4();
			if (embedded) return embedded.isPrivate();
			return this.isULA() || this.isHostInSubnet(NAT64_LOCAL_USE_SUBNET);
		}
		/**
		* Returns true if the address is an IPv4-mapped / NAT64 address whose embedded
		* IPv4 address is in the carrier-grade NAT range `100.64.0.0/10`
		* ([RFC 6598](https://datatracker.ietf.org/doc/html/rfc6598)), false
		* otherwise. There is no native IPv6 CGNAT range, so this only ever returns
		* true for an embedded IPv4 address (e.g. `::ffff:100.64.0.1`).
		* @returns {boolean}
		*/
		isCGNAT() {
			const embedded = this.embeddedIPv4();
			if (embedded) return embedded.isCGNAT();
			return false;
		}
		/**
		* Returns true if the address is an IPv4-mapped / NAT64 address whose embedded
		* IPv4 address is the limited broadcast address `255.255.255.255`
		* ([RFC 919](https://datatracker.ietf.org/doc/html/rfc919)), false otherwise.
		* There is no IPv6 broadcast, so this only ever returns true for an embedded
		* IPv4 address (e.g. `::ffff:255.255.255.255`).
		* @returns {boolean}
		*/
		isBroadcast() {
			const embedded = this.embeddedIPv4();
			if (embedded) return embedded.isBroadcast();
			return false;
		}
		/**
		* Returns true if the address is the unspecified address `::`.
		* @returns {boolean}
		*/
		isUnspecified() {
			const embedded = this.embeddedIPv4();
			if (embedded) return embedded.isUnspecified();
			return this.getType() === "Unspecified";
		}
		/**
		* Returns true if the address is in the documentation prefix `2001:db8::/32` ([RFC 3849](https://datatracker.ietf.org/doc/html/rfc3849)).
		* @returns {boolean}
		*/
		isDocumentation() {
			return DOCUMENTATION_SUBNETS.some((subnet) => this.isHostInSubnet(subnet));
		}
		/**
		* Returns true if the address is in the benchmarking range `2001:2::/48`
		* ([RFC 5180](https://datatracker.ietf.org/doc/html/rfc5180)) or is an
		* IPv4-mapped / NAT64 address whose embedded IPv4 address is in
		* `198.18.0.0/15`, false otherwise.
		* @returns {boolean}
		*/
		isBenchmarking() {
			const embedded = this.embeddedIPv4();
			if (embedded) return embedded.isBenchmarking();
			return this.isHostInSubnet(BENCHMARKING_SUBNET);
		}
		/**
		* Returns true if the address is globally reachable: inside the global
		* unicast allocation `2000::/3` (the only range the [IANA IPv6 Address Space
		* Registry](https://www.iana.org/assignments/ipv6-address-space/) assigns
		* for global unicast; everything else is reserved, ULA, link-local, or
		* multicast) and not in any block the [IANA IPv6 Special-Purpose Address Registry](https://www.iana.org/assignments/iana-ipv6-special-registry/)
		* marks as not globally reachable. An IPv4-mapped or NAT64 well-known
		* address answers for its embedded IPv4 address, so `::ffff:10.0.0.1` and
		* `64:ff9b::7f00:1` are not global. Teredo (`2001::/32`) and 6to4
		* (`2002::/16`) are not global either: the registry lists them as N/A and a
		* packet to one needs a relay.
		*
		* This covers everything the individual classifiers name and the blocks they
		* do not: the discard-only prefix `100::/64`, the IETF protocol assignments
		* in `2001::/23`, the deprecated site-local `fec0::/10` and IPv4-compatible
		* `::/96` ranges, and unallocated space such as `4000::/3`. It is the single
		* predicate to use where a request must not reach an internal or
		* special-purpose destination; see SECURITY.md.
		* @returns {boolean}
		*/
		isGlobal() {
			const embedded = this.embeddedIPv4();
			if (embedded) return embedded.isGlobal();
			return this.isHostInSubnet(GLOBAL_UNICAST_SUBNET) && common.isGloballyReachable.call(this, SPECIAL_PURPOSE_V6);
		}
		/**
		* Returns the address as an HTTP URL with the host bracketed, e.g.
		* `http://[2001:db8::1]/`. If `optionalPort` is provided it is appended,
		* e.g. `http://[2001:db8::1]:8080/`.
		*/
		href(optionalPort) {
			if (optionalPort === void 0) optionalPort = "";
			else optionalPort = `:${optionalPort}`;
			return `http://[${this.correctForm()}]${optionalPort}/`;
		}
		/**
		* Returns an HTML `<a>` element whose `href` encodes the address in a URL
		* hash fragment (default prefix `/#address=`). Useful for linking between
		* pages of an address-inspector UI.
		* @param options.className - CSS class for the rendered `<a>` element
		* @param options.prefix - hash prefix prepended to the address (default `/#address=`)
		* @param options.v4 - when true, render the address in v4-in-v6 form
		*/
		link(options) {
			if (!options) options = {};
			if (options.className === void 0) options.className = "";
			if (options.prefix === void 0) options.prefix = "/#address=";
			if (options.v4 === void 0) options.v4 = false;
			let formFunction = this.correctForm;
			if (options.v4) formFunction = this.to4in6;
			const form = formFunction.call(this);
			const safeHref = helpers.escapeHtml(`${options.prefix}${form}`);
			const safeForm = helpers.escapeHtml(form);
			if (options.className) return `<a href="${safeHref}" class="${helpers.escapeHtml(options.className)}">${safeForm}</a>`;
			return `<a href="${safeHref}">${safeForm}</a>`;
		}
		/**
		* Groups an address.
		*
		* Returns an HTML fragment: each group is wrapped in a `<span>` carrying
		* the group classes an address-inspector UI hovers on. The address content
		* is HTML-escaped; anything you concatenate around it is your
		* responsibility.
		* @returns {String}
		*/
		group() {
			if (this.elidedGroups === 0) return helpers.simpleGroup(this.addressMinusSuffix).join(":");
			assert(typeof this.elidedGroups === "number");
			assert(typeof this.elisionBegin === "number");
			const output = [];
			const [left, right] = this.addressMinusSuffix.split("::");
			if (left.length) output.push(...helpers.simpleGroup(left));
			else output.push("");
			const classes = ["hover-group"];
			for (let i = this.elisionBegin; i < this.elisionBegin + this.elidedGroups; i++) classes.push(`group-${i}`);
			output.push(`<span class="${classes.join(" ")}"></span>`);
			if (right.length) output.push(...helpers.simpleGroup(right, this.elisionEnd));
			else output.push("");
			if (this.is4()) {
				assert(this.address4 instanceof ipv4_1.Address4);
				output.pop();
				output.push(this.address4.groupForV6());
			}
			return output.join(":");
		}
		/**
		* Generate a regular expression string that can be used to find or validate
		* all variations of this address
		* @param {boolean} substringSearch
		* @returns {string}
		*/
		regularExpressionString(substringSearch = false) {
			let output = [];
			const address6 = new Address6(this.correctForm());
			if (address6.elidedGroups === 0) output.push((0, regular_expressions_1.simpleRegularExpression)(address6.parsedAddress));
			else if (address6.elidedGroups === constants6.GROUPS) output.push((0, regular_expressions_1.possibleElisions)(constants6.GROUPS));
			else {
				const halves = address6.address.split("::");
				if (halves[0].length) output.push((0, regular_expressions_1.simpleRegularExpression)(halves[0].split(":")));
				assert(typeof address6.elidedGroups === "number");
				output.push((0, regular_expressions_1.possibleElisions)(address6.elidedGroups, halves[0].length !== 0, halves[1].length !== 0));
				if (halves[1].length) output.push((0, regular_expressions_1.simpleRegularExpression)(halves[1].split(":")));
				output = [output.join(":")];
			}
			if (!substringSearch) output = [
				"(?=^|",
				regular_expressions_1.ADDRESS_BOUNDARY,
				"|[^\\w\\:])(",
				...output,
				")(?=[^\\w\\:]|",
				regular_expressions_1.ADDRESS_BOUNDARY,
				"|$)"
			];
			return output.join("");
		}
		/**
		* Generate a regular expression that can be used to find or validate all
		* variations of this address.
		* @param {boolean} substringSearch
		* @returns {RegExp}
		*/
		regularExpression(substringSearch = false) {
			return new RegExp(this.regularExpressionString(substringSearch), "i");
		}
	};
	exports.Address6 = Address6;
	var TYPE_SUBNETS = Object.keys(constants6.TYPES).map((subnet) => [new Address6(subnet), constants6.TYPES[subnet]]);
	var TEREDO_SUBNET = new Address6("2001::/32");
	var SIX_TO_FOUR_SUBNET = new Address6("2002::/16");
	var ULA_SUBNET = new Address6("fc00::/7");
	var LINK_LOCAL_SUBNET = new Address6("fe80::/10");
	var DOCUMENTATION_SUBNETS = [new Address6("2001:db8::/32"), new Address6("3fff::/20")];
	var BENCHMARKING_SUBNET = new Address6("2001:2::/48");
	var GLOBAL_UNICAST_SUBNET = new Address6("2000::/3");
	var SPECIAL_PURPOSE_V6 = constants6.SPECIAL_PURPOSE.map(([cidr, , reachable]) => ({
		subnet: new Address6(cidr),
		reachable
	}));
	var IPV4_MAPPED_SUBNET = new Address6("::ffff:0:0/96");
	var NAT64_WELL_KNOWN_SUBNET = new Address6("64:ff9b::/96");
	var NAT64_LOCAL_USE_SUBNET = new Address6("64:ff9b:1::/48");
}));
//#endregion
//#region node_modules/.pnpm/ip-address@10.7.5/node_modules/ip-address/dist/ip-address.js
var require_ip_address = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.v6 = exports.AddressError = exports.Address6 = exports.Address4 = void 0;
	var ipv4_1 = require_ipv4();
	Object.defineProperty(exports, "Address4", {
		enumerable: true,
		get: function() {
			return ipv4_1.Address4;
		}
	});
	var ipv6_1 = require_ipv6();
	Object.defineProperty(exports, "Address6", {
		enumerable: true,
		get: function() {
			return ipv6_1.Address6;
		}
	});
	var address_error_1 = require_address_error();
	Object.defineProperty(exports, "AddressError", {
		enumerable: true,
		get: function() {
			return address_error_1.AddressError;
		}
	});
	exports.v6 = { helpers: __importStar(require_helpers$2()) };
}));
//#endregion
//#region node_modules/.pnpm/socks@2.8.10/node_modules/socks/build/common/helpers.js
var require_helpers$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.validateSocksClientOptions = validateSocksClientOptions;
	exports.validateSocksClientChainOptions = validateSocksClientChainOptions;
	exports.ipv4ToInt32 = ipv4ToInt32;
	exports.int32ToIpv4 = int32ToIpv4;
	exports.ipToBuffer = ipToBuffer;
	var util_1 = require_util();
	var constants_1 = require_constants$2();
	var stream = __require("stream");
	var ip_address_1 = require_ip_address();
	var net$3 = __require("net");
	/**
	* Validates the provided SocksClientOptions
	* @param options { SocksClientOptions }
	* @param acceptedCommands { string[] } A list of accepted SocksProxy commands.
	*/
	function validateSocksClientOptions(options, acceptedCommands = [
		"connect",
		"bind",
		"associate"
	]) {
		if (!constants_1.SocksCommand[options.command]) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksCommand, options);
		if (acceptedCommands.indexOf(options.command) === -1) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksCommandForOperation, options);
		if (!isValidSocksRemoteHost(options.destination)) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsDestination, options);
		if (!isValidSocksProxy(options.proxy)) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsProxy, options);
		validateCustomProxyAuth(options.proxy, options);
		if (options.timeout && !isValidTimeoutValue(options.timeout)) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsTimeout, options);
		if (options.existing_socket && !(options.existing_socket instanceof stream.Duplex)) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsExistingSocket, options);
	}
	/**
	* Validates the SocksClientChainOptions
	* @param options { SocksClientChainOptions }
	*/
	function validateSocksClientChainOptions(options) {
		if (options.command !== "connect") throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksCommandChain, options);
		if (!isValidSocksRemoteHost(options.destination)) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsDestination, options);
		if (!(options.proxies && Array.isArray(options.proxies) && options.proxies.length >= 2)) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsProxiesLength, options);
		options.proxies.forEach((proxy) => {
			if (!isValidSocksProxy(proxy)) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsProxy, options);
			validateCustomProxyAuth(proxy, options);
		});
		if (options.timeout && !isValidTimeoutValue(options.timeout)) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsTimeout, options);
	}
	function validateCustomProxyAuth(proxy, options) {
		if (proxy.custom_auth_method !== void 0) {
			if (proxy.custom_auth_method < constants_1.SOCKS5_CUSTOM_AUTH_START || proxy.custom_auth_method > constants_1.SOCKS5_CUSTOM_AUTH_END) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthRange, options);
			if (proxy.custom_auth_request_handler === void 0 || typeof proxy.custom_auth_request_handler !== "function") throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
			if (proxy.custom_auth_response_size === void 0) throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
			if (proxy.custom_auth_response_handler === void 0 || typeof proxy.custom_auth_response_handler !== "function") throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
		}
	}
	/**
	* Validates a SocksRemoteHost
	* @param remoteHost { SocksRemoteHost }
	*/
	function isValidSocksRemoteHost(remoteHost) {
		return remoteHost && typeof remoteHost.host === "string" && Buffer.byteLength(remoteHost.host) < 256 && typeof remoteHost.port === "number" && remoteHost.port >= 0 && remoteHost.port <= 65535;
	}
	/**
	* Validates a SocksProxy
	* @param proxy { SocksProxy }
	*/
	function isValidSocksProxy(proxy) {
		return proxy && (typeof proxy.host === "string" || typeof proxy.ipaddress === "string") && typeof proxy.port === "number" && proxy.port >= 0 && proxy.port <= 65535 && (proxy.type === 4 || proxy.type === 5);
	}
	/**
	* Validates a timeout value.
	* @param value { Number }
	*/
	function isValidTimeoutValue(value) {
		return typeof value === "number" && value > 0;
	}
	function ipv4ToInt32(ip) {
		return new ip_address_1.Address4(ip).toArray().reduce((acc, part) => (acc << 8) + part, 0) >>> 0;
	}
	function int32ToIpv4(int32) {
		return [
			int32 >>> 24 & 255,
			int32 >>> 16 & 255,
			int32 >>> 8 & 255,
			int32 & 255
		].join(".");
	}
	function ipToBuffer(ip) {
		if (net$3.isIPv4(ip)) {
			const address = new ip_address_1.Address4(ip);
			return Buffer.from(address.toArray());
		} else if (net$3.isIPv6(ip)) {
			const address = new ip_address_1.Address6(ip);
			return Buffer.from(address.canonicalForm().split(":").map((segment) => segment.padStart(4, "0")).join(""), "hex");
		} else throw new Error("Invalid IP address format");
	}
}));
//#endregion
//#region node_modules/.pnpm/socks@2.8.10/node_modules/socks/build/common/receivebuffer.js
var require_receivebuffer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ReceiveBuffer = void 0;
	var ReceiveBuffer = class {
		constructor(size = 4096) {
			this.buffer = Buffer.allocUnsafe(size);
			this.offset = 0;
			this.originalSize = size;
		}
		get length() {
			return this.offset;
		}
		append(data) {
			if (!Buffer.isBuffer(data)) throw new Error("Attempted to append a non-buffer instance to ReceiveBuffer.");
			if (this.offset + data.length >= this.buffer.length) {
				const tmp = this.buffer;
				this.buffer = Buffer.allocUnsafe(Math.max(this.buffer.length + this.originalSize, this.buffer.length + data.length));
				tmp.copy(this.buffer);
			}
			data.copy(this.buffer, this.offset);
			return this.offset += data.length;
		}
		peek(length) {
			if (length > this.offset) throw new Error("Attempted to read beyond the bounds of the managed internal data.");
			return this.buffer.slice(0, length);
		}
		get(length) {
			if (length > this.offset) throw new Error("Attempted to read beyond the bounds of the managed internal data.");
			const value = Buffer.allocUnsafe(length);
			this.buffer.slice(0, length).copy(value);
			this.buffer.copyWithin(0, length, length + this.offset - length);
			this.offset -= length;
			return value;
		}
	};
	exports.ReceiveBuffer = ReceiveBuffer;
}));
//#endregion
//#region node_modules/.pnpm/socks@2.8.10/node_modules/socks/build/client/socksclient.js
var require_socksclient = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SocksClientError = exports.SocksClient = void 0;
	var events_1 = __require("events");
	var net$2 = __require("net");
	var smart_buffer_1 = require_smartbuffer();
	var constants_1 = require_constants$2();
	var helpers_1 = require_helpers$1();
	var receivebuffer_1 = require_receivebuffer();
	var util_1 = require_util();
	Object.defineProperty(exports, "SocksClientError", {
		enumerable: true,
		get: function() {
			return util_1.SocksClientError;
		}
	});
	var ip_address_1 = require_ip_address();
	exports.SocksClient = class SocksClient extends events_1.EventEmitter {
		constructor(options) {
			super();
			this.options = Object.assign({}, options);
			(0, helpers_1.validateSocksClientOptions)(options);
			this.setState(constants_1.SocksClientState.Created);
		}
		/**
		* Creates a new SOCKS connection.
		*
		* Note: Supports callbacks and promises. Only supports the connect command.
		* @param options { SocksClientOptions } Options.
		* @param callback { Function } An optional callback function.
		* @returns { Promise }
		*/
		static createConnection(options, callback) {
			return new Promise((resolve, reject) => {
				try {
					(0, helpers_1.validateSocksClientOptions)(options, ["connect"]);
				} catch (err) {
					if (typeof callback === "function") {
						callback(err);
						return resolve(err);
					} else return reject(err);
				}
				const client = new SocksClient(options);
				client.connect(options.existing_socket);
				client.once("established", (info) => {
					client.removeAllListeners();
					if (typeof callback === "function") {
						callback(null, info);
						resolve(info);
					} else resolve(info);
				});
				client.once("error", (err) => {
					client.removeAllListeners();
					if (typeof callback === "function") {
						callback(err);
						resolve(err);
					} else reject(err);
				});
			});
		}
		/**
		* Creates a new SOCKS connection chain to a destination host through 2 or more SOCKS proxies.
		*
		* Note: Supports callbacks and promises. Only supports the connect method.
		* Note: Implemented via createConnection() factory function.
		* @param options { SocksClientChainOptions } Options
		* @param callback { Function } An optional callback function.
		* @returns { Promise }
		*/
		static createConnectionChain(options, callback) {
			return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
				try {
					(0, helpers_1.validateSocksClientChainOptions)(options);
				} catch (err) {
					if (typeof callback === "function") {
						callback(err);
						return resolve(err);
					} else return reject(err);
				}
				if (options.randomizeChain) (0, util_1.shuffleArray)(options.proxies);
				try {
					let sock;
					for (let i = 0; i < options.proxies.length; i++) {
						const nextProxy = options.proxies[i];
						const nextDestination = i === options.proxies.length - 1 ? options.destination : {
							host: options.proxies[i + 1].host || options.proxies[i + 1].ipaddress,
							port: options.proxies[i + 1].port
						};
						const result = yield SocksClient.createConnection({
							command: "connect",
							proxy: nextProxy,
							destination: nextDestination,
							existing_socket: sock
						});
						sock = sock || result.socket;
					}
					if (typeof callback === "function") {
						callback(null, { socket: sock });
						resolve({ socket: sock });
					} else resolve({ socket: sock });
				} catch (err) {
					if (typeof callback === "function") {
						callback(err);
						resolve(err);
					} else reject(err);
				}
			}));
		}
		/**
		* Creates a SOCKS UDP Frame.
		* @param options
		*/
		static createUDPFrame(options) {
			const buff = new smart_buffer_1.SmartBuffer();
			buff.writeUInt16BE(0);
			buff.writeUInt8(options.frameNumber || 0);
			if (net$2.isIPv4(options.remoteHost.host)) {
				buff.writeUInt8(constants_1.Socks5HostType.IPv4);
				buff.writeUInt32BE((0, helpers_1.ipv4ToInt32)(options.remoteHost.host));
			} else if (net$2.isIPv6(options.remoteHost.host)) {
				buff.writeUInt8(constants_1.Socks5HostType.IPv6);
				buff.writeBuffer((0, helpers_1.ipToBuffer)(options.remoteHost.host));
			} else {
				buff.writeUInt8(constants_1.Socks5HostType.Hostname);
				buff.writeUInt8(Buffer.byteLength(options.remoteHost.host));
				buff.writeString(options.remoteHost.host);
			}
			buff.writeUInt16BE(options.remoteHost.port);
			buff.writeBuffer(options.data);
			return buff.toBuffer();
		}
		/**
		* Parses a SOCKS UDP frame.
		* @param data
		*/
		static parseUDPFrame(data) {
			const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
			buff.readOffset = 2;
			const frameNumber = buff.readUInt8();
			const hostType = buff.readUInt8();
			let remoteHost;
			if (hostType === constants_1.Socks5HostType.IPv4) remoteHost = (0, helpers_1.int32ToIpv4)(buff.readUInt32BE());
			else if (hostType === constants_1.Socks5HostType.IPv6) remoteHost = ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm();
			else remoteHost = buff.readString(buff.readUInt8());
			const remotePort = buff.readUInt16BE();
			return {
				frameNumber,
				remoteHost: {
					host: remoteHost,
					port: remotePort
				},
				data: buff.readBuffer()
			};
		}
		/**
		* Internal state setter. If the SocksClient is in an error state, it cannot be changed to a non error state.
		*/
		setState(newState) {
			if (this.state !== constants_1.SocksClientState.Error) this.state = newState;
		}
		/**
		* Starts the connection establishment to the proxy and destination.
		* @param existingSocket Connected socket to use instead of creating a new one (internal use).
		*/
		connect(existingSocket) {
			this.onDataReceived = (data) => this.onDataReceivedHandler(data);
			this.onClose = () => this.onCloseHandler();
			this.onError = (err) => this.onErrorHandler(err);
			this.onConnect = () => this.onConnectHandler();
			const timer = setTimeout(() => this.onEstablishedTimeout(), this.options.timeout || constants_1.DEFAULT_TIMEOUT);
			if (timer.unref && typeof timer.unref === "function") timer.unref();
			if (existingSocket) this.socket = existingSocket;
			else this.socket = new net$2.Socket();
			this.socket.once("close", this.onClose);
			this.socket.once("error", this.onError);
			this.socket.once("connect", this.onConnect);
			this.socket.on("data", this.onDataReceived);
			this.setState(constants_1.SocksClientState.Connecting);
			this.receiveBuffer = new receivebuffer_1.ReceiveBuffer();
			if (existingSocket) this.socket.emit("connect");
			else {
				this.socket.connect(this.getSocketOptions());
				if (this.options.set_tcp_nodelay !== void 0 && this.options.set_tcp_nodelay !== null) this.socket.setNoDelay(!!this.options.set_tcp_nodelay);
			}
			this.prependOnceListener("established", (info) => {
				setImmediate(() => {
					if (this.receiveBuffer.length > 0) {
						const excessData = this.receiveBuffer.get(this.receiveBuffer.length);
						info.socket.emit("data", excessData);
					}
					info.socket.resume();
				});
			});
		}
		getSocketOptions() {
			return Object.assign(Object.assign({}, this.options.socket_options), {
				host: this.options.proxy.host || this.options.proxy.ipaddress,
				port: this.options.proxy.port
			});
		}
		/**
		* Handles internal Socks timeout callback.
		* Note: If the Socks client is not BoundWaitingForConnection or Established, the connection will be closed.
		*/
		onEstablishedTimeout() {
			if (this.state !== constants_1.SocksClientState.Established && this.state !== constants_1.SocksClientState.BoundWaitingForConnection) this.closeSocket(constants_1.ERRORS.ProxyConnectionTimedOut);
		}
		/**
		* Handles Socket connect event.
		*/
		onConnectHandler() {
			this.setState(constants_1.SocksClientState.Connected);
			if (this.options.proxy.type === 4) this.sendSocks4InitialHandshake();
			else this.sendSocks5InitialHandshake();
			this.setState(constants_1.SocksClientState.SentInitialHandshake);
		}
		/**
		* Handles Socket data event.
		* @param data
		*/
		onDataReceivedHandler(data) {
			this.receiveBuffer.append(data);
			this.processData();
		}
		/**
		* Handles processing of the data we have received.
		*/
		processData() {
			while (this.state !== constants_1.SocksClientState.Established && this.state !== constants_1.SocksClientState.Error && this.receiveBuffer.length >= this.nextRequiredPacketBufferSize) if (this.state === constants_1.SocksClientState.SentInitialHandshake) if (this.options.proxy.type === 4) this.handleSocks4FinalHandshakeResponse();
			else this.handleInitialSocks5HandshakeResponse();
			else if (this.state === constants_1.SocksClientState.SentAuthentication) this.handleInitialSocks5AuthenticationHandshakeResponse();
			else if (this.state === constants_1.SocksClientState.SentFinalHandshake) this.handleSocks5FinalHandshakeResponse();
			else if (this.state === constants_1.SocksClientState.BoundWaitingForConnection) if (this.options.proxy.type === 4) this.handleSocks4IncomingConnectionResponse();
			else this.handleSocks5IncomingConnectionResponse();
			else {
				this.closeSocket(constants_1.ERRORS.InternalError);
				break;
			}
		}
		/**
		* Handles Socket close event.
		* @param had_error
		*/
		onCloseHandler() {
			this.closeSocket(constants_1.ERRORS.SocketClosed);
		}
		/**
		* Handles Socket error event.
		* @param err
		*/
		onErrorHandler(err) {
			this.closeSocket(err.message);
		}
		/**
		* Removes internal event listeners on the underlying Socket.
		*/
		removeInternalSocketHandlers() {
			this.socket.pause();
			this.socket.removeListener("data", this.onDataReceived);
			this.socket.removeListener("close", this.onClose);
			this.socket.removeListener("error", this.onError);
			this.socket.removeListener("connect", this.onConnect);
		}
		/**
		* Closes and destroys the underlying Socket. Emits an error event.
		* @param err { String } An error string to include in error event.
		*/
		closeSocket(err) {
			if (this.state !== constants_1.SocksClientState.Error) {
				this.setState(constants_1.SocksClientState.Error);
				this.socket.destroy();
				this.removeInternalSocketHandlers();
				this.emit("error", new util_1.SocksClientError(err, this.options));
			}
		}
		/**
		* Sends initial Socks v4 handshake request.
		*/
		sendSocks4InitialHandshake() {
			const userId = this.options.proxy.userId || "";
			const buff = new smart_buffer_1.SmartBuffer();
			buff.writeUInt8(4);
			buff.writeUInt8(constants_1.SocksCommand[this.options.command]);
			buff.writeUInt16BE(this.options.destination.port);
			if (net$2.isIPv4(this.options.destination.host)) {
				buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
				buff.writeStringNT(userId);
			} else {
				buff.writeUInt8(0);
				buff.writeUInt8(0);
				buff.writeUInt8(0);
				buff.writeUInt8(1);
				buff.writeStringNT(userId);
				buff.writeStringNT(this.options.destination.host);
			}
			this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks4Response;
			this.socket.write(buff.toBuffer());
		}
		/**
		* Handles Socks v4 handshake response.
		* @param data
		*/
		handleSocks4FinalHandshakeResponse() {
			const data = this.receiveBuffer.get(8);
			if (data[1] !== constants_1.Socks4Response.Granted) this.closeSocket(`${constants_1.ERRORS.Socks4ProxyRejectedConnection} - (${constants_1.Socks4Response[data[1]]})`);
			else if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.bind) {
				const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
				buff.readOffset = 2;
				const remoteHost = {
					port: buff.readUInt16BE(),
					host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE())
				};
				if (remoteHost.host === "0.0.0.0") remoteHost.host = this.options.proxy.ipaddress;
				this.setState(constants_1.SocksClientState.BoundWaitingForConnection);
				this.emit("bound", {
					remoteHost,
					socket: this.socket
				});
			} else {
				this.setState(constants_1.SocksClientState.Established);
				this.removeInternalSocketHandlers();
				this.emit("established", { socket: this.socket });
			}
		}
		/**
		* Handles Socks v4 incoming connection request (BIND)
		* @param data
		*/
		handleSocks4IncomingConnectionResponse() {
			const data = this.receiveBuffer.get(8);
			if (data[1] !== constants_1.Socks4Response.Granted) this.closeSocket(`${constants_1.ERRORS.Socks4ProxyRejectedIncomingBoundConnection} - (${constants_1.Socks4Response[data[1]]})`);
			else {
				const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
				buff.readOffset = 2;
				const remoteHost = {
					port: buff.readUInt16BE(),
					host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE())
				};
				this.setState(constants_1.SocksClientState.Established);
				this.removeInternalSocketHandlers();
				this.emit("established", {
					remoteHost,
					socket: this.socket
				});
			}
		}
		/**
		* Sends initial Socks v5 handshake request.
		*/
		sendSocks5InitialHandshake() {
			const buff = new smart_buffer_1.SmartBuffer();
			const supportedAuthMethods = [constants_1.Socks5Auth.NoAuth];
			if (this.options.proxy.userId || this.options.proxy.password) supportedAuthMethods.push(constants_1.Socks5Auth.UserPass);
			if (this.options.proxy.custom_auth_method !== void 0) supportedAuthMethods.push(this.options.proxy.custom_auth_method);
			buff.writeUInt8(5);
			buff.writeUInt8(supportedAuthMethods.length);
			for (const authMethod of supportedAuthMethods) buff.writeUInt8(authMethod);
			this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5InitialHandshakeResponse;
			this.socket.write(buff.toBuffer());
			this.setState(constants_1.SocksClientState.SentInitialHandshake);
		}
		/**
		* Handles initial Socks v5 handshake response.
		* @param data
		*/
		handleInitialSocks5HandshakeResponse() {
			const data = this.receiveBuffer.get(2);
			if (data[0] !== 5) this.closeSocket(constants_1.ERRORS.InvalidSocks5IntiailHandshakeSocksVersion);
			else if (data[1] === constants_1.SOCKS5_NO_ACCEPTABLE_AUTH) this.closeSocket(constants_1.ERRORS.InvalidSocks5InitialHandshakeNoAcceptedAuthType);
			else if (data[1] === constants_1.Socks5Auth.NoAuth) {
				this.socks5ChosenAuthType = constants_1.Socks5Auth.NoAuth;
				this.sendSocks5CommandRequest();
			} else if (data[1] === constants_1.Socks5Auth.UserPass) {
				this.socks5ChosenAuthType = constants_1.Socks5Auth.UserPass;
				this.sendSocks5UserPassAuthentication();
			} else if (data[1] === this.options.proxy.custom_auth_method) {
				this.socks5ChosenAuthType = this.options.proxy.custom_auth_method;
				this.sendSocks5CustomAuthentication();
			} else this.closeSocket(constants_1.ERRORS.InvalidSocks5InitialHandshakeUnknownAuthType);
		}
		/**
		* Sends Socks v5 user & password auth handshake.
		*
		* Note: No auth and user/pass are currently supported.
		*/
		sendSocks5UserPassAuthentication() {
			const userId = this.options.proxy.userId || "";
			const password = this.options.proxy.password || "";
			const buff = new smart_buffer_1.SmartBuffer();
			buff.writeUInt8(1);
			buff.writeUInt8(Buffer.byteLength(userId));
			buff.writeString(userId);
			buff.writeUInt8(Buffer.byteLength(password));
			buff.writeString(password);
			this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5UserPassAuthenticationResponse;
			this.socket.write(buff.toBuffer());
			this.setState(constants_1.SocksClientState.SentAuthentication);
		}
		sendSocks5CustomAuthentication() {
			return __awaiter(this, void 0, void 0, function* () {
				this.nextRequiredPacketBufferSize = this.options.proxy.custom_auth_response_size;
				this.socket.write(yield this.options.proxy.custom_auth_request_handler());
				this.setState(constants_1.SocksClientState.SentAuthentication);
			});
		}
		handleSocks5CustomAuthHandshakeResponse(data) {
			return __awaiter(this, void 0, void 0, function* () {
				return yield this.options.proxy.custom_auth_response_handler(data);
			});
		}
		handleSocks5AuthenticationNoAuthHandshakeResponse(data) {
			return __awaiter(this, void 0, void 0, function* () {
				return data[1] === 0;
			});
		}
		handleSocks5AuthenticationUserPassHandshakeResponse(data) {
			return __awaiter(this, void 0, void 0, function* () {
				return data[1] === 0;
			});
		}
		/**
		* Handles Socks v5 auth handshake response.
		* @param data
		*/
		handleInitialSocks5AuthenticationHandshakeResponse() {
			return __awaiter(this, void 0, void 0, function* () {
				this.setState(constants_1.SocksClientState.ReceivedAuthenticationResponse);
				let authResult = false;
				if (this.socks5ChosenAuthType === constants_1.Socks5Auth.NoAuth) authResult = yield this.handleSocks5AuthenticationNoAuthHandshakeResponse(this.receiveBuffer.get(2));
				else if (this.socks5ChosenAuthType === constants_1.Socks5Auth.UserPass) authResult = yield this.handleSocks5AuthenticationUserPassHandshakeResponse(this.receiveBuffer.get(2));
				else if (this.socks5ChosenAuthType === this.options.proxy.custom_auth_method) authResult = yield this.handleSocks5CustomAuthHandshakeResponse(this.receiveBuffer.get(this.options.proxy.custom_auth_response_size));
				if (!authResult) this.closeSocket(constants_1.ERRORS.Socks5AuthenticationFailed);
				else this.sendSocks5CommandRequest();
			});
		}
		/**
		* Sends Socks v5 final handshake request.
		*/
		sendSocks5CommandRequest() {
			const buff = new smart_buffer_1.SmartBuffer();
			buff.writeUInt8(5);
			buff.writeUInt8(constants_1.SocksCommand[this.options.command]);
			buff.writeUInt8(0);
			if (net$2.isIPv4(this.options.destination.host)) {
				buff.writeUInt8(constants_1.Socks5HostType.IPv4);
				buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
			} else if (net$2.isIPv6(this.options.destination.host)) {
				buff.writeUInt8(constants_1.Socks5HostType.IPv6);
				buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
			} else {
				buff.writeUInt8(constants_1.Socks5HostType.Hostname);
				buff.writeUInt8(this.options.destination.host.length);
				buff.writeString(this.options.destination.host);
			}
			buff.writeUInt16BE(this.options.destination.port);
			this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader;
			this.socket.write(buff.toBuffer());
			this.setState(constants_1.SocksClientState.SentFinalHandshake);
		}
		/**
		* Handles Socks v5 final handshake response.
		* @param data
		*/
		handleSocks5FinalHandshakeResponse() {
			const header = this.receiveBuffer.peek(5);
			if (header[0] !== 5 || header[1] !== constants_1.Socks5Response.Granted) this.closeSocket(`${constants_1.ERRORS.InvalidSocks5FinalHandshakeRejected} - ${constants_1.Socks5Response[header[1]]}`);
			else {
				const addressType = header[3];
				let remoteHost;
				let buff;
				if (addressType === constants_1.Socks5HostType.IPv4) {
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
					remoteHost = {
						host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE()),
						port: buff.readUInt16BE()
					};
					if (remoteHost.host === "0.0.0.0") remoteHost.host = this.options.proxy.ipaddress;
				} else if (addressType === constants_1.Socks5HostType.Hostname) {
					const hostLength = header[4];
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(hostLength);
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(5));
					remoteHost = {
						host: buff.readString(hostLength),
						port: buff.readUInt16BE()
					};
				} else if (addressType === constants_1.Socks5HostType.IPv6) {
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
					remoteHost = {
						host: ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm(),
						port: buff.readUInt16BE()
					};
				}
				this.setState(constants_1.SocksClientState.ReceivedFinalResponse);
				if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.connect) {
					this.setState(constants_1.SocksClientState.Established);
					this.removeInternalSocketHandlers();
					this.emit("established", {
						remoteHost,
						socket: this.socket
					});
				} else if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.bind) {
					this.setState(constants_1.SocksClientState.BoundWaitingForConnection);
					this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader;
					this.emit("bound", {
						remoteHost,
						socket: this.socket
					});
				} else if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.associate) {
					this.setState(constants_1.SocksClientState.Established);
					this.removeInternalSocketHandlers();
					this.emit("established", {
						remoteHost,
						socket: this.socket
					});
				}
			}
		}
		/**
		* Handles Socks v5 incoming connection request (BIND).
		*/
		handleSocks5IncomingConnectionResponse() {
			const header = this.receiveBuffer.peek(5);
			if (header[0] !== 5 || header[1] !== constants_1.Socks5Response.Granted) this.closeSocket(`${constants_1.ERRORS.Socks5ProxyRejectedIncomingBoundConnection} - ${constants_1.Socks5Response[header[1]]}`);
			else {
				const addressType = header[3];
				let remoteHost;
				let buff;
				if (addressType === constants_1.Socks5HostType.IPv4) {
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
					remoteHost = {
						host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE()),
						port: buff.readUInt16BE()
					};
					if (remoteHost.host === "0.0.0.0") remoteHost.host = this.options.proxy.ipaddress;
				} else if (addressType === constants_1.Socks5HostType.Hostname) {
					const hostLength = header[4];
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(hostLength);
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(5));
					remoteHost = {
						host: buff.readString(hostLength),
						port: buff.readUInt16BE()
					};
				} else if (addressType === constants_1.Socks5HostType.IPv6) {
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
					remoteHost = {
						host: ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm(),
						port: buff.readUInt16BE()
					};
				}
				this.setState(constants_1.SocksClientState.Established);
				this.removeInternalSocketHandlers();
				this.emit("established", {
					remoteHost,
					socket: this.socket
				});
			}
		}
		get socksClientOptions() {
			return Object.assign({}, this.options);
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/socks@2.8.10/node_modules/socks/build/index.js
var require_build = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$2) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$2, p)) __createBinding(exports$2, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_socksclient(), exports);
}));
//#endregion
//#region node_modules/.pnpm/agent-base@7.1.4/node_modules/agent-base/dist/helpers.js
var require_helpers = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.req = exports.json = exports.toBuffer = void 0;
	var http$1 = __importStar(__require("http"));
	var https = __importStar(__require("https"));
	async function toBuffer(stream) {
		let length = 0;
		const chunks = [];
		for await (const chunk of stream) {
			length += chunk.length;
			chunks.push(chunk);
		}
		return Buffer.concat(chunks, length);
	}
	exports.toBuffer = toBuffer;
	async function json(stream) {
		const str = (await toBuffer(stream)).toString("utf8");
		try {
			return JSON.parse(str);
		} catch (_err) {
			const err = _err;
			err.message += ` (input: ${str})`;
			throw err;
		}
	}
	exports.json = json;
	function req(url, opts = {}) {
		const req = ((typeof url === "string" ? url : url.href).startsWith("https:") ? https : http$1).request(url, opts);
		const promise = new Promise((resolve, reject) => {
			req.once("response", resolve).once("error", reject).end();
		});
		req.then = promise.then.bind(promise);
		return req;
	}
	exports.req = req;
}));
//#endregion
//#region node_modules/.pnpm/agent-base@7.1.4/node_modules/agent-base/dist/index.js
var require_dist$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Agent = void 0;
	var net$1 = __importStar(__require("net"));
	var http = __importStar(__require("http"));
	var https_1 = __require("https");
	__exportStar(require_helpers(), exports);
	var INTERNAL = Symbol("AgentBaseInternalState");
	var Agent = class extends http.Agent {
		constructor(opts) {
			super(opts);
			this[INTERNAL] = {};
		}
		/**
		* Determine whether this is an `http` or `https` request.
		*/
		isSecureEndpoint(options) {
			if (options) {
				if (typeof options.secureEndpoint === "boolean") return options.secureEndpoint;
				if (typeof options.protocol === "string") return options.protocol === "https:";
			}
			const { stack } = /* @__PURE__ */ new Error();
			if (typeof stack !== "string") return false;
			return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
		}
		incrementSockets(name) {
			if (this.maxSockets === Infinity && this.maxTotalSockets === Infinity) return null;
			if (!this.sockets[name]) this.sockets[name] = [];
			const fakeSocket = new net$1.Socket({ writable: false });
			this.sockets[name].push(fakeSocket);
			this.totalSocketCount++;
			return fakeSocket;
		}
		decrementSockets(name, socket) {
			if (!this.sockets[name] || socket === null) return;
			const sockets = this.sockets[name];
			const index = sockets.indexOf(socket);
			if (index !== -1) {
				sockets.splice(index, 1);
				this.totalSocketCount--;
				if (sockets.length === 0) delete this.sockets[name];
			}
		}
		getName(options) {
			if (this.isSecureEndpoint(options)) return https_1.Agent.prototype.getName.call(this, options);
			return super.getName(options);
		}
		createSocket(req, options, cb) {
			const connectOpts = {
				...options,
				secureEndpoint: this.isSecureEndpoint(options)
			};
			const name = this.getName(connectOpts);
			const fakeSocket = this.incrementSockets(name);
			Promise.resolve().then(() => this.connect(req, connectOpts)).then((socket) => {
				this.decrementSockets(name, fakeSocket);
				if (socket instanceof http.Agent) try {
					return socket.addRequest(req, connectOpts);
				} catch (err) {
					return cb(err);
				}
				this[INTERNAL].currentSocket = socket;
				super.createSocket(req, options, cb);
			}, (err) => {
				this.decrementSockets(name, fakeSocket);
				cb(err);
			});
		}
		createConnection() {
			const socket = this[INTERNAL].currentSocket;
			this[INTERNAL].currentSocket = void 0;
			if (!socket) throw new Error("No socket was returned in the `connect()` function");
			return socket;
		}
		get defaultPort() {
			return this[INTERNAL].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
		}
		set defaultPort(v) {
			if (this[INTERNAL]) this[INTERNAL].defaultPort = v;
		}
		get protocol() {
			return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:");
		}
		set protocol(v) {
			if (this[INTERNAL]) this[INTERNAL].protocol = v;
		}
	};
	exports.Agent = Agent;
}));
//#endregion
//#region node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Helpers.
	*/
	var s = 1e3;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;
	/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} [options]
	* @throws {Error} throw an error if val is not a non-empty string or a number
	* @return {String|Number}
	* @api public
	*/
	module.exports = function(val, options) {
		options = options || {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		else if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/
	function parse(str) {
		str = String(str);
		if (str.length > 100) return;
		var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
		if (!match) return;
		var n = parseFloat(match[1]);
		switch ((match[2] || "ms").toLowerCase()) {
			case "years":
			case "year":
			case "yrs":
			case "yr":
			case "y": return n * y;
			case "weeks":
			case "week":
			case "w": return n * w;
			case "days":
			case "day":
			case "d": return n * d;
			case "hours":
			case "hour":
			case "hrs":
			case "hr":
			case "h": return n * h;
			case "minutes":
			case "minute":
			case "mins":
			case "min":
			case "m": return n * m;
			case "seconds":
			case "second":
			case "secs":
			case "sec":
			case "s": return n * s;
			case "milliseconds":
			case "millisecond":
			case "msecs":
			case "msec":
			case "ms": return n;
			default: return;
		}
	}
	/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtShort(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return Math.round(ms / d) + "d";
		if (msAbs >= h) return Math.round(ms / h) + "h";
		if (msAbs >= m) return Math.round(ms / m) + "m";
		if (msAbs >= s) return Math.round(ms / s) + "s";
		return ms + "ms";
	}
	/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtLong(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return plural(ms, msAbs, d, "day");
		if (msAbs >= h) return plural(ms, msAbs, h, "hour");
		if (msAbs >= m) return plural(ms, msAbs, m, "minute");
		if (msAbs >= s) return plural(ms, msAbs, s, "second");
		return ms + " ms";
	}
	/**
	* Pluralization helper.
	*/
	function plural(ms, msAbs, n, name) {
		var isPlural = msAbs >= n * 1.5;
		return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
	}
}));
//#endregion
//#region node_modules/.pnpm/debug@4.4.3_supports-color@10.2.2/node_modules/debug/src/common.js
var require_common = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*/
	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = require_ms();
		createDebug.destroy = destroy;
		Object.keys(env).forEach((key) => {
			createDebug[key] = env[key];
		});
		/**
		* The currently active debug mode names, and names to skip.
		*/
		createDebug.names = [];
		createDebug.skips = [];
		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};
		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;
			for (let i = 0; i < namespace.length; i++) {
				hash = (hash << 5) - hash + namespace.charCodeAt(i);
				hash |= 0;
			}
			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;
		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;
			function debug(...args) {
				if (!debug.enabled) return;
				const self = debug;
				const curr = Number(/* @__PURE__ */ new Date());
				self.diff = curr - (prevTime || curr);
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;
				args[0] = createDebug.coerce(args[0]);
				if (typeof args[0] !== "string") args.unshift("%O");
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					if (match === "%%") return "%";
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === "function") {
						const val = args[index];
						match = formatter.call(self, val);
						args.splice(index, 1);
						index--;
					}
					return match;
				});
				createDebug.formatArgs.call(self, args);
				(self.log || createDebug.log).apply(self, args);
			}
			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy;
			Object.defineProperty(debug, "enabled", {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) return enableOverride;
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}
					return enabledCache;
				},
				set: (v) => {
					enableOverride = v;
				}
			});
			if (typeof createDebug.init === "function") createDebug.init(debug);
			return debug;
		}
		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}
		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;
			createDebug.names = [];
			createDebug.skips = [];
			const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
			for (const ns of split) if (ns[0] === "-") createDebug.skips.push(ns.slice(1));
			else createDebug.names.push(ns);
		}
		/**
		* Checks if the given string matches a namespace template, honoring
		* asterisks as wildcards.
		*
		* @param {String} search
		* @param {String} template
		* @return {Boolean}
		*/
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;
			while (searchIndex < search.length) if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) if (template[templateIndex] === "*") {
				starIndex = templateIndex;
				matchIndex = searchIndex;
				templateIndex++;
			} else {
				searchIndex++;
				templateIndex++;
			}
			else if (starIndex !== -1) {
				templateIndex = starIndex + 1;
				matchIndex++;
				searchIndex = matchIndex;
			} else return false;
			while (templateIndex < template.length && template[templateIndex] === "*") templateIndex++;
			return templateIndex === template.length;
		}
		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [...createDebug.names, ...createDebug.skips.map((namespace) => "-" + namespace)].join(",");
			createDebug.enable("");
			return namespaces;
		}
		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			for (const skip of createDebug.skips) if (matchesTemplate(name, skip)) return false;
			for (const ns of createDebug.names) if (matchesTemplate(name, ns)) return true;
			return false;
		}
		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) return val.stack || val.message;
			return val;
		}
		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
		}
		createDebug.enable(createDebug.load());
		return createDebug;
	}
	module.exports = setup;
}));
//#endregion
//#region node_modules/.pnpm/debug@4.4.3_supports-color@10.2.2/node_modules/debug/src/browser.js
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the web browser implementation of `debug()`.
	*/
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = localstorage();
	exports.destroy = (() => {
		let warned = false;
		return () => {
			if (!warned) {
				warned = true;
				console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
			}
		};
	})();
	/**
	* Colors.
	*/
	exports.colors = [
		"#0000CC",
		"#0000FF",
		"#0033CC",
		"#0033FF",
		"#0066CC",
		"#0066FF",
		"#0099CC",
		"#0099FF",
		"#00CC00",
		"#00CC33",
		"#00CC66",
		"#00CC99",
		"#00CCCC",
		"#00CCFF",
		"#3300CC",
		"#3300FF",
		"#3333CC",
		"#3333FF",
		"#3366CC",
		"#3366FF",
		"#3399CC",
		"#3399FF",
		"#33CC00",
		"#33CC33",
		"#33CC66",
		"#33CC99",
		"#33CCCC",
		"#33CCFF",
		"#6600CC",
		"#6600FF",
		"#6633CC",
		"#6633FF",
		"#66CC00",
		"#66CC33",
		"#9900CC",
		"#9900FF",
		"#9933CC",
		"#9933FF",
		"#99CC00",
		"#99CC33",
		"#CC0000",
		"#CC0033",
		"#CC0066",
		"#CC0099",
		"#CC00CC",
		"#CC00FF",
		"#CC3300",
		"#CC3333",
		"#CC3366",
		"#CC3399",
		"#CC33CC",
		"#CC33FF",
		"#CC6600",
		"#CC6633",
		"#CC9900",
		"#CC9933",
		"#CCCC00",
		"#CCCC33",
		"#FF0000",
		"#FF0033",
		"#FF0066",
		"#FF0099",
		"#FF00CC",
		"#FF00FF",
		"#FF3300",
		"#FF3333",
		"#FF3366",
		"#FF3399",
		"#FF33CC",
		"#FF33FF",
		"#FF6600",
		"#FF6633",
		"#FF9900",
		"#FF9933",
		"#FFCC00",
		"#FFCC33"
	];
	/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/
	function useColors() {
		if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
		if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
		let m;
		return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
		if (!this.useColors) return;
		const c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		let index = 0;
		let lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, (match) => {
			if (match === "%%") return;
			index++;
			if (match === "%c") lastC = index;
		});
		args.splice(lastC, 0, c);
	}
	/**
	* Invokes `console.debug()` when available.
	* No-op when `console.debug` is not a "function".
	* If `console.debug` is not available, falls back
	* to `console.log`.
	*
	* @api public
	*/
	exports.log = console.debug || console.log || (() => {});
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		try {
			if (namespaces) exports.storage.setItem("debug", namespaces);
			else exports.storage.removeItem("debug");
		} catch (error) {}
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		let r;
		try {
			r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
		} catch (error) {}
		if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
		return r;
	}
	/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/
	function localstorage() {
		try {
			return localStorage;
		} catch (error) {}
	}
	module.exports = require_common()(exports);
	var { formatters } = module.exports;
	/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/
	formatters.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return "[UnexpectedJSONParseError]: " + error.message;
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/supports-color@10.2.2/node_modules/supports-color/index.js
var supports_color_exports = /* @__PURE__ */ __exportAll({
	createSupportsColor: () => createSupportsColor,
	default: () => supportsColor
});
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process$1.argv) {
	const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf("--");
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
function envForceColor() {
	if (!("FORCE_COLOR" in env)) return;
	if (env.FORCE_COLOR === "true") return 1;
	if (env.FORCE_COLOR === "false") return 0;
	if (env.FORCE_COLOR.length === 0) return 1;
	const level = Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
	if (![
		0,
		1,
		2,
		3
	].includes(level)) return;
	return level;
}
function translateLevel(level) {
	if (level === 0) return false;
	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
	const noFlagForceColor = envForceColor();
	if (noFlagForceColor !== void 0) flagForceColor = noFlagForceColor;
	const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
	if (forceColor === 0) return 0;
	if (sniffFlags) {
		if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
		if (hasFlag("color=256")) return 2;
	}
	if ("TF_BUILD" in env && "AGENT_NAME" in env) return 1;
	if (haveStream && !streamIsTTY && forceColor === void 0) return 0;
	const min = forceColor || 0;
	if (env.TERM === "dumb") return min;
	if (process$1.platform === "win32") {
		const osRelease = os.release().split(".");
		if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
		return 1;
	}
	if ("CI" in env) {
		if ([
			"GITHUB_ACTIONS",
			"GITEA_ACTIONS",
			"CIRCLECI"
		].some((key) => key in env)) return 3;
		if ([
			"TRAVIS",
			"APPVEYOR",
			"GITLAB_CI",
			"BUILDKITE",
			"DRONE"
		].some((sign) => sign in env) || env.CI_NAME === "codeship") return 1;
		return min;
	}
	if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	if (env.COLORTERM === "truecolor") return 3;
	if (env.TERM === "xterm-kitty") return 3;
	if (env.TERM === "xterm-ghostty") return 3;
	if (env.TERM === "wezterm") return 3;
	if ("TERM_PROGRAM" in env) {
		const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
		switch (env.TERM_PROGRAM) {
			case "iTerm.app": return version >= 3 ? 3 : 2;
			case "Apple_Terminal": return 2;
		}
	}
	if (/-256(color)?$/i.test(env.TERM)) return 2;
	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) return 1;
	if ("COLORTERM" in env) return 1;
	return min;
}
function createSupportsColor(stream, options = {}) {
	return translateLevel(_supportsColor(stream, {
		streamIsTTY: stream && stream.isTTY,
		...options
	}));
}
var env, flagForceColor, supportsColor;
var init_supports_color = __esmMin((() => {
	({env} = process$1);
	if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) flagForceColor = 0;
	else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) flagForceColor = 1;
	supportsColor = {
		stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
		stderr: createSupportsColor({ isTTY: tty.isatty(2) })
	};
}));
//#endregion
//#region node_modules/.pnpm/debug@4.4.3_supports-color@10.2.2/node_modules/debug/src/node.js
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	*/
	var tty$1 = __require("tty");
	var util$1 = __require("util");
	/**
	* This is the Node.js implementation of `debug()`.
	*/
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.destroy = util$1.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
	/**
	* Colors.
	*/
	exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	try {
		const supportsColor = (init_supports_color(), __toCommonJS(supports_color_exports));
		if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	} catch (error) {}
	/**
	* Build up the default `inspectOpts` object from the environment variables.
	*
	*   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	*/
	exports.inspectOpts = Object.keys(process.env).filter((key) => {
		return /^debug_/i.test(key);
	}).reduce((obj, key) => {
		const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});
		let val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
		else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
		else if (val === "null") val = null;
		else val = Number(val);
		obj[prop] = val;
		return obj;
	}, {});
	/**
	* Is stdout a TTY? Colored output is enabled when `true`.
	*/
	function useColors() {
		return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty$1.isatty(process.stderr.fd);
	}
	/**
	* Adds ANSI color escape codes if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		const { namespace: name, useColors } = this;
		if (useColors) {
			const c = this.color;
			const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
			const prefix = `  ${colorCode};1m${name} \u001B[0m`;
			args[0] = prefix + args[0].split("\n").join("\n" + prefix);
			args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = getDate() + name + " " + args[0];
	}
	function getDate() {
		if (exports.inspectOpts.hideDate) return "";
		return (/* @__PURE__ */ new Date()).toISOString() + " ";
	}
	/**
	* Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
	*/
	function log(...args) {
		return process.stderr.write(util$1.formatWithOptions(exports.inspectOpts, ...args) + "\n");
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		if (namespaces) process.env.DEBUG = namespaces;
		else delete process.env.DEBUG;
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		return process.env.DEBUG;
	}
	/**
	* Init logic for `debug` instances.
	*
	* Create a new `inspectOpts` object in case `useColors` is set
	* differently for a particular `debug` instance.
	*/
	function init(debug) {
		debug.inspectOpts = {};
		const keys = Object.keys(exports.inspectOpts);
		for (let i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	module.exports = require_common()(exports);
	var { formatters } = module.exports;
	/**
	* Map %o to `util.inspect()`, all on a single line.
	*/
	formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util$1.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
	};
	/**
	* Map %O to `util.inspect()`, allowing multiple lines if needed.
	*/
	formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util$1.inspect(v, this.inspectOpts);
	};
}));
//#endregion
//#region node_modules/.pnpm/debug@4.4.3_supports-color@10.2.2/node_modules/debug/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Detect Electron renderer / nwjs process, which is node, but we should
	* treat as a browser.
	*/
	if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = require_browser();
	else module.exports = require_node();
}));
//#endregion
//#region lib/telegram-message.ts
var import_dist = (/* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SocksProxyAgent = void 0;
	var socks_1 = require_build();
	var agent_base_1 = require_dist$1();
	var debug_1 = __importDefault(require_src());
	var dns = __importStar(__require("dns"));
	var net = __importStar(__require("net"));
	var tls = __importStar(__require("tls"));
	var url_1 = __require("url");
	var debug = (0, debug_1.default)("socks-proxy-agent");
	var setServernameFromNonIpHost = (options) => {
		if (options.servername === void 0 && options.host && !net.isIP(options.host)) return {
			...options,
			servername: options.host
		};
		return options;
	};
	function parseSocksURL(url) {
		let lookup = false;
		let type = 5;
		const host = url.hostname;
		const port = parseInt(url.port, 10) || 1080;
		switch (url.protocol.replace(":", "")) {
			case "socks4":
				lookup = true;
				type = 4;
				break;
			case "socks4a":
				type = 4;
				break;
			case "socks5":
				lookup = true;
				type = 5;
				break;
			case "socks":
				type = 5;
				break;
			case "socks5h":
				type = 5;
				break;
			default: throw new TypeError(`A "socks" protocol must be specified! Got: ${String(url.protocol)}`);
		}
		const proxy = {
			host,
			port,
			type
		};
		if (url.username) Object.defineProperty(proxy, "userId", {
			value: decodeURIComponent(url.username),
			enumerable: false
		});
		if (url.password != null) Object.defineProperty(proxy, "password", {
			value: decodeURIComponent(url.password),
			enumerable: false
		});
		return {
			lookup,
			proxy
		};
	}
	var SocksProxyAgent = class extends agent_base_1.Agent {
		constructor(uri, opts) {
			super(opts);
			const { proxy, lookup } = parseSocksURL(typeof uri === "string" ? new url_1.URL(uri) : uri);
			this.shouldLookup = lookup;
			this.proxy = proxy;
			this.timeout = opts?.timeout ?? null;
			this.socketOptions = opts?.socketOptions ?? null;
		}
		/**
		* Initiates a SOCKS connection to the specified SOCKS proxy server,
		* which in turn connects to the specified remote host and port.
		*/
		async connect(req, opts) {
			const { shouldLookup, proxy, timeout } = this;
			if (!opts.host) throw new Error("No `host` defined!");
			let { host } = opts;
			const { port, lookup: lookupFn = dns.lookup } = opts;
			if (shouldLookup) host = await new Promise((resolve, reject) => {
				lookupFn(host, {}, (err, res) => {
					if (err) reject(err);
					else resolve(res);
				});
			});
			const socksOpts = {
				proxy,
				destination: {
					host,
					port: typeof port === "number" ? port : parseInt(port, 10)
				},
				command: "connect",
				timeout: timeout ?? void 0,
				socket_options: this.socketOptions ?? void 0
			};
			const cleanup = (tlsSocket) => {
				req.destroy();
				socket.destroy();
				if (tlsSocket) tlsSocket.destroy();
			};
			debug("Creating socks proxy connection: %o", socksOpts);
			const { socket } = await socks_1.SocksClient.createConnection(socksOpts);
			debug("Successfully created socks proxy connection");
			if (timeout !== null) {
				socket.setTimeout(timeout);
				socket.on("timeout", () => cleanup());
			}
			if (opts.secureEndpoint) {
				debug("Upgrading socket connection to TLS");
				const tlsSocket = tls.connect({
					...omit(setServernameFromNonIpHost(opts), "host", "path", "port"),
					socket
				});
				tlsSocket.once("error", (error) => {
					debug("Socket TLS error", error.message);
					cleanup(tlsSocket);
				});
				return tlsSocket;
			}
			return socket;
		}
	};
	SocksProxyAgent.protocols = [
		"socks",
		"socks4",
		"socks4a",
		"socks5",
		"socks5h"
	];
	exports.SocksProxyAgent = SocksProxyAgent;
	function omit(obj, ...keys) {
		const ret = {};
		let key;
		for (key in obj) if (!keys.includes(key)) ret[key] = obj[key];
		return ret;
	}
})))();
function telegramMessage(lead) {
	const lines = [
		"🟢 Новая заявка · Клевер",
		"№ " + lead.id.slice(0, 8),
		"",
		`Услуга: ${lead.service}`,
		`Контакт: ${lead.contact}`,
		`Способ связи: ${lead.channel}`
	];
	if (lead.name) lines.push("Имя: " + lead.name);
	if (lead.details) lines.push("", "Расчёт / комментарий:", lead.details);
	const source = Object.entries(lead.attribution).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
	if (source.length) lines.push("", "Источник:", ...source);
	lines.push("", "Получено: " + new Date(lead.createdAt).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }) + " МСК");
	return Array.from(lines.join("\n")).slice(0, 3900).join("");
}
//#endregion
//#region lib/telegram-node.ts
var TelegramDeliveryError = class extends Error {
	constructor(code) {
		super(code);
		this.code = code;
		this.name = "TelegramDeliveryError";
	}
};
function telegramReady(config) {
	return /^\d+:[A-Za-z0-9_-]+$/.test(config.token || "") && /^-?\d+$/.test(config.chatId || "") && validProxy(config.proxyUrl);
}
function validProxy(value) {
	try {
		const u = new URL(value || "");
		return u.protocol === "socks5h:" && !!u.hostname && Number(u.port) > 0 && Number(u.port) <= 65535;
	} catch {
		return false;
	}
}
async function sendTelegram(lead, config) {
	if (!config.token || !config.chatId || !config.proxyUrl) throw new TelegramDeliveryError("not_configured");
	if (!validProxy(config.proxyUrl)) throw new TelegramDeliveryError("proxy_invalid");
	if (!telegramReady(config)) throw new TelegramDeliveryError("not_configured");
	const agent = new import_dist.SocksProxyAgent(config.proxyUrl, { timeout: 1e4 });
	const payload = JSON.stringify({
		chat_id: config.chatId,
		text: telegramMessage(lead),
		protect_content: true,
		link_preview_options: { is_disabled: true }
	});
	return await new Promise((resolve, reject) => {
		let settled = false;
		const finish = (error, id) => {
			if (settled) return;
			settled = true;
			clearTimeout(timer);
			agent.destroy();
			error ? reject(error) : resolve(id);
		};
		const req = request({
			protocol: "https:",
			hostname: "api.telegram.org",
			port: 443,
			path: `/bot${config.token}/sendMessage`,
			method: "POST",
			agent,
			headers: {
				"Content-Type": "application/json",
				"Content-Length": Buffer.byteLength(payload)
			}
		}, (res) => {
			let text = "";
			res.setEncoding("utf8");
			res.on("data", (chunk) => {
				text += chunk;
				if (text.length > 64e3) req.destroy();
			});
			res.on("end", () => {
				try {
					const body = JSON.parse(text);
					if (res.statusCode === 200 && body.ok === true && Number.isInteger(body.result?.message_id)) finish(void 0, String(body.result.message_id));
					else finish(new TelegramDeliveryError("upstream_failed"));
				} catch {
					finish(new TelegramDeliveryError("upstream_failed"));
				}
			});
			res.on("error", () => finish(new TelegramDeliveryError("upstream_failed")));
		});
		const timer = setTimeout(() => {
			req.destroy();
			finish(new TelegramDeliveryError("upstream_failed"));
		}, 12e3);
		req.on("error", () => finish(new TelegramDeliveryError("upstream_failed")));
		req.end(payload);
	});
}
//#endregion
//#region portable/telegram-outbox.ts
function createTelegramOutbox(file) {
	const jobs = /* @__PURE__ */ new Map();
	let loaded = null;
	const records = /* @__PURE__ */ new Map();
	const load = () => loaded ||= (async () => {
		try {
			for (const line of (await readFile(file, "utf8")).split("\n").filter(Boolean)) {
				const row = JSON.parse(line);
				records.set(row.id, row);
			}
		} catch (error) {
			if (error.code !== "ENOENT") throw error;
		}
	})();
	return async (lead, config) => {
		await load();
		const hash = createHash("sha256").update(leadFingerprint(lead)).digest("hex");
		const old = records.get(lead.id);
		if (old && old.hash !== hash) throw new Error("request_conflict");
		if (old?.status === "sent") return old;
		const job = jobs.get(lead.id);
		if (job) {
			if (job.hash !== hash) throw new Error("request_conflict");
			return job.promise;
		}
		const pending = (async () => {
			let record = {
				id: lead.id,
				hash,
				status: "pending",
				updatedAt: Date.now()
			};
			if (telegramReady(config)) try {
				const messageId = await sendTelegram(lead, config);
				record = {
					...record,
					status: "sent",
					messageId
				};
			} catch {}
			await appendFile(file, JSON.stringify(record) + "\n", { mode: 384 });
			records.set(lead.id, record);
			return record;
		})();
		jobs.set(lead.id, {
			hash,
			promise: pending
		});
		try {
			return await pending;
		} finally {
			jobs.delete(lead.id);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js
var util;
(function(util) {
	util.assertEqual = (_) => {};
	function assertIs(_arg) {}
	util.assertIs = assertIs;
	function assertNever(_x) {
		throw new Error();
	}
	util.assertNever = assertNever;
	util.arrayToEnum = (items) => {
		const obj = {};
		for (const item of items) obj[item] = item;
		return obj;
	};
	util.getValidEnumValues = (obj) => {
		const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
		const filtered = {};
		for (const k of validKeys) filtered[k] = obj[k];
		return util.objectValues(filtered);
	};
	util.objectValues = (obj) => {
		return util.objectKeys(obj).map(function(e) {
			return obj[e];
		});
	};
	util.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
		const keys = [];
		for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key)) keys.push(key);
		return keys;
	};
	util.find = (arr, checker) => {
		for (const item of arr) if (checker(item)) return item;
	};
	util.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
	function joinValues(array, separator = " | ") {
		return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
	}
	util.joinValues = joinValues;
	util.jsonStringifyReplacer = (_, value) => {
		if (typeof value === "bigint") return value.toString();
		return value;
	};
})(util || (util = {}));
var objectUtil;
(function(objectUtil) {
	objectUtil.mergeShapes = (first, second) => {
		return {
			...first,
			...second
		};
	};
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set"
]);
var getParsedType = (data) => {
	switch (typeof data) {
		case "undefined": return ZodParsedType.undefined;
		case "string": return ZodParsedType.string;
		case "number": return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
		case "boolean": return ZodParsedType.boolean;
		case "function": return ZodParsedType.function;
		case "bigint": return ZodParsedType.bigint;
		case "symbol": return ZodParsedType.symbol;
		case "object":
			if (Array.isArray(data)) return ZodParsedType.array;
			if (data === null) return ZodParsedType.null;
			if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return ZodParsedType.promise;
			if (typeof Map !== "undefined" && data instanceof Map) return ZodParsedType.map;
			if (typeof Set !== "undefined" && data instanceof Set) return ZodParsedType.set;
			if (typeof Date !== "undefined" && data instanceof Date) return ZodParsedType.date;
			return ZodParsedType.object;
		default: return ZodParsedType.unknown;
	}
};
//#endregion
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite"
]);
var ZodError = class ZodError extends Error {
	get errors() {
		return this.issues;
	}
	constructor(issues) {
		super();
		this.issues = [];
		this.addIssue = (sub) => {
			this.issues = [...this.issues, sub];
		};
		this.addIssues = (subs = []) => {
			this.issues = [...this.issues, ...subs];
		};
		const actualProto = new.target.prototype;
		if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto);
		else this.__proto__ = actualProto;
		this.name = "ZodError";
		this.issues = issues;
	}
	format(_mapper) {
		const mapper = _mapper || function(issue) {
			return issue.message;
		};
		const fieldErrors = { _errors: [] };
		const processError = (error) => {
			for (const issue of error.issues) if (issue.code === "invalid_union") issue.unionErrors.map(processError);
			else if (issue.code === "invalid_return_type") processError(issue.returnTypeError);
			else if (issue.code === "invalid_arguments") processError(issue.argumentsError);
			else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
			else {
				let curr = fieldErrors;
				let i = 0;
				while (i < issue.path.length) {
					const el = issue.path[i];
					if (!(i === issue.path.length - 1)) curr[el] = curr[el] || { _errors: [] };
					else {
						curr[el] = curr[el] || { _errors: [] };
						curr[el]._errors.push(mapper(issue));
					}
					curr = curr[el];
					i++;
				}
			}
		};
		processError(this);
		return fieldErrors;
	}
	static assert(value) {
		if (!(value instanceof ZodError)) throw new Error(`Not a ZodError: ${value}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(mapper = (issue) => issue.message) {
		const fieldErrors = {};
		const formErrors = [];
		for (const sub of this.issues) if (sub.path.length > 0) {
			const firstEl = sub.path[0];
			fieldErrors[firstEl] = fieldErrors[firstEl] || [];
			fieldErrors[firstEl].push(mapper(sub));
		} else formErrors.push(mapper(sub));
		return {
			formErrors,
			fieldErrors
		};
	}
	get formErrors() {
		return this.flatten();
	}
};
ZodError.create = (issues) => {
	return new ZodError(issues);
};
//#endregion
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
	let message;
	switch (issue.code) {
		case ZodIssueCode.invalid_type:
			if (issue.received === ZodParsedType.undefined) message = "Required";
			else message = `Expected ${issue.expected}, received ${issue.received}`;
			break;
		case ZodIssueCode.invalid_literal:
			message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
			break;
		case ZodIssueCode.unrecognized_keys:
			message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
			break;
		case ZodIssueCode.invalid_union:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_union_discriminator:
			message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
			break;
		case ZodIssueCode.invalid_enum_value:
			message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
			break;
		case ZodIssueCode.invalid_arguments:
			message = `Invalid function arguments`;
			break;
		case ZodIssueCode.invalid_return_type:
			message = `Invalid function return type`;
			break;
		case ZodIssueCode.invalid_date:
			message = `Invalid date`;
			break;
		case ZodIssueCode.invalid_string:
			if (typeof issue.validation === "object") if ("includes" in issue.validation) {
				message = `Invalid input: must include "${issue.validation.includes}"`;
				if (typeof issue.validation.position === "number") message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
			} else if ("startsWith" in issue.validation) message = `Invalid input: must start with "${issue.validation.startsWith}"`;
			else if ("endsWith" in issue.validation) message = `Invalid input: must end with "${issue.validation.endsWith}"`;
			else util.assertNever(issue.validation);
			else if (issue.validation !== "regex") message = `Invalid ${issue.validation}`;
			else message = "Invalid";
			break;
		case ZodIssueCode.too_small:
			if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
			else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
			else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
			else if (issue.type === "bigint") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
			else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.too_big:
			if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
			else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
			else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.custom:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_intersection_types:
			message = `Intersection results could not be merged`;
			break;
		case ZodIssueCode.not_multiple_of:
			message = `Number must be a multiple of ${issue.multipleOf}`;
			break;
		case ZodIssueCode.not_finite:
			message = "Number must be finite";
			break;
		default:
			message = _ctx.defaultError;
			util.assertNever(issue);
	}
	return { message };
};
//#endregion
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/errors.js
var overrideErrorMap = errorMap;
function getErrorMap() {
	return overrideErrorMap;
}
//#endregion
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
	const { data, path, errorMaps, issueData } = params;
	const fullPath = [...path, ...issueData.path || []];
	const fullIssue = {
		...issueData,
		path: fullPath
	};
	if (issueData.message !== void 0) return {
		...issueData,
		path: fullPath,
		message: issueData.message
	};
	let errorMessage = "";
	const maps = errorMaps.filter((m) => !!m).slice().reverse();
	for (const map of maps) errorMessage = map(fullIssue, {
		data,
		defaultError: errorMessage
	}).message;
	return {
		...issueData,
		path: fullPath,
		message: errorMessage
	};
};
function addIssueToContext(ctx, issueData) {
	const overrideMap = getErrorMap();
	const issue = makeIssue({
		issueData,
		data: ctx.data,
		path: ctx.path,
		errorMaps: [
			ctx.common.contextualErrorMap,
			ctx.schemaErrorMap,
			overrideMap,
			overrideMap === errorMap ? void 0 : errorMap
		].filter((x) => !!x)
	});
	ctx.common.issues.push(issue);
}
var ParseStatus = class ParseStatus {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		if (this.value === "valid") this.value = "dirty";
	}
	abort() {
		if (this.value !== "aborted") this.value = "aborted";
	}
	static mergeArray(status, results) {
		const arrayValue = [];
		for (const s of results) {
			if (s.status === "aborted") return INVALID;
			if (s.status === "dirty") status.dirty();
			arrayValue.push(s.value);
		}
		return {
			status: status.value,
			value: arrayValue
		};
	}
	static async mergeObjectAsync(status, pairs) {
		const syncPairs = [];
		for (const pair of pairs) {
			const key = await pair.key;
			const value = await pair.value;
			syncPairs.push({
				key,
				value
			});
		}
		return ParseStatus.mergeObjectSync(status, syncPairs);
	}
	static mergeObjectSync(status, pairs) {
		const finalObject = {};
		for (const pair of pairs) {
			const { key, value } = pair;
			if (key.status === "aborted") return INVALID;
			if (value.status === "aborted") return INVALID;
			if (key.status === "dirty") status.dirty();
			if (value.status === "dirty") status.dirty();
			if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) finalObject[key.value] = value.value;
		}
		return {
			status: status.value,
			value: finalObject
		};
	}
};
var INVALID = Object.freeze({ status: "aborted" });
var DIRTY = (value) => ({
	status: "dirty",
	value
});
var OK = (value) => ({
	status: "valid",
	value
});
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
//#endregion
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil) {
	errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
	errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));
//#endregion
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
	constructor(parent, value, path, key) {
		this._cachedPath = [];
		this.parent = parent;
		this.data = value;
		this._path = path;
		this._key = key;
	}
	get path() {
		if (!this._cachedPath.length) if (Array.isArray(this._key)) this._cachedPath.push(...this._path, ...this._key);
		else this._cachedPath.push(...this._path, this._key);
		return this._cachedPath;
	}
};
var handleResult = (ctx, result) => {
	if (isValid(result)) return {
		success: true,
		data: result.value
	};
	else {
		if (!ctx.common.issues.length) throw new Error("Validation failed but no issues detected.");
		return {
			success: false,
			get error() {
				if (this._error) return this._error;
				const error = new ZodError(ctx.common.issues);
				this._error = error;
				return this._error;
			}
		};
	}
};
function processCreateParams(params) {
	if (!params) return {};
	const { errorMap, invalid_type_error, required_error, description } = params;
	if (errorMap && (invalid_type_error || required_error)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
	if (errorMap) return {
		errorMap,
		description
	};
	const customMap = (iss, ctx) => {
		const { message } = params;
		if (iss.code === "invalid_enum_value") return { message: message ?? ctx.defaultError };
		if (typeof ctx.data === "undefined") return { message: message ?? required_error ?? ctx.defaultError };
		if (iss.code !== "invalid_type") return { message: ctx.defaultError };
		return { message: message ?? invalid_type_error ?? ctx.defaultError };
	};
	return {
		errorMap: customMap,
		description
	};
}
var ZodType = class {
	get description() {
		return this._def.description;
	}
	_getType(input) {
		return getParsedType(input.data);
	}
	_getOrReturnCtx(input, ctx) {
		return ctx || {
			common: input.parent.common,
			data: input.data,
			parsedType: getParsedType(input.data),
			schemaErrorMap: this._def.errorMap,
			path: input.path,
			parent: input.parent
		};
	}
	_processInputParams(input) {
		return {
			status: new ParseStatus(),
			ctx: {
				common: input.parent.common,
				data: input.data,
				parsedType: getParsedType(input.data),
				schemaErrorMap: this._def.errorMap,
				path: input.path,
				parent: input.parent
			}
		};
	}
	_parseSync(input) {
		const result = this._parse(input);
		if (isAsync(result)) throw new Error("Synchronous parse encountered promise.");
		return result;
	}
	_parseAsync(input) {
		const result = this._parse(input);
		return Promise.resolve(result);
	}
	parse(data, params) {
		const result = this.safeParse(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	safeParse(data, params) {
		const ctx = {
			common: {
				issues: [],
				async: params?.async ?? false,
				contextualErrorMap: params?.errorMap
			},
			path: params?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		return handleResult(ctx, this._parseSync({
			data,
			path: ctx.path,
			parent: ctx
		}));
	}
	"~validate"(data) {
		const ctx = {
			common: {
				issues: [],
				async: !!this["~standard"].async
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		if (!this["~standard"].async) try {
			const result = this._parseSync({
				data,
				path: [],
				parent: ctx
			});
			return isValid(result) ? { value: result.value } : { issues: ctx.common.issues };
		} catch (err) {
			if (err?.message?.toLowerCase()?.includes("encountered")) this["~standard"].async = true;
			ctx.common = {
				issues: [],
				async: true
			};
		}
		return this._parseAsync({
			data,
			path: [],
			parent: ctx
		}).then((result) => isValid(result) ? { value: result.value } : { issues: ctx.common.issues });
	}
	async parseAsync(data, params) {
		const result = await this.safeParseAsync(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	async safeParseAsync(data, params) {
		const ctx = {
			common: {
				issues: [],
				contextualErrorMap: params?.errorMap,
				async: true
			},
			path: params?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		const maybeAsyncResult = this._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
		return handleResult(ctx, await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult)));
	}
	refine(check, message) {
		const getIssueProperties = (val) => {
			if (typeof message === "string" || typeof message === "undefined") return { message };
			else if (typeof message === "function") return message(val);
			else return message;
		};
		return this._refinement((val, ctx) => {
			const result = check(val);
			const setError = () => ctx.addIssue({
				code: ZodIssueCode.custom,
				...getIssueProperties(val)
			});
			if (typeof Promise !== "undefined" && result instanceof Promise) return result.then((data) => {
				if (!data) {
					setError();
					return false;
				} else return true;
			});
			if (!result) {
				setError();
				return false;
			} else return true;
		});
	}
	refinement(check, refinementData) {
		return this._refinement((val, ctx) => {
			if (!check(val)) {
				ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
				return false;
			} else return true;
		});
	}
	_refinement(refinement) {
		return new ZodEffects({
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: {
				type: "refinement",
				refinement
			}
		});
	}
	superRefine(refinement) {
		return this._refinement(refinement);
	}
	constructor(def) {
		/** Alias of safeParseAsync */
		this.spa = this.safeParseAsync;
		this._def = def;
		this.parse = this.parse.bind(this);
		this.safeParse = this.safeParse.bind(this);
		this.parseAsync = this.parseAsync.bind(this);
		this.safeParseAsync = this.safeParseAsync.bind(this);
		this.spa = this.spa.bind(this);
		this.refine = this.refine.bind(this);
		this.refinement = this.refinement.bind(this);
		this.superRefine = this.superRefine.bind(this);
		this.optional = this.optional.bind(this);
		this.nullable = this.nullable.bind(this);
		this.nullish = this.nullish.bind(this);
		this.array = this.array.bind(this);
		this.promise = this.promise.bind(this);
		this.or = this.or.bind(this);
		this.and = this.and.bind(this);
		this.transform = this.transform.bind(this);
		this.brand = this.brand.bind(this);
		this.default = this.default.bind(this);
		this.catch = this.catch.bind(this);
		this.describe = this.describe.bind(this);
		this.pipe = this.pipe.bind(this);
		this.readonly = this.readonly.bind(this);
		this.isNullable = this.isNullable.bind(this);
		this.isOptional = this.isOptional.bind(this);
		this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: (data) => this["~validate"](data)
		};
	}
	optional() {
		return ZodOptional.create(this, this._def);
	}
	nullable() {
		return ZodNullable.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return ZodArray.create(this);
	}
	promise() {
		return ZodPromise.create(this, this._def);
	}
	or(option) {
		return ZodUnion.create([this, option], this._def);
	}
	and(incoming) {
		return ZodIntersection.create(this, incoming, this._def);
	}
	transform(transform) {
		return new ZodEffects({
			...processCreateParams(this._def),
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: {
				type: "transform",
				transform
			}
		});
	}
	default(def) {
		const defaultValueFunc = typeof def === "function" ? def : () => def;
		return new ZodDefault({
			...processCreateParams(this._def),
			innerType: this,
			defaultValue: defaultValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodDefault
		});
	}
	brand() {
		return new ZodBranded({
			typeName: ZodFirstPartyTypeKind.ZodBranded,
			type: this,
			...processCreateParams(this._def)
		});
	}
	catch(def) {
		const catchValueFunc = typeof def === "function" ? def : () => def;
		return new ZodCatch({
			...processCreateParams(this._def),
			innerType: this,
			catchValue: catchValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodCatch
		});
	}
	describe(description) {
		const This = this.constructor;
		return new This({
			...this._def,
			description
		});
	}
	pipe(target) {
		return ZodPipeline.create(this, target);
	}
	readonly() {
		return ZodReadonly.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
	let secondsRegexSource = `[0-5]\\d`;
	if (args.precision) secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
	else if (args.precision == null) secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
	const secondsQuantifier = args.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
	return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
	let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
	const opts = [];
	opts.push(args.local ? `Z?` : `Z`);
	if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
	regex = `${regex}(${opts.join("|")})`;
	return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
	if ((version === "v4" || !version) && ipv4Regex.test(ip)) return true;
	if ((version === "v6" || !version) && ipv6Regex.test(ip)) return true;
	return false;
}
function isValidJWT(jwt, alg) {
	if (!jwtRegex.test(jwt)) return false;
	try {
		const [header] = jwt.split(".");
		if (!header) return false;
		const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
		const decoded = JSON.parse(atob(base64));
		if (typeof decoded !== "object" || decoded === null) return false;
		if ("typ" in decoded && decoded?.typ !== "JWT") return false;
		if (!decoded.alg) return false;
		if (alg && decoded.alg !== alg) return false;
		return true;
	} catch {
		return false;
	}
}
function isValidCidr(ip, version) {
	if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) return true;
	if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) return true;
	return false;
}
var ZodString = class ZodString extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = String(input.data);
		if (this._getType(input) !== ZodParsedType.string) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.string,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = void 0;
		for (const check of this._def.checks) if (check.kind === "min") {
			if (input.data.length < check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "string",
					inclusive: true,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (input.data.length > check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "string",
					inclusive: true,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "length") {
			const tooBig = input.data.length > check.value;
			const tooSmall = input.data.length < check.value;
			if (tooBig || tooSmall) {
				ctx = this._getOrReturnCtx(input, ctx);
				if (tooBig) addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "string",
					inclusive: true,
					exact: true,
					message: check.message
				});
				else if (tooSmall) addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "string",
					inclusive: true,
					exact: true,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "email") {
			if (!emailRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "email",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "emoji") {
			if (!emojiRegex) emojiRegex = new RegExp(_emojiRegex, "u");
			if (!emojiRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "emoji",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "uuid") {
			if (!uuidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "uuid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "nanoid") {
			if (!nanoidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "nanoid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cuid") {
			if (!cuidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cuid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cuid2") {
			if (!cuid2Regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cuid2",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "ulid") {
			if (!ulidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "ulid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "url") try {
			new URL(input.data);
		} catch {
			ctx = this._getOrReturnCtx(input, ctx);
			addIssueToContext(ctx, {
				validation: "url",
				code: ZodIssueCode.invalid_string,
				message: check.message
			});
			status.dirty();
		}
		else if (check.kind === "regex") {
			check.regex.lastIndex = 0;
			if (!check.regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "regex",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "trim") input.data = input.data.trim();
		else if (check.kind === "includes") {
			if (!input.data.includes(check.value, check.position)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: {
						includes: check.value,
						position: check.position
					},
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "toLowerCase") input.data = input.data.toLowerCase();
		else if (check.kind === "toUpperCase") input.data = input.data.toUpperCase();
		else if (check.kind === "startsWith") {
			if (!input.data.startsWith(check.value)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: { startsWith: check.value },
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "endsWith") {
			if (!input.data.endsWith(check.value)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: { endsWith: check.value },
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "datetime") {
			if (!datetimeRegex(check).test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "datetime",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "date") {
			if (!dateRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "date",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "time") {
			if (!timeRegex(check).test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "time",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "duration") {
			if (!durationRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "duration",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "ip") {
			if (!isValidIP(input.data, check.version)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "ip",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "jwt") {
			if (!isValidJWT(input.data, check.alg)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "jwt",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cidr") {
			if (!isValidCidr(input.data, check.version)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cidr",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "base64") {
			if (!base64Regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "base64",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "base64url") {
			if (!base64urlRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "base64url",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	_regex(regex, validation, message) {
		return this.refinement((data) => regex.test(data), {
			validation,
			code: ZodIssueCode.invalid_string,
			...errorUtil.errToObj(message)
		});
	}
	_addCheck(check) {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	email(message) {
		return this._addCheck({
			kind: "email",
			...errorUtil.errToObj(message)
		});
	}
	url(message) {
		return this._addCheck({
			kind: "url",
			...errorUtil.errToObj(message)
		});
	}
	emoji(message) {
		return this._addCheck({
			kind: "emoji",
			...errorUtil.errToObj(message)
		});
	}
	uuid(message) {
		return this._addCheck({
			kind: "uuid",
			...errorUtil.errToObj(message)
		});
	}
	nanoid(message) {
		return this._addCheck({
			kind: "nanoid",
			...errorUtil.errToObj(message)
		});
	}
	cuid(message) {
		return this._addCheck({
			kind: "cuid",
			...errorUtil.errToObj(message)
		});
	}
	cuid2(message) {
		return this._addCheck({
			kind: "cuid2",
			...errorUtil.errToObj(message)
		});
	}
	ulid(message) {
		return this._addCheck({
			kind: "ulid",
			...errorUtil.errToObj(message)
		});
	}
	base64(message) {
		return this._addCheck({
			kind: "base64",
			...errorUtil.errToObj(message)
		});
	}
	base64url(message) {
		return this._addCheck({
			kind: "base64url",
			...errorUtil.errToObj(message)
		});
	}
	jwt(options) {
		return this._addCheck({
			kind: "jwt",
			...errorUtil.errToObj(options)
		});
	}
	ip(options) {
		return this._addCheck({
			kind: "ip",
			...errorUtil.errToObj(options)
		});
	}
	cidr(options) {
		return this._addCheck({
			kind: "cidr",
			...errorUtil.errToObj(options)
		});
	}
	datetime(options) {
		if (typeof options === "string") return this._addCheck({
			kind: "datetime",
			precision: null,
			offset: false,
			local: false,
			message: options
		});
		return this._addCheck({
			kind: "datetime",
			precision: typeof options?.precision === "undefined" ? null : options?.precision,
			offset: options?.offset ?? false,
			local: options?.local ?? false,
			...errorUtil.errToObj(options?.message)
		});
	}
	date(message) {
		return this._addCheck({
			kind: "date",
			message
		});
	}
	time(options) {
		if (typeof options === "string") return this._addCheck({
			kind: "time",
			precision: null,
			message: options
		});
		return this._addCheck({
			kind: "time",
			precision: typeof options?.precision === "undefined" ? null : options?.precision,
			...errorUtil.errToObj(options?.message)
		});
	}
	duration(message) {
		return this._addCheck({
			kind: "duration",
			...errorUtil.errToObj(message)
		});
	}
	regex(regex, message) {
		return this._addCheck({
			kind: "regex",
			regex,
			...errorUtil.errToObj(message)
		});
	}
	includes(value, options) {
		return this._addCheck({
			kind: "includes",
			value,
			position: options?.position,
			...errorUtil.errToObj(options?.message)
		});
	}
	startsWith(value, message) {
		return this._addCheck({
			kind: "startsWith",
			value,
			...errorUtil.errToObj(message)
		});
	}
	endsWith(value, message) {
		return this._addCheck({
			kind: "endsWith",
			value,
			...errorUtil.errToObj(message)
		});
	}
	min(minLength, message) {
		return this._addCheck({
			kind: "min",
			value: minLength,
			...errorUtil.errToObj(message)
		});
	}
	max(maxLength, message) {
		return this._addCheck({
			kind: "max",
			value: maxLength,
			...errorUtil.errToObj(message)
		});
	}
	length(len, message) {
		return this._addCheck({
			kind: "length",
			value: len,
			...errorUtil.errToObj(message)
		});
	}
	/**
	* Equivalent to `.min(1)`
	*/
	nonempty(message) {
		return this.min(1, errorUtil.errToObj(message));
	}
	trim() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }]
		});
	}
	toLowerCase() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }]
		});
	}
	toUpperCase() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }]
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((ch) => ch.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((ch) => ch.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((ch) => ch.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((ch) => ch.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((ch) => ch.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((ch) => ch.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((ch) => ch.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((ch) => ch.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((ch) => ch.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((ch) => ch.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((ch) => ch.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((ch) => ch.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((ch) => ch.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((ch) => ch.kind === "base64url");
	}
	get minLength() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxLength() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
};
ZodString.create = (params) => {
	return new ZodString({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodString,
		coerce: params?.coerce ?? false,
		...processCreateParams(params)
	});
};
function floatSafeRemainder(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepDecCount = (step.toString().split(".")[1] || "").length;
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
}
var ZodNumber = class ZodNumber extends ZodType {
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
		this.step = this.multipleOf;
	}
	_parse(input) {
		if (this._def.coerce) input.data = Number(input.data);
		if (this._getType(input) !== ZodParsedType.number) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.number,
				received: ctx.parsedType
			});
			return INVALID;
		}
		let ctx = void 0;
		const status = new ParseStatus();
		for (const check of this._def.checks) if (check.kind === "int") {
			if (!util.isInteger(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: "integer",
					received: "float",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "min") {
			if (check.inclusive ? input.data < check.value : input.data <= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "number",
					inclusive: check.inclusive,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (check.inclusive ? input.data > check.value : input.data >= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "number",
					inclusive: check.inclusive,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "multipleOf") {
			if (floatSafeRemainder(input.data, check.value) !== 0) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_multiple_of,
					multipleOf: check.value,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "finite") {
			if (!Number.isFinite(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_finite,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	gte(value, message) {
		return this.setLimit("min", value, true, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, true, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodNumber({
			...this._def,
			checks: [...this._def.checks, {
				kind,
				value,
				inclusive,
				message: errorUtil.toString(message)
			}]
		});
	}
	_addCheck(check) {
		return new ZodNumber({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	int(message) {
		return this._addCheck({
			kind: "int",
			message: errorUtil.toString(message)
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message)
		});
	}
	finite(message) {
		return this._addCheck({
			kind: "finite",
			message: errorUtil.toString(message)
		});
	}
	safe(message) {
		return this._addCheck({
			kind: "min",
			inclusive: true,
			value: Number.MIN_SAFE_INTEGER,
			message: errorUtil.toString(message)
		})._addCheck({
			kind: "max",
			inclusive: true,
			value: Number.MAX_SAFE_INTEGER,
			message: errorUtil.toString(message)
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
	get isInt() {
		return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
	}
	get isFinite() {
		let max = null;
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") return true;
		else if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		} else if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return Number.isFinite(min) && Number.isFinite(max);
	}
};
ZodNumber.create = (params) => {
	return new ZodNumber({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodNumber,
		coerce: params?.coerce || false,
		...processCreateParams(params)
	});
};
var ZodBigInt = class ZodBigInt extends ZodType {
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
	}
	_parse(input) {
		if (this._def.coerce) try {
			input.data = BigInt(input.data);
		} catch {
			return this._getInvalidInput(input);
		}
		if (this._getType(input) !== ZodParsedType.bigint) return this._getInvalidInput(input);
		let ctx = void 0;
		const status = new ParseStatus();
		for (const check of this._def.checks) if (check.kind === "min") {
			if (check.inclusive ? input.data < check.value : input.data <= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					type: "bigint",
					minimum: check.value,
					inclusive: check.inclusive,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (check.inclusive ? input.data > check.value : input.data >= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					type: "bigint",
					maximum: check.value,
					inclusive: check.inclusive,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "multipleOf") {
			if (input.data % check.value !== BigInt(0)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_multiple_of,
					multipleOf: check.value,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	_getInvalidInput(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.bigint,
			received: ctx.parsedType
		});
		return INVALID;
	}
	gte(value, message) {
		return this.setLimit("min", value, true, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, true, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodBigInt({
			...this._def,
			checks: [...this._def.checks, {
				kind,
				value,
				inclusive,
				message: errorUtil.toString(message)
			}]
		});
	}
	_addCheck(check) {
		return new ZodBigInt({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message)
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
};
ZodBigInt.create = (params) => {
	return new ZodBigInt({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodBigInt,
		coerce: params?.coerce ?? false,
		...processCreateParams(params)
	});
};
var ZodBoolean = class extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = Boolean(input.data);
		if (this._getType(input) !== ZodParsedType.boolean) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.boolean,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodBoolean.create = (params) => {
	return new ZodBoolean({
		typeName: ZodFirstPartyTypeKind.ZodBoolean,
		coerce: params?.coerce || false,
		...processCreateParams(params)
	});
};
var ZodDate = class ZodDate extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = new Date(input.data);
		if (this._getType(input) !== ZodParsedType.date) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.date,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (Number.isNaN(input.data.getTime())) {
			addIssueToContext(this._getOrReturnCtx(input), { code: ZodIssueCode.invalid_date });
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = void 0;
		for (const check of this._def.checks) if (check.kind === "min") {
			if (input.data.getTime() < check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					message: check.message,
					inclusive: true,
					exact: false,
					minimum: check.value,
					type: "date"
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (input.data.getTime() > check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					message: check.message,
					inclusive: true,
					exact: false,
					maximum: check.value,
					type: "date"
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: new Date(input.data.getTime())
		};
	}
	_addCheck(check) {
		return new ZodDate({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	min(minDate, message) {
		return this._addCheck({
			kind: "min",
			value: minDate.getTime(),
			message: errorUtil.toString(message)
		});
	}
	max(maxDate, message) {
		return this._addCheck({
			kind: "max",
			value: maxDate.getTime(),
			message: errorUtil.toString(message)
		});
	}
	get minDate() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min != null ? new Date(min) : null;
	}
	get maxDate() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max != null ? new Date(max) : null;
	}
};
ZodDate.create = (params) => {
	return new ZodDate({
		checks: [],
		coerce: params?.coerce || false,
		typeName: ZodFirstPartyTypeKind.ZodDate,
		...processCreateParams(params)
	});
};
var ZodSymbol = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.symbol) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.symbol,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodSymbol.create = (params) => {
	return new ZodSymbol({
		typeName: ZodFirstPartyTypeKind.ZodSymbol,
		...processCreateParams(params)
	});
};
var ZodUndefined = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.undefined,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodUndefined.create = (params) => {
	return new ZodUndefined({
		typeName: ZodFirstPartyTypeKind.ZodUndefined,
		...processCreateParams(params)
	});
};
var ZodNull = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.null) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.null,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodNull.create = (params) => {
	return new ZodNull({
		typeName: ZodFirstPartyTypeKind.ZodNull,
		...processCreateParams(params)
	});
};
var ZodAny = class extends ZodType {
	constructor() {
		super(...arguments);
		this._any = true;
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodAny.create = (params) => {
	return new ZodAny({
		typeName: ZodFirstPartyTypeKind.ZodAny,
		...processCreateParams(params)
	});
};
var ZodUnknown = class extends ZodType {
	constructor() {
		super(...arguments);
		this._unknown = true;
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodUnknown.create = (params) => {
	return new ZodUnknown({
		typeName: ZodFirstPartyTypeKind.ZodUnknown,
		...processCreateParams(params)
	});
};
var ZodNever = class extends ZodType {
	_parse(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.never,
			received: ctx.parsedType
		});
		return INVALID;
	}
};
ZodNever.create = (params) => {
	return new ZodNever({
		typeName: ZodFirstPartyTypeKind.ZodNever,
		...processCreateParams(params)
	});
};
var ZodVoid = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.void,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodVoid.create = (params) => {
	return new ZodVoid({
		typeName: ZodFirstPartyTypeKind.ZodVoid,
		...processCreateParams(params)
	});
};
var ZodArray = class ZodArray extends ZodType {
	_parse(input) {
		const { ctx, status } = this._processInputParams(input);
		const def = this._def;
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (def.exactLength !== null) {
			const tooBig = ctx.data.length > def.exactLength.value;
			const tooSmall = ctx.data.length < def.exactLength.value;
			if (tooBig || tooSmall) {
				addIssueToContext(ctx, {
					code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
					minimum: tooSmall ? def.exactLength.value : void 0,
					maximum: tooBig ? def.exactLength.value : void 0,
					type: "array",
					inclusive: true,
					exact: true,
					message: def.exactLength.message
				});
				status.dirty();
			}
		}
		if (def.minLength !== null) {
			if (ctx.data.length < def.minLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def.minLength.message
				});
				status.dirty();
			}
		}
		if (def.maxLength !== null) {
			if (ctx.data.length > def.maxLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def.maxLength.message
				});
				status.dirty();
			}
		}
		if (ctx.common.async) return Promise.all([...ctx.data].map((item, i) => {
			return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
		})).then((result) => {
			return ParseStatus.mergeArray(status, result);
		});
		const result = [...ctx.data].map((item, i) => {
			return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
		});
		return ParseStatus.mergeArray(status, result);
	}
	get element() {
		return this._def.type;
	}
	min(minLength, message) {
		return new ZodArray({
			...this._def,
			minLength: {
				value: minLength,
				message: errorUtil.toString(message)
			}
		});
	}
	max(maxLength, message) {
		return new ZodArray({
			...this._def,
			maxLength: {
				value: maxLength,
				message: errorUtil.toString(message)
			}
		});
	}
	length(len, message) {
		return new ZodArray({
			...this._def,
			exactLength: {
				value: len,
				message: errorUtil.toString(message)
			}
		});
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodArray.create = (schema, params) => {
	return new ZodArray({
		type: schema,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: ZodFirstPartyTypeKind.ZodArray,
		...processCreateParams(params)
	});
};
function deepPartialify(schema) {
	if (schema instanceof ZodObject) {
		const newShape = {};
		for (const key in schema.shape) {
			const fieldSchema = schema.shape[key];
			newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
		}
		return new ZodObject({
			...schema._def,
			shape: () => newShape
		});
	} else if (schema instanceof ZodArray) return new ZodArray({
		...schema._def,
		type: deepPartialify(schema.element)
	});
	else if (schema instanceof ZodOptional) return ZodOptional.create(deepPartialify(schema.unwrap()));
	else if (schema instanceof ZodNullable) return ZodNullable.create(deepPartialify(schema.unwrap()));
	else if (schema instanceof ZodTuple) return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
	else return schema;
}
var ZodObject = class ZodObject extends ZodType {
	constructor() {
		super(...arguments);
		this._cached = null;
		/**
		* @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
		* If you want to pass through unknown properties, use `.passthrough()` instead.
		*/
		this.nonstrict = this.passthrough;
		/**
		* @deprecated Use `.extend` instead
		*  */
		this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		const shape = this._def.shape();
		const keys = util.objectKeys(shape);
		this._cached = {
			shape,
			keys
		};
		return this._cached;
	}
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.object) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const { status, ctx } = this._processInputParams(input);
		const { shape, keys: shapeKeys } = this._getCached();
		const extraKeys = [];
		if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
			for (const key in ctx.data) if (!shapeKeys.includes(key)) extraKeys.push(key);
		}
		const pairs = [];
		for (const key of shapeKeys) {
			const keyValidator = shape[key];
			const value = ctx.data[key];
			pairs.push({
				key: {
					status: "valid",
					value: key
				},
				value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
				alwaysSet: key in ctx.data
			});
		}
		if (this._def.catchall instanceof ZodNever) {
			const unknownKeys = this._def.unknownKeys;
			if (unknownKeys === "passthrough") for (const key of extraKeys) pairs.push({
				key: {
					status: "valid",
					value: key
				},
				value: {
					status: "valid",
					value: ctx.data[key]
				}
			});
			else if (unknownKeys === "strict") {
				if (extraKeys.length > 0) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.unrecognized_keys,
						keys: extraKeys
					});
					status.dirty();
				}
			} else if (unknownKeys === "strip") {} else throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
		} else {
			const catchall = this._def.catchall;
			for (const key of extraKeys) {
				const value = ctx.data[key];
				pairs.push({
					key: {
						status: "valid",
						value: key
					},
					value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
					alwaysSet: key in ctx.data
				});
			}
		}
		if (ctx.common.async) return Promise.resolve().then(async () => {
			const syncPairs = [];
			for (const pair of pairs) {
				const key = await pair.key;
				const value = await pair.value;
				syncPairs.push({
					key,
					value,
					alwaysSet: pair.alwaysSet
				});
			}
			return syncPairs;
		}).then((syncPairs) => {
			return ParseStatus.mergeObjectSync(status, syncPairs);
		});
		else return ParseStatus.mergeObjectSync(status, pairs);
	}
	get shape() {
		return this._def.shape();
	}
	strict(message) {
		errorUtil.errToObj;
		return new ZodObject({
			...this._def,
			unknownKeys: "strict",
			...message !== void 0 ? { errorMap: (issue, ctx) => {
				const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
				if (issue.code === "unrecognized_keys") return { message: errorUtil.errToObj(message).message ?? defaultError };
				return { message: defaultError };
			} } : {}
		});
	}
	strip() {
		return new ZodObject({
			...this._def,
			unknownKeys: "strip"
		});
	}
	passthrough() {
		return new ZodObject({
			...this._def,
			unknownKeys: "passthrough"
		});
	}
	extend(augmentation) {
		return new ZodObject({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...augmentation
			})
		});
	}
	/**
	* Prior to zod@1.0.12 there was a bug in the
	* inferred type of merged objects. Please
	* upgrade if you are experiencing issues.
	*/
	merge(merging) {
		return new ZodObject({
			unknownKeys: merging._def.unknownKeys,
			catchall: merging._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...merging._def.shape()
			}),
			typeName: ZodFirstPartyTypeKind.ZodObject
		});
	}
	setKey(key, schema) {
		return this.augment({ [key]: schema });
	}
	catchall(index) {
		return new ZodObject({
			...this._def,
			catchall: index
		});
	}
	pick(mask) {
		const shape = {};
		for (const key of util.objectKeys(mask)) if (mask[key] && this.shape[key]) shape[key] = this.shape[key];
		return new ZodObject({
			...this._def,
			shape: () => shape
		});
	}
	omit(mask) {
		const shape = {};
		for (const key of util.objectKeys(this.shape)) if (!mask[key]) shape[key] = this.shape[key];
		return new ZodObject({
			...this._def,
			shape: () => shape
		});
	}
	/**
	* @deprecated
	*/
	deepPartial() {
		return deepPartialify(this);
	}
	partial(mask) {
		const newShape = {};
		for (const key of util.objectKeys(this.shape)) {
			const fieldSchema = this.shape[key];
			if (mask && !mask[key]) newShape[key] = fieldSchema;
			else newShape[key] = fieldSchema.optional();
		}
		return new ZodObject({
			...this._def,
			shape: () => newShape
		});
	}
	required(mask) {
		const newShape = {};
		for (const key of util.objectKeys(this.shape)) if (mask && !mask[key]) newShape[key] = this.shape[key];
		else {
			let newField = this.shape[key];
			while (newField instanceof ZodOptional) newField = newField._def.innerType;
			newShape[key] = newField;
		}
		return new ZodObject({
			...this._def,
			shape: () => newShape
		});
	}
	keyof() {
		return createZodEnum(util.objectKeys(this.shape));
	}
};
ZodObject.create = (shape, params) => {
	return new ZodObject({
		shape: () => shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
ZodObject.strictCreate = (shape, params) => {
	return new ZodObject({
		shape: () => shape,
		unknownKeys: "strict",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
ZodObject.lazycreate = (shape, params) => {
	return new ZodObject({
		shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
var ZodUnion = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const options = this._def.options;
		function handleResults(results) {
			for (const result of results) if (result.result.status === "valid") return result.result;
			for (const result of results) if (result.result.status === "dirty") {
				ctx.common.issues.push(...result.ctx.common.issues);
				return result.result;
			}
			const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors
			});
			return INVALID;
		}
		if (ctx.common.async) return Promise.all(options.map(async (option) => {
			const childCtx = {
				...ctx,
				common: {
					...ctx.common,
					issues: []
				},
				parent: null
			};
			return {
				result: await option._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: childCtx
				}),
				ctx: childCtx
			};
		})).then(handleResults);
		else {
			let dirty = void 0;
			const issues = [];
			for (const option of options) {
				const childCtx = {
					...ctx,
					common: {
						...ctx.common,
						issues: []
					},
					parent: null
				};
				const result = option._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: childCtx
				});
				if (result.status === "valid") return result;
				else if (result.status === "dirty" && !dirty) dirty = {
					result,
					ctx: childCtx
				};
				if (childCtx.common.issues.length) issues.push(childCtx.common.issues);
			}
			if (dirty) {
				ctx.common.issues.push(...dirty.ctx.common.issues);
				return dirty.result;
			}
			const unionErrors = issues.map((issues) => new ZodError(issues));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors
			});
			return INVALID;
		}
	}
	get options() {
		return this._def.options;
	}
};
ZodUnion.create = (types, params) => {
	return new ZodUnion({
		options: types,
		typeName: ZodFirstPartyTypeKind.ZodUnion,
		...processCreateParams(params)
	});
};
var getDiscriminator = (type) => {
	if (type instanceof ZodLazy) return getDiscriminator(type.schema);
	else if (type instanceof ZodEffects) return getDiscriminator(type.innerType());
	else if (type instanceof ZodLiteral) return [type.value];
	else if (type instanceof ZodEnum) return type.options;
	else if (type instanceof ZodNativeEnum) return util.objectValues(type.enum);
	else if (type instanceof ZodDefault) return getDiscriminator(type._def.innerType);
	else if (type instanceof ZodUndefined) return [void 0];
	else if (type instanceof ZodNull) return [null];
	else if (type instanceof ZodOptional) return [void 0, ...getDiscriminator(type.unwrap())];
	else if (type instanceof ZodNullable) return [null, ...getDiscriminator(type.unwrap())];
	else if (type instanceof ZodBranded) return getDiscriminator(type.unwrap());
	else if (type instanceof ZodReadonly) return getDiscriminator(type.unwrap());
	else if (type instanceof ZodCatch) return getDiscriminator(type._def.innerType);
	else return [];
};
var ZodDiscriminatedUnion = class ZodDiscriminatedUnion extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const discriminator = this.discriminator;
		const discriminatorValue = ctx.data[discriminator];
		const option = this.optionsMap.get(discriminatorValue);
		if (!option) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union_discriminator,
				options: Array.from(this.optionsMap.keys()),
				path: [discriminator]
			});
			return INVALID;
		}
		if (ctx.common.async) return option._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
		else return option._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	/**
	* The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
	* However, it only allows a union of objects, all of which need to share a discriminator property. This property must
	* have a different value for each object in the union.
	* @param discriminator the name of the discriminator property
	* @param types an array of object schemas
	* @param params
	*/
	static create(discriminator, options, params) {
		const optionsMap = /* @__PURE__ */ new Map();
		for (const type of options) {
			const discriminatorValues = getDiscriminator(type.shape[discriminator]);
			if (!discriminatorValues.length) throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
			for (const value of discriminatorValues) {
				if (optionsMap.has(value)) throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
				optionsMap.set(value, type);
			}
		}
		return new ZodDiscriminatedUnion({
			typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
			discriminator,
			options,
			optionsMap,
			...processCreateParams(params)
		});
	}
};
function mergeValues(a, b) {
	const aType = getParsedType(a);
	const bType = getParsedType(b);
	if (a === b) return {
		valid: true,
		data: a
	};
	else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
		const bKeys = util.objectKeys(b);
		const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return { valid: false };
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
		if (a.length !== b.length) return { valid: false };
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return { valid: false };
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	} else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) return {
		valid: true,
		data: a
	};
	else return { valid: false };
}
var ZodIntersection = class extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const handleParsed = (parsedLeft, parsedRight) => {
			if (isAborted(parsedLeft) || isAborted(parsedRight)) return INVALID;
			const merged = mergeValues(parsedLeft.value, parsedRight.value);
			if (!merged.valid) {
				addIssueToContext(ctx, { code: ZodIssueCode.invalid_intersection_types });
				return INVALID;
			}
			if (isDirty(parsedLeft) || isDirty(parsedRight)) status.dirty();
			return {
				status: status.value,
				value: merged.data
			};
		};
		if (ctx.common.async) return Promise.all([this._def.left._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}), this._def.right._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		})]).then(([left, right]) => handleParsed(left, right));
		else return handleParsed(this._def.left._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}), this._def.right._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}));
	}
};
ZodIntersection.create = (left, right, params) => {
	return new ZodIntersection({
		left,
		right,
		typeName: ZodFirstPartyTypeKind.ZodIntersection,
		...processCreateParams(params)
	});
};
var ZodTuple = class ZodTuple extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (ctx.data.length < this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_small,
				minimum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array"
			});
			return INVALID;
		}
		if (!this._def.rest && ctx.data.length > this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_big,
				maximum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array"
			});
			status.dirty();
		}
		const items = [...ctx.data].map((item, itemIndex) => {
			const schema = this._def.items[itemIndex] || this._def.rest;
			if (!schema) return null;
			return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
		}).filter((x) => !!x);
		if (ctx.common.async) return Promise.all(items).then((results) => {
			return ParseStatus.mergeArray(status, results);
		});
		else return ParseStatus.mergeArray(status, items);
	}
	get items() {
		return this._def.items;
	}
	rest(rest) {
		return new ZodTuple({
			...this._def,
			rest
		});
	}
};
ZodTuple.create = (schemas, params) => {
	if (!Array.isArray(schemas)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new ZodTuple({
		items: schemas,
		typeName: ZodFirstPartyTypeKind.ZodTuple,
		rest: null,
		...processCreateParams(params)
	});
};
var ZodRecord = class ZodRecord extends ZodType {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const pairs = [];
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		for (const key in ctx.data) pairs.push({
			key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
			value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
			alwaysSet: key in ctx.data
		});
		if (ctx.common.async) return ParseStatus.mergeObjectAsync(status, pairs);
		else return ParseStatus.mergeObjectSync(status, pairs);
	}
	get element() {
		return this._def.valueType;
	}
	static create(first, second, third) {
		if (second instanceof ZodType) return new ZodRecord({
			keyType: first,
			valueType: second,
			typeName: ZodFirstPartyTypeKind.ZodRecord,
			...processCreateParams(third)
		});
		return new ZodRecord({
			keyType: ZodString.create(),
			valueType: first,
			typeName: ZodFirstPartyTypeKind.ZodRecord,
			...processCreateParams(second)
		});
	}
};
var ZodMap = class extends ZodType {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.map) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.map,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		const pairs = [...ctx.data.entries()].map(([key, value], index) => {
			return {
				key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
				value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
			};
		});
		if (ctx.common.async) {
			const finalMap = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (const pair of pairs) {
					const key = await pair.key;
					const value = await pair.value;
					if (key.status === "aborted" || value.status === "aborted") return INVALID;
					if (key.status === "dirty" || value.status === "dirty") status.dirty();
					finalMap.set(key.value, value.value);
				}
				return {
					status: status.value,
					value: finalMap
				};
			});
		} else {
			const finalMap = /* @__PURE__ */ new Map();
			for (const pair of pairs) {
				const key = pair.key;
				const value = pair.value;
				if (key.status === "aborted" || value.status === "aborted") return INVALID;
				if (key.status === "dirty" || value.status === "dirty") status.dirty();
				finalMap.set(key.value, value.value);
			}
			return {
				status: status.value,
				value: finalMap
			};
		}
	}
};
ZodMap.create = (keyType, valueType, params) => {
	return new ZodMap({
		valueType,
		keyType,
		typeName: ZodFirstPartyTypeKind.ZodMap,
		...processCreateParams(params)
	});
};
var ZodSet = class ZodSet extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.set) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.set,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const def = this._def;
		if (def.minSize !== null) {
			if (ctx.data.size < def.minSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def.minSize.message
				});
				status.dirty();
			}
		}
		if (def.maxSize !== null) {
			if (ctx.data.size > def.maxSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def.maxSize.message
				});
				status.dirty();
			}
		}
		const valueType = this._def.valueType;
		function finalizeSet(elements) {
			const parsedSet = /* @__PURE__ */ new Set();
			for (const element of elements) {
				if (element.status === "aborted") return INVALID;
				if (element.status === "dirty") status.dirty();
				parsedSet.add(element.value);
			}
			return {
				status: status.value,
				value: parsedSet
			};
		}
		const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
		if (ctx.common.async) return Promise.all(elements).then((elements) => finalizeSet(elements));
		else return finalizeSet(elements);
	}
	min(minSize, message) {
		return new ZodSet({
			...this._def,
			minSize: {
				value: minSize,
				message: errorUtil.toString(message)
			}
		});
	}
	max(maxSize, message) {
		return new ZodSet({
			...this._def,
			maxSize: {
				value: maxSize,
				message: errorUtil.toString(message)
			}
		});
	}
	size(size, message) {
		return this.min(size, message).max(size, message);
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodSet.create = (valueType, params) => {
	return new ZodSet({
		valueType,
		minSize: null,
		maxSize: null,
		typeName: ZodFirstPartyTypeKind.ZodSet,
		...processCreateParams(params)
	});
};
var ZodFunction = class ZodFunction extends ZodType {
	constructor() {
		super(...arguments);
		this.validate = this.implement;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.function) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.function,
				received: ctx.parsedType
			});
			return INVALID;
		}
		function makeArgsIssue(args, error) {
			return makeIssue({
				data: args,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					getErrorMap(),
					errorMap
				].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_arguments,
					argumentsError: error
				}
			});
		}
		function makeReturnsIssue(returns, error) {
			return makeIssue({
				data: returns,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					getErrorMap(),
					errorMap
				].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_return_type,
					returnTypeError: error
				}
			});
		}
		const params = { errorMap: ctx.common.contextualErrorMap };
		const fn = ctx.data;
		if (this._def.returns instanceof ZodPromise) {
			const me = this;
			return OK(async function(...args) {
				const error = new ZodError([]);
				const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
					error.addIssue(makeArgsIssue(args, e));
					throw error;
				});
				const result = await Reflect.apply(fn, this, parsedArgs);
				return await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
					error.addIssue(makeReturnsIssue(result, e));
					throw error;
				});
			});
		} else {
			const me = this;
			return OK(function(...args) {
				const parsedArgs = me._def.args.safeParse(args, params);
				if (!parsedArgs.success) throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
				const result = Reflect.apply(fn, this, parsedArgs.data);
				const parsedReturns = me._def.returns.safeParse(result, params);
				if (!parsedReturns.success) throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
				return parsedReturns.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...items) {
		return new ZodFunction({
			...this._def,
			args: ZodTuple.create(items).rest(ZodUnknown.create())
		});
	}
	returns(returnType) {
		return new ZodFunction({
			...this._def,
			returns: returnType
		});
	}
	implement(func) {
		return this.parse(func);
	}
	strictImplement(func) {
		return this.parse(func);
	}
	static create(args, returns, params) {
		return new ZodFunction({
			args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
			returns: returns || ZodUnknown.create(),
			typeName: ZodFirstPartyTypeKind.ZodFunction,
			...processCreateParams(params)
		});
	}
};
var ZodLazy = class extends ZodType {
	get schema() {
		return this._def.getter();
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		return this._def.getter()._parse({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
	}
};
ZodLazy.create = (getter, params) => {
	return new ZodLazy({
		getter,
		typeName: ZodFirstPartyTypeKind.ZodLazy,
		...processCreateParams(params)
	});
};
var ZodLiteral = class extends ZodType {
	_parse(input) {
		if (input.data !== this._def.value) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_literal,
				expected: this._def.value
			});
			return INVALID;
		}
		return {
			status: "valid",
			value: input.data
		};
	}
	get value() {
		return this._def.value;
	}
};
ZodLiteral.create = (value, params) => {
	return new ZodLiteral({
		value,
		typeName: ZodFirstPartyTypeKind.ZodLiteral,
		...processCreateParams(params)
	});
};
function createZodEnum(values, params) {
	return new ZodEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodEnum,
		...processCreateParams(params)
	});
}
var ZodEnum = class ZodEnum extends ZodType {
	_parse(input) {
		if (typeof input.data !== "string") {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type
			});
			return INVALID;
		}
		if (!this._cache) this._cache = new Set(this._def.values);
		if (!this._cache.has(input.data)) {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	get Values() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	get Enum() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	extract(values, newDef = this._def) {
		return ZodEnum.create(values, {
			...this._def,
			...newDef
		});
	}
	exclude(values, newDef = this._def) {
		return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
			...this._def,
			...newDef
		});
	}
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
	_parse(input) {
		const nativeEnumValues = util.getValidEnumValues(this._def.values);
		const ctx = this._getOrReturnCtx(input);
		if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type
			});
			return INVALID;
		}
		if (!this._cache) this._cache = new Set(util.getValidEnumValues(this._def.values));
		if (!this._cache.has(input.data)) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get enum() {
		return this._def.values;
	}
};
ZodNativeEnum.create = (values, params) => {
	return new ZodNativeEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
		...processCreateParams(params)
	});
};
var ZodPromise = class extends ZodType {
	unwrap() {
		return this._def.type;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.promise,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK((ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data)).then((data) => {
			return this._def.type.parseAsync(data, {
				path: ctx.path,
				errorMap: ctx.common.contextualErrorMap
			});
		}));
	}
};
ZodPromise.create = (schema, params) => {
	return new ZodPromise({
		type: schema,
		typeName: ZodFirstPartyTypeKind.ZodPromise,
		...processCreateParams(params)
	});
};
var ZodEffects = class extends ZodType {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const effect = this._def.effect || null;
		const checkCtx = {
			addIssue: (arg) => {
				addIssueToContext(ctx, arg);
				if (arg.fatal) status.abort();
				else status.dirty();
			},
			get path() {
				return ctx.path;
			}
		};
		checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
		if (effect.type === "preprocess") {
			const processed = effect.transform(ctx.data, checkCtx);
			if (ctx.common.async) return Promise.resolve(processed).then(async (processed) => {
				if (status.value === "aborted") return INVALID;
				const result = await this._def.schema._parseAsync({
					data: processed,
					path: ctx.path,
					parent: ctx
				});
				if (result.status === "aborted") return INVALID;
				if (result.status === "dirty") return DIRTY(result.value);
				if (status.value === "dirty") return DIRTY(result.value);
				return result;
			});
			else {
				if (status.value === "aborted") return INVALID;
				const result = this._def.schema._parseSync({
					data: processed,
					path: ctx.path,
					parent: ctx
				});
				if (result.status === "aborted") return INVALID;
				if (result.status === "dirty") return DIRTY(result.value);
				if (status.value === "dirty") return DIRTY(result.value);
				return result;
			}
		}
		if (effect.type === "refinement") {
			const executeRefinement = (acc) => {
				const result = effect.refinement(acc, checkCtx);
				if (ctx.common.async) return Promise.resolve(result);
				if (result instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				return acc;
			};
			if (ctx.common.async === false) {
				const inner = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (inner.status === "aborted") return INVALID;
				if (inner.status === "dirty") status.dirty();
				executeRefinement(inner.value);
				return {
					status: status.value,
					value: inner.value
				};
			} else return this._def.schema._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			}).then((inner) => {
				if (inner.status === "aborted") return INVALID;
				if (inner.status === "dirty") status.dirty();
				return executeRefinement(inner.value).then(() => {
					return {
						status: status.value,
						value: inner.value
					};
				});
			});
		}
		if (effect.type === "transform") if (ctx.common.async === false) {
			const base = this._def.schema._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			});
			if (!isValid(base)) return INVALID;
			const result = effect.transform(base.value, checkCtx);
			if (result instanceof Promise) throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
			return {
				status: status.value,
				value: result
			};
		} else return this._def.schema._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}).then((base) => {
			if (!isValid(base)) return INVALID;
			return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
				status: status.value,
				value: result
			}));
		});
		util.assertNever(effect);
	}
};
ZodEffects.create = (schema, effect, params) => {
	return new ZodEffects({
		schema,
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		effect,
		...processCreateParams(params)
	});
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
	return new ZodEffects({
		schema,
		effect: {
			type: "preprocess",
			transform: preprocess
		},
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		...processCreateParams(params)
	});
};
var ZodOptional = class extends ZodType {
	_parse(input) {
		if (this._getType(input) === ZodParsedType.undefined) return OK(void 0);
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodOptional.create = (type, params) => {
	return new ZodOptional({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodOptional,
		...processCreateParams(params)
	});
};
var ZodNullable = class extends ZodType {
	_parse(input) {
		if (this._getType(input) === ZodParsedType.null) return OK(null);
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodNullable.create = (type, params) => {
	return new ZodNullable({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodNullable,
		...processCreateParams(params)
	});
};
var ZodDefault = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		let data = ctx.data;
		if (ctx.parsedType === ZodParsedType.undefined) data = this._def.defaultValue();
		return this._def.innerType._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
ZodDefault.create = (type, params) => {
	return new ZodDefault({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodDefault,
		defaultValue: typeof params.default === "function" ? params.default : () => params.default,
		...processCreateParams(params)
	});
};
var ZodCatch = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const newCtx = {
			...ctx,
			common: {
				...ctx.common,
				issues: []
			}
		};
		const result = this._def.innerType._parse({
			data: newCtx.data,
			path: newCtx.path,
			parent: { ...newCtx }
		});
		if (isAsync(result)) return result.then((result) => {
			return {
				status: "valid",
				value: result.status === "valid" ? result.value : this._def.catchValue({
					get error() {
						return new ZodError(newCtx.common.issues);
					},
					input: newCtx.data
				})
			};
		});
		else return {
			status: "valid",
			value: result.status === "valid" ? result.value : this._def.catchValue({
				get error() {
					return new ZodError(newCtx.common.issues);
				},
				input: newCtx.data
			})
		};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
ZodCatch.create = (type, params) => {
	return new ZodCatch({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodCatch,
		catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
		...processCreateParams(params)
	});
};
var ZodNaN = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.nan) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.nan,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return {
			status: "valid",
			value: input.data
		};
	}
};
ZodNaN.create = (params) => {
	return new ZodNaN({
		typeName: ZodFirstPartyTypeKind.ZodNaN,
		...processCreateParams(params)
	});
};
var ZodBranded = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const data = ctx.data;
		return this._def.type._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
	}
	unwrap() {
		return this._def.type;
	}
};
var ZodPipeline = class ZodPipeline extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.common.async) {
			const handleAsync = async () => {
				const inResult = await this._def.in._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (inResult.status === "aborted") return INVALID;
				if (inResult.status === "dirty") {
					status.dirty();
					return DIRTY(inResult.value);
				} else return this._def.out._parseAsync({
					data: inResult.value,
					path: ctx.path,
					parent: ctx
				});
			};
			return handleAsync();
		} else {
			const inResult = this._def.in._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			});
			if (inResult.status === "aborted") return INVALID;
			if (inResult.status === "dirty") {
				status.dirty();
				return {
					status: "dirty",
					value: inResult.value
				};
			} else return this._def.out._parseSync({
				data: inResult.value,
				path: ctx.path,
				parent: ctx
			});
		}
	}
	static create(a, b) {
		return new ZodPipeline({
			in: a,
			out: b,
			typeName: ZodFirstPartyTypeKind.ZodPipeline
		});
	}
};
var ZodReadonly = class extends ZodType {
	_parse(input) {
		const result = this._def.innerType._parse(input);
		const freeze = (data) => {
			if (isValid(data)) data.value = Object.freeze(data.value);
			return data;
		};
		return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodReadonly.create = (type, params) => {
	return new ZodReadonly({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodReadonly,
		...processCreateParams(params)
	});
};
ZodObject.lazycreate;
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind) {
	ZodFirstPartyTypeKind["ZodString"] = "ZodString";
	ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
	ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
	ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
	ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
	ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
	ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
	ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
	ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
	ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
	ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
	ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
	ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
	ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
	ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
	ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
	ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
	ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
	ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
	ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
	ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
	ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
	ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
	ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
	ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
	ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
	ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
	ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
	ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
	ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
	ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
	ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
	ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
	ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
	ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
	ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var stringType = ZodString.create;
ZodNumber.create;
ZodNaN.create;
ZodBigInt.create;
ZodBoolean.create;
ZodDate.create;
ZodSymbol.create;
ZodUndefined.create;
ZodNull.create;
ZodAny.create;
ZodUnknown.create;
ZodNever.create;
ZodVoid.create;
ZodArray.create;
var objectType = ZodObject.create;
ZodObject.strictCreate;
ZodUnion.create;
ZodDiscriminatedUnion.create;
ZodIntersection.create;
ZodTuple.create;
ZodRecord.create;
ZodMap.create;
ZodSet.create;
ZodFunction.create;
ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
ZodNativeEnum.create;
ZodPromise.create;
ZodEffects.create;
ZodOptional.create;
ZodNullable.create;
ZodEffects.createWithPreprocess;
ZodPipeline.create;
//#endregion
//#region lib/contact.ts
function normalizeContact(value, preferred) {
	let text = value.trim();
	if (/^(https?:\/\/)?(?:www\.)?t\.me\//i.test(text)) try {
		const u = new URL(/^https?:/i.test(text) ? text : "https://" + text);
		if (!["t.me", "www.t.me"].includes(u.hostname) || u.search || u.hash) return null;
		text = u.pathname.replace(/^\//, "").replace(/\/$/, "");
	} catch {
		return null;
	}
	if (/^\+?[\d\s()-]+$/.test(text)) {
		const digits = text.replace(/\D/g, "");
		if (digits.length >= 10 && digits.length <= 15) return {
			contact: (text.startsWith("+") ? "+" : "") + digits,
			channel: "Телефон"
		};
		return null;
	}
	if (/^@?[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(text)) return {
		contact: "@" + text.replace(/^@/, ""),
		channel: "Telegram"
	};
	return null;
}
//#endregion
//#region lib/lead-schema.ts
var leadSchema = objectType({
	requestId: stringType().uuid().optional(),
	name: stringType().trim().max(80).default(""),
	contact: stringType().trim().min(5).max(100),
	channel: enumType(["Telegram", "Телефон"]).default("Telegram"),
	service: enumType([
		"Alipay",
		"WeChat",
		"1688",
		"Taobao",
		"Поставщик",
		"Карго",
		"Консультация"
	]),
	details: stringType().trim().max(4e3).default(""),
	consent: literalType(true),
	consentVersion: literalType("2026-11-03"),
	website: stringType().max(0).default(""),
	attribution: objectType({
		utm_source: stringType().max(200).optional(),
		utm_medium: stringType().max(200).optional(),
		utm_campaign: stringType().max(200).optional(),
		utm_content: stringType().max(200).optional(),
		utm_term: stringType().max(200).optional(),
		yclid: stringType().max(200).optional()
	}).default({})
}).superRefine((v, ctx) => {
	if (!normalizeContact(v.contact, v.channel)) ctx.addIssue({
		code: "custom",
		path: ["contact"],
		message: "Укажите Telegram или телефон с кодом страны"
	});
}).transform((v) => ({
	...v,
	...normalizeContact(v.contact, v.channel)
}));
//#endregion
//#region lib/public-launch.ts
function siteOrigin$1(value) {
	try {
		const url = new URL(value || "");
		return url.protocol === "https:" && url.pathname === "/" && !url.search && !url.hash ? url.origin : "";
	} catch {
		return "";
	}
}
function publicLaunchReady(env = process.env, _delivery) {
	const telegramUrl = (() => {
		try {
			const url = new URL(env.TELEGRAM_URL || "");
			return url.protocol === "https:" && (url.hostname === "t.me" || url.hostname.endsWith(".t.me"));
		} catch {
			return false;
		}
	})();
	const proxy = (() => {
		try {
			const url = new URL(env.TELEGRAM_PROXY_URL || "");
			return url.protocol === "socks5h:" && Boolean(url.hostname) && Number(url.port) > 0;
		} catch {
			return false;
		}
	})();
	return env.PUBLIC_LAUNCH === "true" && Boolean(siteOrigin$1(env.SITE_URL)) && /^\d{5,12}$/.test(env.METRIKA_ID || "") && telegramUrl && Boolean(env.TELEGRAM_BOT_TOKEN) && /^-?\d+$/.test(env.TELEGRAM_CHAT_ID || "") && proxy;
}
//#endregion
//#region lib/articles.ts
var articles = [
	{
		slug: "alipay-wechat-pered-popolneniem",
		title: "Alipay и WeChat: что подготовить перед пополнением",
		shortTitle: "Alipay и WeChat: с чего начать",
		category: "Платежи",
		excerpt: "Чем пополнение отличается от оплаты покупки, какие данные понадобятся и почему не нужно передавать доступ к кошельку.",
		readTime: "4 мин",
		art: "wallet",
		kicker: "КОШЕЛЁК · ПЛАТЁЖ · РЕКВИЗИТЫ",
		service: "Alipay",
		sections: [
			{
				id: "task",
				title: "Сначала — задача, затем — способ оплаты",
				paragraphs: ["«Нужны юани в Alipay» может означать несколько разных задач: пополнить баланс, оплатить конкретный заказ или рассчитаться с продавцом. Их лучше разделить уже в первом сообщении. Тогда расчёт будет относиться к нужной операции, а не просто к сумме в юанях.", "Alipay и Weixin Pay используются для мобильных платежей в Китае. В официальных руководствах для иностранных посетителей описаны оплата по QR-коду и привязка подходящих международных карт. Это не означает, что пополнение баланса, перевод другому человеку и оплата продавцу доступны на одинаковых условиях. Возможности конкретного аккаунта нужно уточнять отдельно."]
			},
			{
				id: "prepare",
				title: "Что указать в заявке",
				paragraphs: ["Для первого расчёта достаточно краткого описания задачи. Подробные реквизиты стоит передавать после согласования подходящего способа операции."],
				list: [
					"Выбранный сервис: Alipay или WeChat.",
					"Нужная сумма в CNY либо бюджет в рублях.",
					"Назначение: баланс кошелька, конкретная покупка или оплата продавцу.",
					"Срок, к которому нужна операция.",
					"Контакт, по которому удобно уточнить детали."
				],
				note: "В КЛЕВЕР предварительные заявки на платежи и выкуп принимаются от 10 000 ₽. Калькулятор использует расчётный курс 12,79 RUB/CNY; актуальные условия подтвердит менеджер."
			},
			{
				id: "codes",
				title: "QR-код для получения и код для оплаты — разные вещи",
				paragraphs: ["В официальных инструкциях описаны два сценария покупки: вы сканируете код продавца или показываете свой платёжный код кассиру. Поэтому фраза «пришлите QR» без уточнения назначения недостаточна. Сначала согласуйте, какой именно код и для какой операции требуется.", "Не пересылайте код для списания средств вместо реквизитов для получения. Если сомневаетесь, уточните название экрана и назначение кода, не раскрывая секретные данные."]
			},
			{
				id: "confirm",
				title: "Что согласовать до перевода",
				paragraphs: ["Зафиксируйте итоговую сумму к оплате, сумму получателю, комиссию, ожидаемый срок и условия изменения курса. После выполнения операции сохраните подтверждение и проверьте результат в своём приложении.", "Пароль, код из SMS и доступ к вашему аккаунту не являются данными для расчёта заявки. Подтверждения внутри приложения выполняйте самостоятельно. Ограничения, доступность карты и окончательные условия проверяйте в своём платёжном сервисе."]
			}
		],
		sources: [{
			label: "Официальный портал Шанхая: мобильные платежи для иностранных посетителей",
			url: "https://english.shanghai.gov.cn/en-Individuals-BankingandPayments-Payments/20260920/4fc94c2f0e6b47e7939969415e5feb04.html"
		}, {
			label: "Правительство Пекина: особенности привязки карт и оплаты",
			url: "https://english.beijing.gov.cn/specials/aguidetoworkingandlivinginchinaasbusinessexpatriates2024/dailylifeservices/202404/t20240424_3635122.html"
		}]
	},
	{
		slug: "1688-ili-taobao",
		title: "1688 или Taobao: как выбрать площадку под свою закупку",
		shortTitle: "1688 или Taobao: что выбрать",
		category: "Закупки",
		excerpt: "Оптовая партия, отдельные товары и тестовая закупка: на какие параметры смотреть кроме цены в карточке.",
		readTime: "4 мин",
		art: "markets",
		kicker: "ДВЕ ПЛОЩАДКИ · РАЗНЫЕ ЗАДАЧИ",
		service: "1688",
		sections: [
			{
				id: "difference",
				title: "Главное различие — в исходной задаче",
				paragraphs: ["Alibaba Group описывает 1688 как внутреннюю оптовую площадку Китая, а Taobao — как розничную потребительскую платформу. Это полезная отправная точка для поиска, но не гарантия условий конкретного продавца.", "Для регулярной закупки партии можно начать сравнение с 1688. Для отдельных товаров и подбора ассортимента можно посмотреть Taobao. Затем нужно открыть конкретные предложения и сравнить количество, комплектацию, упаковку и условия отгрузки."]
			},
			{
				id: "compare",
				title: "Сравнивайте одинаковые комплектации",
				paragraphs: ["Две похожие фотографии ещё не означают одинаковый товар. В карточке могут быть несколько размеров, материалов и наборов. До расчёта сохраните ссылку и выбранный вариант, чтобы цена относилась к нужной позиции."],
				list: [
					"Ссылка на карточку и название продавца.",
					"Артикул, цвет, размер, материал и комплектация.",
					"Количество по каждому варианту.",
					"Цена для выбранного количества и минимальная партия.",
					"Вес, размеры упаковки и условия отправки."
				]
			},
			{
				id: "cost",
				title: "Цена товара — только одна строка бюджета",
				paragraphs: ["Для собственной таблицы сравнения разделите расходы: товар, доставка до склада в Китае, услуга выкупа, упаковка, международная перевозка и получение в вашем городе. Если какая-то строка ещё неизвестна, так и отметьте её, вместо того чтобы считать нулевой.", "Недорогой объёмный товар может потребовать заметных расходов на перевозку. Поэтому окончательный выбор стоит делать после оценки всей партии, а не только по самой низкой цене в карточке."]
			},
			{
				id: "order",
				title: "Как подготовить запрос на выкуп",
				paragraphs: ["Удобнее собрать позиции в один список: ссылка, вариант, количество, допустимые замены и комментарий. Добавьте город получения и желаемый срок. Если качество нужно оценить до закупки основной партии, отдельно укажите запрос на образец.", "В КЛЕВЕР можно начать со ссылок на товары. Возможность выкупа, актуальную цену и состав услуг подтвердим после проверки запроса. Доставка рассчитывается отдельно; предварительный ориентир можно получить в карго-калькуляторе."],
				note: "Описания площадок приведены по материалам Alibaba Group. Условия конкретных заказов проверяются у продавца и в интерфейсе площадки."
			}
		],
		sources: [{
			label: "Alibaba Group: о площадке 1688",
			url: "https://home.alibabagroup.com/en-US/about-alibaba-businesses-1941299332078632960"
		}, {
			label: "Alibaba Group: о площадке Taobao",
			url: "https://home.alibabagroup.com/en-US/about-alibaba-businesses-1744508703945523200"
		}]
	},
	{
		slug: "pervaya-zakupka-v-kitae",
		title: "Первая закупка в Китае: от ссылки на товар до готовой партии",
		shortTitle: "Первая закупка без путаницы",
		category: "Закупки",
		excerpt: "Практический план: собрать спецификацию, разделить расходы и договориться о проверке до отправки.",
		readTime: "5 мин",
		art: "purchase",
		kicker: "ПЛАН ПЕРВОЙ ПАРТИИ",
		service: "Консультация",
		sections: [
			{
				id: "spec",
				title: "Соберите одну версию заказа",
				paragraphs: ["Когда ссылки, размеры и количества разбросаны по разным сообщениям, легко посчитать не тот вариант. Начните с единого списка. Для каждой позиции укажите ссылку, выбранную модификацию и количество. Скриншот полезен как дополнение, но не заменяет ссылку и описание.", "Отдельно пометьте, что нельзя менять без согласования: материал, цвет, маркировку, комплектность или тип упаковки. Если возможна замена, опишите допустимые варианты заранее."]
			},
			{
				id: "budget",
				title: "Разделите бюджет на этапы",
				paragraphs: ["Не смешивайте оплату товара и логистику в одну неподписанную сумму. Сначала уточните стоимость товара и выкупа. Затем — доставку до склада, упаковку, перевозку и получение. По каждой строке должно быть понятно, известна она уже или будет определена позже."],
				list: [
					"Товар: количество, цена и валюта.",
					"Выкуп и сопутствующие услуги: состав и стоимость.",
					"Доставка по Китаю: кто оплачивает и куда везут.",
					"Приёмка, проверка, консолидация и упаковка.",
					"Международная перевозка и расходы по прибытию."
				]
			},
			{
				id: "inspection",
				title: "Уточните, что означает «проверить товар»",
				paragraphs: ["Пересчитать коробки, сверить артикулы и протестировать каждое изделие — разные объёмы работы. До отправки согласуйте, что именно нужно проверить: количество мест, внешний вид, размеры, маркировку, комплектность или работоспособность.", "Укажите, какие фотографии нужны и кто принимает решение при обнаружении расхождений. Также полезно определить, можно ли отправлять остальную партию, если одна позиция требует уточнения."],
				note: "Этот список — ориентир для подготовки задачи. Конкретный объём проверки и возможность её выполнения согласуются отдельно."
			},
			{
				id: "dispatch",
				title: "Перед отправкой сверьте итоговые данные",
				paragraphs: ["Для логистики нужны фактический вес и объём уже упакованной партии. Если упаковка изменилась, первоначальный ориентир может потребовать пересчёта. Уточните число мест, способ перевозки и состав итоговой суммы.", "Для передачи заявки в КЛЕВЕР можно использовать простой шаблон: «Товар — …; ссылки — …; количество — …; город получения — …; нужен выкуп / только доставка; особенности — …». Такой запрос помогает быстрее перейти к предметному расчёту."]
			}
		]
	},
	{
		slug: "obyomnyy-ves-gruza",
		title: "Объёмный вес: почему лёгкая коробка может стоить дороже",
		shortTitle: "За что платят в карго: вес или объём?",
		category: "Логистика",
		excerpt: "Разбираем понятный пример и показываем, как упаковка и способ перевозки влияют на предварительную смету.",
		readTime: "4 мин",
		art: "cargo",
		kicker: "КИЛОГРАММЫ · КУБОМЕТРЫ · УПАКОВКА",
		service: "Карго",
		sections: [
			{
				id: "why",
				title: "Груз занимает место, даже если мало весит",
				paragraphs: ["У партии есть как минимум два параметра: масса в килограммах и объём упаковки в кубометрах. Лёгкие крупные коробки могут занимать столько же места, сколько тяжёлый компактный груз. Поэтому в схемах с объёмным весом сравнивают фактическую массу и расчётный эквивалент объёма.", "В калькуляторе КЛЕВЕР оплачиваемый вес равен большему из двух значений. Это модель предварительного расчёта, а не универсальное правило всех перевозчиков: окончательный способ тарификации согласуется для вашего груза."]
			},
			{
				id: "example",
				title: "Пример на одной коробке",
				paragraphs: ["Возьмём груз весом 20 кг и объёмом 1 м³. В демонстрационном авторасчёте используется коэффициент 200 кг/м³. Объёмный вес получается 1 × 200 = 200 кг. В этой модели перевозка считается по 200 кг, поскольку это больше фактических 20 кг.", "У плотного груза ситуация обратная: 300 кг при том же объёме 1 м³ дадут оплачиваемый вес 300 кг. Важно сравнивать оба параметра, а не ориентироваться только на весы."],
				note: "Числа приведены для объяснения работы калькулятора. Коэффициенты и тарифы приватной версии демонстрационные и не являются предложением перевозки."
			},
			{
				id: "packing",
				title: "Считать нужно груз после упаковки",
				paragraphs: ["Обрешётка, паллета и защитные материалы могут изменить и вес, и габариты партии. Если известны только размеры самого изделия, этого может быть недостаточно для итоговой сметы. Попросите данные внешней транспортной упаковки и количество мест."],
				list: [
					"Фактический вес всей партии с упаковкой.",
					"Наружные габариты каждого места: длина × ширина × высота.",
					"Количество одинаковых и разных коробок.",
					"Необходимость обрешётки или паллетирования.",
					"Особенности товара: хрупкость, аккумуляторы и другие условия перевозки."
				]
			},
			{
				id: "calculator",
				title: "Как сравнить варианты на сайте",
				paragraphs: ["Откройте карго-калькулятор, укажите вес и объём, затем переключите авто, ж/д и авиа. Для каждого варианта увидите расчётный вес, стоимость перевозки и дополнительные услуги отдельными строками. Так проще понять, какая часть сметы меняется.", "Предварительная сумма не заменяет полный расчёт: таможенные платежи, доставка по Китаю и по РФ учитываются по условиям конкретной задачи. Перед отправкой заявки проверьте выбранную упаковку и дополнения — они автоматически попадут в комментарий к обращению."]
			}
		]
	},
	{
		slug: "oplata-postavshchiku-kitay",
		title: "Оплата поставщику в Китае: что проверить до перевода",
		shortTitle: "Как подготовить оплату поставщику",
		category: "Платежи",
		excerpt: "Какие данные собрать для расчёта, как сверить сумму и что согласовать до оплаты инвойса.",
		readTime: "4 мин",
		art: "wallet",
		kicker: "ИНВОЙС · СУММА · ПОДТВЕРЖДЕНИЕ",
		service: "1688",
		sections: [
			{
				id: "invoice",
				title: "Начните с актуального инвойса",
				paragraphs: ["Попросите у поставщика документ или сообщение, где видны получатель, сумма, валюта и основание платежа. Если в заказе несколько позиций, сверьте итог с согласованной спецификацией. Не рассчитывайте платёж по старому счёту, пока продавец не подтвердил его актуальность."]
			},
			{
				id: "details",
				title: "Подготовьте информацию для расчёта",
				paragraphs: ["Для первого обращения обычно достаточно коммерческих данных. Секретные коды и пароли для расчёта не нужны."],
				list: [
					"Сумма и валюта инвойса.",
					"Название поставщика и площадка, если заказ оформлен онлайн.",
					"Срок оплаты и желаемая дата отправки.",
					"Ссылка или номер заказа, если они есть.",
					"Контакт для уточнения деталей."
				]
			},
			{
				id: "confirm",
				title: "До перевода зафиксируйте условия",
				paragraphs: ["Согласуйте сумму в рублях и валюте получателя, комиссию, срок и подтверждение выполнения. Уточните, кто оплачивает возможные расходы банка или платёжного канала. Если реквизиты изменились, подтвердите их у поставщика по ранее известному каналу связи."]
			},
			{
				id: "security",
				title: "Не передавайте доступы к аккаунтам",
				paragraphs: ["Для обсуждения задачи не нужны пароль от личного кабинета, код из SMS, CVV карты или удалённый доступ к устройству. Не отправляйте их в комментарии к заявке и не сообщайте третьим лицам."]
			}
		]
	},
	{
		slug: "podgotovka-gruza-k-otpravke",
		title: "Как подготовить груз из Китая к международной отправке",
		shortTitle: "Что узнать о грузе до отправки",
		category: "Логистика",
		excerpt: "Короткий список параметров товара, упаковки и маршрута, которые помогут получить более точный предварительный расчёт.",
		readTime: "5 мин",
		art: "cargo",
		kicker: "ДАННЫЕ · УПАКОВКА · МАРШРУТ",
		service: "Карго",
		sections: [
			{
				id: "goods",
				title: "Опишите товар и партию",
				paragraphs: ["Для начала перечислите, что именно отправляется, сколько единиц и у скольких поставщиков находится заказ. Укажите особенности, которые могут повлиять на упаковку или перевозку: хрупкость, батареи, жидкости, магнитные компоненты или маркировка. Возможность перевозки специальных категорий нужно подтвердить отдельно."]
			},
			{
				id: "dimensions",
				title: "Запросите параметры после упаковки",
				paragraphs: ["Для предварительной оценки полезны фактический вес и внешние размеры каждого места. Размеры товара без транспортной коробки могут отличаться от параметров, по которым перевозчик рассчитывает место в машине или контейнере."],
				list: [
					"Количество коробок и общий вес.",
					"Длина, ширина и высота каждого места.",
					"Материал и состояние упаковки.",
					"Нужны ли обрешётка, паллета или дополнительная защита."
				]
			},
			{
				id: "route",
				title: "Уточните, откуда и куда едет партия",
				paragraphs: ["Укажите город или склад отправления в Китае и город получения в России. Если заказы нужно собрать у нескольких продавцов, сообщите это заранее. Консолидация, доставка до склада и выдача в конечном городе могут считаться отдельно от международного маршрута."]
			},
			{
				id: "estimate",
				title: "Отделите ориентир от итоговой сметы",
				paragraphs: ["Онлайн-калькулятор помогает сравнить варианты по введённым параметрам. Перед заказом перевозки получите подтверждение тарифа, состава услуги, сроков, включённых расходов и порядка действий при изменении веса или объёма. Сохраните эту договорённость вместе с данными партии."],
				note: "Сроки и тарифы зависят от маршрута, товара и фактической упаковки. Предварительный расчёт на сайте не заменяет подтверждение перевозчика."
			}
		]
	}
];
//#endregion
//#region portable/server.ts
var base = dirname(fileURLToPath(import.meta.url));
var publicDir = resolve(base, "public");
var dataDir = resolve(process.env.DATA_DIR || join(base, "data"));
await mkdir(dataDir, {
	recursive: true,
	mode: 448
});
var logPath = join(dataDir, "requests.ndjson");
var deliver = createTelegramOutbox(join(dataDir, "telegram-deliveries.ndjson"));
var leadRecords = /* @__PURE__ */ new Map();
try {
	for (const line of (await readFile(logPath, "utf8")).split("\n").filter(Boolean)) {
		const row = JSON.parse(line);
		leadRecords.set(row.id, row);
	}
} catch (error) {
	if (error.code !== "ENOENT") throw error;
}
var retentionMs = 2160 * 60 * 60 * 1e3;
var storageQueue = Promise.resolve();
function withStorage(work) {
	const task = storageQueue.then(work, work);
	storageQueue = task.then(() => void 0, () => void 0);
	return task;
}
async function pruneExpiredLeads() {
	return withStorage(async () => {
		const cutoff = Date.now() - retentionMs;
		const retained = [...leadRecords.values()].filter((row) => Number(row.createdAt) >= cutoff);
		if (retained.length === leadRecords.size) return;
		const temp = logPath + ".tmp";
		await writeFile(temp, retained.map((row) => JSON.stringify(row)).join("\n") + (retained.length ? "\n" : ""), { mode: 384 });
		await rename(temp, logPath);
		leadRecords.clear();
		for (const row of retained) leadRecords.set(String(row.id), row);
	});
}
await pruneExpiredLeads();
setInterval(() => {
	pruneExpiredLeads().catch(() => console.error("lead_retention_failed"));
}, 1440 * 60 * 1e3).unref();
var localTelegram = () => ({
	token: process.env.TELEGRAM_BOT_TOKEN,
	chatId: process.env.TELEGRAM_CHAT_ID,
	proxyUrl: process.env.TELEGRAM_PROXY_URL
});
var routes = [
	"/",
	"/cargo",
	"/blog",
	...articles.map((article) => `/blog/${article.slug}`),
	"/contacts",
	"/privacy",
	"/consent",
	"/terms"
];
var rate = /* @__PURE__ */ new Map();
var escape = (s) => String(s ?? "").replace(/[&<>"']/g, (x) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[x]);
function json(res, status, value) {
	res.writeHead(status, {
		"Content-Type": "application/json; charset=utf-8",
		"Cache-Control": "no-store"
	});
	res.end(JSON.stringify(value));
}
async function body(req) {
	let text = "";
	for await (const chunk of req) {
		text += chunk;
		if (Buffer.byteLength(text) > 16e3) throw new Error("too_large");
	}
	return text;
}
function validUrl(value, host) {
	try {
		const u = new URL(value || "");
		return u.protocol === "https:" && (u.hostname === host || u.hostname.endsWith("." + host)) ? u.href : "";
	} catch {
		return "";
	}
}
function siteOrigin() {
	try {
		const url = new URL(process.env.SITE_URL || "");
		return url.protocol === "https:" ? url.origin : "";
	} catch {
		return "";
	}
}
function config() {
	return {
		metrikaId: /^\d{5,12}$/.test(process.env.METRIKA_ID || "") ? Number(process.env.METRIKA_ID) : 0,
		telegramUrl: validUrl(process.env.TELEGRAM_URL, "t.me"),
		phone: /^\+?[\d\s()-]{10,24}$/.test(process.env.CONTACT_PHONE || "") ? process.env.CONTACT_PHONE : "",
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.CONTACT_EMAIL || "") ? process.env.CONTACT_EMAIL : "",
		preview: !publicLaunchReady(process.env, "direct"),
		portable: true
	};
}
function clientIp(req) {
	const remote = req.socket.remoteAddress || "unknown";
	const loopback = remote === "127.0.0.1" || remote === "::1" || remote === "::ffff:127.0.0.1";
	const forwarded = req.headers["x-real-ip"];
	return loopback && typeof forwarded === "string" && forwarded.length <= 64 ? forwarded.trim() : remote;
}
var server = createServer(async (req, res) => {
	res.setHeader("X-Content-Type-Options", "nosniff");
	res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
	res.setHeader("X-Frame-Options", "SAMEORIGIN");
	try {
		const url = new URL(req.url || "/", "http://localhost");
		const path = decodeURIComponent(url.pathname).replace(/\/$/, "") || "/";
		if (path === "/api/site-config" && req.method === "GET") return json(res, 200, config());
		if (path === "/api/requests" && req.method === "POST") {
			const origin = req.headers.origin;
			const host = req.headers.host;
			if (origin && new URL(origin).host !== host) return json(res, 403, { error: "Недопустимый источник запроса." });
			const ip = clientIp(req);
			const now = Date.now();
			const entry = rate.get(ip);
			if (entry && entry.reset > now && entry.count >= 10) return json(res, 429, { error: "Слишком много запросов. Попробуйте через минуту." });
			rate.set(ip, {
				count: entry && entry.reset > now ? entry.count + 1 : 1,
				reset: entry && entry.reset > now ? entry.reset : now + 6e4
			});
			if (rate.size > 1e4) {
				for (const [k, v] of rate) if (v.reset < now) rate.delete(k);
			}
			const parsed = leadSchema.safeParse(JSON.parse(await body(req)));
			if (!parsed.success) return json(res, 400, { error: "Проверьте контакт и согласие на обработку данных." });
			const d = parsed.data, id = d.requestId || randomUUID();
			const hash = createHash("sha256").update(leadFingerprint(d)).digest("hex");
			let record = await withStorage(async () => {
				const existing = leadRecords.get(id);
				if (existing) return existing;
				const fresh = {
					id,
					name: d.name,
					contact: d.contact,
					channel: d.channel,
					service: d.service,
					details: d.details,
					attribution: d.attribution,
					consentVersion: d.consentVersion,
					consentAt: now,
					createdAt: now,
					payloadHash: hash,
					deliveryStatus: "pending"
				};
				await appendFile(logPath, JSON.stringify(fresh) + "\n", { mode: 384 });
				leadRecords.set(id, fresh);
				return fresh;
			});
			if (record.payloadHash !== hash) return json(res, 409, { error: "Заявка с этим номером уже содержит другие данные." });
			const notification = await deliver({
				...d,
				id,
				createdAt: Number(record.createdAt)
			}, localTelegram());
			if (notification.status === "sent" && record.deliveryStatus !== "sent") record = await withStorage(async () => {
				const latest = leadRecords.get(id) || record;
				if (latest.deliveryStatus === "sent") return latest;
				const sent = {
					...latest,
					deliveryStatus: "sent",
					telegramMessageId: notification.messageId
				};
				await appendFile(logPath, JSON.stringify(sent) + "\n", { mode: 384 });
				leadRecords.set(id, sent);
				return sent;
			});
			if (notification.status !== "sent") return json(res, 503, { error: "Не удалось отправить заявку в Telegram. Попробуйте ещё раз." });
			return json(res, 201, {
				id,
				delivery: "sent"
			});
		}
		if (req.method !== "GET" && req.method !== "HEAD") return json(res, 405, { error: "Метод не поддерживается." });
		if (path === "/robots.txt") {
			res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
			res.end(publicLaunchReady(process.env, "direct") ? "User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: " + siteOrigin() + "/sitemap.xml\n" : "User-agent: *\nDisallow: /\n");
			return;
		}
		if (path === "/sitemap.xml") {
			const origin = siteOrigin();
			if (!publicLaunchReady(process.env, "direct") || !origin) return json(res, 404, { error: "Публикация закрыта или не настроен домен." });
			res.writeHead(200, { "Content-Type": "application/xml; charset=utf-8" });
			res.end("<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">" + routes.filter((p) => ![
				"/privacy",
				"/consent",
				"/terms"
			].includes(p)).map((p) => "<url><loc>" + escape(origin + p) + "</loc></url>").join("") + "</urlset>");
			return;
		}
		if (!routes.includes(path) && !path.startsWith("/assets/") && !["/favicon.svg", "/logo-klever.svg"].includes(path)) {
			res.writeHead(404);
			res.end("Not found");
			return;
		}
		const file = resolve(publicDir, "." + (routes.includes(path) ? path === "/" ? "/index.html" : path + "/index.html" : path));
		if (!file.startsWith(publicDir + sep) || path.split("/").some((x) => x.startsWith("."))) {
			res.writeHead(404);
			res.end("Not found");
			return;
		}
		try {
			if (!(await stat(file)).isFile()) throw new Error("missing");
			const data = await readFile(file);
			res.writeHead(200, {
				"Content-Type": {
					".html": "text/html; charset=utf-8",
					".js": "text/javascript; charset=utf-8",
					".css": "text/css; charset=utf-8",
					".svg": "image/svg+xml",
					".png": "image/png",
					".woff2": "font/woff2"
				}[extname(file)] || "application/octet-stream",
				"Cache-Control": path.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "no-cache",
				...!publicLaunchReady(process.env, "direct") ? { "X-Robots-Tag": "noindex, nofollow" } : {}
			});
			res.end(req.method === "HEAD" ? void 0 : data);
		} catch {
			res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
			res.end("Страница не найдена");
		}
	} catch (error) {
		if (error instanceof SyntaxError) return json(res, 400, { error: "Некорректные данные." });
		if (error.message === "too_large") return json(res, 413, { error: "Слишком большой запрос." });
		console.error("request_failed");
		return json(res, 503, { error: "Временно не удалось обработать запрос. Попробуйте ещё раз." });
	}
});
var port = Number(process.env.PORT || 3e3);
server.listen(port, process.env.HOST || "127.0.0.1", () => console.log(`Клевер запущен: http://${process.env.HOST || "127.0.0.1"}:${port}`));
//#endregion
export {};
