import { isActive } from './dchart.js';
import { calculateWarpEnds, calculateWarpEpc, calculateWeaveWidth, calculateEpcFromReed } from '../../calculator/calc.js';
import { saveDraft } from '../filescripts/create.js';

function getWarpColors() {//returns a set of warp colors used in the draft
    let warpColors = [];
    let warpCells = Array.from(document.querySelectorAll('[data-grid=shafts]')).filter(isActive);
    warpCells.forEach(element => {
        warpColors.push(element.style.backgroundColor);
    });
    warpColors = new Set(warpColors);
    return warpColors;
}
function getWeftColors() {//returns a set of weft colors used in the draft
    let weftColors = [];
    let weftCells = Array.from(document.querySelectorAll('[data-grid=thredles]')).filter(isActive);
    weftCells.forEach(element => {
        weftColors.push(element.style.backgroundColor);
    });
    weftColors = new Set(weftColors);
    return weftColors;
}
function checkForDuplicates(thread) {//checks for duplicates of info
    if (document.getElementById(`${thread}-list`)) {
        document.getElementById(`${thread}-list`).remove();
    }

}
function createYarnList(arr, thread) {//creates a list of yarns for the warp or weft
    checkForDuplicates(thread);
    if (arr.size > 0) {

        let yarnList = document.createElement('div');
        yarnList.id = `${thread}-list`;
        yarnList.classList.add('yarn-list');
        let yarnListHeader = document.createElement('h3');
        yarnListHeader.classList.add("form-header")
        yarnList.appendChild(yarnListHeader).textContent = `${thread.charAt(0).toUpperCase() + thread.slice(1)}`;
        document.getElementById('click-draft-yarn-list-container').appendChild(yarnList);
        arr.forEach(element => {
            let yarnContainer = document.createElement('form');
            let yarnColor = document.createElement('div');
            let yarnFiber = document.createElement('input');
            let yarnWeight = document.createElement('input');

            yarnContainer.classList.add('yarn-container');
            yarnColor.classList.add('yarn-color');
            yarnColor.style.backgroundColor = element;
            yarnWeight.classList.add('yarn-weight');

            yarnFiber.classList.add('yarn-name');
            yarnFiber.type = 'text';
            yarnFiber.placeholder = 'Yarn fiber';

            yarnWeight.type = 'text';
            yarnWeight.placeholder = 'Yarn weight';
            yarnContainer.appendChild(yarnColor);
            yarnContainer.appendChild(yarnFiber);
            yarnContainer.appendChild(yarnWeight);

            yarnList.appendChild(yarnContainer);
        });
        window.scrollTo(0, document.body.scrollHeight);
    } else {  //TODO: Consider if message should be displayd when yarns are not set
        let yarnList = document.createElement('div');
        yarnList.id = `${thread}-list`;
        yarnList.classList.add('yarn-list');
        let yarnListHeader = document.createElement('h3');
        yarnListHeader.classList.add("form-header")
        yarnList.appendChild(yarnListHeader).textContent = `${thread.charAt(0).toUpperCase() + thread.slice(1)}`;
        document.getElementById('click-draft-yarn-list-container').appendChild(yarnList);

        let yarnmessagebox=document.createElement('div')
        let msg='Not selected'
        yarnList.appendChild(yarnmessagebox).textContent=msg;
        window.scrollTo(0, document.body.scrollHeight); 
    }
}
function generateYarnLists() {//generates the warp and weft yarn lists
    if (!document.getElementById('click-draft-yarn-list-container')) {
        let info = document.getElementById('info');
        let yarnListContainer = document.createElement('div');
        yarnListContainer.id = 'click-draft-yarn-list-container';
        yarnListContainer.classList.add('yarn-list-container');
        info.prepend(yarnListContainer);
    }

    createYarnList(getWarpColors(), 'warp');
    createYarnList(getWeftColors(), 'weft');
    if (document.getElementById('warp-list') || document.getElementById('weft-list')) {
       // document.getElementById('click-draft-yarn-list-container').style.pageBreakAfter = "always";
    }
}
function addInfo() {//Adds buttons for adding optional info to the draft
    let place = document.getElementById('options-container');
    let yarnButton = document.createElement('button');
    let projectButton = document.createElement('button');
    let saveButton = document.createElement('button');
    yarnButton.textContent = 'Add yarn info';
    projectButton.textContent = 'Add project info';
    saveButton.textContent = 'Save draft';
    yarnButton.addEventListener('click', () => generateYarnLists());
    projectButton.addEventListener('click', () => displayDraftInfo());
    saveButton.addEventListener('click', () => saveDraft());
    place.appendChild(projectButton);
    place.appendChild(yarnButton)
    place.appendChild(saveButton)
    addInputCalculations();


}
function displayDraftInfo() {//Displays the project info form

    document.getElementById('project-info-container').style.display = 'flex';
    window.scrollTo(0, document.body.scrollHeight);

}

function addInputCalculations() {//Adds calculations to the input fields it's very unclear why I didn't do one function for the form instead
    let warpEpcInput = document.getElementById('warp-sett');
    let warpEndsInput = document.getElementById('threads');
    let warpWidthInput = document.getElementById('warp-width');
    let reedDents = document.getElementById('heddle-dents')
    let reedSpec = document.getElementById('heddle-spec')
    let reedSett = document.getElementById('threads-dent')
    let reedelement = [reedDents, reedSpec]
    warpEpcInput.addEventListener('input', () => {
        let warpEpc = warpEpcInput.value;
        let warpEnds = warpEndsInput.value;
        let warpWidth = warpWidthInput.value;
        let reedFactor = (reedDents.value / reedSpec.value)

        if (warpEnds) {
            warpWidthInput.value = calculateWeaveWidth(warpEnds, warpEpc);
        }
        else if (warpWidth) {
            warpEndsInput.value = calculateWarpEnds(warpEpc, warpWidth);

        }
        if (checkInputMatch(warpEpc, reedFactor)) { //TODO: clean this mess up and add corresponding class in styles
            reedelement.forEach(element => {

                element.classList.remove('red')
            })
        } else {
            reedelement.forEach(element => {
                element.classList.add('red')

            })
        }
        console.log(warpEpc, reedSett.value)
        if (checkInputMatch(warpEpc, reedSett.value)) {
            reedSett.classList.remove('red')
        } else {
            reedSett.classList.add('red')
        }
    });
    warpEndsInput.addEventListener('input', () => {
        let warpEpc = warpEpcInput.value;
        let warpEnds = warpEndsInput.value;
        let warpWidth = warpWidthInput.value;
        if (warpEpc) {
            warpWidthInput.value = calculateWeaveWidth(warpEnds, warpEpc);
        }
        else if (warpWidth) {
            warpEpcInput.value = calculateWarpEpc(warpEnds, warpWidth);
        }
    });
    warpWidthInput.addEventListener('input', () => {
        let warpEpc = warpEpcInput.value;
        let warpEnds = warpEndsInput.value;
        let warpWidth = warpWidthInput.value;
        if (warpEpc) {
            warpEndsInput.value = calculateWarpEnds(warpEpc, warpWidth);
        }
        else if (warpEnds) {
            warpEpcInput.value = calculateWarpEpc(warpEnds, warpWidth);
        }
    });
    reedDents.addEventListener('input', () => {
        let dents = reedDents.value;
        let cm = reedSpec.value;
        let threads = reedSett.value;

        if (dents && cm && threads) {
            warpEpcInput.value = calculateEpcFromReed(dents, cm, threads)
            warpEpcInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }))
        }

    })
    reedSett.addEventListener('input', () => {
        let dents = reedDents.value;
        let cm = reedSpec.value;
        let threads = reedSett.value;

        if (dents && cm && threads) {
            warpEpcInput.value = calculateEpcFromReed(dents, cm, threads)
            warpEpcInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }))
        }


    })



}

//TODO: Replace this function with one that considers seed, sett and ends/cm
function checkInputMatch(val1, val2) {//Checks if values are compatible

    let res = true
    if (val1 % val2 == 0 || val2 % val1 == 0) {
        res = true
    } else {
        res = false
    }
    return res
}


export { addInfo, addInputCalculations }