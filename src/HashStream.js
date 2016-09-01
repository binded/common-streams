import { Transform } from 'stream'
import { createHash } from 'crypto'

export default class HashStream extends Transform {
  constructor(algo, { encoding = 'hex' } = {}) {
    super({ objectMode: true })
    this.algo = algo
    this.digestEncoding = encoding
    this.hashSum = createHash(algo)
  }

  _transform(chunk, encoding, cb) {
    // Update hash sum objects
    this.hashSum.update(chunk)
    cb()
  }

  _flush(cb) {
    // Compute hash digest
    const digest = this.hashSum.digest(this.digestEncoding)
    // this.emit('hash', hash)
    this.push({ digest })
    cb(null)
  }
}
