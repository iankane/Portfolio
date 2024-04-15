const advertisementApp = require('./main.js')

test('Make sure generated tokens are the right length', () =>{
    const tok = advertisementApp.generateToken(5);
    expect(tok.length).toBe(5)
})