import { isZeroish } from './calc.js';
import { calculateFixedLength, calculateItemsLength, warpLength } from './calc.js';

function addItemToWarp(itemNr) {//Adds and numbers an item to warp length calculator
    const itemBox = document.getElementById("item-box");
    let clone = itemBox.cloneNode(true);
    clone.setAttribute("id", `item-${itemNr}`);
    clone.querySelector("h6").textContent = `Item ${itemNr}`;
    clone.removeAttribute("style");
    document.getElementById("items-container").appendChild(clone);
}
function removeItemFromWarp(itemNr) {//Removes an item by nr from warp length calculator
    let item = document.getElementById(`item-${itemNr}`)
    while (item.firstChild) {
        item.firstChild.remove()
    }
    item.remove()
}

function addElements(start, nrOfItems, callback) {//Performes a callback from start to nrOfItems
    for (let i = start; i <= nrOfItems; i++) {
        callback(i);
    }
}
function removeElements(stop, nrOfItems, callback) {//Performes a callback from nf of items to stop
    if (isZeroish(stop)) {
        stop = 0;
    }
    for (let i = nrOfItems - 1; i > stop; i--) {
        callback(i)
    }
}

function countChildren(id) {//Counts the number of children of an element by id
    const children = document.getElementById(id).children;
    return children.length;
}

function recalculateLength() {//Recalculates length of warp
    let lashOn = document.getElementById("lash-on").value;
    let loomWaste = document.getElementById("loom-waste").value;
    let length = calculateFixedLength(lashOn, loomWaste);

    let items = document.getElementById("items").value;
    if (items > 0) {
        let weaveIn = document.getElementById("take-up").value;
        let shrinkage = document.getElementById("shrinkage").value;
        let itemContainer = document.getElementById("items-container");
        let itemList = itemContainer.querySelectorAll("input");
        let items = []
        itemList.forEach((item, index) => {
            if (index > 2) {//Skips item template
                items.push(item.value)
            }
        })
        length = warpLength(calculateItemsLength(items, weaveIn, shrinkage), length);
    }
    document.getElementById("total").value = length;
}


function addEventListenersWarpLength() {
    console.log("change")
    document.getElementById("items").addEventListener("input", (e) => {//Adds/removes items from warp length calculator
        let visibleItems = countChildren('items-container');
        visibleItems <= e.target.value ? addElements(visibleItems, e.target.value, addItemToWarp) : removeElements(e.target.value, visibleItems, removeItemFromWarp);
    });

    document.getElementById("warplength-form").addEventListener("input", (e) => {//Recalculates length of warp
        recalculateLength();
    });
}

document.addEventListener("DOMContentLoaded", function () {//Runs after page-load
    console.log("calcPage.js loaded");
    addEventListenersWarpLength();
});