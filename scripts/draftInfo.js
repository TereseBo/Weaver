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
function createYarnList(arr, thread) {
    console.log("started createYarnList")
    console.log(arr);
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
function generateYarnLists() {
    let info = document.getElementById('info');
    let yarnListContainer = document.createElement('div');
    yarnListContainer.id = 'click-draft-yarn-list-container';
    yarnListContainer.classList.add('yarn-list-container');
    info.appendChild(yarnListContainer);
    createYarnList(getWarpColors(), 'warp');
    createYarnList(getWeftColors(), 'weft');
}
function tester() {
    let place = document.getElementById('info');
    let testButton = document.createElement('button');
    testButton.textContent = 'test';
    testButton.addEventListener('click',()=> generateYarnLists());
    place.appendChild(testButton)
}

export { tester }