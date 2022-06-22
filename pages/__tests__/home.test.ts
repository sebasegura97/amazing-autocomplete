import {sum} from '../index'

describe("sum()", () => {
  it("should return 5 if given 2 and 3 ", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
