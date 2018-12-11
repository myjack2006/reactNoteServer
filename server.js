var express = require('express');
var app = express();
var fs = require("fs");

app.get('/getnotes/:dir', function (req, res) {
    fs.readFile( __dirname + '/userData/' + req.params.dir + '' + "/notes.json", 'utf8', function (err, data) {
        console.log( data );
        var callback = req.query.callback;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        if (callback == null) {
            res.end( data );
        } else {
            res.type('text/javascript');
            res.send(callback + '(' + data + ')');
        }
    });
});

app.get('/addnote/:dir', function (req, res) {
    var filename = __dirname + '/userData/' + req.params.dir + '' + "/notes.json";
    fs.readFile(filename , 'utf8', function (err, data) {
        console.log( data );
        var result=JSON.parse(data);
        var item = {
            "ID": "A" + (new Date).getTime() + "A",
            "title": req.query.title,
            "link": req.query.link,
            "note": req.query.note
        };
        result.list.push(item);
        fs.writeFile(filename, JSON.stringify(result), function() {});
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify({"code": "000000", "msg": "Success", "data": item}));
    });
});

app.get('/deletenote/:dir', function (req, res) {
    var filename = __dirname + '/userData/' + req.params.dir + '' + "/notes.json";
    fs.readFile(filename , 'utf8', function (err, data) {
      try {
        var result=JSON.parse(data);
        for (var i = 0; i < result.list.length; i++) {
          if (result.list[i].ID == req.query.ID) {
            result.list.splice(i, 1);
            break;
          }
        }
        fs.writeFile(filename, JSON.stringify(result), function() {});
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify({"code": "000000", "msg": "Success"}));
      } catch (err) {
        console.error(err);
      }
    });
});

app.get('/getnotes/:dir', function (req, res) {
    fs.readFile( __dirname + '/userData/' + req.params.dir + '' + "/notes.json", 'utf8', function (err, data) {
        console.log( data );
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end( data );
    });
});




var server = app.listen(801, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})
