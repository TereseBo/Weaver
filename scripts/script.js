


//Functions for collecting user preferences
function removeMenu() {
    let menu = document.getElementById('menu');
    while (menu.firstChild) {
        menu.removeChild(menu.lastChild);
    }
}
function emptyContent() {
    let content = document.getElementById('content');
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }
}
function createForm() {//Creates form for user to input preferences
    let form = document.createElement("form");
    let formBox= document.createElement("div");
    formBox.setAttribute("class", "form-container");
    form.setAttribute("id", "preferences-form");
    form.setAttribute("method", "post");
    let el = document.getElementById('content');
    formBox.append(form);
    el.appendChild(formBox);

    // Create header
    let h = document.createElement("h3");
    h.innerHTML = "Loom information";
    h.classList.add('form-header')
    form.append(h);
   
    // Create input, labels and container
    let shaftInput = document.createElement("input");
    let shaftLabel = document.createElement("label");
    let thredleInput = document.createElement("input");
    let thredleLabel = document.createElement("label");
    let shaftBox= document.createElement("div");
    let thredleBox = document.createElement("div");

    shaftInput.setAttribute("type", "number");
    shaftInput.setAttribute("name", "shafts");
    shaftInput.setAttribute("id", "shafts");
    shaftInput.setAttribute("placeholder", " 4");
    shaftInput.setAttribute("size", "3");

    shaftLabel.setAttribute("for", "shafts");
    shaftLabel.innerHTML = "Number of shafts";

    shaftBox.append(shaftLabel);
    shaftBox.append(shaftInput);


    thredleInput.setAttribute("type", "number");
    thredleInput.setAttribute("name", "thredles");
    thredleInput.setAttribute("id", "thredles");
    thredleInput.setAttribute("placeholder", " 4");

    thredleLabel.setAttribute("for", "thredles");
    thredleLabel.innerHTML = "Number of thredles";

    thredleBox.append(thredleLabel);
    thredleBox.append(thredleInput);

    // Create a submit button
    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    form.append(shaftBox);
    form.append(thredleBox);
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
    emptyContent();
    createForm();

}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('preferences').addEventListener('click', collectUserPreferences);
    


});


