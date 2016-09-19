import test from 'blue-tape'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import concat from 'concat-stream'

import { HashStream, SizeStream } from '../src'

const relPath = (str) => path.join(__dirname, str)

const setup = () => {
  const tmpDir = relPath('./.tmp')
  rimraf.sync(tmpDir)
  mkdirp.sync(tmpDir)
}

setup()

const getReadStream = () => (
  fs.createReadStream(relPath('./files/image.jpg'))
)

const getWriteStream = (() => {
  let i = 0
  return () => {
    i++
    const tmpPath = relPath(`./.tmp/${i}`)
    return fs.createWriteStream(tmpPath)
  }
})()

test('kitchen sink', (t) => {
  const rs = getReadStream()
  const ws = getWriteStream()
  const sha1Stream = new HashStream('sha1')
  const md5Stream = new HashStream('md5')
  const sizeStream = new SizeStream()

  ws.on('finish', () => {
    t.end()
  })

  rs.pipe(sha1Stream).pipe(concat(([{ digest }]) => {
    t.equal(digest, '4129def2ea7cb7945ddfbb785969898fca2e34c3')
  }))
  rs.pipe(md5Stream).pipe(concat(([{ digest }]) => {
    t.equal(digest, '4986d9c661a8da5efb29cee86498668a')
  }))
  rs.pipe(sizeStream).pipe(concat(([{ size }]) => {
    t.equal(size, 2447774)
  }))
  rs.pipe(ws)
})

test('size stream through', (t) => {
  const rs = getReadStream()
  const ws = getWriteStream()

  t.plan(2)

  const sizeStream = new SizeStream((size) => {
    t.equal(size, 2447774)
  })

  ws.on('finish', () => {
    t.ok(true)
  })

  rs.pipe(sizeStream).pipe(ws)
})
