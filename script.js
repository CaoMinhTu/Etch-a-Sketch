const GRID_DIMENSION = 512; // grid width and height in pixels
const GRID_COLOR = "#505050";

// đặt kích thước grid
let grid = document.getElementById('grid');
grid.style.height = GRID_DIMENSION + "px";
grid.style.width = GRID_DIMENSION + "px";
grid.style.borderColor = GRID_COLOR;
grid.style.borderStyle = "solid";

function setGridBordersWidth(gridDimension, cellsPerSide) {
    // tính độ rộng còn dư phải phân bổ cho hai biên
    let leftOverWidth = gridDimension % cellsPerSide;

    let grid = document.getElementById('grid');

    // đặt độ rộng biên trái và trên
    let leftBorderWidth = Math.floor(leftOverWidth / 2);
    grid.style.borderLeftWidth = leftBorderWidth + 'px';
    grid.style.borderTopWidth = leftBorderWidth + 'px';

    // đặt độ rộng biên phải và dưới
    let rightBorderWidth = leftOverWidth - leftBorderWidth;
    grid.style.borderRightWidth = rightBorderWidth + 'px';
    grid.style.borderBottomWidth = rightBorderWidth + 'px';    
}

function createCells(cellsPerSide) {

}

let cellsPerSide = 18;

setGridBordersWidth(GRID_DIMENSION, cellsPerSide);

