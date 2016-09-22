import { Transform } from 'stream'

// Discards "bytesToDiscard" bytes
class DiscardStream extends Transform {
  constructor(bytesToDiscard = 0) {
    super()
    this.bytesToDiscard = bytesToDiscard
    this.byteCount = 0
    this.done = false
  }
  _transform(chunk, encoding, cb) {
    if (this.done) return cb(null, chunk)

    this.byteCount += chunk.length

    if (this.byteCount > this.bytesToDiscard) {
      this.done = true
      const bytesToKeep = this.byteCount - this.bytesToDiscard
      const firstChunk = chunk.slice(-bytesToKeep)
      return cb(null, firstChunk)
    }
    cb(null)
  }
}

export default DiscardStream
