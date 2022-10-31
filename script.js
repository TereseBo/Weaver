

function setUserPreferences() {
    let shaftInput = document.getElementById('shafts').value;
    let thredleInput = document.getElementById('thredles').value;
    console.log(shaftInput, thredleInput);
    localStorage.setItem('shaftInput', shaftInput);
    localStorage.setItem('thredleInput', thredleInput);
    
}

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
function createGrid(x=4,y=4, id="grid") {//Skapar ett table-element med x antal rader och y antal kolumner och id id.
    //removeMenu();
    console.log(x,y);
    console.log('creating grid');
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
            cell.setAttribute("id", `${id}:${j},${i}`);
           cell.addEventListener('click', event => {
               //TODO: add effects of click
                console.log(`click on cell ${document.getElementById(`${id}:${j},${i}`).id}`);
            })
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}
function adjustDraftDisplay(gridSizeX, gridSizeY, thredlePreference, shaftPreference){
    let el=document.getElementById('content');
    let draft=document.getElementById('draft-wrapper');
    let shafts=document.getElementById('shafts-wrapper');
    let thredles=document.getElementById('thredles-wrapper');
    let tieUp=document.getElementById('tie-up-wrapper');
    let adjustedX=gridSizeX+1;
    let adjustedY=gridSizeY+1;
    thredlePreference=parseInt(thredlePreference);
    shaftPreference=parseInt(shaftPreference);
   // console.log(`adjustedX ${adjustedX} typer of: ${typeof(adjustedX)}, adjustedY ${adjustedY} typer of: ${typeof(adjustedY)}, thredlePreference ${thredlePreference} typer of: ${typeof(thredlePreference)}, shaftPreference ${shaftPreference} typer of: ${typeof(shaftPreference)}`);
    el.style.display="grid";
    el.style.gridTemplateColumns=`repeat(${adjustedX + thredlePreference}, 1rem)` ;
    el.style.gridTemplateRows=`repeat(${adjustedY + shaftPreference}, 1rem)`;
    el.style.gap="1rem";

    draft.style.gridColumn=`1 / ${adjustedX}`;
    draft.style.gridRow=`1 / ${adjustedY}`;

    shafts.style.gridColumn= draft.style.gridColumn;
    shafts.style.gridRow=`${adjustedY} / ${adjustedY + shaftPreference+1 }`;

    thredles.style.gridColumn= `${adjustedX} / ${adjustedX + thredlePreference+1}`;
    thredles.style.gridRow= draft.style.gridRow;

    tieUp.style.gridColumn= thredles.style.gridColumn;
    tieUp.style.gridRow= shafts.style.gridRow;

    console.log(`el.style.gridTempColumn: ${el.style.gridTemplateColumns}, el.style.gridTempRow: ${el.style.gridTemplateRows}`);
    console.log(`draft.style.gridColumn: ${draft.style.gridColumn}, draft.style.gridRow: ${draft.style.gridRow}`);
    console.log(`shafts.style.gridColumn: ${shafts.style.gridColumn}, shafts.style.gridRow: ${shafts.style.gridRow}`);
    console.log(`thredles.style.gridColumn: ${thredles.style.gridColumn}, thredles.style.gridRow: ${thredles.style.gridRow}`);
    console.log(`tieUp.style.gridColumn: ${tieUp.style.gridColumn}, tieUp.style.gridRow: ${tieUp.style.gridRow}`);



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
   // adjustDraftDisplay(gridSizeX, gridSizeY, thredlePreference, shaftPreference);
 
    
    
    
}
function collectUserPreferences() {
    removeMenu();
    createForm();

}