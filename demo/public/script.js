console.log("Bienvenu dans la console");
console.log("Allez donc faire un tour dans l'onglet script");
var ws = new WebSocket("ws://localhost:3001");
ws.onopen = function(){
  console.log("Let's play");
};

var choose = function(){
  return (Math.random() * 10) < 5 ? "Right" : "Left";
};
ws.onmessage = function(msg){
  console.log("Server says: " +msg.data);
  switch(msg.data){
    case "Right or Left": 
      console.log("I have to choose");
      ws.send(choose());
      break;
  }
};

