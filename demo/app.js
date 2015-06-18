var ws = require('nodejs-websocket');
var sn = require("static-now"); 

var PORT = 3000;
var WS_PORT = 3001;

//-------------------------------------------
//Static file server (for index.html and script.js)
//-------------------------------------------
var options = { 
  directory: "./public", 
  portnumber: PORT,
  log: false
};

sn(options);

var chooseHand = function(){
  return (Math.random() * 10) < 5 ? "Right" : "Left";
};

//-------------------------------------------
//Server Websocket
//-------------------------------------------
//




var onConnection = function (conn) {
    console.log("New connection")
    conn.sendText("Right or Left");
    var side = chooseHand()
    conn.on("text", function (str) {
        console.log("Client choosed " + str);
        var resp = str == side ? "BINGO" : "NOPE"
        conn.sendText(resp);
        conn.sendText("Score is 0");
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    });
}; 
var server = ws.createServer(onConnection);
server.listen(WS_PORT);


