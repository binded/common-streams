import { Transform } from 'stream'

export default class SizeStream extends Transform {
  constructor() {
    super({ objectMode: true })
    this.streamSize = 0
  }

  _transform(chunk, encoding, cb) {
    // Update hash sum objects
    this.streamSize = this.streamSize + chunk.length
    cb()
  }

  _flush(cb) {
    const size = this.streamSize
    this.push({ size })
    cb(null)
  }
}
