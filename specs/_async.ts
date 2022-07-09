export function it(fun: Function) {
  return async function () {
    let done: Function = () => void 0;
    const p = new Promise<void>((resolve) => {
      const d = () => resolve();
      done = d;
    });
    await fun(done);
    await p;
  };
}

export type Tests = {
  [desc: string]: () => Promise<void>;
};
