import { isActive } from "../pagescripts/dchart";

function exportWarp(grid){
    let object={};
    let colorPatternTracker=0;
    let pattern=[];
    let previousColor=0;
    let newColor=0;
    let shaft=null;

    let columnNr = 0;
    
    let currentColumn = document.querySelectorAll(`[data-grid="${grid}"][data-column="${columnNr}"]`);
    while(currentColumn){
    currentColumn.forEach(element => {
        if (isActive(element)) {
            newColor=element.style.backgroundColor;
            shaft=element.dataset.row;
            pattern.push(shaft);
            if (newColor===previousColor) {
                colorPatternTracker++;
            } else {
                object.shafts.colors.pattern.push({color:previousColor, threads:colorPatternTracker});
                colorPatternTracker=0;
                previousColor=newColor;
            }
        }
    });
    columnNr++;
    currentColumn = document.querySelectorAll(`[data-grid="${grid}"][data-column="${columnNr}"]`);
}
object.shafts.pattern=pattern;
object.shafts.count=pattern.max();
return object;
}

function exportWeft(grid){
    let object={};
    let colorPatternTracker=0;
    let pattern=[];
    let previousColor=0;
    let newColor=0;
    let thredle=null;

    let rowNr = [];
    document.querySelectorAll(`[data-grid="${grid}"]`).forEach(element => {
       rowNr.push( element.dataset.row);
    });
    rowNr=rowNr.max();
    
    let currentRow = document.querySelectorAll(`[data-grid="${grid}"][data-row="${rowNr}"]`);
    while(currentRow){
    currentRow.forEach(element => {
        if (isActive(element)) {
            //TODO: Add chek for dual treadling
            newColor=element.style.backgroundColor;
            thredle=element.dataset.column;
            pattern.push(thredle);
            if (newColor===previousColor) {
                colorPatternTracker++;
            } else {
                object.threadling.colors.pattern.push({color:previousColor, threads:colorPatternTracker});
                colorPatternTracker=0;
                previousColor=newColor;
            }
        }
    });
    rowNr++;
    currentRow = document.querySelectorAll(`[data-grid="${grid}"][data-row="${rowNr}"]`);
}

}