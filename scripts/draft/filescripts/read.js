import { draftSetUp } from "../pagescripts/dchart";


function removeGrid() {//Not tested
    let chart = document.getElementById;
    while (chart.firstChild) {
        chart.removeChild(chart.lastChild);
    }
}

function importcolors(object){
    let shafts=document.getElementById('shafts')
    object.shafts.pattern.forEach(element, index => {
        shafts.getElementById(element)

    });
}

function createDraftFromObject(object) {
    draftSetUp(object.shafts.count, object.threadling.count);
}

//page import
//remove grid
//run draft setup with object values
//add colors