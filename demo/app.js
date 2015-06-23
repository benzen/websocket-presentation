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
//-------------------------------------------
//Server Websocket
//-------------------------------------------
//
var chooseHand = function(){
  return (Math.random() * 10) < 5 ? "Right" : "Left";
};
var plays = [];
var createPlay = function(){
  var play = {
    id: plays.length,
    hand: chooseHand(),
    score: 0
  };
  plays.push(play);
  return play.id
};

var turn = function(play, choice){
  var win  = play.hand == choice;
  play.score += (win ? 1 : -1);
  var result = win ? 'Win': 'Loose';
  
  //Reporting result on the server's console
  console.log("----------------------------");
  console.log("User     choosed: " + choice);
  console.log("Computer choosed: " + play.hand);
  console.log("For the player: " + play.id + " Score is:" + play.score);
  console.log(result);

  //Prepare for the next round
  play.hand = chooseHand()
    
  return result;
};

var startPlay = function(conn, playId){
    conn.sendText("choose");
    conn.on("text", function (choice) {
      var play = plays[playId];
      var win = turn(play, choice);
      conn.sendText(win);
      conn.sendText("Score is "+ play.score);
      conn.sendText("choose");
    });
};
var onConnection = function (conn) {
    console.log("New connection")
    var playId = createPlay();
    startPlay(conn, playId);
    conn.on("error", function(err){  console.log("AN ERROR OCCURED"); });
    conn.on("close", function (code, reason) { console.log("Connection closed"); });
}; 
var server = ws.createServer(onConnection);
server.listen(WS_PORT);
console.log("waiting for players on port " + PORT );


