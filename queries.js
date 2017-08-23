var conexion = require('./connections');
var jwt = require('jsonwebtoken');

function MetodoDB(){
    this.seleccionar = function(respuesta){
        conexion.obtener(function(er, cn){
            cn.query('select * from banderas', function(error,resultado){
                cn.release();
                if(error){
                    respuesta.send({ estado: 'Error' })
                }else{
                    respuesta.send(resultado);
                }
            })
        })
    }

    this.seleccionarId = function(id,respuesta){
        conexion.obtener(function(er, cn){
            cn.query('select * from tratamiento where banderas_idbanderas = ?', id,function(error,resultado){
                cn.release();
                if(error){
                    respuesta.send({ estado: 'Error' })
                }else{
                    respuesta.send(resultado);
                }
            })
        })
    }

     this.insertar = function(datos, respuesta) {
      conexion.obtener(function(er, cn){
         cn.query('insert into banderas set ?', datos, function(error, resultado){
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' });
            } else {
               respuesta.send({ estado: 'Ok' });
            }
         })
      })
   }

    this.seleccionarIdsenal = function(id,respuesta){
        conexion.obtener(function(er, cn){
            cn.query('select * from contenido where tratamiento_idtratamiento = ?', id,function(error,resultado){
                cn.release();
                if(error){
                    respuesta.send({ estado: 'Error' })
                }else{
                    respuesta.send(resultado);
                }
            })
        })
    }

    this.seleccionardetalles = function(id,respuesta){
        conexion.obtener(function(er, cn){
            cn.query('select * from contenido where idcontenido = ?', id,function(error,resultado){
                cn.release();
                if(error){
                    respuesta.send({ estado: 'Error' })
                }else{
                    respuesta.send(resultado);
                }
            })
        })
    }

    this.actualizar = function (datos, respuesta){
        conexion.obtener(function(er, cn){
            cn.query('update inventario set ? where id = ?',[datos, datos.id],function(error, resultado){
                cn.release();
                if (error){
                    respuesta.send({ estado: 'Error'});
                }else{
                    respuesta.send({estado: 'ok'});
                }
            })
        })
    }

    this.borrar = function(id, respuesta){
        conexion.obtener(function(er, cn){
            cn.query('delete from inventario where id = ?', id, function(error,resultado){
                cn.release();
                if(error){
                    respuesta.send({ estado: 'Error'});
                }else {
                    respuesta.send({estado: 'ok'})
                }
            })
        })
    }

    this.login = function(datos, respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('select * from usuarios where user=? and pass=?',[datos.user, datos.pass], function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send('error');
            } else {
               if (resultado.length == 0) {
                  console.log('No se encuentra el usuario');
                  respuesta.send('nofound');
               } else {
                  var token = jwt.sign({
                     user: datos.user,
                     rol: 'admin'
                  },'secreto',{expiresIn: '120s'});
                  respuesta.send(token);
               }
            }
         })
      })
   }

}

module.exports = new MetodoDB();

