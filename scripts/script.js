


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

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
    document.getElementById('preferences').addEventListener('click', collectUserPreferences);
    


});


