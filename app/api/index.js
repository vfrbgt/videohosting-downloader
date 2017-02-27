module.exports = function(router) {
    router.get('/', function(req, res) {
        res.json({
            message: 'Coub downloader api'
        });
    });

    require("fs").readdirSync(__dirname).forEach(function(file) {
        if (file === 'index.js') return;
        require("./" + file)(router);
    });
    return router;
};