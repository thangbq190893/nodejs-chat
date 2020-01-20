var path = require("path");
var i = 0;
var options = {
    root: path.join(process.cwd() + "/views"),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};
module.exports = {
    configure: function (app) {
        app.get('/', function (req, res, next) {
            res.sendfile("/index.html", options, '')
        });
        app.get('/login', function (req, res, next) {
            res.sendfile("/login.html", options, function (err) {
                if (err) {
                    next(err)
                } else {
                    console.log('Sent: /login.html');
                }
            })
        });

    }
};
