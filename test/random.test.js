import test from 'blue-tape'
import concat from 'concat-stream'

import { RandomStream } from '../src/'

test('random stream', (t) => {
  const rand = new RandomStream(10)

  rand.pipe(concat((buf) => {
    t.equal(buf.length, 10)
    t.end()
  }))
})

test('random stream #2', (t) => {
  const rand = new RandomStream(2000)

  rand.pipe(concat((buf) => {
    t.equal(buf.length, 2000)
    t.end()
  }))
})
