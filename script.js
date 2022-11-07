


//Functions for collecting user preferences
function removeMenu() {
    let menu = document.getElementById('menu');
    while (menu.firstChild) {
        menu.removeChild(menu.lastChild);
    }
}
function createForm() {//Creates form for user to input preferences
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    let el = document.getElementById('content');
    el.appendChild(form);
   
    // Create an input elements for 
    let shaftInput = document.createElement("input");
    shaftInput.setAttribute("type", "number");
    shaftInput.setAttribute("name", "shafts");
    shaftInput.setAttribute("id", "shafts");
    shaftInput.setAttribute("placeholder", " Number of shafts");

    let thredleInput = document.createElement("input");
    thredleInput.setAttribute("type", "number");
    thredleInput.setAttribute("name", "thredles");
    thredleInput.setAttribute("id", "thredles");
    thredleInput.setAttribute("placeholder", " Number of thredles");

    // Create a submit button
    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    form.append(shaftInput);
    form.append(thredleInput);
    form.append(s);

    form.addEventListener('submit', event => {
        // submit event detected, prevent default action and do js stuff instead
        event.preventDefault();
        setUserPreferences();
        window.location.assign("draft.html");
        
    })
}
function setUserPreferences() {
    let shaftInput = document.getElementById('shafts').value;
    let thredleInput = document.getElementById('thredles').value;
    console.log(shaftInput, thredleInput);
    localStorage.setItem('shaftInput', shaftInput);
    localStorage.setItem('thredleInput', thredleInput);
    
}
function collectUserPreferences() {
    removeMenu();
    createForm();

}
//Functions for greating draft

function createGrid(x=4,y=4, id="grid") {//Skapar ett table-element med x antal rader och y antal kolumner och id id.
   

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
            let cellName =  `${id}:${j},${i}`;
            cell.setAttribute("id", cellName);
           cell.addEventListener('click', event => {
               //TODO: add effects of click
                console.log(`click on cell ${document.getElementById(cellName).id}`);
                console.log(cellName);
                getActiveColor();
                console.log(this);
            })
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}
function adjustDraftDisplay(gridSizeX, gridSizeY, thredlePreference, shaftPreference){//Adjusts the size of the draft grid to prevent rezising of cells when adding shafts/thredles.
    let el=document.getElementById('content');
    let draft=document.getElementById('draft-wrapper');
    let shafts=document.getElementById('shafts-wrapper');
    let thredles=document.getElementById('thredles-wrapper');
    let tieUp=document.getElementById('tie-up-wrapper');
    gridSizeX=parseInt(gridSizeX);
    gridSizeY=parseInt(gridSizeY);
 //Adjusts the end columns/rows of the grid to accomodate for the number of shafts/thredles
    thredlePreference=parseInt(thredlePreference);
    shaftPreference=parseInt(shaftPreference);
    let draftAreaWidth=gridSizeX+thredlePreference+2;
    let draftAreaHeight=gridSizeY+shaftPreference+2;
    shafts.style.gridRowEnd=(draftAreaHeight);
    thredles.style.gridColumnEnd=(draftAreaWidth);
    tieUp.style.gridRowEnd=(draftAreaHeight);
    tieUp.style.gridColumnEnd=(draftAreaWidth);
}
function draftSetUp() {//Checks if user has set thredle/shaft preferences, if not uses 4 as default. Navigation to draft.html and creation og grid.
    let shaftPreference;
    let thredlePreference;
    (localStorage.getItem('shaftInput'))?shaftPreference=localStorage.getItem('shaftInput'):shaftPreference=4;
    (localStorage.getItem('thredleInput'))?thredlePreference=localStorage.getItem('thredleInput'):thredlePreference=4;
   let gridSizeX = 50;
   let gridSizeY = 50;
    createGrid(gridSizeX,gridSizeY, "draft");
    createGrid(gridSizeX,shaftPreference, "shafts");
    createGrid(thredlePreference,gridSizeY, "thredles");
    createGrid(thredlePreference,shaftPreference, "tie-up");
    
    adjustDraftDisplay(gridSizeX, gridSizeY, thredlePreference, shaftPreference);
}
//Functions in the actual draft
function getActiveColor() {
   let currentColor=document.getElementById('currentcolor').value;
   console.log(currentColor);
}


