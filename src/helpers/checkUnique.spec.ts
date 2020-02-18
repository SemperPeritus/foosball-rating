import { checkUnique } from './checkUnique';

describe('checkUnique', () => {
  test('undefined', () => {
    expect(checkUnique([undefined])).toBe(true);
  });

  test('undefined x2', () => {
    expect(checkUnique([undefined, undefined])).toBe(false);
  });

  test('undefined, something', () => {
    expect(checkUnique([undefined, 'something'])).toBe(true);
  });

  test('something x2', () => {
    expect(checkUnique(['something', 'something'])).toBe(false);
  });
});
