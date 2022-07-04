import { describe, it } from './_describe.ts';
import { _, propEq } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('propEq', () => {
  let obj1 = {
    name: 'Shubham',
    age: 22,
    hair: 'blue',
    isMarried: true,
  };
  let obj2 = {
    name: 'Shivam',
    age: 21,
    hair: 'black',
    isMarried: false,
  };

  it('should determine property matching a given value for a specific object properly', () => {
    eq(propEq('name', 'Shubham', obj1), true);
    eq(propEq('hair', 'black', obj2), true);
    eq(propEq('hair', 'blue', obj2), false);
  });

  it('should work with curried calls too', () => {
    const p_2_3 = propEq('name');

    eq(p_2_3('Shubham')(obj1), true);
    eq(p_2_3('Shubham', obj1), true);
    eq(p_2_3(_, obj1)('Shubham'), true);

    const p_1_3 = propEq(_, 'Shubham');

    eq(p_1_3('name')(obj1), true);
    eq(p_1_3('name', obj1), true);
    eq(p_1_3(_, obj1)('name'), true);

    const p_1_2 = propEq(_, _, obj1);

    eq(p_1_2('name')('Shubham'), true);
    eq(p_1_2('name', 'Shubham'), true);
    eq(p_1_2(_, 'Shubham')('name'), true);

    const p_3 = propEq('name', 'Shubham');
    eq(p_3(obj1), true);

    const p_2 = propEq('name', _, obj1);
    eq(p_2('Shubham'), true);

    const p_1 = propEq(_, 'Shubham', obj1);
    eq(p_1('name'), true);
  });
});
