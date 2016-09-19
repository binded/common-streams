import { Transform } from 'stream'

export default class SizeStream extends Transform {
  constructor(cb) {
    super({ objectMode: true })
    this.streamSize = 0
    this.cb = cb
  }

  _transform(chunk, encoding, cb) {
    if (this.cb) return this._transformCb(chunk, encoding, cb)
    // Update hash sum objects
    this.streamSize = this.streamSize + chunk.length
    cb()
  }

  _flush(cb) {
    if (this.cb) return this._flushCb(cb)
    const size = this.streamSize
    this.push({ size })
    cb(null)
  }

  _transformCb(chunk, encoding, cb) {
    this.streamSize = this.streamSize + chunk.length
    cb(null, chunk)
  }
  _flushCb(cb) {
    const size = this.streamSize
    this.cb(size)
    cb(null)
  }
}
