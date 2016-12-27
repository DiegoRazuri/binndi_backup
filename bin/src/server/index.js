'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _api = require('src/server/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//configuracion de autenticacion con passport
var passport = require('passport');
require('src/server/passport')(passport);

//configuracion de server
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);

//conexion a base de datos
_mongoose2.default.connect(process.env.MONGODB_URI || 'mongodb://localhost/binndi', function (err, res) {
	if (err) throw err;
	console.log("conectado con exito a la base de datos");
});

//Configuracion para obtener datos mediante post con body-parser
//antes de configurar los archivos estaticos se indica los parsers
app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
//sesiones de express
app.use((0, _expressSession2.default)({
	secret: 'binndicambiarclave',
	resave: false,
	saveUninitialized: false
}));

//configuracion de archivos estaticos
app.use(_express2.default.static('public'));

//configuracion de passport
app.use(passport.initialize());
app.use(passport.session());

/*
app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
	successRedirect : '/',
	failureRedirect : '/'
}));
*/
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	//	successRedirect : '/',
	failureRedirect: '/'
}), function (req, res) {
	if (req.user.isNew) {
		console.log("es nuevo");
		return res.redirect('/otro');
	} else {
		res.redirect('/');
	}
});

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

//endpoints
app.use('/api', _api2.default);

//configuracion de ruteo
app.get('*', function (req, res) {
	res.sendFile(_path2.default.join(__dirname, '../../public', 'index.html'));
});

//levantamiento de servidor
server.listen(process.env.PORT || 3000, function () {
	return console.log("servidor iniciado");
});

//PORT=3000 FACEBOOK_APP_ID=715593598509472 FACEBOOK_APP_SECRET=4b82d62979632cb84e84aca91a1693a8  TWITTER_CONSUMER_KEY=4EUcaY9Er9G0ACtZ9DwjAjvOS TWITTER_CONSUMER_SECRET=3gHfGvQXFCOONrFLdBInVY2Jd98flwEdXimwLVJxEJSR1HySGG npm run start