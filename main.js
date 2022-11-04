var cols, rows;
var w = 20;
var grid = [];

var start_x, start_y;
var finish_x, finish_y;

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
    start_x = floor(random(0,cols-3));
    start_y = floor(random(0,rows-3));
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 3; i++) {
            grid[index(start_x+i,start_y+j)].visited = true;
            grid[index(start_x+i,start_y+j)].walls = [false, false, false, false];
        }
    }
    grid[index(start_x+2,start_y+1)].walls[2] = false;
    grid[index(start_x+2,start_y+2)].walls[0] = false;
    current = grid[index(start_x+2,start_y+2)];

    // setup finish location
    finish_x = floor(random(0,cols-3));
    finish_y = floor(random(1,rows-1));
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 3; i++) {
            grid[index(finish_x+i,finish_y+j)].visited = true;
            grid[index(finish_x+i,finish_y+j)].walls = [false, false, false, false];
        }
    }
    grid[index(finish_x+2,finish_y-1)].walls[2] = false;
    grid[index(finish_x+2,finish_y)].walls[0] = false;

}

function draw() {
    background(255);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    fill(0);
    textSize(12);
    textAlign(CENTER,CENTER);
    text('Start', (start_x*w) + (3*w/2), (start_y*w) + w);
    text('Finish', (finish_x*w) + (3*w/2), (finish_y*w) + w);

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