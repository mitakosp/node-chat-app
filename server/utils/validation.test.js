var expect = require('expect');

const {isRealString} = require('./validation')

describe('isRealString', () => {
  it('should reject non-string values', () => {
    // given
    var sample = 123;

    // when
    var res = isRealString(sample);

    // then
    expect(res).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    // given
    var sample = '   ';

    // when
    var res = isRealString(sample);

    // then
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    // given
    var sample = '  Petros  ';

    // when
    var res = isRealString(sample);

    // then
    expect(res).toBe(true);
  });
});
