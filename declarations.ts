// deno run -A --unstable declarations.ts

import {
  emptyDirSync,
  moveSync,
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

function saveBundle() {
  const path = './declarations/mod.d.ts'
  moveSync('./temp/mod.d.ts', path, { overwrite: true })

  let text = Deno.readTextFileSync(path)
  text =
    "// This file auto-generated. Don't edit this file\n\n" + text
  Deno.writeTextFileSync(path, text)
}

printInfo('copying original files')
emptyDirSync('./temp')
writeFolder('./utils')
writeFunctions('.')
printDone('copied original files')

printInfo('generating declarations')
await generateDeclarations()
printDone('generated declarations')

saveBundle()

printInfo('clean up')
emptyDirSync('./temp')
printDone('clean up')

// printInfo('refactoring .d.ts files')
// refactorDeclarationsFiles('./temp')
// printDone('refactored .d.ts files')

const time = (Date.now() - start) / 1000
printDone(`Done in ${time}ms`)
