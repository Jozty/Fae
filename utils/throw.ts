export function throwFunctorError(): never {
  throw new TypeError(
    'The functor should be an array like or iterable/iterator',
  );
}
