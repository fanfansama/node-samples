/**
 * Created by francois on 15/03/2015.
 */

var express = require('express')

var router = express.Router();

// a middleware with no mount path, gets executed for every request to the router
router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// a middleware sub-stack shows request info for any type of HTTP request to /user/:id
router.use('/user/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
}, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

// a middleware sub-stack which handles GET requests to /user/:id
router.get('/user/:id', function (req, res, next) {
    // if user id is 0, skip to the next router
    if (req.params.id == 0) next('route');
    // else pass the control to the next middleware in this stack
    else next(); //
}, function (req, res, next) {
    // render a regular page
    res.render('regular');
});

// handler for /user/:id which renders a special page
router.get('/user/:id', function (req, res, next) {
    console.log(req.params.id);
    res.render('special');
});

module.exports = router;