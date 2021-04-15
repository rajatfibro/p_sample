var mysql = require('mysql'),
    async = require('async')
var fs = require('fs');


var PRODUCTION_DB = 'product_camera',
    DEVELOPMENT_DB = 'product_camera'



exports.MODE_DEVELOPMENT = 'mode_development'
exports.MODE_PRODUCTION = 'mode_production'


var state = {
    pool: null,
    mode: null,
}

exports.connect = function (mode, done) {

    state.pool = mysql.createPool({
         connectionLimit: 1000,
          host: '127.0.0.1',
          user: 'root',
          password: '',
          port: '3306',
          multipleStatements: true,
        database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : DEVELOPMENT_DB
    })
    state.mode = mode
    done()
}

exports.get = function () {
    return state.pool;
}


exports.transaction = function (connection, body, done) {

    connection.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
        } else {
            conn.beginTransaction(function (err) {
                if (err) return done(err);

                body(function (err) {
                    if (err) return conn.rollback(function () {
                        done(err);
                    });

                    conn.commit(function (err) {
                        if (err) return conn.rollback(function () {
                            done(err);
                        });

                        done();
                    });
                });
            });
        }

    });
};

exports.post = function () {
    return state.pool
}

exports.fixtures = function (data) {
    var pool = state.pool
    if (!pool) return done(new Error('Missing database connection.'))

    var names = Object.keys(data.tables)
    async.each(names, function (name, cb) {
        async.each(data.tables[name], function (row, cb) {
            var keys = Object.keys(row),
                values = keys.map(function (key) { return "'" + row[key] + "'" })

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
        }, cb)
    }, done)
}

exports.drop = function (tables, done) {
    var pool = state.pool
    if (!pool) return done(new Error('Missing database connection.'))

    async.each(tables, function (name, cb) {
        pool.query('DELETE * FROM ' + name, cb)
    }, done)
}