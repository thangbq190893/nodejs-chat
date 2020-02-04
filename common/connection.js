var mysql = require('mysql');

function Connection() {
    this.pool = null;

    this.init = function () {
        this.pool = mysql.createPool(
            {
                connectionLimit: 10,
                host: 'localhost',
                user: 'root',
                pass: '',
                database: 'nodejs_restful_api'
            }
        )
    };

    this.acquire = function (callback) {
        this.pool.getConnection(function (err, connection) {
            // console.log('sql err', err);
            // console.log('sql connection', connection);
            callback(err, connection);
        });
    };
}

module.exports = new Connection();
