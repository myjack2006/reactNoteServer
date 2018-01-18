var express = require('express');
var app = express();
var fs = require("fs");

app.get('/getnotes/:dir', function (req, res) {
    fs.readFile( __dirname + '/userData/' + req.params.dir + '' + "/notes.json", 'utf8', function (err, data) {
        console.log( data );
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end( data );
    });
});

app.get('/addnote/:dir', function (req, res) {
    var filename = __dirname + '/userData/' + req.params.dir + '' + "/notes.json";
    fs.readFile(filename , 'utf8', function (err, data) {
        console.log( data );
        var result=JSON.parse(data);
        result.list.push({
            "ID": "A" + (new Date).getTime() + "A",
            "title": req.query.title,
            "link": req.query.link,
            "note": req.query.note
        });
        fs.writeFile(filename, JSON.stringify(result));
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end(JSON.stringify({"code": "000000", "msg": "Success"}));
    });
});

app.get('/deletenote/:dir', function (req, res) {
    var filename = __dirname + '/userData/' + req.params.dir + '' + "/notes.json";
    fs.readFile(filename , 'utf8', function (err, data) {
        console.log( data );
        var result=JSON.parse(data);
        for (var i = 0; i < result.list.length; i++) {
            if (result.list[i].ID == req.query.ID) {
                result.list.splice(i, 1);
                break;
            }
        }
        fs.writeFile(filename, JSON.stringify(result));
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end(JSON.stringify({"code": "000000", "msg": "Success"}));
    });
});

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})