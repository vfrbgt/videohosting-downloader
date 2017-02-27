const AbstractProvider = require('../../base/AbstractProvider');
const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');

class Coub extends AbstractProvider {

    constructor(url) {
        super(url);
        this.url = url;
    }

    _request() {
        let options = {
            uri: this.url,
            transform: function (body) {
                return cheerio.load(body);
            }
        };
        return requestPromise(options);
    }

    _toInternalVideoQulaity(quality) {
        if(quality === 'high') {
            return 'big';
        }
        return quality;
    }

    _toInternalVideoFormat(format) {
        return format;
    }

    _parseTemplateUrl(templateUrl, params) {
        Object.keys(params).forEach((paramAlias, index) => {
            templateUrl = templateUrl.replace(new RegExp(paramAlias, 'g'), params[paramAlias]);
        });
        return templateUrl;
    }

    parse() {
        return new Promise((resolve, reject) => {
            this._request().then(($) => {
                this.$ = $;
                let JSONCoubInfo = this.$('#coubPageCoubJson').text();
                this.data = JSON.parse(JSONCoubInfo);
                this.load();
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    load() {}

    get metaData() {
        let metaData = {};
        Object.keys(this.METADATA_FORMAT).forEach((metaDataField) => {
            metaData[metaDataField] = _.result(this.data, metaDataField, this.METADATA_FORMAT[metaDataField]);
        });
        return metaData;
    }

    get video() {
        let videos = {};
        let urlTemplate = this.data.file_versions.web.template;
        Object.keys(this.VIDEO_FORMAT).forEach((quality, indexQuality) => {
            videos[quality] = {};
            Object.keys(this.VIDEO_FORMAT[quality]).forEach((format, indexFormat) => {
                videos[quality][format] = {};
                if(quality === 'low') {
                    videos[quality][format]['url'] = '';
                    return;
                }
                if(this.data.file_versions.web.types.indexOf(format) >= 0) {
                    videos[quality][format]['url'] = this._parseTemplateUrl(
                        urlTemplate,
                        {
                            '%{version}': this._toInternalVideoQulaity(quality),
                            '%{type}': this._toInternalVideoFormat(format)
                        }
                    );
                }
                else {
                    videos[quality][format]['url'] = '';
                }
            });
        });
        return videos;
    }

    get audio() {
        let audios = {};
        let urlTemplate = this.data.file_versions.web.template;
        Object.keys(this.AUDIO_FORMAT).forEach((quality, indexQuality) => {
            audios[quality] = {};
            Object.keys(this.AUDIO_FORMAT[quality]).forEach((format, indexFormat) => {
                audios[quality][format] = {};
                audios[quality][format]['url'] = _.result(this.data, 'file_versions.html5.audio.'+quality+'.url', '');
            });
        });
        return audios;
    }
}

module.exports = Coub;