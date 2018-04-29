var fs = require('fs');
_ = require('underscore');

    
const CONTROLLER_DIR = 'controllers';

var controllerRegistry = {};

var controllers = fs.readdirSync(`./${CONTROLLER_DIR}`);

_.each(controllers, function(item) {
    controllerRegistry[item + 'Controller'] = require(`${CONTROLLER_DIR}/${item}`); 
});

module.exports = controllerRegistry;
