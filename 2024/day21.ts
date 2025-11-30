import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day21.input.txt', 'utf8')
  .replace(/\r/g, '')