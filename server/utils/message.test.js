var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var location = generateLocationMessage('bryan', 1, 1)
    expect(location.from).toBe('bryan')
    expect(location.url).toBe('https://www.google.com/maps?q=1,1')
  })
})
