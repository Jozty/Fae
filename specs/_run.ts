import * as colors from 'https://deno.land/std@v0.50.0/fmt/colors.ts'

import { Tests } from "./_describe.ts"

function write(...args: any[]) {
  console.log(...args)
}

const italic = (str: string | number) => colors.italic(str.toString())
const bold = (str: string | number) => colors.bold(str.toString())
const yellow = (str: string | number) => colors.yellow(str.toString())
const error = (str: string | number) => colors.red(str.toString())
const success = (str: string | number) => colors.green(str.toString())
const errorBold = (str: string | number) => bold(error(str.toString()))
const successBold = (str: string | number) => bold(success(str.toString()))
const tick = () => successBold('\u2713')
const cross = () => errorBold('\u2717')


function showResults(start: number, end: number) {
  // @ts-ignore
  const tests: Tests = globalThis.tests
  let time = ((end - start) / 1000) + 's'
  write()
  write(bold(yellow('Test Results Completed in')), bold(yellow(time)))
  write(tick(), success('Test suits passed'), successBold(tests.passedTestSuits))
  write(cross(), error('Test suits failed'), errorBold(tests.failedTestSuits))
  write()
  write(tick(), success('Test passed'), successBold(tests.passedTest))
  write(cross(), error('Test failed'), errorBold(tests.failedTest))
  write()

  const stats = tests.stats
  for(let i = 1, l = stats.length; i <= l; i++) {
    const {name, it} = stats[i - 1]
    write(bold(italic(`${i}. ${name}`)))
    for(let j = 1, l2 = it.length; j <= l2; j++) {
      let it2 = it[j - 1]
      if(it2.passed) write(tick(), success(`  ${j}. ${it2.desc} --- Passed`))
      else {
        write(cross(), errorBold(`  ${j}. ${it2.desc} --- ${error('Failed')}`))
        console.error(it2.error)
      }
    }
    write()
  }
}

function readSpecFiles(dir: string): any[] {
  let files = [...Deno.readDirSync(dir)]
  files = files.filter(f => f.isFile && f.name.includes('spec'))
  return files
}

async function run() {
  let start = Date.now()
  const files = readSpecFiles('./specs')
  for(let i =0; i < files.length; i++) {
    await import(`./${files[i].name}`)
  }
  showResults(start, Date.now())
}

await run()

// deno run --allow-read --allow-run --allow-net specs/_run.ts