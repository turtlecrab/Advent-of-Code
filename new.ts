import * as fs from 'fs'
import * as path from 'path'

const arg = process.argv[2]

let year = new Date().getFullYear()
let day = new Date().getDate()

if (arg?.includes('/')) {
  ;[year, day] = arg.split('/').map(Number)
} else if (arg) {
  day = Number(arg)
}

if ([year, day].some(Number.isNaN)) throw 'Bad input'

const files = [
  {
    name: (n: number) => `day${String(n).padStart(2, '0')}.ts`,
    text: (n: number) => `import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day${String(n).padStart(
    2,
    '0'
  )}.input.txt', 'utf8')
  .replace(/\\r/g, '')`,
  },
  {
    name: (n: number) => `day${String(n).padStart(2, '0')}.test.ts`,
    text: (n: number) => `const testInput = \`\`

describe('Day${String(n).padStart(2, '0')}', () => {
  it('works for test input', () => {
    //
  })
})`,
  },
  {
    name: (n: number) => `day${String(n).padStart(2, '0')}.input.txt`,
    text: (n: number) => '',
  },
]

if (!fs.existsSync(String(year))) {
  fs.mkdirSync(String(year))
}

for (let { name } of files) {
  if (fs.existsSync(path.join(`./${year}`, name(day)))) {
    console.error(`${path.join(`./${year}`, name(day))} already exists`)
    process.exit(0)
  }
}

for (let file of files) {
  fs.writeFileSync(path.join(`./${year}`, file.name(day)), file.text(day))
}

console.log(`\x1b[32m${year}/${String(day).padStart(2, '0')} created\x1b[0m`)
