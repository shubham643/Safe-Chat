var Enum = require('enum');

var actions = new Enum(['ENCRYPT', 'DECRYPT', 'REQUEST_KEY_ACCESS']);

module.exports = actions;