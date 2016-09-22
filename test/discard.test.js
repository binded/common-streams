import test from 'blue-tape'
import concat from 'concat-stream'

import { DiscardStream, RandomStream } from '../src/'

test('discard stream', (t) => {
  const rand = new RandomStream(100)
  const discard = new DiscardStream(12)
  let all
  let sliced

  const maybeDone = () => {
    if (all && sliced) {
      t.equal(all.length, 100)
      t.equal(sliced.length, 88)
      t.deepEqual(all.slice(12), sliced)
      t.end()
    }
  }
  rand.pipe(concat((buf) => {
    all = buf
    maybeDone()
  }))
  rand.pipe(discard).pipe(concat((buf) => {
    sliced = buf
    maybeDone()
  }))
})
