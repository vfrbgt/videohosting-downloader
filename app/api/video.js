const videoProviderFactory = require('../provider/video');

module.exports = function (router) {

    router.route('/video/:provider/:url').get(async function (req, res) {
            let coubProvider = videoProviderFactory.create(req.params.provider, req.params.url);
        try {
            await coubProvider.parse();
            res.json({
                video: coubProvider.video,
                metaData: coubProvider.metaData,
                audio: coubProvider.audio
            });
        }
        catch(error) {
            console.log('Error is:', error);
            res.json({message: error});
        }
    });
};