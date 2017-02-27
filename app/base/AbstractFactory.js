
class AbstractFactory {

    constructor(param) {
        if (this.constructor === AbstractFactory) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    create(alias) {
        throw new Error("Abstract method!");
    }

}

module.exports = AbstractFactory;