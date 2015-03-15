var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    var o = {};
    o.req = req;
    o.res = 'res';

    var postData = JSON.stringify(o);

    res.end(postData);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');