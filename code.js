//document.body.onload = addElement

// global variables
let rows = 25;
let cols = 25;
let el = document.getElementById('generation')
let gen = 0;
let timer;
let reproductionTime = 200;

let playing = false;

// grid state
let grid = new Array(rows)
let nextGrid = new Array(rows)

// adds arrays within initial arrays above
function initializeGrids() {
    // only one loop needed because both arrays are the same size
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

// loops every row and sets both grid and next grid at i and j to 0
function resetGrids() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

// loops through every col/row in grid and copies values in next grid array to current grid array and then sets next grid to all 0s to reset
function copyAndResetGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0
        }
    }
}

// initialize
function initialize() {
    createTable();
    initializeGrids();
    generationCount();
    resetGrids();
    setupControlButtons();
}
// createe the board
function createTable() {
    let gridContainer = document.getElementById("gridContainer");
    if (!gridContainer) {
        console.error("ERROR: NO DIV FOR GRID TABLE.")
    }
    let table = document.createElement("table");
    // looping through the table to make rows
    // outer loop that iterates through every row
    // i represents the row we are currently on as we go through the table :)
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");
        // j iterates 24 times and creates a td element for each iteration
        for (var j = 0; j < cols; j++) {
            let cell = document.createElement("td");
            // each cell will need a unique id so we can pick it out later
            // id is created by using the row # on i and cols # j plus an underscore
            cell.setAttribute("id", i + "_" + j);
            // initiate all cells to start with the dead class
            cell.setAttribute("class", "dead");
            // makes each cell clickable!
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr)
    }
    gridContainer.appendChild(table)
}

// turns cel from live to dead or dead to live
function cellClickHandler() {
    // splitting to determine the row and column for the cell in the model which corrosponds to the cell
    let rowcol = this.id.split("_");
    let row = rowcol[0];
    let col = rowcol[1];
    // gets class from the current cell and returns value of said cell
    let classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class","dead");
        grid[row][col] = 0;
    } else {
            this.setAttribute("class","live")
            grid[row][col] = 1;
        }
    }

// TODO: make beehive function. modify updateView for this.

// updates the view to match the data structure of the grid using splitting
function updateView() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.getElementById(i + "_" + j);
            if (grid[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live")
            }
            }
        }
    }
// button handlers

function setupControlButtons() {
    // start function onclick
    let startButton = document.getElementById("start");
    startButton.onclick = startButtonHandler;
    // clear function onclick
    let clearButton = document.getElementById("clear");
    clearButton.onclick = clearButtonHandler;

    let randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;
    
    let incrementButton = document.getElementById("increment")
    incrementButton.onclick = incrementButtonHandler;

    let gliderButton = document.getElementById("glider")
    gliderButton.onclick = gliderButtonHandler

    let beehiveButton = document.getElementById("beehive")
    beehiveButton.onclick = beehiveButtonHandler
}

function clearButtonHandler() {
    console.log("Clear the game, stop, clear the grid");
    playing = false;
    let startButton = document.getElementById("start");
    startButton.innerHTML = "🎬"

    clearTimeout(timer);
    // resets view
    let cellsList = document.getElementsByClassName("live");
    let cells = []
    for (let i = 0; i < cellsList.length; i++) {
        //cellsList[i].setAttribute("class", "dead" );
        cells.push(cellsList[i])
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].setAttribute("class","dead")
    }
    // resets state
    resetGrids()
    gen = 0
}

function startButtonHandler() {
    if (playing) {
        console.log("Pause the game");
        playing = false
        this.innerHTML = "▶"
        // clear timer
        clearTimeout(timer)
    } else {
        console.log("Continue game");
        playing = true
        this.innerHTML = "⏸"
        play()
    }
}

function generationCount(){
    el.innerText = "Generations:" + " " + gen;
}

function randomButtonHandler() {
    if (playing) return;
    clearButtonHandler();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let isLive = Math.round(Math.random());
            if (isLive == 1) {
                let cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                grid[i][j] = 1;
            }
        }
    }
}

function incrementButtonHandler() {
    if (playing) {
        playing = false
    }
    computeNextGen()
}

function gliderButtonHandler(row,col) {
   if (playing) {
       //clearButtonHandler()
   }

   for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell1 = document.getElementById(10 + "_" + 11);
        let cell2 = document.getElementById(11 + "_" + 12);
        let cell3 = document.getElementById(12 + "_" + 12);
        let cell4 = document.getElementById(12 + "_" + 11);
        let cell5 = document.getElementById(12 + "_" + 10);
        if (grid[i][j] == grid[10][11]) {
            cell1.setAttribute("class", "alive");
            cell2.setAttribute("class", "alive");
            cell3.setAttribute("class", "alive");
            cell4.setAttribute("class", "alive");
            cell5.setAttribute("class", "alive");
            console.log("success")

            grid[10][11] = 1
            grid[11][12] = 1
            grid[12][12] = 1
            grid[12][11] = 1
            grid[12][10] = 1
        } else {
            cell.setAttribute("class", "live")
        }
        }
    }

}

function beehiveButtonHandler() {
    //bugs!!!!
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell1 = document.getElementById(15 + "_" + 14);
            let cell2 = document.getElementById(15 + "_" + 15);
            let cell3 = document.getElementById(16 + "_" + 13);
            let cell4 = document.getElementById(16 + "_" + 16);
            let cell5 = document.getElementById(17 + "_" + 14)
            let cell6 = document.getElementById(17 + "_" + 15);
            if (grid[i][j] == grid[10][11]) {
                cell1.setAttribute("class", "alive");
                cell2.setAttribute("class", "alive");
                cell3.setAttribute("class", "alive");
                cell4.setAttribute("class", "alive");
                cell5.setAttribute("class", "alive");
                cell6.setAttribute("class", "alive");
                console.log("success")
    
                grid[15][14] = 1
                grid[15][15] = 1
                grid[16][13] = 1
                grid[16][16] = 1
                grid[17][14] = 1
                grid[17][15] = 1
            } else {
                cell.setAttribute("class", "live")
            }
            }
        }
}

function play() {
    console.log("Play!!!")
    computeNextGen();

    if (playing) {
        timer = setTimeout(play, reproductionTime)
        generationCount()
    }
}

// loops through all rows/cols to activate applyRules function
function computeNextGen() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            applyRules(i, j);
        }
        //gen++
        //console.log("GEN: ",gen)
    }
    
    // updates datastructure
    copyAndResetGrid()
    // updates the view
    updateView()
    gen++
    console.log("GEN: ",gen)
}

// apply the rules of life to one cell at a time
// 
function applyRules(row, col) {
    let numNeighbors = countNeighbors(row, col);
    if (grid[row][col] == 1) {
        if (numNeighbors < 2) {
            nextGrid[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][col] = 1;
        } else if (numNeighbors > 3) {
            nextGrid[row][col] = 0;
        }
    } else if (grid[row][col] == 0) {
        if (numNeighbors == 3) {
            nextGrid[row][col] = 1;
        }
    }
}


function countNeighbors(row, col) {
    let count = 0;
    // cell above current cell
    if (row-1 >= 0) {
        if (grid[row-1][col] == 1) count++;
    }
    // upper left cell
    // "row-1 >= 0 && col-1 >= 0" checks if cell even exists. this check will fail if used on any cell in the very first row of the grid.
    if (row-1 >= 0 && col-1 >= 0) {
        if (grid[row-1][col-1] == 1) count++;
    }
    // upper right
    if (row-1 >= 0 && col+1 < cols) {
        if (grid[row-1][col+1] == 1) count++;
    }
    // to the right
    if (col-1 >= 0) {
        if (grid[row][col-1] == 1) count++;
    }
    // to the left
    if (col+1 < cols) {
        if (grid[row][col+1] == 1) count++;
    }
    // directly below
    if (row+1 < rows) {
        if (grid[row+1][col] == 1) count++;
    }
    // lower left
    if (row+1 < rows && col-1 >= 0) {
        if (grid[row+1][col-1] == 1) count++;
    }
    // lower right
    if (row+1 < rows && col+1 < cols) {
        if (grid[row+1][col+1] == 1) count++;
    }
    return count;
}


// begin!
window.onload = initialize






