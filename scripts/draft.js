
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
function setBackgroundColorOnClick(cell) {
    let parentElement = cell.parentElement
    let baseColor = parentElement.style.backgroundColor;
    let cellColor = cell.style.backgroundColor;
    if (cellColor == baseColor) {
        cell.style.backgroundColor = getActiveColor();
    } else {
        cell.style.backgroundColor = baseColor;
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
            });

            break;
        case "thredles":
            cell.addEventListener("click", function () {

                setBackgroundColorOnClick(cell);


            });
            break;
        case "tie-up":
            cell.addEventListener("click", function () {

                setBackgroundColorOnClick(cell);
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

function calculateDraftfromShaft(cell) {
    let draft = document.getElementById('draft-wrapper');
    let tieUp = document.getElementById('tie-up-wrapper');
    let tredles = document.getElementById('thredles-wrapper');
   let tiedUpTredles =[];
    let currentDraftColumn=getColumnNr(cell);
    draft.querySelectorAll(`[data-column="${currentDraftColumn}"]`).forEach(element => {//Set warp color for all cells in column
        element.style.backgroundColor = cell.style.backgroundColor;
    });
    tieUp.querySelectorAll(`[data-row="${getRowNr(cell)}"]`).forEach(element => {//If tied up, loop column i tredles and set weftcolor in draft if active
        if (element.style.backgroundColor !== element.parentElement.style.backgroundColor) {
            tredles.querySelectorAll(`[data-column="${getColumnNr(element)}"]`).forEach(element => {
                if(element.style.backgroundColor !== element.parentElement.style.backgroundColor){
                    row=getRowNr(element);
                    draft.querySelector(`[data-row="${row}"][data-column="${currentDraftColumn}"]`).style.backgroundColor = element.style.backgroundColor;
                }
            });
        }
    });
}


function getColumnNr(cell) {
    return cell.dataset.column;
}
function getRowNr(cellId) {
    return cellId.dataset.row;
}
document.addEventListener("DOMContentLoaded", function () {
    draftSetUp();


});


//Shafts
//Write function to change color of cells in draft grid depending on the color of the cell in the tie-up grid, thredle, and shafts grid.
//First check if same row tie-up is filled
//if so, check if corresponding thredle column is filled
//if so, chande background of corresp cells in draft grid to match weft color

//Thredles
////First check if same row tie-up is filled
//Varje ruta i grid kan ha status Upp/ner motsvarande varp-färg eller inslagsfärg


