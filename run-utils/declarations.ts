// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

// deno run -A --unstable declarations.ts

import { emptyDirSync } from 'https://deno.land/std/fs/mod.ts';

const start = Date.now();
const tempDir = './temp';

function printInfo(msg: string) {
  console.log('%ci', 'color:aqua;font-weight:bold', msg);
}

function printDone(msg: string) {
  console.log('%c✔', 'color:chartreuse', msg, '\n');
}

function getDeclarationsPath(path: string) {
  return tempDir + '/' + path.slice(2);
}

function writeFile(path: string) {
  const toPath = getDeclarationsPath(path);
  let text = Deno.readTextFileSync(path);
  text = text.replace(/\.ts/g, '');
  Deno.writeTextFileSync(toPath, text);
}

function writeFolder(path: string) {
  Deno.mkdirSync(getDeclarationsPath(path), { recursive: true });

  for (const dirEntry of Deno.readDirSync(path)) {
    if (dirEntry.isDirectory) {
      writeFolder(path + '/' + dirEntry.name);
    } else {
      writeFile(path + '/' + dirEntry.name);
    }
  }
}

function writeFunctions(path: string) {
  for (const dirEntry of Deno.readDirSync(path)) {
    if (dirEntry.isDirectory) continue;
    if (
      dirEntry.name.includes('.ts') &&
      !dirEntry.name.includes('declarations') &&
      !dirEntry.name.includes('_')
    ) {
      writeFile(path + '/' + dirEntry.name);
    }
  }
}

async function generateDeclarations() {
  await Deno.run({
    cmd: [
      'dts-bundle-generator',
      '--project',
      './deno.jsonc',
      getDeclarationsPath('./mod.ts'),
    ],
  }).status();
}

function saveBundle() {
  const path = './temp/declarations.d.ts';

  let text = Deno.readTextFileSync(getDeclarationsPath('./mod.d.ts'));
  text = '// This file auto-generated. Don\'t edit this file\n\n' + text;
  Deno.writeTextFileSync(path, text);
}

printInfo('Copying original files');
emptyDirSync(tempDir);
writeFolder('./utils');
writeFunctions('.');
printDone('copied original files in');

printInfo('generating declarations');
await generateDeclarations();
printDone('generated declarations');

printInfo('saving declarations');
saveBundle();
printDone('saved declarations');

const time = (Date.now() - start) / 1000;
printDone(`Done in ${time}ms`);
