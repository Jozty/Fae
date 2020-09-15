import * as colors from 'https://deno.land/std@v0.69.0/fmt/colors.ts'

import { tests } from "./_describe.ts"

const failedCompile: any[] = []

function write(...args: any[]) {
  console.log(...args)
}

function readSpecFiles(dir: string): any[] {
  let files = [...Deno.readDirSync(dir)]
  files = files.filter(f => f.isFile && f.name.includes('spec'))
  return files
}

async function runScript(script: string) {
  try {
    await import(script)
  } catch (e) {
    failedCompile.push(e)
  }
}

async function run() {
  const __dirname = new URL('.', import.meta.url).pathname
  let start = Date.now()

  const files = readSpecFiles(__dirname)
  const args = Deno.args
  console.log(args)
  let testFiles: Promise<any>[] = []
  if(args.length) {
    for(let i = 0; i < args.length; i++) {
      testFiles.push(import(`../${args[i]}`))
    }
  }
  else {
    files.sort((a, b) => a.name.localeCompare(b.name))
    testFiles = files.map(f => `${__dirname}${f.name}`).map(f => import(f))
  }
  await Promise.all(tests)

  tests.forEach((t) => {
    Deno.test(t[0], t[1])
  })
  
  // await p.status()

  write(failedCompile.join('\n\n\n'))

  const time = Math.floor((Date.now() - start) / 1000)
  console.log('completed in', time, 'seconds')

}

await run()

// deno run --allow-read --allow-run --allow-net specs/_run.ts
// deno run --allow-read --allow-run --allow-net specs/_run.ts specs/all.spec.ts specs/join.spec.ts