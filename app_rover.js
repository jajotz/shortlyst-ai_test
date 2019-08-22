var minX=0, minY=0;
var maxX,maxY;
var rovers = [];

function init(){
	document.getElementById("txtResults").value = "";
	document.getElementById("divInputs").innerHTML = "";

	document.getElementById("maxCoordinates").value = "5 5";

	document.getElementById("txtStartCoordinates1").value = "1 2 N";
	document.getElementById("txtMovement1").value = "LMLMLMLMM";

	document.getElementById("txtStartCoordinates2").value = "3 3 E";
	document.getElementById("txtMovement2").value = "MMRMMRMRRM";
}

function run(){
	document.getElementById("txtResults").value = "";
	if(!setField()){return;}

	rovers = constructRovers();
	
	for(var i=0;i<rovers.length;i++){
		rovers[i].move(maxX, maxY);
		document.getElementById("txtResults").value += rovers[i].getCurrentLoc() + "\n";
	}
}

function reset(){
	init();
}

function addCase(){
	var table = "<table>";
	table += "<tr>";
	table += "<td>Input2 (start coordinates)</td>";
	table += '<td><input class="startCoordinates" type="text"></td>';
	table += "</tr>";
	table += "<tr>";
	table += "<td>Input3 (movement)</td>";
	table += '<td><input class="movement" type="text"></td>';
	table += "</tr>";
	table += "</table>";

	document.getElementById("divInputs").innerHTML += table;
}
	

var RoverProto = function(x, y, direction, movement) {
	this.directions = ["N","E","S","W"];
	this.x = x;
	this.y = y;
	this.directionIdx = 0;
	this.movement = movement;

	init.apply(this);

	function init(){
		
		for(var i=0;i<this.directions.length;i++){
			if(direction.toUpperCase() == this.directions[i]){
				this.directionIdx = i;
				break;
			}
		}
	
	};
	

	this.move = function(maxX, maxY){
		var steps = movement.split('');
		for(var i=0;i<steps.length;i++){

			switch (steps[i].toUpperCase()){
				case "L": //LEFT
					this.directionIdx--; 
					if(this.directionIdx<0) this.directionIdx = this.directions.length - 1;
					break;
				case "R": //RIGHT
					this.directionIdx = (this.directionIdx + 1) % this.directions.length;
					break;
				case "M": //MOVE
					if(this.directionIdx == 0){ //NORTH
						if(this.y < maxY) this.y++;
					}else if(this.directionIdx == 1){ //EAST
						if(this.x < maxX) this.x++;
					}else if(this.directionIdx == 2){ //SOUTH
						if(this.y > 0) this.y--;
					}else if(this.directionIdx == 3){ //WEST
						if(this.x > 0) this.x--;
					}
					break;
				default:break;
			}		
		}
	};

	this.getCurrentLoc = function(){
		return this.x + " " + this.y + " " + this.directions[this.directionIdx];
	}
  }

function setField(){
	var valid = true;
	var coordinates = document.getElementById("maxCoordinates").value.split(" ");
	if(coordinates.length != 2){
		valid = false;
	}

	try{
		maxX = parseInt(coordinates[0]);
		maxY = parseInt(coordinates[1]);
	}catch{
		valid = false;
	}
	
	if(!valid){
		alert("invalid max coordinates");
	}
	return valid;
}

function constructRovers(){
	var valid = true;
	var rovers = [];

	var inputCoordinates = document.getElementsByClassName("startCoordinates");
	var inputMovement = document.getElementsByClassName("movement");

	for(var i=0;i<inputCoordinates.length;i++){
		
		if(inputCoordinates[i].value.trim() == "" || inputMovement[i].value.trim() == ""){
			continue;
		}

		coordinates = inputCoordinates[i].value.split(' ');
		
		if(coordinates.length != 3){
			alert("invalid coordinates");
			return false;
		}
		
		try{
			var x = parseInt(coordinates[0]);
			var y = parseInt(coordinates[1]);		
			var direction = coordinates[2];
	
			var rover = new RoverProto(x, y, direction, inputMovement[i].value.trim());

			rovers.push(rover);
		}catch{
			alert("invalid coordinates");
			return false;
		}	
	}

	return rovers;
}

module.exports = RoverProto;