var cols, rows;
var w = 20;
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

    // setup start location
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 3; i++) {
            grid[index(i,j)].visited = true;
            grid[index(i,j)].walls = [false, false, false, false];
        }
    }
    grid[index(2,1)].walls[2] = false;
    grid[index(2,2)].walls[0] = false;
    current = grid[index(2,2)];

    // setup end location
    for (var j = rows-2; j < rows; j++) {
        for (var i = cols-3; i < cols; i++) {
            grid[index(i,j)].visited = true;
            grid[index(i,j)].walls = [false, false, false, false];
        }
    }
    grid[index(cols-3,rows-3)].walls[2] = false;
    grid[index(cols-3,rows-2)].walls[0] = false;

}

function draw() {
    background(255);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    fill(0);
    textSize(12);
    text('Start', w*(2/3), w*(5/4));
    text('Finish', (cols*w - w*3 ) + w*(2/3) , (rows*w - w*2) + w*(5/4));

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