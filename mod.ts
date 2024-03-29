// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

export { _ } from './utils/constants.ts';
export type {
  AllTypes,
  Comparator,
  Curry1,
  Curry2,
  Curry3,
  FuncArr1,
  InferElementType,
  InferType,
  PlaceHolder,
  Predicate1,
  Predicate2,
  Tests,
} from './utils/types.ts';

// functions
export { add } from './add.ts';
export { addIndex } from './addIndex.ts';
export { adjust } from './adjust.ts';
export { all } from './all.ts';
export { allPass } from './allPass.ts';
export { always } from './always.ts';
export { and } from './and.ts';
export { andThen } from './andThen.ts';
export { any } from './any.ts';
export { anyPass } from './anyPass.ts';
export { ap } from './ap.ts';
export { aperture } from './aperture.ts';
export { append } from './append.ts';
export { assoc } from './assoc.ts';
export { assocPath } from './assocPath.ts';
export { both } from './both.ts';
export { chain } from './chain.ts';
export { clamp } from './clamp.ts';
export { comparator } from './comparator.ts';
export { complement } from './complement.ts';
export { compose } from './compose.ts';
export { concat } from './concat.ts';
export { contains } from './contains.ts';
export { crossProduct } from './crossProduct.ts';
export { curry } from './curry.ts';
export { dec } from './dec.ts';
export { defaultTo } from './defaultTo.ts';
export { dissoc } from './dissoc.ts';
export { dissocPath } from './dissocPath.ts';
export { divide } from './divide.ts';
export { drop } from './drop.ts';
export { dropLast } from './dropLast.ts';
export { dropLastWhile } from './dropLastWhile.ts';
export { dropRepeats } from './dropRepeats.ts';
export { dropRepeatsWith } from './dropRepeatsWith.ts';
export { dropWhile } from './dropWhile.ts';
export { either } from './either.ts';
export { empty } from './empty.ts';
export { endsWith } from './endsWith.ts';
export { eqProps } from './eqProps.ts';
export { equals } from './equals.ts';
export { filter } from './filter.ts';
export { find } from './find.ts';
export { findIndex } from './findIndex.ts';
export { findLast } from './findLast.ts';
export { findLastIndex } from './findLastIndex.ts';
export { flip } from './flip.ts';
export type { Pair } from './fromPairs.ts';
export { fromPairs } from './fromPairs.ts';
export { groupWith } from './groupWith.ts';
export { head } from './head.ts';
export { identity } from './identity.ts';
export { inc } from './inc.ts';
export { indexOf } from './indexOf.ts';
export { insert } from './insert.ts';
export { isEmpty } from './isEmpty.ts';
export { join } from './join.ts';
export { lens } from './lens.ts';
export type {
  GetTransformer,
  Lens,
  LensGetter,
  LensSetter,
  LensTransformer,
} from './lens.ts';
export { lensIndex } from './lensIndex.ts';
export { lensPath } from './lensPath.ts';
export { lensProp } from './lensProp.ts';
export { lift } from './lift.ts';
export { liftN } from './liftN.ts';
export { map } from './map.ts';
export { max } from './max.ts';
export { mean } from './mean.ts';
export { median } from './median.ts';
export { min } from './min.ts';
export { multiply } from './multiply.ts';
export { not } from './not.ts';
export { nth } from './nth.ts';
export { or } from './or.ts';
export { over } from './over.ts';
export { path } from './path.ts';
export { pathOr } from './pathOr.ts';
export { paths } from './paths.ts';
export type { Path } from './paths.ts';
export { pipe } from './pipe.ts';
export { pluck } from './pluck.ts';
export { prepend } from './prepend.ts';
export type { Prop } from './prop.ts';
export { prop } from './prop.ts';
export { propEq } from './propEq.ts';
export { propIs } from './propIs.ts';
export { propOr } from './propOr.ts';
export { props } from './props.ts';
export { propSatisfies } from './propSatisfies.ts';
export { range } from './range.ts';
export { rangeUntil } from './rangeUntil.ts';
export { reduce } from './reduce.ts';
export { reject } from './reject.ts';
export { reverse } from './reverse.ts';
export { set } from './set.ts';
export { slice } from './slice.ts';
export { sort } from './sort.ts';
export { subtract } from './subtract.ts';
export { sum } from './sum.ts';
export { tail } from './tail.ts';
export { take } from './take.ts';
export { takeLast } from './takeLast.ts';
export { tap } from './tap.ts';
export { transduce } from './transduce.ts';
export { trim } from './trim.ts';
export { typ } from './typ.ts';
export { until } from './until.ts';
export { update } from './update.ts';
export { view } from './view.ts';
export { when } from './when.ts';
export { whereAll } from './whereAll.ts';
export { whereAny } from './whereAny.ts';
export { whereEq } from './whereEq.ts';
export { xor } from './xor.ts';
export { zip } from './zip.ts';
export { zipObj } from './zipObj.ts';
export { zipWith } from './zipWith.ts';
