// require files
var authController = require('./controller/auth'),
	usersController = require('./controller/users'),
	activitiesController = require('./controller/activities'),
	journalController = require('./controller/journal'),
	dashboardController = require('./controller/dashboard');

module.exports = function(app, ini) {

	//Only the requests that start with /dashboard/* will be checked for the validation.
	// app.all('/dashboard/*', []);

	// add routes
	app.get('/dashboard/login', authController.getLogin);
	app.post('/dashboard/login', authController.postLogin);
	app.get('/dashboard/logout', authController.logout);
	app.get('/dashboard', authController.validateSession, dashboardController.index);
	app.get('/dashboard/users', authController.validateSession, usersController.index);
	app.get('/dashboard/users/add', authController.validateSession, usersController.addUser);
	app.post('/dashboard/users/add', authController.validateSession, usersController.addUser);
	app.get('/dashboard/users/edit/:uid', authController.validateSession, usersController.editUser);
	app.post('/dashboard/users/edit/:uid', authController.validateSession, usersController.editUser);
	app.get('/dashboard/users/delete/:uid', authController.validateSession, usersController.deleteUser);
	app.get('/dashboard/journal', authController.validateSession, journalController.index);
	app.get('/dashboard/journal/:jid', authController.validateSession, journalController.getEntries);
	app.get('/dashboard/activities', authController.validateSession, activitiesController.index);

	// If no route is matched by now, it must be a 404
	app.get('/dashboard/*', function(req, res) {
		res.render('404', {
			"message": "Route Not Found!",
			"url": req.protocol + '://' + req.get('host') + req.originalUrl
		});
	});
}
