//codigo del servidor, inicializar

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//inicializaciones

const app = express();
require('./config/passport');

//configuraciones

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));//path.join y _dirname ejecutan rutas de busqueda para cualquier sistema operativo
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//middlewares, funciones que se ejecutan antes de procesar la app

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // convertir en JSON datos de formularios
app.use(methodOverride('_method'));
app.use(session({ //ayuda a guardar mensajes en el servidor, va de la mano con flash
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variables globales

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//rutas

app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/user.routes'));

//archivos estaticos(cualquier aplicacion cliente puede acceder desde el servidor)

app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;