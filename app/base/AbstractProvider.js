
class AbstractProvider {

    _request() {
        throw new Error("Abstract method!");
    }

    parse() {
        throw new Error("Abstract method!");
    }

    load() {
        throw new Error("Abstract method!");
    }

    constructor(url) {
        if (this.constructor === AbstractProvider) {
            throw new Error("Can't instantiate abstract class!");
        }
        this.AUDIO_FORMAT = {
            high: {
                'mp3': {
                    'url': ''
                }
            },
            med: {
                'mp3': {
                    'url': ''
                }
            }
        };

        this.VIDEO_FORMAT = {
            high: {
                'mp4': {
                    'url': ''
                },
                'flv': {
                    'url': ''
                }
            },
            med: {
                'mp4': {
                    'url': ''
                },
                'flv': {
                    'url': ''
                }
            },
            low: {
                'mp4': {
                    'url': ''
                },
                'flv': {
                    'url': ''
                }
            }
        };

        this.METADATA_FORMAT = {
            'id': '',
            'title': '',
            'created_at': '',
            'views_count': 0
        };
    }

    get metaData() {
        throw new Error("Abstract method!");
    }

    get video() {
        throw new Error("Abstract method!");
    }

    get audio() {
        throw new Error("Abstract method!");
    }

}

module.exports = AbstractProvider;