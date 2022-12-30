import { draftSetUp, getActiveColor } from "./draftfunctions.js";
document.addEventListener("DOMContentLoaded", function () {//Runs after page-load
    draftSetUp();
    
});
document.addEventListener("click", function () {//Runs after page-load
    let color = getActiveColor();
    console.log(color);
});