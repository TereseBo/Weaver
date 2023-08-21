//Functions in grid creation
import { updateColorbox } from "./colorpick.js";

function createGrid(x = 4, y = 4, id = "grid") {//Creates a grid with x columns and y rows, with the id of id and appends to id="chart"
    let grid = document.createElement('div');
    grid.setAttribute("id", `${id}-wrapper`);
    let el = document.getElementById('chart');
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
            //onClickfunctionPicker(id, cell);
        }
    }
}
function adjustDraftDisplay(gridSizeX, gridSizeY, thredlePreference, shaftPreference) {//Adjusts the size of the draft grid to prevent rezising of cells when adding shafts/thredles.
    let el = document.getElementById('chart');
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
function getShaftPreference() {//Returns the number of shafts the user has set.
    let shaftPreference;
    (localStorage.getItem('shaftInput')) ? shaftPreference = localStorage.getItem('shaftInput') : shaftPreference = 4;
    return shaftPreference;
}
function getThredlePreference() {//Returns the number of thredles the user has set.
    let thredlePreference;
    (localStorage.getItem('thredleInput')) ? thredlePreference = localStorage.getItem('thredleInput') : thredlePreference = 4;
    return thredlePreference;
}


function draftSetUp(shaftPreference, thredlePreference, gridSizeX=50, gridSizeY=50) {//Checks if user has set thredle/shaft preferences, if not uses 4 as default. Navigation to draft.html and creation og grid.

    createGrid(gridSizeX, gridSizeY, "draft"); 
    createGrid(gridSizeX, shaftPreference, "shafts");
    createGrid(thredlePreference, gridSizeY, "thredles");
    createGrid(thredlePreference, shaftPreference, "tie-up");
    document.querySelector('#chart').addEventListener("click", onClickfunctionPicker) //NEW
    cssunfucker();
    //adjustDraftDisplay(gridSizeX, gridSizeY, thredlePreference, shaftPreference);
}
//Functions active in draft-manipulation
function getActiveColor() {//Returns the color of the color picker.
    let currentColor = document.getElementById('currentcolor').value;
    return currentColor;
}
function cssunfucker() {
    let draft = document.getElementById('draft-wrapper');
    let shafts = document.getElementById('shafts-wrapper');
    let thredles = document.getElementById('thredles-wrapper');
    let tieUp = document.getElementById('tie-up-wrapper');
    let chart = document.getElementById('chart');
    let div = document.createElement('div');
    let div2 = document.createElement('div');
    div.setAttribute("class", 'partial');
    div2.setAttribute("class", 'partial');
    div.appendChild(draft);
    div.appendChild(thredles);
    chart.appendChild(div);
    div2.appendChild(shafts);
    div2.appendChild(tieUp);
    chart.appendChild(div2);
}


function setBackgroundColor(cell, color = getActiveColor()) {//Sets the background color of the cell depending on if it is active or not.
    let result = true
    if (!isActive(cell)) {
        cell.style.backgroundColor = color;

    } else {

        cell.style.backgroundColor = cell.parentElement.style.backgroundColor;//TODO:add function to reset grid-color on color-reset

    }
    return result;
}
//TODO: move function to grid creation
function onClickfunctionPicker(event) {//Switch to determine which function to run on click.
    const cell=event.target
    console.log(cell)
    const grid=cell.dataset.grid
    switch (grid) {
        case "draft":
            break;
        case "shafts":
            
                setBackgroundColor(cell);
                checkWarp(cell);
                calculateDraftfromShaft(cell);
                updateColorbox(getActiveColor(), 'warp');
            
            break;
        case "thredles":
            
                setBackgroundColor(cell);
                calculateDraftfromTredle(cell);
                updateColorbox(getActiveColor(), 'weft');

            
            break;
        case "tie-up":
           
                setBackgroundColor(cell, "black");
                calculateDraftfromTieUp(cell);
            
            break;
        default:
            break;
    }
}
function checkWarp(cell) {//Resets background color of cells in the same column.
    let columnNr = cell.dataset.column;
    let grid = cell.dataset.grid;
    let currentColumn = document.querySelectorAll(`[data-grid="${grid}"][data-column="${columnNr}"]`);
    currentColumn.forEach(element => {
        if (cell !== element) {
            element.style.backgroundColor = element.parentElement.style.backgroundColor;
        }
    });
}
function calculateDraftfromShaft(cell) {

    let currentDraftColumnCells = findSameColumnIn(cell, "draft");
    currentDraftColumnCells.forEach(element => {
        calculateDraftfromDraft(element);
    });
}
function calculateDraftfromTredle(cell) {
    let currentDraftRowCells = findSameRowIn(cell, "draft");
    currentDraftRowCells.forEach(element => {
        calculateDraftfromDraft(element);
    });
}

function calculateDraftfromTieUp(cell) {
    let currentShaftcells = findSameRowIn(cell, "shafts");
    let activeInShaft = currentShaftcells.filter(isActive);
    activeInShaft.forEach(element => {
        findSameColumnIn(element, "draft").forEach(element => {
            calculateDraftfromDraft(element);
        });
    });
}

function isActive(cell) {
    return cell.style.backgroundColor !== cell.parentElement.style.backgroundColor;
}
function findSameColumnIn(cell, grid = "draft") {
    let columnNr = cell.dataset.column;
    return Array.from(document.querySelectorAll(`[data-grid="${grid}"][data-column="${columnNr}"]`));
}
function findSameRowIn(cell, grid = "draft") {
    let rowNr = cell.dataset.row;
    return Array.from(document.querySelectorAll(`[data-grid="${grid}"][data-row="${rowNr}"]`));
}

function calculateDraftfromDraft(cell) {

    let warpCell = findSameColumnIn(cell, 'shafts').find(isActive);
    let weftCells = findSameRowIn(cell, 'thredles').filter(isActive);
    if (warpCell && weftCells.length > 0) {

        let tiedUpCells = findSameRowIn(warpCell, 'tie-up').filter(isActive);

        if (tiedUpCells.length > 0) {

            let tieUps = tiedUpCells.map(cell => cell.dataset.column);

            weftCells.forEach(weftCell => {
                let thisTredle = weftCell.dataset.column;
                if (tieUps.includes(thisTredle)) {
                    cell.style.backgroundColor = weftCell.style.backgroundColor;
                    cell.dataset.thread = "weft";
                } else {
                    cell.style.backgroundColor = warpCell.style.backgroundColor;
                    cell.dataset.thread = "warp";
                }
            });
        } else {
            cell.style.backgroundColor = warpCell.style.backgroundColor;
            cell.dataset.thread = "warp";
        }

    }
    else if (warpCell && weftCells.length === 0) {

        cell.style.backgroundColor = warpCell.style.backgroundColor;
        cell.dataset.thread = "warp";
    }
    else if (!warpCell && weftCells.length > 0) {
        cell.style.backgroundColor = weftCells[0].style.backgroundColor;
        cell.dataset.thread = "weft";
    }
    else if (!warpCell && weftCells.length === 0) {
        cell.style.backgroundColor = cell.parentElement.style.backgroundColor;
        cell.dataset.thread = "none";
    }
    fixGridLines(cell);

}
function fixGridLines(cell) {
    let borderThickness = "0.5px";
    if (cell.dataset.thread === "warp") {
        cell.style.borderTop = "none";
        cell.style.borderTopColor = "";
        cell.style.borderBottom = "none";
        cell.style.borderBottomColor = "";
        cell.style.borderLeft = "";
        cell.style.borderRight = "";
        cell.style.borderTopWidth = "";
        cell.style.borderBottomWidth = "";
        cell.style.borderRightWidth = borderThickness;
        cell.style.borderLeftWidth = borderThickness;


    }
    else if (cell.dataset.thread === "weft") {
        cell.style.borderLeft = "none";
        cell.style.borderLeftColor = "";
        cell.style.borderRight = "none";
        cell.style.borderRightColor = "";
        cell.style.borderTop = "";
        cell.style.borderBottom = "";
        cell.style.borderLeftWidth = "";
        cell.style.borderRightWidth = "";
        cell.style.borderTopWidth = borderThickness;
        cell.style.borderBottomWidth = borderThickness;
    }
    else {
        cell.style.borderLeft = "";
        cell.style.borderRight = "";
        cell.style.borderTop = "";
        cell.style.borderBottom = "";
        cell.style.borderLeftWidth = "";
        cell.style.borderRightWidth = "";
        cell.style.borderTopWidth = "";
        cell.style.borderBottomWidth = "";
    }
}
export { draftSetUp, isActive, getThredlePreference, getShaftPreference };






