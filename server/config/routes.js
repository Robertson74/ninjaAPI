var auth = require('./auth');
var companiesController = require('../controllers/companies');
var routesIndex = require('../routes/index');
// var navigationRoutes = require('../routes/api_navigation');
//var userRoutes = require('../routes/api_users.js');
// var contractRoutes = require('../routes/api_contracts.js');
// var customerRoutes = require('../routes/api_customers.js');
//var companyRoutes = require('../routes/api_companies.js');
// var bidRoutes = require('../routes/api_bids.js');
// var menuRoutes = require('../routes/api_menus.js');
// var menuItemRoutes = require('../routes/api_menuItems.js');
// var menuGroupRoutes = require('../routes/api_menuGroups.js');
// var lookupsRoutes = require('../routes/api_lookups.js');

    

module.exports = function (app) {
    // defining routes on the passed in express app
    
    // handle the one api route that requires no authentication
    app.post('/api/companies', companiesController.createCompany);
    app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    // lockout api without authenticated user.  passport puts a user object
    // on the req object...so if its not there there is no authenticated user
    // app.use('/api/*',function(req, res, next){
    //     next();
    //     // if ('user' in req){
    //     //     next();
    //     // }
    //     // else {
    //     //     res.sendStatus(403);
    //     // }
    // });
    // app.get('/api/v1/users', function(req,res){
    //     res.send({data: 'data'});
    // });
    app.use('/api', routesIndex);
    //api routes with pointers to custom routers
    // app.use('/api/navigation', navigationRoutes);
    // app.use('/api/contracts', contractRoutes);
    //app.use('/api/users', userRoutes);
    // app.use('/api/customers', customerRoutes);
    //app.use('/api/companies', companyRoutes);
    // app.use('/api/bids', bidRoutes);
    // app.use('/api/menus', menuRoutes);
    // app.use('/api/menuItems', menuItemRoutes);
    // app.use('/api/menuGroups', menuGroupRoutes);
    // app.use('/api/lookups', lookupsRoutes);
    
    // Partials
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    // Login and Logout
    // the post to /login is where passport adds the req.user to the req object
    app.post('/login', auth.authenticate2);
    // on logout passport removes req.user so that it is undefined in the response thus manking front end "logged out"
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });
    // API
    // any undefined api route returns 404
    app.all('/api/*', function (req, res) {
        res.sendStatus(404);
    });
    // bootstrappedUser gets added on page refreshes if the user is logged in otherwise it is undefined.
    app.get('*', function (req, res) {
        console.log(req.user);
        res.render('index', { bootstrappedUser: req.user });
    });

};