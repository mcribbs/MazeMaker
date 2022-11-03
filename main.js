var cols, rows;
var w = 40;
var grid = [];

var current;

function setup() {
	createCanvas(400,400)
    cols = floor(width/w);
    rows = floor(height/w);

    frameRate(5);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }

    current = grid[0];
}

function draw() {
    background(51);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        removeWalls(current,next);
        current = next;
    }
}

function index(i,j) {
    if (i < 0 || i > cols - 1 || j < 0 || j > rows -1)
        return -1;

    return i + j * cols;
}