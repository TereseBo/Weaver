
function createGrid(x = 4, y = 4, id = "grid") {//Skapar ett table-element med y antal rader och x antal kolumner och id id.
    let grid = document.createElement('div');
    grid.setAttribute("id", `${id}-wrapper`);
    let el = document.getElementById('content');
    el.appendChild(grid);
    for (let i = 0; i < y; i++) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        grid.appendChild(row);
        for (let j = 0; j < x; j++) {
            let cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            cell.setAttribute("Data-column", j);
            cell.setAttribute("Data-row", i);
            cell.setAttribute("Data-grid", id);
            let cellName = `${id}-${j}-${i}`;
            cell.setAttribute("id", cellName);
            row.appendChild(cell);

            //TODO: add effects of click
            onClickfunctionPicker(id, cell);
        }
        //grid.appendChild(row);
    }
}
function adjustDraftDisplay(gridSizeX, gridSizeY, thredlePreference, shaftPreference) {//Adjusts the size of the draft grid to prevent rezising of cells when adding shafts/thredles.
    let el = document.getElementById('content');
    let draft = document.getElementById('draft-wrapper');
    let shafts = document.getElementById('shafts-wrapper');
    let thredles = document.getElementById('thredles-wrapper');
    let tieUp = document.getElementById('tie-up-wrapper');
    gridSizeX = parseInt(gridSizeX);
    gridSizeY = parseInt(gridSizeY);
    //Adjusts the end columns/rows of the grid to accomodate for the number of shafts/thredles
    thredlePreference = parseInt(thredlePreference);
    shaftPreference = parseInt(shaftPreference);
    let draftAreaWidth = gridSizeX + thredlePreference + 2;
    let draftAreaHeight = gridSizeY + shaftPreference + 2;
    shafts.style.gridRowEnd = (draftAreaHeight);
    thredles.style.gridColumnEnd = (draftAreaWidth);
    tieUp.style.gridRowEnd = (draftAreaHeight);
    tieUp.style.gridColumnEnd = (draftAreaWidth);
}
function draftSetUp() {//Checks if user has set thredle/shaft preferences, if not uses 4 as default. Navigation to draft.html and creation og grid.
    let shaftPreference;
    let thredlePreference;
    (localStorage.getItem('shaftInput')) ? shaftPreference = localStorage.getItem('shaftInput') : shaftPreference = 4;
    (localStorage.getItem('thredleInput')) ? thredlePreference = localStorage.getItem('thredleInput') : thredlePreference = 4;
    let gridSizeX = 50;
    let gridSizeY = 50;
    createGrid(gridSizeX, gridSizeY, "draft");
    createGrid(gridSizeX, shaftPreference, "shafts");
    createGrid(thredlePreference, gridSizeY, "thredles");
    createGrid(thredlePreference, shaftPreference, "tie-up");

    adjustDraftDisplay(gridSizeX, gridSizeY, thredlePreference, shaftPreference);
}
//Functions in the actual draft
function getActiveColor() {//Returns the color of the color picker.
    let currentColor = document.getElementById('currentcolor').value;
    return currentColor;
}
function setBackgroundColorOnClick(cell, color = getActiveColor()) {
    if (!isActive(cell)) {
        cell.style.backgroundColor = color;
    } else {
        cell.style.backgroundColor = cell.parentElement.style.backgroundColor;//TODO:add function to reset grid-color on color-reset
    }
}

function onClickfunctionPicker(grid, cell) {
    switch (grid) {
        case "draft":
            break;
        case "shafts":
            cell.addEventListener("click", function () {
                setBackgroundColorOnClick(this);
                checkWarp(this);
                calculateDraftfromShaft(this);
                removeGridlines(this)
            });

            break;
        case "thredles":
            cell.addEventListener("click", function () {

                setBackgroundColorOnClick(this);
                calculateDraftfromTredle(this);


            });
            break;
        case "tie-up":
            cell.addEventListener("click", function () {
                setBackgroundColorOnClick(cell, "black");
                calculateDraftfromTieUp(this);
            });
            break;
        default:
            break;
    }
}
function checkWarp(cell) {
    let columnNr = cell.dataset.column;
    let grid = cell.dataset.grid;
    let currentColumn = document.querySelectorAll(`[data-grid="${grid}"][data-column="${columnNr}"]`);
    currentColumn.forEach(element => {
        if (cell !== element) {
            element.style.backgroundColor = element.parentElement.style.backgroundColor;
        }
    });
}
//TODO:add function to reset warp/weft colors on color-reset?
function calculateDraftfromShaft(cell) {
    let draft = document.getElementById('draft-wrapper');
    let tieUp = document.getElementById('tie-up-wrapper');
    let tredles = document.getElementById('thredles-wrapper');
    let currentDraftColumn = getColumnNr(cell);
    draft.querySelectorAll(`[data-column="${currentDraftColumn}"]`).forEach(element => {//Set warp color for all cells in column
        element.style.backgroundColor = cell.style.backgroundColor;
        element.dataset.thread = "warp";
    });
    tieUp.querySelectorAll(`[data-row="${getRowNr(cell)}"]`).forEach(element => {//If tied up, loop column i tredles and set weftcolor in draft if active
        if (element.style.backgroundColor !== element.parentElement.style.backgroundColor) {
            tredles.querySelectorAll(`[data-column="${getColumnNr(element)}"]`).forEach(element => {
                if (element.style.backgroundColor !== element.parentElement.style.backgroundColor) {
                    row = getRowNr(element);
                    let draftCell = draft.querySelector(`[data-row="${row}"][data-column="${currentDraftColumn}"]`);
                    draftCell.style.backgroundColor = element.style.backgroundColor;
                    draftCell.dataset.thread = "weft";
                }
            });
        }
    });
}
function calculateDraftfromTredle(cell) {

    let draft = document.getElementById('draft-wrapper');
    let currentDraftRowCells = draft.querySelectorAll(`[data-row="${getRowNr(cell)}"]`);
    let weftcolor = cell.style.backgroundColor;

    let tiedUpCells = findSameColumnIn(cell, "tie-up").filter(isActive);
    tiedUpCells.forEach(element => {
        let currentShaftRowCells = findSameRowIn(element, "shafts");
        console.log(element);
        let warpedInShaftRow = currentShaftRowCells.filter(isActive);
        console.log(warpedInShaftRow);
        warpedInShaftRow.forEach(cell => {
            let draftColumnNr = getColumnNr(cell);
            let draftCell = Array.from(currentDraftRowCells).find(cell => getColumnNr(cell) === draftColumnNr)
            draftCell.style.backgroundColor = weftcolor;
            draftCell.dataset.thread = "weft";
        });

    });

}

function calculateDraftfromTieUp(cell) {

    let tredleCells = [];
    let shaftCells = [];
    tredleCells = findSameColumnIn(cell, 'thredles').filter(isActive)//.forEach(element => {tredleCells.push(element) });

    console.log(tredleCells);
    shaftCells = findSameRowIn(cell, 'shafts').filter(isActive);


    tredleCells.forEach(activeTredle => {
        let draftRowCells = [];
        draftRowCells = findSameRowIn(activeTredle, 'draft')
        shaftCells.forEach(activeShaft => {
            let currentCell = draftRowCells.find(function (cell) {
                return getColumnNr(cell) === getColumnNr(activeShaft);
            });
            currentCell.style.backgroundColor = activeTredle.style.backgroundColor;
            currentCell.dataset.thread = "weft";
        });
    });

}

function isActive(cell) {
    return cell.style.backgroundColor !== cell.parentElement.style.backgroundColor;
}
function findSameColumnIn(cell, grid = "draft") {
    let columnNr = getColumnNr(cell);
    return Array.from(document.querySelectorAll(`[data-grid="${grid}"][data-column="${columnNr}"]`));
}
function findSameRowIn(cell, grid = "draft") {
    let rowNr = getRowNr(cell);
    return Array.from(document.querySelectorAll(`[data-grid="${grid}"][data-row="${rowNr}"]`));
}

function getColumnNr(cell) {
    return cell.dataset.column;
}
function getRowNr(cellId) {
    return cellId.dataset.row;
}

function getDraftCells(cell, callback) {
    console.log(cell);
    console.log(callback);
    let draftCells = [];
    draftCells[0] = callback(cell);
    console.log(draftCells);
    if (cell.nextElementSibling) {
        draftCells[1] = callback(cell.nextElementSibling);
    }
    if (cell.previousElementSibling) {
        draftCells[2] = callback(cell.previousElementSibling);
    }
    return draftCells;
}
function removeGridlines(cell) {
    console.log('Här är grid-lines');
    let adjecentCells = [];
    let grid = cell.dataset.grid;
    if (grid === "shafts") {
        adjecentCells = getDraftCells(cell, findSameColumnIn);
    }
    else if (grid === "thredles") {
        adjecentCells = getDraftCells(cell, findSameRowIn);
    }
    adjecentCells.forEach(element => {
        let lastIndex = element.length - 1;

        element.filter(cell => cell.dataset.thread === "weft").forEach(cell => {
            cell.style.borderLeft = "none";
            cell.style.borderRight = "none";
            cell.style.borderTop = "";
            cell.style.borderBottom = "";
            //TodO: Add find cell in next row in draft and remove border-bottom if both are weft(which they are)
        
        });
        element.filter(cell => cell.dataset.thread === "warp").forEach(cell => {
            cell.style.borderLeft = "";
            cell.style.borderRight = "";
            cell.style.borderTop = "none";
            cell.style.borderBottom = "none";



        });

        if (element[0].dataset.thread === "weft") {
            cell.style.borderLeft = "";
        } else if (element[0].dataset.thread === "warp") {
            cell.style.borderTop = "";
        }

        if (element[lastIndex] === "weft") {
            cell.style.borderRight = "";
            cell.style.borderBottom = "";

        } else if (element[lastIndex] === "warp") {
            cell.style.borderBottom = "";
        }



    });

}
document.addEventListener("DOMContentLoaded", function () {//Runs after page-load
    draftSetUp();
});





