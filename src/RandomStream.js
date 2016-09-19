import { Readable } from 'stream'
import { randomBytes } from 'crypto'

export default class RandomStream extends Readable {
  constructor(max) {
    super()
    this.remainingBytes = max
  }
  _read(requestedSize) {
    if (this.remainingBytes === 0) return this.push(null)

    const size = Math.min(this.remainingBytes, requestedSize)
    this.remainingBytes -= size

    randomBytes(size, (err, buf) => {
      if (err) return this.emit('error', err)
      this.push(buf)
    })
  }
}
