import {isActive} from './draftChart.js';
function getWarpColors(){//returns a set of warp colors used in the draft
    let warpColors=[];
    let warpCells = Array.from(document.querySelectorAll('[data-grid=shafts]')).filter(isActive);
    warpCells.forEach(element => {
        warpColors.push(element.style.backgroundColor);
    });
    warpColors= new Set(warpColors);
    return warpColors;
}
function getWeftColors(){//returns a set of weft colors used in the draft
    let weftColors=[];
    let weftCells = Array.from(document.querySelectorAll('[data-grid=thredles]')).filter(isActive);
    weftCells.forEach(element => {
        weftColors.push(element.style.backgroundColor);
    });
    weftColors= new Set(weftColors);
    return weftColors;
}
function tester(){
    let place=document.getElementById('info');
    let testButton=document.createElement('button');
    testButton.textContent='test';
    testButton.addEventListener('click',getWeftColors);
    place.appendChild(testButton)
}

export {tester}