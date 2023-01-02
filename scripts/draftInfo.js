import { isActive } from './draftChart.js';
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
    if(document.getElementById(`${thread}-list`)) {
        document.getElementById(`${thread}-list`).remove();
    }

}
function createYarnList(arr, thread) {//creates a list of yarns for the warp or weft
    checkForDuplicates(thread);
    let yarnList = document.createElement('div');
    yarnList.id = `${thread}-list`;
    yarnList.classList.add('yarn-list');
    yarnList.appendChild(document.createElement('h3')).textContent = `${thread.charAt(0).toUpperCase() + thread.slice(1)}`;
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

        yarnWeight.type = 'number';
        yarnWeight.placeholder = 'Yarn weight';




        yarnContainer.appendChild(yarnColor);
        yarnContainer.appendChild(yarnFiber);
        yarnContainer.appendChild(yarnWeight);

        yarnList.appendChild(yarnContainer);
    });
}
function generateYarnLists() {//generates the warp and weft yarn lists
    let info = document.getElementById('info');
    let yarnListContainer = document.createElement('div');
    yarnListContainer.id = 'click-draft-yarn-list-container';
    yarnListContainer.classList.add('yarn-list-container');
    info.prepend(yarnListContainer); 
    createYarnList(getWarpColors(), 'warp');
    createYarnList(getWeftColors(), 'weft');
}
function addInfo() {//Adds buttons for adding optional info to the draft
    let place = document.getElementById('info');
    let yarnButton = document.createElement('button');
    let projectButton = document.createElement('button');
    yarnButton.textContent = 'Add yarn info';
    projectButton.textContent = 'Add project info';
    yarnButton.addEventListener('click', () => generateYarnLists());
    projectButton.addEventListener('click', () => draftInfoSetUp());
    place.appendChild(projectButton);
    place.appendChild(yarnButton)


}
function draftInfoSetUp() {
    let info = document.getElementById('info');
    let infoContainer = document.createElement('div');
    infoContainer.id = 'info-container';
    info.appendChild(infoContainer);
    let infoHeader = document.createElement('h3');
    infoHeader.textContent = 'Additional info';
    document.getElementById('project-info-container').style.display = 'flex';
    
}

export { addInfo }