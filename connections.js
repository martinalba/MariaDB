var mysql = require('mysql');

function Conexion(){
    this.pool = null;

    this.inicial = function(){
        this.pool = mysql.createPool({
            connectionLimit:10,
            host: 'localhost',
            user: 'jose',
            password:'root',
            database:'claria',
            port: 3307
        })
    }

    this.obtener = function(callback) {
        this.pool.getConnection(function(error,connection){
            callback(error,connection);
        })
    }
}

module.exports = new Conexion();