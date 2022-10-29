

function setUserPreferences() {
    let shaftInput = document.getElementById('shafts').value;
    let thredleInput = document.getElementById('thredles').value;
    console.log(shaftInput, thredleInput);
    
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
        //TODO: add effects of submission
    })
}
function createGrid(x=4,y=4, id="grid") {
    removeMenu();
    console.log(x,y);
    console.log('creating grid');
    let grid = document.createElement('table');
    console.log(grid);
    grid.setAttribute("id", id);
    let el = document.getElementById('content');
    el.appendChild(grid);
    for (let i = 0; i < y; i++) {
        let row = document.createElement("tr");
        row.setAttribute("class", "row");
        grid.appendChild(row);
        for (let j = 0; j < x; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("class", "cell");
            cell.setAttribute("id", `${j}${i}`);
           cell.addEventListener('click', event => {
               //TODO: add effects of click
                console.log(`click on cell ${document.getElementById(`${j}${i}`).id}`);
            })
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function draftSetUp() {
    createGrid(4,4, "tie-up");
    createGrid(50,4, "shafts");
    createGrid(4,50, "thredles");
    createGrid(50,50, "draft");
}
function getUserPreferences() {
    removeMenu();
    createForm();

}