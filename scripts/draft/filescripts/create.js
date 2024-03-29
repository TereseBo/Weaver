import { isActive } from "../pagescripts/dchart.js";
import { weaveObject } from "./weaveobject.js";

function exportWarp(grid) {//Loops trough the warp grid and exports the pattern and colors
    let object = {};
    let colorPatternTracker = 0;
    let pattern = [];
    let colors = [];
    let previousColor = '0';
    let newColor = '0';
    let shaft = null;
    let columnNr = document.querySelector(`[data-grid="${grid}"]:last-child`).dataset.column;
    let currentColumn = document.querySelectorAll(`[data-grid="${grid}"][data-column="${columnNr}"]`);
    while (currentColumn.length > 0) {
        currentColumn.forEach(element => {//TODO: replace with currentColumn.filter/find to save unset warp columns in the pattern
            if (isActive(element)) {
                newColor = element.style.backgroundColor;
                shaft = element.dataset.row;
                pattern.push(shaft);
                if (newColor === previousColor) {
                    colorPatternTracker++;
                    previousColor = newColor;
                } else {
                    colorPatternTracker++;
                    colors.push({ color: previousColor, threads: colorPatternTracker });
                    colorPatternTracker = 0;
                    previousColor = newColor;
                }
            }
        });
        columnNr--;
        currentColumn = document.querySelectorAll(`[data-grid="${grid}"][data-column="${columnNr}"]`);
    }
    colors.push({ color: previousColor, threads: colorPatternTracker + 1 });
    colors.shift();

    object.pattern = pattern;
    if (pattern.length > 0) {
        object.count = Math.max(...pattern);
    } else {
        object.count = null;
    }
    object.colors = colors
    return object;
}

function exportWeft(grid) {//Loops trough the weft grid and exports the pattern and colors NOT finished
    let object = {};
    let colorPatternTracker = 0;
    let pattern = [];
    let previousColor = 0;
    let newColor = 0;
    let thredle = null;
    let colors = [];

    let rowNr = [];
     rowNr = document.querySelectorAll(`[data-grid="${grid}"]:last-child`)//.dataset.row;
     rowNr=Math.max(...Array.from(rowNr).map(cell=>Number(cell.dataset.row)))

    let currentRow = document.querySelectorAll(`[data-grid="${grid}"][data-row="${rowNr}"]`);
    while (currentRow.length>0) {
        let previousRow='';
        currentRow.forEach(element => {
            if (isActive(element)) {
                //TODO: Add chek for dual treadling
                newColor = element.style.backgroundColor;
                thredle = element.dataset.column;
                pattern.push(thredle);
                previousRow=rowNr
                if (newColor === previousColor) {
                    colorPatternTracker++;
                    previousColor=newColor
                } else {
                    colorPatternTracker++
                    colors.push({ color: previousColor, threads: colorPatternTracker });
                    colorPatternTracker = 0;
                    previousColor = newColor;
                }
            }
        });
        rowNr--;
        currentRow = document.querySelectorAll(`[data-grid="${grid}"][data-row="${rowNr}"]`);
    }
    colors.push({ color: previousColor, threads: colorPatternTracker + 1 });
    colors.shift();

    object.pattern = pattern;
    if (pattern.length > 0) {
        object.count = Math.max(...pattern);
    } else {
        object.count = null;
    }
    object.colors = colors
    return object;

}

function download(filename, object){
    const json= JSON.stringify(object)
    let downloadLink=document.createElement('a')
    downloadLink.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(json))
    downloadLink.setAttribute('download', filename)
    downloadLink.style.display='none'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)


}

function saveDraft() {//TODO: Finish this //Creates an object from a clicked in chart
    let warp = exportWarp('shafts');
    let weft = exportWeft('thredles');
    let draft = { warp, weft };
    download('mydraft.json',draft)
    console.log(draft);
}

export { saveDraft };