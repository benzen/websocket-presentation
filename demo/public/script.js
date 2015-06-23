console.log("Bienvenu dans la console");
console.log("Allez donc faire un tour dans l'onglet script");
var ws = new WebSocket("ws://localhost:3001");
ws.onopen = function(){
  console.log("Let's play");
};
ws.onclose = function(){
  console.log("The server doesn't respond anymore");
  enableButtons(false);
}

var leftButton = document.getElementById("left");
var rightButton = document.getElementById("right");

var enableButtons = function(enable){
  if(enable){
    leftButton.removeAttribute('disabled');
    rightButton.removeAttribute('disabled');
  }else{
    leftButton.setAttribute('disabled', true);
    rightButton.setAttribute('disabled', true);
  }
};

leftButton.addEventListener('click',function(){ 
  ws.send('Left');
  enableButtons(false);
}, false);
rightButton.addEventListener('click',function(){ 
  ws.send('Right');
  enableButtons(false);
}, false);


ws.onmessage = function(msg){
  console.log("Server says: " + msg.data);
  switch(msg.data){
    case "choose": 
      console.log("I have to choose");
      enableButtons(true);
      break;
  }
};
