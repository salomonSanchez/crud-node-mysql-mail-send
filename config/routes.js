var home = require('../app/controllers/home');

//you can include all your controllers

module.exports = function (app) {
    //llamdo get
    app.get('/',home.consultar);//home
    app.get('/consultar',home.consultar);//home
    app.get('/error',home.fallo);//home
    //llamdo post
    app.post('/insertar', home.insertar);
    app.post('/update/:id', home.actualiza);
    //
    app.get('/update/:id', home.editar);
    app.get('/delete/:id', home.borrar);
    app.get('/mail/:id', home.emailPrepare);
    app.post('/send-mail', home.sendCorreo);
    

}
