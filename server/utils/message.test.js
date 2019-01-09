var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // given
    var from = 'Petros';
    var text = 'Sample Text';

    // when
    var message = generateMessage(from, text);

    // then
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    // given
    var from = 'Petros';
    var latitude = 23.3223;
    var longitude = 32.12312;
    var url = 'https://www.google.com/maps?q=23.3223,32.12312'

    // when
    var message = generateLocationMessage(from, latitude, longitude);

    // then
    expect(message.from).toBe(from);
    expect(message.url).toBe(url);
    expect(typeof message.createdAt).toBe('number');
  });
});
