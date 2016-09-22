# common-streams

[![Build Status](https://travis-ci.org/blockai/common-streams.svg?branch=master)](https://travis-ci.org/blockai/common-streams)

A collection of useful streams.

## Install

```bash
npm install --save common-streams
```

Requires Node v6+

## Usage

See [./test](./test) directory for more usage examples.

Example:

```javascript
import { HashStream, SizeStream } from 'common-streams'
import concat from 'concat-stream'

const rs = getReadStream() // e.g. fs.createReadStream(...)
const ws = getWriteStream() // e.g. fs.createWriteStream(...)

const sha1Stream = new HashStream('sha1')
const sizeStream = new SizeStream()

rs.pipe(sha1Stream).pipe(concat(([{ digest }]) => {
  console.log(digest, '=', '4129def2ea7cb7945ddfbb785969898fca2e34c3')
}))
rs.pipe(sizeStream).pipe(concat(([{ size }]) => {
  console.log(size, '=', 2447774)
}))
rs.pipe(ws)
```

### HashStream

Transform stream that operates in object mode and returns a single `{ digest: 'hash digest' }` object.

`new HashStream(algorithm, [, opts])`

**algorithm**: any algorithm supported by [crypto.createHash](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm)

**opts.encoding**: any encoding supported by [hash.digest](https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding). Defaults to `hex`.

### SizeStream

Transform stream that operates in object mode and returns a single `{
size: 1000 }` object where the size is an integer representing the total
size in bytes of the stream.

`new SizeStream()`

If passed a callback `new SizeStream(cb)` it will just act as a
PassThrough stream and call the callback when it's done.

### RandomStream

`new RandomStream(max)`

Readable stream that emits `max` random bytes before ending.

### DiscardStream

`new DiscardStream(start)`

Swallows all bytes until `start` is reached.

### MeterStream

`new MeterStream(max)`

See [meterstream](https://github.com/blockai/meterstream)
