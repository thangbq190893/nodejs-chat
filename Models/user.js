var connection = require('../common/connection');
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

function User() {
    this.get = function (req, res) {
        jwt.verify(req.token, 'secretkey', (err, authUser)=> {
            if (err) {
                res.sendStatus(403);
            } else {
                connection.acquire(function (err, conn) {
                    conn.query('select id, name, email, point, created_at from users', function (err, result) {
                        conn.release();
                        res.json({result, authUser});
                    });
                });
            }
        });

    };

    this.create = function (field_data, res) {
        console.log(field_data);
        var user = field_data;
        // rounds: là số vòng lặp tạo ra chuỗi salt
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(field_data.password, salt, null, function (err, result) {
                if (err) {
                    return next(err);
                }
                console.log(result);
                user.password = result;
                user.created_at = new Date();
                connection.acquire(function (err, conn) {
                    conn.query('insert into users set ?', user, function (err, result) {
                        conn.release();
                        if (err) {
                            res.send({
                                status: 1,
                                message: 'User creation failed',
                                data: null
                            });
                        } else {
                            res.send({
                                status: 0,
                                message: 'User created successfully',
                                data: user
                            })
                        }
                    })
                });
            });
        });
    };

    this.update = function (field_data, res) {
        console.log(field_data);
        connection.acquire(function (err, conn) {
            conn.query('update users set ? where id = ?', [field_data, field_data.id], function (err, result) {
                if (err) {
                    res.send({status: 1, message: 'User updated failed', data: null});
                } else {
                    res.send({status: 1, message: 'User updated successfully', data: result});
                }
            });
        });
    };

    this.read = function (req, id, res) {
        jwt.verify(req.token, 'secretkey', function (err, authUser) {
            if (err) {
                res.json(403);
            } else {

            }
        });
        connection.acquire(function (err, conn) {
            conn.query('select * from users where id = ? ', [id], function (err, result) {
                conn.release();
                res.send(result);
            });
        });
    };

    this.delete = function (id, res) {
        console.log(id);
        connection.acquire(function (err, conn) {
            conn.query('delete from users where id = ?', [id], function (err, result) {
                if (err) {
                    res.send({status: 0, message: 'Failed to delete', data: null})
                } else {
                    res.send({status: 0, message: 'Delete successfully', data: result})
                }
            })
        })
    };

}
module.exports = new User();
