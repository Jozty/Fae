// deno run -A --unstable declarations.ts

import { emptyDirSync } from 'https://deno.land/std/fs/mod.ts'

const start = Date.now()

function printInfo(msg: string) {
  console.log('%ci', 'color:aqua;font-weight:bold', msg)
}

function printDone(msg: string) {
  console.log('%c✔', 'color:chartreuse', msg, '\n')
}

function getDeclarationsPath(path: string) {
  return './declarations/' + path.slice(2)
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

function generateDeclarations() {
  return Deno.run({
    cmd: [
      'tsc',
      '--declaration',
      'declarations/mod.ts',
      '--lib',
      'esnext',
      '-t',
      'es5',
      '--downlevelIteration',
    ],
  }).status()
}

function removeExtraFiles(path: string) {
  for (const dirEntry of Deno.readDirSync(path)) {
    if (dirEntry.isDirectory) {
      removeExtraFiles(path + '/' + dirEntry.name)
    } else if (!dirEntry.name.includes('.d.ts')) {
      Deno.removeSync(path + '/' + dirEntry.name)
    }
  }
}

function refactorDeclarationsFiles(path: string) {
  for (const dirEntry of Deno.readDirSync(path)) {
    const dirEntryPath = path + '/' + dirEntry.name
    if (dirEntry.isDirectory) {
      refactorDeclarationsFiles(dirEntryPath)
    } else {
      let text = Deno.readTextFileSync(dirEntryPath)
      text =
        "// This file auto-generated. Don't edit this file\n\n" + text
      Deno.writeTextFileSync(dirEntryPath, text)
    }
  }
}

printInfo('copying original files')
emptyDirSync('./declarations')
writeFolder('./utils')
writeFunctions('.')
printDone('copied original files')

printInfo('generating declarations')
await generateDeclarations()
printDone('generated declarations')

printInfo('removing extra files')
removeExtraFiles('./declarations')
printDone('removed extra files')

printInfo('refactoring .d.ts files')
refactorDeclarationsFiles('./declarations')
printDone('refactored .d.ts files')

const time = (Date.now() - start) / 1000
printDone(`Done in ${time}ms`)
