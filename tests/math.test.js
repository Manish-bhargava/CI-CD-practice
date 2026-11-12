const { add, isEven } = require('../src/utils/math');

describe('math utils', () => {
  test('add() adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test('isEven() detects even numbers', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(7)).toBe(false);
  });
});
