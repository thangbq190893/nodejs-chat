var connection = require('../common/connection');
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

function Auth() {
    this.login = function (req, res) {
        // // Check password login\
        connection.acquire(function (err, conn) {
            username = req.body.username;
            password = req.body.password;
            conn.query(`select * from users where name = '` + username + `' or email = '` + username + `'`, function (err, authUser) {
                if (err) {
                    res.json({status: 400,error: 'Lỗi truy vấn database'})
                } else {
                    if (authUser.length > 0) {
                        // check password login
                        bcrypt.compare(password, authUser[0].password, function (err, equal) {
                            if (equal) {
                                user = {
                                    id: authUser[0].id,
                                    name: authUser[0].name,
                                    point: authUser[0].point
                                };
                                // Nếu password đúng thì trả về 1 mã token
                                jwt.sign({user}, 'secretkey', {expiresIn: 60}, (err, token) => {
                                    res.json({status: 200, token})
                                })
                            } else {
                                res.json({status: 501,error: 'Login false, mật khẩu sai'});
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
