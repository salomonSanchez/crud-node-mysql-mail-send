var modelo = require("../models/databa");

exports.consultar = function(req, res){
	modelo.traerDatos(req,res)
}

exports.insertar = (req, res) => {
	modelo.agregarData(req,res)
}
exports.fallo = (req, res) => {
	res.render('404');
}

exports.editar = function(req, res){
	modelo.editar(req, res);
}

exports.borrar = function(req, res){
	modelo.eliminar(req, res);
}

exports.actualiza = function(req, res){
	modelo.actualizar(req, res);
}

exports.emailPrepare= function(req,res){
modelo.preparaCorreo(req, res);
}

exports.sendCorreo = function(req, res){
	modelo.EnviarCorreoGmail(req, res);
}