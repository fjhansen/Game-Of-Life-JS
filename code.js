//document.body.onload = addElement

// global variables
let rows = 24;
let cols = 24;
let gen = 0;

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

// initialize
function initialize() {
    createTable();
    initializeGrids();
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

// button handlers

function setupControlButtons() {
    // start function onclick
    let startButton = document.getElementById("start");
    startButton.onclick = startButtonHandler;
    // clear function onclick
    let clearButton = document.getElementById("clear");
    clearButton.onclick = clearButtonHandler;
}

function clearButtonHandler() {
    console.log("Clear the game, stop, clear the grid");
    playing = false;
    let startButton = document.getElementById("start");
    startButton.innerHTML = "🎬"
}

function startButtonHandler() {
    if (playing) {
        console.log("Pause the game");
        playing = false
        this.innerHTML = "▶"
    } else {
        console.log("Continue game");
        playing = true
        this.innerHTML = "⏸"
        play()
    }
}

function play() {
    console.log("Play!!!")
}
// begin!
window.onload = initialize






