const mysql = require('mysql')
const url = require('../../config/database')
const dbConection = mysql.createConnection(url.urlMySql)

exports.traerDatos = function(req, res ){
	dbConection.query("select * from datos", function(err,result){
		if(!err){
		res.render("index",{Data : result})
	   }else
		res.redirect('/error');

	})
}


exports.agregarData = function(req, res){
	//console.log(req.body)
	var {name,correo} = req.body
	dbConection.query('INSERT INTO datos SET?',{
		nombre:name,
		correo:correo
		},function(err,result){
		if(!err){
			console.log('Datos insertados: ',result);
			res.redirect('/');
		}else{
			res.redirect('/error');
			console.log('Error al insertar datos ');
		}
	})
}


exports.editar = function(req, res){
	var ID  = req.params.id;
	dbConection.query("select * from datos where id = ?",[ID],function(err,resul){
		res.render('resultados_editar',{Data : resul[0]})
		console.log(resul);
	});
  }

  exports.eliminar = function(req, res){
	var ID  = req.params.id;
	dbConection.query("DELETE FROM datos WHERE id = ?",[ID],function(err,resul){
		res.redirect('/');
	});
  }

  exports.actualizar = function(req, res){
	var ID  = req.params.id;
	var {name,price} = req.body
	dbConection.query("UPDATE datos set ? where id = ?",[{nombre:name,correo:price},ID],function(err,resul){
		if(!err){
			console.log('Datos actualizados: ',resul);
			res.redirect('/');
		}else{
			res.redirect('/error');
			console.log('Error al actualizar datos ');
		}

	});
  }

  exports.preparaCorreo = function(req, res){
	var ID  = req.params.id;
	dbConection.query("select * from datos where id = ?",[ID],function(err,resul){
		res.render('Email',{Data : resul[0]})
		console.log(resul);
	});
  }

  exports.EnviarCorreoGmail = function(req, res){
	var nodeMailer = require('nodemailer');
	let transporter = nodeMailer.createTransport(url.correoGmail);
	
	let mailOptions = {
		from: '"Krunal sam" <salomonk2pz@gmail.com>', // sender address
		to: req.body.to, // list of receivers
		subject: req.body.subject, // Subject line
		text: req.body.body, // plain text body
		html: '<b>NodeJS Email Tutorial</b>' // html body
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
		res.redirect('/');
		});
  }

  