import {
  bold,
  italic,
  red,
  underline,
  yellow,
} from 'https://deno.land/std@0.145.0/fmt/colors.ts';

const examples: Deno.DirEntry[] = [];

function indentString(str: string, indentTabCount = 1) {
  return str
    .split('\n')
    .map((l) => ''.padStart(indentTabCount, '\t') + l)
    .join('\n');
}

function functionNameForLog(name: string) {
  return bold(italic(yellow(name)));
}

for await (const entry of Deno.readDir('./examples')) {
  if (entry.isDirectory) continue;

  examples.push(entry);
}

const executedExamples = examples.map((e) => {
  const p = Deno.run({
    cmd: ['deno', 'run', '--check=all', `./examples/${e.name}`],
    stdout: 'piped',
    stderr: 'piped',
  });

  return {
    p,
    name: e.name,
  };
});

const examplesWithStatus = await Promise.all(
  executedExamples.map(async ({ p, name }) => ({
    name,
    status: await p.status(),
  })),
);

const nonZeroExamples = examplesWithStatus.filter(
  (e) => e.status.code !== 0,
);

if (nonZeroExamples.length) {
  const statusInfo = nonZeroExamples
    .map((e) => {
      const name = functionNameForLog(e.name);
      const errorCode = red(e.status.code.toString());

      return `${name} ${errorCode}`;
    })
    .join('\n');

  console.error(
    underline(red('Some or all examples failed with status codes-\n')),
  );
  console.error(statusInfo);
  Deno.exit(1);
}

const outputs = await Promise.all(
  executedExamples.map(async (e) => {
    const rawOutput = await e.p.output();
    const rawError = await e.p.stderrOutput();

    const output = new TextDecoder().decode(rawOutput);
    const error = new TextDecoder().decode(rawError);

    return {
      name: e.name,
      output,
      error,
    };
  }),
);

const nonEmptyOutputExamples = outputs.filter(
  ({ error }) => error.includes('Assertion failed'),
);

if (nonEmptyOutputExamples.length) {
  const outputInfo = nonEmptyOutputExamples
    .map((e) => {
      const output = indentString(e.output, 2);
      const error = indentString(e.error, 2);
      const name = functionNameForLog(e.name);

      return `${name}\n\tOutput-\n${output}\n\tError:\n${error}`;
    })
    .join('\n\n');

  console.error(outputInfo);
  Deno.exit(1);
}

Deno.exit(0);
