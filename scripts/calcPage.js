import {isZeroish} from './calc.js';

function addItemToWarp(itemNr){
    const itemBox = document.getElementById("item-box");
    let clone = itemBox.cloneNode(true);
    clone.setAttribute("id", `item-${itemNr}`);
    clone.querySelector("h6").textContent = `Item ${itemNr}`;
    clone.removeAttribute("style");
    document.getElementById("items-container").appendChild(clone);
}
function removeItemFromWarp(itemNr){
    let item=document.getElementById(`item-${itemNr}`)
    while(item.firstChild){
        item.firstChild.remove()
    }
    item.remove()
}

function addElements(start, nrOfItems, callback){
    for (let i = start; i <= nrOfItems; i++) {
        callback(i);
    }
}
function removeElements(stop, nrOfItems, callback){
    if(isZeroish(stop)){
        stop=0;
    }
    for(let i=nrOfItems-1; i>stop;i--){
        callback(i)
    }
}

function countChildren(id){
    const children = document.getElementById(id).children;
    return children.length;
}


function addEventListenersWarpLength(){
    console.log("change")
    document.getElementById("items").addEventListener("input", (e)=>{
        let visibleItems = countChildren('items-container');
        
        visibleItems<e.target.value ? addElements(visibleItems, e.target.value, addItemToWarp) :removeElements(e.target.value, visibleItems, removeItemFromWarp)
            ;
        
    });
}

document.addEventListener("DOMContentLoaded", function () {//Runs after page-load
console.log("calcPage.js loaded");
addEventListenersWarpLength();
});