document.body.onload = addElement

// global variables
let rows = 24;
let cols = 24;
// initialize
function initialize() {
    createTable();
}
// createe the board
function createTable() {

}

// begin!
window.onload = initialize
function addElement () {
    let newDiv = document.createElement("div")
    let table = document.createElement("table")

    // looping through the table to make rows

    // outer loop that iterates through every row
    // i represents the row we are currently on as we go through the table :)
    for (let i = 0; i < rows; i++ {
        let tr = document.createElement("tr");
        // j iterates 24 times and creates a td element for each iteration
        for (var j = 0; j < cols; j++) {
            let cell = document.createElement("td");
            // each cell will need a unique id so we can pick it out later
            // id is created by using the row # on i and cols # j plus an underscore
            cell.setAttribute("id", i + "_" + j)
            // initiate all cells to start with the dead class
            cell.setAttribute("class", "dead")
        }
    })
    newDiv.appendChild(rows)
    let currentDiv = document.getElementById("gridContainer");
    document.body.insertBefore(newDiv, currentDiv)
}

