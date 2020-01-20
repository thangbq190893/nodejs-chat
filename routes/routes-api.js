var User = require('../Models/user');
var Auth = require('../Models/auth');

// FORMAT OF TOKEN
// Authorization: Beerer <access_token>

// Verify Token
function verifyToken(req, res, next) {
// Get auth header value
    const bearerHeader = req.headers['authorization'];
    // console.log(req.headers);
// Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //Split at the space
        const  bearer = bearerHeader.split(' ');
        // Get token from array
        const beareToken = bearer[1];
        // Set the token
        req.token= beareToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
module.exports = {
    configure: function (app, io) {
        app.get('/api/users', verifyToken, function (req, res) {
            User.get(req, res);
        });

        app.get('/api/users/:id', verifyToken, function (req, res) {

            User.read(req, req.params.id, res);
        });

        app.post('/api/users', verifyToken, function (req, res) {
            User.create(req.body, res);
        });

        app.put('/api/users/:id', verifyToken, function (req, res) {
            User.update(req.body, res);
        });

        app.delete('/api/users/:id', verifyToken, function (req, res) {
            User.delete(req.params.id, res);
        });

        app.post('/api/login', function (req, res) {
            Auth.login(req, res);
        })
    }
};
