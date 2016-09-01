# common-streams

[![Build Status](https://travis-ci.org/blockai/common-streams.svg?branch=master)](https://travis-ci.org/blockai/common-streams)

A collection of miscellaneous streams.

## Install

```bash
npm install --save common-streams
```

Requires Node v6+

## Usage

See [./test](./test) directory for usage examples.

### HashStream

Transform stream that operates in object mode and returns a single `{ digest: 'hash digest' }` object.

new HashStream(algorithm, [, opts])

**algorithm**: any algorithm supported by [crypto.createHash](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm)

**opts.encoding**: any encoding supported by [hash.digest](https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding). Defaults to `hex`

### SizeStream

Transform stream that operates in object mode and returns a single `{
size: 1000 }` object where the size is an integer representing the total
size in bytes of the stream.

new SizeStream()