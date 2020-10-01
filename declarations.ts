// deno run -A --unstable declarations.ts

import {
  emptyDirSync,
  copySync,
} from 'https://deno.land/std/fs/mod.ts'

const start = Date.now()

function printInfo(msg: string) {
  console.log('%ci', 'color:aqua;font-weight:bold', msg)
}

function printDone(msg: string) {
  console.log('%c✔', 'color:chartreuse', msg, '\n')
}

function getDeclarationsPath(path: string) {
  return './temp/' + path.slice(2)
}

function writeFile(path: string) {
  const toPath = getDeclarationsPath(path)
  let text = Deno.readTextFileSync(path)
  text = text.replace(/\.ts/g, '')
  Deno.writeTextFileSync(toPath, text)
}

function writeFolder(path: string) {
  emptyDirSync(getDeclarationsPath(path))
  for (const dirEntry of Deno.readDirSync(path)) {
    if (dirEntry.isDirectory) {
      writeFolder(path + '/' + dirEntry.name)
    } else {
      writeFile(path + '/' + dirEntry.name)
    }
  }
}

function writeFunctions(path: string) {
  for (const dirEntry of Deno.readDirSync(path)) {
    if (dirEntry.isDirectory) continue
    if (
      dirEntry.name.includes('.ts') &&
      !dirEntry.name.includes('declarations') &&
      !dirEntry.name.includes('_')
    ) {
      writeFile(path + '/' + dirEntry.name)
    }
  }
}

async function generateDeclarations() {
  await Deno.run({
    cmd: ['dts-bundle-generator', '--config', './generator.config'],
  }).status()
}

async function getCurrentTags() {
  const process = Deno.run({
    cmd: ['git', 'tag', '--points-at', 'HEAD'],
    stdout: 'piped',
  })

  await process.status()

  const rawOutput = await process.output()

  const output = new TextDecoder().decode(rawOutput)
  return output.split('\n').filter((a) => !!a)
}

async function saveBundle() {
  const tags = await getCurrentTags()

  tags.forEach((tag) => {
    Deno.mkdirSync('./declarations/' + tag, { recursive: true })
    const path = './declarations/' + tag + '/mod.d.ts'
    copySync('./temp/mod.d.ts', path, { overwrite: true })

    let text = Deno.readTextFileSync(path)
    text =
      "// This file auto-generated. Don't edit this file\n\n" + text
    Deno.writeTextFileSync(path, text)
  })
}

printInfo('copying original files')
emptyDirSync('./temp')
writeFolder('./utils')
writeFunctions('.')
printDone('copied original files')

printInfo('generating declarations')
await generateDeclarations()
printDone('generated declarations')

printInfo('saving declarations')
await saveBundle()
printDone('saved declarations')

printInfo('clean up')
emptyDirSync('./temp')
printDone('clean up')

// printInfo('refactoring .d.ts files')
// refactorDeclarationsFiles('./temp')
// printDone('refactored .d.ts files')

const time = (Date.now() - start) / 1000
printDone(`Done in ${time}ms`)
