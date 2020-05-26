export function throwFunctorError() {
  throw new TypeError(
    'The functor should be an array like or iterable/iterator'
  )
}
