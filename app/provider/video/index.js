const LoaderFactory = require('../../base/LoaderFactory');

class VideoHostingLoader extends LoaderFactory {
    constructor() {
        super();
    }

    path() {
        return __dirname;
    }
}

module.exports = new VideoHostingLoader();