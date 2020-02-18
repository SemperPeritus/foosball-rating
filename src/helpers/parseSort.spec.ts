import { parseSort } from './parseSort';

describe('parseSort', () => {
  test('?sort=foo,bar:DESC', () => {
    expect(parseSort('foo,bar:DESC')).toEqual({ foo: 'ASC', bar: 'DESC' });
  });
});
