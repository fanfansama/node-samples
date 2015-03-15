/**
 * Created by francois on 15/03/2015.
 */

var express = require('express')
var app = express()

/////////////////////////////////////////////
// 1.
/////////////////////////////////////////////

app.get('/about', function (req, res) {
    res.send('about')
})

app.get('/random.text', function (req, res) {
    res.send('random.text')
})



/////////////////////////////////////////////
// 2.a basic routing
/////////////////////////////////////////////
app.route('/book')
    .get(function(req, res) {
        res.send('Get a random book');
    })
    .post(function(req, res) {
        res.send('Add a book');
    })
    .put(function(req, res) {
        res.send('Update the book');
    })


/////////////////////////////////////////////
// 2.b  routing
/////////////////////////////////////////////
var birds = require('./routers/birds');
app.use('/birds', birds);

var rooter = require('./routers/rooter');
app.use('/rooter', rooter);

/////////////////////////////////////////////
// 3. resource static
// http://localhost:3000/static/img/jedi.jpeg
// http://localhost:3000/static/index
/////////////////////////////////////////////

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
};
app.use('/static', express.static('resources',options));


/////////////////////////////////////////////
// 4.
/////////////////////////////////////////////
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

var cb2 = function (req, res) {
    res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])



/////////////////////////////////////////////
//5.
/////////////////////////////////////////////
app.use('/user/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);

    next(); //

}, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

// handler for /user/:id which prints the user id
app.get('/user/:id', function (req, res, next) {
    res.end(req.params.id);
    console.log(req.params.id);
});



module.exports = app;