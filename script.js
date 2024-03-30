const GRID_DIMENSION = 512; // grid width and height in pixels
const GRID_COLOR = "#505050";
const CELL_BORDER_WIDTH = 1; // cell border width in pixels

// set grid properties
let grid = document.querySelector('#grid');
grid.style.height = GRID_DIMENSION + "px";
grid.style.width = GRID_DIMENSION + "px";
grid.style.borderColor = GRID_COLOR;
grid.style.borderStyle = "solid";

function setGridBordersWidth(gridDimension, cellsPerSide) {
    // calculate left over width that will be distributed to borders
    let leftOverWidth = gridDimension % cellsPerSide;
    console.log('leftOverWidth: ', leftOverWidth);

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
    console.log('cellSize: ', cellSize);

    let grid = document.querySelector('#grid');
    for (let i = 0; i < cellsPerSide * cellsPerSide; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = cellSize + 'px';
        cell.style.height = cellSize + 'px';
        cell.style.borderWidth = CELL_BORDER_WIDTH + 'px';
        cell.style.borderColor = GRID_COLOR;
        cell.style.backgroundColor = 'white';

        // change cell background on mouse enter
        cell.addEventListener("mouseenter", (e) => {
            e.target.style.backgroundColor = 'black';
        });

        grid.appendChild(cell);
    }
}

let cellsPerSide = 10;

setGridBordersWidth(GRID_DIMENSION, cellsPerSide);

createCells(cellsPerSide);