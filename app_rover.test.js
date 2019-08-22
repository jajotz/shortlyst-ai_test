const RoverProto = require('./app_rover');

test('Scenario1: success scenario', () => {
  var maxX = 5;
  var maxY = 5;

  var x = 1;
  var y = 2;
  var direction = "N";
  var movement = "LMLMLMLMM";
  
  var rover = new RoverProto(x,y,direction,movement);
  rover.move(maxX, maxY);
  
  expect(rover.getCurrentLoc()).toBe("1 3 N");
});

test('Scenario2: success scenario', () => {
  var maxX = 5;
  var maxY = 5;

  var x = 3;
  var y = 3;
  var direction = "E";
  var movement = "MMRMMRMRRM";
  
  var rover = new RoverProto(x,y,direction,movement);
  rover.move(maxX, maxY);
  
  expect(rover.getCurrentLoc()).toBe("5 1 E");
});

test('Scenario3: success scenario', () => {
  var maxX = 6;
  var maxY = 6;

  var x = 3;
  var y = 3;
  var direction = "N";
  var movement = "MMMMMMMMM";
  
  var rover = new RoverProto(x,y,direction,movement);
  rover.move(maxX, maxY);
  
  expect(rover.getCurrentLoc()).toBe("3 6 N");
});
