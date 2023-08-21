import { draftSetUp } from "../pagescripts/dchart";


function removeGrid() {//Not tested
    let chart = document.getElementById;
    while (chart.firstChild) {
        chart.removeChild(chart.lastChild);
    }
}

function importcolors(object){
    let shafts=document.querySelectorAll(`[data-grid="${grid}"]`);
    
    let columnTracker=0;
    object.shafts.pattern.forEach(element, index => {
        let color=element.color;
        let threads=element.threads;
        for (let i = 0; i < threads; i++) {
           let y= object.shafts.pattern[i]
              let threadElement=shafts.find(id=`shafts-${y}-${columnTracker}`)
            threadElement.style.backgroundColor=color;
            columnTracker++;
        }

    });
}

function createDraftFromObject(object) {
    removeGrid();
    draftSetUp(object.shafts.count, object.threadling.count);
}

//page import
//remove grid
//run draft setup with object values
//add colors