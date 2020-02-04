var connection = require('../common/connection');
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

function Auth() {
    this.login = function (req, res) {
        // // Check password login\
        connection.acquire(function (err, conn) {
            if (err) {
                console.log('ket noi db loi');
                res.json({status: 503, error: 'Service Unavailable'})
            return;
            }
            username = req.body.username;
            password = req.body.password;
            conn.query(`select * from users where name = '` + username + `' or email = '` + username + `'`, function (err, authUser) {
                if (err) {
                    res.json({status: 404,error: 'Not Found'});
                } else {
                    if (authUser.length > 0) {
                        // check password login
                        bcrypt.compare(password, authUser[0].password, function (err, equal) {
                            if (equal) {
                                user = {
                                    id: authUser[0].id,
                                    username: authUser[0].name,
                                    point: authUser[0].point
                                };
                                // Nếu password đúng thì trả về 1 mã token
                                jwt.sign({user}, 'secretkey', {expiresIn: 60}, (err, token) => {
                                    res.json({status: 200, token, user});
                                    console.log(token);
                                })
                            } else {
                                res.json({status: 401,error: 'Unauthorized'});
                            }
                        });
                    } else {
                        res.json({status: 404,error: 'Người dùng không hợp lệ'})
                    }
                }
            })
        })
    }
}

module.exports = new Auth();
