const GRID_DIMENSION = 512; // grid width and height in pixels
const GRID_COLOR = "#505050";
const CELL_BORDER_WIDTH = 1; // cell border width in pixels
const CELL_BACKGROUND_COLOR = 'white';
const INK_COLOR_BLACK = 1;
const INK_COLOR_DARKEN = 2;
const INK_COLOR_MULTICOLOR = 3;

// set grid properties
let grid = document.querySelector('#grid');
grid.style.height = GRID_DIMENSION + "px";
grid.style.width = GRID_DIMENSION + "px";
grid.style.borderColor = GRID_COLOR;
grid.style.borderStyle = "solid";

let cellsPerSide = 16; // variable to store grid size

// set default ink color to black
let inkColor = INK_COLOR_BLACK;
document.querySelector("input#ink-color-black").checked = true;

// Returns an integer random number between min (included) and max (included)
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setGridBordersWidth(gridDimension, cellsPerSide) {
    // calculate left over width that will be distributed to borders
    let leftOverWidth = gridDimension % cellsPerSide;

    let grid = document.querySelector('#grid');

    // set width of border left and top
    let leftBorderWidth = Math.floor(leftOverWidth / 2);
    grid.style.borderLeftWidth = leftBorderWidth + 'px';
    grid.style.borderTopWidth = leftBorderWidth + 'px';

    // set width of border right and bottom
    let rightBorderWidth = leftOverWidth - leftBorderWidth;
    grid.style.borderRightWidth = rightBorderWidth + 'px';
    grid.style.borderBottomWidth = rightBorderWidth + 'px';    
}

function createCells(cellsPerSide) {
    const cellSize = Math.floor(GRID_DIMENSION / cellsPerSide); // cell size in pixels

    let grid = document.querySelector('#grid');
    for (let i = 0; i < cellsPerSide * cellsPerSide; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = cellSize + 'px';
        cell.style.height = cellSize + 'px';
        cell.style.borderWidth = CELL_BORDER_WIDTH + 'px';
        cell.style.borderColor = GRID_COLOR;
        cell.style.backgroundColor = CELL_BACKGROUND_COLOR;

        // change cell background on mouse enter
        cell.addEventListener("mouseenter", (e) => {
            switch(inkColor) {
                case INK_COLOR_BLACK:
                    e.target.style.backgroundColor = 'black';
                    break;
                case INK_COLOR_DARKEN:
                    if (e.target.style.backgroundColor == CELL_BACKGROUND_COLOR) {
                        e.target.style.backgroundColor = 'black';
                        e.target.style.opacity = 0.1.toString();
                    } else if (e.target.style.backgroundColor == 'black' && e.target.style.opacity < 1) {
                        e.target.style.opacity = (parseFloat(e.target.style.opacity) + 0.1).toString();
                    }
                    break;
                case INK_COLOR_MULTICOLOR:
                    e.target.style.backgroundColor = `rgb(${randomInteger(0, 255)}, ${randomInteger(0, 255)}, ${randomInteger(0, 255)})`;
                    // e.target.style.backgroundColor = rgb(randomInteger(0, 255), randomInteger(0, 255), randomInteger(0, 255));
                    // e.target.style.backgroundColor = 'rgb(255,0,0)';
                    break;
            }
        });

        grid.appendChild(cell);
    }
}

function clearGrid() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.style.backgroundColor = CELL_BACKGROUND_COLOR;
        cell.style.opacity = 1;
    });
}

// function of Cells-per-side input range - on value change:
//      - change number displayed on label
//      - create new grid with new size
let inpCellsPerSide = document.querySelector("#cells-per-side");
inpCellsPerSide.addEventListener("input", (e) => {

    cellsPerSide = parseInt(e.target.value);

    // change number displayed on label
    document.querySelector("#lbl-cells-per-side").textContent = cellsPerSide;

    // change grid size
    document.querySelectorAll("#grid div").forEach((cell) => cell.remove());
    setGridBordersWidth(GRID_DIMENSION, cellsPerSide);
    createCells(cellsPerSide);
});

// dispatch input event to initialize grid
document.querySelector("#cells-per-side").dispatchEvent(new Event("input"));

// add function to Clear button
document.querySelector("#clear").addEventListener("click", clearGrid);

// add function to radio buttons
document.querySelector("input#ink-color-black").addEventListener("change", () => {
    clearGrid();
    inkColor = INK_COLOR_BLACK;
});
document.querySelector("input#ink-color-darken").addEventListener("change", () => {
    clearGrid();
    inkColor = INK_COLOR_DARKEN;
});
document.querySelector("input#ink-color-multicolor").addEventListener("change", () => {
    clearGrid();
    inkColor = INK_COLOR_MULTICOLOR;
});

