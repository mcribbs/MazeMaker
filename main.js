var cols, rows;
var w = 50;
var grid = [];

var current;
var stack = [];

function setup() {
	createCanvas(800,1000)
    cols = floor(width/w);
    rows = floor(height/w);

    //frameRate(5);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }
    current = grid[0];
}

function draw() {
    background(255);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        stack.push(current);
        removeWalls(current,next);
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }
}

function index(i,j) {
    if (i < 0 || i > cols - 1 || j < 0 || j > rows -1)
        return -1;

    return i + j * cols;
}