const AbstractFactory = require('./AbstractFactory');

class LoaderFactory extends AbstractFactory {
    constructor() {
        super();
        if (this.constructor === AbstractFactory) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    /**
     * Path to factory
     * @return String path to factory implementations
     */
    path() {
        throw new Error("Abstract method!");
    }

    create(alias, param) {
        try {
            if(alias === 'index' || alias === 'index.js') {
                throw new Error('Index can not be created!');
            }
            if(typeof param !== 'undefined') {
                return new (require(this.path()+'/'+alias)) (param);
            }
            return require(this.path()+'/'+alias);
        }
        catch(error) {
            console.error(error);
        }
    }
}

module.exports = LoaderFactory;